import {useEffect, useState } from "react";
import { fetchImages } from "./helpers/api";
import { MutatingDots } from  'react-loader-spinner'
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import css from './App.module.css';

export const App = () => {
  const [gallery, setGallery] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [totalPages, setTotalPages] = useState(false);

  useEffect(() => {
    if (query === '') {
      return
    }

    const getImages = async () => {
      setIsLoading(true);
      const { hits, totalHits } = await fetchImages(query, page);
      setGallery(prevImages => [...prevImages, ...hits]);
      setTotalPages(Math.ceil(totalHits / 12));
      setIsLoading(false);
    }
      try {
        getImages()
        }
      catch (error) {
        setError(true);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
  }, [query, page]);

  const handleSubmit = value => {
    if(!value.query.trim()) return alert("Can not be emrty")
    setQuery(value.query);
    setPage(1);
    setGallery([]);
    setTotalPages(null);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1)
  };

  const images = gallery.length !== 0;

    return (
      <div className={css.App}>
        <Searchbar onSubmit={handleSubmit}></Searchbar>

        {isLoading && (<MutatingDots
          height="100"
          width="100"
          color="#4fa94d"
          secondaryColor='#4fa94d'
          radius='12.5'
          ariaLabel="mutating-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
        )}

        {error && (
          <b>Oops! Something went wrong! Please try reloading this page! 🥹</b>
        )}  
        {images && <ImageGallery gallery={gallery}></ImageGallery>}
        {totalPages && !isLoading && images && (page < totalPages
          ? < Button onClick={loadMore} name="Load more" />
          : <p>You have reached the end of search results.</p>)} 
      </div>
    )
}




// export const App = () => {
//   return (
//     <div
//       style={{
//         height: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         fontSize: 40,
//         color: '#010101'
//       }}
//     >
//       React homework template
//     </div>
//   );
// };
