---
title: Kafka消费者
icon: page
order: 32
author: 余生
# date: 2020-01-01
category:
  - 大数据组件
tag:
  - Kafka
  - 消费者
sticky: false
star: true


---

本章主要介绍Kafka 消费者

<!-- more -->

## Kafka消费方式



- 拉模式
- 推模式



pull模式不足之处，如果Kafka没有数据，消费者可能会陷入循环，一直返回空数据

## Kafka消费者工作流程

### 消费者总体工作流程

![消费者](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230508140213823.png)

### 消费者组原理

- 消费者组（Consumer Group，CG），由多个Consumer组成
- 消费者组每个消费者负责消费不同分区的数据，**一个分区只能由一个组内消费者消费**
- 消费者组之间互不影响，消费者组是逻辑上的一个订阅者
- 超过主题分区数量，有一部分消费者会闲置不接受任何消息

![消费者组](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230508152155712.png)

![消费者组](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230508152220795.png)

### 消费者组初始化流程

- coordinator：辅助实现消费者组的初始化和分区的分配

coordinate节点选择 = groupid的hashcode % 50 （__consumer_offsets的分区数量）

![消费者组初始化](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230508152702172.png)

### 消费者组详细消费流程

![image-20230508154027174](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230508154027174.png)

## 消费者API

### 独立消费者

```java
public class CustomConsumer {
public static void main(String[] args) {
// 1.创建消费者的配置对象
Properties properties = new Properties();
// 2.给消费者配置对象添加参数
properties.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, "hadoop102:9092");
// 配置序列化 必须 properties.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
properties.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
// 配置消费者组(组名任意起名) 必须 properties.put(ConsumerConfig.GROUP_ID_CONFIG, "test");
// 创建消费者对象
KafkaConsumer<String, String> kafkaConsumer = new KafkaConsumer<String, String>(properties);
// 注册要消费的主题(可以消费多个主题) 
  ArrayList<String> topics = new ArrayList<>(); topics.add("first"); kafkaConsumer.subscribe(topics);
// 拉取数据打印
while (true) {
// 设置 1s 中消费一批数据
ConsumerRecords<String, String> consumerRecords =
kafkaConsumer.poll(Duration.ofSeconds(1));
// 打印消费到的数据
for (ConsumerRecord<String, String> consumerRecord : consumerRecords) {
} }
}
```

### 订阅分区

```java
// 消费某个主题的某个分区数据
ArrayList<TopicPartition> topicPartitions = new ArrayList<>();
topicPartitions.add(new TopicPartition("first", 0)); kafkaConsumer.assign(topicPartitions);
```



### 消费者组案例

复制一份基础消费者的代码，在 IDEA 中同时启动，即可启动同一个消费者组中的两个消费者

- 控制消费者组ID相同



## 分区的分配和再平衡

解决消费者消费哪个partition

- Kafka有四种主流的分区分配策略: **Range、RoundRobin、Sticky、CooperativeSticky**。可以通过配置参数partition.assignment.strategy，修改分区的分配策略。默认策略是Range+ CooperativeSticky

### Range

![Range](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230508155513104.png)

1.  首先对同一个 topic 里面的分区按照序号进行排序，并对消费者按照字母顺序进行排序

2. 通过 partitions数/consumer数 来决定每个消费者应该消费几个分区。**如果除不尽，那么前面几个消费者将会多消费 1 个分区**

注意如果有N个topic，那么C0都将多消费1个分区的数据，容易产生**数据倾斜**



### Range再平衡

0 号消费者挂掉后，消费者组需要按照超时时间 45s 来判断它是否退出，所以需要等待，时间到了 45s 后，判断它真的退出就会把任务分配给其他 broker 执行。



### RoundRobin

![RoundRobin](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230508161611716.png)

- RoundRobin 针对集群中**所有Topic而言**

- RoundRobin 轮询分区策略，是把所有的 partition 和所有的 consumer 都列出来，然后按照 **hashcode** 进行排序，最后 通过**轮询算法**来分配 partition 给到各个消费者

```java
// 修改分区分配策略 
properties.put(ConsumerConfig.PARTITION_ASSIGNMENT_STRATEGY_CONFI G, "org.apache.kafka.clients.consumer.RoundRobinAssignor");
```

### Sticky以及再平衡

粘性分区定义:可以理解为分配的结果带有“粘性的”。即在执行一次新的分配之前， 考虑上一次分配的结果，尽量少的调整分配的变动，可以节省大量的开销

粘性分区是 Kafka 从 0.11.x 版本开始引入这种分配策略，首先会**尽量均衡的放置分区到消费者上面**，在出现同一消费者组内消费者出现问题的时候，会尽量**保持原有分配的分区不变化**

## Offset位移

### offset维护位置

消费者Offset消费信息维护在Kafka内置的主题__consumer_offsets中，0.9版本之前在zk中



__consumer_offsets：key是**group.id + topic + 分区号**，value是当前offset的值



默认不能消费系统主题，在配置文件中添加配置```exclude.internal.topics=false```



### 自动提交offset

- enable.auto.commit，默认true
- auto.commit.interval.ms，默认5s

![image-20230508162949634](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230508162949634.png)



### 手动提交offset

#### 同步提交

必须等待offset提交完毕，再去消费下一批数据。

由于同步提交 offset 有失败重试机制，故更加可靠，但是由于一直等待提交结果，提交的效率比较低

```java
//是否自动提交offset
properties.put(ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG, false);
// 同步提交offset
consumer.commitSync();
```



#### 异步提交

发送完提交offset请求后，就开始消费下一批数据了

生产中，异步会更多一点

```java
// 异步提交offset
consumer.commitAsync();
```



### 指定offset消费

- auto.offset.reset = earliest | latest | none

1. 最早的
2. 最新的，默认
3. none：未找到offset，抛异常
4. 指定offset

```java
Set<TopicPartition> assignment= new HashSet<>();
while (assignment.size() == 0) 
{ kafkaConsumer.poll(Duration.ofSeconds(1));
// 获取消费者分区分配信息(有了分区分配信息才能开始消费) 
                  assignment = kafkaConsumer.assignment();
}
// 遍历所有分区，并指定 offset 从 1700 的位置开始消费 
for (TopicPartition tp: assignment) {
            kafkaConsumer.seek(tp, 1700);
}
```



### 指定时间消费

![image-20230508165239805](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230508165239805.png)

### 漏消费和重复消费

#### 重复消费

自动提交offset引起

![重复消费](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230508165616287.png)

#### 漏消费

设置为手动提交，offset被提交时，数据还在内存中未落盘

![漏提交](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230508165750262.png)

## 消费者事务

![消费者事务](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230508165817939.png)

- Kafka消费端将消费过程和提交offset 过程做原子绑定



## 数据积压

- 增加分区数量，同时提高消费者数量
- 如果下游数据处理不及时，提高每批次拉取的数据。如果拉取的数据过少，单位时间处理的数据小于生产速度，也会造成数据积压。 默认500条