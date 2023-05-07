import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/project":[
    
  ],
  "/manage":[
    
  ],  
  "/basic/": [
    // "",
    {
      icon: "discover",
      text: "Hadoop",
      prefix: "hadoop/",
      collapsible: true,
      children: "structure",
    },
    {
      icon: "discover",
      text: "Hive",
      prefix: "hive/",
      collapsible: true,
      children: "structure",
    },
    {
      icon: "discover",
      text: "Flume",
      prefix: "Flume/",
      collapsible: true,
      children: "structure",
    },
    {
      icon: "discover",
      text: "Hive",
      prefix: "hive/",
      collapsible: true,
      children: "structure",
    },
    {
      icon: "discover",
      text: "HBase",
      prefix: "HBase/",
      collapsible: true,
      children: "structure",
    },
    {
      icon: "discover",
      text: "Spark",
      prefix: "Spark/",
      collapsible: true,
      children: "structure",
    },
    {
      icon: "discover",
      text: "Kafka",
      prefix: "Kafka/",
      collapsible: true,
      children: "structure",
    },
    {
      icon: "discover",
      text: "Flink",
      prefix: "Flink/",
      collapsible: true,
      children: "structure",
    },
    {
      icon: "discover",
      text: "Elasticsearch",
      prefix: "Elasticsearch/",
      collapsible: true,
      children: "structure",
    },         
    // {
    //   text: "文档",
    //   icon: "note",
    //   prefix: "guide/",
    //   children: "structure",
    // },
    // "slides",
  ],

});
