import React, { createContext, useContext, useState,useEffect } from 'react';
import { fetchProducts } from '../services/api';

const ProductContext = createContext();


export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsFromApi = await fetchProducts();
        //console.log("fetched products")
        setProducts(productsFromApi);
        
      } catch (error) {
        console.error('Failed to fetch products:', error);
        // Here you might want to handle the error, for example by setting an error state
      }
    };

    loadProducts();
  }, []);// putting products as a dependency will be to expensive to refetch everytime the array changes

  //thats why we will use addProduct To do optimistic update for the admin case
  //addPRoduct optimistic update
  
  
  const updateProducts = async () => {
    
    try {
      const productsFromApi = await fetchProducts();
      setProducts(productsFromApi);
    } catch (error) {
      console.error('Failed to update products:', error);
      // Handle the error as needed
    }
  };
  

  const addProductOptimistic = (product) => {
    setProducts([...products, product]);
  };

  const updateProductsOptimistic = (updatedProduct) => {
    setProducts((prevProducts) => 
      prevProducts.map(product => product._id === updatedProduct._id ? updatedProduct : product)
    );
  };
  

  const removeProduct = (productId) => {
    setProducts(products.filter(product => product._id !== productId));
  };

  // In your ProductProvider
return (
  <ProductContext.Provider value={{ products, setProducts, addProductOptimistic, updateProductsOptimistic, removeProduct,updateProducts }}>
    {children}
  </ProductContext.Provider>
);

};
