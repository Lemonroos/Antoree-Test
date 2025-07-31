# Antoree FE Test

A modern front-end interface for an AI-integrated educational e-commerce platform. Users can browse courses, books, and educational materials with intelligent AI-powered recommendations.
## ✨ Key Features

- **Product Discovery**: Search, filter, and browse courses/books/documents
- **Product Details**: View detailed information in responsive modals
- **Favorites System**: Bookmark products and manage favorites page
- **AI Recommendations**: Smart product suggestions based on viewing history, tags, and favorites
- **View History**: Local storage of browsing history
- **Responsive Design**: Smooth animations with Framer Motion and polished UI with Ant Design

## 🛠️ Tech Stack

- **React** + **TypeScript**
- **Vite** (bundler with HMR)
- **Ant Design** (UI library) + **Tailwind CSS**
- **Framer Motion** (animations)
- **Axios** (HTTP client)
- **OpenRouter.ai** (AI recommendations)
- **MockAPI.io** (mock backend)
- **Vercel/Netlify** (deployment)

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Lemonroos/Antoree-Test.git
   cd antoree-fe-test
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   Create a `.env.local` file in the project root:

   ```env
   VITE_OPENROUTER_KEY=<Your_OpenRouter_API_Key>
   ```

   - Sign up at [OpenRouter.ai](https://openrouter.ai)
   - Generate an API key in your dashboard
   - Copy the key to `VITE_OPENROUTER_KEY`

4. **Start development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) in your browser

### Build & Preview

```bash
# Build for production
npm run build

# Preview build locally
npm run preview
```

The build generates a `dist/` folder, and preview runs a local static server.

## 🤖 AI Recommendations

The AI suggestion system sends POST requests to `https://openrouter.ai/api/v1/chat/completions`:

```json
{
  "model": "google/gemma-3n-e4b-it",
  "messages": [
    {
      "role": "system",
      "content": "You are a JSON-only product recommendation assistant..."
    },
    { "role": "user", "content": "User wants: <prompt>" }
  ],
  "temperature": 0,
  "max_tokens": 80
}
```

**Response**: Array of product IDs `["1","4","9","2"]`

The frontend then fetches detailed product information via `GET /products/:id` and displays results in a carousel/grid.

## 💡 Core Features

### Product Catalog

- Product cards with images, titles, prices, descriptions
- Click cards to open detailed modals
- Favorite toggle with toast notifications

### Search & Filtering

- Search bar with real-time results
- Sort and filter by price, tags, categories
- Responsive design with loading skeletons

### Product Modal

- Large product images
- Complete product details (title, price, ratings, description)
- Creation, start, and end dates
- Tag system
- Favorite toggle functionality

### Favorites Page

- Displays only favorited products (`isFavorite === true`)
- Same layout as main product page

### AI Suggestions

- Prompt input for personalized recommendations
- Grid display of suggested products
- Loading skeletons and error handling

### View History _(Bonus Feature)_

- Saves `product.id` to localStorage when modal opens
- Used by AI system to exclude already-viewed products

## 🎨 Design System

**UI Framework**: Ant Design + Tailwind CSS

```

**Animations**: Framer Motion with fade-in, slide, and staggered children effects

**Layout**: Header (logo + navigation/drawer), Footer, Content container

## 🌐 Live Demo

**Deployed on Vercel**: [https://antoree-test.vercel.app](https://antoree-test.vercel.app)

**GitHub Repository**: [https://github.com/Lemonroos/Antoree-Test](https://github.com/Lemonroos/Antoree-Test)

## 🔮 Future Enhancements

- [ ] Infinite scroll/pagination for product lists
- [ ] Interactive AI chatbot for advanced consultation
- [ ] Node.js/Express backend with server-side user data
- [ ] Docker containerization
- [ ] Unit & E2E testing suite
- [ ] Advanced analytics and user behavior tracking

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

**Thank you for checking out Antoree FE Test! 🚀**
```
