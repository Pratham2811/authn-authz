import axiosInstance from "./axiosInstance"


export const addToCart=async(item)=>{
   const res=await axiosInstance.post("/cart",{
    data:item,
   })
   console.log(res);
   
}