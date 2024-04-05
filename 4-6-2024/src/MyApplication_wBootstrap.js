import React, { useState } from "react";
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
      {viewer === 0 && <Payment />}
      {viewer === 1 && <Summary />}
    </div>
  );
}
export default App;
