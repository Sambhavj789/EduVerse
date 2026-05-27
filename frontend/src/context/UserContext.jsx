import { createContext, useContext, useEffect, useState } from "react"
import api from "../utils/api";

const UserContextProvider = createContext();

function UserContext({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getMe() {
            const response = await api.get("/auth/me");
            if (response.data?.success) {
                setUser(response.data?.data);
            }
            setLoading(false);
        }
        getMe();
    }, [])

    return <UserContextProvider.Provider value={{ user, setUser, loading, setLoading }}>
        {children}
    </UserContextProvider.Provider>
}

const useUser = () => {
    const { user, setUser, loading, setLoading } = useContext(UserContextProvider);
    return { user, setUser, loading, setLoading }
}
export { UserContext, useUser };