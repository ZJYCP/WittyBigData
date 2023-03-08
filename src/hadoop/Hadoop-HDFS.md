---
# 这是文章的标题
title: 分布式文件存储系统——HDFS
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 1
# 设置作者
author: 余生
# 设置写作时间
date: 2020-01-01
# 一个页面可以有多个分类
category:
  - 大数据组件
# 一个页面可以有多个标签
tag:
  - Hadoop
  - HDFS
  - 知识点
# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在文章收藏中
star: true

---

HDFS （Hadoop Distributed File System）是 Hadoop 下的分布式文件系统，具有**高容错、高吞吐量**等特性，可以部署在**低成本**的硬件上

<!-- more -->

## HDFS设计原理

### HDFS架构

HDFS 遵循主/从架构，由单个 NameNode(NN) 和多个 DataNode(DN)以及SecondaryNameNode 组成：

- **NameNode** : 负责执行有关 `文件系统命名空间` 的操作，例如打开，关闭、重命名文件和目录等。它同时还负责集群**元数据的存储**，记录着文件中各个数据块的位置信息。
> 元数据：目录结构以及分块位置信息
- **DataNode**：负责提供来自文件系统客户端的读写请求，执行块的创建，删除等操作。
- **SecondaryNameNode** ： 监控HDFS的状态，获取HDFS元数据的快照。

### 文件系统命名空间

HDFS 的 `文件系统命名空间` 的层次结构与大多数文件系统类似 (如 Linux)， 支持目录和文件的创建、移动、删除和重命名等操作，支持配置用户和访问权限，但不支持硬链接和软连接。`NameNode` 负责维护文件系统名称空间，记录对名称空间或其属性的任何更改。

### 数据复制

为了保证容错性，HDFS 提供了数据复制机制。HDFS 将每一个文件存储为一系列**块**，每个块由多个副本来保证容错，块的大小和复制因子可以自行配置（默认情况下，块大小是 128M，默认复制因子是 3）。

![img](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/68747470733a2f2f67697465652e636f6d2f68656962616979696e672f426967446174612d4e6f7465732f7261772f6d61737465722f70696374757265732f68646673646174616e6f6465732e706e67.png)

### 数据复制的实现原理

大型的 HDFS 实例在通常分布在多个机架的多台服务器上，不同机架上的两台服务器之间通过交换机进行通讯。在大多数情况下，同一机架中的服务器间的网络带宽大于不同机架中的服务器之间的带宽。因此 HDFS 采用机架感知副本放置策略，对于常见情况，当复制因子为 3 时，HDFS 的放置策略是：

在写入程序位于 `datanode` 上时，就优先将写入文件的一个副本放置在该 `datanode` 上，否则放在随机 `datanode` 上。之后在另一个远程机架上的任意一个节点上放置另一个副本，并在该机架上的另一个节点上放置最后一个副本。此策略可以减少机架间的写入流量，从而提高写入性能。

![img](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/68747470733a2f2f67697465652e636f6d2f68656962616979696e672f426967446174612d4e6f7465732f7261772f6d61737465722f70696374757265732f686466732de69cbae69eb62e706e67.png)

如果复制因子大于 3，则随机确定第 4 个和之后副本的放置位置，同时保持每个机架的副本数量低于上限，上限值通常为 `（复制系数 - 1）/机架数量 + 2`，需要注意的是不允许同一个 `dataNode` 上具有同一个块的多个副本。

### 副本的选择

为了最大限度地减少带宽消耗和读取延迟，HDFS 在执行读取请求时，优先读取距离读取器**最近的副本**。如果在与读取器节点相**同的机架**上存在副本，则优先选择该副本。如果 HDFS 群集跨越多个数据中心，则优先选择**本地数据中心**上的副本。

### 架构的稳定性

1. 心跳机制和重新复制

每个 DataNode 定期向 NameNode 发送心跳消息，如果超过指定时间没有收到心跳消息，则将 DataNode 标记为死亡。NameNode 不会将任何新的 IO 请求转发给标记为死亡的 DataNode，也不会再使用这些 DataNode 上的数据。 由于数据不再可用，可能会导致某些块的复制因子小于其指定值，NameNode 会跟踪这些块，并**在必要的时候进行重新复制**。

2. 数据的完整性

由于存储设备故障等原因，存储在 DataNode 上的数据块也会发生损坏。为了避免读取到已经损坏的数据而导致错误，HDFS 提供了数据完整性校验机制来保证数据的完整性，具体操作如下：

当客户端创建 HDFS 文件时，它会计算文件的每个块的 `校验和`，并将 `校验和` 存储在同一 HDFS 命名空间下的单独的隐藏文件中。当客户端检索文件内容时，它会验证从每个 DataNode 接收的数据是否与存储在关联校验和文件中的 `校验和` 匹配。如果匹配失败，则证明数据已经损坏，此时客户端会选择从其他 DataNode 获取该块的其他可用副本。

3. 元数据磁盘故障

`FsImage` 和 `EditLog` 是 HDFS 的核心数据，这些数据的意外丢失可能会导致整个 HDFS 服务不可用。为了避免这个问题，可以配置 NameNode 使其支持 `FsImage` 和 `EditLog` 多副本同步，这样 `FsImage` 或 `EditLog` 的任何改变都会引起每个副本 `FsImage` 和 `EditLog` 的同步更新。

4. 支持快照

快照支持在特定时刻存储数据副本，在数据意外损坏时，可以通过回滚操作恢复到健康的数据状态。


## HDFS的特点

1. 高容错：有副本机制
2. 高吞吐量：高吞吐量，而非低延迟
3. 大文件支持：GB到TB级别的
4. 简单一致性模型：适合一次写入多次读取的访问模型。支持将内容追加到文件末尾，但不支持数据的随机访问，不能从文件任意位置新增数据
5. 跨平台移植性：其他大数据计算框架都可以将其作为数据持久化的方案
6. 分块存储

### 安全模式

- 用于确保数据块的完整性

在hdfs启动后，会计算datanode上的**副本率**，如果小于某个阈值(0.99)，则会复制副本到其他datanode。

在安全模式下，系统**只接受读数据请求**，不接受删除，修改等变更请求

```shell
hdfs dfsadmin -safemode get (enter、leave)
```



## HDFS基础命令行操作

```shell
hdfs dfs # 前缀
hdfs dfs -ls URI
.. -lsr URL # 递归显示
-mkdir [-p] paths #[递归]创建目录
-put <local> <dst> # 本地拷贝到hdfs
-moveFromLocal <lcoal> <dst> # 本地移动到hdfs
-appendToFile <local> <dst> # 追加到指定文件中

-get <src> <local> # 文件拷贝到本地 -crc -ignorecrc
-copyToLocal <src> <local> # hdfs拷贝到本地

-move URI <dest> # 移动文件，不能跨文件系统
-rm [-r] URI # 删除
-cp URI <dest> #拷贝
-cat
-tail
-text
-chmod #改变文件权限
-chown # 改变所属用户和用户组
-df
-du
-count
-setrep # 设置副本数量
```



## HDFS的block和副本机制

### 抽象为block的好处

1. 一个文件可能大于集群中的任意一块磁盘
2. 简化存储子系统
3. 适合数据备份，提高容错和可用性

### 块缓存

**通常Datanode从磁盘中读取块，但对于频繁访问的文件，其块会被缓存到Datanode的内存汇中，以堆外块缓存的形式存在**

作业调度器通过在缓存块的DataNode上运行任务，提高读操作性能



### hdfs的文件权限验证

```
r:read
w:write
x:execute
```

## HDFS写文件操作

![image-20230306203654621](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230306203654621.png)

1. **Client发起文件上传请求**，通过**RPC**NameNode进行通信，NameNode检查目标文件是否存在，父目录是否存在，返回是否可以上传
2. Client请求第一个block该传输到哪些DataNode上
3. NameNode根据备份数和机架感知原理进行文件分配，返回DataNode的地址 A、B、C
4. Client请求3台DataNode中的一台A（建立pipeline），A收到后调用B，B调用C，建立完成后，逐级返回client
5. Client开始往A传第一个block，以packet(64K)为单位，A收到后给B，B给C。A会维护一个应答响应队列
6. 在pipeline的反方向，逐个发送ack，由A将ack发送给Client
7. 当第一个block传输完成后，Client再次请求上传第2个，重复步骤2-6

### 机架感知

![机架](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230306205300286.png)



第一个副本在Client所处的节点上，如果客户端在集群外面，则随机选择一个

第二个副本和第一个副本处于相同的机架上，随机节点

第三个副本位于不同的机架上，随机节点

![image-20230306205437608](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230306205437608.png)

## HDFS读文件过程

1. Client向NameNode发起RPC请求，确定请求文件的block所处的位置
2. NameNode返回该文件的部分或全部block列表。对于每个block，返回所有副本的datanode地址，并且按照网络拓扑距离以及超时情况进行排序
3. client选取靠前等dn进行读取，如果Client本身就是dn，则直接本地读取
4. 读完列表的block后，如有的话，会继续向NameNode请求下一批block列表
5. 读取完一个block会进行checksum验证，如果出错，会通知NameNode，并从下一个dn读取
6. 最终读取的所有block合并为一个文件

![image-20230308142943262](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230308142943262.png)

















## NameNode工作机制及元数据管理

![image-20230308144239598](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230308144239598.png)

### NameNode工作机制及启动

- NameNode

1. 第一次启动初始化后，创建fsimage、edits文件。后续直接加载这两个文件到内存
2. 客户端对元数据的增删改的请求
3. NameNode记录操作日志、更新滚动日志
4. NameNode在内存中对数据进行增删改查

- Secondary NameNode (辅助管理FSImage和edits)

1. Secondary NameNode询问NameNode是否需要checkpoint
2. Secondary NameNode请求执行checkpoint
3. NameNode滚**动正在写的eidts日志**（请求 namenode 停止使用 edits，暂时将 新写操作放入一个新的文件中(edits.new)）
4. 将滚动前的编辑日志和镜像文件拷贝到Secondary NameNode（通过**http get**）
5. Secondary NameNode加载编辑日志和镜像文件，并合并
6. 生成新的镜像文件fsimage.chkpoint
7. 拷贝fsimage.chkpoint到NameNode（通过**http post**）
8. NameNode将fsimage.chkpoint重命名为fsimage，把edits.new替换为edits



**合并时机**

1. 时间间隔
2. 操作次数

![image-20230308144625233](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230308144625233.png)

### FSImage和edits

这两个文件记录了所有数据的元数据信息。

客户端对进行写文件时会首先被记录在edits上，fsimage是NameNode关于元数据的镜像，包含了NameNode管理下的所有datanode中**文件及文件block及block所在的datanode**的元数据信息。

应为fsimage是完整的镜像，内容很大，每次都加载到内存中生成树状拓扑结构，非常耗内存和cpu。

### FSimage和edits文件查看

```shell
hdfs oiv -i fsimage_0000000000000000112 -p XML -o hello.xml

hdfs oev -i edits_0000000000000000112-0000000000000000113 -o myedit.xml -p XML
```



### NameNode故障恢复

使用Secondary NameNode的FSImage和edits文件，拷贝到NameNode下

- 相关路径

Hdfs-site.xml

```xml
<!--namenode 保存
-->
 <property>
   <name>dfs.namenode.name.dir</name>  	 <value>file:///export/servers/hadoop-.6.0cdh5.14.0/hadoopDatas/namenodeDatas</value>
</property>

 <property>
  	<name>dfs.namenode.edits.dir</name><value>s</value>
</property>


<!--Secondary NameNode  保存-->
 <property>
   <name>dfs.namenode.checkpoint.name.dir</name>  	 <value>file:///export/servers/hadoop-.6.0cdh5.14.0/hadoopDatas/nn</value>
</property>

 <property>
  	<name>dfs.namenode.checkpoint.edits.dir</name><value>s</value>
</property>
```

- 故障恢复流程

1. 删除NameNode的FSImage和edits文件
2. 拷贝Secondary NameNode的这两个文件到NameNode
3. 重启NameNode

## datanode工作机制

1. 工作机制

- 数据块在datanode上以文件的形式存储在磁盘上，包括数据文件本身以及元数据包括数据块的长度、校验和、时间戳
- datanode启动后，默认每个1小时向NameNode上报所有块的信息
- 心跳每3秒一次；如果超过10分钟没有收到某个datanode的心跳，则认为该节点不可用
- 加入和退出一些机器

2. 数据完整性

- datanode读取block时，会计算checksum
- 计算后的值与创建时的值不同，说明block以及损坏
- client读取其他dn上的block
- datanode在其文件创建成功后周期验证checksum

3. 掉线时限参数

```
timeout = 2 * dfs.namenode.heartbeat.recheck-interval + 10 * dfs.heartbeat.interval

recheck-interval = 5min
heartbeat.interval = 3s

默认timeout=10分30秒
```

## HDFS其他重要功能

1. 多个集群中间的数据拷贝

distcp

1. 归档文件archive

对于小文件来说，过多的元数据会耗尽NameNode的大部分内存。Hadoop存档文件将文件存入hdfs块，减少内存的使用，并允许对文件的透明访问

- 创建归档文件

```
bin/hadoop archive -archiveName myhar.har -p /user/root /user
```

- 查看归档文件内容

```
hdfs dfs -lsr /usr/myhar.har
hdfs dhs -lsr har://user/myhar.har
```

- 解压归档文件

```
hdfs dfs -cp har://user/my.har/* /user/har/
```



3. hdfs快照
4. hdfs回收站
   1. 回收站的两个参数：删除的文件的存活时间，检查回收站的时间间隔
   2. 启用回收站:Core-site.xml 。 fs.trash.interval
   3. 查看回收站：/user/root/.Trash
   4. 恢复回收站数据：hdfs dfs -mv trashFileDir hdfsDir
   5. 清空回收站：hdfs dfs -expunge











