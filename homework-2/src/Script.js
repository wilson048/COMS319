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
    // console.log(
    //   "Step 6 : in handleChange, Target Value :",
    //   e.target.value,
    //   " Query Value :",
    //   query
    // );
    const results = items.filter((eachProduct) => {
      if (e.target.value === "") return viewProducts;
      return eachProduct.title
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    setViewProducts(results);
  };

  function Shop() {
    const listItems = items.map((el) => (
      // PRODUCT
      <div class="row border-top border-bottom" key={el.id}>
        <div class="row main align-items-center">
          {/* <div class="col">
            <div class="card shadow-sm">
              <svg
                class="bd-placeholder-img card-img-top"
                width="100%"
                height="225"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder: Thumbnail"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#55595c" />
                <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                  Thumbnail
                </text>
              </svg>
              <div class="card-body">
                <p class="card-text">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <button
                      type="button"
                      class="btn btn-sm btn-outline-secondary"
                    >
                      View
                    </button>
                    <button
                      type="button"
                      class="btn btn-sm btn-outline-secondary"
                    >
                      Edit
                    </button>
                  </div>
                  <small class="text-body-secondary">9 mins</small>
                </div>
              </div>
            </div>
          </div> */}
          <div class="col-2">
            <img class="img-fluid" src={el.image} />
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
            ${el.price} <span class="close">&#10005;</span>
            {howManyofThis(el.id)}
          </div>
        </div>
      </div>
    ));

    const addToCart = (el) => {
      setCart([...cart, el]);
    };

    //   const removeFromCart = (el) => {
    //     let hardCopy = [...cart];
    //     hardCopy = hardCopy.filter((cartItem) => cartItem.id !== el.id);
    //     setCart(hardCopy);
    //   };

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
      }
    };

    function howManyofThis(id) {
      let hmot = cart.filter((cartItem) => cartItem.id === id);
      return hmot.length;
    }

    const cartItems = cart.map((el) => (
      <div key={el.id}>
        <img class="img-fluid" src={el.image} width={150} />
        {el.title}${el.price}
      </div>
    ));

    const total = () => {
      let totalVal = 0;
      for (let i = 0; i < cart.length; i++) {
        totalVal += cart[i].price;
      }
      setCartTotal(totalVal);
    };

    useEffect(() => {
      total();
    }, [cart]);

    return (
      <div>
        STORE SE/ComS319
        <div class="card">
          <div class="row">
            {/* HERE, IT IS THE SHOPING CART */}
            <div class="col-md-8 cart">
              <div class="title">
                <div class="row">
                  <div class="col"></div>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="search"
                    value={query}
                    onChange={handleChange}
                  />
                  <div class="col align-self-center text-right text-muted">
                    Products selected {cart.length}
                  </div>
                </div>
              </div>
              <div>{listItems}</div>
            </div>
            <div class="float-end">
              <p class="mb-0 me-5 d-flex align-items-center">
                <span class="small text-muted me-2">Order total:</span>
                <span class="lead fw-normal">${cartTotal}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function Summary() {
    const updateHooks = () => {
      setViewer(0);
      setDataF({});
    };
    return (
      <div>
        <h1>Payment summary:</h1>
        <h3>{dataF.fullName}</h3>
        <p>{dataF.email}</p>
        ...
        <p>
          {dataF.city},{dataF.state} {dataF.zip}{" "}
        </p>
        <button onClick={updateHooks} className="btn btn-secondary">
          Submit
        </button>
      </div>
    );
  }

  function Payment() {
    const onSubmit = (data) => {
      console.log(data); // log all data
      console.log(data.fullName); // log only fullname
      // update hooks
      setDataF(data);
      setViewer(1);
    };

    return (
      <div>
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
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
              placeholder="Email"
              className="form-control"
            />
            {errors.email && <p className="text-danger">Email is required.</p>}
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
              {...register("address", { required: true })}
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
            {errors.state && <p className="text-danger">State is required.</p>}
          </div>
          <div className="form-group">
            <input
              {...register("zip", { required: true })}
              placeholder="Zip"
              className="form-control"
            />
            {errors.zip && <p className="text-danger"> Zip is required.</p>}
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      {viewer === 0 && <Shop />}
      {viewer === 1 && <Payment />}
      {viewer === 2 && <Summary />}
    </div>
  );
}
export default App;
