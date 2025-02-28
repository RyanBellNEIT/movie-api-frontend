import './App.css';
import api from './api/axiosConfig';
import {useState, useEffect} from 'react';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';
import NotFound from './components/notFound/NotFound';
import Login from './components/login/Login';
import Register from './components/register/Register';
import AuthProvider from './api/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';


function App() {

  const [movies, setMovies] = useState();
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState();

  const getMovies = async () =>{

    try{
      const response = await api.get("/api/v1/movies");

      setMovies(response.data);
    }
    catch(err){
      console.log(err);
    }
  }

  const getMovieData = async (movieId) => {

    try
    {
      const response = await api.get(`/api/v1/movies/${movieId}`);

      const singleMovie = response.data;

      setMovie(singleMovie);

      setReviews(singleMovie.reviews);
    }
    catch(err)
    {

    }
  }

  useEffect(() =>{
    getMovies();
  }, [])

  return (
    <AuthProvider>
      <div className="App">
        <Header/>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route path='/' element={<Home movies={movies}/>}></Route>
            <Route path='/trailer/:ytTrailerId' element={<Trailer/>}></Route>
            <Route path='/reviews/:movieId' element ={<Reviews getMovieData={getMovieData} movie={movie}  reviews={reviews} setReviews={setReviews}/>}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register/>}></Route>
            <Route path='/profile' element={<ProtectedRoute></ProtectedRoute>}></Route>
            <Route path="*" element = {<NotFound/>}></Route>
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
