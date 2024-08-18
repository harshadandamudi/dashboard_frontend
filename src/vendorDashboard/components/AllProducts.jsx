import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const productsHandler = async () => {
    const firmId = localStorage.getItem('firmId');
    try {
      const response = await axios.get(`http://localhost:4200/product/${firmId}/products`);

      console.log("API Response:", response);

      const newProductData = response.data.products; 

      if (Array.isArray(newProductData) && newProductData.length > 0) {
        setProducts(newProductData);
      } else {
        console.warn("Products data is not in the expected format or is empty:", newProductData);
        setProducts([]); 
      }

      console.log("Fetched Products:", newProductData);
    } catch (error) {
      console.error("Failed to fetch products", error);
      alert("Failed to fetch products");
      setProducts([]); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    productsHandler();
    console.log("This is useEffect");
  }, []);

  const handleDelete = async (productId) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:4200/product/${productId}`);
        setProducts(products.filter(product => product._id !== productId));
        alert("Product deleted successfully");
        console.log(`Deleted product with ID: ${productId}`);
      } catch (error) {
        console.error(`Failed to delete product with ID: ${productId}`, error);
        alert(`Failed to delete product`);
      }
    }
  };

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <div>
      {products.length === 0 ? (
        <p>No products added</p>
      ) : (
        <table className='product-table'>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item._id}>
                <td>{item.productName}</td>
                <td>{item.price}</td>
                <td>
                  {item.image ? (
                    <img 
                      src={`http://localhost:4000/uploads/${item.image}`} 
                      alt={item.productName} 
                      style={{ width: '100px', height: 'auto' }} 
                    />
                  ) : (
                    <p>No Image Available</p>
                  )}
                </td>
                <td>
                  <button onClick={() => handleDelete(item._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllProducts;
