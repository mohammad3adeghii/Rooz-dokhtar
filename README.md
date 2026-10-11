# کارت‌پستال تعاملی روز دختر ❤️

## ساختار
```
index.html   ساختار صفحه و متن نامه
style.css    ظاهر، جعبه کادو، انیمیشن‌ها
script.js    منطق باز شدن، موسیقی، قلب‌ها
assets/music.mp3   ← آهنگ خودت را اینجا بگذار
```

## اجرا روی کامپیوتر
فایل `index.html` را با دوبار کلیک در مرورگر باز کن. نیازی به سرور نیست.
(برای فونت Vazirmatn اینترنت لازم است؛ بدون آن فونت Tahoma نمایش داده می‌شود.)

## گذاشتن آهنگ دلخواه
فایل صوتی را به نام دقیق `music.mp3` در پوشه `assets` بگذار. اگر نام یا فرمت دیگری دارد،
در `script.js` خط `new Audio('assets/music.mp3')` را عوض کن. اگر فایل نباشد سایت بدون صدا کار می‌کند.

## ویرایش متن نامه
در `index.html` بخش `<article class="letter">` را ببین؛ هر پاراگراف یک تگ `<p>` است.

## انتشار روی Netlify
1. به app.netlify.com وارد شو (ثبت‌نام رایگان).
2. بخش Sites → «Add new site» → «Deploy manually».
3. کل پوشه پروژه را بکش و رها کن.
4. لینک ساخته‌شده را (می‌توانی در Site settings تغییرش بدهی) برای او بفرست.

## انتشار روی GitHub Pages
1. در github.com یک مخزن عمومی (Public) بساز.
2. «uploading an existing file» را بزن و همه فایل‌ها و پوشه `assets` را آپلود و Commit کن.
3. Settings → Pages → Source: «Deploy from a branch» → شاخه `main` و پوشه `/ (root)` → Save.
4. بعد از حدود یک دقیقه لینک `https://USERNAME.github.io/REPO/` فعال می‌شود.
