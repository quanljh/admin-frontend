import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useMainStore } from "./useMainStore";
import { AuthContextProps, User } from "@/types";

const AuthContext = createContext<AuthContextProps>({
    profile: undefined,
    login: () => { },
    logout: () => { },
});

export const AuthProvider = ({ children }: {
    children: React.ReactNode;
}) => {
    const profile = useMainStore(store => store.profile)
    const setProfile = useMainStore(store => store.setProfile)
    const navigate = useNavigate();

    const login = async (profile: User | undefined) => {
        setProfile(profile);
        navigate("/dashboard");
    };

    const logout = () => {
        setProfile(undefined);
        navigate("/dashboard/login", { replace: true });
    };

    const value = useMemo(
        () => ({
            profile,
            login,
            logout,
        }),
        [profile]
    );
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
