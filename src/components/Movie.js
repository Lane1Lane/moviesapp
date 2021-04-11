import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startRemoveMovie, startEditMovie, startAddMovie } from '../actions/movies';

const Movie = (props) => {

    const dispatch = useDispatch();

    const movie = useSelector(state => state.movies.find(movie => movie.id === props.match.params.id));

    const [title,setTitle] = useState(movie ? movie.Title : '');
    const [releaseYear,setReleaseYear] = useState(movie ? movie['Release Year'] : '');
    const [format,setFormat] = useState(movie ? movie.Format : '');
    const [stars,setStars] = useState(movie ? movie.Stars: '');

    return (
        <div className="content-container">
            <br></br>
                <div>
                    <h3>Информация о фильме</h3>
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
                        onChange={(e) => setReleaseYear(e.target.value)}
                    />
                    </label>
                    <br/>
                    <label>Format:
                    <input
                        type="text"
                        className="text-input"
                        value={format}
                        onChange={(e) => setFormat(e.target.value)}
                    />
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
                </div>
            <div className='content-container_buttons'>
                {(movie) ? 
                <div className='content-container_buttons'>
                    <button className="button" onClick={()=>{dispatch(startEditMovie(props.match.params.id, {'Title': title, 'Release Year': releaseYear, 'Format': format, 'Stars': stars})); props.history.push('/');}}>Сохранить</button>
                    <button className="button" onClick={()=>{dispatch(startRemoveMovie(props.match.params.id)); props.history.push('/');}}>Удалить</button>
                </div>:
                <div>
                    <button className="button" onClick={()=>{dispatch(startAddMovie({'Title': title, 'Release Year': releaseYear, 'Format': format, 'Stars': stars})); props.history.push('/');}}>Добавить</button>
                </div>}
                
                <div>
                    <button className="button" onClick={()=>{props.history.push('/');}}>Вернуться к списку</button>
                </div>
            </div>
        </div>
    )
}; 

export default Movie;


