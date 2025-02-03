import { BrowserRouter, Routes, Route } from "react-router";
import { Suspense, lazy } from "react";
import "./App.scss";
import { GlobalContextProvider } from "./context/GlobalContext";

const PhotosView = lazy(() => import("./features/PhotosView/PhotosView"));
const PhotoDetails = lazy(() => import("./features/PhotoDetails/PhotoDetails"));

const App = () => {
  return (
    <GlobalContextProvider>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<PhotosView />} />
            <Route path="photo-details/:photoId" element={<PhotoDetails />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </GlobalContextProvider>
  );
};

export default App;
