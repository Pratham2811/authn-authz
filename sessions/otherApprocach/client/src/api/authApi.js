import axiosInstance from "./axiosInstance";



export const registerUser = async (userData) => {
  const { data } = await axiosInstance.post(
    "/auth/register",
    userData
  );
  return data;
};

export const loginUser = async (userData) => {
  const {data} = await axiosInstance.post("/auth/login", 
    userData
  );
  
  return data;
};

export const getUserApi=async()=>{
  const {data}=await axiosInstance.get("auth/me");
  return data.user;
}
export const logoutUserApi=async()=>{
   console.log("logout recived");
  const {data}=await axiosInstance.post("auth/logout");
  return data;

}