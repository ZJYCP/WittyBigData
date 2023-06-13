---
title: Hive企业面试题
icon: page
order: 40
author: 余生
# date: 2020-01-01
category:
  - 面试指南
tag:
  - hive
sticky: false
star: true
---

Hive常见面试题

<!-- more -->





> 整理作者：蓦然                                     知识星球、公众号（同名）：旧时光大数据

## 说下为什么要使用Hive？Hive的优缺点？Hive的作用是什么？ 

可回答：1）Hive特点（优点）

问过的一些公司：恒生(2022.09)，字节(2022.08)(2021.04)(2019.04)

参考答案：

1、为什么要使用Hive？

Hive是Hadoop生态系统中比不可少的一个工具，它提供了一种SQL(结构化查询语言)方言，可以查询存储在Hadoop分布式文件系统（HDFS）中的数据或其他和Hadoop集成的文件系统，如MapR-FS、Amazon的S3和像HBase（Hadoop数据仓库）和Cassandra这样的数据库中的数据。

大多数数据仓库应用程序都是使用关系数据库进行实现的，并使用SQL作为查询语言。Hive降低了将这些应用程序转移到Hadoop系统上的难度。凡是会使用SQL语言的开发人员都可以很轻松的学习并使用Hive。如果没有Hive，那么这些用户就必须学习新的语言和工具，然后才能应用到生产环境中。另外，相比其他工具，Hive更便于开发人员将基于SQL的应用程序转移到Hadoop中。如果没有Hive，那么开发者将面临一个艰巨的挑战，如何将他们的SQL应用程序移植到Hadoop上。

2、Hive优缺点

优点

1）Hive使用类似于SQL的查询语言（HiveQL）来查询和分析存储在Hadoop分布式文件系统中的数据，易于使用和学习。

2）避免了去写MapReduce，减少开发人员的学习成本。

3）Hive的执行延迟比较高，因此Hive常用于数据分析，对实时性要求不高的场合。

4）Hive是基于Hadoop的数据仓库工具，能够处理大规模数据集，支持非结构化和半结构化数据。

5）Hive支持自定义函数（UDF、UDAF、UDTF）和插件，可以扩展其功能和能力，满足不同的需求。

6）Hive支持多种文件格式（如TextFile、SequenceFile、ORC、Parquet等）和数据源（如HDFS、HBase、Amazon S3等），并且与其他Hadoop生态系统组件（如Spark、Pig等）兼容。

缺点

1）Hive的HQL表达能力有限

●迭代式算法无法表达

●数据挖掘方面不擅长，由于MapReduce数据处理流程的限制，效率更高的算法却无法实现。

2）Hive的效率比较低

●Hive自动生成的MapReduce作业，通常情况下不够智能化

●Hive调优比较困难，粒度较粗

Hive不是一个完整的数据库。Hadoop以及HDFS的设计本身约束和局限性地限制了Hive所能胜任的工作。其中最大的限制就是Hive不支持记录级别的更新、插入或者删除操作。但是用户可以通过查询生成新表或者将查询结果导入到文件中。同时，因为Hadoop是面向批处理的系统，而MapReduce任务（job）的启动过程需要消耗较长的时间，所以Hive查询延时比较严重。传统数据库中在秒级别可以完成的查询，在Hive中，即使数据集相对较小，往往也需要执行更长的时间。

3、Hive的作用

Hive是由Facebook开源用于解决海量结构化日志的数据统计工具。

Hive是基于Hadoop的一个数据仓库工具，可以将结构化的数据文件映射为一张表，并提供类SQL查询功能。

Hive的本质是将HQL转化成MapReduce程序

●Hive处理的数据存储在HDFS

●Hive分析数据底层的实现是MapReduce

●执行程序运行在Yarn上

## 说下Hive是什么？跟数据仓库区别？ 

可回答：1）说下对Hive的了解；2）介绍下Hive

> 问过的一些公司：阿里(2022.11)，字节(2022.11)(2019.09)，蔚来(2022.11)，网易(2022.04)，海康威视(2021.09)，58(2021.09)，大华(2021.07)，招银网络提前批(2021.05)，宇信科技(2020.11)，思特奇(2020.11)，美团(2018.11)

参考答案：

Hive是由Facebook开源用于解决海量结构化日志的数据统计工具。

Hive是一个基于Hadoop的数据仓库工具，它提供了类似于SQL的接口，允许用户使用HQL（Hive Query Language）来查询和分析数据。

Hive的本质是将HQL转化成MapReduce程序

●Hive处理的数据存储在HDFS

●Hive分析数据底层的实现是MapReduce

●执行程序运行在YARN上

数据仓库是为企业所有级别的决策制定过程，提供所有类型数据支持的战略集合。它是单个数据存储，出于分析性报告和决策支持目的而创建。为需要业务智能的企业，提供指导业务流程改进、监视时间、成本、质量以及控制。

数据仓库存在的意义在于对企业的所有数据进行汇总，为企业各个部门提供统一的， 规范的数据出口。

## Hive架构 

可回答：1）Hive组件；2）Hive的底层原理；3）Hive工作原理

问过的一些公司：百度(2022.07)，tt语音(2021.09)，科大讯飞(2020.09)，微众银行(2020.04)，美团(2020.04)，阿里云(2019.03)

参考答案：

**1、架构**



![image.png](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/1682066124749-98630138-0ff3-4a82-9adc-cb967ef2e45e.png)



**用户接口：Client**

CLI（command-line interface）、JDBC/ODBC(jdbc访问hive)、WEBUI（浏览器访问hive）

**元数据：Metastore**

元数据包括：表名、表所属的数据库（默认是default）、表的拥有者、列/分区字段、表的类型（是否是外部表）、表的数据所在目录等；

默认存储在自带的derby数据库中，推荐使用MySQL存储Metastore

**Hadoop**

使用HDFS进行存储，使用MapReduce进行计算。

**驱动器：Driver**

1）解析器（SQL Parser）：将SQL字符串转换成抽象语法树AST，这一步一般都用第三方工具库完成，比如antlr；

对AST进行语法分析，比如表是否存在、字段是否存在、SQL语义是否有误。

2）编译器（Physical Plan）：将AST编译生成逻辑执行计划。

3）优化器（Query Optimizer）：对逻辑执行计划进行优化。

4）执行器（Execution）：把逻辑执行计划转换成可以运行的物理计划。对于Hive来说，就是MR/Spark。

**2、运行机制图**

![image.png](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/1682066124732-787f584f-89e8-4d17-ac6e-94dec891eb4d.png)



流程大致步骤为：

1）用户提交查询等任务给Driver。

2）编译器获得该用户的任务Plan。

3）编译器Compiler根据用户任务去MetaStore中获取需要的Hive的元数据信息。

4）编译器Compiler得到元数据信息，对任务进行编译，先将HiveQL转换为抽象语法树，然后将抽象语法树转换成查询块，将查询块转化为逻辑的查询计划，重写逻辑查询计划，将逻辑计划转化为物理的计划（MapReduce）, 最后选择最佳的策略。

5）将最终的计划提交给Driver。

6）Driver将计划Plan转交给ExecutionEngine去执行，获取元数据信息，提交给JobTracker或者SourceManager执行该任务，任务会直接读取HDFS中文件进行相应的操作。

7）获取执行的结果。

8）取得并返回执行结果。

创建表时：

解析用户提交的Hive语句–>对其进行解析–>分解为表、字段、分区等Hive对象。根据解析到的信息构建对应的表、字段、分区等对象，从SEQUENCE_TABLE中获取构建对象的最新的ID，与构建对象信息（名称、类型等等）一同通过DAO方法写入元数据库的表中，成功后将SEQUENCE_TABLE中对应的最新ID+5.实际上常见的RDBMS都是通过这种方法进行组织的，其系统表中和Hive元数据一样显示了这些ID信息。通过这些元数据可以很容易的读取到数据。

## Hive内部表和外部表的区别？ 

> 问过的一些公司：字节(2022.12)(2022.08)(2022.06)，欢聚(2022.12)，联通数科(2022.11)，济南特来电(2022.10)，茄子科技(2022.09)，荣耀(2022.09)，招银网络(2022.09)，兴金数金(2022.08)，58(2021.09)x2，多益(2022.04)(2021.08)x2(2021.05)，B站(2021.08)，字节date数据中台实习(2021.08)，4399(2021.08)，浩鲸科技(2021.08)x2，大华(2021.07)，百度(2021.04)，富途(2021.03)，阿里社招(2021.03)，一点资讯(2020.08)，作业帮(2020.08)(2020.04)，竞技世界(2020.08)，猿辅导(2020.08)，字节实习(2020.04)，美团(2020.04)(2019.09)，360(2020.04)，蘑菇街实习(2020.03)，快手(2019.09)

参考答案：

内部表（managed table）：未被external修饰

外部表（external table）：被external修饰

区别：

●存储位置：内部表的数据存储在Hive的默认文件系统中，而外部表的数据存储在外部文件系统中。外部文件系统可以是本地文件系统、HDFS等，这使得外部表可以方便地与其他系统进行数据共享和交互。

●数据管理：当删除内部表时，Hive会自动删除该表及其数据。而删除外部表时，只会删除表的元数据，而不会删除表的数据。这是因为内部表数据由Hive自身管理，外部表的数据并不是由Hive管理的（由HDFS管理），因此在删除外部表时需要手动清理数据。

●表的创建方式：内部表可以通过CREATE TABLE语句进行创建，也可以通过Hive自动将HDFS上的目录映射为表的方式进行创建。而外部表只能通过CREATE EXTERNAL TABLE语句进行创建。

●数据导入：对于内部表，可以通过INSERT语句将数据导入到表中。而对于外部表，需要先将数据存储在外部文件系统中，然后通过LOAD DATA语句将数据加载到表中。

●应用场景：

○内部表适合存储对数据的修改和删除操作，因为删除内部表时可以直接删除相关的数据文件。一般内部表在数仓中的DW（细节层）中使用。

○外部表适合存储对数据的只读操作，比如将已经存在的数据文件导入到Hive中进行分析。一般外部表在数仓中的ODS层（贴源层）中使用

## HQL：行转列、列转行 

可回答：1）Hive中怎么实现列转行，行转列？2）explode()怎么用

> 问过的一些公司：滴滴(2023.01)(2020.09)，电信天翼云(2022.10)，迅雷(2021.10)，唯品会(2021.09)，Shopee(2021.07)，美团(2021.08)，快手(2019.09)

参考答案：

**1、行转列：UDF聚合函数**

1）相关函数

concat：返回输入字符串连接后的结果，支持任意个输入字符串;

concat_ws(separator, str1, str2,...)：它是一个特殊形式的 concat()。第一个[参数](https://so.csdn.net/so/search?q=参数&spm=1001.2101.3001.7020)剩余参数间的分隔符。分隔符可以是与剩余参数一样的字符串。如果分隔符是 NULL，返回值也将为 NULL。这个函数会跳过分隔符参数后的任何 NULL 和空字符串。分隔符将被加到被连接的字符串之间;

collect_set(col)：函数只接受基本数据类型，它的主要作用是将某字段的值进行去重汇总，产生array类型字段。

2）数据准备

| name   | constellation | blood_type |
| ------ | ------------- | ---------- |
| 孙悟空 | 白羊座        | A          |
| 大海   | 射手座        | A          |
| 宋宋   | 白羊座        | B          |
| 猪八戒 | 白羊座        | A          |
| 凤姐   | 射手座        | A          |

3）创建hive表并导入数据

4）需求

把星座和血型一样的人归类到一起。结果如下：

| 射手座,A | 大海\|凤姐     |
| -------- | -------------- |
| 白羊座,A | 孙悟空\|猪八戒 |
| 白羊座,B | 宋宋           |

 select name,concat(constellation, ",",blood_type) as base from person_info;

**2、列转行：UDTF爆炸函数**

1）相关函数

explode(col)：将hive一列中复杂的array或者map结构拆分成多行。

lateral view

用法：lateral view udtf(expression) tableAlias AS columnAlias

解释：用于和split, explode等UDTF一起使用，它能够将一列数据拆成多行数据，在此基础上可以对拆分后的数据进行聚合。

2）数据准备

| movie         | category                     |
| ------------- | ---------------------------- |
| 《疑犯追踪》  | 悬疑，动作，科幻，剧情       |
| 《Lie to me》 | 悬疑，警匪，动作，心里，剧情 |
| 《战狼2》     | 战争，动作，灾难             |

3）创建hive表并导入数据

 load data local inpath "/opt/module/datas/movie.txt" into table movie_info;

4）需求

将电影分类中的数组数据展开

 select movie,category_name from movie_info lateral view explode(category) table_category as category_name;

## Hive SQL转化为MapReduce的过程？ 

可回答：1）Hive SQL的解析过程；2）Hive SQL的底层实现；3）Hive SQL怎么执行

> 问过的一些公司：字节(2022.12)(2022.08)(2021.10)，百度(2022.09)(2021.04)，货拉拉(2022.06)，蔚来(2021.09)，小鹅通(2021.09)，快手(2021.09)(2019.09)(2018.12)，网易杭研院(2021.09)，兴业数金(2021.08)，远景智能(2021.08)，阿里蚂蚁(2021.04)，美团实习(2021.04)x3，快手提前批(2020.09)，58同城(2020.09)，菜鸟(2020.08)，网易云(2020.08)，京东(2020.07)，好未来(2020.07)，字节实习(2020.06)，头条(2019.09)，网易严选(2019.08)，阿里(2018.09)，美团新到店(2018.09)

参考答案：

Hive SQL转换为MapReduce的大致流程：

1语法、语义解析：Hive将SQL语句解析成抽象语法树（AST）。

2生成逻辑执行计划：Hive根据AST生成逻辑执行计划（Logical Execution Plan），该计划包含了查询所需的所有步骤和操作，如选择器、连接器、聚合器等等。

3优化逻辑执行计划：逻辑执行计划转换成物理执行计划（Physical Execution Plan），该计划定义了如何在Hadoop集群中执行查询。在此阶段，Hive优化查询计划以提高性能，并且根据查询所需的输入数据确定哪些数据需要移动到MapReduce集群中。

4生成物理执行计划：物理执行计划被转换成MapReduce作业。Hive为查询创建一个或多个MapReduce任务，并将任务提交到Hadoop集群中的YARN资源管理器。

5执行任务：一旦MapReduce任务开始执行，Hive将监控它们的执行，并收集任务输出。如果查询需要进一步处理，则Hive将再次转换查询计划，并为进一步处理创建新的MapReduce作业。

Hive SQL转换为MapReduce是一个复杂的过程，需要多个步骤和组件的协同工作。Hive的优化和调度功能能够提高查询性能和可伸缩性，从而使得大规模数据分析更加容易和高效。

涉及到的组件包括但不限于：

●Hive客户端：用户使用的命令行或UI界面，用于编写和提交HQL语句。

●Hive服务端：包括Hive Metastore、Hive Driver等组件，负责语法解析、查询优化、执行计划生成等任务。

●YARN：任务调度和执行的主要组件，负责任务的资源管理和分配。

●HDFS：存储任务执行的输入和输出数据。

●元数据库：记录Hive表结构、执行计划、任务日志等元数据信息。

●其他支持组件：例如Hive Server、Hive Thrift Server、Hive Web UI等。

再来看下MapReduce框架实现SQL基本操作的原理 ：

1、Join的实现原理

```hive
 select u.name, o.orderid from order o join user u on o.uid = u.uid;
```

在map的输出value中为不同表的数据打上tag标记，在reduce阶段根据tag判断数据来源。MapReduce的过程如下（这里只是说明最基本的Join的实现，还有其他的实现方式） 

![image.png](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/1682066124725-1002b16d-2bc4-409e-80b7-b48b70d05b36.png)



2、Group By的实现原理

```hive
 select rank, isonline, count(*) from city group by rank, isonline;
```

将GroupBy的字段组合为map的输出key值，利用MapReduce的排序，在reduce阶段保存LastKey区分不同的key。MapReduce的过程如下（当然这里只是说明Reduce端的非Hash聚合过程）

![image.png](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/1682066124738-03530197-15cb-4e5c-af73-f8a0453a6e26.png)



3、Distinct的实现原理

```hive
 select dealid, count(distinct uid) num from order group by dealid;
```

当只有一个distinct字段时，如果不考虑Map阶段的Hash GroupBy，只需要将GroupBy字段和Distinct字段组合为map输出key，利用mapreduce的排序，同时将GroupBy字段作 为reduce的key，在reduce阶段保存LastKey即可完成去重.

![image.png](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/1682066124725-057ce97c-dd04-487f-b120-6b77ae8340a3.png)



如果有多个distinct字段呢，如下面的SQL

```hive
 select dealid, count(distinct uid), count(distinct date) from order group by dealid;
```

实现方式有两种：

1）如果仍然按照上面一个distinct字段的方法，即下图这种实现方式，无法跟据uid和date分别排序，也就无法通过LastKey去重，仍然需要在reduce阶段在内存中通过Hash去重 

![image.png](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/1682066125974-9049bcde-fa8f-4c57-a27b-cb831c035ece.png)



2）第二种实现方式，可以对所有的distinct字段编号，每行数据生成n行数据，那么相同字段就会分别排序，这时只需要在reduce阶段记录LastKey即可去重。

这种实现方式很好的利用了MapReduce的排序，节省了reduce阶段去重的内存消耗，但是缺点是增加了shuffle的数据量。

需要注意的是，在生成reduce value时，除第一个distinct字段所在行需要保留value值，其余distinct数据行value字段均可为空。

![image.png](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/1682066126245-435ae64a-2a83-46a1-ab4d-f430d70abe13.png)



## Hive建表语句？创建表时使用什么分隔符？ 

问过的一些公司：京东实习(2021.03)，作业帮(2020.08)，360(2020.04)

参考答案：

**1、建表语句**

```hive
CREATE [EXTERNAL] TABLE [IF NOT EXISTS] table_name
[(col_name data_type [COMMENT col_comment], ...)] 
[COMMENT table_comment]
[PARTITIONED BY (col_name data_type [COMMENT col_comment], ...)] 
[CLUSTERED BY (col_name, col_name, ...)
[SORTED BY (col_name [ASC|DESC], ...)] INTO num_buckets BUCKETS] 
[ROW FORMAT row_format]
[STORED AS file_format] 
[LOCATION hdfs_path]
[TBLPROPERTIES (property_name=property_value, ...)] 
[AS select_statement]
```



字段解释说明

（1）CREATE TABLE 创建一个指定名字的表。如果相同名字的表已经存在，则抛出异常； 用户可以用 IF NOT EXISTS 选项来忽略这个异常。

（2）EXTERNAL 关键字可以让用户创建一个外部表，在建表的同时可以指定一个指向实 际数据的路径（LOCATION），在删除表的时候，内部表的元数据和数据会被一起删除，而外 部表只删除元数据，不删除数据。

（3）COMMENT：为表和列添加注释。

（4）PARTITIONED BY：创建分区表

（5）CLUSTERED BY：创建分桶表

（6）SORTED BY：不常用，对桶中的一个或多个列另外排序

（7）ROW FORMAT

```hive
DELIMITED [FIELDS TERMINATED BY char] [COLLECTION ITEMS TERMINATED BY char] [MAP KEYS TERMINATED BY char] [LINES TERMINATED BY char]
|   SERDE   serde_name   [WITH   SERDEPROPERTIES   (property_name=property_value, property_name=property_value, ...)]
```



用户在建表的时候可以自定义SerDe或者使用自带的SerDe。如果没有指定ROW FORMAT或者ROW FORMAT DELIMITED，将会使用自带的SerDe。在建表的时候，用户还需要为表指定列，用户在指定表的列的同时也会指定自定义的SerDe，Hive通过SerDe确定表的具体的列的数据。

SerDe是Serialize/Deserilize的简称，hive使用Serde进行行对象的序列与反序列化。

（8）STORED AS：指定存储文件类型 常用的存储文件类型：SEQUENCEFILE（二进制序列文件）、TEXTFILE（文本）、RCFILE（列式存储格式文件）。

如果文件数据是纯文本，可以使用 STORED AS TEXTFILE。如果数据需要压缩，使用 STORED AS SEQUENCEFILE。

（9）LOCATION：指定表在HDFS上的存储位置。

（10）AS：后跟查询语句，根据查询结果创建表。

（11）LIKE：允许用户复制现有的表结构，但是不复制数据。

**2、分隔符**

我们在建表的时候就指定了导入数据时的分隔符，建表的时候会有三种场景需要考虑：

●正常建表(default)；

●指定特定的特殊符号作为分隔符；

●使用多字符作为分隔符。

**1）正常建表，采用默认的分隔符**

hive 默认的字段分隔符为ascii码的控制符\001,建表的时候用fields terminated by '\001',如果要测试的话，造数据在vi 打开文件里面，用ctrl+v然后再ctrl+a可以输入这个控制符\001。按顺序，\002的输入方式为ctrl+v，ctrl+b。以此类推。

**2）指定特定的特殊符号作为分隔符**

 CREATE TABLE test(id int, name string ,tel string) ROW FORMAT DELIMITED FIELDS TERMINATED BY '\t'LINES TERMINATED BY '\n'STORED AS TEXTFILE;

上面使用了'\t'作为了字段分隔符，'\n'作为换行分隔符。如果有特殊需求，自己动手改一下这两个符号就行了。

**3、使用多字符作为分隔符**

假设我们使用【##】来作为字段分隔符，【\n】作为换行分隔符，则这里有两个方法：

使用MultiDelimitSerDe的方法来实现：

 CREATE TABLE test(id int, name string ,tel string) ROW FORMAT SERDE 'org.apache.hadoop.hive.contrib.serde2.MultiDelimitSerDe' WITH SERDEPROPERTIES ("field.delim"="##") LINES TERMINATED BY '\n'STORED AS TEXTFILE;

使用RegexSerDe的方法实现：

 CREAET TABLE test(id int, name string ,tel string) ROW FORMAT SERDE 'org.apache.hadoop.hive.contrib.serde2.RegexSerDe' WITH SERDEPROPERTIES ("input.regex" = "^(.*)\\#\\#(.*)$") LINES TERMINATED BY '\n'STORED AS TEXTFILE;

## Hive可以用啥作为元数据库 

问过的一些公司：字节(2022.12)

参考答案：

Hive可以使用多种数据库作为元数据库，包括：

●内置的Derby数据库

●MySQL

●Oracle

●PostgreSQL

●Microsoft SQL Server

●IBM DB2

在Hive中，元数据管理了表的结构和位置信息，以及表之间的关系，它可以存储在一个RDBMS（关系型数据库管理系统）中，这样可以方便地使用SQL语句进行查询和维护。不同的元数据库对Hive的性能和可靠性都有影响，选择适合自己的元数据库非常重要。

## Hive使用的时候会将数据同步到HDFS，小文件问题怎么解决的？ 

> 问过的一些公司：欢聚(2022.12)，快手(2021.09)(2020.09)(2019.10)，美团社招(2020.09)，腾讯(2020.08)，美团点评(2019.09)

参考答案：

首先，我们要弄明白两个问题：

1）哪里会产生小文件

●源数据本身有很多小文件

●动态分区会产生大量小文件

●reduce个数越多, 小文件越多

●按分区插入数据的时候会产生大量的小文件, 文件个数 = maptask个数 * 分区数

2）小文件太多造成的影响

●从Hive的角度看，小文件会开很多map，一个map开一个JVM去执行，所以这些任务的初始化，启动，执行会浪费大量的资源，严重影响性能。

●HDFS存储太多小文件, 会导致namenode元数据特别大, 占用太多内存, 制约了集群的扩展

小文件解决方案：

●合并小文件：使用Hadoop的MapReduce或Hive自带的输入格式(TextFile、SequenceFile等)来合并小文件，将它们合并成一个或几个更大的文件。

●压缩文件：使用Hadoop的压缩算法（如gzip、snappy、lzo等）来压缩小文件，减小文件大小，提高I/O效率。

●调整输入格式：使用Hive的输入格式（如ORC、Parquet等）代替TextFile、SequenceFile等格式，可以提高查询性能，同时可以减少小文件的数量。

●使用分区：将数据根据一些共同属性（如日期、地区等）进行分区，可以将小文件转换成更大的块，提高性能。

●合理设置参数：调整MapReduce任务的参数（如mapreduce.input.fileinputformat.split.minsize等）可以让任务更适合处理小文件，提高效率。

●使用动态资源分配：可以通过设置Spark参数（如spark.dynamicAllocation.enabled）来使用动态资源分配，从而优化Spark集群资源的使用。

Hadoop自带的三种小文件处理方案

Hadoop Archive

●Hadoop Archive或者HAR，是一个高效地将小文件放入HDFS块中的文件存档工具，它能够将多个小文件打包成一个HAR文件，这样在减少namenode内存使用的同时，仍然允许对文件进行透明的访问。

Sequence file

●sequence file由一系列的二进制key/value组成，如果为key小文件名，value为文件内容，则可以将大批小文件合并成一个大文件。

CombineFileInputFormat

●它是一种新的inputformat，用于将多个文件合并成一个单独的split，另外，它会考虑数据的存储位置。

## Hive和HDFS的底层架构的关系，什么地方用到HDFS 

问过的一些公司：字节(2022.12)，360社招(2020.01)

参考答案：

Hive是一个基于Hadoop的数据仓库工具，底层依赖于HDFS来存储数据。

●当在Hive中创建一个表时，表的数据实际上是存储在HDFS上的文件中。

●Hive的查询语句被翻译成一个MapReduce作业来执行，这个MapReduce作业的输入和输出都是存储在HDFS上的文件。

当用户提交一个查询给Hive时，Hive会将这个查询转换为一系列的MapReduce作业，这些作业被提交到Hadoop集群上执行。这些作业会读取HDFS上存储的表数据，将它们转换为MapReduce作业可以处理的格式，执行相应的计算操作，然后将结果写回到HDFS上。

Hive和HDFS之间的关系是密切的，HDFS扮演了Hive底层存储和处理数据的角色。

## Hive SQL优化处理 

问过的一些公司：欢聚(2022.12)，快手(2021.09)

参考答案：

优化的根本思想

●尽早尽量过滤数据，减少每个阶段的数据量

●减少job数

●解决数据倾斜问题

1、Map Join

如果不指定 MapJoin 或者不符合 MapJoin 的条件，那么 Hive 解析器会将 Join 操作转换 成 Common Join，即：在 Reduce 阶段完成 join。容易发生数据倾斜。可以用MapJoin把小 表全部加载到内存在 map 端进行 join，避免 reducer 处理。

2、行列过滤

列处理：在 SELECT 中，只拿需要的列，如果有，尽量使用分区过滤，少用 SELECT *。 

行处理：在分区剪裁中，当使用外关联时，如果将副表的过滤条件写在 Where 后面，那 么就会先全表关联，之后再过滤。 

3、多采用分桶技术

4、结合实际环境合理设置 Map 数

通常情况下，作业会通过 input的目录产生一个或者多个map任务。 主要的决定因素有：input的文件总个数，input的文件大小，集群设置的文件块大小；

map数不是越多越好；如果一个任务有很多小文件（远远小于块大小 128m），则每个小文件 也会被当做一个块，用一个 map 任务来完成，而一个 map 任务启动和初始化的时间远远大 于逻辑处理的时间，就会造成很大的资源浪费。而且，同时可执行的 map 数是受限的。解决这个问题需要减少map数。

并不是每个map处理接近128m的文件块就是完美的；比如有一个 127m 的文件，正常会用一个 map 去完成，但这个文件只 有一个或者两个小字段，却有几千万的记录，如果 map 处理的逻辑比较复杂，用一个 map 任务去做，肯定也比较耗时。解决这个问题需要增加map数。

5、 合并大量小文件

在Map执行前合并小文件，可以减少Map数：CombineHiveInputFormat 具有对小文件进行合并的功能（系统默认的格式）。HiveInputFormat 没有对小文件合并功能。 

6、设置合理的Reduce数

Reduce 个数也并不是越多越好

●过多的启动和初始化 Reduce 也会消耗时间和资源；

●有多少个 Reduce，就会有多少个输出文件，如果生成了很多个小文件，那么如果这些小文件作为下一个任务的输入，则也会出现小文件过多的问题；

●在设置Reduce个数的时候也需要考虑这两个原则：处理大数据量利用合适的 Reduce 数；使单个 Reduce 任务处理数据量大小要合适。

7、输出合并小文件常用参数

```hive
SET hive.merge.mapfiles = true; -- 默认 true，在 map-only 任务结束时合并小文件
SET hive.merge.mapredfiles = true; -- 默认 false，在 map-reduce 任务结束时合并小文件
SET hive.merge.size.per.task = 268435456; -- 默认 256M
SET hive.merge.smallfiles.avgsize = 16777216; -- 当输出文件的平均大小小于 16m 该值时，启动一个独立的 map-reduce 任务进行文件 merge
```



8、开启 map 端 combiner（不影响最终业务逻辑）

```hive
# 开启命令
set hive.map.aggr=true；
```



9、中间结果压缩

设置 map 端输出、中间结果压缩。（不完全是解决数据倾斜的问题，但是减少了 IO 读写和网络传输，能提高很多效率） 

## 讲一下熟悉的窗口函数及使用 

可回答：1）介绍下知道的Hive窗口函数，举一些例子；2）Hive的窗口函数有了解过吗？

问过的一些公司：欢聚(2022.12)，网易云音乐(2022.11)，百度(2022.09)，恒生(2022.09)，茄子科技(2022.09)，顺丰(2021.09)(2020.11)，美团(2021.09)(2021.08)x2，网易(2021.05)x2，美团实习(2021.04)，百度实习(2021.04)，字节(2020.09)，快手提前批(2020.09)，美团社招(2020.09)，快手(2020.09)，有赞(2020.08)，小米(2019.09)

参考答案：

窗口函数是在Hive中进行分析型查询时使用的一种高级函数，它能够在查询结果中按照特定的顺序和分组方式对数据进行处理。例如，计算每个分组的累计和、平均值或排名等。

在Hive中，窗口函数可以使用以下几种：

●ROW_NUMBER()：为每一行添加一个行号，从1开始。常用于给结果集的行做一个唯一的标识。

```hive
SELECT ROW_NUMBER() OVER (ORDER BY col1) as row_num, col1, col2 FROM table;
```



●RANK()：根据指定列中的值为分区中的每一行分配排名。指定列中具有相同值的行将获得相同的排名，下一行将获得的排名等于具有不同值的先前行数加一。

```hive
SELECT RANK() OVER (ORDER BY col1 DESC) as rank_num, col1, col2 FROM table;
```



●DENSE_RANK()：该函数类似于RANK()，但它为指定列中具有相同值的行分配连续的排名(如果有相同的值，则排名相同，但不会跳过排名。)。

```hive
SELECT DENSE_RANK() OVER (ORDER BY col1 DESC) as rank_num, col1, col2 FROM table;
```



●CUME_DIST()：累计分布函数，计算当前行在分组中的相对位置。

```hive
CUME_DIST() OVER (PARTITION BY expression ORDER BY expression [ASC|DESC] NULLS FIRST|LAST);
```



●NTILE(n)：分组内将数据均匀地分成n份，返回当前行所在的组号。

```hive
SELECT NTILE(4) OVER (ORDER BY col1) as ntile_num, col1, col2 FROM table;
```



●LAG(col, n)：返回当前行前第n行的值，如果n为NULL，则默认为1。

```hive
SELECT col, LAG(col, 1) OVER (ORDER BY col1) as prev_col FROM table;
```



●LEAD(col, n)：返回当前行后第n行的值，如果n为NULL，则默认为1。

```hive
SELECT col, LEAD(col, 1) OVER (ORDER BY col1) as next_col FROM table;
```



●SUM()、AVG()、MAX()、MIN()：分别对窗口中的数据进行求和、求平均值、取最大值、取最小值。

```hive
SELECT SUM(col1) OVER (PARTITION BY col2) as sum_col, AVG(col1) OVER (PARTITION BY col2) as avg_col, MAX(col1) OVER (PARTITION BY col2) as max_col, MIN(col1) OVER (PARTITION BY col2) as min_col FROM table;
```



例如，下面的查询使用窗口函数计算每个部门的员工薪水排名：

```hive
SELECT dept, emp, sal, RANK() OVER (PARTITION BY dept ORDER BY sal DESC) as rank FROM emp
```



这个查询使用 OVER 关键字指定了分组和排序方式，然后使用 RANK() 计算每个分组的排名。这个查询会将结果按照每个部门进行分组，然后对每个分组中的员工按照薪水降序排序，并计算每个员工在部门中的排名。

## Hive优化方法 

可回答：1）Hive方面的调优有什么手段？2）Hive的join的优化一般会怎么优化？除了mapjoin还知道别的么？3）Hive如何优化join操作

问过的一些公司：阿里(2022.11)，杰创智能科技(2022.11)，陌陌提前批(2022.09)，携程(2022.09)，恒生(2022.09)，百度(2022.07)x2，货拉拉(2022.06)x2，小米日常实习(2022.05)，顺丰(2021.09)，欢聚(2021.09)，网易杭研院(2021.09)，58(2021.09)，字节提前批(2021.08)，字节(2021.08)(2020.08)，招银网络(2021.06)，小米(2020.10)，转转(2020.09)，阿里云社招(2020.09)，京东(2020.09)，贝壳(2020.08)，菜鸟(2020.08)，快手(2019.10)(2019.09)(2018.12)，美团(2019.09)，米哈游(2019.09)

参考答案：

1、列裁剪和分区裁剪

最基本的操作。所谓列裁剪就是在查询时只读取需要的列，分区裁剪就是只读取需要的分区。

案例：

```hive
select uid,event_type,record_data
from calendar_record_log
where pt_date >= 20190201 and pt_date <= 20190224
and status = 0;
```



当列很多或者数据量很大时，如果select *或者不指定分区，全列扫描和全表扫描效率都很低。 Hive中与列裁剪优化相关的配置项是hive.optimize.cp，与分区裁剪优化相关的则是hive.optimize.pruner，默认都是true。在HiveQL解析阶段对应的则是ColumnPruner逻辑优化器。

2、谓词下推

在关系型数据库如MySQL中，也有谓词下推（Predicate Pushdown，PPD）的概念。它就是将SQL语句中的where谓词逻辑都尽可能提前执行，减少下游处理的数据量。

例如以下HQL语句：

```hive
select a.uid,a.event_type,b.topic_id,b.title
from calendar_record_log a
left outer join (
  select uid,topic_id,title from forum_topic
  where pt_date = 20190224 and length(content) >= 100
) b on a.uid = b.uid
where a.pt_date = 20190224 and status = 0;
```



对forum_topic做过滤的where语句写在子查询内部，而不是外部。Hive中有谓词下推优化的配置项hive.optimize.ppd，默认值true，与它对应的逻辑优化器是PredicatePushDown。该优化器就是将OperatorTree中的FilterOperator向上提，见下图。

![image.png](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/1682066126274-939f35b7-87e3-4699-976f-f8b289e89e87.png)



3、sort by代替order by

HQL中的order by与其他SQL方言中的功能一样，就是将结果按某字段全局排序，这会导致所有map端数据都进入一个reducer中，在数据量大时可能会长时间计算不完。

如果使用sort by，那么还是会视情况启动多个reducer进行排序，并且保证每个reducer内局部有序。为了控制map端数据分配到reducer的key，往往还要配合distribute by一同使用。如果不加distribute by的话，map端数据就会随机分配到reducer。

举个例子，假如要以UID为key，以上传时间倒序、记录类型倒序输出记录数据：

```hive
select uid,upload_time,event_type,record_data
from calendar_record_log
where pt_date >= 20190201 and pt_date <= 20190224
distribute by uid
sort by upload_time desc,event_type desc;
```



4、group by代替distinct

当要统计某一列的去重数时，如果数据量很大，count(distinct)就会非常慢，原因与order by类似，count(distinct)逻辑只会有很少的reducer来处理。这时可以用group by来改写：

```hive
select count(1) from (
  select uid from calendar_record_log
  where pt_date >= 20190101
  group by uid
) t;
```



但是这样写会启动两个MR job（单纯distinct只会启动一个），所以要确保数据量大到启动job的overhead远小于计算耗时，才考虑这种方法。当数据集很小或者key的倾斜比较明显时，group by还可能会比distinct慢。

那么如何用group by方式同时统计多个列？下面是解决方法：

```hive
select t.a,sum(t.b),count(t.c),count(t.d) from (
  select a,b,null c,null d from some_table
  union all
  select a,0 b,c,null d from some_table group by a,c
  union all
  select a,0 b,null c,d from some_table group by a,d
) t;
```



5、group by配置调整

1）map端预聚合

group by时，如果先起一个combiner在map端做部分预聚合，可以有效减少shuffle数据量。预聚合的配置项是hive.map.aggr，默认值true，对应的优化器为GroupByOptimizer，简单方便。 通过hive.groupby.mapaggr.checkinterval参数也可以设置map端预聚合的行数阈值，超过该值就会分拆job，默认值100000。

2）倾斜均衡配置项

group by时如果某些key对应的数据量过大，就会发生数据倾斜。Hive自带了一个均衡数据倾斜的配置项hive.groupby.skewindata，默认值false。

其实现方法是在group by时启动两个MR job。第一个job会将map端数据随机输入reducer，每个reducer做部分聚合，相同的key就会分布在不同的reducer中。第二个job再将前面预处理过的数据按key聚合并输出结果，这样就起到了均衡的效果。

但是，配置项毕竟是死的，单纯靠它有时不能根本上解决问题，因此还是建议自行了解数据倾斜的细节，并优化查询语句。

6、join基础优化

join优化是一个复杂的话题，下面先说5点最基本的注意事项。

1）build table（小表）前置

在最常见的hash join方法中，一般总有一张相对小的表和一张相对大的表，小表叫build table，大表叫probe table。如下图所示。

![image.png](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/1682066126459-34ad59f0-2691-47b2-8f65-21600d244aa5.png)



Hive在解析带join的SQL语句时，会默认将最后一个表作为probe table，将前面的表作为build table并试图将它们读进内存。如果表顺序写反，probe table在前面，引发OOM的风险就高了。

在维度建模数据仓库中，事实表就是probe table，维度表就是build table。假设现在要将日历记录事实表和记录项编码维度表来join：

```hive
select a.event_type,a.event_code,a.event_desc,b.upload_time
 from calendar_event_code a
 inner join (
   select event_type,upload_time from calendar_record_log
   where pt_date = 20190225
 ) b on a.event_type = b.event_type;
```



2）多表join时key相同

这种情况会将多个join合并为一个MR job来处理，例如：

```hive
select a.event_type,a.event_code,a.event_desc,b.upload_time
from calendar_event_code a
inner join (
  select event_type,upload_time from calendar_record_log
  where pt_date = 20190225
) b on a.event_type = b.event_type
inner join (
  select event_type,upload_time from calendar_record_log_2
  where pt_date = 20190225
) c on a.event_type = c.event_type;
```



如果上面两个join的条件不相同，比如改成a.event_code = c.event_code，就会拆成两个MR job计算。

3）利用map join特性

map join特别适合大小表join的情况。Hive会将build table和probe table在map端直接完成join过程，消灭了reduce，效率很高。

```hive
select /*+mapjoin(a)*/ a.event_type,b.upload_time
from calendar_event_code a
inner join (
  select event_type,upload_time from calendar_record_log
  where pt_date = 20190225
) b on a.event_type < b.event_type;
```



上面的语句中加了一条map join hint，以显式启用map join特性。早在Hive 0.8版本之后，就不需要写这条hint了。map join还支持不等值连接，应用更加灵活。

map join的配置项是hive.auto.convert.join，默认值true，对应逻辑优化器是MapJoinProcessor。

还有一些参数用来控制map join的行为，比如hive.mapjoin.smalltable.filesize，当build table大小小于该值就会启用map join，默认值25000000（25MB）。还有hive.mapjoin.cache. numrows，表示缓存build table的多少行数据到内存，默认值25000。

4）分桶表map join

map join对分桶表还有特别的优化。由于分桶表是基于一列进行hash存储的，因此非常适合抽样（按桶或按块抽样）。

它对应的配置项是hive.optimize.bucketmapjoin，优化器是BucketMapJoinOptimizer。

5）倾斜均衡配置项

这个配置与上面group by的倾斜均衡配置项异曲同工，通过hive.optimize.skewjoin来配置，默认false。

如果开启了，在join过程中Hive会将计数超过阈值hive.skewjoin.key（默认100000）的倾斜key对应的行临时写进文件中，然后再启动另一个job做map join生成结果。通过hive.skewjoin. mapjoin.map.tasks参数还可以控制第二个job的mapper数量，默认10000。

再重复一遍，通过自带的配置项经常不能解决数据倾斜问题。join是数据倾斜的重灾区，后面还要介绍在SQL层面处理倾斜的各种方法。

7、优化SQL处理join数据倾斜

1）空值或无意义值

这种情况很常见，比如当事实表是日志类数据时，往往会有一些项没有记录到，我们视情况会将它置为null，或者空字符串、-1等。如果缺失的项很多，在做join时这些空值就会非常集中，拖累进度。

因此，若不需要空值数据，就提前写where语句过滤掉。需要保留的话，将空值key用随机方式打散，例如将用户ID为null的记录随机改为负值：

```hive
select a.uid,a.event_type,b.nickname,b.age
 from (
   select 
   (case when uid is null then cast(rand()*-10240 as int) else uid end) as uid,
   event_type from calendar_record_log
   where pt_date >= 20190201
 ) a left outer join (
   select uid,nickname,age from user_info where status = 4
 ) b on a.uid = b.uid;
```



2）单独处理倾斜key

这其实是上面处理空值方法的拓展，不过倾斜的key变成了有意义的。一般来讲倾斜的key都很少，我们可以将它们抽样出来，对应的行单独存入临时表中，然后打上一个较小的随机数前缀（比如0~9），最后再进行聚合。SQL语句与上面的相仿。

3）不同数据类型

这种情况不太常见，主要出现在相同业务含义的列发生过逻辑上的变化时。

举个例子，假如我们有一旧一新两张日历记录表，旧表的记录类型字段是(event_type int)，新表的是(event_type string)。为了兼容旧版记录，新表的event_type也会以字符串形式存储旧版的值，比如'17'。当这两张表join时，经常要耗费很长时间。其原因就是如果不转换类型，计算key的hash值时默认是以int型做的，这就导致所有“真正的”string型key都分配到一个reducer上。所以要注意类型转换：

```hive
select a.uid,a.event_type,b.record_data
 from calendar_record_log a
 left outer join (
   select uid,event_type from calendar_record_log_2
   where pt_date = 20190228
 ) b on a.uid = b.uid and b.event_type = cast(a.event_type as string)
 where a.pt_date = 20190228;
```



4）build table过大

有时，build table会大到无法直接使用map join的地步，比如全量用户维度表，而使用普通join又有数据分布不均的问题。这时就要充分利用probe table的限制条件，削减build table的数据量，再使用map join解决。代价就是需要进行两次join。举个例子：

```hive
select /*+mapjoin(b)*/ a.uid,a.event_type,b.status,b.extra_info
 from calendar_record_log a
 left outer join (
   select /*+mapjoin(s)*/ t.uid,t.status,t.extra_info
   from (select distinct uid from calendar_record_log where pt_date = 20190228) s
   inner join user_info t on s.uid = t.uid
 ) b on a.uid = b.uid
 where a.pt_date = 20190228;
```



8、MapReduce优化

![image.png](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/1682066126605-557be996-b8f3-415c-8a4b-49bb10dd67ae.png)



1）调整mapper数

mapper数量与输入文件的split数息息相关，在Hadoop源码org.apache.hadoop.mapreduce.lib.input.FileInputFormat类中可以看到split划分的具体逻辑。这里不贴代码，直接叙述mapper数是如何确定的。

●可以直接通过参数mapred.map.tasks（默认值2）来设定mapper数的期望值，但它不一定会生效，下面会提到。

●设输入文件的总大小为total_input_size。HDFS中，一个块的大小由参数dfs.block.size指定，默认值64MB或128MB。在默认情况下，mapper数就是：default_mapper_num = total_input_size / dfs.block.size。

●参数mapred.min.split.size（默认值1B）和mapred.max.split.size（默认值64MB）分别用来指定split的最小和最大大小。split大小和split数计算规则是：split_size = MAX(mapred.min.split.size, MIN(mapred.max.split.size, dfs.block.size))；split_num = total_input_size / split_size。

●得出mapper数：mapper_num = MIN(split_num, MAX(default_num, mapred.map.tasks))。

可见，如果想减少mapper数，就适当调高mapred.min.split.size，split数就减少了。如果想增大mapper数，除了降低mapred.min.split.size之外，也可以调高mapred.map.tasks。

一般来讲，如果输入文件是少量大文件，就减少mapper数；如果输入文件是大量非小文件，就增大mapper数；至于大量小文件的情况，参考下面“合并小文件”的方法处理。

2）调整reducer数

reducer数量的确定方法比mapper简单得多。使用参数mapred.reduce.tasks可以直接设定reducer数量，不像mapper一样是期望值。但如果不设这个参数的话，Hive就会自行推测，逻辑如下：

●参数hive.exec.reducers.bytes.per.reducer用来设定每个reducer能够处理的最大数据量，默认值1G（1.2版本之前）或256M（1.2版本之后）。

●参数hive.exec.reducers.max用来设定每个job的最大reducer数量，默认值999（1.2版本之前）或1009（1.2版本之后）。

●得出reducer数：reducer_num = MIN(total_input_size / reducers.bytes.per.reducer, reducers.max)。

reducer数量与输出文件的数量相关。如果reducer数太多，会产生大量小文件，对HDFS造成压力。如果reducer数太少，每个reducer要处理很多数据，容易拖慢运行时间或者造成OOM。

3）合并小文件

输入阶段合并

●需要更改Hive的输入文件格式，即参数hive.input.format，默认值是org.apache.hadoop.hive.ql.io.HiveInputFormat，我们改成org.apache.hadoop.hive.ql.io.CombineHiveInputFormat。这样比起上面调整mapper数时，又会多出两个参数，分别是mapred.min.split.size.per.node和mapred.min.split.size.per.rack，含义是单节点和单机架上的最小split大小。如果发现有split大小小于这两个值（默认都是100MB），则会进行合并。具体逻辑可以参看Hive源码中的对应类。

输出阶段合并

●直接将hive.merge.mapfiles和hive.merge.mapredfiles都设为true即可，前者表示将map-only任务的输出合并，后者表示将map-reduce任务的输出合并。

●hive.merge.size.per.task可以指定每个task输出后合并文件大小的期望值，hive.merge.size.smallfiles.avgsize可以指定所有输出文件大小的均值阈值，默认值都是1GB。如果平均大小不足的话，就会另外启动一个任务来进行合并。

4）启用压缩

压缩job的中间结果数据和输出数据，可以用少量CPU时间节省很多空间。压缩方式一般选择Snappy，效率最高。

要启用中间压缩，需要设定hive.exec.compress.intermediate为true，同时指定压缩方式hive.intermediate.compression.codec为org.apache.hadoop.io.compress.SnappyCodec。另外，参数hive.intermediate.compression.type可以选择对块（BLOCK）还是记录（RECORD）压缩，BLOCK的压缩率比较高。

输出压缩的配置基本相同，打开hive.exec.compress.output即可。

5）JVM重用

在MR job中，默认是每执行一个task就启动一个JVM。如果task非常小而碎，那么JVM启动和关闭的耗时就会很长。可以通过调节参数mapred.job.reuse.jvm.num.tasks来重用。例如将这个参数设成5，那么就代表同一个MR job中顺序执行的5个task可以重复使用一个JVM，减少启动和关闭的开销。但它对不同MR job中的task无效。

9、并行执行与本地模式

并行执行

●Hive中互相没有依赖关系的job间是可以并行执行的，最典型的就是多个子查询union all。在集群资源相对充足的情况下，可以开启并行执行，即将参数hive.exec.parallel设为true。另外hive.exec.parallel.thread.number可以设定并行执行的线程数，默认为8，一般都够用。

本地模式

●Hive也可以不将任务提交到集群进行运算，而是直接在一台节点上处理。因为消除了提交到集群的overhead，所以比较适合数据量很小，且逻辑不复杂的任务。

●设置hive.exec.mode.local.auto为true可以开启本地模式。但任务的输入数据总量必须小于hive.exec.mode.local.auto.inputbytes.max（默认值128MB），且mapper数必须小于hive.exec.mode.local.auto.tasks.max（默认值4），reducer数必须为0或1，才会真正用本地模式执行。

10、严格模式

所谓严格模式，就是强制不允许用户执行3种有风险的HiveQL语句，一旦执行会直接失败。这3种语句是：

●查询分区表时不限定分区列的语句；

●两表join产生了笛卡尔积的语句；

●用order by来排序但没有指定limit的语句。

要开启严格模式，需要将参数hive.mapred.mode设为strict。

11、采用合适的存储格式

在HiveQL的create table语句中，可以使用stored as ...指定表的存储格式。Hive表支持的存储格式有TextFile、SequenceFile、RCFile、Avro、ORC、Parquet等。

存储格式一般需要根据业务进行选择，在我们的实操中，绝大多数表都采用TextFile与Parquet两种存储格式之一。

TextFile是最简单的存储格式，它是纯文本记录，也是Hive的默认格式。虽然它的磁盘开销比较大，查询效率也低，但它更多地是作为跳板来使用。RCFile、ORC、Parquet等格式的表都不能由文件直接导入数据，必须由TextFile来做中转。

Parquet和ORC都是Apache旗下的开源列式存储格式。列式存储比起传统的行式存储更适合批量OLAP查询，并且也支持更好的压缩和编码。我们选择Parquet的原因主要是它支持Impala查询引擎，并且我们对update、delete和事务性操作需求很低。

## Hive的开窗函数有哪些 

可回答：1）介绍自己了解的窗口函数；2）上移一行和下移一行用哪个开窗函数实现

> 问过的一些公司：多益(2022.11)，电信天翼云(2022.10)，网易云音乐(2022.09)，西安隆基(2022.09)，货拉拉(2022.06)x2，迅雷(2021.10)，美团(2021.08)(2021.04)，北京河狸家社招(2020.10)，一点资讯(2020.08)

参考答案：

分析函数用于计算基于组的某种聚合值，它和聚合函数的不同之处是：对于每个组返回多行，而聚合函数对于每个组只返回一行。

开窗函数指定了分析函数工作的数据窗口大小，这个数据窗口大小可能会随着行的变化而变化！

基础结构如下：

分析函数（如:sum(),max(),row_number()...） + 窗口子句（over函数）

1、SUM函数

求和，窗口函数和聚合函数的不同，sum()函数可以根据每一行的窗口返回各自行对应的值，有多少行记录就有多少个sum值，而group by只能计算每一组的sum，每组只有一个值。sum()计算的是分区内排序后一个个叠加的值，和order by有关。

2、NTILE函数

NTILE(n)，用于将分组数据按照顺序切分成n片，返回当前切片值

注意：

●如果切片不均匀，默认增加第一个切片的分布

●NTILE不支持ROWS BETWEEN

3、ROW_NUMBER 函数

ROW_NUMBER()：从1开始，按照顺序，生成分组内记录的序列

ROW_NUMBER()：的应用场景非常多，比如获取分组内排序第一的记录、获取一个session中的第一条refer等：

4、RANK 和 DENSE_RANK 函数

RANK()：生成数据项在分组中的排名，排名相等会在名次中留下空位DENSE_RANK()：生成数据项在分组中的排名，排名相等会在名次中不会留下空位

5、CUME_DIST 函数

cume_dist：返回小于等于当前值的行数/分组内总行数

6、PERCENT_RANK 函数

percent_rank：分组内当前行的RANK值-1/分组内总行数-1

注意：一般不会用到该函数，可能在一些特殊算法的实现中可以用到吧

7、LAG 和 LEAD 函数

LAG(col,n,DEFAULT)：用于统计窗口内往上第n行值

第一个参数为列名，第二个参数为往上第n行（可选，默认为1），第三个参数为默认值（当往上第n行为NULL时候，取默认值，如不指定，则为NULL）

LEAD 函数则与 LAG 相反：

LEAD(col,n,DEFAULT)：用于统计窗口内往下第n行值

第一个参数为列名，第二个参数为往下第n行（可选，默认为1），第三个参数为默认值（当往下第n行为NULL时候，取默认值，如不指定，则为NULL）

8、FIRST_VALUE 和 LAST_VALUE 函数

FIRST_VALUE：取分组内排序后，截止到当前行，第一个值

LAST_VALUE 函数则相反：

LAST_VALUE：取分组内排序后，截止到当前行，最后一个值

这两个函数还是经常用到的（往往和排序配合使用），比较实用！

## row_number，rank，dense_rank的区别 

可回答：1）窗口函数: 针对窗口内的函数排名

> 问过的一些公司：电信天翼云(2022.10)，迅雷(2021.10)，美团(2021.09)(2021.04)，58(2021.09)x2，网易(2021.05)，科大讯飞(2021.03)，北京河狸家社招(2020.10)，字节(2020.09)

参考答案：

在Hive中，ROW_NUMBER、RANK和DENSE_RANK都是用于排序的窗口函数，它们的作用都是对结果集中的行进行排名，并可以根据需要为排名分配排名号。

三个排序函数的共同点与区别

| 函数         | 共同点                                     | 不同点                           |
| ------------ | ------------------------------------------ | -------------------------------- |
| row_number() | 用于特定场景下实现排序需求； 均从1开始排序 | 无重复排名（相同排名的按序排名） |
| dense_rank() | 用于特定场景下实现排序需求； 均从1开始排序 | 有相同排名，但不会跳过占用的排名 |
| rank()       | 用于特定场景下实现排序需求； 均从1开始排序 | 有相同排名，但会跳过占用的排名   |

详细区别如下：

●ROW_NUMBER：对结果集中的行进行编号，从1开始，每行加1，没有重复值。如果有相同的值，则第一个行的编号比第二个行的编号小1，第二个行的编号比第三个行的编号小1，以此类推。

●RANK：对结果集中的行进行排名，并在重复值中分配相同的排名，下一行排名将跳过该排名数量。例如，如果有两个行有相同的值并且都具有排名2，则下一个行的排名将为4。

●DENSE_RANK：与RANK类似，但在有重复值时不会跳过排名，即所有的重复值具有相同的排名，下一个行的排名为下一个唯一值的排名。

ROW_NUMBER按照排序顺序为每个行分配唯一的数字，RANK和DENSE_RANK为行分配相同的排名号。而RANK不跳过排名，DENSE_RANK则没有排名跳过，所以会出现一些重复的排名。。

注意： RANK和DENSE_RANK的区别在于排名相等时会不会留下空位

案例：

```hive
set mapreduce.job.queuename=QueueA;
 
 use STUDENT_DB;
 
 --创建学生分数表
 DROP TABLE IF EXISTS STUDENT_DB.SCORE_TABLE1;
 CREATE TABLE IF NOT EXISTS STUDENT_DB.SCORE_TABLE1
 (
     ID          STRING COMMENT '唯一ID',
     NAME        STRING COMMENT '姓名',
     SCORE       INT    COMMENT '分数',
     CLASS_NUM   STRING COMMENT '班级编号'
 )
 COMMENT '学生分数表'
 PARTITIONED BY (pt_dt STRING)
 ROW FORMAT DELIMITED FIELDS TERMINATED BY '\27'
 STORED AS ORCFILE;
 
 --向学生分数表插入数据
 INSERT OVERWRITE TABLE STUDENT_DB.SCORE_TABLE1 PARTITION(pt_dt='2019-12-12') VALUES
 ('1', '小明', 89, '1班'),
 ('2', '小红', 90, '1班'),
 ('3', '小军', 90, '1班'),
 ('4', '小胖', 91, '1班'),
 ('5', '小李', 87, '1班'),
 ('6', '小郭', 99, '1班');
 
 --创建学生分数排序结果表
 DROP TABLE IF EXISTS STUDENT_DB.SCORE_RANK_TABLE1;
 CREATE TABLE IF NOT EXISTS STUDENT_DB.SCORE_RANK_TABLE1
 (
     ID          STRING COMMENT '唯一ID',
     NAME        STRING COMMENT '姓名',
     SCORE       INT    COMMENT '分数',
     CLASS_NUM   STRING COMMENT '班级编号',
     ROW_NUMBERS STRING COMMENT 'ROW_NUMBER排序结果',
     DENSE_RANKS STRING COMMENT 'DENSE_RANKS排序结果',
     RANKS       STRING COMMENT 'RANKS排序结果'
 )
 COMMENT '学生分数排序结果表'
 PARTITIONED BY (pt_dt STRING)
 ROW FORMAT DELIMITED FIELDS TERMINATED BY '\27'
 STORED AS ORCFILE;
 
 INSERT OVERWRITE TABLE STUDENT_DB.SCORE_RANK_TABLE1 PARTITION(pt_dt='2019-12-12')
 SELECT ID,
        NAME,
        SCORE,
        CLASS_NUM,
        ROW_NUMBER() OVER(PARTITION BY CLASS_NUM ORDER BY SCORE DESC) AS ROW_NUMBERS,
        DENSE_RANK() OVER(PARTITION BY CLASS_NUM ORDER BY SCORE DESC) AS DENSE_RANKS,
        RANK() OVER(PARTITION BY CLASS_NUM ORDER BY SCORE DESC) AS RANKS
 FROM STUDENT_DB.SCORE_RANK_TABLE1
 WHERE pt_dt='2019-12-12';
 
 SELECT ID,
        NAME,
        SCORE,
        CLASS_NUM,
        ROW_NUMBERS,
        DENSE_RANKS,
        RANKS,
        pt_dt
 FROM STUDENT_DB.SCORE_RANK_TABLE1
 WHERE pt_dt='2019-12-12';
```



实验结果：

| ID   | NAME | SCORE | CLASS_NUM | ROW_NUMBERS | DENSE_RANKS | RANKS | pt_dtpt_dt |
| ---- | ---- | ----- | --------- | ----------- | ----------- | ----- | ---------- |
| 6    | 小郭 | 99    | 1班       | 1           | 1           | 1     | 2019-12-12 |
| 4    | 小胖 | 91    | 1班       | 2           | 2           | 2     | 2019-12-12 |
| 3    | 小军 | 90    | 1班       | 3           | 3           | 3     | 2019-12-12 |
| 2    | 小红 | 90    | 1班       | 4           | 3           | 3     | 2019-12-12 |
| 1    | 小明 | 89    | 1班       | 5           | 4           | 5     | 2019-12-12 |
| 5    | 小李 | 87    | 1班       | 6           | 5           | 6     | 2019-12-12 |

## collect_list，collect_set区别 

问过的一些公司：字节(2022.11)

参考答案：

在Hive中，collect_list和collect_set都是聚合函数，可以用于将分组后的数据合并成一个数组或者集合。其中，collect_list用于将分组后的所有数据合并成一个数组，而collect_set则用于将分组后的所有数据合并成一个集合，其中重复的数据只会被保留一次。

例如，假设我们有一个包含学生信息的表student，其中包含了学生的姓名、性别和年龄。如果我们要按照性别进行分组，并将每个分组中的所有学生姓名合并成一个数组，可以使用如下的HiveQL语句：

如果我们要将每个分组中的所有学生姓名合并成一个集合，可以将collect_list替换为collect_set：

由于collect_set会将数据合并成一个集合，因此无法保证数据的顺序，而collect_list则会保留数据的顺序。另外，由于collect_set需要判断数据是否重复，因此在处理大量数据时，可能会对性能产生一定的影响。

## Hive和SQL的区别 

问过的一些公司：蔚来(2022.11)，字节(2021.04)

参考答案：

Hive是一个基于Hadoop的数据仓库工具，它允许用户使用类似于SQL的查询语言(HiveQL)查询和分析存储在Hadoop分布式文件系统中的大数据集。

SQL是一种用于关系型数据库管理系统的标准查询语言，它用于查询、插入、更新和删除关系数据库中的数据。

虽然HiveQL和SQL都使用类似的语法和查询结构，但它们之间存在一些重要的区别。例如：

●底层存储：Hive使用Hadoop分布式文件系统作为其底层存储，而SQL使用关系型数据库管理系统（RDBMS）作为其底层存储。

●性能：由于Hadoop分布式文件系统的本质，Hive查询的性能可能比SQL查询慢。

●数据模型：Hive支持非结构化和半结构化数据（如JSON、XML、CSV），而SQL仅支持结构化数据。

●执行计划：Hive使用MapReduce执行计划，而SQL使用查询优化器生成执行计划。

●数据类型：Hive支持一些复杂的数据类型，如数组和映射，而SQL支持标准的数据类型，如整数和字符串。

综上，Hive适合处理大规模非结构化和半结构化数据，而SQL适合处理结构化数据。

## Hive数据倾斜以及解决方案 

可回答：1）大小表join

> 问过的一些公司：杰创智能科技(2022.11)，多益(2022.11)(2022.04)(2021.08)，星环科技(2022.10)，滴滴(2022.09)，字节(2022.09)(2022.08)(2021.08)(2020.09)(2020.08)，OPPO(2022.09)，荣耀(2022.09)，网易互娱(2022.08)，长江存储(2022.08)，百度(2022.07)x2，货拉拉(2022.06)，网易(2022.04)，小米(2021.10)(2019.09)，欢聚(2021.09)，唯品会(2021.09)x2，兴业数金(2021.08)，浩鲸科技(2021.08)，字节提前批(2021.08)，字节date数据中台实习(2021.08)，海康威视(2021.08)，58同城(2021.08)，好未来(2021.05)，美团实习(2021.04)，美团(2021.04)(2020.09)(2019.10)，阿里蚂蚁(2021.04)x2，抖音(2021.03)，顺丰(2020.11)(2020.08)(2019.09)，字节(2020.09)，科大讯飞(2020.09)，快手(2020.09)(2019.10)(2019.09)x2(2018.12)，腾讯(2020.08)，京东(2020.08)，有赞(2020.08)x2，一点资讯(2020.08)，抖音(2020.07)，360实习(2020.04)，东方头条(2019.10)，网易严选(2019.08)，网易考拉(2018.09)，美团新到店(2018.09)

参考答案：

1、什么是数据倾斜

数据倾斜主要表现在，map/reduce程序执行时，reduce节点大部分执行完毕，但是有一个或者几个reduce节点运行很慢，导致整个程序的处理时间很长，这是因为某一个key的条数比其他key多很多（有时是百倍或者千倍之多），这条key所在的reduce节点所处理的数据量比其他节点就大很多，从而导致某几个节点迟迟运行不完。这就是因为数据分布不均匀，大量相同的key被分配到一个分区，造成该区的reduce上的数据高于平均值，从而导致任务整体运行时间长，无法充分利用并行的效率。

2、数据倾斜的原因

一些操作：

| 关键词                                      | 情形                               | 后果                                         |
| ------------------------------------------- | ---------------------------------- | -------------------------------------------- |
| Join                                        | 其中一个表较小，但是key集中        | 分发到某一个或几个Reduce上的数据远高于平均值 |
| 大表与大表，但是分桶的判断字段0值或空值过多 | 这些空值都由一个reduce处理，灰常慢 |                                              |
| group by                                    | group by 维度过小，某值的数量过多  | 处理某值的reduce灰常耗时                     |
| Count Distinct                              | 某特殊值过多                       | 处理此特殊值的reduce耗时                     |

原因：

●key分布不均匀

●业务数据本身的特性

●建表时考虑不周

●某些SQL语句本身就有数据倾斜

现象：

●任务进度长时间维持在99%（或100%），查看任务监控页面，发现只有少量（1个或几个）reduce子任务未完成。因为其处理的数据量和其他reduce差异过大。

●单一reduce的记录数与平均记录数差异过大，通常可能达到3倍甚至更多。 最长时长远大于平均时长。

3、数据倾斜的解决方案

1）Map端聚合

 hive.map.aggr = true

Map 端部分聚合，相当于Combiner

 hive.groupby.skewindata=true

有数据倾斜的时候进行负载均衡，当选项设定为true，生成的查询计划会有两个MR Job。第一个MR Job 中，Map 的输出结果集合会随机分布到Reduce中，每个Reduce做部分聚合操作，并输出结果，这样处理的结果是相同的Group By Key有可能被分发到不同的Reduce中，从而达到负载均衡的目的；第二个MR Job再根据预处理的数据结果按照Group By Key分布到Reduce中（这个过程可以保证相同的Group By Key被分布到同一个Reduce中），最后完成最终的聚合操作。

综上，通过在Map端进行局部聚合，将数据量减小到可控范围。

2）SQL语句调节

如何join：

关于驱动表的选取，选用join key分布最均匀的表作为驱动表，做好列裁剪和filter操作，以达到两表做join的时候，数据量相对变小的效果。

大小表Join：

使用map join让小的维度表（1000条以下的记录条数）先进内存。在map端完成reduce。

大表Join大表：

把空值的key变成一个字符串加上随机数，把倾斜的数据分到不同的reduce上，由于null值关联不上，处理后并不影响最终结果。

count distinct大量相同特殊值：

count distinct时，将值为空的情况单独处理，如果是计算count distinct，可以不用处理，直接过滤，在最后结果中加1。如果还有其他计算，需要进行group by，可以先将值为空的记录单独处理，再和其他计算结果进行union。

group by维度过小：

采用sum() group by的方式来替换count(distinct)完成计算。

特殊情况特殊处理：

在业务逻辑优化效果的不大情况下，有些时候是可以将倾斜的数据单独拿出来处理。最后union回去。

3）使用Combiner函数

使用Combiner函数对Map端输出的数据进行合并，减少中间数据量。

4）使用随机数（重新设计key）

●对于Key值分布比较集中的情况，可以在Key值中加入随机数，将Key分布均匀。

●将Key值进行拆分或组合，将数据分散。

●对于知道Key值分布情况的情况下，可以对Key值进行预处理，使其分布更均匀。

5）设置合理的map、reduce的task数

能有效提升性能。比如，10w+级别的计算，用160个reduce，那是相当的浪费，1个足够。

6）增加JVM内存

这适用于变量值非常少的情况，这种情况下，往往只能通过硬件的手段来进行调优，增加JVM内存可以显著的提高运行效率。

4、典型的业务场景

1）空值产生的数据倾斜

场景：如日志中，常会有信息丢失的问题，比如日志中的 user_id，如果取其中的 user_id 和 用户表中的user_id 关联，会碰到数据倾斜的问题。

解决方法一：user_id为空的不参与关联

```hive
select * from log a
   join users b
   on a.user_id is not null
   and a.user_id = b.user_id
 union all
 select * from log a
   where a.user_id is null;
```



解决方法二：赋与空值分新的key值

```hive
select *
   from log a
   left outer join users b
   on case when a.user_id is null then concat(‘hive’,rand() ) else a.user_id end = b.user_id;
```



结论：

方法2比方法1效率更好，不但io少了，而且作业数也少了。解决方法一中log读取两次，jobs是2。解决方法二job数是1。这个优化适合无效id (比如 -99 , ’’, null 等) 产生的倾斜问题。把空值的key变成一个字符串加上随机数，就能把倾斜的数据分到不同的reduce上，解决数据倾斜问题。

2）不同数据类型关联产生数据倾斜

场景：用户表中user_id字段为int，log表中user_id字段既有string类型也有int类型。当按照user_id进行两个表的Join操作时，默认的Hash操作会按int型的id来进行分配，这样会导致所有string类型id的记录都分配到一个Reducer中。

解决方法：把数字类型转换成字符串类型

```hive
select * from users a
   left outer join logs b
   on a.usr_id = cast(b.user_id as string);
```



3）小表不小不大，怎么用 map join 解决倾斜问题

使用map join解决小表（记录数少）关联大表的数据倾斜问题，这个方法使用的频率非常高，但如果小表很大，大到map join会出现bug或异常，这时就需要特别的处理。 

例子：

```hive
select * from log a
   left outer join users b
   on a.user_id = b.user_id;
```



users表有600w+的记录，把users分发到所有的map上也是个不小的开销，而且map join不支持这么大的小表。如果用普通的join，又会碰到数据倾斜的问题。

解决方法：

```hive
select /*+mapjoin(x)*/* from log a
   left outer join (
     select  /*+mapjoin(c)*/d.*
       from ( select distinct user_id from log ) c
       join users d
       on c.user_id = d.user_id
     ) x
   on a.user_id = b.user_id;
```



假如，log里user_id有上百万个，这就又回到原来map join问题。所幸，每日的会员uv不会太多，有交易的会员不会太多，有点击的会员不会太多，有佣金的会员不会太多等等。所以这个方法能解决很多场景下的数据倾斜问题。

 ## Hive复杂数据类型 

问过的一些公司：OPPO(2022.09)，恒生(2022.09)

参考答案：

在 Hive 中，复杂数据类型常常用于存储和查询嵌套的数据结构，例如 JSON 或 XML 数据。

复杂数据类型包括：

●ARRAY：数组类型。可以包含不同类型的元素，使用HiveQL内置函数进行操作。

●MAP：映射类型。将键值对映射到一个单独的列中，使用HiveQL内置函数进行操作。

●STRUCT：结构类型。定义了一组命名字段，可以使用点号“.”来访问结构中的字段，使用HiveQL内置函数进行操作。

●UNION：联合类型。用于将多个表或查询的结果组合在一起，需要确保每个表或查询的列具有相同的数据类型和顺序。

●UNION ALL：联合类型。与UNION类似，但不会去重。

这些复合数据类型可以通过内置函数进行创建和操作。

## Hive怎么创建分区表？ 

问过的一些公司：陌陌提前批(2022.09)

参考答案：

Hive创建分区表需要执行以下步骤：

1）创建数据库（可选）：如果没有要使用的数据库，需要先创建一个。可以使用以下命令来创建：

 ```CREATE DATABASE IF NOT EXISTS database_name;```

2）创建表：使用CREATE TABLE语句创建表，指定表名、列名、数据类型等。同时需要指定表的分区字段，例如：

```hive
CREATE TABLE table_name (
     column_name1 data_type1,
     column_name2 data_type2,
     ...
 )
 PARTITIONED BY (partition_column data_type);
```



其中，partition_column为分区字段名，data_type为分区字段的数据类型。

3）添加分区：使用ALTER TABLE语句来添加分区，例如：

 ```ALTER TABLE table_name ADD PARTITION (partition_column=value);```

其中，value为分区字段对应的具体值。

4）加载数据：使用LOAD DATA语句将数据加载到表中，例如：

 ```LOAD DATA INPATH 'hdfs_path' [OVERWRITE] INTO TABLE table_name PARTITION (partition_column=value);```

通过以上步骤，可以创建一个分区表，并将数据加载到其中的指定分区中。

注意：在添加分区时需要指定完整的分区字段值，否则可能会导致查询出错。

## Hive动态分区？二级分区？ 

问过的一些公司：陌陌提前批(2022.09)

参考答案：

Hive支持动态分区和二级分区，可以更加灵活地管理和查询数据。

动态分区是指在将数据加载到表中时，根据指定的分区字段自动创建分区。与静态分区不同，动态分区不需要提前定义所有的分区，而是在加载数据时动态地创建分区，这样可以避免手动创建和管理分区带来的麻烦。

使用动态分区，需要在表创建时指定动态分区模式，例如：

```hive
CREATE TABLE table_name (
    column1 data_type1,
    column2 data_type2,
    ...
)
PARTITIONED BY (partition_column data_type)
[STORED AS file_format]
[TBLPROPERTIES (property_name=property_value)]
[LOCATION 'hdfs_path']
[AS select_statement]
[OPTIONS (key1=value1, key2=value2, ...)]
[PARTITIONED BY (dynamic_partition_column data_type)];
```



dynamic_partition_column为动态分区的字段名，需要与后续的LOAD DATA语句中指定的分区字段名相匹配。

二级分区是指在表的基础上再细分的分区方式，例如按年月分区。在创建表时，需要指定两个分区字段。

例如：

```hive
CREATE TABLE table_name (
    column1 data_type1,
    column2 data_type2,
    ...
)
PARTITIONED BY (partition_column1 data_type1, partition_column2 data_type2)
[STORED AS file_format]
[TBLPROPERTIES (property_name=property_value)]
[LOCATION 'hdfs_path']
[AS select_statement]
[OPTIONS (key1=value1, key2=value2, ...)];
```



在加载数据时，需要指定两个分区字段的值，例如：

LOAD DATA INPATH 'hdfs_path' INTO TABLE table_name PARTITION (partition_column1=value1, partition_column2=value2);

这样就可以创建一个按年月分区的二级分区表，并将数据按年月加载到对应的分区中。

## HQL语句的执行过程，验证用户权限在哪个组件？语法检查、表结构是否存在的检查在哪个组件？ 

问过的一些公司：陌陌提前批(2022.09)

参考答案：

HQL（Hive Query Language）是Hive中的查询语言，执行HQL查询的过程主要包括以下几个步骤：

1语法检查：在Hive中，用户提交的HQL查询会首先进行语法检查，以检查查询语句是否符合Hive的语法规范。语法检查是在Hive客户端中进行的，而不是在Hive服务端中进行的。如果查询语句存在语法错误，则会提示错误信息，让用户进行修改。

2表结构检查：在查询执行前，Hive会检查查询语句中涉及到的所有表是否存在，并且是否包含查询所需的列。这个检查是在Hive服务端中进行的。如果查询中使用的表不存在或者表结构不匹配，就会返回错误信息，查询无法继续执行。

3权限验证：在查询执行前，Hive还会对用户的查询权限进行验证，以确定用户是否有执行查询的权限。权限验证是在Hive服务端中进行的。Hive提供了一套完整的访问控制机制，可以控制用户对表和数据库的访问权限。

4查询优化：Hive会对查询语句进行优化，以提高查询性能。优化包括逻辑优化和物理优化两个方面。逻辑优化主要是对查询语句进行重写，例如通过WHERE子句的谓词下推等方式，来减少查询的数据量。物理优化主要是根据查询语句中的关键词和数据存储格式等信息，选择最优的查询执行计划。

5执行查询：当查询语句通过了语法检查、表结构检查、权限验证和优化之后，就可以开始执行查询了。查询执行过程中，Hive会读取数据，并按照查询语句中的要求进行处理和计算，最终将结果返回给用户。

验证用户权限的组件是Hive的授权模块，语法检查和表结构检查的组件是Hive服务端中的Hive元数据（Hive Metastore）模块。Hive元数据维护了Hive中所有表的元数据信息，包括表结构、分区信息、表所在的HDFS路径等。

## Hive的文件存储格式都有哪些 

可回答：1）Hive四种文件类型和压缩情况；2）Hive的存储模型；3）Hive的存储引擎了解哪些？

> 问过的一些公司：杰创智能科技(2022.11)，传音(2022.10)，荣耀(2022.09)，齐鲁空天院(2022.07)，兴业数金(2022.05)，字节(2022.05)，贝壳找房(2021.09)x2，快手(2021.09)(2019.09)，58(2021.09)，Shopee(2021.07)，北京元安物联社招(2020.10)

参考答案：

Hive的文件存储格式有四种：**TEXTFILE 、SEQUENCEFILE、ORC、PARQUET**，前面两种是行式存储，后面两种是列式存储。如果为textfile的文件格式，直接load，不需要走MapReduce；如果是其他的类型就需要走MapReduce了，因为其他的类型都涉及到了文件的压缩，这需要借助MapReduce的压缩方式来实现。

TEXTFILE：按行存储，不支持块压缩，默认格式，数据不做压缩，磁盘开销大，加载数据的速度最高 

RCFILE：

●数据按行分块，每块按列存储，结合了行存储和列存储的优点

●RCFile 保证同一行的数据位于同一节点，因此元组重构的开销很低

●RCFile 能够利用列维度的数据压缩，并且能跳过不必要的列读取 

ORCFile：

●存储方式：数据按行分块，每块按照列存储

●压缩快，快速列存取

●效率比rcfile高，是rcfile的改良版本，使用了索引

●使用ORC文件格式可以提高hive读、写和处理数据的能力 

PARQUET：按列存储，相对于ORC，Parquet压缩比较低，查询效率较低 

SequenceFile： 

●Hadoop API提供的一种二进制文件，以<key,value>的形式序列化到文件中

●存储方式：行存储 

总结

压缩比：ORC > Parquet > textFile（textfile没有进行压缩）

查询速度：三者几乎一致

## Hive支持哪些压缩格式？ 

问过的一些公司：杰创智能科技(2022.11)

参考答案：

Hive支持多种压缩格式，包括以下几种：

●Gzip：Hive中最常用的压缩格式之一，可通过设置 mapred.output.compression.codec 参数启用。

●Snappy：另一种流行的压缩格式，支持快速压缩和解压缩，可通过设置 mapreduce.map.output.compress.codec 和 mapreduce.output.fileoutputformat.compress.codec 参数启用。

●LZO：一种高效的压缩格式，支持快速压缩和解压缩，可通过设置 io.compression.codec.lzo.class 参数启用。

●bzip2：另一种高效的压缩格式，可通过设置 mapred.output.compression.codec 参数启用。

## Hive分区和分桶的区别 

可回答：1）Hive分区

> 问过的一些公司：杰创智能科技(2022.11)，携程(2022.09)，B站(2021.08)(2019.09)，美团实习(2021.04)，字节实习(2021.04)，京东实习(2021.03)，转转(2020.09)，阿里云社招(2020.09)，一点资讯(2020.08)，竞技世界(2020.08)，字节(2020.08)，猿辅导(2020.08)，抖音(2020.07)，小米(2019.09)，京东(2019.09)

参考答案：

1、定义上

分区

分区是将表按照某个列的值进行划分，然后将每个分区存储为一个单独的目录，将表数据存储在该目录下，以便更快地查询特定分区的数据。分区的应用场景是对于大规模的表，可以通过分区来提高查询效率，减少扫描数据的量。

例如，对于一个包含销售数据的表，可以按照日期列进行分区，将每个日期的数据存储在一个单独的目录中。这样做的好处是可以大大缩短查询的响应时间，因为只需要扫描特定分区的数据，而不是整个表的数据。另外，分区还可以提高数据加载和查询的并发度。

注意：partitned by子句中定义的列是表中正式的列（分区列），但是数据文件内并不包含这些列。

```hive
# 创建分区表
 create table student(
     id int,
     name string,
     age int,
     address string
 )
 partitioned by (dt string,type string)                 # 制定分区
 row format delimited fields terminated by '\t'         # 指定字段分隔符为tab
 collection items terminated by ','                     # 指定数组中字段分隔符为逗号
 map keys terminated by ':'                             # 指定字典中KV分隔符为冒号
 lines terminated by '\n'                               # 指定行分隔符为回车换行
 stored as textfile;                                    # 指定存储类型为文件
 
 
 # 将数据加载到表中（此时时静态分区）
 load data local inpath '/root/student.txt' into  test.student partition(class='一班');
```



分桶：

分桶是将表按照某个列的哈希值进行分桶，然后将数据分别存储到不同的桶中。每个桶的数据量大致相等，桶的数目需要在创建表时指定。分桶可以使Hive在进行关联操作时，按照桶的数量来分配map task，从而提高join的效率。此外，分桶还可以用于对表进行抽样，因为对于大规模的表，无需扫描全部数据即可对数据集进行抽样分析，提高查询效率。

例如，对于一个包含用户数据的表，可以按照用户ID列进行分桶，将相同ID的用户数据存储到同一个桶中。这样做的好处是可以使查询的并发度更高，因为可以同时扫描不同的桶，而不会产生数据倾斜的问题。另外，分桶还可以提高数据的查询效率，因为每个桶中的数据量相对较小，查询时需要扫描的数据量也更小。

注意：

创建分桶表时：

●可以使用distribute by(sno) sort by(sno asc) 或是使用clustered by(字段)

●当排序和分桶的字段相同的时候使用cluster by， 就等同于分桶+排序(sort)

```hive
# 创建分桶表
 create table student(
 id int,
 name string,
 age int,
 address string
 )
 clustered by(id) sorted by(age) into 4 buckets
 row format delimited fields terminated by '\t'
 stored as textfile;
 
 # 开启分桶
 set hive.enforce.bucketing = true;
 # 插入数据
 insert overwrite table studentselect id ,name ,age ,address from employees;
 # 也可以用另一种插入方式
 load data local inpath '/root/student.txt' into test.student;
```



2、数据类型上

分桶随机分割数据库，分区是非随机分割数据库。因为分桶是按照列的哈希函数进行分割的，相对比较平均；而分区是按照列的值来进行分割的，容易造成数据倾斜。

分桶是对应不同的文件（细粒度），分区是对应不同的文件夹（粗粒度）。桶是更为细粒度的数据范围划分，分桶的比分区获得更高的查询处理效率，使取样更高效。

注意：普通表（外部表、内部表）、分区表这三个都是对应HDFS上的目录，桶表对应是目录里的文件。

分区和分桶是可以同时使用的，但是它们的设计思想和应用场景是不同的。分区通常用于按照某个字段进行数据分类和组织，而分桶通常用于优化join操作，或者对大规模数据进行抽样。

## 分桶为什么可以优化join 

问过的一些公司：携程(2022.09)

参考答案：

分桶表最主要的使用场景是优化大表和大表的 join，其主要原理如下：

●如果大表和大表使用 MapReduce 的普通模式，会在 reduce 端 shuffle，一个是慢，另一个是容易出异常；

●而分桶表将大表的数据划分成一个个小块，分别在 Map 端做 join。

○因为分桶表在建表的时候，需要指定分桶的字段，对这个字段值取 hash 后对桶的个数取余数获得一个值，根据这个值将数据放到不同的桶里去。

○相同 key 的数据都在一个桶里，在表和表关联的时候就不需要去扫描整个表，只需要去扫描对应桶里的数据即可。

●由于不同的数据落到哪个桶是由分桶个数决定的，所以做 Join 的两个分桶表的桶个数必须是相等或者成倍数；

●分桶表的每个桶必须要排序，这样可以更高效的做 map join。

○这样的 join 称为 SMB map join （Sort Merge Bucket Map Join），核心思想是大表化成小表，分而治之。

## ORC和Parquet有什么区别？ 

问过的一些公司：杰创智能科技(2022.11)

参考答案：

ORC和Parquet都是Hive中常用的列式存储格式，它们与传统的行式存储格式相比，能够更好地满足大数据存储和查询的需求。它们的主要区别如下：

●读写性能：ORC和Parquet在读写性能方面都比传统的行式存储格式要更好。ORC主要优化了对大文件的读取性能，能够显著减少I/O操作，从而提高读取速度；而Parquet则专注于压缩技术，能够更高效地存储数据并提高读取速度。

●压缩率：ORC通常比Parquet提供更好的压缩率。ORC使用基于Zlib和Snappy的数据压缩算法，并使用Bloom过滤器等技术进行优化。而Parquet则使用各种压缩算法，如Gzip、Snappy、LZO等，以提高压缩率。

●数据处理方式：ORC是基于行式存储的，但同时也支持列式存储方式，它能够通过Predicate Pushdown等技术，在查询时仅读取符合条件的行数据，从而减少I/O操作。而Parquet是纯粹的列式存储格式，它仅仅读取必要的列数据，从而减少数据的扫描和I/O操作。

●数据存储方式：ORC通过索引和Lightweight索引等技术，对数据进行了进一步优化，可以在数据读取时减少I/O操作。而Parquet则采用了一种类似于B-Tree的数据存储方式，可以更快地定位和获取数据。

●兼容性：Parquet格式的兼容性更好，因为它是一个开源项目，支持多种不同的数据处理系统和编程语言。而ORC虽然也是一个开源项目，但只有一些Hadoop生态系统中的项目支持它。

综上，ORC和Parquet都是Hive中常用的存储格式，各有优缺点。选择哪种存储格式应该根据实际情况而定，例如需要考虑数据类型、数据量、查询需求、压缩需求等。

## SQL提交到Hive的过程是怎样的？ 

问过的一些公司：杰创智能科技(2022.11)

参考答案：

SQL提交到Hive的过程涉及多个步骤，包括SQL解析、生成逻辑执行计划、生成物理执行计划、提交任务到执行引擎、执行任务和返回查询结果等。这些步骤的执行过程需要考虑到查询的性能、并发度、安全性等方面的问题。

在使用SQL语句提交查询到Hive的过程中，详细分为以下几个步骤：

1SQL解析：Hive接收到SQL查询语句后，首先需要将其进行解析，以确定查询的类型、表名、列名、条件等信息。

2生成逻辑执行计划：Hive将解析后的查询语句转化为逻辑执行计划，其中包含了查询需要执行的所有任务及其依赖关系。

3生成物理执行计划：Hive将逻辑执行计划转化为物理执行计划，其中包含了每个任务需要执行的具体操作，如读取数据、过滤数据、聚合数据等。

4提交任务到执行引擎：Hive将生成的物理执行计划提交到相应的执行引擎中，如MapReduce或Tez等。

5执行任务：执行引擎按照物理执行计划中定义的操作顺序执行各个任务，并将中间结果存储在HDFS上。

6返回查询结果：执行引擎执行完所有任务后，将查询结果返回给Hive，Hive再将结果返回给客户端。

在这个过程中，Hive的元数据信息存储在关系型数据库中，例如Derby或MySQL。在提交查询任务时，Hive还会进行权限验证，以确保用户有权访问所请求的表和数据。

## Hive的用户自定义函数实现步骤与流程 

可回答：1）有写过UDF吗？如何实现UDF？2）UDF用什么语言开发的？开发完了怎么用？

> 问过的一些公司：网易云音乐(2022.11)，多益(2022.11)，百度(2022.09)，京东(2022.09)x2，富途(2021.03)，爱奇艺(2020.11)，北京河狸家社招(2020.10)，阿里淘系(2019.11)，快手(2019.09)，映客直播(2019.10)，网易严选(2019.08)，快手(2018.12)

参考答案：

1、如何构建UDF？

用户创建的UDF使用过程如下：

第一步：继承UDF或者UDAF或者UDTF，实现特定的方法；

第二步：将写好的类打包为jar，如hivefirst.jar；

第三步：进入到Hive外壳环境中，利用add jar /home/hadoop/hivefirst.jar注册该jar文件；

第四步：为该类起一个别名，create temporary function mylength as 'com.whut.StringLength'，这里注意UDF只是为这个Hive会话临时定义的；

第五步：在select中使用mylength()。

2、函数自定义实现步骤

1）继承Hive提供的类

```java
org.apache.hadoop.hive.ql.udf.generic.GenericUDF 
 org.apache.hadoop.hive.ql.udf.generic.GenericUDTF;
```



2）实现类中的抽象方法

3）在 hive 的命令行窗口创建函数添加 jar

```
add jar linux_jar_path  
 # 创建 function
 create [temporary] function [dbname.]function_name AS class_name;
```



4）在 hive 的命令行窗口删除函数

 drop [temporary] function [if exists] [dbname.]function_name;

3、自定义UDF案例

1）需求

自定义一个UDF实现计算给定字符串的长度，例如：

```hive
hive(default)> select my_len("abcd"); 
 4
```



2）导入依赖

```xml
<dependencies>
     <dependency>
         <groupId>org.apache.hive</groupId>
         <artifactId>hive-exec</artifactId>
         <version>3.1.2</version>
     </dependency>
 </dependencies>
```





3）创建一个类，继承于Hive自带的UDF

```java
/**
 * 自定义 UDF 函数，需要继承 GenericUDF 类
 * 需求: 计算指定字符串的长度
 */
 public class MyStringLength extends GenericUDF {
     /**
     *
     *@param arguments 输入参数类型的鉴别器对象
     * @return 返回值类型的鉴别器对象
     *@throws UDFArgumentException
     */
     @Override
     public ObjectInspector initialize(ObjectInspector[] arguments) throws UDFArgumentException {
         // 判断输入参数的个数
         if(arguments.length !=1) {
             throw new UDFArgumentLengthException("Input Args Length Error!!!");
         }
 // 判断输入参数的类型
 
         if(!arguments[0].getCategory().equals(ObjectInspector.Category.PRIMITIVE)
           ) {
             throw new UDFArgumentTypeException(0,"Input Args Type Error!!!");
         }
 //函数本身返回值为 int，需要返回 int 类型的鉴别器对象
         return PrimitiveObjectInspectorFactory.javaIntObjectInspector;
     }
 
     /**
     * 函数的逻辑处理
     *@param arguments 输入的参数
     *@return 返回值
     *@throws HiveException
     */
     @Override
     public Object evaluate(DeferredObject[] arguments) throws HiveException {
         if(arguments[0].get() == null) {
             return 0;
         }
         return arguments[0].get().toString().length();
     }
 
     @Override
     public String getDisplayString(String[] children) {
         return "";
     }
 }
```



4）打成jar包上传到服务器/opt/module/data/myudf.jar

5）将jar包添加到hive的classpath

 hive (default)> add jar /opt/module/data/myudf.jar; 

6）创建临时函数与开发好的java class关联

7）即可在hql中使用自定义的函数

 hive (default)> select ename,my_len(ename) ename_len from emp;

## Hive的三种自定义函数是什么？实现步骤与流程？它们之间的区别？作用是什么？ 

可回答：1）怎么实现Hive的UDF（UDF函数的开发流程）；2）Hive中有哪些UDF

问过的一些公司：网易云音乐(2022.11)

参考答案：

Hive自带了一些函数，比如：max/min等，但是数量有限，自己可以通过自定义UDF来 方便的扩展。

当Hive提供的内置函数无法满足你的业务处理需要时，此时就可以考虑使用用户自定义函数（UDF：user-defined function）。

根据用户自定义函数类别分为以下三种：

●UDF（User-Defined-Function）：一进一出

●UDAF（User-Defined Aggregation Function）：聚集函数，多进一出 

○类似于：count/max/min

●UDTF（User-Defined Table-Generating Functions）：一进多出

○如lateral view explode()

实现步骤和流程参考上一题

## 大表和大表之间的join怎么避免内存溢出？ 

可回答：1）两个表都很大怎么去解决数据倾斜；2）两个大表join有什么优化的地方

问过的一些公司：杰创智能科技(2022.11)，携程(2022.09)，唯品会(2021.09)，阿里蚂蚁(2021.08)，京东(2020.08)

参考答案：

增加集群资源：通过增加Hadoop集群中的节点数或者增加每个节点的资源，例如内存、CPU等，来提高查询的性能和容错能力。

使用Bucket Map Join：Bucket Map Join是一种将join操作划分为多个小任务的技术，可以减少每个任务的数据量，从而降低内存的消耗。在使用Bucket Map Join时，需要将表分桶，且分桶的列应该是join条件中的列。

使用Sort Merge Bucket Join：Sort Merge Bucket Join是一种将join操作分为两个阶段的技术。在第一阶段中，对每个表进行排序，并根据join条件对其进行分桶；在第二阶段中，对每个分桶进行join操作。这种方法可以避免将整个表加载到内存中，从而降低内存的消耗。

使用Map Join：Map Join是一种将小表读入内存中的技术，可以减少内存的消耗。在使用Map Join时，需要将小表进行适当的压缩和优化，以提高查询的性能。

使用索引：在Hive 3.0及以上版本中，可以使用ACID表的索引功能来优化查询，从而降低内存的消耗。通过对大表的索引，可以加速查询的速度，同时减少内存的使用。

为了避免Hive中大表和大表之间join操作的内存溢出问题，需要综合考虑集群资源、分桶、排序、Map Join和索引等方面的优化方法，以提高查询的性能和容错能力。

## Hive的函数：UDF、UDAF、UDTF的区别？ 

问过的一些公司：字节(2022.11)(2021.08)(2020.09)，58(2021.09)x2，好未来(2021.08)，美团(2021.04)，字节实习(2021.04)，顺丰(2020.11)，爱奇艺(2020.11)，快手提前批(2020.09)，转转(2020.09)x2，跟谁学(2020.09)，快手(2020.09)(2019.09)，百度(2020.08)，阿里云(2019.03)，知乎(2018.12)

参考答案：x2

UDF: 单行进入，单行输出

用户自定义函数，用于将一行数据映射为另一行数据。UDF通常用于对单行数据进行转换，例如将一个字符串转换为大写、将一个日期格式化为另一种日期格式等。UDF只能处理一行数据。

UDAF: 多行进入，单行输出

用户自定义聚合函数，用于将一组数据聚合成一个结果。UDAF通常用于计算总和、平均数、最大值、最小值等统计量，以及其他自定义的聚合计算。UDAF可以处理多行数据，返回单个值。

UDTF: 单行输入，多行输出

用户自定义表生成函数，用于将一行或多行数据转换为多行数据。UDTF通常用于将一个复杂的数据类型展开为多个记录，例如将一个JSON对象展开为多个行等。UDTF可以处理一行或多行数据，返回多行数据。

## 开窗函数Over()中有没有order by有什么区别？ 

问过的一些公司：网易云音乐(2022.11)

参考答案：

在Hive中，窗口函数可以使用OVER子句来指定窗口的范围，同时还可以使用ORDER BY子句来对窗口中的数据进行排序。

如果窗口函数中使用了ORDER BY子句，那么数据在进行聚合计算之前，会首先按照ORDER BY子句指定的排序规则进行排序。然后，再按照窗口的大小和偏移量来划分窗口，对每个窗口中的数据进行聚合计算。

如果窗口函数中没有使用ORDER BY子句，那么数据在进行聚合计算之前，会直接按照窗口的大小和偏移量来划分窗口，对每个窗口中的数据进行聚合计算。这种情况下，数据的顺序可能是无序的，具体顺序取决于数据的分布和处理方式。

ORDER BY子句会对窗口函数的结果产生影响，可以通过它来控制数据的排序方式，从而得到不同的结果。同时，使用ORDER BY子句也会对性能产生一定的影响，因为需要进行排序操作。

## Hive中大表和小表怎么聚合的？复制小表到map task的过程是什么样的？ 

问过的一些公司：阿里蚂蚁(2022.11)

参考答案：

当进行大表和小表的聚合操作时，Hive会根据优化器的规则自动选择合适的执行计划。一般来说，如果小表可以放在内存中，那么会先将小表复制到每个Map Task的内存中进行处理，然后再将结果传输回Reduce Task进行汇总，这个过程被称为Map-Side Join。

在Map-Side Join过程中，Hive会将小表数据复制到每个Map Task所在的节点上，这个过程被称为Replication。具体过程如下：

1在Hive中，如果一个表被标记为小表（Small Table），那么它会被缓存在Hive服务器的本地内存中。

2当执行包含小表和大表的Join操作时，Hive会启动MapReduce Job进行处理。

3在Map任务执行之前，Hive会将小表从本地内存复制到每个Map任务所在的节点上。

4在Map任务执行过程中，每个Map任务都可以直接读取本地节点上的小表数据，而不需要通过网络传输，从而大大加快了处理速度。

注意：只有当小表可以全部放入内存中时，才会使用Map-Side Join来加速处理。如果小表的数据量太大，无法全部放入内存中，那么就必须使用普通的Reduce-Side Join来处理，这种情况下，小表会和大表一样被划分为多个分片，分发到不同的Map任务上进行处理，最后再通过Reduce任务进行合并。

## 最新版的Hive支持更新数据了，为何这么设计？ 

可回答：1）Hive支不支持更新数据 ？

问过的一些公司：茄子科技(2022.11)

参考答案：

Hive在最新版本（Hive 4.0.0及以上）中引入了Delta Lake插件，使得Hive能够支持基于Apache Hadoop的原子事务和数据修改操作，包括INSERT、UPDATE、DELETE和MERGE等语句。这是因为Hive在数据处理领域已经逐渐向实时数据处理转型，除了批处理之外，也需要支持一些在线事务处理（OLTP）的功能，例如数据的修改、删除和增加等操作。

在实际应用中，很多数据处理场景需要对数据进行修改或者删除操作，例如需要修复数据中的错误或者处理数据更新等需求。传统的Hive处理这类数据时需要使用一些不太友好的方法，例如需要将数据导出到其他工具进行修改后再导入回来。这样的方法不仅效率低下，还容易出现数据丢失等问题。支持数据更新操作的新版Hive能够直接在Hive内部进行数据的修改和删除，大大提高了数据处理的效率和可靠性。

此外，Hive中引入了ACID（Atomicity、Consistency、Isolation、Durability）特性来支持事务操作，使得Hive能够满足更多场景的需求，例如金融行业、游戏行业等需要高可靠性和一致性的应用。总之，新版Hive支持数据更新是为了更好地满足用户需求和扩展应用场景。

## Hive的cluster by 、sort by、distribute by 、order by 区别？ 

可回答：1）Hive的排序函数；2）Hive的排序，以及各自的区别；3）四个by的区别？

问过的一些公司：字节(2022.08)(2020.06)，三一重工提前批(2022.06)，唯品会(2021.09)，58(2021.09)x2，B站(2021.08)，好未来(2021.08)，大华(2021.07)，百度(2021.04)(2020.08)，小米(2020.09)，百度社招(2020.09)，美团(2020.04)(2019.05)，快手(2019.09)，Freewheel(2019.09)

参考答案：

共有四种排序：Order By，Sort By，Distribute By，Cluster By

1、Order By：全局排序

●对输入的数据做排序，故此只有一个reducer（多个reducer无法保证全局有序）；

●只有一个reducer，会导致当输入规模较大时，需要较长的计算时间；

1）使用 ORDER BY 子句排序

ASC（ascend）: 升序（默认）

DESC（descend）: 降序

2）ORDER BY 子句在SELECT语句的结尾

3）案例

查询员工信息按工资升序排列

 select * from emp order by sal;

2、Sort By：非全局排序

●在数据进入reducer前完成排序；

●当mapred.reduce.tasks > 1时，只能保证每个reducer的输出有序，不保证全局有序；

3、Distribute By：分区排序

●按照指定的字段对数据进行划分输出到不同的reduce中，通常是为了进行后续的聚集操作；

●常和sort by一起使用，并且distribute by必须在sort by前面；

4、Cluster By

相当于distribute by+sort by，只能默认升序，不能使用倒序。

## Hive底层执行逻辑，逻辑计划优化有哪些方法？ 

问过的一些公司：百度(2022.07)

参考答案：

1、底层执行逻辑

Hive将HiveQL语句转化为MapReduce任务，具体的执行流程包括以下几个步骤：

●语法解析和语义分析

●生成逻辑计划（Logical Plan）

●生成物理计划（Physical Plan）

●执行MapReduce任务

2、逻辑计划优化

●表达式下推（Expression Pushdown）：将查询中的过滤条件下推到存储层，减少需要读取的数据量，提高查询效率。

●常量折叠（Constant Folding）：将查询中的常量表达式直接计算出结果，减少运行时计算量。

●列裁剪（Column Pruning）：在查询中只选择需要的列，减少数据的读取量。

●连接重排（Join Reordering）：优化连接操作的顺序，尽可能减少中间数据的生成，提高查询性能。

●连接分解（Join Decomposition）：将大的连接操作拆分为多个小的连接操作，减少中间数据的生成，提高查询性能。

●表合并（Table Joining）：将多个查询合并成一个查询，减少查询的次数，提高查询性能。

Hive还支持用户自定义优化规则，用户可以根据自己的需求定制优化规则，以提高查询性能。

## partition关键字做什么，为什么要分区 

可回答：1）Hive partition什么意思？ 2）为什么要分区？

问过的一些公司：长江存储(2022.08)

参考答案：

Partition关键字用于在Hive表中定义一个或多个分区，将数据按照指定的分区键进行分割并存储到独立的文件夹中，提高查询效率，降低数据扫描的范围和时间，加快数据处理，节省了I/O和网络传输等资源。

Partition的作用主要如下：

●数据分区：通过将表数据按照指定的分区键进行分割，使得数据可以分散存储在不同的目录或子目录下，减少数据的存储和查询范围，从而提高数据处理效率。

●数据过滤、优化：由于每个分区都是独立的目录或子目录，因此在查询时可以只扫描需要的分区，跳过不需要的分区，从而减少数据扫描的范围和时间，提高查询效率。

## 怎么看hql的执行日志？ 

问过的一些公司：货拉拉(2022.06)

参考答案：

可以通过查看作业执行日志来了解hql的执行情况。Hive作业执行时，会产生多个日志文件，其中最常见的日志文件有以下几种：

●JobTracker日志：记录了MapReduce作业提交和执行的过程。可以在Hadoop的JobTracker界面上查看，也可以在Hadoop集群的节点上查看$HADOOP_LOG_DIR/userlogs目录下的日志文件。

●TaskTracker日志：记录了MapReduce任务执行的过程。可以在Hadoop的TaskTracker界面上查看，也可以在Hadoop集群的节点上查看$HADOOP_LOG_DIR/userlogs目录下的日志文件。

●HiveServer2日志：记录了HiveServer2服务的启动和运行情况。可以在HiveServer2的日志目录下查看，一般在/var/log/hive/hiveserver2.log。

●Hive客户端日志：记录了Hive客户端执行HQL的过程，包括命令输入、输出和错误信息等。可以在执行HQL的终端或客户端中查看，也可以将输出重定向到文件中保存。

查看hql执行日志时，需要先确定作业ID或任务ID，然后查找对应的日志文件。作业ID可以在Hive客户端或HiveServer2界面上查看，而任务ID可以在JobTracker或TaskTracker界面上查看。在查找日志文件时，可以使用以下命令：

 hadoop fs -cat /path/to/log/file | less

该命令可以查看Hadoop集群中指定路径下的文件内容，并使用less命令进行分页浏览。根据需要可以使用grep等工具查找关键字，以便定位问题。

## Hive内部表和外部表都能使用location吗？ 

问过的一些公司：三一重工提前批(2022.06)

参考答案：

Hive内部表和外部表都可以使用location属性。

加location时，在HDFS的目录/user/hive/warehouse下没有以该表名命名的目录。加载数据时会在location后面所在的目录下创建分区目录或者数据目录。

不加location时则存在以该表名命名的目录。

## Hive没办法创建分区怎么理解，怎么解决 

问过的一些公司：字节(2022.05)

参考答案：

如果在Hive中无法创建分区，一般有以下几种可能的原因：

●表不是分区表：如果要在表中创建分区，首先需要在创建表时使用PARTITIONED BY语句来指定分区键。如果创建表时没有指定分区键，则该表就不是分区表，也就无法创建分区。

●存储格式不支持分区：Hive支持的存储格式不一定都支持分区，例如，文本格式不支持分区。因此，在创建表时需要使用支持分区的存储格式，如ORC、Parquet等。

●存储路径没有写权限：如果要在Hive中创建分区，需要先指定分区路径。如果分区路径没有写权限，则无法创建分区。此时，需要检查分区路径的权限是否正确，并确保当前用户有写权限。

如果出现无法创建分区的情况，可以尝试以下解决方法：

●检查表是否是分区表，如果不是分区表，则需要修改表定义，添加分区键。

●检查表的存储格式是否支持分区，如果不支持分区，则需要修改表的存储格式。

●检查分区路径的权限是否正确，如果没有权限，则需要修改路径权限或使用有权限的路径。

●如果以上方法无法解决问题，可以尝试升级Hive或者重新安装Hive，以解决可能的软件版本或配置问题。

## Hive三级分区怎么解决小文件问题？ 

问过的一些公司：陌陌(2021.10)

参考答案：

三级分区可以通过将数据按照更细的维度进行划分，以降低每个分区中的文件数，从而有效地解决小文件问题。例如，可以将数据按照年、月和日三级分区，这样每个分区中的数据量就会减少，HDFS中生成的小文件数量也会减少。此外，还可以使用动态分区功能，将数据按照查询结果进行分区，从而避免手动创建过多的分区。

除了使用三级分区，还可以采用一些其他方法来解决小文件问题。

●可以使用Hive提供的合并小文件的功能，将多个小文件合并为一个大文件，以减少文件数量和提高查询性能。

●可以使用Hive的压缩功能，将数据压缩存储，从而减少磁盘占用和文件数量，提高查询性能。

●可以使用Hive的桶功能，将数据分成若干个桶，从而避免数据倾斜和大量小文件问题。

## Hive建模了解吗 

问过的一些公司：陌陌(2021.10)

参考答案：

维度建模一般按照以下四个步骤： 选择业务过程→声明粒度→确认维度→确认事实

1、选择业务过程

在业务系统中，挑选我们感兴趣的业务线，比如下单业务，支付业务，退款业务，物流业务，一条业务线对应一张事实表。 如果是中小公司，尽量把所有业务过程都选择。 如果是大公司（1000多张表），选择和需求相关的业务线。

2、声明粒度

数据粒度指数据仓库的数据中保存数据的细化程度或综合程度的级别。 声明粒度意味着精确定义事实表中的一行数据表示什么，应该尽可能选择最小粒度，以此来应各种各样的需求。 典型的粒度声明如下： 订单当中的每个商品项作为下单事实表中的一行，粒度为每次。 每周的订单次数作为一行，粒度为每周。 每月的订单次数作为一行，粒度为每月。 如果在DWD层粒度就是每周或者每月，那么后续就没有办法统计细粒度的指标了。所以建议采用最小粒度。

3、确定维度

维度的主要作用是描述业务是事实，主要表示的是“谁，何处，何时”等信息。 确定维度的原则是：后续需求中是否要分析相关维度的指标。例如，需要统计，什么时间下的订单多，哪个地区下的订单多，哪个用户下的订单多。需要确定的维度就包括：时间维度、地区维度、用户维度。 维度表：需要根据维度建模中的星型模型原则进行维度退化。

4、确定事实

此处的“事实”一词，指的是业务中的度量值（次数、个数、件数、金额，可以进行累加），例如订单金额、下单次数等。 在DWD层，以业务过程为建模驱动，基于每个具体业务过程的特点，构建最细粒度的明细层事实表。事实表可做适当的宽表化处理。 事实表和维度表的关联比较灵活，但是为了应对更复杂的业务需求，可以将能关联上的表尽量关联上。如何判断是否能够关联上呢？在业务表关系图中，只要两张表能通过中间表能够关联上，就说明能关联上。

## udf是怎么在Hive里执行的 

问过的一些公司：携程(2021.09)

参考答案：

打包成jar上传到集群，注册自定义函数，通过类加载器载入系统，在sql解析的过程中去调用函数。

## Hive表字段换类型怎么办 

问过的一些公司：贝壳找房(2021.09)

参考答案：

在Hive中，如果需要更改表的字段类型，可以使用ALTER TABLE语句结合CHANGE关键字来实现。

 ALTER TABLE table_name CHANGE column_name new_data_type;

其中，column_name是需要更改类型的字段名称，new_data_type是新的数据类型。可以将new_data_type设置为Hive支持的任何数据类型，例如STRING、INT、DOUBLE等。

注意：更改表字段类型可能会影响到已有数据的正确性，特别是从高精度类型（如DECIMAL）转换为低精度类型（如INT）时可能会发生数据截断，因此需要谨慎操作。在更改表字段类型之前，最好备份数据或者创建一个新表，以防止数据丢失或不可恢复的错误。

## Hive里metastore是干嘛的 

问过的一些公司：兴业数金(2021.08)

参考答案：

1、Metadata概念

元数据包含用Hive创建的database、table等的元信息。元数据存储在关系型数据库中。如Derby、MySQL等。

2、Metastore作用

客户端连接metastore服务，metastore再去连接MySQL数据库来存取元数据。有了metastore服务，就可以有多个客户端同时连接，而且这些客户端不需要知道MySQL数据库的用户名和密码，只需要连接metastore 服务即可。

3、Hive的元数据存储(Metastore三种配置方式)

由于元数据不断地修改、更新，所以Hive元数据不适合存储在HDFS中，一般存在RDBMS中。

1）内嵌模式（Embedded）

hive服务和metastore服务运行在同一个进程中，derby服务也运行在该进程中.内嵌模式使用的是内嵌的Derby数据库来存储元数据，也不需要额外起Metastore服务。

这个是默认的，配置简单，但是一次只能一个客户端连接，适用于用来实验，不适用于生产环境。

2）本地模式（Local）:

本地安装mysql 替代derby存储元数据不再使用内嵌的Derby作为元数据的存储介质，而是使用其他数据库比如MySQL来存储元数据。hive服务和metastore服务运行在同一个进程中，mysql是单独的进程，可以同一台机器，也可以在远程机器上。

这种方式是一个多用户的模式，运行多个用户client连接到一个数据库中。这种方式一般作为公司内部同时使用Hive。每一个用户必须要有对MySQL的访问权利，即每一个客户端使用者需要知道MySQL的用户名和密码才行。

3）远程模式（Remote）: 远程安装mysql 替代derby存储元数据

Hive服务和metastore在不同的进程内，可能是不同的机器，该模式需要将hive.metastore.local设置为false，将hive.metastore.uris设置为metastore服务器URL，远程元存储需要单独起metastore服务，然后每个客户端都在配置文件里配置连接到该metastore服务。将metadata作为一个单独的服务进行启动。各种客户端通过beeline来连接，连接之前无需知道数据库的密码。

仅连接远程的mysql并不能称之为“远程模式”，是否远程指的是metastore和hive服务是否在同一进程内。

## HiveServer2是什么？ 

问过的一些公司：兴业数金(2021.08)

参考答案：

HiveServer2（HS2）是一个服务端接口，使远程客户端可以执行对Hive的查询并返回结果。目前基于Thrift RPC的实现是HiveServer的改进版本，并支持多客户端并发和身份验证.

HiveServer的核心是基于Thrift，Thrift负责hive的查询服务，Thtift是构建跨平台的rpc框架，主要由四层组成：server，Transport，Protocol和处理器

server

●HiveServer在TCP模式下使用ThreadPoolServer，在HTTP下使用jetty server

●server主要为每个tpc连接分配一个工作线程

Transport

●如果客户端与服务器之间需要代码（安全原因），则需要http模式，通过hive配置属性 hive.server2.transport.mode指定Thrift服务的传输模式

Protocol

●协议主要负责序列化和反序列化

处理器

●处理请求的应用程序框架，实现了编译和执行hive查询的逻辑，负责准备各种执行引擎的物理执行计划

## Hive存储数据吗 

问过的一些公司：vivo提前批(2021.06)

参考答案：

Hive本身不存储数据。

Hive的数据分为表数据和元数据，表数据是Hive中表格(table)具有的数据；而元数据是用来存储表的名字，表的列和分区及其属性，表的属性(是否为外部表等)，表的数据所在目录等。

Hive建表后，表的元数据存储在关系型数据库中（如：mysql），表的数据（内容）存储在hdfs中，这些数据是以文本的形式存储在hdfs中（关系型数据库是以二进制形式存储的），既然是存储在hdfs上，那么这些数据本身也是有元数据的（在NameNode中），而数据在DataNode中。这里注意两个元数据的不同。

## Hive中的压缩方式 

问过的一些公司：三一重工提前批(2021.05)

参考答案：

Hive 中支持多种压缩方式，常见的有以下几种：

●Snappy：一种快速、流行的压缩算法，可以提供比 Gzip 更好的压缩比和速度，但比 Gzip 的压缩率低一些。

●Gzip：一种广泛使用的压缩算法，压缩比较高，但速度相对较慢。

●Lzo：一种高效的压缩算法，压缩率比 Snappy 和 Gzip 都高，但需要更多的 CPU 和内存资源。

●Bzip2：一种高压缩比的算法，但相对于其他压缩算法，它的压缩和解压速度较慢。

压缩比：Bzip2 > Gzip > Snappy > Lzo，在不同的测试场景中，会有差异，这仅仅是一个大概的排名情况。Bzip2、Gzip可以保证最小的压缩，但在运算中过于消耗时间。

压缩性能：Lzo > Snappy > Gzip > Bzip2 ，其中Lzo、Snappy压缩和解压缩速度快，压缩比低。

对于使用 Gzip 或 Bzip2 压缩的文件可以直接导入到text 存储类型的表中的，Hive会自动帮我们完成数据的解压。

## Hive的执行流程 

可回答：1）Hive是怎么执行的；2）Hive的工作机制

问过的一些公司：58(2021.09)x2，网易(2021.05)，多益(2021.05)，海康威视(2019.09)

参考答案：

1、执行流程概述

![image.png](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/1682066159219-1079e907-b07c-4c94-9322-b0e2a5edb9f8.png)



查看Hive语句的执行流程：explain select ….from t_table …;

●查看Hive语句的执行流程：explain select ….from t_table …;

●操作符是Hive的最小执行单元

●Hive通过execmapper和execreducer执行MapReduce程序，执行模式有本地模式和分布式模式

●每个操作符代表一个 HDFS 操作或者 MapReduce 作业

Hive操作符：

![image.png](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/1682066159089-34fb4bb1-c14b-4e12-8573-257a4bf322b7.png)



Hive编译器的工作职责：

●Parser：将Hql语句转换成抽像的语法书（Abstract Syntax Tree）

●Semantic Analyzer：将抽象语法树转换成查询块

●Logic Plan Generator：将查询树，转换成逻辑查询计划

●Logic Optimizer：重写逻辑查询计划，优化逻辑执行计划

●Physical Plan Gernerator：将逻辑执行计划转化为物理计划

●Physical Optimizer：选择最佳的join策略，优化物理执行计划

2、Hive工作原理

![image.png](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/1682066159157-8c408bbf-d859-4118-bda1-d2235a03b170.png)



流程步骤：

1）用户提交查询等任务给Driver。

2）编译器获得该用户的任务Plan。

3）编译器Compiler根据用户任务去MetaStore中获取需要的Hive的元数据信息。

4）编译器Compiler得到元数据信息，对任务进行编译，先将HiveQL转换为抽象语法树，然后将抽象语法树转换成查询块，将查询块转化为逻辑的查询计划，重写逻辑查询计划，将逻辑计划转化为物理的计划（MapReduce）, 最后选择最佳的策略。

5）将最终的计划提交给Driver。

6）Driver将计划Plan转交给ExecutionEngine去执行，获取元数据信息，提交给JobTracker或者SourceManager执行该任务，任务会直接读取HDFS中文件进行相应的操作。

7）获取执行的结果。

8）取得并返回执行结果。

3、hive的具体执行过程分析

1）Join（reduce join）

例：

 SELECT pv.pageid, u.age FROM page_view pv JOIN user u ON pv.userid = u.userid;

![image.png](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/1682066159156-a7dabc86-5ae8-4c78-a6d4-716b7c2ce264.png)



map 端：以 JOIN ON 条件中的列作为 Key，以page_view表中的需要字段，表标识作为value，最终通过key进行排序，也就是join字段进行排序。

shuffle端：根据 Key 的值进行 Hash，并将 Key/Value 对按照 Hash 值推 至不同对 Reduce 中

reduce 端：根据key进行分组，根据不同的表的标识，拿出不同的数据，进行拼接。

2）group by

例：

 SELECT pageid, age, count(1) FROM pv_users GROUP BY pageid, age;

![image.png](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/1682066159162-a51f57d6-f69b-4f4b-b3dc-d27eed502af9.png)



map 端：

key：以pageid, age作为key,并且在map输出端有combiner。

value ：1次

reduce 端：对value进行求和

3）distinct

例：select distinct age from log;

map端：

key：age

value：null

reduce端：

一组只要一个输出context.write(key,null)。

4）distinct+count

例：select count(distinct userid) from weibo_temp;

即使设置了reduce个数为3个，最终也只会执行一个，因为，count()是全局，只能开启一个reducetask。

map端：

key：userid

value： null

reduce端：

一组只要一个，定义一个全局变量用于计数，在cleanup（Context context）中输出context.write(key,count)，当然distinct+count是一个容易产生数据倾斜的做法，应该尽量避免，如果无法避免，那么就使用这种方法：select count(1) from (select distinct userid from weibo_temp); 这样可以并行多个reduce task任务，从而解决单节点的压力过大。

## Hive SQL实现查询用户连续登陆，讲讲思路  

问过的一些公司：美团(2021.04)

参考答案：

假设我们有一个用户登录日志表，其中包含以下字段：

●user_id: 登录用户ID

●login_date: 登录日期

●login_time: 登录时间

我们可以使用Hive SQL来查询连续登录的用户。下面是一种实现思路：

1）首先按照user_id和login_date排序，以便后面可以按照时间顺序进行计算。

2）使用Hive的窗口函数，为每个用户和日期分配一个连续的序号，序号是按照时间顺序递增的。可以使用如下语句：

3） 在上面的基础上，再次使用窗口函数，计算每个用户连续登录的天数。可以使用如下语句： 

这里我们通过窗口函数计算每个用户每天的序号，然后用当前序号减去用户每天最早的序号，就可以计算出这是第几天了。最后根据用户ID、日期、天数进行分组，找到连续登录3天及以上的用户即可。 

注意：这种方法只适用于连续登录天数不超过一个月的情况，如果要处理更长时间范围的连续登录，则需要更复杂的处理方式。 

## Hive的实现逻辑，为什么处理小表延迟比较高 

问过的一些公司：字节实习(2021.03)

参考答案：

因为其计算是通过MapReduce，MapReduce是批处理，高延迟的。 对于小表查询，MapReduce框架在启动任务、分配资源、执行任务以及回收资源等方面都存在一定的开销，这些开销可能比任务执行的时间还要长，这就会导致处理小表的延迟比较高。

## Hive为什么要用Tez框架 

问过的一些公司：富途(2021.03)

参考答案：

Hive是基于MapReduce的计算框架，而MapReduce对于一些任务来说会存在一些问题，比如处理大量小文件时会出现大量的IO开销，任务调度过程中存在较多的开销等。为了解决这些问题，Hive引入了Tez框架。

Tez是一个数据处理框架，可以更好地处理Hive的计算。它与MapReduce不同，将任务分成多个可重用的步骤，通过Directed Acyclic Graph（DAG）连接这些步骤，使得执行计划更加高效。使用Tez可以获得更快的响应时间和更高的吞吐量，特别是在处理大量小文件时。

Tez框架还支持动态资源分配，可以根据任务需要的资源来动态地分配计算资源，从而更加高效地利用资源。同时，Tez还支持多种执行引擎，例如Spark，Flink等，可以提供更多的计算选择。

## Tez运行 

可回答：1）Tez引擎的优点

问过的一些公司：字节(2020.09)，转转(2020.09)

参考答案：

Tez是一种高性能的数据处理引擎，Tez引擎的主要特点是支持高效的数据流处理和任务调度，能够充分利用现代计算集群的计算和存储资源，提高任务执行的效率和吞吐量。

在Hive中使用Tez引擎可以提高查询的性能和响应速度，同时还支持更丰富的查询语法和功能。

Tez引擎执行Hive查询的过程如下：

1用户提交一个Hive查询请求，Hive会将查询语句编译为逻辑查询计划。

2Hive会将逻辑查询计划转化为物理查询计划，根据查询条件和数据规模等因素，选择最合适的查询算法和执行引擎，包括MapReduce、Tez和Spark。

3这里假设选择使用Tez引擎执行查询，Hive会将物理查询计划转化为Tez DAG（Directed Acyclic Graph，有向无环图），其中包含多个任务和操作，每个任务包含多个处理步骤和依赖关系。

4Tez引擎根据DAG图中的任务和操作，将查询划分为多个子任务，使用优化的任务调度算法，将子任务分配到集群中的计算节点上执行。

5在执行过程中，Tez引擎会利用节点间的数据流和共享存储，实现高效的数据传输和共享，减少数据拷贝和网络传输的开销，提高数据处理的效率和吞吐量。

6执行完所有子任务后，Tez引擎将结果返回给Hive，由Hive进行结果的整合和输出。

## 你常用的聚合函数有哪些？  

问过的一些公司：爱奇艺(2020.11)

参考答案：

常用的聚合函数：

●COUNT：计算行数

●SUM：求和

●AVG：平均值

●MAX：最大值

●MIN：最小值

●GROUP_CONCAT：将每个分组中的所有数据合并为一个字符串

●COLLECT_SET：将每个分组中的唯一数据合并为一个集合

●COLLECT_LIST：将每个分组中的数据合并为一个列表

这些聚合函数可以用于Hive中的SELECT语句中的SELECT子句或HAVING子句中，以便对数据进行聚合操作。使用聚合函数能够很方便地对大量数据进行汇总和计算，从而为数据分析提供帮助。

## 你知道Hive有哪些引擎？ 

可回答：1）Hive的存储引擎和计算引擎

问过的一些公司：字节(2020.09)，转转(2020.09)，顺丰(2020.08)x2，快手(2018.12)

参考答案：

1、计算引擎

在Hive 1.1之前，Hive支持MapReduce、Tez两种计算引擎。

在Hive 1.1之后，Hive支持MapReduce、Tez和Spark三种就算引擎。

配置命令如下：

```hive
# 配置mapreduce计算引擎
 set hive.execution.engine=mr;
 # 配置spark计算引擎
 set hive.execution.engine=spark;
 # 配置tez 计算引擎
 set hive.execution.engine=tez;
```



注意版本问题

如下：

MapReduce计算引擎：

Hive最初的执行引擎，使用MapReduce进行数据处理。它的优点是稳定可靠，能够处理大规模数据，但缺点是计算速度相对较慢。

Map在读取数据时，先将数据拆分成若干数据，并读取到Map方法中被处理。数据在输出的时候，被分成若干分区并写入内存缓存（buffer）中，内存缓存被数据填充到一定程度会溢出到磁盘并排序，当Map执行完后会将一个机器上输出的临时文件进行归并存入到HDFS中。

当Reduce启动时，会启动一个线程去读取Map输出的数据，并写入到启动Reduce机器的内存中，在数据溢出到磁盘时会对数据进行再次排序。当读取数据完成后会将临时文件进行合并，作为Reduce函数的数据源。

Tez计算引擎：

在MapReduce引擎的基础上，Hive引入了Tez引擎，使用DAG（有向无环图）作为计算模型，将多个MapReduce任务合并为一个DAG，减少了任务启动时间和中间数据的存储，提高了执行效率。

Apache Tez是进行大规模数据处理且支持DAG作业的计算框架，它直接源于MapReduce框架，除了能够支持MapReduce特性，还支持新的作业形式，并允许不同类型的作业能够在一个集群中运行。

Tez将原有的Map和Reduce两个操作简化为一个概念——Vertex，并将原有的计算处理节点拆分成多个组成部分：Vertex Input、Vertex Output、Sorting、Shuffling和Merging。计算节点之间的数据通信被统称为Edge，这些分解后的元操作可以任意灵活组合，产生新的操作，这些操作经过一些控制程序组装后，可形成一个大的DAG作业。

通过允许Apache Hive运行复杂的DAG任务，Tez可以用来处理数据，之前需要多个MR jobs，现在一个Tez任务中。

![image.png](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/1682066160590-2655c2ea-2846-45c0-b5f6-de69b7cc4add.png)



Spark计算引擎：

在Hive 1.2.0版本中，引入了Spark作为执行引擎，利用Spark的内存计算和数据并行处理能力，提高了查询速度和执行效率。

Spark是专为大规模数据处理而设计的快速、通用支持DAG（有向无环图）作业的计算引擎，类似于Hadoop MapReduce的通用并行框架，可用来构建大型的、低延迟的数据分析应用程序。

Tez和MapReduce作业的比较

Tez绕过了MapReduce很多不必要的中间的数据存储和读取的过程，直接在一个作业中表达了MapReduce需要多个作业共同协作才能完成的事情。

Tez和MapReduce一样都运行使用YARN作为资源调度和管理。但与MapReduce on YARN不同，Tez on YARN并不是将作业提交到ResourceManager，而是提交到AMPoolServer的服务上，AMPoolServer存放着若干已经预先启动ApplicationMaster的服务。

当用户提交一个作业上来后，AMPoolServer从中选择一个ApplicationMaster用于管理用户提交上来的作业，这样既可以节省ResourceManager创建ApplicationMaster的时间，而又能够重用每个ApplicationMaster的资源，节省了资源释放和创建时间。

Tez相比于MapReduce有几点重大改进：

当查询需要有多个reduce逻辑时，Hive的MapReduce引擎会将计划分解，每个Redcue提交一个MR作业。这个链中的所有MR作业都需要逐个调度，每个作业都必须从HDFS中重新读取上一个作业的输出并重新洗牌。而在Tez中，几个reduce接收器可以直接连接，数据可以流水线传输，而不需要临时HDFS文件，这种模式称为MRR（Map-reduce-reduce）。

Tez还允许一次发送整个查询计划，实现应用程序动态规划，从而使框架能够更智能地分配资源，并通过各个阶段流水线传输数据。对于更复杂的查询来说，这是一个巨大的改进，因为它消除了IO/sync障碍和各个阶段之间的调度开销。

在MapReduce计算引擎中，无论数据大小，在洗牌阶段都以相同的方式执行，将数据序列化到磁盘，再由下游的程序去拉取，并反序列化。Tez可以允许小数据集完全在内存中处理，而MapReduce中没有这样的优化。仓库查询经常需要在处理完大量的数据后对小型数据集进行排序或聚合，Tez的优化也能极大地提升效率。

2、存储引擎

Hive的文件存储格式（存储引擎）有四种：TEXTFILE 、SEQUENCEFILE、ORC、PARQUET，前面两种是行式存储，后面两种是列式存储。如果为textfile的文件格式，直接load，不需要走MapReduce；如果是其他的类型就需要走MapReduce了，因为其他的类型都涉及到了文件的压缩，这需要借助MapReduce的压缩方式来实现。

TEXTFILE：按行存储，不支持块压缩，默认格式，数据不做压缩，磁盘开销大，加载数据的速度最高 

RCFILE：

●数据按行分块，每块按列存储，结合了行存储和列存储的优点

●RCFile 保证同一行的数据位于同一节点，因此元组重构的开销很低

●RCFile 能够利用列维度的数据压缩，并且能跳过不必要的列读取 

ORCFile：

●存储方式：数据按行分块，每块按照列存储

●压缩快，快速列存取

●效率比rcfile高，是rcfile的改良版本，使用了索引

●使用ORC文件格式可以提高hive读、写和处理数据的能力 

PARQUET：按列存储，相对于ORC，Parquet压缩比较低，查询效率较低 

SequenceFile： 

●Hadoop API提供的一种二进制文件，以<key,value>的形式序列化到文件中

●存储方式：行存储 

总结

压缩比：ORC > Parquet > textFile（textFile没有进行压缩）

查询速度：三者几乎一致

## Hive map端的join和reduce端的join了解么？ 

可回答：1）Hive的join原理；2）Hive的join的几种方式；3）Hive里面的join分哪些类型呢？

问过的一些公司：小米(2021.10)(2020.09)，顺丰(2021.09)，有赞(2020.09)，美团(2020.04)，米哈游(2019.09)，网易云音乐(2017.08)

参考答案：

1、Map Join

Map Join是指在map阶段将小表全部缓存到内存中，然后将大表一条一条读取与内存中的小表进行匹配，匹配成功后输出join结果。它可以极大地减少数据的读取量，加快join的速度。Map Join的实现方式有两种，分别是Bucket Map Join和Map Join。

Bucket Map Join

Bucket Map Join又叫桶映射连接，它是Map Join的一种实现方式，要求表在join列上进行了bucket操作，并且bucket数相同，这样在map端会将两张表中的同一个bucket同时读取进内存中，进行join操作。

Bucket Map Join适用于以下情况：

●需要join的表在join列上已经进行了bucket操作；

●两个表bucket数相同；

●对于大表和小表的join操作，小表的大小必须在一定范围内。

Map Join

Map Join是将小表全部缓存到内存中，然后将大表的一条记录与小表在内存中的所有记录进行匹配，匹配成功后输出join结果。Map Join适用于小表驱动大表的情况，但是它的缺点是要求小表可以全部缓存到内存中。

2、Reduce Join

Reduce Join是指将两张表的数据都读入HDFS，然后在reduce端进行join操作。Reduce Join分为Shuffle Join和Merge Join两种实现方式。

Shuffle Join

Shuffle Join（又称普通的Reduce Join）是指先对两张表进行分区操作（Partition），分区的方式可以是默认的哈希分区，也可以是用户自定义的分区方法，然后在reduce阶段进行join操作。Shuffle Join的缺点是，因为需要将两张表的所有数据都拷贝到reduce端，所以在数据量较大的情况下，网络传输的开销很大，执行时间较长。

Merge Join

Merge Join又叫排序合并连接，它是Reduce Join的一种实现方式。它首先对需要join的表按照join列进行排序，然后再按照join列将两张表join在一起。Merge Join的优点是不需要进行shuffle操作，执行效率较高。但是它的缺点是需要进行排序，如果需要join的表比较大，排序的时间和开销也比较大。

Map Join适用于小表驱动大表的情况，Reduce Join适用于大表驱动小表的情况，不同的实现方式在不同的情况下会有不同的优劣点。

## 介绍Hive存储和计算 

问过的一些公司：美团(2020.09)

参考答案：

Hive存储的数据是在HDFS上的，它支持多种数据存储格式，包括文本、RCFile、ORC、Parquet等。其中，文本格式是最为通用的一种格式，但存储效率较低，而其他格式可以提高查询效率和压缩存储空间。

Hive支持多种数据处理方式，可以将结构化的数据文件映射为一张表，并提供类SQL的查询功能（Hive-SQL，简称HQL）。类SQL的查询可以方便地进行数据分析和处理，而MapReduce、Tez和Spark等可以做作为计算引擎用于更为复杂的计算任务。

## 统计PV的Hive语句 

问过的一些公司：招银网络(2020.09)

参考答案：

计算网站页面的PV（Page View），可以使用Hive的count函数和group by子句进行统计。

假设有一个名为 page_view_log 的Hive表，其中包含字段 page_url 和 visit_time，分别表示页面URL和访问时间。那么统计每个页面的PV的Hive SQL语句如下：

```hive
SELECT page_url, COUNT(*) AS pv
 FROM page_view_log
 GROUP BY page_url;
```



这条语句会按照 page_url 字段对记录进行分组，并对每个分组中的记录数进行计数，从而统计出每个页面的PV。

## 一个Hive表，数据量很大，分布在集群的100个节点，现在需要定期取top100，如何设计/实现？ 

问过的一些公司：阿里云社招(2020.09)

参考答案：

可以考虑使用Hive的分布式排序（Distributed Sort）或Tez的TopN算法来实现。以下是一种可能的解决方案：

1创建一个临时表，用于存储需要排序的字段。

2对需要排序的字段进行分区，使其均匀地分布在各个节点上。

3对每个节点上的分区数据进行局部排序，获取每个分区的前100条记录。

4对所有节点的前100条记录进行全局排序，获取整个表的前100条记录。

5将最终的结果写入一个新表或输出到外部存储系统。

## Hive的distributed by和group by有什么区别 

问过的一些公司：百度社招(2020.09)，头条(2019.09)

参考答案：

DISTRIBUTE BY 和 GROUP BY 是 Hive 中用于分组数据的两个关键字，它们的作用不同。

●DISTRIBUTE BY：将数据按照指定的列分发到不同的 reducer 上进行处理。DISTRIBUTE BY 控制数据分片的方法，将数据均匀地分散到不同的 reducer 上进行处理。

●GROUP BY：对数据进行分组，使用聚合函数对每个组进行计算。GROUP BY 控制分组的方式，将数据按照指定的列进行分组，对每个组进行聚合计算。

在使用 GROUP BY 时，Hive 会根据指定的分组键（GROUP BY 后面的列名）将相同键值的数据行归为一组。然后，对于每组，Hive 执行 SELECT 中指定的聚合函数，生成一个或多个结果行。而 DISTRIBUTE BY 控制数据在 reducer 上的分配，主要影响到 reducer 上数据的处理负载。如果数据在分发时不能很好地均匀分布到不同的 reducer 上，可能会导致一些 reducer 处理的数据量过大，而其他的 reducer 却处理较少的数据。

综上，DISTRIBUTE BY 和 GROUP BY 是 Hive 中用于不同目的的关键字，前者用于控制数据分片，后者用于对数据进行分组和聚合计算。

## Partition By 

可回答：1）Partition By 与 Group By 的区别

问过的一些公司：头条(2019.09)

参考答案：

在 Hive 中，Partition By 是用于分组计算的语法，它会将表中的数据按照指定的列分为若干组，然后对每一组进行计算，例如聚合操作（如 SUM、AVG、MAX 等）。

Partition By 与 Group By 类似，它们都用于分组计算，但是两者的区别在于：

●Group By 只能按照指定的列分组，而 Partition By 可以按照多个列进行分组。

●Group By 会将所有的数据集中处理，而 Partition By 会对数据进行分区，每个分区内部进行处理，可以提高计算效率。

在使用 Partition By 时，需要先对表进行分区，以便能够按照指定的列进行分组计算。可以通过在创建表时指定 partitioned by 子句来对表进行分区，也可以使用 Alter Table 语句在已有的表上添加分区。

使用 Partition By 的语法格式如下：

```hive
SELECT column1, column2, ..., function(column)
FROM table
PARTITION BY partition_column
```



其中，partition_column 表示用于分区的列，可以是一个或多个。在进行计算时，Hive 会将数据按照 partition_column 分为若干组，然后对每一组进行计算。

## Hive SQL解析中的SQL解析为抽象语法树AST具体怎么做的，源码是怎么样的？介绍一些具体过程 

问过的一些公司：滴滴(2020.09)

参考答案：

在 Hive 中，将 SQL 语句解析为抽象语法树 AST 的过程主要涉及两个阶段：语法分析和语义分析。语法分析阶段主要是对 SQL 语句的词法分析和语法分析，将 SQL 语句解析为抽象语法树；语义分析阶段主要是对抽象语法树进行语义分析，处理语义信息。

SQL 语句的解析由 HiveQL Parser 负责。HiveQL Parser 实现了从 SQL 语句到抽象语法树 AST 的转换。

具体过程如下：

1词法分析：将 SQL 语句拆分成一个个 token，同时去除空格、注释等无意义的字符。

2语法分析：根据 HiveQL 的语法规则，将 token 组成的序列转换为语法分析树。

3语义分析：对语法分析树进行语义分析，进行类型检查和语义检查等操作。在这个过程中，还会将查询语句转化为逻辑执行计划。

在 Hive 中，语法分析和语义分析是由 Antlr 工具实现的。Antlr 是一个强大的语法分析器生成器，能够生成基于语法规则的解析器和语法分析器。HiveQL 的语法规则使用 Antlr 进行描述，HiveQL Parser 将这些规则转换为 Antlr 语法规则，从而生成 HiveQL 的解析器和语法分析器。

在 Hive 的源码中，HiveQL Parser 的代码位于 ql/src/java/org/apache/hadoop/hive/ql/parse 目录下。HiveQL Parser 的实现主要依赖于 Antlr 生成的解析器和语法分析器，同时也使用了一些 Hive 自己的类来处理语义信息。整个过程中，通过词法分析、语法分析和语义分析，将 SQL 语句转换为抽象语法树 AST，并进一步生成逻辑执行计划，从而实现了 SQL 查询语句的解析。

## Hive SQL原理 

问过的一些公司：抖音(2021.03)

参考答案：

Hive SQL的处理过程可以分为编译和执行两个阶段。Hive把SQL查询转换成对Hadoop集群上MapReduce任务的调度和执行，从而实现对海量数据的高效处理。编译阶段主要负责语法分析、语义分析和优化处理；执行阶段主要负责将经过编译后的SQL转换成对Hadoop上分布式计算任务的调度和执行。

下面是具体的编译和执行过程：

编译阶段：

1词法和语法分析：Hive首先对SQL进行词法和语法分析，生成抽象语法树(AST)。

2语义分析：在分析SQL的过程中，Hive需要解析出SQL中的每个表、列的元数据信息，以及类型信息、分区信息等。

3优化：Hive会进行多种优化，如推测执行、过滤条件下推等。

执行阶段：

1生成执行计划：根据SQL语句生成MapReduce任务执行计划。

2执行计划：生成的执行计划交给Hadoop集群上的YARN进行调度和执行。在执行的过程中，Hive通过对Hadoop平台上的MapReduce任务进行监控，来实现对SQL查询的执行。

## Hive中grouping sets、with cube等这些高级的函数有没有使用过？ 

问过的一些公司：快手(2019.09)

参考答案：

GROUPING SETS 和 WITH CUBE 是 Hive 中用于多维度聚合的高级函数，其作用是可以在一个 SELECT 语句中同时聚合多个维度的数据，并且可以同时返回多个不同粒度的汇总结果。

具体来说：

●GROUPING SETS ：可以同时按照多个维度进行聚合，并返回多个不同粒度的汇总结果。它的语法是 GROUP BY GROUPING SETS ((column1, column2), (column1), (column2), ())，其中每个括号表示一个分组集合，括号中的列是用于分组的列，() 表示不进行分组。

○例如，GROUP BY GROUPING SETS ((date, country), (date), (country), ()) 表示按照 date 和 country 聚合，并返回多个不同粒度的结果。

●WITH CUBE ：同样是用于多维度聚合，但是它会返回所有可能的组合。它的语法是 GROUP BY WITH CUBE (column1, column2)，其中括号中的列是用于分组的列。

○例如，GROUP BY WITH CUBE (date, country) 会返回按照 date 和 country 聚合的结果，以及按照 date 聚合、按照 country 聚合、只聚合全局的结果，以及所有可能的组合结果。

这些高级函数可以方便地处理多维度聚合的问题，但是在处理大规模数据时需要考虑计算和存储的成本。

## select、from、where、group by、order by在一个Hive语句中，这些执行的顺序，排一下序号。 

问过的一些公司：快手(2019.09)

参考答案：

在一个Hive语句中，执行顺序为以下步骤：

1FROM：从指定的表中获取数据集。

2WHERE：从数据集中筛选出满足指定条件的行。

3GROUP BY：按照指定的列对数据集进行分组。

4SELECT：从数据集中选择指定的列，进行聚合计算等操作。

5HAVING：对分组后的数据集进行条件筛选。

6ORDER BY：按照指定的列对数据集进行排序。

7LIMIT：对数据集进行限制返回的行数。

## Hive语句的运行机制，例如包含where、having、group by、order by，整个的执行过程？ 

问过的一些公司：58(2021.09)，小米(2019.09)，有赞(2019.08)

参考答案：

1、Hive语句运行机制

1）架构图

![image.png](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/1682066160649-2736668d-7879-4e10-ae5a-91120a01f938.png)



2）运行机制图

![image.png](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/1682066160690-8721eb79-193a-467c-8e1f-7cd34786f9f3.png)



流程大致步骤为：

1）用户提交查询等任务给Driver。

2）编译器获得该用户的任务Plan。

3）编译器Compiler根据用户任务去MetaStore中获取需要的Hive的元数据信息。

4）编译器Compiler得到元数据信息，对任务进行编译，先将HiveQL转换为抽象语法树，然后将抽象语法树转换成查询块，将查询块转化为逻辑的查询计划，重写逻辑查询计划，将逻辑计划转化为物理的计划（MapReduce）, 最后选择最佳的策略。

5）将最终的计划提交给Driver。

6）Driver将计划Plan转交给ExecutionEngine去执行，获取元数据信息，提交给JobTracker或者SourceManager执行该任务，任务会直接读取HDFS中文件进行相应的操作。

7）获取执行的结果。

8）取得并返回执行结果。

创建表时：

解析用户提交的Hive语句–>对其进行解析–>分解为表、字段、分区等Hive对象。根据解析到的信息构建对应的表、字段、分区等对象，从SEQUENCE_TABLE中获取构建对象的最新的ID，与构建对象信息（名称、类型等等）一同通过DAO方法写入元数据库的表中，成功后将SEQUENCE_TABLE中对应的最新ID+5.实际上常见的RDBMS都是通过这种方法进行组织的，其系统表中和Hive元数据一样显示了这些ID信息。通过这些元数据可以很容易的读取到数据。

2、Hive语句执行顺序

1）Hive语句书写顺序

```hive
(1)select
 (2)from
 (3)join on
 (4)where
 (5)group by
 (6)having
 (7)distribute by/cluster by
 (8)sort by
 (9)order by
 (10)limit
 (11)union(去重不排序)/union all（不去重不排序）
```



2）Hive语句执行顺序

```hive
(1)from
 (2)on
 (3)join
 (4)where
 (5)group by
 (6)having
 (7)select
 (8)distinct
 (9)distribute by /cluster by
 (10)sort by
 (11)order by
 (12)limit
 (13)union /union all
```



## 两张表Join的时候会有哪些操作？需要shuffle这一步吗？ 

问过的一些公司：头条(2019.09)

参考答案：

在Hive中，两张表Join时，会执行以下步骤：

1确定Join的类型：在Hive中支持多种Join类型，包括Inner Join、Left Outer Join、Right Outer Join、Full Outer Join等。根据实际需求选择合适的Join类型。

2将参与Join的表根据Join条件进行数据切分：Hive会将参与Join的两个表根据Join条件进行数据切分，保证具有相同Join条件的数据分配到同一个节点上，便于后续Join的操作。

3执行Map端Join：如果Join的两个表中至少一个表的数据规模较小，Hive会尝试在Map端执行Join。在Map端Join时，Hive会将Join条件中的关键字段作为Key，将两个表中相同Key的记录通过Reducer合并，最终输出Join结果。

4执行Reduce端Join：如果Join的两个表的数据规模较大，Hive会采用Reduce端Join。在Reduce端Join时，Hive会对参与Join的两个表进行分区，并将分区后的数据按照Key进行排序。然后，将两个表的数据按照Key进行合并，最终输出Join结果。

5Shuffle操作：如果使用Reduce端Join，Hive会执行Shuffle操作。Shuffle的过程包括数据的排序、拷贝、聚合等操作。其中，数据排序是Shuffle的核心，Hive会按照Key对数据进行排序，以保证相同Key的数据都聚集在一起。Shuffle操作可能是整个Join操作中最耗时的步骤，因此需要尽可能地避免Shuffle数据倾斜的情况。

6输出Join结果：完成Shuffle操作之后，Hive会将Join结果输出到HDFS中，供后续的查询操作使用。

join案例可以参考上一题的。

## 描述一下在count操作的MapReduce详细过程 

问过的一些公司：头条(2019.09)

参考答案：

在 Hive 中执行 count 操作时，通常会触发 MapReduce 任务。具体的过程如下：

1Map 阶段：对于每一个输入文件（或输入文件块），Hadoop 将启动一个 Map 任务。在 Hive 中，这个 Map 任务会将输入文件中的每一行解析成若干个 key-value 对，其中 key 是 NULL，value 是这一行的内容。

2Combine 阶段：如果指定了 Combiner 函数（一种本地合并函数），那么在 Map 阶段输出的每一个 key-value 对都会被传递到 Combiner 中进行合并。在这个过程中，相同 key 的 value 会被合并为一个值，并且 Combiner 可能会将结果写入到本地磁盘上。

3Shuffle 阶段：MapReduce 框架会根据 key 对 Map 阶段的输出进行分组，将相同 key 的 value 划分到同一个 Reduce 任务中去处理。在这个过程中，Hadoop 会将 Map 阶段输出的 key-value 对写入到本地磁盘上，并对 key 进行排序和分组。

4Reduce 阶段：Reduce 任务会接收 Shuffle 阶段输出的 key-value 对，并将它们进行聚合操作，即对于相同的 key，计算对应的 value 的个数。在 Hive 中，这个过程会输出一个 key-value 对，其中 key 是 NULL，value 是计数器的值。

注意：在执行 count 操作时，Hive 中还提供了一些优化选项。比如，可以在 Map 阶段的输出中只保留需要计数的字段，避免将整个记录都写入到磁盘上，从而减少 I/O 开销。此外，还可以使用 Combiner 函数来减少 Shuffle 阶段的数据量。这些优化措施可以显著提高 count 操作的性能。

## Hive的count的用法 

问过的一些公司：小米(2019.09)

参考答案：

在 Hive 中，可以使用 count 函数统计某个表或者某个表中的某个字段的行数。count 函数有两种用法：

count(*)：统计所有行的数量（包括 NULL 值），一般用于统计表的总行数。

count(column)：统计指定列的非空行的数量，即该列不为 NULL 的行数。

注意：count(*)执行时间比count(1)和count(column)都长，count(1)和count(column)执行时间差不多。

例如，如果要统计表 my_table 的总行数，可以使用以下语句：

SELECT count(*) FROM my_table;

如果要统计表 my_table 的 col1 列的非空行数，可以使用以下语句：

SELECT count(col1) FROM my_table;

count 函数也可以与其他函数和关键字组合使用，比如可以使用 distinct 关键字统计不同值的数量：

SELECT count(DISTINCT col1) FROM my_table;

注意：count 函数在 Hive 中是一个聚合函数，只能在 SELECT 语句中使用，并且不支持在 WHERE 子句中使用。

## Hive的union和union all的区别 

问过的一些公司：小米(2019.09)

参考答案：

Union：对两个结果集进行并集操作，不包括重复行，同时进行默认规则的排序； 

Union All：对两个结果集进行并集操作，包括重复行，不进行排序。

## Hive中如何调整Mapper和Reducer的数目 

问过的一些公司：小米(2019.09)

参考答案：

调整Mapper数量

之前MapReduce部分也有提到这个类似的问题

●map数量=split数量

●split数量=文件大小/split size

●splitszie=Math.max(minSize, Math.min(maxSize, blockSize))

默认情况下，split size=blockSize，也就是128M

控制Mapper数量

```hive
set mapred.max.split.size=256000000;    -- 决定每个map处理的最大的文档大小，单位为B
 set mapred.min.split.size.per.node=1;    -- 节点中可以处理的最小的文档大小
 set mapred.min.split.size.per.rack=1;    -- 机架中可以处理的最小的文档大小
```



其设置原则就是 

```
要增加map的个数，调整maxSize<blockSize；
 要减小map的个数，调整minSize>blockSize。
```



调整Reducer数量

修改下面两个参数就行

```
方法1
 set mapred.reduce.tasks=10;  -- 设置reduce的数量
 方法2
 set hive.exec.reducers.bytes.per.reducer=1073741824 -- 每个reduce处理的数据量,默认1GB
```



## Hive的参数设置 

问过的一些公司：有赞(2019.08)，快手(2018.12)

参考答案：

Hive的参数设置是为了优化查询和调整Hive执行引擎的配置，包括内存分配、执行引擎、I/O等方面的设置。

以下是Hive中一些重要参数的介绍：

●hive.mapred.mode：MapReduce任务执行模式，可选项为 local、nonstrict 和 strict，对应本地模式、单节点模式和严格模式。

●hive.exec.mode.local.auto：当hive.mapred.mode设置为非本地模式时，该参数为自动模式，表示Hive将尝试自动确定使用本地模式或集群模式。

●hive.execution.engine：Hive执行引擎的选择，包括MapReduce、Tez、Spark等。

●hive.tez.container.size：设置每个Tez任务容器的大小。

●hive.tez.java.opts：设置在Tez任务中Java虚拟机使用的堆大小和其他JVM参数。

●hive.exec.reducers.bytes.per.reducer：每个reduce任务处理的数据大小，单位为字节。

●hive.optimize.sort.dynamic.partition：是否启用动态分区优化。

●hive.exec.parallel：启用并行查询执行。

●hive.cbo.enable：是否启用成本优化器。

●hive.auto.convert.join：自动将MapJoin和ReduceJoin转换为Join语句。

这些参数可以在Hive的配置文件中设置，例如hive-site.xml。也可以在Hive客户端使用SET命令动态设置。

## Hive里面提升并行度的参数 

问过的一些公司：字节(2022.06)

参考答案：

可以使用以下参数来提高查询的并行度：

●mapreduce.job.reduces：这个参数用于指定 Reducer 的数量。对于一些聚合操作，建议将这个值设为 1，避免产生过多的小文件。对于其他操作，可以适当增大这个值来提高并行度。

●hive.exec.reducers.bytes.per.reducer：这个参数用于指定每个 Reducer 处理的数据量，以字节为单位。通常来说，一个 Reducer 处理的数据越多，可以获得的并行度就越高，但是过多的数据也会导致单个任务处理时间过长，从而影响整体性能。这个参数的默认值是 1 GB。

●hive.exec.reducers.max：这个参数用于指定最大的 Reducer 数量。如果查询的数据量非常大，可以增大这个值以提高并行度。

●hive.exec.parallel：这个参数用于启用并行查询。将这个参数设置为 true 可以让 Hive 在处理多个查询时并行执行它们。但是需要注意的是，并行执行多个查询可能会消耗更多的系统资源。

●hive.exec.dynamic.partition.mode：这个参数用于指定是否启用动态分区。如果将这个参数设置为 nonstrict，则可以在插入数据时动态创建分区，从而提高并行度。但是需要注意的是，在创建动态分区时，需要使用动态分区模式来执行查询。

## Hive有哪些保存元数据的方式，都有什么特点？ 

问过的一些公司：乐言科技(2019.03)

参考答案：

内嵌模式：将元数据保存在本地内嵌的derby数据库中，Hive默认的启动模式，一般用于单元测试，这种存储方式有一个缺点：在同一时间只能有一个进程连接使用数据库。也就意味着它不支持多会话连接。

本地模式：将元数据保存在本地独立的数据库中（一般是mysql），这可以支持多会话连接。

远程模式：把元数据保存在远程独立的mysql数据库中，避免每个客户端都去安装mysql数据库。

三种配置方式区别

●内嵌模式使用的是内嵌的Derby数据库来存储元数据，也不需要额外起Metastore服务。这个是默认的，配置简单，但是一次只能一个客户端连接，适用于用来实验，不适用于生产环境，不常用。

●本地元存储和远程元存储都采用外部数据库来存储元数据，目前支持的数据库有：MySQL、Postgres、Oracle、MS SQL Server。MySQL较常用。

●本地元存储和远程元存储的区别是：本地元存储不需要单独起metastore服务，用的是跟hive在同一个进程里的metastore服务。远程元存储需要单独起metastore服务，然后每个客户端都在配置文件里配置连接到该metastore服务。远程元存储的metastore服务和hive运行在不同的进程。不常用。

## Hive支持事务吗 

问过的一些公司：同程艺龙(2019.03)

参考答案：

在Hive 0.13及之前的版本中，Hive不支持完整的ACID事务。不过，Hive 0.13及之后版本中引入了ACID属性支持，即支持对表进行原子性、一致性、隔离性、持久性的操作。

## left semi join是什么 

问过的一些公司：百度(2022.09)

参考答案：

在左表中查找匹配的行，只返回左表中匹配到的行，而不返回右表中匹配到的行。

例如：

```hive
SELECT ...
 FROM left_table
 LEFT SEMI JOIN right_table
 ON left_table.key = right_table.key;
```



left_table和right_table是需要进行join操作的两个表，key是左右两个表中用来匹配的列。执行过程中，先将右表的数据进行处理，并将key进行聚合，然后在左表中查找匹配的key，最后返回左表中匹配到的行。

相比于普通的left join，left semi join通常能够更快地执行，因为它只需要在左表中查找匹配的行，而不需要返回右表中的任何信息。

## lateral view、explode有什么用？ 

问过的一些公司：百度(2022.09)，唯品会(2021.09)

参考答案：

LATERAL VIEW和explode的作用都是将一个复杂类型的数据展开为多行数据，以便进行后续的聚合操作或连接操作。

LATERAL VIEW用于将一个表的每一行拆分成多行，每个拆分后的行与另一个表的一行进行连接。可以使用LATERAL VIEW来处理map类型的列，例如将map类型的列展开为多行数据，以便进行聚合操作。

LATERAL VIEW使用的语法如下：

这里map_key_type和map_value_type表示map类型的键和值的数据类型，key1、value1等表示map类型的键和值。inline用于将map类型的列展开为多行，每一行都包含一个键值对。

explode用于将一个复杂类型的列拆分成多行，每行包含列中的一个元素。例如，如果一个列是一个包含多个值的数组，explode可以将这个数组拆分成多行，每行包含一个数组元素。

explode函数使用的语法如下：

```hive
SELECT ...
 FROM ...
 LATERAL VIEW explode(col) table_alias AS alias_name
 WHERE ...
```



## Hive修改列名会发生什么影响 

问过的一些公司：小米(2022.09)

参考答案：

在Hive中修改列名会修改元数据中的列名，但是不会修改数据本身。

具体来说，如果在Hive中修改列名，则会对元数据进行更新，以便查询和描述表时使用正确的列名。如果使用旧列名执行查询，将会得到错误的结果。

如果表中存在分区，则还需要更新分区元数据中的列名。因此，在修改列名之后，需要确保元数据和数据源中的列名都是正确的。

## HDFS上分区的文件，在Hive不创建分区表的情况下如何导入？ 

问过的一些公司：小米(2022.09)

参考答案：

在Hive不创建分区表的情况下，可以使用Hive的load data命令将分区文件导入到Hive表中。

具体步骤如下：

1创建一个非分区表，用于存储分区数据。

2在Hive中使用load data命令将HDFS上分区文件导入到非分区表中。

首先，创建一个非分区表：

```hive
CREATE TABLE my_table (
   col1 string,
   col2 int,
   col3 double
 ) ROW FORMAT DELIMITED FIELDS TERMINATED BY ',' STORED AS TEXTFILE;
```



然后，使用load data命令将分区文件导入到该表中：

 LOAD DATA INPATH 'hdfs://path/to/partition/' INTO TABLE my_table;

path/to/partition是指存储分区文件的HDFS路径。

这样，分区数据就会被加载到非分区表中，可以像普通表一样查询它们。但是，由于数据没有被正确分区，查询效率可能会降低。

因此，为了最大化Hive的查询性能，建议在Hive中创建一个分区表，并将数据分区存储。

## 场景题目：Hive中有很多重复的数据，你如何去重？ 

问过的一些公司：顺丰(2022.09)

参考答案：

1、使用 DISTINCT

DISTINCT 关键字可以在 SELECT 语句中选择不同的值，以去除重复数据。

例如：

 SELECT DISTINCT column_name FROM table_name;

2、使用 GROUP BY

可以使用 GROUP BY 子句和聚合函数去掉重复数据。

例如：

 SELECT column_name, COUNT(*) FROM table_name GROUP BY column_name;

3、使用窗口函数

可以使用窗口函数来进行去重。

例如：

```hive
SELECT column_name FROM (
   SELECT column_name, ROW_NUMBER() OVER (PARTITION BY column_name ORDER BY column_name) rn
   FROM table_name
 ) t
 WHERE rn = 1;
```



这里使用了 ROW_NUMBER 窗口函数来为每个相同值的 column_name 进行编号，然后在外层查询中选择编号为 1 的数据。

需要注意的是，这种方法可能会影响性能，因为需要进行排序和分组操作，尤其是在处理大数据集时，可能会非常耗时。

总的来说，对于数据去重，推荐使用 GROUP BY 的方式，执行效率较高。在需要处理复杂的去重逻辑时，可以考虑使用窗口函数，但需要注意性能问题。

## Hive translate 和replace区别 

问过的一些公司：携程(2022.09)

参考答案：

TRANSLATE函数和REPLACE函数都可以用于替换字符串中的某些字符。

主要区别在于：

REPLACE函数用于替换一个字符串中的所有匹配项。

语法：

 REPLACE(string, target, replacement)

string：要替换的字符串

target：要被替换的子字符串

replacement：用于替换的字符串。

TRANSLATE函数则用于一次替换字符串中多个字符。它需要提供一个要被替换的字符列表和一个用于替换的字符列表。

语法：

 TRANSLATE(string, from_string, to_string)

string：要进行替换的字符串

from_string：要被替换的字符列表

to_string：用于替换的字符列表。

REPLACE函数用于简单的字符串替换，而TRANSLATE函数则用于一次性替换多个字符，适合替换字符串中的某些特定字符。

## Hive里的非textfile文件是无法直接同步到mysql的，你们的同步是怎么做的？ 

问过的一些公司：快手(2021.09)

参考答案：

Hive中存储的非textfile文件，比如ORC、Parquet等，可以使用Hive提供的SerDe（序列化和反序列化）机制将文件转换为文本格式进行同步。它将Hive表的数据序列化为文本或二进制格式进行存储，或将文本或二进制格式的数据反序列化为Hive表中的数据。

在数据同步过程中，我们可以使用SerDe将非textfile文件反序列化为Hive表中的数据，然后再将数据同步到MySQL等其他数据库中。反过来，当从MySQL等其他数据库中同步数据到Hive时，我们可以使用SerDe将文本格式的数据序列化为非textfile文件格式，以便在Hive中高效地进行查询和分析。

## Hive里面元数据里的表哪个可以直接看到表的数据量大小？ 

问过的一些公司：中信信用卡中心(2021.11)

参考答案：

在Hive元数据中，可以通过以下两个表来查看表的数据量大小：

●TBLS 表：包含有关 Hive 中所有表的信息，包括表的名称、表的拥有者、表的创建时间、表的类型等。此表还包括 TBL_ID 字段，它可以用于与下面的 PARTITIONS 表联接。

●PARTITIONS 表：包含有关表中每个分区的信息，包括分区的名称、创建时间、位置、键值等。此表还包括 SD_ID 字段，可以用于与下面的 SDS 表联接。

通过连接这些表，可以获取到表的数据量大小。在 SDS 表中，有一个 TOTAL_SIZE 字段，可以表示表或分区的总大小（字节）。

## Hive去重可以用什么方式来做？ 

问过的一些公司：中信信用卡中心(2021.11)，58(2021.09)

参考答案：

DISTINCT：使用SELECT DISTINCT语句，会返回去重后的结果。

GROUP BY：使用GROUP BY语句，根据指定的字段进行分组，并计算每组的数量，以去重。

窗口函数：使用窗口函数中的OVER()函数，根据指定的字段进行去重操作。

HAVING子句：使用GROUP BY语句中的HAVING子句，对分组后的数据进行过滤，去掉重复数据。

## 两个Hive表，a表跟b表，要求出a中存在b中不存在的怎么求？ 

问过的一些公司：58(2021.09)

参考答案：

可以使用 Hive 中的 LEFT ANTI JOIN（左反连接）实现该功能。LEFT ANTI JOIN 又叫 LEFT ANTI SEMI JOIN，表示左外连接，筛选出左表中未能匹配上右表中的记录。

具体来说，可以使用以下 SQL 语句：

```hive
SELECT a.*
 FROM a LEFT ANTI JOIN b ON a.id = b.id
 WHERE b.id IS NULL;
```



a 表是左表，b 表是右表，id 是比较的字段。上述 SQL 语句将筛选出 a 表中存在而 b 表中不存在的记录。

另外，可以使用其他 JOIN 类型（如 LEFT JOIN 或 OUTER JOIN）结合 WHERE 子句和 IS NULL 来实现类似的功能。

## Hive核心的元数据的表有哪些？ 

问过的一些公司：欢聚(2021.09)

参考答案：

DBS（Databases）：存储所有数据库的信息，如数据库名称、创建时间、所有者等。

TBLS（Tables）：存储所有表的信息，如表名、创建时间、所有者、表的类型等。

COLUMNS_V2（Columns）：存储所有表的列信息，如列名、数据类型、注释等。

PARTITIONS（Partitions）：存储分区表的所有分区信息，包括分区列的名称和值等。

PARTITION_KEYS（Partition Keys）：存储分区表的分区列信息，如列名、数据类型等。

SERDES（Serialization/Deserialization Libraries）：存储所有序列化/反序列化库的信息，如库名、类名、序列化方式等。

## 一个Hive表是怎么映射到元数据里面 

问过的一些公司：欢聚(2021.09)

参考答案：

当创建一个Hive表时，表的元数据信息会被存储在这些元数据表中。

具体来说，当创建一个表时，Hive会将表的元数据信息插入到DBS和TBLS表中，同时将表的列信息插入到COLUMNS_V2表中。如果创建的是分区表，则还会将分区信息插入到PARTITIONS表中。

在查询表时，Hive会使用这些元数据表中的信息来获取表的结构和数据位置等信息，以便进行查询和处理。

## Hive表的定义信息存在哪的 

问过的一些公司：网易杭研院(2021.09)

参考答案：

在Hive中，表的定义信息存储在元数据中，而元数据可以存储在多个位置，例如本地磁盘、MySQL等。

在Hive中，默认情况下，元数据存储在Derby数据库中，该数据库是一个基于Java的轻量级关系型数据库，通常用于开发和测试。但在生产环境中，由于Derby的性能较低，通常会将元数据存储在MySQL等其他数据库中。可以通过修改Hive配置文件中的hive-site.xml来更改元数据存储位置。

## 了解HiveSQL吗？讲讲分析函数？ 

问过的一些公司：虎牙(2021.08)

参考答案：

HiveSQL是Hive提供的一种类SQL查询语言，它可以让用户通过SQL语句对Hadoop中存储的数据进行查询、分析和处理，无需编写MapReduce程序，能够轻松地进行数据分析和处理。

HiveSQL支持很多种分析函数，包括以下几种：

●聚合函数：用于在行组之间进行聚合，如SUM、AVG、MIN、MAX、COUNT等。

●窗口函数：用于在一组数据上执行计算，并返回一个结果集，如ROW_NUMBER、RANK、DENSE_RANK、LEAD、LAG等。

●排名函数：用于返回结果集中某个值在结果集中的排名，如RANK、DENSE_RANK等。

●比较函数：用于比较两个或多个值，并返回比较结果，如GREATEST、LEAST等。

●分布函数：用于计算某个值在结果集中的分布情况，如PERCENT_RANK、CUME_DIST等。

分析函数通常需要和窗口函数一起使用，以便对窗口中的数据进行排序、分组和过滤操作。HiveSQL中的分析函数通过OVER子句来指定作用范围，OVER子句包含三个部分：PARTITION BY子句、ORDER BY子句和ROWS/RANGE子句。PARTITION BY子句用于指定分组的列，ORDER BY子句用于指定排序的列，ROWS/RANGE子句用于指定窗口的大小和位置。

分析函数的执行顺序是：FROM子句 -> WHERE子句 -> GROUP BY子句 -> HAVING子句 -> SELECT子句 -> WINDOW子句。

## 你觉得分析函数中加Order by和不加Order by的区别？ 

问过的一些公司：虎牙(2021.08)

参考答案：

在HiveSQL中，分析函数用于在查询结果中进行计算，如计算移动平均、累计和等。

当分析函数包含 ORDER BY 子句时，其计算结果是基于排序后的行，而不是查询的原始顺序。因此，使用 ORDER BY 子句可以控制分析函数的计算顺序，从而获得更准确的计算结果。

如果不使用 ORDER BY 子句，分析函数将按照查询结果的原始顺序进行计算。这在某些情况下可能是所需的，例如在查询结果不需要排序的情况下。

使用 ORDER BY 子句的分析函数提供了更精确和可控的计算方式，而不使用 ORDER BY 则可以提高查询的性能。

## count(distinct)会出现什么问题？ 

问过的一些公司：58(2021.09)

参考答案：

做去重统计时，HQL一般都这么写：

```hive
select
   count(distinct (...)) as VU
 from
   table
 where
   ...
```



一看，这没啥毛病，但我们需要注意的是，我们写的是HQL，而它的底层引擎是MapReduce，是分布式计算的，所以自然会出现数据倾斜这种分布式计算的典型问题，就会导致运行时间过长。

这里其实熟悉MapReduce原理的已经明白了这条sql跑的慢的原因，因为出现了很严重的数据倾斜，很多个mapper，却只有1个reducer，所有的数据在mapper处理过后全部只流向了一个reducer，逻辑计划大概如下：

![image.png](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/1682066160819-b2cb67f4-885d-416b-9b76-45a96adc4955.png)



为什么只有一个reducer呢？因为使用了distinct和count(full aggreates)，这两个函数产生的MapReduce作业只会产生一个reducer，而且哪怕显式指定set mapred.reduce.tasks=100000也是没用的。

所以对于这种去重统计，如果在数据量够大，一般是一亿记录数以上（根据实际情况考虑），建议选择使用count加group by去进行统计，执行速度就会快很多。

总结：在数据量很大的情况下，使用count+group by替换count(distinct)能使作业执行效率和速度得到很大的提升，一般来说数据量越大提升效果越明显。

## Hive解决嵌套JSON处理的方法 

问过的一些公司：腾讯(2020.08)

参考答案：

使用函数：get_json_object、json_tuple

使用自定义的UDF（一进一出），自定义UDTF（一进多出）

使用第三方的SerDe -> JSONSerder处理

---

 ## V3.0  

因为牛客上有的面经被发布者删除了，所有这部分内容是原来V3.0版本中有，但是现在4.0没有的

## 为什么内部表的删除，就会将数据全部删除，而外部表只删除表结构? 为什么用外部表更好？ 

问过的一些公司：大华

参考答案：

外部表和内部表创建表以及删除时的区别

● 创建表时：创建内部表时，会将数据移动到数据仓库指向的路径；若创建外部表，仅记录数据所在的路径，不对数据的位置做任何改变。 

● 删除表时：在删除表的时候，内部表的元数据和数据会被一起删除， 而外部表只删除元数据，不删除数据。这样外部表相对来说更加安全些，数据组织也更加灵活，方便共享源数据。 

外部表的优点

1）外部表不会加载数据到Hive的默认仓库（挂载数据），减少了数据的传输，同时还能和其他外部表共享数据。

2）使用外部表，Hive不会修改源数据，不用担心数据损坏或丢失。

3）Hive在删除外部表时，删除的只是表结构，而不会删除数据。

## Hive删除语句外部表删除的是什么？ 

问过的一些公司：作业帮

参考答案：

外部表只删除元数据，不删除数据

## Hive如果不用参数调优，在map和reduce端应该做什么 

问过的一些公司：阿里

参考答案：

1、map阶段优化

```hive
num_reduce_tasks = min[${hive.exec.reducers.max},(${input.size}/${hive.exec.reducers.bytes.per.reducer})]
```



Map阶段的优化，主要是确定合适的map数。那么首先要了解map数的计算公式

● mapred.min.split.size: 指的是数据的最小分割单元大小；min的默认值是1B 

● mapred.max.split.size: 指的是数据的最大分割单元大小；max的默认值是256MB 

● dfs.block.size: 指的是HDFS设置的数据块大小。个已经指定好的值，而且这个参数默认情况下hive是识别不到的。 

通过调整max可以起到调整map数的作用，减小max可以增加map数，增大max可以减少map数。需要提醒的是，直接调整mapred.map.tasks这个参数是没有效果的。

2、reduce阶段优化

```
num_reduce_tasks = min[${hive.exec.reducers.max},(${input.size}/${hive.exec.reducers.bytes.per.reducer})]
```



这里说的reduce阶段，是指前面流程图中的reduce phase（实际的reduce计算）而非图中整个reduce task。Reduce阶段优化的主要工作也是选择合适的reduce task数量, 与map优化不同的是，reduce优化时，可以直接设置mapred.reduce.tasks参数从而直接指定reduce的个数。

hive.exec.reducers.max：此参数从Hive 0.2.0开始引入。在Hive 0.14.0版本之前默认值是999；而从Hive 0.14.0开始，默认值变成了1009，这个参数的含义是最多启动的Reduce个数

hive.exec.reducers.bytes.per.reducer：此参数从Hive 0.2.0开始引入。在Hive 0.14.0版本之前默认值是1G(1,000,000,000)；而从Hive 0.14.0开始，默认值变成了256M(256,000,000)，可以参见HIVE-7158和HIVE-7917。这个参数的含义是每个Reduce处理的字节数。比如输入文件的大小是1GB，那么会启动4个Reduce来处理数据。

也就是说，根据输入的数据量大小来决定Reduce的个数，默认Hive.exec.Reducers.bytes.per.Reducer为1G，而且Reduce个数不能超过一个上限参数值，这个参数的默认取值为999。所以我们可以调整Hive.exec.Reducers.bytes.per.Reducer来设置Reduce个数。

注意：

● Reduce的个数对整个作业的运行性能有很大影响。如果Reduce设置的过大，那么将会产生很多小文件，对NameNode会产生一定的影响，而且整个作业的运行时间未必会减少；如果Reduce设置的过小，那么单个Reduce处理的数据将会加大，很可能会引起OOM异常。 

● 如果设置了mapred.reduce.tasks/mapreduce.job.reduces参数，那么Hive会直接使用它的值作为Reduce的个数； 

● 如果mapred.reduce.tasks/mapreduce.job.reduces的值没有设置（也就是-1），那么Hive会根据输入文件的大小估算出Reduce的个数。根据输入文件估算Reduce的个数可能未必很准确，因为Reduce的输入是Map的输出，而Map的输出可能会比输入要小，所以最准确的数根据Map的输出估算Reduce的个数。 

## Hive的join操作原理，left join、right join、inner join、outer join的异同？ 

可回答：Hive的join的几种操作

问过的一些公司：小米，腾讯，大华，米哈游，有赞

参考答案：

hive执行引擎会将HQL“翻译”成为map-reduce任务，如果多张表使用同一列做join则将被翻译成一个reduce，否则将被翻译成多个map-reduce任务。

```hive
SELECT a.val, b.val, c.val FROM a JOIN b ON (a.key = b.key1) JOIN c ON (c.key = b.key1)
-- 将被翻译成1个map-reduce任务
```

```hive
SELECT a.val, b.val, c.val FROM a JOIN b ON (a.key = b.key1) JOIN c ON (c.key = b.key2)
-- 将被翻译成2个map-reduce任务
```



比如，hive执行引擎会将HQL“翻译”成为map-reduce任务，如果多张表使用同一列做join则将被翻译成一个reduce，否则将被翻译成多个map-reduce任务。

这个很好理解，一般来说（map side join除外），map过程负责分发数据，具体的join操作在reduce完成，因此，如果多表基于不同的列做join，则无法在一轮map-reduce任务中将所有相关数据shuffle到统一个reducer，对于多表join，hive会将前面的表缓存在reducer的内存中，然后后面的表会流式的进入reducer和reducer内存中其它的表做join。

为了防止数据量过大导致oom，将数据量最大的表放到最后，或者通过“STREAMTABLE”显示指定reducer流式读入的表。

1、Join的操作原理

```hive
select u.name, o.orderid from order o join user u on o.uid = u.uid;
```



Hive中的Join可分为Map Join（Map阶段完成join）和Common Join（Reduce阶段完成join）。

Common Join

Map阶段

读取源表的数据，Map输出时候以Join on条件中的列为key，如果Join有多个关联键，则以这些关联键的组合作为key;

Map输出的value为join之后所关心的(select或者where中需要用到的)列；同时在value中还会包含表的Tag信息，用于标明此value对应哪个表；

按照key进行排序。

Shuffle阶段

根据key的值进行hash,并将key/value按照hash值推送至不同的reduce中，这样确保两个表中相同的key位于同一个reduce中

Reduce阶段

根据key的值完成join操作，期间通过Tag来识别不同表中的数据。

![Hive-Hive的join操作原理01.png](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/1662703156851-a2c21572-589c-4521-92c1-faedae427337.png)



Map Join

Map Join通常用于一个很小的表和一个大表进行join的场景，具体小表有多小，由参数hive.mapjoin.smalltable.filesize来决定，该参数表示小表的总大小，默认值为25000000字节，即25M。

Hive0.7之前，需要使用hint提示 /+ mapjoin(table) /才会执行MapJoin,否则执行Common Join，但在0.7版本之后，默认自动会转换Map Join，由参数hive.auto.convert.join来控制，默认为true。

假设a表为一张大表，b为小表，并且hive.auto.convert.join=true,那么Hive在执行时候会自动转化为MapJoin。

![image.png](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/1683011654624-231432bb-b67e-4de6-a21d-428a055b3a98.png)



如图中的流程，首先是Task A，它是一个Local Task（在客户端本地执行的Task），负责扫描小表b的数据，将其转换成一个HashTable的数据结构，并写入本地的文件中，之后将该文件加载到DistributeCache中，该HashTable的数据结构可以抽象为：

| key  | Value |
| ---- | ----- |
| 1    | 26    |
| 2    | 34    |

![Hive-Hive的join操作原理03.png](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/1662703270846-a6014c1c-aaed-4f56-9458-3650968a8088.jpeg)



图中红框圈出了执行Local Task的信息。

接下来是Task B，该任务是一个没有Reduce的MR，启动MapTasks扫描大表a,在Map阶段，根据a的每一条记录去和DistributeCache中b表对应的HashTable关联，并直接输出结果。

由于MapJoin没有Reduce，所以由Map直接输出结果文件，有多少个Map Task，就有多少个结果文件。

总的来说，因为小表的存在，可以在Map阶段直接完成Join的操作，为了优化小表的查找速度，将其转化为HashTable的结构，并加载进分布式缓存中。

2、inner join、left join、right join、outer join

inner join

等值连接，只返回两个表中联结字段相等的行

left join

左联接，返回包括左表中的所有记录和右表中联结字段相等的记录

right join

右联接，返回包括右表中的所有记录和左表中联结字段相等的记录

inner join等价于join，可以理解为join是inner join的缩写；

left join等价于left outer join；right join等价于right outer join。

## Hive的map join 

问过的一些公司：58，米哈游

参考答案：

1、什么是MapJoin?

MapJoin顾名思义，就是在Map阶段进行表之间的连接。而不需要进入到Reduce阶段才进行连接。这样就节省了在Shuffle阶段时要进行的大量数据传输。从而起到了优化作业的作用。

2、MapJoin的原理

通常情况下，要连接的各个表里面的数据会分布在不同的Map中进行处理。即同一个Key对应的Value可能存在不同的Map中。这样就必须等到Reduce中去连接。

要使MapJoin能够顺利进行，那就必须满足这样的条件：除了一份表的数据分布在不同的Map中外，其他连接的表的数据必须在每个Map中有完整的拷贝。

3、MapJoin适用的场景

通过上面分析可以有发现，并不是所有的场景都适合用MapJoin。它通常会用在如下的一些情景：在二个要连接的表中，有一个很大，有一个很小，这个小表可以存放在内存中而不影响性能。

这样我们就把小表文件复制到每一个Map任务的本地，再让Map把文件读到内存中待用。

4、MapJoin的实现方法：

在Map-Reduce的驱动程序中使用静态方法DistributedCache.addCacheFile()增加要拷贝的小表文件。JobTracker在作业启动之前会获取这个URI列表，并将相应的文件拷贝到各个TaskTracker的本地磁盘上。

在Map类的setup方法中使用DistributedCache.getLocalCacheFiles()方法获取文件目录，并使用标准的文件读写API读取相应的文件。

5、Hive内置提供的优化机制之一就包括MapJoin

在Hive v0.7之前，需要使用hint提示 /+ mapjoin(table) /才会执行MapJoin。Hive v0.7之后的版本已经不需要给出MapJoin的指示就进行优化。它是通过如下配置参数来控制的：

```
hive> set hive.auto.convert.join=true;
```



Hive还提供另外一个参数--表文件的大小作为开启和关闭MapJoin的阈值。

```
hive.mapjoin.smalltable.filesize=25000000   -- 即25M
```



## Hive Shuffle的具体过程 

问过的一些公司：竞技世界

参考答案：

Shuffle其实就是“洗牌”，整个过程也就是清洗重发的过程，map方法后，reduce方法之前。

首先是inputsplit，每个切片对应一个map（可以通过yarn去观察），map端首先对读入数据做按不同数据类型做分区，之后根据不同分区做排序（这里采用的快速排序），map过程中会有内存缓冲区（环形缓冲区），它的作用是在数据写入过程中，将数据存入内存从而达到减少IO开启的资源消耗，提高分区，排序的资源量（hive优化中提到map join小表在前存入内存也源于此处），当缓冲区的写入达到默认的0.8（80mb,可更改设置），将开启溢写将内容写入临时文件同时剩下的写入会继续写入到剩余0.2。

这整个过程中会产生大量临时文件，通过merge最后合并成一个文件，分区且有序（归并排序）， 到这map端基本结束。（写入内存前可以通过开启 combine ，一般公司都会在map开启来达到减小数据量提高效率，实现的效果 : map的输出是 （key,value )，combine 后输出自然减少了）。

reduce端是通过http协议抓取数据（fetch)，map跑完reduce开始抓数，这里涉及到数据倾斜的问题（需要注意)，reduce对数据同样通过partition，sort (归并排序），整理好的数据最后进入reduce操作。

## Hive count(distinct)有几个reduce，海量数据会有什么问题 

问过的一些公司：字节(2021.07)

参考答案：

count(distinct)只有1个reduce。

为什么只有一个reducer呢，因为使用了distinct和count(full aggreates)，这两个函数产生的mr作业只会产生一个reducer，而且哪怕显式指定set mapred.reduce.tasks=100000也是没用的。

当使用count(distinct)处理海量数据（比如达到一亿以上）时，会使得运行速度变得很慢，熟悉mr原理的就明白这时sql跑的慢的原因，因为出现了很严重的数据倾斜。

案例分析：

```hive
select
  count(distinct (bill_no)) as visit_users
from
  i_usoc_user_info_d
where
  p_day = '20210508'
  and bill_no is not null
  and bill_no != ''
```



做去重统计时，一般都这么写：

其实看起来，这没有任务毛病，但我们需要注意的是，此时写的是hql，它的底层引擎是MapReduce，是分布式计算的，所以就会出现数据倾斜这种分布式计算的典型问题，比如上面的使用数仓中一张沉淀了所有用户信息的融合模型来统计所有的手机号码的个数，这种写法肯定是能跑出结果的，但运行时长可能就会有点长。

我们去查下，就会发现记录数至少上亿，去hdfs中查看文件会发现这个分区很大，并且此时，我们通过查看执行计划和日志可以发现只有一个stage。也就是说最后只有一个reduce。

熟悉mr原理的已经明白了这条sql跑的慢的原因，因为出现了很严重的数据倾斜，几百个mapper，1个reducer，所有的数据在mapper处理过后全部只流向了一个reducer，逻辑计划大概如下：

![image-20230613154001919](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230613154001919.png)



为什么只有一个reducer呢，因为使用了distinct和count(full aggreates)，这两个函数产生的mr作业只会产生一个reducer，而且哪怕显式指定set mapred.reduce.tasks=100000也是没用的。

所以对于这种去重统计，如果在数据量够大，一般是一亿记录数以上(视公司的集群规模，计算能力而定)，建议选择使用count加group by去进行统计：

```hive
select
  count(a.bill_no)
from
  (
    select
      bill_no
    from
      dwfu_hive_db.i_usoc_user_info_d
    where
      p_day = '20200408'
      and bill_no is not null
      and bill_no != ''
    group by
      bill_no
  ) a
```



这时候再测试，会发现速度会快很多，查看执行计划和日志，会发现启动了多个stage，也就是多个mr作业，这是因为引入了group by将数据分组到了多个reducer上进行处理。逻辑执行图大致如下：

![image.png](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/1663821451917-3b27482d-c512-423b-a34a-f4606321a75f.png)



总结：在数据量很大的情况下，使用count+group by替换count(distinct)能使作业执行效率和速度得到很大的提升，一般来说数据量越大提升效果越明显。

注意：开发前最好核查数据量，别什么几万条几十万条几十M数据去重统计就count加groupby就咔咔往上写，最后发现速度根本没有直接count(distinct)快，作业还没起起来人家count(distinct)就完事结果出来了，所以优化还得建立在一个数据量的问题上，这也是跟其他sql的区别。

## parquet文件优势 

问过的一些公司：

参考答案：

1、更高的压缩比

列存使得更容易对每个列使用高效的压缩和编码，降低磁盘空间。（网上的case是不压缩、gzip、snappy分别能达到11/27/19的压缩比）

2、更小的IO操作

使用映射下推和谓词下推，只读取需要的列，跳过不满足条件的列，能够减少不必要的数据扫描，带来性能的提升并在表字段比较多的时候更加明显。
