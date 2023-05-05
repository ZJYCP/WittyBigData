---
title: Kafka生产者
icon: page
order: 21
author: 余生
# date: 2020-01-01
category:
  - 大数据组件
tag:
  - Kafka
  - 生产者
sticky: false
star: true
#footer: 这是测试显示的页脚
#copyright: 无版权



---

本章主要介绍Kafka生成者发送消息流程、同步异步发送，分区规则

<!-- more -->

## 生产者发送消息流程

### 发送原理

![生产者发送数据流程](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230505155642915.png)

### 异步发送API-JAVA 

#### 普通异步发送

```java
package com.atguigu.kafka.producer;
import org.apache.kafka.clients.producer.KafkaProducer; import org.apache.kafka.clients.producer.ProducerRecord;
import java.util.Properties;
public class CustomProducer {
public static void main(String[] args) throws InterruptedException {
// 1. 创建 kafka 生产者的配置对象
Properties properties = new Properties();
// 2. 给 kafka 配置对象添加配置信息:bootstrap.servers
properties.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "hadoop102:9092");
// key,value 序列化(必须):key.serializer，value.serializer
  properties.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, "org.apache.kafka.common.serialization.StringSerializer");
properties.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, "org.apache.kafka.common.serialization.StringSerializer");
// 3. 创建 kafka 生产者对象
KafkaProducer<String, String> kafkaProducer = new KafkaProducer<String, String>(properties);
// 4. 调用 send 方法,发送消息 for (int i = 0; i < 5; i++) {
kafkaProducer.send(new ProducerRecord<>("first","atguigu " + i));
}
// 5. 关闭资源
        kafkaProducer.close();
    }
}
```

#### 带回调函数的异步发送

回调函数会在 producer 收到 ack 时调用，为异步调用，该方法有两个参数，分别是元 数据信息(RecordMetadata)和异常信息(Exception)，如果 Exception 为 null，说明消息发 送成功，如果 Exception 不为 null，说明消息发送失败。

```java
// 2 发送数据
for (int i = 0; i < 500; i++) {
  kafkaProducer.send(new ProducerRecord<>("first", "atguigu" + i), new Callback() {
    @Override
    public void onCompletion(RecordMetadata metadata, Exception exception) {

      if (exception == null){
        System.out.println("主题： "+metadata.topic() + " 分区： "+ metadata.partition());
      }
    }
  });

  Thread.sleep(2);
}
```

### 同步发送API-JAVA 

```java
kafkaProducer.send(new ProducerRecord<>("first","kafka" + i)).get();
```

## 生产者分区

### 分区好处

1. 便于合理使用存储资源
2. 提高并行度

### 分区策略

#### 1. 默认分区规则  DefaultPartitioner

1. 指定partition
2. key的hash取模
3. 粘性分区，随机选取

![默认分区规则](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230505170909150.png)

#### 2. 自定义分区器

需求：发送过来的数据中如果包含 atguigu，就发往 0 号分区，不包含 atguigu，就发往 1 号分区。

1. 实现partition接口，重写partition方法

```java
package com.atguigu.kafka.producer;

import org.apache.kafka.clients.producer.Partitioner;
import org.apache.kafka.common.Cluster;

import java.util.Map;

public class MyPartitioner implements Partitioner {
    @Override
    public int partition(String topic, Object key, byte[] keyBytes, Object value, byte[] valueBytes, Cluster cluster) {

        // 获取数据 atguigu  hello
        String msgValues = value.toString();

        int partition;

        if (msgValues.contains("atguigu")){
            partition = 0;
        }else {
            partition = 1;
        }

        return partition;
    }

    @Override
    public void close() {

    }

    @Override
    public void configure(Map<String, ?> configs) {

    }
}

```

2. 使用分区器

```java
properties.put(ProducerConfig.PARTITIONER_CLASS_CONFIG,"com.atguigu.kafka.producer.MyPartitioner");
```

## 生产者如何提高吞吐量

1. batch.size 批次大小 默认16k
2. linger.ms 等待时间，默认0
3. compression.type ： 压缩方法
4. recordAccumulator：缓冲区大小

```java
properties.put(ProducerConfig.BATCH_SIZE_CONFIG, 16384);
properties.put(ProducerConfig.LINGER_MS_CONFIG, 1);
properties.put(ProducerConfig.BUFFER_MEMORY_CONFIG,33554432);
//默认 none，可配置值 gzip、snappy、 lz4 和 zstd
properties.put(ProducerConfig.COMPRESSION_TYPE_CONFIG,"snappy");
```



## 数据可靠性

### ACK应答

**0**:生产者发送过来的数据，不需要等数据落盘应答，可靠性差，效率高;

**1**:生产者发送过来的数据，**Leader**收到数据后应答，可靠性中等，效率中等，一般用于传输普通日志

**-1**(**all**):生产者发送过来的数据，**Leader**和**ISR**队列里面 的所有节点收齐数据后应答，可靠性高，效率低，一般用于传输和钱相关的数据。

![ack：all](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230505184347120.png)

针对-1

Leader维护了一个动态的in-sync replica set(**ISR**)，意为和 Leader保持同步的Follower+Leader集合(leader:0，isr:0,1,2)

如果Follower长时间未向Leader发送通信请求或同步数据，则 该Follower将被踢出ISR。该时间阈值由**replica.lag.time.max.ms**参 数设定，默认30s。例如2超时，(leader:0, isr:0,1)。



**数据完全可靠条件 = ACK级别设置为-1 + 分区副本大于等于2 + ISR里应答的最小副本数量大于等于2**



**数据重复性**

![ack=-1数据重复性](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230505184822042.png)

### 代码配置

```java
properties.put(ProducerConfig.ACKS_CONFIG, "all");

// 重试次数retries，默认是int最大值，2147483647 properties.put(ProducerConfig.RETRIES_CONFIG, 3);

```



## 数据去重

### 数据传递语义

**至少一次（At Least Once）**： ACK=-1，分区副本>=2，ISR应答最小副本数>=2

**最多一次（At Most Once**）：ACK=0

至少一次可以保证数据不丢失，但是不能保证数据不重复

最多一次可以保证数据不重复，不能保证数据不丢失



精确一次（Exactly Once）：幂等性与事务



### 幂等性

#### 介绍

**幂等性**：Producer不论向Broker发送多少次重复数据，Broker端都只会持久化一条，保证了不重复

**精确一次（Exactly Once）** = 幂等性 + 至少一次



重复判断的依据：

具有相同**<PID ,partition, SeqNumber>**的消息，Broker会持久化一条新的。PID是Kafka每次重启后分配一个新的，Partition表示分区号，Sequence Number是单调自增的。

幂等性只能保证的是在**单分区单会话内不重复**

![幂等性](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230505192731756.png)

#### 开启

```
enable.idempotence 
```

### 生产者事务

![事务](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230505193825808.png)

## 数据有序

- 单分区内有序
- 多分区，分区与分区间无序



## 数据乱序

![解决单分区内乱序](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230505194432241.png)

1. kafka在1.x版本之前保证数据单分区有序，条件如下:

**max.in.flight.requests.per.connection**=1(不需要考虑是否开启幂等性)

2. kafka在1.x及以后版本保证数据单分区有序，条件如下:

   1. 未开启幂等性，同上

   2. 开启幂等性

      **max.in.flight.requests.per.connection**需要设置小于等于**5**。

      原因说明:因为在kafka1.x以后，启用幂等后，kafka服务端会缓存producer发来的最近5个request的元数据， 故无论如何，都可以保证最近5个request的数据都是有序的。根据SeqNumber排序。
