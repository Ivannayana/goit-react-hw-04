import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ImageModal from "./components/ImageModal/ImageModal";
import { Audio } from "react-loader-spinner";

const ACCESS_KEY = "GGoLKrCfHWvuuI6gwWjajCwLwCfOwRPHt82Scg1HB2I";
const BASE_URL = "https://api.unsplash.com/search/photos";

export const fetchImages = async (query, page = 1, perPage = 12) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        query,
        page,
        per_page: perPage,
        client_id: ACCESS_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
};

function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getImages = async () => {
      if (!query) return;
      setLoading(true);
      setError(null);

      try {
        const data = await fetchImages(query, page);
        setImages((prevImages) => [...prevImages, ...data.results]);
        setTotalPages(data.total_pages);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getImages();
  }, [query, page]);

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />

      {error && <p>Oops... Something went wrong: {error.message}</p>}

      {!error && (
        <>
          {loading && page === 1 ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <Audio
                height="80"
                width="80"
                radius="9"
                color="black"
                ariaLabel="loading"
              />
            </div>
          ) : (
            <ImageGallery images={images} openModal={openModal} />
          )}

          {page < totalPages && !loading && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button onClick={handleLoadMore}>Load more</button>
            </div>
          )}

          {loading && page > 1 && (
            <Audio
              height="80"
              width="80"
              radius="9"
              color="green"
              ariaLabel="loading"
            />
          )}
        </>
      )}

      {selectedImage && (
        <ImageModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          image={selectedImage}
        />
      )}
    </>
  );
}

export default App;
