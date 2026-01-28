import axiosInstance from "./axiosInstance"


export const addToCartApi=async(item)=>{
   const res=await axiosInstance.post("/cart",{
    data:item,
   },{withCredentials:true})
   
   return res.data;
}
export const getCartItems=async()=>{
   const res=await axiosInstance.get("/cart",{withCredentials:true});
   
   return res.data;
   
}

export const removeFromCartApi=async (item)=>{
 const res=await axiosInstance.delete("/cart",{
   data:item,
  
 })
  return res;
}