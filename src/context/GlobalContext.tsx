import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { PageAlbum, Photo } from "../types/types";
import photoFetcher from "../services/photoFetcher";

type GlobalContextProps = {
  pageAlbum: PageAlbum;
  setPageAlbum: React.Dispatch<React.SetStateAction<PageAlbum>>;
  query?: string;
  setQuery: React.Dispatch<React.SetStateAction<string | undefined>>;
  isPending: boolean;
  getNextPage: (pageIndex: number) => Promise<void>;
  photoBatches: Photo[][];
};

export const GlobalContext = createContext<GlobalContextProps | null>(null);

type GlobalContextProviderProps = {
  children: React.ReactNode;
};

export const GlobalContextProvider = ({
  children,
}: GlobalContextProviderProps) => {
  const [query, setQuery] = useState<string | undefined>();
  const [pageAlbum, setPageAlbum] = useState<PageAlbum>({
    page: 0,
    per_page: 80,
    photos: [],
    next_page: "",
    total_results: 0,
  });
  const [isPending, setPending] = useState(false);

  const [photoBatches, setPhotoBatches] = useState<Photo[][]>([]);

  const getNextPage = useCallback(
    async (pageIndex: number, reset = false) => {
      setPending(true);
      try {
        const nextPageAlbum = await photoFetcher(pageIndex, query);
        if (
          nextPageAlbum &&
          nextPageAlbum.total_results > nextPageAlbum.per_page
        ) {
          if (reset) {
            setPhotoBatches([nextPageAlbum.photos]);
          } else {
            setPhotoBatches((prev) => [...prev, nextPageAlbum.photos]);
          }
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    },
    [query]
  );

  useEffect(() => {
    if (query === "") {
      getNextPage(1, true);
    } else if (query) {
      getNextPage(1, true);
    }
  }, [getNextPage, query]);

  return (
    <GlobalContext.Provider
      value={{
        query,
        setQuery,
        pageAlbum,
        setPageAlbum,
        isPending,
        getNextPage,
        photoBatches,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider"
    );
  }
  return context;
};
