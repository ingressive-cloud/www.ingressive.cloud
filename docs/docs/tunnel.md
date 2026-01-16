---
icon: lucide/workflow
---

# Tunnel
If your backend server is behind a firewall / NAT, or you want to run multiple services on multiple VMs, you can connect your backend web server to Ingressive Bifrost using a tunnel. All Bifrost nodes are connected to the [Yggdrasil](https://yggdrasil-network.github.io/) overlay network[^1], and setting up a connection is easy.

With Yggdrasil, all traffic is encrypted using the key you generate to connect to the network, so there's no need to futz with setting up SSL certificates on your backend either. 

[^1]: An overlay network overlays on the public network, creating an encrypted network between participating peers

## Install Yggdrasil
Yggdrasil is available in the package manager of most Linux distros and can be easily installed. We're going to use Ubuntu for this tutorial. 

```bash
sudo apt-get install yggdrasil
```
This will install Yggdrasil, and it's now ready to be configured.
```bash
yggdrasil -genconf > /etc/yggdrasil/yggdrasil.conf
```
Now you need to set Yggdrasil to peer with the Bifrost network. 
```bash
sed -i 's@Peers: \[]@Peers: [ "tcp://edge.bifrost.tinking.kiwi" ]@' /etc/yggdrasil/yggdrasil.conf
```
Now, just enable and start the Yggdrasil service!
```bash
sudo systemctl enable --now yggdrasil
sudo systemctl status yggdrasil # Make sure it starts
```

## Add As the Backend
To find out your Yggdrasil IP address, run this command:
```bash
ip a show tun0
```
The address you want will be the one with /7 after it. 

Enter this IP in the form `http://[200:f00:dead:beef::1]` as your backend server in Bifrost. You can optionally add a port, like `http://[200:f00:dead:beef::1]:8080` if your web server isn't on the default port 80. 