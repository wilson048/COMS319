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

  // fetch("http://localhost:8081/listProducts")
  //   .then((response) => response.json())
  //   .then((myProducts) => loadProducts(myProducts));

  // function loadProducts(myProducts) {
  //   var mainContainer = document.getElementById("col");
  //   var checkBoxes = [];
  //   var cards = [];
  //   for (var i = 0; i < myProducts.length; i++) {
  //     let title = myProducts[i].name;
  //     let year = myProducts[i].price;
  //     let img = myProducts[i].image;
  //     let description = myProducts[i].description;
  //     let rate = myProducts[i].rating.rate;
  //     let count = myProducts[i].rating.count;
  //     let id = myProducts[i].id;

  //     let checkbox = "checkbox" + i.toString();
  //     let card = "card" + i.toString();

  //     console.log("Title " + i + ": " + title + " Year: " + year);

  //     let div = document.createElement("div");
  //     div.id = id;

  //     div.innerHTML = `<input type="checkbox" class="form-check-input" checked>
  //       <label for=${checkbox} class="form-check-label">Show Image ${id}</label>
  //       <div id=${card} class="card shadow-sm">
  //       <img src=${img} class="card-img-top" alt="..."></img>
  //           <div class="card-body">
  //               <p class="card-text"> <strong>${id} ${title}</strong>, $${year}</p>
  //               <div class="d-flex justify-content-between align-items-center">
  //                   <small class="text-body-secondary">${description}</small>
  //               </div>
  //           </div>
  //       </div>`;
  //     mainContainer.appendChild(div);

  //     let cbox = document.getElementById(checkbox);
  //     checkBoxes.push(cbox);
  //     let ccard = document.getElementById(card);
  //     cards.push(ccard);

  //     console.log(checkbox);
  //     console.log(card);
  //   }
  //   console.log(checkBoxes);
  //   console.log(cards);

  //   checkBoxes.forEach((checkBoxParam, index) => {
  //     console.log(index);
  //     checkBoxParam.addEventListener("change", () => {
  //       if (checkBoxParam.checked) {
  //         cards[index].style.display = "block"; // Show the card
  //       } else {
  //         cards[index].style.display = "none"; // Hide the card
  //       }
  //     });
  //   });
  // }

  // function getInputValue() {
  //   let movieName = document.forms["my_form"]["inputMovieName"];
  //   let inputMovieName = movieName.value;

  //   fetch("http://localhost:8081/listProducts")
  //     .then((response) => response.json())
  //     .then((myProducts) => loadProducts(myProducts));

  //   function loadProducts(myProducts) {
  //     var mainContainer = document.getElementById("col");

  //     for (var i = 0; i < myProducts.length; i++) {
  //       let title = myProducts[i].name;
  //       let year = myProducts[i].price;
  //       let img = myProducts[i].image;
  //       let description = myProducts[i].description;
  //       let id = myProducts[i].id;

  //       if (title == inputMovieName) {
  //         console.log("Title " + i + ": " + title + " Year: " + year);

  //         let div = document.createElement("div");
  //         div.id = id;
  //         div.innerHTML = `
  //       <div class="card shadow-sm">
  //       <img src=${img} class="card-img-top" alt="..."></img>
  //           <div class="card-body">
  //               <p class="card-text"> <strong> ${title}</strong>, $${year}</p>
  //               <div class="d-flex justify-content-between align-items-center">
  //                   <small class="text-body-secondary">${description}</small>
  //               </div>
  //           </div>
  //       </div>`;
  //         mainContainer.appendChild(div);
  //       }
  //     }
  //   }
  // }

  // function addOneProduct() {
  //   // Fetch the value from the input field
  //   let id = Number(document.getElementById("addProductId").value);
  //   let name = document.getElementById("addProductName").value;
  //   let description = document.getElementById("addProductDescription").value;
  //   let price = Number(document.getElementById("addProductPrice").value);
  //   let image = document.getElementById("addProductURL").value;
  //   console.log(id);
  //   fetch(`http://localhost:8081/addProduct`, {
  //     method: "POST",
  //     headers: { "content-type": "application/json" },
  //     body: JSON.stringify({
  //       id: id,
  //       name: name,
  //       price: price,
  //       description: description,
  //       image: image,
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((addThisProduct) => {
  //       addOneProductById({
  //         id: id,
  //         name: name,
  //         price: price,
  //         description: description,
  //         image: image,
  //       });
  //     });
  // }

  // function addOneProductById(json) {
  //   let title = json.name;
  //   let year = json.price;
  //   let img = json.image;
  //   let description = json.description;
  //   let id = json.id;

  //   var mainContainer = document.getElementById("col");
  //   let div = document.createElement("div");
  //   div.id = id;
  //   div.innerHTML = `
  //       <div class="card shadow-sm">
  //       <img src=${img} class="card-img-top" alt="..."></img>
  //           <div class="card-body">
  //               <p class="card-text"> <strong> ${title}</strong>, $${year}</p>
  //               <div class="d-flex justify-content-between align-items-center">
  //                   <small class="text-body-secondary">${description}</small>
  //               </div>
  //           </div>
  //       </div>`;
  //   mainContainer.appendChild(div);
  // }

  // function deleteOneProduct() {
  //   // Fetch the value from the input field
  //   let id = document.getElementById("deleteProductById").value;
  //   console.log(id);
  //   fetch(`http://localhost:8081/deleteProduct/${id}`, {
  //     method: "DELETE",
  //     headers: { "content-type": "application/json" },
  //     body: JSON.stringify({ id: id }),
  //   })
  //     .then((response) => response.json())
  //     .then(() => {
  //       deleteOneProductById(id);
  //     });
  // }

  // function deleteOneProductById(id) {
  //   let thingToRemove = document.getElementById(id);
  //   var mainContainer = document.getElementById("col");
  //   mainContainer.removeChild(thingToRemove);
  // }
  // function updateOneProduct() {
  //   // Fetch the value from the input field
  //   let id = Number(document.getElementById("updateProductById").value);
  //   let price = Number(document.getElementById("updateProductPrice").value);
  //   console.log(id);
  //   fetch(`http://localhost:8081/updateProduct/${id}`, {
  //     method: "PUT",
  //     headers: { "content-type": "application/json" },
  //     body: JSON.stringify({
  //       id: 5,
  //       name: "Product Abraham ALDACO-GASTELUM",
  //       price: price,
  //       description: "I Product is one example of an image for my exercise",
  //       image: "https://robohash.org/Abraham",
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then(() => {
  //       updateOneProductById({
  //         id: 5,
  //         name: "Product Abraham ALDACO-GASTELUM",
  //         price: price,
  //         description: "I Product is one example of an image for my exercise",
  //         image: "https://robohash.org/Abraham",
  //       });
  //     });
  // }

  // function updateOneProductById(json) {
  //   let thingToRemove = document.getElementById(json.id);
  //   var mainContainer = document.getElementById("col");
  //   mainContainer.removeChild(thingToRemove);

  //   let thingToUpdate = document.createElement("div");
  //   thingToUpdate.id = json.id;
  //   thingToUpdate.innerHTML = `
  //       <div class="card shadow-sm">
  //       <img src=${json.image} class="card-img-top" alt="..."></img>
  //           <div class="card-body">
  //               <p class="card-text"> <strong> ${json.name}</strong>, $${json.price}</p>
  //               <div class="d-flex justify-content-between align-items-center">
  //                   <small class="text-body-secondary">${json.description}</small>
  //               </div>
  //           </div>
  //       </div>`;
  //   mainContainer.appendChild(thingToUpdate);
  // }

  // function Payment() {
  //   return (

  //   );
  // }

  return (
    <div>
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
                  <button class="btn btn-primary btn-square-md">View</button>
                </div>
              </li>
              <li class="nav-item">
                <div class="d-lg-flex col-lg-3">
                  <button class="btn btn-success btn-square-md">Add</button>
                </div>
              </li>
              <li class="nav-item">
                <div class="d-lg-flex col-lg-3">
                  <button class="btn btn-info btn-square-md">Update</button>
                </div>
              </li>
              <li class="nav-item">
                <div class="d-lg-flex col-lg-3">
                  <button class="btn btn-danger btn-square-md">Delete</button>
                </div>
              </li>
              <li class="nav-item">
                <div class="d-lg-flex col-lg-3">
                  <button class="btn btn-light btn-square-md">Authors</button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {viewer === 0}
      {viewer === 1}
      {viewer === 2}
      {viewer === 3}
      {viewer === 4}
    </div>
  );
}
export default App;
