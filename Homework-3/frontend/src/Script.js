import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.css";

import "./App.css";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [dataF, setDataF] = useState({});
  const [viewer, setViewer] = useState(0);
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [query, setQuery] = useState("");

  async function viewProducts(viewNum) {
    const response = await fetch("http://localhost:8081/listProducts");
    const myProducts = await response.json();
    return loadProducts(myProducts, viewNum);
  }

  function loadProducts(myProducts, viewNum) {
    let mainContainer = document.getElementById("col");
    mainContainer.innerHTML = ``;
    mainContainer.className =
      "row row-cols-1 row-cols-sm-2 row-cols-md-3 rows-cols-lg-4 g-3";
    for (var i = 0; i < myProducts.length; i++) {
      let title = myProducts[i].title;
      let price = myProducts[i].price;
      let img = myProducts[i].image;
      let description = myProducts[i].description;
      let category = myProducts[i].category;
      let id = myProducts[i].id;
      let rate = myProducts[i].rating.rate;
      let count = myProducts[i].rating.count;

      let div = document.createElement("div");
      div.id = id;
      // Image
      let imgEl = document.createElement("img");
      imgEl.src = img;
      imgEl.className = "card-img-top";
      imgEl.alt = "...";
      // Card body
      let cardBody = document.createElement("div");
      cardBody.className = "card-body";

      // P elements
      let p1 = document.createElement("p");
      p1.className = "card-text";
      p1.innerHTML = `<strong>${id} ${title}</strong>, $${price}`;

      let p2 = document.createElement("p");
      p2.className = "card-text";
      p2.innerHTML = `Category: ${category}`;

      let p3 = document.createElement("p");
      p3.className = "card-text";
      p3.innerHTML = `Rate: ${rate}, Count: ${count}`;
      // Inner Div Element
      let iDiv = document.createElement("div");
      iDiv.className = "d-flex justify-content-between align-items-center";
      iDiv.innerHTML = `<small class="text-body-secondary">${description}</small>`;
      // Append to card body
      cardBody.appendChild(p1);
      cardBody.appendChild(p2);
      cardBody.appendChild(p3);
      cardBody.appendChild(iDiv);
      // Append to div
      div.appendChild(imgEl);
      div.appendChild(cardBody);
      // div.innerHTML = `<div id=${id} class="card shadow-sm">
      //   <img src=${img} class="card-img-top" alt="..."></img>
      //       <div class="card-body">
      //           <p class="card-text"> <strong>${id} ${title}</strong>, $${price}  </p>
      //           <p class="card-text">  Category: ${category}  </p>
      //           <p class="card-text">  Rate: ${rate}, Count: ${count}  </p>
      //           <div class="d-flex justify-content-between align-items-center">
      //               <small class="text-body-secondary">${description}</small>
      //           </div>
      //       </div>
      //   </div>`;
      // Update Tab
      if (viewNum === 2) {
        // <input type="text" class="form-control" id="firstName" placeholder="" value="" required>
        //       <div class="invalid-feedback">
        //         Valid first name is required.
        //       </div>
        let input = document.createElement("input");
        input.type = "number";
        input.className = "form-control";
        input.id = "Input-" + id;
        input.placeholder = "New Price...";

        let btn = document.createElement("button");
        btn.className = "btn btn-success btn-square-md";
        btn.innerHTML = `Update`;
        btn.addEventListener("click", () => {
          let curId = id;
          let curTitle = title;

          if (
            isNaN(Number(document.getElementById("Input-" + id).value)) ||
            document.getElementById("Input-" + id).value == "" ||
            document.getElementById("Input-" + id).value == null
          ) {
            alert("Fill in empty field with a number");
            return;
          }
          let curPrice = Number(document.getElementById("Input-" + id).value);
          let curDescription = description;
          let curCategory = category;
          let curImg = img;
          let curRating = {
            rate: rate,
            count: count,
          };
          updateOneProduct({
            id: curId,
            title: curTitle,
            price: curPrice,
            description: curDescription,
            category: curCategory,
            image: curImg,
            category: curCategory,
            rating: curRating,
          });
        });
        div.childNodes[1].appendChild(input);
        div.childNodes[1].appendChild(btn);
      }
      // Delete Tab
      if (viewNum === 3) {
        let btn = document.createElement("button");
        btn.className = "btn btn-danger btn-square-md";
        btn.innerHTML = `Delete`;
        btn.addEventListener("click", () => {
          let curId = id;
          deleteOneProduct(curId);
        });
        div.childNodes[1].appendChild(btn);
      }

      mainContainer.appendChild(div);
    }
  }
  function addOneProduct() {
    // Fetch the value from the input field

    let id = Number(document.getElementById("newID").value);
    let title = document.getElementById("newTitle").value;
    let price = Number(document.getElementById("newPrice").value);
    let description = document.getElementById("newDescription").value;
    let category = document.getElementById("newCategory").value;
    let image = document.getElementById("newImage").value;
    let rate = Number(document.getElementById("newRate").value);
    let count = Number(document.getElementById("newCount").value);
    if (isNaN(id) || isNaN(price) || isNaN(rate) || isNaN(count)) {
      alert("Fill all numeric fields correctly (ID, price, rate, count)");
      return;
    }
    if (
      (title == null || title == "") &&
      (description == null || description == "") &&
      (category == null || category == "") &&
      (image == null || image == "")
    ) {
      alert(
        "Fill all text fields correctly (title, description, category, image)"
      );
      return;
    }

    console.log(id);
    fetch(`http://localhost:8081/addProduct`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        id: id,
        title: title,
        price: price,
        description: description,
        category: category,
        image: image,
        rating: {
          rate: rate,
          count: count,
        },
      }),
    })
      .then((response) => response.json())
      .then((addThisProduct) => {
        alert("Added to MongoDB");
      });
  }
  function updateOneProduct(obj) {
    // Fetch the value from the input field
    let values = Object.values(obj);
    let id = values[0];
    console.log(id);
    fetch(`http://localhost:8081/updateProduct/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(obj),
    })
      .then((response) => response.json())
      .then(() => {
        viewProducts(2);
      });
  }
  function deleteOneProduct(id) {
    // Fetch the value from the input field
    console.log(id);
    fetch(`http://localhost:8081/deleteProduct/${id}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id: id }),
    })
      .then((response) => response.json())
      .then(() => {
        viewProducts(3);
      });
  }
  function Authors() {
    return (
      <div class="container marketing">
        <div class="row">
          <div class="col-lg-4">
            {/* <svg
              class="bd-placeholder-img rounded-circle"
              width="140"
              height="140"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Placeholder"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
            >
              
            </svg> */}
            <img
              class="bd-placeholder-img rounded-circle"
              width="140"
              height="140"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Placeholder"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
              src="/Wilson.PNG"
            ></img>
            <title>Placeholder</title>
            <rect width="100%" height="100%" fill="var(--bs-secondary-color)" />
            <h2 class="fw-normal">Wilson Chu (wvchu)</h2>
            <p>Team Member for this Assignment</p>
            <p>
              <a class="btn btn-secondary" href="https://github.com/wilson048">
                My GitHub &raquo;
              </a>
            </p>
          </div>
          <div class="col-lg-4">
            <img
              class="bd-placeholder-img rounded-circle"
              width="140"
              height="140"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Placeholder"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
              src="/Anton.jpg"
            ></img>
            <h2 class="fw-normal">Anton Kordick (antkord)</h2>
            <p>Team Member for this Assignment</p>
            <p>
              <a class="btn btn-secondary" href="https://github.com/antzmon">
                My GitHub &raquo;
              </a>
            </p>
          </div>
          <div class="col-lg-4">
            <img
              class="bd-placeholder-img rounded-circle"
              width="140"
              height="140"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Placeholder"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
              src="/professor.PNG"
            ></img>
            <h2 class="fw-normal">
              Professor Abraham Netzahualcoy Aldaco Gastelum
            </h2>
            <p>Professor for the course COMS319</p>
            <p>
              <a class="btn btn-secondary" href="#">
                View details &raquo;
              </a>
            </p>
          </div>
        </div>
        <hr class="featurette-divider"></hr>

        <div class="row featurette">
          <div class="col-md-7">
            <h2 class="featurette-heading fw-normal lh-1">
              Fakestore Admin Webiste{" "}
              <span class="text-body-secondary">Assignment 3</span>
            </h2>
            <p class="lead">
              This website consists of 4 different views. The first view simply
              displays all products from MongoDB. The second view consists of a
              form in order to add a new product to MongoDB. The third view
              consits of the first view's items along with a an option to update
              a item's price indivdually to MongoDB. The last view consits of
              the first view's items along with corresponding delete buttons in
              order to delete an item from MongoDB.
            </p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      {/* Navbar to navigate between screens */}
      <nav
        class="navbar navbar-expand navbar-dark bg-dark"
        aria-label="Second navbar example"
      >
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            Fakestore Admin Webiste
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsExample02"
            aria-controls="navbarsExample02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarsExample02">
            <ul class="navbar-nav me-auto">
              <li class="nav-item">
                <div class="d-lg-flex col-lg-3">
                  <button
                    class="btn btn-primary btn-square-md"
                    onClick={() => {
                      setViewer(0);
                      viewProducts(0);
                    }}
                  >
                    View
                  </button>
                </div>
              </li>
              <li class="nav-item">
                <div class="d-lg-flex col-lg-3">
                  <button
                    class="btn btn-success btn-square-md"
                    onClick={() => setViewer(1)}
                  >
                    Add
                  </button>
                </div>
              </li>
              <li class="nav-item">
                <div class="d-lg-flex col-lg-3">
                  <button
                    class="btn btn-info btn-square-md"
                    onClick={() => {
                      setViewer(2);
                      viewProducts(2);
                    }}
                  >
                    Update
                  </button>
                </div>
              </li>
              <li class="nav-item">
                <div class="d-lg-flex col-lg-3">
                  <button
                    class="btn btn-danger btn-square-md"
                    onClick={() => {
                      setViewer(3);
                      viewProducts(3);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
              <li class="nav-item">
                <div class="d-lg-flex col-lg-3">
                  <button
                    class="btn btn-light btn-square-md"
                    onClick={() => setViewer(4)}
                  >
                    Authors
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* View Products */}
      {viewer === 0 && <div id="col" class="container"></div>}
      {/* Add Products */}
      {viewer === 1 && (
        <div class="container">
          <div class="col-md-7 col-lg-8">
            <h4 class="mb-3">Add new Product</h4>

            <div class="row g-3">
              <div class="col-sm-6">
                <label for="newID" class="form-label">
                  ID
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="newID"
                  placeholder=""
                  required
                ></input>
                <div class="invalid-feedback">Valid ID is required</div>
              </div>

              <div class="col-sm-6">
                <label for="newTitle" class="form-label">
                  Title
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="newTitle"
                  placeholder=""
                  required
                ></input>
                <div class="invalid-feedback">Valid Title is required.</div>
              </div>

              <div class="col-12">
                <label for="newPrice" class="form-label">
                  Price
                </label>
                <div class="input-group has-validation">
                  <input
                    type="text"
                    class="form-control"
                    id="newPrice"
                    placeholder=""
                    required
                  ></input>
                  <div class="invalid-feedback">Your price is required.</div>
                </div>
              </div>

              <div class="col-12">
                <label for="newDescription" class="form-label">
                  Description
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="newDescription"
                  placeholder=""
                  required
                ></input>
                <div class="invalid-feedback">
                  Please enter a valid Description address for shipping updates.
                </div>
              </div>

              <div class="col-12">
                <label for="newCategory" class="form-label">
                  Category
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="newCategory"
                  placeholder=""
                  required
                ></input>
                <div class="invalid-feedback">Please enter your Category.</div>
              </div>
              <div class="col-12">
                <label for="newImage" class="form-label">
                  Image URL
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="newImage"
                  placeholder=""
                  required
                ></input>
                <div class="invalid-feedback">Please enter your Image URL.</div>
              </div>
              <div class="col-12">
                <label for="newRate" class="form-label">
                  Rate
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="newRate"
                  placeholder=""
                  required
                ></input>
              </div>

              <div class="col-12">
                <label for="newCount" class="form-label">
                  Count
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="newCount"
                  placeholder=""
                  required
                ></input>
              </div>
            </div>

            <hr class="my-4"></hr>

            <button
              class="w-100 btn btn-primary btn-lg"
              onClick={() => addOneProduct()}
            >
              Add to MongoDB
            </button>
          </div>
        </div>
      )}
      {/* Update Products */}
      {viewer === 2 && <div id="col" class="container"></div>}
      {/* Delete Products */}
      {viewer === 3 && <div id="col" class="container"></div>}
      {/* Authors */}
      {viewer === 4 && <Authors></Authors>}
    </div>
  );
}

export default App;
