# Barta24 BY TAKID
Developed by Ismail Hasan Takid

**Barta24 BY TAKID** is a modern Bengali news website built with Next.js.
It provides users with Bengali news, categories, article details, authentication, Google login, user profiles, and reading history.

> **খবরের সাথে, সবসময়**

## 🌐 Live Website

**[Barta24 – Live Demo](https://barta24-with-takid.vercel.app)**

## ✨ Features

* 📰 Latest Bengali news
* 🏠 Home page with featured news
* 📂 News category pages
* 📖 Detailed article pages
* 🔥 Most-read news section
* 📢 Latest news marquee
* 🔐 Email & password authentication
* 🔵 Google authentication
* ✉️ Email verification
* 👤 User profile
* 📚 Reading history
* 🔒 Protected article details
* 📱 Responsive design
* ⚡ Server-side data fetching with Next.js
* 🚀 Deployed with Vercel

## 🛠️ Tech Stack

* **Next.js 16**
* **React**
* **TypeScript**
* **Tailwind CSS**
* **Better Auth**
* **MongoDB**
* **Google OAuth**
* **Vercel**
* **News API**
* **React Marquee Text**

## 🔗 News API

Barta24 uses the following news API:

```text
https://news-api-v2.vercel.app/api
```

### Main API endpoints

```text
/api/categories
/api/news
/api/news/sections
/api/news/most-read
/api/category/[slug]
/api/article/[id]
```

## 🔐 Authentication

Authentication is implemented using **Better Auth** with MongoDB.

### Available authentication features

* Email & password sign up
* Email & password sign in
* Email verification
* Google sign in
* Session management
* Logout
* Protected pages

Users must be authenticated to access protected article details and user-specific features.

## 👤 Profile

Authenticated users can access their profile page.

The profile includes:

* User information
* Reading history
* Previously read articles

If the user has not read any article yet, the profile shows:

```text
আপনি এখনও কোনো আর্টিকেল পড়েননি।
সব আর্টিকেল দেখুন →
```

## 📚 Reading History

When an authenticated user opens an article, the article can be recorded in their reading history.

This allows users to return to their previously read news from the profile page.

## 📁 Project Structure

```text
src/
├── app/
│   ├── category/
│   │   └── [slug]/
│   │       └── page.tsx
│   │
│   ├── details/
│   │   └── [id]/
│   │       └── page.tsx
│   │
│   ├── profile/
│   │   └── page.tsx
│   │
│   ├── signin/
│   │   └── page.tsx
│   │
│   ├── signup/
│   │   └── page.tsx
│   │
│   ├── verify-email/
│   │   └── page.tsx
│   │
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── Header.tsx
│   ├── Navbar.tsx
│   ├── Marquie.tsx
│   ├── Footer.tsx
│   ├── HomePage.tsx
│   ├── NewsSection.tsx
│   └── ...
│
└── lib/
    ├── auth.ts
    ├── auth-client.ts
    ├── getData.ts
    └── ...
```

## 🧭 Navigation Behavior

The website uses a simple navigation structure.

* **Header** → available throughout the website
* **Navbar** → available on normal pages
* **Profile page** → Navbar is hidden
* **Marquee** → displayed only on the Home page
* **Footer** → available where required

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/IsmailHasanTakid/bangla-news-24.git
```

### 2. Go to the project directory

```bash
cd bangla-news-24
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create environment variables

Create a `.env.local` file in the root directory.

```env
BETTER_AUTH_DB_URL=your_mongodb_connection_string
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

> Never commit `.env` or `.env.local` files to GitHub.

## ▶️ Run Development Server

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

## 🏗️ Build for Production

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## 🚀 Deployment

The project is deployed on **Vercel**.

Production URL:

```text
https://barta24-with-takid.vercel.app
```

For production deployment, environment variables should be configured from the Vercel project settings.

## 🖼️ Image Configuration

The project uses remote images from the BBC image server.

The required remote image domain is configured in the Next.js configuration.

```text
ichef.bbci.co.uk
```

## 🔄 How It Works

### Home Page

The Home page fetches news data from the API and displays:

* Featured news
* Additional news cards
* Most-read news
* News sections
* Latest news marquee

### Category Page

Users can select a category from the navigation bar.

For example:

```text
/category/politics
/category/sports
/category/technology
```

The selected category's news is fetched dynamically using the category slug.

### Article Details

Each article has its own dynamic route:

```text
/details/[id]
```

Example:

```text
/details/123
```

Authenticated users can read the full article and the article can be added to their reading history.

## 🔒 Environment Variables

The following environment variables are required:

| Variable               | Purpose                     |
| ---------------------- | --------------------------- |
| `BETTER_AUTH_DB_URL`   | MongoDB connection string   |
| `BETTER_AUTH_URL`      | Better Auth application URL |
| `NEXT_PUBLIC_APP_URL`  | Public application URL      |
| `BETTER_AUTH_SECRET`   | Better Auth secret          |
| `GOOGLE_CLIENT_ID`     | Google OAuth client ID      |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret  |

Do not expose private credentials in source code or commit them to GitHub.

## 📌 Known Limitations

* News content depends on the external news API.
* Authentication requires a properly configured MongoDB database.
* Google login requires correctly configured Google OAuth credentials.
* Some external news images depend on the availability of their original image server.

## 🔮 Future Improvements

Possible future improvements include:

* 🔎 Advanced news search
* ❤️ Bookmark/favorite articles
* 🌓 Dark/light mode
* 🔔 News notifications
* 💬 Article comments
* 📱 Improved mobile experience
* 🤖 AI-powered news recommendations
* 🌐 More news sources
* 📊 Personalized news feed

## 👨‍💻 Author

**Ismail Hasan Takid**

GitHub:

**[IsmailHasanTakid](https://github.com/IsmailHasanTakid)**

## 📄 License

This project is created for learning, development, and educational purposes.
