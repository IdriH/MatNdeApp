import React, { createContext, useContext, useState } from 'react';

const ProductContext = createContext();

const dummyProductsData = [
    {
      id: '1',
      name: 'Hammer',
      category: 'Tools',
      distributor: 'Global Tools',
      manufacturer: 'Hammers Inc.',
      origin: 'USA',
      priceBought: 19.99,
      priceSold: 29.99,
      quantity: 30,
    },
    {
      id: '2',
      name: 'Drill',
      category: 'Tools',
      distributor: 'Global Tools',
      manufacturer: 'Drills Ltd.',
      origin: 'Germany',
      priceBought: 60.00,
      priceSold: 89.99,
      quantity: 20,
    },
    {
      id: '3',
      name: 'Screwdriver Set',
      category: 'Accessories',
      distributor: 'Fix-It',
      manufacturer: 'ScrewThis Company',
      origin: 'China',
      priceBought: 10.00,
      priceSold: 19.99,
      quantity: 15,
    },
    {
      id: '4',
      name: 'Circular Saw',
      category: 'Tools',
      distributor: 'Cutting Edge',
      manufacturer: 'SawMakers',
      origin: 'USA',
      priceBought: 75.00,
      priceSold: 129.99,
      quantity: 10,
    },
    {
      id: '5',
      name: 'Wrench Set',
      category: 'Tools',
      distributor: 'Tool World',
      manufacturer: 'Spanners & Co.',
      origin: 'UK',
      priceBought: 20.00,
      priceSold: 34.99,
      quantity: 25,
    },
    {
      id: '6',
      name: 'Pliers',
      category: 'Tools',
      distributor: 'Handy Helpers',
      manufacturer: 'GripIt',
      origin: 'USA',
      priceBought: 5.00,
      priceSold: 9.99,
      quantity: 50,
    },
    {
      id: '7',
      name: 'Laser Level',
      category: 'Accessories',
      distributor: 'Level Best',
      manufacturer: 'LaserLine',
      origin: 'Sweden',
      priceBought: 45.00,
      priceSold: 69.99,
      quantity: 20,
    },
    // ... potentially more products
  ];

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(dummyProductsData);

  const addProduct = (product) => {
    setProducts([...products, product]);
  };

  const updateProduct = (updatedProduct) => {
    setProducts(products.map(product => product.id === updatedProduct.id ? updatedProduct : product));
  };

  const removeProduct = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, removeProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
