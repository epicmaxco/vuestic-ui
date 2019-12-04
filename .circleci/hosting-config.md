## How to configure multi-domain access on DO droplet

Instead `sub.asva.by` use your domain.

* Create A record on NDS server: `*.sub.asva.by`

* Create a new clean droplet with ubuntu onboard
* Install nginx
```sh
apt-get update & sudo apt-get install nginx
```

* Add nginx config to `sites-available`

```sh
nano /etc/nginx/sites-available/sub.asva.by
```
    
    
```nginx
server {
    listen 80;
    listen [::]:80;

    server_name ~^(.*)\.sub.asva\.by$;
    root /var/www/html/$1;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

* Link config to `sites-enabled`:
```sh
ln -s /etc/nginx/sites-available/sub.asva.by /etc/nginx/sites-enabled/sub.asva.by
```

* Add `any-folder` to `/var/www/html/`
* Load `any-folder.sub.asva.by` and enjoy your page.

## SSL certificate
* We use https://certbot.eff.org/lets-encrypt/ubuntubionic-nginx for https to function.
