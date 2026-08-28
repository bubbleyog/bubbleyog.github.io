---
title: "Self-Hosting SiYuan Note: Pitfalls and Fixes"
category: "computer"
date: "2025-07-20"
description: "Issues I ran into while privately deploying SiYuan Note, and how to get around them."
tags: ["cloud notes", "server", "self-hosting"]
---

# Self-Hosting SiYuan Note: Pitfalls and Fixes

The note app I use day to day is SiYuan Note, privately deployed on a cloud server. The experience is solid. Deployment tutorials are everywhere and the steps themselves are simple, so this post focuses on the pitfalls.

A few problems first:

1. SiYuan sometimes pops an error while you are using it. That is usually a network glitch. Wait a few seconds and let it recover on its own.
2. I run SiYuan in Docker. Anyone who has pulled images from Docker Hub on an unreliable network knows how this goes. One workaround is to download the image as a tar archive and import it locally. There are third-party tools that fetch files from Docker Hub; they are not great. My approach is to pull the image on a Linux machine I control, then copy it over.
3. The container often fails to start. Many commands circulating online will not bring the container up, because they omit the access-auth-code flag. Add that flag and it starts.

Here is the workflow.

Pull the image locally:

```bash
docker image pull b3log/siyuan:latest
```

Save it to a tar archive:

```bash
docker save b3log/siyuan:latest > ./siyuan.tar
```

Copy that archive onto the machine that will host the notes. SFTP works; so does anything else that gets the file there.

On the host, `cd` into the directory that holds the archive, then load it:

```bash
docker load -i siyuan.tar
```

Next, start the container. This is where a lot of online commands are wrong: they leave out `--accessAuthCode`.

A command that actually works:

```bash
sudo docker run -d \
    -v /home/username/siyuan/workspace:/siyuan/workspace \
    -p 6806:6806 \
    b3log/siyuan \
    --workspace=/siyuan/workspace \
    --accessAuthCode=YOUR_PLAINTEXT_AUTH_CODE
```

Replace `YOUR_PLAINTEXT_AUTH_CODE` with the login password you want.

In that command, `-p` is the port mapping, written as `hostPort:containerPort`. Keep the container port at `6806`. The host port is the one on your server; change it if you want, and open that port in the firewall.

Then make the container come back after a reboot:

```bash
sudo systemctl enable docker
sudo docker update --restart unless-stopped fbe971e27e2d
```

Replace `fbe971e27e2d` with your own container ID (`docker ps` will show it). After that, the container keeps running unless you stop it yourself.

You can log in now. Open a browser and visit `http://YOUR_SERVER_PUBLIC_IP:6806` — swap in your server's public IP, keep the port if you mapped `6806`.

Enter the auth code, and you can start writing notes.
