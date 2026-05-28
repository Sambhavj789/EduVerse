import { createContext, useContext, useEffect, useState } from "react"
import api from "../utils/api";

const UserContextProvider = createContext();

function UserContext({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    async function refreshUser() {
        try {
            const response = await api.get("/auth/me");
            if (response.data?.success) {
                setUser(response.data?.data);
            }
        }
        catch (err) {
            setUser(null);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        refreshUser();
    }, [])

    return <UserContextProvider.Provider value={{ user, setUser, loading, setLoading, refreshUser }}>
        {children}
    </UserContextProvider.Provider>
}

const useUser = () => {
    const { user, setUser, loading, setLoading, refreshUser } = useContext(UserContextProvider);
    return { user, setUser, loading, setLoading, refreshUser }
}
export { UserContext, useUser };
