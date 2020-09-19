import React, { useState } from 'react';
import {
    SEARCH_BASE_URL,
    POPULAR_BASE_URL,
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
    const [searchTerm, setSearchTerm] = useState('');
    const [
        {   
            state: { movies, currentPage, totalPages, heroImage }, 
            loading, 
            error,
        }, 
        fetchMovies
    ] = useHomeFetch(searchTerm);
    // console.log(state);

    const searchMovies = search => {
        const endpoint = search ? SEARCH_BASE_URL + search : POPULAR_BASE_URL;  

        setSearchTerm(search);
        fetchMovies(endpoint);
    }

    const loadMoreMovies = () => {
        const searchEndpoint = `${SEARCH_BASE_URL}${searchTerm}&page=${currentPage + 1}`;
        const popularEndpoint = `${POPULAR_BASE_URL}&page=${currentPage + 1}`;

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
            {!searchTerm && (
                <HeroImage 
                    // image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.heroImage.backdrop_path}`}
                    image={ IMAGE_BASE_URL + BACKDROP_SIZE + heroImage.backdrop_path }
                    // title={state.heroImage.original_title}
                    title={heroImage.original_title}
                    // text={state.heroImage.overview}
                    text={heroImage.overview}
                />
            )}       
            <SearchBar callback={searchMovies}/>
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
            {currentPage < totalPages && !loading && (
                <LoadMoreBtn text="Load More" callback={loadMoreMovies} />
            )}
        </>
    )
};

export default Home;