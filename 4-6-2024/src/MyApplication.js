import React, { useState } from "react";
import { useForm } from "react-hook-form";

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
        <button onClick={updateHooks}>Submit</button>
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("fullName", { required: true })}
            placeholder="Full Name"
          />
          {errors.fullName && <p>Full Name is required.</p>}
          <input
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            placeholder="Email"
          />
          {errors.email && <p>Email is required.</p>}
          <input
            {...register("creditCard", { required: true })}
            placeholder="Credit Card"
          />
          {errors.creditCard && <p>Credit Card is required.</p>}
          <input
            {...register("address", { required: true })}
            placeholder="Address"
          />
          {errors.address && <p>Address is required.</p>}
          <input {...register("address2")} placeholder="Address 2" />
          <input {...register("city", { required: true })} placeholder="City" />
          {errors.city && <p>City is required.</p>}
          <input
            {...register("state", { required: true })}
            placeholder="State"
          />
          {errors.state && <p>State is required.</p>}
          <input {...register("zip", { required: true })} placeholder="Zip" />
          {errors.zip && <p>Zip is required.</p>}
          <button type="submit">Submit</button>
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
