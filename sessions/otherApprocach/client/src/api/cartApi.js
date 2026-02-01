import axiosInstance from "./axiosInstance";

export const getCartApi = async () => {
  const response = await axiosInstance.get("/cart");
  
  return response.data.courses;
};
export const addToCartAPi = async (courseId) => {
  const response = await axiosInstance.post(
    "/cart",
    {
      courseId: courseId,
    },
   
  );
  return response;
};

export const deleteCartApi = async (courseId) => {
  const response = await axiosInstance.delete(
    `/cart/${courseId}`,
   
  );
  return response;
};
