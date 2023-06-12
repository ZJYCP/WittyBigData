---
title: Flink时间与窗口
icon: page
order: 70
author: 余生
category:
  - 大数据组件
tag:
  - Flink
  - 时间
  - 窗口
  - 知识点
sticky: false
star: true

---

主要介绍Flink中的处理函数

<!-- more -->

## 基本处理函数



### 处理函数的功能和使用

处理函数属于底层API，）了。处理函数提供了一个“定时服务”（TimerService），我们可以通过它访问流中的事件（event）、时间戳（timestamp）、水位线（watermark），甚至可以注册“定时事件”。



```java
stream.process(new MyProcessFunction())
```

ProcessFunction是一个抽象类，继承AbstractRichFunction。



### ProcessFunction解析

```java
public abstract class ProcessFunction<I, O> extends AbstractRichFunction {
...
public abstract void processElement(I value, Context ctx, Collector<O> out) throws Exception;
public void onTimer(long timestamp, OnTimerContext ctx, Collector<O> out) throws Exception {}
...
}
```

#### 抽象方法.processElement()

该方法对流中的**每个元素都会调用一次**，参数包括三个：

- value：当前元素
- ctx：上下文，可以获得时间戳，定时服务，发送数据到侧输出流
- out： 收集器，使用collect向下游发送数据



#### 非抽象方法.onTimer()

在注册好的定时器触发时调用

由三个参数：

- timestamp：时间戳，即触发时间
- ctx：上下文
- out：收集器

只有**按键分区流 keyedStream**才支持定时器操作

### 处理函数的分类

1. ProcessFunction

最基本的，基于DataStream直接调用

2. KeyedProcessFunction

按键分区后的流的处理函数，基于KeyedStream调用.proces时作为参数传入

3. ProcessWindowFunction

开窗之后的处理函数

4. ProcessAllWindowFunction

全窗口AllWindowedStream之后

5. CoProcessFunction

合并两条流之后的处理函数

6. ProcesJoinFunction

间隔连接两条流之后

7. BroadcastProcessFunction

广播连接流

8. KeyedBroadcastProcessFunction

按键分区的广播连接流处理函数

## 按键分区处理函数

### 定时器和定时服务

ctx的上下文提供`timerService()`方法，返回`TimerService`对象，其是一个基础服务接口，包含以下方法：

```java
//获取时间
//获取当前处理时间
long currentProcessingTime();
//获取当前水位线（事件时间）
long currentWatermark();
//注册定时器 
//注册处理时间定时器，超过time时触发
void registerProcessingTimeTimer(long time);
// 注册事件时间定时器，当水位线超过time时触发
void registerEventTimeTimer(long time);
//删除定时器
// 删除触发时间为time的处理时间定时器
void deleteProcessingTimeTimer(long time);
// 删除触发时间为time的处理时间定时器
void deleteEventTimeTimer(long time);
```

对于**每个key和时间戳**，最多只有一个定时器，会去重

## 窗口处理函数

```java
public abstract class ProcessWindowFunction<IN, OUT, KEY, W extends Window> extends AbstractRichFunction {
...
public abstract void process(
KEY key, Context context, Iterable<IN> elements, Collector<OUT> out) throws Exception;
public void clear(Context context) throws Exception {}
public abstract class Context implements java.io.Serializable {...}
}
```

核心方法`process`

- key: 窗口做统计的键
- context：上下文
- element：数据，是一个可迭代的集合
- Out：发送数据

上下文ctx：

```java
public abstract class Context implements java.io.Serializable {
public abstract W window();
public abstract long currentProcessingTime();
public abstract long currentWatermark();
public abstract KeyedStateStore windowState();
public abstract KeyedStateStore globalState();
public abstract <X> void output(OutputTag<X> outputTag, X value);
}
```

- 没有timerService对象
- windowState、globalState获取窗口状态和全局状态



clear方法用于清除自定义的窗口状态



另一种窗口处理函数`ProcessAllWindowFunction`，就没有keyby的`AllWindowedStream`数据集进行处理

## TopN案例

统计最近10秒钟内出现次数最多的两个水位（数据），并且每5秒钟更新一次。



使用KeyedProcessFunction

