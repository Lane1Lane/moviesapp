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
        return (b.Title < a.Title) ? 1 : -1;
    }));
  const pageNumbers = useSelector(state => {
    let pageNumbers = [];
    for (let i = 1; i <= Math.ceil(selectMovies(state.movies,searchText).length / moviesInPage); i++) {
      pageNumbers.push(i);
    };
    return pageNumbers;
  });

  
  const showFile = async (e) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => { 
      const text = (e.target.result);
      text.split("\r\n\r\n").map(movie => {let arr = movie.split("\r\n").map(movie => {let obj = {}; let arr = movie.split(": "); obj[arr[0]]=arr[1]; return obj}); return Object.assign({},...arr)}).forEach(movie => dispatch(startAddMovie(movie)));
    };
    reader.readAsText(e.target.files[0])
  }

  return (
    <div className="content-container">
      <div className='content-container_buttons'>
        <input
          type="file" 
          accept='.txt'
          onChange={(e)=>showFile(e)} 
        />
        <div>
            <Link className="button" to="/create">Добавить фильм</Link>
        </div>
      </div>

      <input
          type="text"
          className="text-input"
          value={searchText}
          onChange={(e) => {setCurrentPage(1); setSearchText(e.target.value)}}
          placeholder="Поиск по названию фильма или актерам"
      />

      {movies.slice((currentPage-1)*moviesInPage,currentPage*moviesInPage).map(movie => <MoviesRow {...movie} key={movie.id}/>)}
      <ul className="page-numbers">
        {pageNumbers.map(number => <li key={number} id={number} onClick={(e) => {setCurrentPage(e.target.id); dispatch(setCurrentPageBase(e.target.id))}} className={number === parseInt(currentPage) ? 'selected-list' : ''}>{number}</li>)}
      </ul>
    </div>
  )
};



export default DashboardPage;
