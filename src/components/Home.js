import React, { useState } from 'react';
import {
    API_URL,
    API_KEY,
    POSTER_SIZE,
    IMAGE_BASE_URL,
    BACKDROP_SIZE,
} from '../config';

// import components
import HeroImage from './elements/HeroImage';
import SearchBar from './elements/SearchBar';
import Grid from './elements/Grid';
import MovieThumb from './elements/MovieThumb';
import LoadMoreBtn from './elements/LoadMoreBtn';
import Spinner from './elements/Spinner';

// Custom Hook
import { useHomeFetch } from './hooks/useHomeFetch';
// no image holder
import NoImage from './images/no_image.jpg';

const Home = () => {
    const [
        {   
            state: { movies, currentPage, totalPages, heroImage }, 
            loading, 
            error,
        }, 
        fetchMovies
    ] = useHomeFetch();
    // console.log(state);

    const [searchTerm, setSearchTerm] = useState('');

    const loadMoreMovies = () => {
        const searchEndpoint = `${API_URL}search/movie?api_key=${API_KEY}&query=${searchTerm}&page=${currentPage + 1}`;
        const popularEndpoint = `${API_URL}movie/popular?api_key=${API_KEY}&page=${currentPage + 1}`;

        const endpoint = searchTerm ? searchEndpoint : popularEndpoint;

        fetchMovies(endpoint);
        
    };
    
    if (error) return <div>Something went wrong ...</div>;
    // if (!state.movies[0]) return <Spinner/>;
    // multi-level deconstruct
    if (!movies[0]) return <Spinner/>;

    return (
        // empty tags equals: React.fragments tag
        <>
        <HeroImage 
            // image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.heroImage.backdrop_path}`}
            image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${heroImage.backdrop_path}`}
            // title={state.heroImage.original_title}
            title={heroImage.original_title}
            // text={state.heroImage.overview}
            text={heroImage.overview}
        />
        <SearchBar />
        <Grid header={searchTerm ? 'Search Result' : 'Popular Movies'}>
            {/* {state.movies.map(movie => ( */}
            {movies.map(movie => (
                <MovieThumb 
                    key={movie.id}
                    clickable
                    image={
                        movie.poster_path 
                            ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                            : NoImage
                    }
                    movieId={movie.id}
                    movieName={movie.original_title}
                />
        ))}
        </Grid> 
        {/* if loading then spinner, if false, no spinner */}
        {loading && <Spinner />}
        <LoadMoreBtn text="Load More" callback={loadMoreMovies} />
        </>
    )
};

export default Home;