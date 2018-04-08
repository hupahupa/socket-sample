### Install Nodejs
use asdf https://github.com/asdf-vm/asdf

```
asdf plugin-add nodejs https://github.com/asdf-vm/asdf-nodejs.git

asdf install nodejs 6.11.5

asdf global nodejs 6.11.5

```

### Install Bower

```
npm -g install bower
```

### Setup serverside and client

(See source code)


### Config Nginx

```
upstream socket_nodes {
    ip_hash;
    server socket.domain.com:5000;
}

server {
    server_name socket.domain.com;
    location / {
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_http_version 1.1;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
        proxy_pass http://socket_nodes;
    }
}

```

restart nginx (centos)

```
sudo systemctl restart nginx
sudo systemctl enable nginx
```

### Production setup

install pm2

```
sudo npm install pm2@latest -g
```

start application

```
pm2 start server.js
```

add to startup

```
sudo pm2 startup systemd
```

more referrence: https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-centos-7



