import { useState, useEffect } from 'react';
import MovieList from './components/moviesList';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import MovieListHeading from "./components/movieListHeading";
import SearchBox from "./components/SearchBox.js";
import AddFavourites from "./components/addFavourites.js";
import RemoveFavourites from "./components/RemoveFavourites";



const App = ()=> { 
    const [movies, setMovies] = useState ([]);
    const [favourites, setFavourites] = useState ([]);
     const [searchValue, setSearchValue] = useState ("");


     //Llamada Api
        const getMovieRequest = async (searchValue)=>{
          const url= `http://www.omdbapi.com/?s=${searchValue}&apikey=ff43ce54`;

          const response = await fetch (url);
          const responseJson = await response.json();
         if(responseJson.Search){
          setMovies (responseJson.Search);
         }
      };

useEffect(()=>{
  getMovieRequest(searchValue);
}, [searchValue]);

useEffect(()=>{
  const movieFavourites = JSON.parse(localStorage.getItem("react-my-movie-app-favourites"));
  setFavourites(movieFavourites);
},[]);


const saveToLocalStorage =(items) =>{
  localStorage.setItem("react-my-movie-app-favourites",JSON.stringify(items))
}

const addFavouriteMovie = (movie) =>{
  const newFavouriteList = [...favourites, movie];
  setFavourites(newFavouriteList);
  saveToLocalStorage(newFavouriteList)
}
const RemoveFavouriteMovie = (movie)=>{
  const newFavouriteList = favourites.filter((favourite)=> favourite.imdbID !== movie.imdbID);
  setFavourites(newFavouriteList);
  saveToLocalStorage(newFavouriteList)
}





  return <div className="container-fluid movie-app"> 
  <div className="row d-flex align-items-center mt-4 mb-4">
<MovieListHeading heading = "Movies"/>
<SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
  </div>
  <div className="row">
    <MovieList movies = {movies} handleFavouritesClick={addFavouriteMovie} favouriteComponent={AddFavourites}/>
    </div>
    <div className="row d-flex align-items-center mt-4 mb-4">
<MovieListHeading heading = "Favourites"/>
</div>
<div className="row">
  <MovieList movies = {favourites} handleFavouritesClick={RemoveFavouriteMovie} favouriteComponent={RemoveFavourites}/>
  </div>
  </div>; 
}

export default App;
