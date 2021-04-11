export default (movies, search) => {
    return movies.filter(movie => {
        const titleMatch = movie.Title.toLowerCase().includes(search.toLowerCase());
        const starsMatch = movie.Stars.toLowerCase().includes(search.toLowerCase());
        return titleMatch || starsMatch;
    });
};