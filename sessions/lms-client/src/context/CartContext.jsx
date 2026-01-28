import { createContext, useContext, useEffect, useState } from "react";
import { addToCartApi, getCartItems } from "../api/cartApi";

const CartContext = createContext({ courses: [] });


export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
 
   const getCart=async ()=>{
  const resposne=await getCartItems();
  setCart(resposne)
  

}
    useEffect(() => {
    getCart(); // 🔥 hydrate once
  }, []);

const addToCart = async (course) => {
    const response= await addToCartApi(course);
     setCart(response)

    
  };

  const removeFromCart = (course) => {
    setCart((prevCart) => prevCart.filter((item) => item.name !== course.name));
  };



   const cartCount = cart?.courses?.reduce(
    (sum, course) => sum + course.quantity,
    0
  );
  
  

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, cartCount,getCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
