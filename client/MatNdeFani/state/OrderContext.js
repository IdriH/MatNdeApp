import React, { createContext, useContext, useState } from 'react';

const OrderContext = createContext();
const dummyOrders = [
    {
      orderId :1,
      professionalID: 1,
      products: [
        { name: 'Hammer', quantity: 2, price: 15 },
        { name: 'Nail Pack', quantity: 3, price: 5 },
      ],
      accepted: false,
      createdAt: '2024-03-28T12:00:00Z', // ISO 8601 format timestamp
      status : 'pending'
    },
    {
      orderID: 2,
      professionalID: 2,
      products: [
        { name: 'Screwdriver', quantity: 1, price: 10 },
        { name: 'Wrench', quantity: 2, price: 20 },
      ],
      accepted: false,
      createdAt: '2024-03-29T12:00:00Z',
      status: 'pending'
    },
    {
      orderID :3 ,
      professionalID: 3,
      products: [
        { name: 'Hammer', quantity: 2, price: 15 },
        { name: 'Nail Pack', quantity: 3, price: 5 }, 
      ],
      accepted: false,
      createdAt: '2024-03-30T12:00:00Z',
      status :'pending'
    },
    {
      orderID : 4, 
      professionalID: 4,
      products: [
        { name: 'Screwdriver', quantity: 1, price: 10 },
        { name: 'Wrench', quantity: 2, price: 20 },
      ],
      accepted: false,
      createdAt: '2024-03-31T12:00:00Z',
      status : 'pending',
    },
    {
      orderID : 5,
      professionalID: 5,
      products: [
        { name: 'Hammer', quantity: 2, price: 15 },
        { name: 'Nail Pack', quantity: 3, price: 5 },
      ],
      accepted: false,
      createdAt: '2024-04-01T12:00:00Z',
      status : 'pending',
    },
    {
      orderID : 6,
      professionalID: 6,
      products: [
        { name: 'Screwdriver', quantity: 1, price: 10 },
        { name: 'Wrench', quantity: 2, price: 20 },
      ],
      accepted: false,
      createdAt: '2024-04-02T12:00:00Z',
      status : 'pending',
    },
  ];
  

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(dummyOrders);

  const addOrder = (order) => {
    setOrders([...orders, order]);
  };

  const removeOrder = (orderId) => {
    setOrders(orders.filter(order => order.id !== orderId));
  };

  // More functions to modify orders can be added here

  return (
    <OrderContext.Provider value={{ orders, addOrder, removeOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
