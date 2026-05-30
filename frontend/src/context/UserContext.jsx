import { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";

const UserContextProvider = createContext();

function UserContext({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getMe() {
    try {
      const response = await api.get("/auth/me");
      if (response.data?.success) {
        setUser(response.data?.data);
      }
    } catch (err) {
      console.log(err);
    //   toast.error(err.response?.data?.message || "Inetrnal Server Error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMe();
  }, []);

  async function logout() {
    try {
      const response = await api.post("/auth/logout");
      if (response.data?.success) {
        toast.success("Logout Successfully");
        setUser(null);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Internal Server Error");
    }
  }

  return (
    <UserContextProvider.Provider
      value={{ user, setUser, loading, setLoading, logout }}
    >
      {children}
    </UserContextProvider.Provider>
  );
}

const useUser = () => {
  const { user, setUser, loading, setLoading, logout } =
    useContext(UserContextProvider);
  return { user, setUser, loading, setLoading, logout };
};
export { UserContext, useUser };
