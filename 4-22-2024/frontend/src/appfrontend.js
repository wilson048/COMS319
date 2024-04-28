// Author: Wilson Chu
// ISU Netid : wvchu@iastate.edu
// Date :  April 27, 2024

import "./App.css";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
function App() {
  const [viewer1, setViewer1] = useState(false);
  const [viewer2, setViewer2] = useState(false);

  const [product, setProduct] = useState([]);
  const [oneProduct, setOneProduct] = useState([]);

  // new Product
  const [addNewProduct, setAddNewProduct] = useState({
    id: 0,
    title: "",
    price: 0.0,
    description: "",
    category: "",
    image: "",
    rating: 0.0,
  });
  const showAllItems = product.map((el) => (
    <div key={el.id}>
      <img src={el.image} width={30} alt="images" /> <br />
      Title: {el.title} <br />
      Category: {el.category} <br />
      Price: {el.price} <br />
      Rating :{el.rating} <br />
    </div>
  ));

  const showOneItem = oneProduct.map((el) => (
    <div key={el.id}>
      <img src={el.image} width={30} alt="images" /> <br />
      Title: {el.title} <br />
      Category: {el.category} <br />
      Price: {el.price} <br />
      Rating: {el.rating} <br />
    </div>
  ));
  function getAllProducts() {
    fetch("http://127.0.0.1:4000/catalog")
      .then((response) => response.json())
      .then((data) => {
        console.log("Show Catalog of Products :");
        console.log(data);
        setProduct(data);
      });
    setViewer1(!viewer1);
  }
  useEffect(() => {
    getAllProducts();
  }, []);

  function getOneProduct(id) {
    console.log(id);
    if (id >= 1 && id <= 20) {
      fetch("http://127.0.0.1:4000/catalog/" + id)
        .then((response) => response.json())
        .then((data) => {
          console.log("Show one product :", id);
          console.log(data);
          setOneProduct(data);
        });
      if (false === viewer2) setViewer2(true);
    } else {
      console.log("Wrong number of Product id.");
    }
  }
  const Getcatalog = () => {
    // Define hooks
    // useEffect to load products when load page
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    useEffect(() => {
      fetch("http://127.0.0.1:4000/catalog")
        .then((response) => response.json())
        .then((data) => {
          console.log("Show Catalog of Products :", data);
          setProducts(data);
        });
    }, []);
    return (
      <div>
        {/* Buttons to show CRUD */}
        <button onClick={() => navigate("/getcatalog")}>GET Catalog</button>
        <button onClick={() => navigate("/getcatalogid")}>
          GET Item by Id
        </button>
        <button onClick={() => navigate("/getcatalogcategory")}>
          GET Item by Category
        </button>
        <button onClick={() => navigate("/postcatalog")}>
          POST a new Item
        </button>
        <button onClick={() => navigate("/putcatalog")}>
          PUT (modify) an Item
        </button>
        <button onClick={() => navigate("/deletecatalog")}>
          DELETE an Item
        </button>
        {/* Show all products using map */}
        Abraham N. Aldaco-Gastélum, Ph.D.
        {/* Show all products using map */}
        {products.map((el) => (
          <div key={el.id}>
            <img src={el.image} alt="product" width={30} />
            <div>Title: {el.title}</div>
            <div>Category: {el.category}</div>
            <div>Price: {el.price}</div>
            <div>Rating: {el.rating.rate}</div>
          </div>
        ))}
      </div>
    );
  };
  const Getcatalogid = () => {
    // Define hooks
    const [oneProduct, setOneProduct] = useState([]);
    const navigate = useNavigate();
    const [id, setId] = useState("");
    useEffect(() => {
      if (id) {
        fetch(`http://127.0.0.1:4000/catalog/${id}`)
          .then((response) => response.json())
          .then((data) => {
            console.log("Show one product :", data);
            setOneProduct(data);
          });
      }
    }, [id]); // Fetch only when id changes

    // useEffect to load catalog once HOOK id is modified
    // return
    return (
      <div>
        {/* Buttons to show CRUD */}
        <button onClick={() => navigate("/getcatalog")}>GET Catalog</button>
        <button onClick={() => navigate("/getcatalogid")}>
          GET Item by Id
        </button>
        <button onClick={() => navigate("/getcatalogcategory")}>
          GET Item by Category
        </button>
        <button onClick={() => navigate("/postcatalog")}>
          POST a new Item
        </button>
        <button onClick={() => navigate("/putcatalog")}>
          PUT (modify) an Item
        </button>
        <button onClick={() => navigate("/deletecatalog")}>
          DELETE an Item
        </button>
        <br />
        <input
          type="text"
          placeholder="Enter ID"
          onChange={(e) => setId(e.target.value)}
        />

        {/* Show one product using map */}
        {oneProduct.map((el) => (
          <div key={el.id}>
            <img src={el.image} alt="product" width={30} />
            <div>Title: {el.title}</div>
            <div>Category: {el.category}</div>
            <div>Price: {el.price}</div>
            <div>Rating: {el.rating.rate}</div>
          </div>
        ))}
      </div>
    );
  };

  const GetcatalogCategory = () => {
    // Define hooks
    const [oneProduct, setOneProduct] = useState([]);
    const navigate = useNavigate();
    const [catagory, setCatagory] = useState("");
    useEffect(() => {
      if (catagory) {
        fetch(`http://127.0.0.1:4000/catalog/${catagory}`)
          .then((response) => response.json())
          .then((data) => {
            console.log("Show one product :", data);
            setOneProduct(data);
          });
      }
    }, [catagory]); // Fetch only when Catagory changes

    // useEffect to load catalog once HOOK Catagory is modified
    // return
    return (
      <div>
        {/* Buttons to show CRUD */}
        <button onClick={() => navigate("/getcatalog")}>GET Catalog</button>
        <button onClick={() => navigate("/getcatalogid")}>
          GET Item by Id
        </button>
        <button onClick={() => navigate("/getcatalogcategory")}>
          GET Item by Category
        </button>
        <button onClick={() => navigate("/postcatalog")}>
          POST a new Item
        </button>
        <button onClick={() => navigate("/putcatalog")}>
          PUT (modify) an Item
        </button>
        <button onClick={() => navigate("/deletecatalog")}>
          DELETE an Item
        </button>
        <br />
        <input
          type="text"
          placeholder="Enter Category"
          onChange={(e) => setCatagory(e.target.value)}
        />

        {/* Show one product using map */}
        {oneProduct.map((el) => (
          <div key={el.id}>
            <img src={el.image} alt="product" width={30} />
            <div>Title: {el.title}</div>
            <div>Category: {el.category}</div>
            <div>Price: {el.price}</div>
            <div>Rating: {el.rating.rate}</div>
          </div>
        ))}
      </div>
    );
  };

  const Postcatalog = () => {
    // Define HOOKS
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      id: "",
      title: "",
      price: "",
      description: "",
      category: "",
      image: "",
      rating: "",
    });

    // Function to add input in formData HOOK using operator ...
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };

    // Function to fetch backend for POST - it sends data in BODY
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(e.target.value);
      fetch("http://127.0.0.1:4000/catalog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (response.status != 200) {
            return response.json().then((errData) => {
              throw new Error(
                `POST response was not ok :\n Status:${response.status}. \n Error: ${errData.error}`
              );
            });
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          alert("Item added successfully!");
        })
        .catch((error) => {
          console.error("Error adding item:", error);
          alert("Error adding robot:" + error.message); // Display alert if there's an error
        });
    }; // end handleOnSubmit
    //return
    return (
      <div>
        {/* Buttons to show CRUD */}
        <button onClick={() => navigate("/getcatalog")}>GET Catalog</button>
        <button onClick={() => navigate("/getcatalogid")}>
          GET Item by Id
        </button>
        <button onClick={() => navigate("/getcatalogcategory")}>
          GET Item by Category
        </button>
        <button onClick={() => navigate("/postcatalog")}>
          POST a new Item
        </button>
        <button onClick={() => navigate("/putcatalog")}>
          PUT (modify) an Item
        </button>
        <button onClick={() => navigate("/deletecatalog")}>
          DELETE an Item
        </button>

        {/* Form to input data */}
        <form onSubmit={handleSubmit}>
          <h1>Post a New Product</h1>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            placeholder="ID"
            required
          />{" "}
          <br />
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            required
          />{" "}
          <br />
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            required
          />{" "}
          <br />
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            required
          />{" "}
          <br />
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            required
          />{" "}
          <br />
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Image URL"
            required
          />{" "}
          <br />
          <input
            type="text"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            placeholder="Rating"
            required
          />{" "}
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  };
  const Deletecatalog = () => {
    // Define HOOKS
    const [products, setProducts] = useState([
      {
        id: "",
        title: "",
        price: "",
        description: "",
        category: "",
        image: "",
        rating: "",
      },
    ]);
    const [index, setIndex] = useState(0);
    const navigate = useNavigate();
    // useEffect to load catalog when load page
    useEffect(() => {
      fetch("http://127.0.0.1:4000/catalog")
        .then((response) => response.json())
        .then((data) => {
          setProducts(data);
          console.log("Load initial Catalog of Products in DELETE :", data);
        });
    }, []);
    // Function to review products like carousel
    function getOneByOneProductNext() {
      if (products.length > 0) {
        if (index === products.length - 1) setIndex(0);
        else setIndex(index + 1);
      }
    }
    function getOneByOneProductPrev() {
      if (products.length > 0) {
        if (index === 0) setIndex(products.length - 1);
        else setIndex(index - 1);
      }
    }
    // Delete de product by its id <- id is Hook
    const deleteOneProduct = (id) => {
      console.log("Product to delete :", id);
      fetch("http://localhost:4000/catalog/" + id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id }),
      })
        .then((response) => {
          if (response.status != 200) {
            return response.json().then((errData) => {
              throw new Error(
                `POST response was not ok :\n Status:${response.status}. \n Error: ${errData.error}`
              );
            });
          }
          return response.json();
        })
        .then((data) => {
          console.log("Delete a product completed : ", id);
          console.log(data);
          // reload products from the local products array
          const newProducts = products.filter((product) => product.id !== id);
          setProducts(newProducts);
          setIndex(0);
          // show alert
          if (data) {
            const key = Object.keys(data);
            const value = Object.values(data);
            alert(key + value);
          }
        })
        .catch((error) => {
          console.error("Error adding item:", error);
          alert("Error adding robot:" + error.message); // Display alert if there's an error
        });
    };
    // return
    return (
      <div>
        {/* Buttons to show CRUD */}
        <button onClick={() => navigate("/getcatalog")}>GET Catalog</button>
        <button onClick={() => navigate("/getcatalogid")}>
          GET Item by Id
        </button>
        <button onClick={() => navigate("/getcatalogcategory")}>
          GET Item by Category
        </button>
        <button onClick={() => navigate("/postcatalog")}>
          POST a new Item
        </button>
        <button onClick={() => navigate("/putcatalog")}>
          PUT (modify) an Item
        </button>
        <button onClick={() => navigate("/deletecatalog")}>
          DELETE an Item
        </button>

        {/* Buttons to simulate carousel */}
        <h3>Delete one product:</h3>
        <button onClick={() => getOneByOneProductPrev()}>Prev</button>
        <button onClick={() => getOneByOneProductNext()}>Next</button>
        <button onClick={() => deleteOneProduct(products[index].id)}>
          Delete
        </button>

        {/* Show product properties, one by one */}
        <div key={products[index].id}>
          <img src={products[index].image} width={30} /> <br />
          Id:{products[index].id} <br />
          Title: {products[index].title} <br />
          Category: {products[index].category} <br />
          Price: {products[index].price} <br />
          Rating :{products[index].rating} <br />
        </div>
      </div>
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/getcatalog" element={<Getcatalog />} />
        <Route path="/getcatalogid" element={<Getcatalogid />} />
        <Route path="/getcatalogcategory" element={<GetcatalogCategory />} />
        <Route path="/postcatalog" element={<Postcatalog />} />
        {/* <Route path="/putcatalog" element={<Putcatalog />} /> */}
        <Route path="/deletecatalog" element={<Deletecatalog />} />
        <Route path="/" element={<Getcatalog />} /> {/* Default view*/}
      </Routes>
    </Router>
  );
}

export default App;
