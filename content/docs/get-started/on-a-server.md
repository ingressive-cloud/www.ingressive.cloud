---
title: "Getting Started - On a Server"
description: "Get from zero to traffic on Ingressive in about five minutes — register, add a domain, install a Connector, and create your first Site."
weight: 9
icon: "server"
---
# Getting Started on a Server

You've got a server, VPS, or just your laptop. It has an app running, now you want people to be able to use it. You've come to the right place. 

## Overview
Ingressive allows you to install a piece of software called a connector. This software manages the connection between Ingressive and the server without any further requirements. The basic process is as follows:
- Create a connector, install it on your server.
- Allow a Service through the connector (such as localhost:8080)
- Connect a site such as `myapp.contoso.com` to a service

## Connector
Installing the connector creates a connection out from your server to Ingressive. Ingressive can then send requests back in. 

The [Ingressive Console](https://console.ingressive.com) guides you through setting up a connector, setting up services, and sending sites to them. If you're familiar with Docker Compose, you should be able to set up just using the Console. 

{{<callout type="warning">}}
**Security Checkpoint**

The connector can be configured to connect to any service the machine can access. Only configure appropriate services and think about what can be configured later.
{{</callout>}}

Here are the exact steps:

1. Open the [Ingressive Console](https://console.ingressive.cloud)
1. Click Connectors
1. Click "New Connector"
1. Give the connector an ID and a name
1. The Console will give you a Docker Compose file for the connector. 
1. If you're not using containers already, install Podman following the directions in the Console.

    ```bash
    # Install Podman
    sudo apt-get update
    sudo apt-get install -y podman podman-compose

    # Configure auto-restart on server reboot
    sudo loginctl enable-linger $USER
    systemctl --user enable --now podman-restart.service
    ```

1. Set up the container by copying the configuration from the Console.
    1. If you're already using Docker Compose, you can add the connector to an existing `compose.yaml` file

    ```bash
    # Create working directory
    mkdir ingressive
    cd ingressive 

    # Create file
    nano compose.yaml
    # Paste the contents into the text editor and press control + x, then y, then enter
    ```

1. Bring the connector online
    1. Run `docker compose up -d`
    1. Check that the status goes green in the Ingressive Console
    1. If not, type `docker compose logs` to see the the logs of the connector
1. Now the connector is up: 

The connector page guides you through creating services, and connecting sites to them. 

## See Also
The [Connector](../connector/) docuementation.



## Troubleshooting 