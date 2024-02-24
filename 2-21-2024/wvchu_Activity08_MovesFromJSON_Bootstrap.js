fetch('wvchu_Activity08_MoviesFromJSON.json')
    .then(response => response.json())
    .then(myMovies => loadMovies(myMovies));

function loadMovies(myMovies) {
    var mainContainer = document.getElementById("col");;
    var checkBoxes = [];
    var cards = [];
    for(var i = 0; i < myMovies.movies.length; i++) {
        let title = myMovies.movies[i].title;
        let year = myMovies.movies[i].year;
        let img = myMovies.movies[i].url;

        let checkbox = "checkbox" + i.toString();
        let card = "card" + i.toString();

        console.log("Title " + i + ": " + title + " Year: " + year);

        let div = document.createElement("div");
        div.innerHTML = 
        `<input type="checkbox" id=${checkbox} class="form-check-input" checked>
        <label for=${checkbox} class="form-check-label">Show Image ${i}</label>
        <div id=${card} class="card shadow-sm">
        <img src=${img} class="card-img-top" alt="..."></img>
            <div class="card-body">
                <p class="card-text"> <strong>${title}</strong>, ${year}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                        <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                        <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                    </div>
                    <small class="text-body-secondary">9 mins</small>
                </div>
            </div>
        </div>`;
        mainContainer.appendChild(div);

        let cbox = document.getElementById(checkbox);
        checkBoxes.push(cbox);
        let ccard = document.getElementById(card);
        cards.push(ccard);

        console.log(checkbox);
        console.log(card);
    }
    console.log(checkBoxes);
    console.log(cards);

    checkBoxes.forEach((checkBoxParam, index) => {
        console.log(index);
        checkBoxParam.addEventListener('change', () => {
        if (checkBoxParam.checked) {
            cards[index].style.display = 'block'; // Show the card
        } else {
            cards[index].style.display = 'none'; // Hide the card
        }
        });
    });
}