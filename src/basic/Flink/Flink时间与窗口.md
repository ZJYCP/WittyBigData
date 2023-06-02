---
title: Flink时间与窗口
icon: page
order: 60
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

主要介绍Flink中的水位线和窗口

<!-- more -->

## 时间语义

**事件时间**：一个数据产生的时间，通常是跟随着数据的时间戳

**处理时间**：数据被真正处理的时刻

![image-20230602195927086](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230602195927086.png)

处理时间是我们计算效率的衡量标准，而事件时间会更符合我们的业务计算逻辑。所以更多时候我们使用事件时间；

从1.12版本开始，Flink已经将事件时间作为了默认的时间语义。

## 水位线

### 水位线的概念

在Flink中，用来衡量**事件时间**进展的标记，就被称作“水位线”（Watermark）。 

#### 有序流中的水位线

为了提高效率，一般每隔一段时间生成一个水位线

![image-20230602200522546](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230602200522546.png)

#### 乱序流中的水位线

1. 乱序+数据量小

![image-20230602200657113](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230602200657113.png)

插入新的水位线时，先判断时间戳是否比之前的大，否则不生成

2. 乱序+数据量大

![image-20230602200919006](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230602200919006.png)

保存之前数据中的最大时间戳，需要插入水位线时，直接以它作为水位线

乱序流中会有迟到数据

3. 乱序流+迟到数据

![image-20230602201123786](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230602201123786.png)

可以在数据时间戳的基础上加上一些延迟（减去一个数）来保证不丢失数据。



#### 水位线的特点

- 水位线是插入到数据流中的一个标记，可以认为是一个特殊的数据
- 主要内容是一个时间戳，表示当前事件时间的进展
- 水位线的时间戳必须是单调递增的
- 可以设置延迟来确保处理乱序数据
- 水位线$w(t)$表示t之前的数据都到期了



### 生成水位线

### 总体原则

处理的快，可将延迟设得低一点，可能会导致数据遗漏，计算结果不准确



#### 水位线生成策略

```java
//分配时间戳，生成水位线
stream.assignTimestampsAndWatermarks(<watermark strategy>);
```

`WatermarkStrategy`是一个接口，包含时间戳分配器`TimestampAssigner`和一个水位线生成器`WatermarkGenerator`



#### Flink内置水位线

```
内置Watermark的生成原理
* 1、都是周期性生成的： 默认200ms
* 2、有序流：  watermark = 当前最大的事件时间 - 1ms
* 3、乱序流：  watermark = 当前最大的事件时间 - 延迟时间 - 1ms
```

1. **有序流中的内置水位线设置**

   特点: 时间戳单调增长，调用`WatermarkStrategy.forMonotonousTimestamps()`

```java
sensorDS.assignTimestampsAndWatermarks(
  WatermarkStrategy.<WaterSensor>forMonotonousTimestamps().withTimestampAssigner(new SerializableTimestampAssigner<WaterSensor>() {
    @Override
    public long extractTimestamp(WaterSensor waterSensor, long l) {
      return waterSensor.getTs() * 1000L;
    }
  })
);
```

上面代码中我们调用.withTimestampAssigner()方法，将数据中的timestamp字段提取出来，作为时间戳分配给数据元素；然后用内置的有序流水位线生成器构造出了生成策略。这样，提取出的数据时间戳，就是我们处理计算的事件时间。

这里需要注意的是，时间戳和水位线的单位，必须都是毫秒。

2. 乱序流中的内置水位线设置

调用`WatermarkStrategy. forBoundedOutOfOrderness`

```java
// TODO 1.定义Watermark策略
WatermarkStrategy<WaterSensor> watermarkStrategy = WatermarkStrategy
  // 1.1 指定watermark生成：乱序的，等待3s
  .<WaterSensor>forBoundedOutOfOrderness(Duration.ofSeconds(3))
  // 1.2 指定 时间戳分配器，从数据中提取
  .withTimestampAssigner(
  (element, recordTimestamp) -> {
    // 返回的时间戳，要 毫秒
    System.out.println("数据=" + element + ",recordTs=" + recordTimestamp);
    return element.getTs() * 1000L;
  });
```



#### 自定义水位线生成器

1. 周期性水位线生成器

周期性生成器一般是通过onEvent()观察判断输入的事件，而在onPeriodicEmit()里发出水位线

```java
public class MyPeriodWatermarkGenerator<T> implements WatermarkGenerator<T> {

    // 乱序等待时间
    private long delayTs;
    // 用来保存 当前为止 最大的事件时间
    private long maxTs;

    public MyPeriodWatermarkGenerator(long delayTs) {
        this.delayTs = delayTs;
        this.maxTs = Long.MIN_VALUE + this.delayTs + 1;
    }

    /**
     * 每条数据来，都会调用一次： 用来提取最大的事件时间，保存下来
     *
     * @param event
     * @param eventTimestamp 提取到的数据的 事件时间
     * @param output
     */
    @Override
    public void onEvent(T event, long eventTimestamp, WatermarkOutput output) {
        maxTs = Math.max(maxTs, eventTimestamp);
        System.out.println("调用onEvent方法，获取目前为止的最大时间戳=" + maxTs);
    }

    /**
     * 周期性调用： 发射 watermark 这个方法由系统框架周期性地调用，默认 200ms一次。
     *
     * @param output
     */
    @Override
    public void onPeriodicEmit(WatermarkOutput output) {
        output.emitWatermark(new Watermark(maxTs - delayTs - 1));
        System.out.println("调用onPeriodicEmit方法，生成watermark=" + (maxTs - delayTs - 1));
    }
}

```

2. 断点式水位线生成器

遇到特定的数据直接在OnEvent方法中发送水位线

```java
public class MyPuntuatedWatermarkGenerator<T> implements WatermarkGenerator<T> {

    // 乱序等待时间
    private long delayTs;
    // 用来保存 当前为止 最大的事件时间
    private long maxTs;

    public MyPuntuatedWatermarkGenerator(long delayTs) {
        this.delayTs = delayTs;
        this.maxTs = Long.MIN_VALUE + this.delayTs + 1;
    }

    /**
     * 每条数据来，都会调用一次： 用来提取最大的事件时间，保存下来,并发射watermark
     *
     * @param event
     * @param eventTimestamp 提取到的数据的 事件时间
     * @param output
     */
    @Override
    public void onEvent(T event, long eventTimestamp, WatermarkOutput output) {
        maxTs = Math.max(maxTs, eventTimestamp);
        output.emitWatermark(new Watermark(maxTs - delayTs - 1));
        System.out.println("调用onEvent方法，获取目前为止的最大时间戳=" + maxTs+",watermark="+(maxTs - delayTs - 1));
    }

    /**
     * 周期性调用： 不需要
     *
     * @param output
     */
    @Override
    public void onPeriodicEmit(WatermarkOutput output) {

    }
}
```

3. 在数据源中发送水位线

```java
env.fromSource(
kafkaSource, WatermarkStrategy.forBoundedOutOfOrderness(Duration.ofSeconds(3)), "kafkasource"
)
```



### 水位线的传递

![image-20230602210040304](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230602210040304.png)



一个任务接到多个上游并行任务的水位线时，以最小的那个最为当期任务的事件时钟

## 窗口(Window)

### 窗口概念

#### 窗口

在Flink中，窗口可以把数据流切分成有限大小的多个存储桶，每个数据都会分发到对应的桶里，当达到窗口结束时间时，就对桶中的数据进行计算处理。

![image-20230602191533854](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230602191533854.png)



#### 分类

**按驱动类型分**

1. 时间窗口

以时间点来定义窗口的开始和结束

2. 计数窗口

基于元素的个数来截取数据

**按照窗口分配数据的规则**

1. 滚动窗口

滚动窗口有固定的大小，是一种对数据进行“均匀切片”的划分方式。**窗口之间没有重叠，也不会有间隔**

2. 滑动窗口

除去窗口大小外，还有滑动步长。

滑动窗口会有重叠，适合计算结果更新频率非常高的场景

![image-20230602192030657](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230602192030657.png)

3. 会话窗口

会话窗口基于时间来定义，参数是会话超时时间。

如果相邻两个数据到来的时间间隔（Gap）小于指定的大小（size），那说明还在保持会话，它们就属于同一个窗口；如果gap大于size，那么新来的数据就应该属于新的会话窗口，而前一个窗口就应该关闭了

![image-20230602192217677](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230602192217677.png)

4. 全局窗口

全局有效，窗口没有结束的时候，默认不会做触发计算，需要自定义触发器



### 窗口API

#### 按键分区窗口

使用keyby操作，数据集会被分为多条逻辑流keyedStream，会在多个并行子任务上运行。

```java
stream.keyBy(...)
.window(...)
```

#### 非按键分区

不会分为多条逻辑流，只在一个任务上运行。且无法调大窗口算子

```java
stream.windowAll(...)
```



#### 窗口API的调用

```java
stream.keyBy(<key selector>)
.window(<window assigner>)
.aggregate(<window function>)
```

指定窗口分配器和窗口函数

### 窗口分配器

作用：定义数据应该被分配到哪个窗口

#### 时间窗口

1. **滚动处理时间窗口**

```java
.window(TumblingProcessingTimeWindows.of(Time.seconds(5)))
```

2. **滑动处理时间窗口**

```java
.window(SlidingProcessingTimeWindows.of(Time.seconds(10)，Time.seconds(5)))
```

3. **处理时间会话窗口**

```java
.window(ProcessingTimeSessionWindows.withGap(Time.seconds(10)))
```

withDynamicGap() 动态提取gap

4. **滚动事件时间窗口**

```java
.window(TumblingEventTimeWindows.of(Time.seconds(5)))
```

5. **滑动事件时间窗口**

```java
.window(SlidingEventTimeWindows.of(Time.seconds(10), Time.seconds(5)))
```

6. **事件时间会话窗口**

```java
.window(EventTimeSessionWindows.withGap(Time.seconds(10)))
```

#### 计数窗口

1. **滚动计数窗口**

```java
stream.keyBy()
  .countWindow(10)
```

当元素数量达到10的时候，就会触发执行

2. **滑动计算窗口**

```java
.countWindow(10,3)
```

长度是10，步长是3，每个窗口统计10个数据，每隔3个数据输出一次结果

3. **全局窗口**

```java
.window(GlobalWindows.create())
```

需要注意使用全局窗口，必须自行定义触发器才能实现窗口计算，否则起不到任何作用。

### 窗口函数

经窗口分配器处理之后，数据可以分配到对应的窗口中，窗口函数(window functions)定义窗口如何进行计算。 

经过窗口分配器得到的数据类型是`windowedStream`，经过窗口函数处理后再次得到`DataStream`。

<img src="https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230602132933477.png" alt="数据流之间的转换" style="zoom:50%;" />

根据处理的方式的不同，分为增量聚合函数和全窗口函数

#### 增量聚合函数

每来一条数据立即进行计算，中间保持一个简单的聚合状态，不输出。

1. 归约函数(ReduceFunction)

   ```java
   // 2. 窗口函数： 增量聚合 Reduce
   /**
            * 窗口的reduce：
            * 1、相同key的第一条数据来的时候，不会调用reduce方法
            * 2、增量聚合： 来一条数据，就会计算一次，但是不会输出
            * 3、在窗口触发的时候，才会输出窗口的最终计算结果
            */
   SingleOutputStreamOperator<WaterSensor> reduce = sensorWS.reduce(
     new ReduceFunction<WaterSensor>() {
       @Override
       public WaterSensor reduce(WaterSensor value1, WaterSensor value2) throws Exception {
         System.out.println("调用reduce方法，value1=" + value1 + ",value2=" + value2);
         return new WaterSensor(value1.getId(), value2.getTs(), value1.getVc() + value2.getVc());
       }
     }
   );
   ```

   

2. 聚合函数(AggregateFunction)

聚合状态的类型、输出结果的类型和输入数据类型可以不一致

接口中有四个方法： 

- createAccumulator()：创建一个累加器，这就是为聚合创建了一个初始状态，每个聚合任务只会调用一次。 

- add()：将输入的元素添加到累加器中。 

- getResult()：从累加器中提取聚合的输出结果。 

- merge()：合并两个累加器，并将合并后的状态作为一个累加器返回。 

```java
/**
         * 1、属于本窗口的第一条数据来，创建窗口，创建累加器
         * 2、增量聚合： 来一条计算一条， 调用一次add方法
         * 3、窗口输出时调用一次getresult方法
         * 4、输入、中间累加器、输出 类型可以不一样，非常灵活
         */
SingleOutputStreamOperator<String> aggregate = sensorWS.aggregate(
  /**
                 * 第一个类型： 输入数据的类型
                 * 第二个类型： 累加器的类型，存储的中间计算结果的类型
                 * 第三个类型： 输出的类型
                 */
  new AggregateFunction<WaterSensor, Integer, String>() {
    /**
                     * 创建累加器，初始化累加器
                     * @return
                     */
    @Override
    public Integer createAccumulator() {
      System.out.println("创建累加器");
      return 0;
    }

    /**
                     * 聚合逻辑
                     * @param value
                     * @param accumulator
                     * @return
                     */
    @Override
    public Integer add(WaterSensor value, Integer accumulator) {
      System.out.println("调用add方法,value="+value);
      return accumulator + value.getVc();
    }

    /**
                     * 获取最终结果，窗口触发时输出
                     * @param accumulator
                     * @return
                     */
    @Override
    public String getResult(Integer accumulator) {
      System.out.println("调用getResult方法");
      return accumulator.toString();
    }

    @Override
    public Integer merge(Integer a, Integer b) {
      // 只有会话窗口才会用到
      System.out.println("调用merge方法");
      return null;
    }
  }
);
```



Flink也为窗口的聚合提供了一系列预定义的简单聚合方法，可以直接基于WindowedStream调用。主要包括.sum()/max()/maxBy()/min()/minBy

我们可以发现，增量聚合函数其实就是在用流处理的思路来处理有界数据集，核心是保持一个聚合状态，当数据到来时不停地更新状态。



#### 全窗口函数(full window functions)

窗口操作中的另一大类就是全窗口函数。与增量聚合函数不同，全窗口函数需要先收集窗口中的数据，并在内部缓存起来，等到窗口要输出结果的时候再取出数据进行计算。 包含上下文信息

1. 窗口函数（windowfunction）

   逐渐弃用

```java
stream
.keyBy(<key
.window(<window
.apply(new MyWindowFunction());
```

2. 处理窗口函数(ProcessWindowFunction)

可以拿到窗口中的数据、上下文对象（窗口信息、当前的时间和状态）

```java
SingleOutputStreamOperator<String> process = sensorWS
  .process(
  new ProcessWindowFunction<WaterSensor, String, String, TimeWindow>() {
    /**
                             * 全窗口函数计算逻辑：  窗口触发时才会调用一次，统一计算窗口的所有数据
                             * @param s   分组的key
                             * @param context  上下文
                             * @param elements 存的数据
                             * @param out      采集器
                             * @throws Exception
                             */
    @Override
    public void process(String s, Context context, Iterable<WaterSensor> elements, Collector<String> out) throws Exception {
      // 上下文可以拿到window对象，还有其他东西：侧输出流 等等
      long startTs = context.window().getStart();
      long endTs = context.window().getEnd();
      String windowStart = DateFormatUtils.format(startTs, "yyyy-MM-dd HH:mm:ss.SSS");
      String windowEnd = DateFormatUtils.format(endTs, "yyyy-MM-dd HH:mm:ss.SSS");

      long count = elements.spliterator().estimateSize();

      out.collect("key=" + s + "的窗口[" + windowStart + "," + windowEnd + ")包含" + count + "条数据===>" + elements.toString());


    }
  }
);
```

#### 增量聚合和全窗口的结合

.reduce / .aggregate 传入两个参数，基于第一个参数（增量聚合函数）来处理窗口数据，每来一个数据就做一次聚合；等到窗口需要触发计算时，则调用第二个参数（全窗口函数）的处理逻辑输出结果。

```java
SingleOutputStreamOperator<String> result = sensorWS.aggregate(
  new MyAgg(),
  new MyProcess()
);
```

这里的全窗口函数就不再缓存所有数据了，而是直接将增量聚合函数的结果拿来当作了Iterable类型的输入。

窗口处理的主体还是增量聚合，而引入全窗口函数又可以获取到更多的信息包装输出，这样的结合兼具了两种窗口函数的优势，在保证处理性能和实时性的同时支持了更加丰富的应用场景。

### 其他API

1. 触发器（Trigger）

触发执行窗口函数

```java
stream.keyBy(...)
.window(...)
.trigger(new MyTrigger())
```

2. 移除器(Evictor)

```java
stream.keyBy(...)
.window(...)
.evictor(new MyEvictor())
```

3. 允许延迟

```jav
stream.keyBy(...)
. TumblingEventTimeWindows.of(Time.hours(1))
.allowedLateness(Time.minutes(1))
```

一个小时滚动窗口，允许1分钟的延迟。触发计算和清除窗口操作分开了

4. 侧输入流

```java
OutputTag<WaterSensor> lateTag = new OutputTag<>("late-data",Types.POJO(WaterSensor.class));

.window(TumblingEventTimeWindows.of(Time.seconds(10)))
.allowedLateness(Time.seconds(2)) // 推迟2s关窗
.sideOutputLateData(lateTag) // 关窗后的迟到数据，放入侧输出流
process.getSideOutput(lateTag).printToErr("关窗后的迟到数据");

```

### 窗口的生命周期

1. 创建

由窗口分配器指定

2. 窗口计算的触发

窗口函数和触发器

3. 窗口的销毁

时间达到结束点，只对时间窗口有销毁机制，计数窗口和全局窗口不会。



## 迟到数据的处理

### 推迟水印推进

设置乱序容忍度

```java
WatermarkStrategy.forBoundedOutOfOrderness(Duration.ofSeconds(10));
```

### 窗口延迟关闭

```.allowedLateness```

允许迟到只能用在Event time 上

### 使用侧流接受迟到的数据

如上（侧输入流）





## 基于时间的合流

### 窗口联结(window join)

```java
stream1.join(stream2)
.where(<KeySelector>)
.equalTo(<KeySelector>)
.window(<WindowAssigner>
.apply(<JoinFunction>)
```



where制定第一条流中的key

equalTo 传入第二条流中的key

上述两者相同的元素，如果在同一个窗口中，则通过联结函数进行处理

window 传入窗口分配器



类似于有固定时间范围的inner join ，左边有，右边有。

```java
.apply(new JoinFunction<Tuple2<String, Integer>, Tuple3<String, Integer, Integer>, String>() {
  /**
                     * 关联上的数据，调用join方法
                     * @param first  ds1的数据
                     * @param second ds2的数据
                     * @return
                     * @throws Exception
                     */
  @Override
  public String join(Tuple2<String, Integer> first, Tuple3<String, Integer, Integer> second) throws Exception {
    return first + "<----->" + second;
  }
});
```



### 间隔联结（Interval Join）

#### 原理

![image-20230602181351533](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230602181351533.png)



#### 调用

```java
stream1
.keyBy(<KeySelector>)
.intervalJoin(stream2.keyBy(<KeySelector>))
.between(Time.milliseconds(-2), Time.milliseconds(1))
.process (new ProcessJoinFunction<Integer, Integer, String(){
@Override
  //每当检测到一组匹配，就会调用这里的.processElement()方法
public void processElement(Integer left, Integer right, Context ctx, Collector<String> out) {
out.collect(left + "," + right);
}
});

```

#### 处理迟到数据实例

使用侧流

```java
//2. 调用 interval join
OutputTag<Tuple2<String, Integer>> ks1LateTag = new OutputTag<>("ks1-late", Types.TUPLE(Types.STRING, Types.INT));
OutputTag<Tuple3<String, Integer, Integer>> ks2LateTag = new OutputTag<>("ks2-late", Types.TUPLE(Types.STRING, Types.INT, Types.INT));
SingleOutputStreamOperator<String> process = ks1.intervalJoin(ks2)
  .between(Time.seconds(-2), Time.seconds(2))
  .sideOutputLeftLateData(ks1LateTag)  // 将 ks1的迟到数据，放入侧输出流
  .sideOutputRightLateData(ks2LateTag) // 将 ks2的迟到数据，放入侧输出流
  .process(
  new ProcessJoinFunction<Tuple2<String, Integer>, Tuple3<String, Integer, Integer>, String>() {
    /**
                             * 两条流的数据匹配上，才会调用这个方法
                             * @param left  ks1的数据
                             * @param right ks2的数据
                             * @param ctx   上下文
                             * @param out   采集器
                             * @throws Exception
                             */
    @Override
    public void processElement(Tuple2<String, Integer> left, Tuple3<String, Integer, Integer> right, Context ctx, Collector<String> out) throws Exception {
      // 进入这个方法，是关联上的数据
      out.collect(left + "<------>" + right);
    }
  });

process.print("主流");
process.getSideOutput(ks1LateTag).printToErr("ks1迟到数据");
process.getSideOutput(ks2LateTag).printToErr("ks2迟到数据");
```



