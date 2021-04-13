import database from '../firebase/firebase';


export const addMovie = (movie) => { 
    return {
        type: 'ADD_MOVIE',
        movie
        }
    };

export const startAddMovie = (movie = {}) => {
    return (dispatch, getState) => {
        database.ref(`movies`).push(movie).then((ref) => {
        dispatch(addMovie({
            id: ref.key,
            ...movie
            }));
        })
    } 
};

export const removeMovie = ({id} = {}) => ({
    type: 'REMOVE_MOVIE',
    id
  });
  
export const startRemoveMovie = (id) => {
    return (dispatch, getState) => {
        database.ref(`movies/${id}`).remove().then(() => {
            dispatch(removeMovie({ id }));
        });
    };
};

export const setMovies = (movies) => ({
    type: 'SET_MOVIES',
    movies
  });
  
  export const startSetMovies = () => {
    return (dispatch, getState) => {
      return database.ref(`movies`).once('value', (snapshot) => {
        const movies = [];
        snapshot.forEach((oneSnap) => {
          movies.push({
            id: oneSnap.key,
            ...oneSnap.val()
          });
        });
        dispatch(setMovies(movies))
      });
    };
  };

  export const editMovie = (id, updates) => ({
    type: 'EDIT_MOVIE',
    id,
    updates
  });
  
  export const startEditMovie = (id, updates) => {
    return (dispatch, getState) => {
      database.ref(`movies/${id}`).update({
        ...updates
      }).then(() => {
        dispatch(editMovie(id, updates));
      });
    };
  };