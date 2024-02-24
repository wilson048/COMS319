function getInputValue() {
    let movieName = document.forms["my_form"]["inputMovieName"];
    let inputMovieName = movieName.value;

    fetch('wvchu_Activity08_MoviesFromJSON.json')
        .then(response => response.json())
        .then(myMovies => loadMovies(myMovies));

    function loadMovies(myMovies) {
        var mainContainer = document.getElementById("goodmovies");

        for(var i = 0; i < myMovies.movies.length; i++) {
            let title = myMovies.movies[i].title;
            let year = myMovies.movies[i].year;
            let img = myMovies.movies[i].url;

            if(title === inputMovieName) {
                console.log("Title " + i + ": " + title + " Year: " + year);

                let div = document.createElement("div");
                div.innerHTML = `<h3> ${title} </h3>
                <br> Year: ${year} 
                <br> <img src = ${img} width="200"> <br> <br>`;
                mainContainer.appendChild(div);
            }
        }
    }
}

