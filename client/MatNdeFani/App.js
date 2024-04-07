import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screen imports
import HomeScreen from './screens/HomeScreen';
import ProductsScreen from './screens/ProductsScreen';
import ModifyProductScreen from './screens/ModifyProductScreen';
import ProfessionalsScreen from './screens/ProfessionalsScreen';
import ViewProfessionalScreen from './screens/ViewProfessionalScreen';
import OrdersScreen from './screens/OrdersScreen';
import OrderScreen from './screens/OrderScreen';
import LoginScreen from './screens/LoginScreen';
import AddReviewScreen from './screens/AddReviewScreen';
import AddProductScreen from './screens/AddProductScreen'

import { UserProvider } from './state/UserContext';
import { OrderProvider } from './state/OrderContext';
import { ProductProvider } from './state/ProductsContext';
// Create the stack navigator
const Stack = createNativeStackNavigator();


const App = () => {
  return (
    <UserProvider> 
      <ProductProvider>
        <OrderProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Products" component={ProductsScreen} />
              <Stack.Screen name="ModifyProduct" component={ModifyProductScreen} />
              <Stack.Screen name = "AddProduct" component = {AddProductScreen}/>
              <Stack.Screen name="Professionals" component={ProfessionalsScreen} />
              <Stack.Screen name="ViewProfessional" component={ViewProfessionalScreen} />
              <Stack.Screen name = "AddReview" component={ AddReviewScreen}></Stack.Screen>
              <Stack.Screen name="Orders" component={OrdersScreen} />
              <Stack.Screen name="Order" component={OrderScreen} />
              <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
          </NavigationContainer>
        </OrderProvider>
      </ProductProvider>
    </UserProvider> 
)};

export default App;
