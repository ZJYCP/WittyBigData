const e=JSON.parse('{"key":"v-27924fe9","path":"/basic/hadoop/%E9%9D%A2%E8%AF%95QA.html","title":"Hadoop面试常见问题","lang":"zh-CN","frontmatter":{"title":"Hadoop面试常见问题","icon":"page","order":40,"author":"余生","category":["大数据组件"],"tag":["大数据组件","使用指南"],"sticky":false,"star":true,"footer":"这是测试显示的页脚","copyright":"无版权","description":"hadoop 中常问的就三块，第一:分布式存储(HDFS);第二:分布式计算框架 (MapReduce);第三:资源调度框架(YARN) 请说下HDFS的读写流程 HDFS在读文件时，其中一个块损坏怎么办 HDFS在上传文件时，其中一个DN挂掉怎么办 NameNode在启动时会做哪些操作 Secondary NameNode的工作机制 Secondar...","head":[["meta",{"property":"og:url","content":"http://wbd.emx6.com/basic/hadoop/%E9%9D%A2%E8%AF%95QA.html"}],["meta",{"property":"og:site_name","content":"Witty Big Data"}],["meta",{"property":"og:title","content":"Hadoop面试常见问题"}],["meta",{"property":"og:description","content":"hadoop 中常问的就三块，第一:分布式存储(HDFS);第二:分布式计算框架 (MapReduce);第三:资源调度框架(YARN) 请说下HDFS的读写流程 HDFS在读文件时，其中一个块损坏怎么办 HDFS在上传文件时，其中一个DN挂掉怎么办 NameNode在启动时会做哪些操作 Secondary NameNode的工作机制 Secondar..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-03-08T16:50:51.000Z"}],["meta",{"property":"article:author","content":"余生"}],["meta",{"property":"article:tag","content":"大数据组件"}],["meta",{"property":"article:tag","content":"使用指南"}],["meta",{"property":"article:modified_time","content":"2023-03-08T16:50:51.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Hadoop面试常见问题\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-03-08T16:50:51.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"余生\\"}]}"]]},"headers":[{"level":2,"title":"请说下HDFS的读写流程","slug":"请说下hdfs的读写流程","link":"#请说下hdfs的读写流程","children":[]},{"level":2,"title":"HDFS在读文件时，其中一个块损坏怎么办","slug":"hdfs在读文件时-其中一个块损坏怎么办","link":"#hdfs在读文件时-其中一个块损坏怎么办","children":[]},{"level":2,"title":"HDFS在上传文件时，其中一个DN挂掉怎么办","slug":"hdfs在上传文件时-其中一个dn挂掉怎么办","link":"#hdfs在上传文件时-其中一个dn挂掉怎么办","children":[]},{"level":2,"title":"NameNode在启动时会做哪些操作","slug":"namenode在启动时会做哪些操作","link":"#namenode在启动时会做哪些操作","children":[]},{"level":2,"title":"Secondary NameNode的工作机制","slug":"secondary-namenode的工作机制","link":"#secondary-namenode的工作机制","children":[]},{"level":2,"title":"Secondary NameNode 不能恢复 NameNode 的全部数据，那如何保证 NameNode 数据存储安全","slug":"secondary-namenode-不能恢复-namenode-的全部数据-那如何保证-namenode-数据存储安全","link":"#secondary-namenode-不能恢复-namenode-的全部数据-那如何保证-namenode-数据存储安全","children":[]},{"level":2,"title":"在 NameNode HA 中，会出现脑裂问题吗?怎么解决脑裂","slug":"在-namenode-ha-中-会出现脑裂问题吗-怎么解决脑裂","link":"#在-namenode-ha-中-会出现脑裂问题吗-怎么解决脑裂","children":[]},{"level":2,"title":"小文件过多会有什么危害，如何避免","slug":"小文件过多会有什么危害-如何避免","link":"#小文件过多会有什么危害-如何避免","children":[]},{"level":2,"title":"请说下 HDFS 的组织架构","slug":"请说下-hdfs-的组织架构","link":"#请说下-hdfs-的组织架构","children":[]},{"level":2,"title":"请说下 MR 中 Map Task 的工作机制","slug":"请说下-mr-中-map-task-的工作机制","link":"#请说下-mr-中-map-task-的工作机制","children":[]},{"level":2,"title":"请说下 MR 中 Reduce Task 的工作机制","slug":"请说下-mr-中-reduce-task-的工作机制","link":"#请说下-mr-中-reduce-task-的工作机制","children":[]},{"level":2,"title":"请说下 MR 中 Shuffle 阶段","slug":"请说下-mr-中-shuffle-阶段","link":"#请说下-mr-中-shuffle-阶段","children":[]},{"level":2,"title":"Shuffle 阶段的数据压缩机制了解吗","slug":"shuffle-阶段的数据压缩机制了解吗","link":"#shuffle-阶段的数据压缩机制了解吗","children":[]},{"level":2,"title":"在写 MR 时，什么情况下可以使用规约","slug":"在写-mr-时-什么情况下可以使用规约","link":"#在写-mr-时-什么情况下可以使用规约","children":[]},{"level":2,"title":"YARN 集群的架构和工作原理知道多少","slug":"yarn-集群的架构和工作原理知道多少","link":"#yarn-集群的架构和工作原理知道多少","children":[]},{"level":2,"title":"YARN 的任务提交流程是怎样的","slug":"yarn-的任务提交流程是怎样的","link":"#yarn-的任务提交流程是怎样的","children":[]},{"level":2,"title":"YARN 的资源调度三种模型了解吗","slug":"yarn-的资源调度三种模型了解吗","link":"#yarn-的资源调度三种模型了解吗","children":[]}],"git":{"createdTime":1678294251000,"updatedTime":1678294251000,"contributors":[{"name":"chunpeng","email":"chunpeng.yu@outlook.com","commits":1}]},"readingTime":{"minutes":1.05,"words":315},"filePathRelative":"basic/hadoop/面试QA.md","localizedDate":"2023年3月8日","autoDesc":true}');export{e as data};
