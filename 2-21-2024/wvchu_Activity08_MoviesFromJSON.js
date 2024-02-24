
fetch('wvchu_Activity08_MoviesFromJSON.json')
    .then(response => response.json())
    .then(myMovies => loadMovies(myMovies));

function loadMovies(myMovies) {
    var mainContainer = document.getElementById("goodmovies");

    for(var i = 0; i < myMovies.movies.length; i++) {
        let title = myMovies.movies[i].title;
        let year = myMovies.movies[i].year;
        let img = myMovies.movies[i].url;

        console.log("Title " + i + ": " + title + " Year: " + year);

        let div = document.createElement("div");
        div.innerHTML = `<h3> ${title} </h3>
        <br> Year: ${year} 
        <br> <img src = ${img} width="200"> <br> <br>`;
        mainContainer.appendChild(div);
    }
}


