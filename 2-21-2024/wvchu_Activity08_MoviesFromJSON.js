fetch('C:/Users/Wilson Chu/Desktop/aCOMS319/netId_Activity08_MoviesFromJSON.json')
    .then(response => response.json())
    .then(myMovies => loadMovies(myMovies));

function loadMovies(myMovies) {
    var mainContainer = document.getElementById("goodmovies");

    for(var i = 0; i < myMovies.moives.length; i++) {
        let title = myMovies.moives[i].title;
        let year = myMovies.moives[i].year;
        let img = myMovies.moives[i].url;

        let div = document.createElement("div");
        div.innerHTML = `<h3> ${title} </h3>
        <br> Year: ${year} 
        <br> <img src = ${img}>`;
        mainContainer.appendChild(div);
    }
}


