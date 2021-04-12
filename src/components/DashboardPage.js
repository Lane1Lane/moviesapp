import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MoviesRow from './MoviesRow';
import { v4 as uuidv4 } from 'uuid';
import { startAddMovie } from '../actions/movies';
import { setCurrentPageBase } from '../actions/filters';
import { Link } from 'react-router-dom';
import selectMovies from '../selectors/movies';

const moviesInPage = 10;

const DashboardPage = (props) => {
  const [currentPage,setCurrentPage] = useState(useSelector(state => state.filters.currentPage));
  const [searchText,setSearchText] = useState('');

  const dispatch = useDispatch();

  const movies = useSelector(state => selectMovies(state.movies,searchText).sort((a, b) => {
        return (b.Title.toLowerCase() < a.Title.toLowerCase()) ? 1 : -1;
    }));

  const moviesAll = useSelector(state => state.movies);

  const pageNumbers = useSelector(state => {
    let pageNumbers = [];
    for (let i = 1; i <= Math.ceil(selectMovies(state.movies,searchText).length / moviesInPage); i++) {
      pageNumbers.push(i);
    };
    return pageNumbers;
  });

  const check = (movie) => {
    let error = false;
    if (!movie.Title || !movie['Release Year'] || !movie.Format || !movie.Stars ) {error = true} else
    {if (movie['Release Year'] && (movie['Release Year'] < 1850 || movie['Release Year'] > 2020)) {error = true} else
    {const movieExist = moviesAll.find(movieA => (movieA.Title.toLowerCase() === movie.Title.toLowerCase() && movieA.Format === movie.Format && movieA['Release Year'] === movie['Release Year'] && movieA.Stars.split(',').map(star => star.toLowerCase().trim()).sort((a, b) => {return (b < a) ? 1 : -1;}).join(', ') === movie.Stars.split(',').map(star => star.toLowerCase().trim()).sort((a, b) => {return (b < a) ? 1 : -1;}).join(', ') ));
    if (movieExist) {error = true} else
    {const starsArr = movie.Stars.split(',');
    const starsSet = [...new Set(starsArr)];
    if (starsSet.length < starsArr.length) {movie.Stars = starsSet.split(',')}}}}
    if (!error) {dispatch(startAddMovie(movie))}; 
  };
  
  const showFile = async (e) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => { 
      const text = (e.target.result);
      text.includes("\r\n") ? text.split("\r\n\r\n").map(movie => {let arr = movie.split("\r\n").map(movie => {let obj = {}; let arr = movie.split(": "); obj[arr[0]]=arr[1]; return obj}); return Object.assign({},...arr)}).forEach(movie => check(movie)) :
      text.split("\n\n").map(movie => {let arr = movie.split("\n").map(movie => {let obj = {}; let arr = movie.split(": "); obj[arr[0]]=arr[1]; return obj}); return Object.assign({},...arr)}).forEach(movie => check(movie));;
    };
    reader.readAsText(e.target.files[0])
  };

  return (
    <div className="content-container">
      <div className='content-container_buttons'>
        <input
          type="file" 
          accept='.txt'
          onChange={(e)=>showFile(e)} 
        />
        <div>
            <Link className="button" to="/create">Add movie</Link>
        </div>
      </div>

      <input
          type="text"
          className="text-input"
          value={searchText}
          onChange={(e) => {setCurrentPage(1); setSearchText(e.target.value)}}
          placeholder="Search by Title or Stars"
      />
      {!movies.length && searchText ? 'Nothing found' : ''}
      {movies.slice((currentPage-1)*moviesInPage,currentPage*moviesInPage).map(movie => <MoviesRow {...movie} key={movie.id}/>)}
      <ul className="page-numbers">
        {pageNumbers.map(number => <li key={number} id={number} onClick={(e) => {setCurrentPage(e.target.id); dispatch(setCurrentPageBase(e.target.id))}} className={number === parseInt(currentPage) ? 'selected-list' : ''}>{number}</li>)}
      </ul>
    </div>
  )
};



export default DashboardPage;
