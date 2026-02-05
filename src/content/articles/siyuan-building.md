---
title: "思源笔记搭建防坑经验"
category: "computer"
date: "2025-07-20"
description: "探讨构建高可用、可扩展分布式系统的关键概念和模式。"
tags: ["分布式系统", "架构", "系统设计"]
---

# 思源笔记搭建防坑经验

我日常使用的笔记软件是云服务器上私有部署的思源笔记，体验还不错。部署的教程网上很多，操作也很简单，这里就谈一些防坑经验。

这里先说几个问题：

1. 笔记使用的时候有时候会提示出问题，这个一般是网络问题，等几秒让它自行修复就行。
2. 思源笔记是用Docker部署的，这个会出什么问题懂的都懂，可以把docker的tar镜像下载下来然后本地导入。这一块可以用网上的一些下载工具，可以从docker hub上把文件搞下来，虽然也没那么好用。我的处理方法是用我的Linux物理机下载镜像。
3. Docker容器不启动的问题。网上给出的命令很多时候没法启动容器，这是因为缺了一个授权码参数，把这个加上就行了。

以下是操作流程：

本地下载Docker镜像：docker image pull b3log/siyuan:latest

镜像提取到本地：docker save b3log/siyuan:latest > ./siyuan.tar

然后把这个镜像传到你部署笔记的机器上去，可以用SFTP或者别的什么方法。

到机器上加载镜像：docker load -i siyuan.tar，记得先cd到放镜像的路径下

接下来是启动镜像，注意，这个地方网上给的命令很多是有问题的，因为缺少一个授权码参数

实测可用的命令：

```
 sudo docker run -d  \
     -v /home/username/siyuan/workspace:/siyuan/workspace  \
     -p 6806:6806   \
     b3log/siyuan \
     --workspace=/siyuan/workspace \
     --accessAuthCode=设置一个明文授权码
```

把授权码那里换成你想设置的登录密码就行。

注意这个命令中，-p做的是端口映射，前一个是容器里的端口，保持6806这个值，后面是你服务器上的端口号，可以按自己想要的改，记得在服务器上放通就可以。

然后设置容器自动启动：

```
 sudo systemctl enable docker
 sudo docker update --restart unless-stopped fbe971e27e2d
```

这样只要不手动关闭就会一直运行。

然后就可以登录，打开浏览器访问你的云服务器公网IP:6806，是把冒号前面的换成说的内容哈

然后输入授权码，就可以开始写笔记了。
