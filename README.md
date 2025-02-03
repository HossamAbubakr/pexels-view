# 📸 Pexels-view

Pexels-view is a modern, high-performance React + TypeScript application for browsing images from [Pexels.com](https://www.pexels.com/). It features a sleek masonry grid layout, virtualized rendering for smooth performance, and dynamic imports for optimal load times.

## 🚀 Features

- **Masonry Grid Layout** – Beautifully arranges images for a seamless viewing experience.
- **Virtualized View** – Optimizes performance by rendering only visible images.
- **Search Functionality** – Quickly find images using keywords.
- **Detailed Image View** – Click on any image for an immersive preview.
- **Dynamic Imports** – Reduces initial package size for faster load times.
- **React Lazy + Suspense** – Enhances performance with lazy loading.
- **Built with Vite** – Lightning-fast development and build process.

## 🔧 Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/hossamabubakr/pexels-view.git
   cd pexels-view
   ```

2. Install dependencies:

   ```sh
   npm install
   # or
   yarn install
   ```

3. Set up your API key:

   - Get an API key from [Pexels API](https://www.pexels.com/api/).
   - Open `src\services\baseApi.ts` and set your key in the `API_KEY` variable:

     ```ts
     const API_KEY = "your-pexels-api-key";
     ```

4. Start the development server:

   ```sh
   npm run dev
   # or
   yarn dev
   ```

## 📦 Build for Production

To create an optimized production build, run:

```sh
npm run build
# or
yarn build
```

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📜 License

This project is licensed under the [MIT License](LICENSE).
