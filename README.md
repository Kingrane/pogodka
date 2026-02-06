# Pogodka - Atmospheric Weather Controller

Концептуальный погодный контроллер с Swiss design эстетикой. Превращает метеоданные в динамическую цифровую среду.

## ✨ Features

- **Dynamic Atmosphere** - Интерфейс реагирует на погоду: цвета, частицы, эффекты
- **Swiss Brutalism Design** - Асимметричная типографика, гигантские цифры, минимум UI
- **Canvas Particles** - Живой фон с частицами (дождь, снег, ветер)
- **Time Scrubbing** - Прокрутка времени с изменением показателей
- **Real-time Weather** - OpenWeatherMap API интеграция
- **Animated SVG Icons** - Красивые анимированные иконки погоды

## 🚀 Tech Stack

- **React 19** + **Vite**
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animations
- **shadcn/ui** - UI components
- **Canvas API** - Particle effects
- **Lucide React** - Icons

## 🛠️ Local Development

```bash
npm install
npm run dev
```

## 🌐 Deploy to Vercel

### 1. Подготовка

Убедись, что у тебя есть:
- Аккаунт на [Vercel](https://vercel.com)
- Аккаунт на [GitHub](https://github.com)
- API ключ от [OpenWeatherMap](https://openweathermap.org/api)

### 2. Загрузка на GitHub

```bash
# Добавь все файлы
git add .

# Сделай коммит
git commit -m "Initial commit"

# Запушь на GitHub
git push -u origin main
```

### 3. Деплой на Vercel

**Вариант 1: Через CLI**
```bash
# Установи Vercel CLI
npm i -g vercel

# Залогинься
vercel login

# Деплой
vercel

# Добавь environment variable
vercel env add VITE_OPENWEATHER_API_KEY
# Введи свой API ключ

# Передеплой
vercel --prod
```

**Вариант 2: Через веб-интерфейс**

1. Зайди на [vercel.com](https://vercel.com)
2. Нажми "Add New Project"
3. Импортируй репозиторий с GitHub
4. В настройках проекта добавь Environment Variable:
   - Name: `VITE_OPENWEATHER_API_KEY`
   - Value: `твой_api_ключ`
5. Нажми "Deploy"

### 4. Готово! 🎉

Сайт будет доступен по адресу: `https://pogodka-xxx.vercel.app`

## 🔧 Environment Variables

Создай файл `.env` для локальной разработки:

```
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

**Важно:** Не коммить `.env` файл! Добавь его в `.gitignore`.

## 📦 Build

```bash
npm run build
```

Статические файлы будут в папке `dist/`.

## 🎨 Design Features

- **Typography**: Unbounded, Comfortaa, Geologica
- **Colors**: Динамические темы под погоду (5 вариантов)
- **Effects**: Film grain, liquid gradients, glass morphism
- **Animations**: 60fps animations with Framer Motion

## 🌍 Supported Cities

Работает с любыми городами мира через OpenWeatherMap API.

## 📄 License

MIT - Feel free to use and modify!

---

Made with ❤️ and ☕
