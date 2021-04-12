import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startRemoveMovie, startEditMovie, startAddMovie } from '../actions/movies';

const Movie = (props) => {

    const dispatch = useDispatch();

    const movie = useSelector(state => state.movies.find(movie => movie.id === props.match.params.id));
    const movies = useSelector(state => state.movies);

    const [title,setTitle] = useState(movie ? movie.Title : '');
    const [releaseYear,setReleaseYear] = useState(movie ? movie['Release Year'] : '');
    const [format,setFormat] = useState(movie ? movie.Format : '');
    const [stars,setStars] = useState(movie ? movie.Stars: '');
    const [error,setError] = useState('');

    const onAddEdit = () => {
        let error = [];
        let emptyFields = [];
        if (!title) {emptyFields.push('Title')};
        if (!releaseYear) {emptyFields.push('Release Year')};
        if (!format) {emptyFields.push('Format')};
        if (!stars) {emptyFields.push('Stars')};
        if (emptyFields.length) {error.push('Required fields: ' + emptyFields.join(', '))}

        if (releaseYear && (releaseYear < 1850 || releaseYear > 2020)) {error.push('Release Year has to be between 1850 and 2020')};

        if (!movie) {
            const movieExist = movies.find(movie => (movie.Title.toLowerCase() === title.toLowerCase() && movie.Format === format && movie['Release Year'] === releaseYear && movie.Stars.split(',').map(star => star.toLowerCase().trim()).sort((a, b) => {return (b < a) ? 1 : -1;}).join(', ') === stars.split(',').map(star => star.toLowerCase().trim()).sort((a, b) => {return (b < a) ? 1 : -1;}).join(', ') ));
            if (movieExist) {error.push('Movie already exists')};

            const starsArr = stars.split(',').map(star => star.toLowerCase().trim()).sort((a, b) => {return (b < a) ? 1 : -1;});
            const starsSet = [...new Set(starsArr)];
            if (starsSet.length < starsArr.length) {error.push('Same star written several times')};
        };

        

        if (error.length) {
            setError(error.join(' <> '))
        } else
        {
            (movie) ? dispatch(startEditMovie(props.match.params.id, {'Title': title, 'Release Year': releaseYear, 'Format': format, 'Stars': stars})) : dispatch(startAddMovie({'Title': title, 'Release Year': releaseYear, 'Format': format, 'Stars': stars})); 
            props.history.push('/');
        };
    };

    return (
        <div className="content-container">
            <br></br>
                <div>
                    <h3>Movie info</h3>
                    <label>Title:
                    <input
                        type="text"
                        className="text-input"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        autoFocus
                    />
                    </label>
                    <br/>
                    <label>Release Year:
                    <input
                        type="text"
                        className="text-input"
                        value={releaseYear}
                        onChange={(e) => {const year = e.target.value; if (!year || year.match(/^\d+$/)) {setReleaseYear(e.target.value)}}}
                    />
                    </label>
                    <br/>
                    <label>Format:
                    <select
                        className="text-input"
                        value={format}
                        onChange={(e) => setFormat(e.target.value)}
                        >
                        <option></option>
                        <option>DVD</option>
                        <option>VHS</option>
                        <option>Blu-Ray</option>
                    </select>
                    </label>
                    <br/>
                    <label>Stars:
                    <input
                        type="text"
                        className="text-input"
                        value={stars}
                        onChange={(e) => setStars(e.target.value)}
                    />
                    </label>
                    <br/>
                    {error}
                </div>
            <div className='content-container_buttons'>
                {(movie) ? 
                <div className='content-container_buttons'>
                    <button className="button" onClick={onAddEdit}>Save</button>
                    <button className="button" onClick={()=>{if (confirm("Are you sure…?")) {dispatch(startRemoveMovie(props.match.params.id)); props.history.push('/')}}}>Remove</button>
                </div>:
                <div>
                    <button className="button" onClick={onAddEdit}>Add</button>
                </div>}
                
                <div>
                    <button className="button" onClick={()=>{props.history.push('/');}}>Back to list</button>
                </div>
            </div>
        </div>
    )
}; 

export default Movie;


