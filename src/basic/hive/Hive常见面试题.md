---
title: Hive常见面试题
icon: page
order: 30
author: 余生
# date: 2020-01-01
category:
  - 面试指南
tag:
  - hive
sticky: false
star: true
footer: 这是测试显示的页脚
copyright: 无版权
---

Hive常见面试题

<!-- more -->

## Hive内部表和外部表的区别

使用上：

- 未被external修饰的是内部表
- 被external修饰的为外部表

具体区别：

1. 内部表由Hive自身管理，外部表数据由HDFS管理
2. 内部表的存储位置是`hive.metastore.warehouse.dir`（默认/user/hive/warehouse)，外部表数据的存储位置由自己指定
3. 删除内部表会直接删除元数据及存储数据；删除外部表仅会删除元数据，HDFS上的文件并不会被删除



## Hive有索引吗

Hive支持索引 3.0版本之前

Hive不支持主键或者外键，提供的功能有限，效率不高

- 适用的场景：

适用于不更新的静态字段，以免重建索引数据，每次建立、更新数据后，都要重建索引以构建索引表

- Hive索引的机制

在指定列上建立索引，会产生一张索引表，包括：索引列的值、该值对应的HDFS文件路径、该值在文件中的偏移量



在新版本中的Hive中已经被废弃



自动重写的物化视图替代了索引的功能



## 运维如何对hive进行调度

1. 将hive的sql定义在脚本中
2. 使用azkaban或者oozie进行任务的调度
3. 监控任务调度页面



## ORC、Parquet等列式存储的优点





##  数据建模用的哪些模型

1. 星型模型

![星型模型](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230612164858331.png)

以事实表为中心，所有的维度表直接连接在事实表上

- 维表只和事实表关联，维表之间没有关联
- 每个维表主键为单列，且该主键放置在事实表中，作为两边连接的外键
- 以事实表为核心，维表围绕核心呈星形分布

2. 雪花模型

![image-20230612165119630](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230612165119630.png)

雪花模型是对星型模型的扩展，雪花模型的维度表是可以拥有其他维度表的。这种模型比星型更规范一些，但是不容易理解和维度，性能方面也更低

3. 星座模型

![image-20230612165246096](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230612165246096.png)



星座模型也是星型模型的延伸，星座模型基于多张事实表，而且共享维度信息。

在业务后期中，绝大部分维度建模都采用的是星座模型。





## 为什么要读数据仓库分层

1. 用时间换空间，通过大量的预处理来提升应用系统的用户体验，会存在大量的冗余数据
2. 如果不分层的话，如果源业务系统的业务规则发生变化会影响整个数据清洗过程，工作量巨大。
3. 通过数据分层管理可以简化数据清洗的过程。 比较容易确保每一个步骤的正确性



## 使用hive解析json字符串

1. 将json以字符串的形式整个入hive表，然后通过使用udf函数解析已经导入到hive中的数据，比如使用`lateral view json_tuple`的方法，或许所需要的列明
2. 在导入之前将json拆成各个字段，导入hive的表数据是解析过得，使用第三方的**SerDe**



## sort by和order by的区别

order by 对输入进行全局排序，因此只有一个reducer

sort by不是全局排序，sort by 只能保证每个reducer的输出有序



## 数据倾斜怎么解决

原因

- 空值引发的数据倾斜
- 不同数据类型引发的数据倾斜
- 不可拆分大文件引发的数据倾斜
- 数据膨胀引发的数据倾斜
- 表连接时引发的数据倾斜
- 确实无法减少数据量引发的数据倾斜

left join和right join 不会对关联的字段自动去除null值

对于inner join，会自动去除null值



## Hive小文件过多怎么处理

1. **使用hive自带的concatenate命令，自动合并小文件**

- 对于非分区表

`alter table A concatenate`

- 对于分区表

`alter table B partition(day=20200211) concatenate`



注意：

1. Concatenate 只支持RCFILE和ORC文件类型
2. 不能指定合并后的数量，但可以多次执行
3. 多次使用后不再变化，和参数`mapreduce.input.fileinputformat.split.minsize=256mb`设置有关，可以设置文件最小的size

2. **调整参数减少map数量**

执行map前进行小文件合并

在mapper中将多个小文件合成一个split作为输入

`set hive.input.format = org.apache.hadoop.hive.ql.io.CombineHiveInputFormat;`

3. **减少Reduce的数量**

reduce决定了输出文件的个数，调整reduce可以控制hive表的文件数量

- 直接设置Reduce个数

`set mapreduce.job.reduces=10`

- 设置每个reduce的大小，hive会根据数据总大小确定一个reduce个数

`set hive.exec.reducers.bytes.per.reducer=5120000000`

通过分区函数，让数据更加均衡的进入每个reduce

```hive
insert overwrite table A partition(dt)
select * from B distribute by rand()
```

4. **使用hadoop的archive将小文件归档**

```hive
ALTER TABLE A ARCHIVE PARTITION(dt='2022-12-24',hr='12')
ALTER TABLE A UNARCHIVE PARTITION(dt='2022-12-24',hr='12')
```



## Hive优化

1. **数据存储及压缩**

存储格式：orc、parquet

压缩：snappy



与textfile相比，orc占有更少的存储

降低IO读写，降低网络传输量，节省内存

2. **通过调参优化**

并行执行，调节parallel参数

调节JVM参数

设置map、reduce的参数，开启strict mode模式

关闭推测执行设置

3. **有效地减少数据集，将大表拆分成子表；结合使用外部表和分区表**



4. **SQL优化**
   1. 大表对大表：尽量减少数据集，可以通过分区表，避免全表扫描或者全字段
   2. 大表对小表：设置自动识别小表，将小表放到内存中执行







