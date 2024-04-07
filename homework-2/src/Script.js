import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import items from "./products.json";
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
  const [viewProducts, setViewProducts] = useState(items);

  const handleChange = (e) => {
    setQuery(e.target.value);
    if (e.target.value === "") {
      setViewProducts(items);
    }
    // console.log(
    //   "Step 6 : in handleChange, Target Value :",
    //   e.target.value,
    //   " Query Value :",
    //   query
    // );
  };

  const filterProducts = (e) => {
    const results = items.filter((eachProduct) => {
      // if (e.target.value === "") return viewProducts;
      return eachProduct.title
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    setViewProducts(results);
  };

  const addToCart = (el) => {
    setCart([...cart, el]);
  };

  const removeFromCart = (el) => {
    let itemFound = false;
    const updatedCart = cart.filter((cartItem) => {
      if (cartItem.id === el.id && !itemFound) {
        itemFound = true;
        return false;
      }
      return true;
    });
    if (itemFound) {
      setCart(updatedCart);
      if (cart.length === 0) {
        setViewer(0);
      }
    }
  };

  function howManyofThis(id) {
    let hmot = cart.filter((cartItem) => cartItem.id === id);
    return hmot.length;
  }

  const onSubmit = (data) => {
    if (
      data.creditCard.length != 16 ||
      data.zip.length != 5 ||
      isNaN(data.creditCard) ||
      isNaN(data.zip)
    ) {
      return;
    }
    if (data.creditCard)
      // update hooks
      setDataF(data);
    setViewer(2);
  };

  const onCancel = () => {
    setViewer(0);
  };

  const cartItems = items.map((el) =>
    howManyofThis(el.id) > 0 ? (
      viewer === 1 ? (
        <div class="row border-top border-bottom" key={el.id}>
          <div class="row main align-items-center">
            <div class="col-2">
              <img
                style={{ maxHeight: "100px" }}
                class="img-fluid"
                src={el.image}
              />
            </div>
            <div class="col">
              <div class="row text-muted">{el.title}</div>
              <div class="row">{el.category}</div>
            </div>
            <div class="col">
              <button
                type="button"
                variant="light"
                class="btn btn-sm btn-outline-secondary"
                onClick={() => removeFromCart(el)}
              >
                {" "}
                -{" "}
              </button>{" "}
              <button
                type="button"
                variant="light"
                class="btn btn-sm btn-outline-secondary"
                onClick={() => addToCart(el)}
              >
                {" "}
                +{" "}
              </button>
            </div>
            <div class="col">
              ${el.price.toFixed(2)}, Quantity: <span> </span>
              {howManyofThis(el.id)} = $
              {(howManyofThis(el.id) * el.price).toFixed(2)}
            </div>
          </div>
        </div>
      ) : (
        <div class="row border-top border-bottom" key={el.id}>
          <div class="row main align-items-center">
            <div class="col-2">
              <img
                style={{ maxHeight: "100px" }}
                class="img-fluid"
                src={el.image}
              />
            </div>
            <div class="col">
              <div class="row text-muted">{el.title}</div>
              <div class="row">{el.category}</div>
            </div>
            <div class="col">
              ${el.price.toFixed(2)}, Quantity: <span> </span>
              {howManyofThis(el.id)} = $
              {(howManyofThis(el.id) * el.price).toFixed(2)}
            </div>
          </div>
        </div>
      )
    ) : (
      <div></div>
    )
  );

  const total = () => {
    let totalVal = 0;
    for (let i = 0; i < cart.length; i++) {
      totalVal += cart[i].price;
    }
    setCartTotal(totalVal);
  };

  const toPaymentScreen = () => {
    if (cart.length === 0) {
      return;
    }
    setViewer(1);
    // setDataF({});
  };

  useEffect(() => {
    total();
  }, [cart]);

  const listItems = viewProducts.map((el) => (
    // PRODUCT
    <div class="row border-top border-bottom" key={el.id}>
      <div class="row main align-items-center">
        <div class="col-2">
          <img class="img-fluid" src={process.env.PUBLIC_URL + el.image} />
        </div>
        <div class="col">
          <div class="row text-muted">{el.title}</div>
          <div class="row text-muted">{el.description}</div>
          <div class="row">{el.category}</div>
        </div>
        <div class="col">
          <button
            type="button"
            variant="light"
            class="btn btn-sm btn-outline-secondary"
            onClick={() => removeFromCart(el)}
          >
            {" "}
            -{" "}
          </button>{" "}
          <button
            type="button"
            variant="light"
            class="btn btn-sm btn-outline-secondary"
            onClick={() => addToCart(el)}
          >
            {" "}
            +{" "}
          </button>
        </div>
        <div class="col">
          ${el.price.toFixed(2)}, Quantity: <span> </span>
          {howManyofThis(el.id)}
        </div>
      </div>
    </div>
  ));

  function Summary() {
    const updateHooks = () => {
      setViewer(0);
      setDataF({});
      setCart([]);
    };
    return (
      <div>
        <h1>Payment summary:</h1>
        <h2>Total: ${cartTotal.toFixed(2)}</h2>
        <h3>Name: {dataF.fullName}</h3>
        <p>Email {dataF.email}</p>
        <p>
          Shipping Address: {dataF.city}, {dataF.state} {dataF.zip}{" "}
        </p>
        <p>
          Card ending in{" "}
          {dataF.creditCard.substring(12, dataF.creditCard.length)}
        </p>
        <div>{cartItems}</div>

        <button onClick={updateHooks} className="btn btn-secondary">
          Continue Shopping
        </button>
      </div>
    );
  }

  // function Payment() {
  //   return (

  //   );
  // }

  return (
    <div>
      {viewer === 0 && (
        <div>
          <div class="card">
            <div class="row">
              {/* HERE, IT IS THE SHOPING CART */}
              <div class="col-md-11 cart">
                <div class="title">
                  <div class="row">
                    <div class="col"></div>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                      }}
                      class="d-flex"
                      role="search"
                      id="searchbar"
                    >
                      <input
                        class="form-control me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        value={query}
                        onChange={handleChange}
                      ></input>
                      <button
                        value={query}
                        onClick={filterProducts}
                        class="btn btn-outline-success my-2"
                        type="submit"
                      >
                        Search
                      </button>
                      <button
                        value={query}
                        onClick={toPaymentScreen}
                        class="btn btn-primary my-2"
                        type="submit"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        Cart ${cartTotal.toFixed(2)} ({cart.length})
                      </button>
                    </form>
                    {/* <div class="col">Products selected {cart.length}</div> */}
                  </div>
                </div>
                <div id="catalogue">{listItems}</div>
              </div>
              {/* <div class="float-end">
                <p class="mb-0 me-5 d-flex align-items-center">
                  <span class="small text-muted me-2">Order total:</span>
                  <span class="lead fw-normal">${cartTotal.toFixed(2)}</span>
                </p>
              </div> */}
            </div>
          </div>
        </div>
      )}
      {viewer === 1 && (
        <div>
          <div>{cartItems}</div>
          <div class="float-end">
            <p class="mb-0 me-5 d-flex align-items-center">
              <span class="small text-muted me-2">Order total:</span>
              <span class="lead fw-normal">${cartTotal.toFixed(2)}</span>
            </p>
          </div>

          <div class="float-end"></div>
          <form onSubmit={handleSubmit(onCancel)} className="container mt-5">
            <button onClick={onCancel} className="btn btn-secondary">
              Return
            </button>
          </form>

          <form onSubmit={handleSubmit(onSubmit)} className="container mt-5">
            <div className="form-group">
              <input
                div
                {...register("fullName", { required: true })}
                placeholder="Full Name"
                className="form-control"
              />
              {errors.fullName && (
                <p className="text-danger">Full Name is required.</p>
              )}
            </div>
            <div className="form-group">
              <input
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
                placeholder="Email"
                className="form-control"
              />
              {errors.email && (
                <p className="text-danger">Email is required.</p>
              )}
            </div>
            <div className="form-group">
              <input
                {...register("creditCard", { required: true })}
                placeholder="Credit Card"
                className="form-control"
              />
              {errors.creditCard && (
                <p className="text-danger">Credit Card is required.</p>
              )}
            </div>
            <div className="form-group">
              <input
                {...register("address", {
                  required: true,
                  pattern: "[0-9]{16}",
                })}
                placeholder="Address"
                className="form-control"
              />
              {errors.address && (
                <p className="text-danger">Address is required.</p>
              )}
            </div>
            <div className="form-group">
              <input
                {...register("address2")}
                placeholder="Address 2"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <input
                {...register("city", { required: true })}
                placeholder="City"
                className="form-control"
              />
              {errors.city && <p className="text-danger">City is required.</p>}
            </div>
            <div className="form-group">
              <input
                {...register("state", { required: true })}
                placeholder="State"
                className="form-control"
              />
              {errors.state && (
                <p className="text-danger">State is required.</p>
              )}
            </div>
            <div className="form-group">
              <input
                {...register("zip", { required: true, pattern: "[0-9]{5}" })}
                placeholder="Zip"
                className="form-control"
              />
              {errors.zip && <p className="text-danger"> Zip is required.</p>}
            </div>
            <button type="submit" className="btn btn-primary">
              Order
            </button>
          </form>
        </div>
      )}
      {viewer === 2 && <Summary />}
    </div>
  );
}
export default App;
