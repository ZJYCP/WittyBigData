---
title: 集群资源管理器——YARN
icon: page
order: 20
category:
  - 大数据组件
tag:
  - Hadoop
  - Yarn
  - 知识点
#sticky: false
#star: true
---

YARN 是 Hadoop2 引入的通用的资源管理和任务调度的平台，可以在 YARN 上运行 MapReduce、Tez、Spark 等多种计算框架

<!-- more -->



## Yarn的架构

### yarn集群架构和工作原理

![image-20230308210737488](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230308210737488.png)

yarn由两个服务组成，ResourceManager和ApplicationMaster

- ResourceManager

RM是一个全局的资源管理器，负责**整个系统的资源管理和分配**，由调度器（Scheduler）和应用程序管理器（Application Manager）组成