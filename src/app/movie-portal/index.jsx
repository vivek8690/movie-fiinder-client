import React, { useState, useRef, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import _ from "lodash";
import toast from 'toasted-notes';
import { MovieListing, SearchComponent } from "./components";
import { getMovies, deleteMovieDetails, updateMovieDetails, addMovieDetails } from "../utils/movie.api";
import MovieComponent from './components/Movie-details';
import { getCategories } from "../utils/category.api";

function MoviePortal() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState({});
  const [openMovie, displayMovie] = useState(false);
  const [movie, currentMovie] = useState({});
  const [action, setAction] = useState('Add');
  const [categories, setCategories] = useState([]);


  const openMovieModal = () => {
    return <MovieComponent show={openMovie}
      onHide={closeModal} action={action}
      movieObj={movie} actioncallback={actioncallback} />
  }

  const closeModal = () =>{
    currentMovie({});
    displayMovie(false);
  }

  const fetchMovies = async (query) => {
    try {
      const movies = await getMovies(query);
      setMovies(movies.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  const fetchCategories = async () => {
    try {
      const categories = await getCategories();
      const options = categories.data.data.map((cat,index) => {
        const obj = {};
        obj.value = cat.type;
        obj.label = cat.type;
        obj.key = index;
        return obj;
      })
      setCategories(options);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const editMovie = (movie) => {
    setAction('Edit');
    displayMovie(true);
    currentMovie({ ...movie });
  }

  const addMovie = () => {
    setAction('Add');
    displayMovie(true);
    currentMovie({ ...movie });
  }

  const actioncallback = async (action, movie) => {
    let resp;
    try {
      movie.genre = movie.genre ? movie.genre.map(cat => cat.value) : [];
      if (action === 'Edit') {
        resp = await updateMovieDetails(movie);
      } else {
        resp = await addMovieDetails(movie);
      }
      toast.notify(`"${resp.data.data.name}" ${resp.data.message}`, {
        position: 'top',
      });
      displayMovie(false);
      currentMovie({});
    } catch (err) {
      console.log(err);
    }
    fetchMovies(query);
    fetchCategories();
  }

  const deleteMovie = async (movie) => {
    localStorage.setItem('role', 'admin')
    try {
      const resp = await deleteMovieDetails(movie._id);
      toast.notify(`"${resp.data.data.name}" ${resp.data.message}`, {
        position: 'top',
      });
      fetchMovies(query);
    } catch (err) {
      console.log(err);
    }
  }



  const debounceSearch = useRef(
    _.debounce(query => {
      fetchMovies(query);
      setQuery(query);
    }, 1000)
  );

  const onHandleChange = (query) => {
    debounceSearch.current(query);
  }

  return (
    <Container>
      <SearchComponent onHandleChange={onHandleChange}
        newMovie={addMovie} categories={categories} />
      <hr />
      {movies ? <MovieListing movies={movies} deleteMovie={deleteMovie}
        editMovie={editMovie} /> : ''}
      {openMovieModal()}
    </Container>
  )
}

export default MoviePortal;