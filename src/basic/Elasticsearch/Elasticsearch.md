---
title: Elasticsearch简介
icon: page
order: 20
author: 余生
# date: 2020-01-01
category:
  - 大数据组件
tag:
  - Elasticsearch
  - 知识点
sticky: false
star: true
#footer: 这是测试显示的页脚
#copyright: 无版权

---

`more` 注释之前的内容被视为文章摘要。

<!-- more -->



## 简介

<img src="https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230502172542578.png" alt="image-20230502172542578" style="zoom:67%;" />

![image-20230502172702280](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230502172702280.png)



## 核心概念



### Cluster

代表集群，集群中有多个节点，其中一个是主节点，主节点是通过选举产生的。

ES去中心化



### Shard

索引库分片，把一个大的索引库水平拆分成多个分片，构成分布式搜索，提高性能和吞吐量

分片的数量只能在创建索引库的时候指定，创建后不能更改

默认一个分片

一个分片最多存储，Integer.Max - 128

### Replica

分片的副本

- 提高系统的容错性和查询效率

副本数量可以随时修改



### Recovery

数据恢复或者数据重新分布

- 新节点
- 挂掉的节点恢复 

 















