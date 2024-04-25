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
    let id = myMovies[i].id;

    let checkbox = "checkbox" + i.toString();
    let card = "card" + i.toString();

    console.log("Title " + i + ": " + title + " Year: " + year);

    let div = document.createElement("div");
    div.id = id;

    div.innerHTML = `<input type="checkbox" class="form-check-input" checked>
        <label for=${checkbox} class="form-check-label">Show Image ${id}</label>
        <div id=${card} class="card shadow-sm">
        <img src=${img} class="card-img-top" alt="..."></img>
            <div class="card-body">
                <p class="card-text"> <strong>${id} ${title}</strong>, $${year}</p>
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
      let id = myMovies[i].id;

      if (title == inputMovieName) {
        console.log("Title " + i + ": " + title + " Year: " + year);

        let div = document.createElement("div");
        div.id = id;
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

function addOneRobot() {
  // Fetch the value from the input field
  let id = Number(document.getElementById("addRobotId").value);
  let name = document.getElementById("addRobotName").value;
  let description = document.getElementById("addRobotDescription").value;
  let price = Number(document.getElementById("addRobotPrice").value);
  let imageUrl = document.getElementById("addRobotURL").value;
  console.log(id);
  fetch(`http://localhost:8081/addRobot`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      id: id,
      name: name,
      price: price,
      description: description,
      imageUrl: imageUrl,
    }),
  })
    .then((response) => response.json())
    .then((addThisRobot) => {
      addOneRobotById({
        id: id,
        name: name,
        price: price,
        description: description,
        imageUrl: imageUrl,
      });
    });
}

function addOneRobotById(json) {
  let title = json.name;
  let year = json.price;
  let img = json.imageUrl;
  let description = json.description;
  let id = json.id;

  var mainContainer = document.getElementById("col");
  let div = document.createElement("div");
  div.id = id;
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

function deleteOneRobot() {
  // Fetch the value from the input field
  let id = document.getElementById("deleteRobotById").value;
  console.log(id);
  fetch(`http://localhost:8081/deleteRobot/${id}`, {
    method: "DELETE",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ id: id }),
  })
    .then((response) => response.json())
    .then(() => {
      deleteOneRobotById(id);
    });
}

function deleteOneRobotById(id) {
  let thingToRemove = document.getElementById(id);
  var mainContainer = document.getElementById("col");
  mainContainer.removeChild(thingToRemove);
}
function updateOneRobot() {
  // Fetch the value from the input field
  let id = Number(document.getElementById("updateRobotById").value);
  let price = Number(document.getElementById("updateRobotPrice").value);
  console.log(id);
  fetch(`http://localhost:8081/updateRobot/${id}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      id: 5,
      name: "Robot Abraham ALDACO-GASTELUM",
      price: price,
      description: "I robot is one example of an image for my exercise",
      imageUrl: "https://robohash.org/Abraham",
    }),
  })
    .then((response) => response.json())
    .then(() => {
      updateOneRobotById({
        id: 5,
        name: "Robot Abraham ALDACO-GASTELUM",
        price: price,
        description: "I robot is one example of an image for my exercise",
        imageUrl: "https://robohash.org/Abraham",
      });
    });
}

function updateOneRobotById(json) {
  let thingToRemove = document.getElementById(json.id);
  var mainContainer = document.getElementById("col");
  mainContainer.removeChild(thingToRemove);

  let thingToUpdate = document.createElement("div");
  thingToUpdate.id = json.id;
  thingToUpdate.innerHTML = `
        <div class="card shadow-sm">
        <img src=${json.imageUrl} class="card-img-top" alt="..."></img>
            <div class="card-body">
                <p class="card-text"> <strong> ${json.name}</strong>, $${json.price}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <small class="text-body-secondary">${json.description}</small>
                </div>
            </div>
        </div>`;
  mainContainer.appendChild(thingToUpdate);
}
