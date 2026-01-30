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
