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

  async function viewProducts(isDelete) {
    const response = await fetch("http://localhost:8081/listProducts");
    const myProducts = await response.json();
    return loadProducts(myProducts, isDelete);
  }

  function loadProducts(myProducts, isDelete) {
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

      if (isDelete) {
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
        viewProducts(true);
      });
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
                      viewProducts(false);
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
                    onClick={() => setViewer(2)}
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
                      viewProducts(true);
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
      {viewer === 1}
      {/* Update Products */}
      {viewer === 2}
      {/* Delete Products */}
      {viewer === 3 && <div id="col" class="container"></div>}
      {/* Authors */}
      {viewer === 4}
    </div>
  );
}

export default App;
