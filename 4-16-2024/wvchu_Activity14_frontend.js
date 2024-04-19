fetch("http://localhost:8081/listRobots")
  .then((response) => response.json())
  .then((myMovies) => loadMovies(myMovies));

function loadMovies(myMovies) {
  var mainContainer = document.getElementById("col");
  var checkBoxes = [];
  var cards = [];
  for (var i = 0; i < myMovies.length; i++) {
    let title = myMovies[i].name;
    let year = myMovies[i].price;
    let img = myMovies[i].imageUrl;
    let description = myMovies[i].description;

    let checkbox = "checkbox" + i.toString();
    let card = "card" + i.toString();

    console.log("Title " + i + ": " + title + " Year: " + year);

    let div = document.createElement("div");
    div.innerHTML = `<input type="checkbox" id=${checkbox} class="form-check-input" checked>
        <label for=${checkbox} class="form-check-label">Show Image ${i}</label>
        <div id=${card} class="card shadow-sm">
        <img src=${img} class="card-img-top" alt="..."></img>
            <div class="card-body">
                <p class="card-text"> <strong>${
                  i + 1
                } ${title}</strong>, $${year}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <small class="text-body-secondary">${description}</small>
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
    checkBoxParam.addEventListener("change", () => {
      if (checkBoxParam.checked) {
        cards[index].style.display = "block"; // Show the card
      } else {
        cards[index].style.display = "none"; // Hide the card
      }
    });
  });
}

function getInputValue() {
  let movieName = document.forms["my_form"]["inputMovieName"];
  let inputMovieName = movieName.value;

  fetch("http://localhost:8081/listRobots")
    .then((response) => response.json())
    .then((myMovies) => loadMovies(myMovies));

  function loadMovies(myMovies) {
    var mainContainer = document.getElementById("col");

    for (var i = 0; i < myMovies.length; i++) {
      let title = myMovies[i].name;
      let year = myMovies[i].price;
      let img = myMovies[i].imageUrl;
      let description = myMovies[i].description;

      if (title == inputMovieName) {
        console.log("Title " + i + ": " + title + " Year: " + year);

        let div = document.createElement("div");
        div.innerHTML = `
        <div class="card shadow-sm">
        <img src=${img} class="card-img-top" alt="..."></img>
            <div class="card-body">
                <p class="card-text"> <strong> ${title}</strong>, $${year}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <small class="text-body-secondary">${description}</small>
                </div>
            </div>
        </div>`;
        mainContainer.appendChild(div);
      }
    }
  }
}
