import React from 'react';
import { Link } from 'react-router-dom';


const MoviesRow = (movie) => {
    return (
    <div>
        <Link name={movie.id} className="list-item" to={`/movies/${movie.id}`}>
            <h3>{movie.Title} ({movie['Release Year']})</h3>
        </Link>
    </div>
    
)};

export default MoviesRow;