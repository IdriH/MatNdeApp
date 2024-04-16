// services/api.js

const API_BASE_URL = 'http://10.3.19.58:3000'; // This should be the base URL of your back-end server

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const products = await response.json();
    return products.data; // assuming the server response has a data property with the products
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    throw error;
  }
};

export const fetchProfessionals = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/professionals`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const professionals = await response.json();
      return professionals.data; // assuming the server response has a data property with the products
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
      throw error;
    }
  };

  export const fetchProfessional = async (professionalID) => {
    try {
      const response = await fetch(`${API_BASE_URL}/professional/${professionalID}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const professional = await response.json();
      return professional.data; // assuming the server response has a data property with the professional
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
      throw error;
    }
  };
  
  export const fetchReviewsForProfessional = async(professionalID) => { 
    try{
        const response = await fetch(`${API_BASE_URL}/reviews/${professionalID}`);
        if(!response.ok){
            throw new Error('Network response was not ok');
        }
    const reviews = await response.json();
    return reviews.data;
    }catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        throw error;
      }
  }


  export const submitReview = async (reviewData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/reviews/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              // Ensure these property names match exactly what your backend expects.
              professionalID: reviewData.professionalID, // This is correct as your schema expects a professionalID
              score: reviewData.score,
              reviewerName: reviewData.reviewerName, // Changed to use reviewerName instead of name
              comment: reviewData.comment, // Changed to use comment instead of text
          })
          });
        if (!response.ok) {
            throw new Error('Failed to submit review');
        }

        const result = await response.json();
        console.log('Review submitted successfully', result);
        return result;
    } catch (error) {
        console.error('Error submitting review:', error);
        throw error;
    }
};

export const submitOrder = async (orderData) => {
  try {
      const response = await fetch(`${API_BASE_URL}/orders/add`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData) // Directly pass the correctly structured `orderData`
      });
      if (!response.ok) {
          throw new Error('Failed to submit order');
      }

      const result = await response.json();
      console.log('Order submitted successfully', result);
      return result;
  } catch (error) {
      console.error('Error submitting order:', error);
      throw error;
  }
};

export const fetchOrdersForProfessional = async (professionalID) => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/professionals/${professionalID}`);
    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }
    const orders = await response.json();
    return orders.data; // Assuming your API returns an object with a 'data' field containing the orders
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

// api.js

export const toggleProfessionalStatus = async (professionalID) => {
  try {
    const response = await fetch(`${API_BASE_URL}/professionals/status/${professionalID}`, {
      method: 'GET', // Assuming GET request is sufficient as per your route setup
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data; // Returns the updated professional data
  } catch (error) {
    console.error('Error toggling professional status:', error);
    throw error; // Rethrow to handle it in the component
  }
};

// api.js
export const addProduct = async (productData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) {
      throw new Error('Failed to add product');
    }
    const data = await response.json();
    return data; // Returns the response from the server
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

// api.js
export const updateProduct = async (productID, productData) => {
  try {
    console.log(productID)
    const response = await fetch(`${API_BASE_URL}/products/modify/${productID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) {
      throw new Error('Failed to update product');
    }
    const data = await response.json();
    return data.data; // Returns the response from the server
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};



