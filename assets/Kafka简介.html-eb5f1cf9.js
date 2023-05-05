import{_ as a,V as i,W as e,$ as r,X as l,a1 as o}from"./framework-8aef05fa.js";const n={},t=l("p",null,"kafka 是最初由 linkedin 公司开发的，使用 scala 语言编写，kafka 是一个分布 式，分区的，多副本的，多订阅者的日志系统(分布式 MQ 系统)，可以用于搜 索日志，监控日志，访问日志等。",-1),h=o('<h2 id="消息队列" tabindex="-1"><a class="header-anchor" href="#消息队列" aria-hidden="true">#</a> 消息队列</h2><h3 id="消息队列的介绍" tabindex="-1"><a class="header-anchor" href="#消息队列的介绍" aria-hidden="true">#</a> 消息队列的介绍</h3><p>消息是指在应用之间传递的数据，消息可以是文本字符串、嵌入对象...</p><p>消息队列是一种应用间的通信方式，消息发布者把消息发布到MQ中，消息使用者从MQ中取消息。双方都不知道对方的存在。</p><h3 id="消息队列的应用场景" tabindex="-1"><a class="header-anchor" href="#消息队列的应用场景" aria-hidden="true">#</a> 消息队列的应用场景</h3><h4 id="异步处理" tabindex="-1"><a class="header-anchor" href="#异步处理" aria-hidden="true">#</a> 异步处理</h4><ul><li>多应用对消息队列中同一消息进行处理，应用间并发处理消息，相比串行处理，减少处理时间</li></ul><p><strong>不使用消息队列</strong></p><figure><img src="https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230504191714204.png" alt="image-20230504191714204" tabindex="0" loading="lazy"><figcaption>image-20230504191714204</figcaption></figure><p>假设每个子系统的处理时间是50ms，系统需要在发送结束后返回，需要耗时100ms</p><p><strong>使用消息队列</strong></p><figure><img src="https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230504191850623.png" alt="image-20230504191850623" tabindex="0" loading="lazy"><figcaption>image-20230504191850623</figcaption></figure><p>后端在写入消息队列后就返回给客户端</p><h4 id="应用解耦" tabindex="-1"><a class="header-anchor" href="#应用解耦" aria-hidden="true">#</a> 应用解耦</h4><ul><li>多应用间通过消息队列对同一消息进行处理，避免调用接口失败导致整个过程失败</li></ul><figure><img src="https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230504193539915.png" alt="image-20230504193539915" tabindex="0" loading="lazy"><figcaption>image-20230504193539915</figcaption></figure><p>客户端上传图片后，图片上传系统将图片信息写入消息队列，直接返回成功。</p><p>人脸识别系统从消息队列中取数据。</p><h4 id="限流削峰" tabindex="-1"><a class="header-anchor" href="#限流削峰" aria-hidden="true">#</a> 限流削峰</h4><ul><li>广泛应用于秒杀或抢购活动中，避免流量过大导致应用系统挂掉的情况</li></ul><figure><img src="https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230504193715491.png" alt="image-20230504193715491" tabindex="0" loading="lazy"><figcaption>image-20230504193715491</figcaption></figure><p>请求先加入消息队列，做一次缓冲，减小业务处理系统压力</p><p>队列设置长度，对于秒杀商品，后入队列的请求被抛弃</p><h4 id="消息驱动的系统" tabindex="-1"><a class="header-anchor" href="#消息驱动的系统" aria-hidden="true">#</a> 消息驱动的系统</h4><ul><li>系统分为消息队列、消息生产者、消息消费者，生产者负责产生消息，消费者(可能有多个)负责对消息进行处理</li></ul><figure><img src="https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230504194704893.png" alt="image-20230504194704893" tabindex="0" loading="lazy"><figcaption>image-20230504194704893</figcaption></figure><hr><h3 id="消息队列的两种模式" tabindex="-1"><a class="header-anchor" href="#消息队列的两种模式" aria-hidden="true">#</a> 消息队列的两种模式</h3><h4 id="点对点模式" tabindex="-1"><a class="header-anchor" href="#点对点模式" aria-hidden="true">#</a> 点对点模式</h4><ul><li>消息队列</li><li>生产者</li><li>消费者</li></ul><figure><img src="https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230504194804265.png" alt="image-20230504194804265" tabindex="0" loading="lazy"><figcaption>image-20230504194804265</figcaption></figure><p><strong>特点</strong></p><ol><li>每个消息只有一个接受者</li><li>生产者和消费者之间没有依赖性</li><li>消费者消费后要向队列应答成功，以便消息队列删除消息</li></ol><h4 id="发布-订阅模式" tabindex="-1"><a class="header-anchor" href="#发布-订阅模式" aria-hidden="true">#</a> 发布/订阅模式</h4><ul><li>角色主题</li><li>发布者</li><li>订阅者</li></ul><figure><img src="https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230504195209534.png" alt="image-20230504195209534" tabindex="0" loading="lazy"><figcaption>image-20230504195209534</figcaption></figure><p><strong>特点</strong></p><ol><li>每个消息可以有多个订阅者</li><li>发布者和订阅者有时间上的依赖性，针对某个主题，必须创建订阅者才能消费发布者的消息</li><li>订阅者需要提前订阅该角色主题</li></ol><hr><h3 id="常用的消息队列" tabindex="-1"><a class="header-anchor" href="#常用的消息队列" aria-hidden="true">#</a> 常用的消息队列</h3><ol><li>RabbitMQ</li></ol><p>主流的消息中间件之一</p><ol start="2"><li>ActiveMQ</li><li>RocketMQ</li></ol><p>出自阿里</p><ol start="4"><li>Kafka</li><li>Pulsar</li></ol><figure><img src="https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230504200401134.png" alt="image-20230504200401134" tabindex="0" loading="lazy"><figcaption>image-20230504200401134</figcaption></figure><h2 id="kafka基础" tabindex="-1"><a class="header-anchor" href="#kafka基础" aria-hidden="true">#</a> Kafka基础</h2><h3 id="基本介绍" tabindex="-1"><a class="header-anchor" href="#基本介绍" aria-hidden="true">#</a> 基本介绍</h3><p>Kafka是<strong>一个分布式的基于发布/订阅模式的消息队列</strong>，主要应用于大数据实时处理领域。</p><h3 id="优势" tabindex="-1"><a class="header-anchor" href="#优势" aria-hidden="true">#</a> 优势</h3><ol><li>可靠性</li><li>可扩展性</li><li>耐用性</li><li>性能</li></ol><h3 id="应用场景" tabindex="-1"><a class="header-anchor" href="#应用场景" aria-hidden="true">#</a> 应用场景</h3><ol><li><p>指标分析</p><p>聚合来自分布式应用程序的统计信息</p></li><li><p>日志聚合</p><p>从多个服务器收集日志，并使他们以标准的格式提供给多个服务器</p></li><li><p>流式处理</p></li></ol><p>​ 对接流式处理框架（spark，storm，flink）</p><ol start="4"><li>传递消息</li><li>活动跟踪</li></ol><h2 id="kafka架构及组件" tabindex="-1"><a class="header-anchor" href="#kafka架构及组件" aria-hidden="true">#</a> Kafka架构及组件</h2><h3 id="kafka架构" tabindex="-1"><a class="header-anchor" href="#kafka架构" aria-hidden="true">#</a> Kafka架构</h3><figure><img src="https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230505152336617.png" alt="Kafka基础架构" tabindex="0" loading="lazy"><figcaption>Kafka基础架构</figcaption></figure><ol><li>topic：每条发布到Kafka的消息的类别</li><li>partition：物理上的概念，每个topic包含一个或者多个partition</li><li>segment：一个partition存在多个segment文件段，每个segment包含.log和.index</li><li>producer：生产者</li><li>consumer：消费者</li><li>consumer group：消费者组</li><li>.log：存放数据文件</li><li>.index:存放.log文件的索引数据</li></ol><h3 id="kafka主要组件" tabindex="-1"><a class="header-anchor" href="#kafka主要组件" aria-hidden="true">#</a> Kafka主要组件</h3><h4 id="producer生产者" tabindex="-1"><a class="header-anchor" href="#producer生产者" aria-hidden="true">#</a> producer生产者</h4><p>生成消息，通过topic进行归类</p><h4 id="topic主题" tabindex="-1"><a class="header-anchor" href="#topic主题" aria-hidden="true">#</a> topic主题</h4><ol><li>Kafka将消息以topic为单位进行归类</li></ol><h4 id="partition-分区" tabindex="-1"><a class="header-anchor" href="#partition-分区" aria-hidden="true">#</a> partition 分区</h4><p>一个topic可以有多个分区，每个分区保存部分topic的数据。</p><p>一个broker服务下，可以创建多个分区</p><p>每一个分区有一个编号，从0开始</p><p><strong>每一个分区内的数据是有序的，但不能保证全局有序</strong>，有序指消费时的顺序是否是生产时的顺序</p><h4 id="consumer-消费者" tabindex="-1"><a class="header-anchor" href="#consumer-消费者" aria-hidden="true">#</a> consumer 消费者</h4><p>消费数据</p><h4 id="consumer-group-消费者组" tabindex="-1"><a class="header-anchor" href="#consumer-group-消费者组" aria-hidden="true">#</a> consumer group 消费者组</h4><p>消费者组由一个或多个消费者组成，<strong>同一个组中的消费者对同一个消息只消费一次</strong></p><p>如果不指定，则所有的消费者属于一个默认的组</p><p><strong>每个分区只能由同一个消费者组的一个消费者来消费</strong>，可以由不同的消费者组来消费。</p><p>某一主题上的分区数，对于消费该主题的同一个消费者组下的消费者，消费者数量要小于等于分区的数量。</p><figure><img src="https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230504220529022.png" alt="image-20230504220529022" tabindex="0" loading="lazy"><figcaption>image-20230504220529022</figcaption></figure><figure><img src="https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230504221053927.png" alt="image-20230504221053927" tabindex="0" loading="lazy"><figcaption>image-20230504221053927</figcaption></figure><h4 id="分区副本" tabindex="-1"><a class="header-anchor" href="#分区副本" aria-hidden="true">#</a> 分区副本</h4><figure><img src="https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230504224146868.png" alt="image-20230504224146868" tabindex="0" loading="lazy"><figcaption>image-20230504224146868</figcaption></figure><p>副本因子要小于等于可用的broker数量</p><p>副本因子操作是以分区为单位的，每个分区都有各自的主副本和从副本</p><p>主副本-leader，从副本-follower。 处于同步状态的副本称为in-sync-replicas（ISR)</p>',83);function d(g,c){return i(),e("div",null,[t,r(" more "),h])}const s=a(n,[["render",d],["__file","Kafka简介.html.vue"]]);export{s as default};
