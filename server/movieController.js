const movies = require('./db.json')
let globalID = 11;

const getAllMovies = (req, res) => {
    res.status(200).send(movies)
}

const deleteMovie = (req, res) => {
        const movies = require('./db.json');
        const { id } = req.params;
        for(let i = 0; i < movies.length; i++){
            if(movies[i].id === +id){
                movies.splice(i, 1);
                res.status(200).send(movies);
                return;
            }
        }
        res.status(400).send(movies);
    }
const addMovie = (req, res) => {
    const{ title, rating, imageURL } = req.body; // destructuring = readability when refrencing
    movies.push({
        title,
        rating,
        imageURL,
        id:globalID, //defined at he global scope using the last id +1
    })
    globalID++ //increases the global ID so it's ready for the next addition
    res.status(200).send(movies);
}

const updateRating = (req, res) => {
    const { id } = req.params;
    const { type } = req.body; // this is a string of "plus" or "minus to manipulate the rating

    const movieIndex = movies.findIndex((movie) => movie.id === +id); // this could be replaced with a for loop
    const movieToAdjust = movies[movieIndex]
    if(type === 'plus' && movieToAdjust.rating< 5){
        movieToAdjust.rating++
    } else if (type === 'minus' && movieToAdjust.rating >1){
        movieToAdjust.rating--
    }
    res.status(200).send(movies);
}

module.exports = { // This tells node we have the ability to grab these in another file. 
    getAllMovies, 
    deleteMovie, 
    addMovie,
    updateRating,
};