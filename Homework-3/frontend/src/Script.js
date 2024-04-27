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

  function viewProducts() {
    return fetch("http://localhost:8081/listProducts")
      .then((response) => response.json())
      .then((myProducts) => {
        return loadProducts(myProducts);
      });
  }

  function loadProducts(myProducts) {
    let mainContainer = document.getElementById("col");
    mainContainer.class =
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

      div.innerHTML = `<div id=${id} class="card shadow-sm">
        <img src=${img} class="card-img-top" alt="..."></img>
            <div class="card-body">
                <p class="card-text"> <strong>${id} ${title}</strong>, $${price}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <small class="text-body-secondary">${description}</small>
                </div>
            </div>
        </div>`;
      mainContainer.appendChild(div);
    }
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
                      viewProducts();
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
                    onClick={() => setViewer(3)}
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
      {viewer === 3}
      {/* Authors */}
      {viewer === 4}
    </div>
  );
}

export default App;
