import { createContext, useContext, useEffect, useState } from "react";
import { getUserApi, loginUser, logoutUserApi, registerUser } from "../api/authApi";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  const login = async (userData) => {
    try {
      setLoading(true);
      const response = await loginUser(userData);
      setUser(response.user);
      getUser();
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || "Login failed",
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);

      const response = await registerUser(userData);

      setUser(response.user);
      

      return {
        success: true,
        message: response.message || "Registered successfully",
      };
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message ||
          error.message ||
          "Registration failed",
      };
    } finally {
      setLoading(false);
    }
  };
  const logout = async () => {
    try{
     
      
     const response=await logoutUserApi();
     setUser(null);
     return{success:true,response}
    }catch(error){
      return{success:false,error:error.message}
    }
    
  };

  const getUser=async()=>{
    setLoading(true);
    const response=await getUserApi();
    setUser(response);
  

  }
  useEffect(()=>{
    getUser()
  },[])
  return (
    <AuthContext.Provider value={{ user, login, getUser,register, logout, loading ,setUser}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
