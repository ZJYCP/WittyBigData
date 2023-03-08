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

RM是一个全局的资源管理器，负责**整个系统的资源管理和分配**，由调度器（Scheduler）和应用程序管理器（Application Manager）组成。

调度器：将系统中的资源分配给正在运行的应用程序

应用程序管理器：负责应用程序的提交，与调度器协商资源启动Application Master

- Application Master

	1. 与RM调度器协商以获得资源
	1. 将得到的任务分配给内部的任务
	1. 与NN通信以启动、停止任务
	1. 监控所有内部任务的状态，负责重新申请资源重启任务

- nodeManager

每个节点上的资源和任务管理器，将RM汇报本节点的资源使用情况和各个Container运行状态。

接受处理来着AM的停止启动container请求

- container

Yarn中的资源抽象，封装了各种资源，一个应用程序分配一个container。



### yarn的任务提交流程

![image-20230309000500649](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230309000500649.png)

当jobclient向yarn提交一个应用程序后，将分两阶段运行这个应用程序。一是启动Application Master，二是由AM创建应用程序，申请资源，监控运行。

具体如下:

1. 客户端向yarn提交应用程序，并指定AM程序，启动AM命令，用户程序。
2. RM为这个应用程序分配第一个Container，并与之对应的NM通讯，要求在这个Container中启动应用程序AM
3. AM向RM注册，然后拆分为内部各个子任务，为各个子任务申请资源，监控任务运行
4. AM采用轮询的方式向RM申请和领取资源
5. RM为AM分配资源，以Container形式返回
6. AM申请到资源后，便与之对应的NM通信，要求NM启动任务
7. NM为任务设置好运行环境，将任务启动命令写到一个脚本，并通过这个脚本启动任务
8. 各个任务向AM汇报自己的状态和进度，以便任务失败时可以重启
9. 应用程序完成后，AM向RM注销并关闭自己

## RM和NM的功能介绍







## Application Master介绍







## yarn的资源调度