import React, { useState } from 'react';
import axios from 'axios';

const AddFirm = () => {
  const [firmName, setFirmName] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const handleRegionChange = (event) => {
    const value = event.target.value;
    if (region.includes(value)) {
      setRegion(region.filter((item) => item !== value));
    } else {
      setRegion([...region, value]);
    }
  };

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    setFile(selectedImage);
  };

  const handleFirmSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginToken = localStorage.getItem('loginToken');
      if (!loginToken) {
        throw new Error("User not authenticated");
      }

      const formData = new FormData();
      formData.append('firmName', firmName);
      formData.append('area', area);
      formData.append('offer', offer);
      formData.append('image', file);
      category.forEach((value) => formData.append('category', value));
      region.forEach((value) => formData.append('region', value));

      const response = await axios.post(
        "http://localhost:4200/firm/add-firm",
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'token': loginToken,
          },
        }
      );

      if (response.status === 200) {
        alert("Firm added successfully");

        // Store firmId in localStorage
        const firmId = response.data.firmId;
        localStorage.setItem('firmId', firmId);

        // Reset form fields after successful submission
        setFirmName("");
        setArea("");
        setCategory([]);
        setRegion([]);
        setOffer("");
        setFile(null);
      } else if (response.data.message === "vendor can have only 1 firm") {
        alert("Firm exists, only 1 firm can be added");
      } else {
        setError("Failed to add firm. Please try again.");
      }

    } catch (error) {
      console.error("Failed to add firm", error.response ? error.response.data : error.message);
      setError("Failed to add firm. Please try again.");
    }
  };

  return (
    <div className='firmSection'>
      <form className='tableForm' onSubmit={handleFirmSubmit}>
        <h3>Add Firm</h3>

        <label>Firm Name</label>
        <input type='text' name='firmName' value={firmName} onChange={(e) => setFirmName(e.target.value)} required />

        <label>Area</label>
        <input type='text' name='area' value={area} onChange={(e) => setArea(e.target.value)} required />

        <div className='checkinp'>
          <label>Category</label>
          <div className='inputsContainer'>
            <div className='checkboxContainer'>
              <label>Veg</label>
              <input type="checkbox" checked={category.includes('veg')} value="veg" onChange={handleCategoryChange} />
            </div>
            <div className='checkboxContainer'>
              <label>Non-Veg</label>
              <input type='checkbox' checked={category.includes('non-veg')} value="non-veg" onChange={handleCategoryChange} />
            </div>
          </div>
        </div>

        <div className='checkinp'>
          <label>Region</label>
          <div className='inputsContainer'>
            <div className='checkboxContainer'>
              <label>South Indian</label>
              <input type="checkbox" value="south-indian" checked={region.includes('south-indian')} onChange={handleRegionChange} />
            </div>
            <div className='checkboxContainer'>
              <label>North Indian</label>
              <input type="checkbox" value="north-indian" checked={region.includes('north-indian')} onChange={handleRegionChange} />
            </div>
            <div className='checkboxContainer'>
              <label>Chinese</label>
              <input type="checkbox" value="chinese" checked={region.includes('chinese')} onChange={handleRegionChange} />
            </div>
            <div className='checkboxContainer'>
              <label>Bakery</label>
              <input type="checkbox" value="bakery" checked={region.includes('bakery')} onChange={handleRegionChange} />
            </div>
          </div>
        </div>

        <label>Offer</label>
        <input type='text' name='offer' value={offer} onChange={(e) => setOffer(e.target.value)} />

        <label>Firm Image</label>
        <input type='file' onChange={handleImageUpload} /> <br />

        <div className='btnSubmit'>
          <button type='submit'>Submit</button>
        </div>

        {error && <p className='error'>{error}</p>}
      </form>
    </div>
  );
}

export default AddFirm;
