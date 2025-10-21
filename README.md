# resume-builder
resume, cv, obektivka yaratish uchun web ilova


1.2 Node.js va pm2 o‘rnatish

Node.js ning LTS versiyasini o‘rnatish (masalan v20 yoki v24)
Misol:
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node -v   # tekshirish


pm2 — Node.js ilovani serverda fon rejimida yuritish uchun:

sudo npm install -g pm2
```
1.3 Git va kerakli utilitalar
```bash
sudo apt install -y git build-essential
```

2. Loyihani tushirish va qurish

Sizning GitHub repozitoriyingizni serverga klon qilish va undan keyin build qilish.
```bash
cd /var/www    # masalan loyihalar joyi
sudo git clone https://github.com/jaloliddin1006/resume-builder.git
cd resume-builder
```

Agar siz foydalanuvchi bilan ishlayotgan bo‘lsangiz, kerak bo‘lsa chown bilan foydalanuvchi huquqini o‘rnatishingiz mumkin.

2.1 Paketlarni o‘rnatish
```bash
npm install
# yoki agar pnpm ishlatilgan bo‘lsa (pnpm-lock mavjud) 
# sudo npm install -g pnpm
# pnpm install
```
2.2 Production build
```bash
npm run build
```

Yuqoridagi komandalar sizning package.json ichida "build" skripti belgilangan bo‘lsa ishlaydi. 
Next.js
+1

2.3 Ilovani ishga tushirish
```bash
npm start
```

Bu holatda siz ilovani odatda 3000-portda ishga tushirasiz. Agar kerak bo‘lsa portni sozlashingiz mumkin.

Agar siz pm2 bilan yuritmoqchi bo‘lsangiz:
```bash
pm2 start npm --name "resume-builder" -- start
pm2 save
pm2 startup       # tizim qayta yuklanganda ham ishga tushishi uchun
```

3. NGINX sozlamasi – Reverse Proxy

Sizning ilovangiz Node.js server orqali ishlaydi (masalan localhost:3000 da). Buni tashqarida domen orqali ko‘rish uchun NGINXni reverse proxy qilib sozlaymiz.

Masalan sizning domeningiz resume.example.com bo‘lsa.

3.1 /etc/nginx/sites-available/resume-builder.conf faylini yaratish

```nginx
server {
    listen 80;
    server_name resume.example.com;   # <--- sizning domeningiz

    location / {
        proxy_pass http://127.0.0.1:3000;    # ilova porti
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # static "_next/static" fayllarini keshlash uchun (agar kerak bo‘lsa)
    location /_next/static/ {
        alias /var/www/resume-builder/.next/static/;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}
```

Ushbu konfiguratsiya misoli 🙂 
Stack Overflow
+1

3.2 Faol qilish
```bash
sudo ln -s /etc/nginx/sites-available/resume-builder.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

4. Xavfsizlik va yuklashni nazorat qilish

Firewall orqali HTTP (80) va HTTPS (443) portlarini oching:
```bash
sudo ufw allow 'Nginx Full'
```

Ilova loglari va pm2 statusini tekshiring:
```bash
pm2 status resume-builder
pm2 logs resume-builder
sudo journalctl -u nginx
```

Har safar yangilanish kiritganda npm install, npm run build, pm2 reload kabi amallarni bajaring.


# Loyihani yangilash

```bash
cd /var/www/resume-builder
git pull 
npm install
npm run build

```
## Ilovani qayta ishga tushirish (pm2 orqali)
```bash
pm2 reload resume-builder
pm2 list

```
## (Ixtiyoriy) NGINX tekshiruvi
```bash
sudo nginx -t
sudo systemctl reload nginx
```