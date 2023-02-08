"use strict";

//TODO: implement firebase for a backend to store all the saved movies

//TODO: implement a real movie API to grab movies for the page (Add would populate options as you type to add)

// URL for Glitch fake Movies API
const urlGlitch = 'https://hissing-acute-crafter.glitch.me/movies'

// GRAB MOVIE TILES CONTAINER
const movieTileContainer = document.querySelector("#movie-tiles-container");

// GRAB ADD MOVIE FORM
const addForm = document.querySelector('#addMovieForm')

// GRAB EDIT MOVIE FORM
const editForm = document.querySelector('#editMovieForm')


//REFRESH MOVIE RUNS ON THE CLICK OF 'SAVE' IN ADD NEW MOVIE
const refreshMovieList = async () => {
    await getAddValues(); // post request for the new movie
    await allMoviesAdded(); // get all movie data and populate cards
    await addForm.reset(); // resets the form so fields empty
};


// ADD NEW MOVIE DATA TO SERVER (POST REQUEST)
const getAddValues = async () => {
    try {
        const director = document.querySelector("#director").value;
        const title = document.querySelector('#movieTitle').value;
        const rating = document.querySelector('#rating').value;
        const res = axios.post(urlGlitch, {
            title: `${title}`,
            director: `${director}`,
            rating: `${rating}`
        });
        console.log(`you did it`)
        return res;
    } catch (e) {
        return `add Movie is broken, fix it! ${e}`
    }
};

// GET ALL MOVIE DATA -- GET REQUEST FOR ALL MOVIE DATA FROM GLITCH
const getMoviesData = async () => {
    try {
        const res = await axios.get(urlGlitch);
        return res.data; // res = an array with each movie as an object
    } catch (e) {
        console.log("ERROR", e);
    }
};

// ADD ALL MOVIE TILES ON PAGE
const allMoviesAdded = async () => {
    movieTileContainer.setHTML(``);
    let allMovieData = await getMoviesData() // runs get request for all movies from glitch
    for (let movie of allMovieData) {
        const createTile = document.createElement("div") //creates a div for every movie in the datalist
        createTile.setAttribute("class", "card flex-fill d-flex movie-tile col-3 g-3 mx-2 p-3"); //sets attributes for card
        createTile.setHTML // sets all html inside new moviecard div
            (` <div class="container-fluid flex-fill d-flex">
                                <!--movie info section-->
                                <div class="content">
                                    <div class="title h1">${movie.title}</div>
                                    <div class="h3 director">${movie.director}</div>
                                    <div class="h3 rating">${movie.rating}</div>
                                </div>
                                </div>
<div class="footer align-self-end justify-content-end d-flex">
             <button class="cardButtonEdit m-1" id="edit${movie.id}" type="button">
                  <i class="fa-solid fa-wand-magic-sparkles"></i> Edit</button>
             <button class="cardButtonDelete m-1" id="${movie.id}" type="button"><i class="fa-solid fa-trash-can"></i>Delete</button>
</div>`
            );
        movieTileContainer.append(createTile) // adds all the new creatTile divs into the movie til container
    }
    getDelete(); // running the get delete here associates the movie id with its button
    getEdit();
};

allMoviesAdded(); // initial call to retrieve all the movie data and populate the cards

// DELETE BUTTON FUNCTIONALITY
function getDelete() { // this adds the event listener to each particular button and passes the deleteRequest function with the id as a parameter
    const deleteButtons = document.querySelectorAll('.cardButtonDelete')
    for (let button of deleteButtons) {
        let movieId = button.id
        button.addEventListener("click", function () {
            deleteRequest(movieId)
        }, false)
        //console.log(button)
    }
}

// EDIT BUTTON FUNCTIONALITY
function getEdit() {
    const editButtons = document.querySelectorAll('.cardButtonEdit')
    for (let button of editButtons) {
        let movieId = button.id
        button.addEventListener("click", function () {
            console.log(movieId) // need function that opens the edit modal
        }, false)
    }
}

//TODO: remove timeout on loader and add functionality that it actually shows loader message ONLY when data is taking a while to render

// SHOW/HIDE LOADER AND MOVIES
// TIMEOUT FUNCTION
function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// HIDE LOADER
const toggleLoading = async () => {
    let loader = document.querySelector('#loader-container')
    loader.classList.add('hidden')
}
toggleLoading();
// SHOW MOVIE CONTAINER
const showMovies = async () => {
    // await timeout(1300)
    let movieContainer = document.querySelector('#movie-container')
    movieContainer.classList.remove('hidden')
}
// FUNCTION TO RUN BOTH THE ADD CLASS TO LOADER AND REMOVE CLASS FROM MOVIE CONTAINER
const mainFunc = async () => {
    await toggleLoading();
    await showMovies();
}

mainFunc()
// END SHOW / HIDE LOADER & MOVIES


//DELETE MOVIE FUNCTION - SENDS DELETE REQUEST
async function deleteRequest(id) {
    try {
        await axios.delete(`${urlGlitch}/${id}`)
        await timeout(1200)
        console.log('WINNING')
        allMoviesAdded()
    } catch (e) {
        console.log(`delete request failed, ${e}`)
    }
}

// EDIT REFRESH -
const editRefresh = async () => {
    await editRequest(); // patch request for the new movie
    // await deleteMovie()
    //await movieTileContainer.setHTML('');
    await allMoviesAdded(); // get all movie data and populate cards
    await editForm.reset(); // resets the form so fields empty
};

//EDIT MOVIE FUNCTION - SENDS PATCH REQUEST
async function editRequest(id) {
    try {
        const director = document.querySelector("#editDirector").value;
        const title = document.querySelector('#editMovieTitle').value;
        const rating = document.querySelector('#editRating').value;
        const id = document.querySelector('#editID').value;
        const res = axios.patch(`${urlGlitch}/${id}`, {
            title: `${title}`,
            director: `${director}`,
            rating: `${rating}`
        });
        await timeout(1200)
        console.log('EDIT WIN')
        allMoviesAdded()
        console.log(res)
    } catch (e) {
        console.log(`edit request failed, ${e}`)
    }
}

