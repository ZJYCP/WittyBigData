import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/project":[
    
  ],
  "/manage":[
    
  ],  
  "/": [
    // "",
    {
      icon: "discover",
      text: "Hadoop",
      prefix: "hadoop/",
      link: "hadoop/",
      children: "structure",
    },
    {
      icon: "discover",
      text: "Hive",
      prefix: "hive/",
      children: "structure",
    },
    {
      icon: "discover",
      text: "Flume",
      prefix: "Flume/",
      children: "structure",
    },
    {
      icon: "discover",
      text: "Hive",
      prefix: "hive/",
      children: "structure",
    },
    {
      icon: "discover",
      text: "HBase",
      prefix: "HBase/",
      children: "structure",
    },
    {
      icon: "discover",
      text: "Spark",
      prefix: "Spark/",
      children: "structure",
    },
    {
      icon: "discover",
      text: "Kafka",
      prefix: "Kafka/",
      children: "structure",
    },
    {
      icon: "discover",
      text: "Flink",
      prefix: "Flink/",
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
