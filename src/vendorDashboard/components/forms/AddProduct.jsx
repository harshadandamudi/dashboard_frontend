import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState([]);
  const [bestSeller, setBestSeller] = useState(false);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const handleBestSellerChange = (event) => {
    const value = event.target.value === 'yes';
    setBestSeller(value);
  };

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    try {
      const loginToken = localStorage.getItem('loginToken');
      const firmId = localStorage.getItem('firmId');

      if (!loginToken || !firmId) {
        throw new Error("User not authenticated or firm ID missing");
      }

      const formData = new FormData();
      formData.append('productName', productName);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('bestSeller', bestSeller);
      if (image) {
        formData.append('image', image);
      }
      category.forEach((value) => formData.append('category', value));

      const response = await axios.post(
        `http://localhost:4200/product/add-product/${firmId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'token': loginToken,
          },
        }
      );

      if (response.status === 200) {
        alert('Product Added Successfully');
        // Reset form fields
        setProductName("");
        setPrice("");
        setCategory([]);
        setBestSeller(false);
        setImage(null);
        setDescription("");
      } else {
        setError("Failed to add product. Please try again.");
      }
    } catch (error) {
      console.error("Failed to add product", error.response ? error.response.data : error.message);
      setError("Failed to add product. Please try again.");
    }
  };

  return (
    <div className='firmSection'>
      <form className='tableForm' onSubmit={handleAddProduct}>
        <h3>Add Product</h3>

        <label>Product Name</label>
        <input 
          type='text' 
          value={productName} 
          onChange={(e) => setProductName(e.target.value)} 
          required 
        />

        <label>Price</label>
        <input 
          type='text' 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          required 
        />

        <div className='checkinp'>
          <label>Category</label>
          <div className='inputsContainer'>
            <div className='checkboxContainer'>
              <label>Veg</label>
              <input 
                type="checkbox" 
                value="veg" 
                onChange={handleCategoryChange} 
              />
            </div>
            <div className='checkboxContainer'>
              <label>Non-Veg</label>
              <input 
                type='checkbox' 
                value="Non-Veg" 
                onChange={handleCategoryChange} 
              />
            </div>
          </div>
        </div>

        <div className='checkinp'>
          <label>Bestseller</label>
          <div className='inputsContainer'>
            <div className='radioContainer'>
              <label>Yes</label>
              <input 
                type="radio" 
                name="bestSeller" 
                value="yes" 
                onChange={handleBestSellerChange} 
              />
            </div>
            <div className='radioContainer'>
              <label>No</label>
              <input 
                type='radio' 
                name="bestSeller" 
                value="no" 
                onChange={handleBestSellerChange} 
              />
            </div>
          </div>
        </div>

        <label>Description</label>
        <input 
          type='text' 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required 
        />

        <label>Product Image</label>
        <input 
          type='file' 
          onChange={handleImageUpload} 
        /> <br />

        <div className='btnSubmit'>
          <button type='submit'>Submit</button>
        </div>

        {error && <p className='error'>{error}</p>}
      </form>
    </div>
  );
};

export default AddProduct;
