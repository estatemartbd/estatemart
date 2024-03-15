### Clone Project

In the project Copy git repo

```
git clone https://github.com/Jutawhid/estatemart.git
```

### Change Base API Path

```
frontend\src\services\basePath.js
```

### Set port
.env
```
PORT=8081
```
### Project setup

In the project directory, you can run:

```
npm install
```

### Project Start

In the project directory, you can run:

```
npm start
```

### Build Project
```
npm run build
```

## Add `.htaccess` in build folder

```
<IfModule mod_rewrite.c>

  RewriteEngine On

  RewriteBase /

  RewriteRule ^index\.html$ - [L]

  RewriteCond %{REQUEST_FILENAME} !-f

  RewriteCond %{REQUEST_FILENAME} !-d

  RewriteRule . /index.html [L]

</IfModule>
```