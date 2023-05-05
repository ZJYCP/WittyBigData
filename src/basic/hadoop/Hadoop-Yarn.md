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

### ResourceManager（RM）基本介绍

1. **职能**

- **与客户端交互**，处理客户端的请求
- **启动和管理AM**，并在运行失败的时候重新启动它
- **管理NM**，接受来自NM的资源汇报信息，并想NM下达管理指令
- **资源管理和调度**，接收来自AM的资源请求，并为它分配资源

2. **RM的内部结构**

![image-20230314192823193](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230314192823193.png)

- 用户交互模块
  1. clientRMService：为不同用户服务，提交程序，终止程序，获取程序状态
  2. adminService：给管理员提供服务
  3. WebAPP
- NM管理模块
  1. NMLivelinessMonitor：**监控NM是否活着**，如果指定时间未收到心跳，就从集群中删除。RM会通过心跳告知AM某个NM上的Container失效，如果AM判断需要重新执行，则AM重新向RM申请资源
  2. NodeListManager：**维度inlude和exlude的NM节点列表**。exlude列表里的NM不允许与RM进行通信
  3. ResourceTrackerService：处理来自NM的请求，包括注册（节点ID、可用资源上线）和心跳（各个Container运行状态，运行Application列表，节点健康状态）。
- AM管理模块
  1. AMLivelinessMonitor：**监控AM是否活着**，如果指定时间内没有收到心跳，则将正在运行的Container设置为失败状态，而AM会被重新分配到另一个节点上。
  2. ApplicationMasterLauncher：**要求某一个NM启动ApplicationMaster**，他处理创建AM和kill Am的请求
  3. ApplicationMasterService：**处理来自AM的请求**。注册、心跳、清理
- Application管理模块
  1. ApplicationACLsManager：管理应用程序的访问权限
  2. RMAppMAnager：管理应用程序的启动和关闭
  3. ContainerAllocationExpirer：RM分配Container给AM后，不允许AM长时间不对Container使用，因为会降低集群的利用率，如果超时还没有在NM上启动Container，RM就会强制回收Container。
- 状态机管理模块
  1. RMApp：
- 安全模块
- 资源分配模块
  - ResourceScheduler：资源调度器



3. **启动Application Master**

![image-20230314195744111](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230314195744111.png)

1. 客户端提交一个任务给RM，ClientRMService处理客户端请求
2. ClientRMService 通知RMAppManager
3. RMAppManager为应用程序创建RMApp对象来维护任务的状态
4. RMApp启动任务，创建RMAppAttempt对象
5. RMAppAttempt进行一些初始化工作，然后通知ResourceScheduler申请资源
6. ResourceScheduler为任务分配资源后，创建一个RMContainer维护Container状态
7. 通知RMAppAttempt已经分配资源
8. RMAppAttempt通知ApplicationMasterLauncher在资源上启动AM
9. 在NodeManager的已分配资源上启动AM
10. AM启动后向ApplicationMasterService注册



4. **申请和分配container**

![image-20230314203458656](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230314203458656.png)

AM向RM请求资源和RM为AM分配资源是两个循环过程：

阶段一：AM请求资源并领取资源，AM发送请求、RM记录请求

阶段二：NM向RM汇报各个Container运行状态，如果RM发现他在上面有空闲的资源就分配给等待的AM

具体来说：

- 阶段一：





5. 杀死Application







6. Container超时





7. 安全管理





### nodeManager功能介绍



1. **模块**

![image-20230314212118581](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230314212118581.png)

- NodeStatusUpdater：NM和RM的通讯通道。向RM注册、汇报节点可用资源、汇报各Container状态等。



- **ContainerManager**
- RPC Server：AM和NM通讯的通道，接收AM请求，启动停止Container
- ResourceLocalizationService：负责Container所需资源的本地化，下载资源文件
- ContainersLauncher：维护一个线程池并行操作Container
- AuxServices
- ContainerMonitor：监控Container的资源使用量
- LogHandle：控制Container保存
- ContainerEventDispatcher:将ContainerEvent调度 给对应的Container状态机
- ApplicationEventDispatcher
- ContainerExecutor：启动和清除Container对应的进程
- NodeHealthCheckerServiceNodeHealthCheckerService
- DeletionService：文件删除
- Security：安全模块
- WebServer



2. **状态机管理**

- Application状态机：维护自己节点的Application状态
- Container状态机：维护Container的生命周期
- LocalizedResource状态机：维护资源（文件、jar包）生命周期的数据结构



3. **Container生命周期的管理**

接收AM的请求启动Container

1. 资源本地化：分布式缓存。应用程序初始化、Container本地化
2. 运行Container：由containerLauncher服务调用ContainerExecutor进行。将待运行的Container所需要的环境变量和运行命令写到shell脚本launch_container.sh中，并将启动该脚本的命令写到default_container_executor.sh中，然后启动改脚本

3. 资源清理：资源本地化的逆过程，Container运行完成后，NodeManager来回收资源



## Application Master介绍

AM是特定计算框架(MapReduce)的一个实例，负责与RM协商资源，和NM协同执行、监控Container

### AM的职能

1. 注册，将RM报告自己活跃信息
2. 计算应用程序的资源需求
3. 将需求转换为YARN调度器可以理解的ResourceRequest
4. 与调度器协商申请资源
5. 与NodeManager协同合作使用分配的Container
6. 跟踪正在运行的Container状态，监控它的运行
7. 对Container或者节点失败的情况进行处理，在必要的情况下重新申请资源



### 报告活跃

1. 注册

 AM执行的第一个操作就是向RM注册，告知IPC地址和网页URL

IPC地址是面相客户端的服务地址，网页URL是AM的Web服务地址



2. 心跳

注册成功后，AM周期性的发送心跳到RM确认他还活着

### 资源需求

1. 静态资源

在任务提交时就确定，在AM运行时不再变化的资源，比如MapReduce中的map数量

2. 动态资源

在运行时确定要请求数量的资源

### 调度任务

当AM的资源请求达到一定数量或者到了心跳时，AM才会发送心跳

心跳：resourceReuest =》 resourceAsks、ContainerID、containersToBeReleased

RM的响应：新分配的Container列表，已完成的Container状态，集群可用资源上限



### 启动Container

1. AM从RM那里得到Container就可以启动Container
2. AM首先构造ContainerLaunchContext对象，包括了分配资源的大小、安全令牌、启动Container执行的命令、进程环境、必要的文件等
3. AM与NM通讯，发送startContainerRequest请求，逐一或者批量启动Container
4. NM通过StartContainerResponse回应请求，包括成功启动的Container，失败的
5. 整个过程中，AM没有跟RM进行通信
6. AM也可以发送stopContainerRequest请求来停止Container



### AM的失败和恢复

当 AM 失效后，YARN 只负责重新启动一个 AM，任务恢复到失效前的状态是由 AM 自己完成的。AM 为了能实现恢复任务的目标，可以采用以下方案:将任务的状 态持久化到外部存储中。比:MapReduce 框架的 ApplicationMaster 会将已完 成的任务持久化，失效后的恢复时可以将已完成的任务恢复，重新运行未完成的 任务。







## yarn的资源调度

### 资源调度器的分类

不同任务类型对资源有不同的要求，有的对时间要求不是很高（HIVE），有的任务要求及时返回结果（HBase），有的是CPU密集型，有的是IO密集型。

### 基本结构

事件处理器

-   Node_Removed 集群中移除一个计算节点，资源调度器需要收到该事件后从可分配 的资源总量中移除相应的资源量。
-   Node_Added 集群增加一个节点
-   Application_added RM 收到一个新的 Application。
-   Application_Remove 表示一个 Application 运行结束
-   Container_expired 当一个 Container 分配给 AM 后，如果在一段时间内 AM 没有启动 Container，就触发这个事件。调度器会对该 Container 进行回收。
-   Node_Update RM 收到 NM 的心跳后，就会触发 Node_Update 事件。



### 资源调度的三种模型

Apache的hadoop默认capacity，CDH默认fair

1. 双层资源调度模型



2. 资源保证机制

3. 资源分配算法

4. 资源抢占模型

#### 层级队列管理机制 FIFO 调度策略



#### Capacity Scheduler





#### Fair Scheduler