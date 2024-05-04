// services/api.js

const API_BASE_URL = 'http://192.168.30.30:3000'; // This should be the base URL of your back-end server
export default API_BASE_URL;

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
          const result = await response.json();
        if (!response.ok) {
            throw new Error(result.error || 'Failed to submit review');
        }

        
        console.log('Review submitted successfully', result);
        return result;
    } catch (error) {
        console.error('Error submitting review:', error);
        throw error;
    }
};

export const submitOrder = async (orderData) => {
  try {
      console.log(JSON.stringify(orderData) + "LLLLLLLLLLLLLLLLL")
      const response = await fetch(`${API_BASE_URL}/orders/add`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData) // Directly pass the correctly structured `orderData`
      });
      if (!response.ok) {
          throw new Error(response.error || 'Failed to submit order'  );
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

export const addProduct = async (productData) => {
  try {
      const response = await fetch(`${API_BASE_URL}/products/add`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData),
      });
      const data = await response.json();  // Parse JSON response in all cases to get error details
      if (!response.ok) {
          throw new Error(data.error || 'Failed to add product');
      }
      return data;
  } catch (error) {
      console.error('Error adding product:', error);
      throw error;  // Ensure the error object is thrown with message intact
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
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Failed to update product');
    }
    
    return data; // Returns the response from the server
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/delete/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response)
    if (!response.ok) {
      throw new Error('Failed to delete product');
    }
    return await response.json(); // Returns the server's response which should indicate success
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};


/**
 * Fetches all orders from the backend. This function is intended to be used by admins
 * to retrieve all orders in the system.
 */
export const fetchAllOrders = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders`);
    if (!response.ok) {
      throw new Error('Failed to fetch all orders');
    }
    const orders = await response.json();
    return orders.data; // Assuming the API returns an object with a 'data' field containing all the orders
  } catch (error) {
    console.error('Error fetching all orders:', error);
    throw error;
  }
};
/*
export const acceptOrder = async (orderId) => {
  try {
      const response = await fetch(`${API_BASE_URL}/orders/accept/${orderId}`, {
          method: 'PUT'
      });
      if (!response.ok) {
          throw new Error('Failed to accept order:' + response.error);
      }
      return await response.json();
  } catch (error) {
      console.error('Error accepting order:', error);
      throw error;
  }
};
*/
export const acceptOrder = async (orderId) => {
  try {
      const response = await fetch(`${API_BASE_URL}/orders/accept/${orderId}`, {
          method: 'PUT'
      });
      const data = await response.json();
      if (!response.ok) {
          // Throw an error with the backend message if available
         console.error(data.error + "DEDEDEDEDEDEDEDE")
          throw new Error(data.error);
      }
      return data;
  } catch (error) {
      console.error(error + "EEEEEEEEEEEEEEEEEE")
      console.error('Error accepting order:', error);
      // Rethrow the error to be caught in the handling function
      throw error;
  }
};



export const declineOrder = async (orderId) => {
  try {
      const response = await fetch(`${API_BASE_URL}/orders/decline/${orderId}`, {
          method: 'PUT'
      });
      if (!response.ok) {
          throw new Error('Failed to decline order');
      }
      return await response.json();
  } catch (error) {
      console.error('Error declining order:', error);
      throw error;
  }
};


/////////////////////
export const login = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Unable to login');
    }
    return await response.json();  // Assuming the server sends back the user data
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};


export const checkCurrentSession = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/sessions/current`, {
      method: 'GET',
      credentials: 'include',  // Needed to include cookies
    });
    if (!response.ok) {
      throw new Error('Not authenticated');
    }
    return await response.json();
  } catch (error) {
    console.error('Check session error:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/sessions/current`, {
      method: 'DELETE',
      credentials: 'include',  // Needed to include cookies
    });
    if (!response.ok) {
      throw new Error('Failed to logout');
    }
    return await response.json();  // Just confirming the logout was successful
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

export const addProfessional = async (formData) => {
  try {

    const response = await fetch(`${API_BASE_URL}/professionals/add`, {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Failed to add professional');
    }
    return data;
  } catch (error) {
    console.error('Error adding professional:', error);
    throw error;
  }
};


export const modifyProfessional = async (professionalID, updatedFields) => {
  try {
    console.log("Api caled")
    const response = await fetch(`${API_BASE_URL}/professionals/modify`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        professionalID: professionalID,
        ...updatedFields
      })
    });

    if (!response.ok) {
      throw new Error('Failed to modify professional');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};


/**
 * Deletes a professional by their ID.
 * @param {string} professionalID - The ID of the professional to be deleted.
 * @returns {Promise} - A Promise that resolves to the server's response.
 */
export const deleteProfessional = async (professionalID) => {
  try {
    const response = await fetch(`${API_BASE_URL}/professionals/delete/${professionalID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      // If authentication is needed, ensure to include credentials or a token header
      // credentials: 'include' or headers: { Authorization: `Bearer ${token}` }
    });

    if (!response.ok) {
      // If the server responds with an error status, throw an error with the response
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete professional');
    }

    // If the response is successful, return the JSON data
    return await response.json();
  } catch (error) {
    console.error('Error deleting professional:', error.message);
    throw error; // Rethrow the error to handle it where the function is called
  }
};

export const deleteOrder = async (orderId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/delete/${orderId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      // If authentication is needed, ensure to include credentials or a token header
      // credentials: 'include' or headers: { Authorization: `Bearer ${token}` }
    });

    if (!response.ok) {
      // If the server responds with an error status, throw an error with the response
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete order');
    }

    // If the response is successful, return the JSON data
    return await response.json();
  } catch (error) {
    console.error('Error deleting order:', error.message);
    throw error; // Rethrow the error to handle it where the function is called
  }
};

export const deleteReview = async (reviewId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/reviews/delete/${reviewId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      // If authentication is needed, ensure to include credentials or a token header
      // credentials: 'include' or headers: { Authorization: `Bearer ${token}` }
    });

    if (!response.ok) {
      // If the server responds with an error status, throw an error with the response
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete review');
    }

    // If the response is successful, return the JSON data
    return await response.json();
  } catch (error) {
    console.error('Error deleting review:', error.message);
    throw error; // Rethrow the error to handle it where the function is called
  }
};




