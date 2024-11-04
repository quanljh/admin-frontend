import { createContext, useContext, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMainStore } from "./useMainStore";
import { AuthContextProps } from "@/types";
import { getProfile, login as loginRequest, refreshToken } from "@/api/user";
import { toast } from "sonner";

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
    const initialized = useRef(false)
    const lastRefreshedAt = useRef(0)

    useEffect(() => {
        if (initialized.current) {
            return
        }
        initialized.current = true;
        (async () => {
            while (true) {
                if (!profile) {
                    await new Promise((resolve) => setTimeout(resolve, 1000))
                    continue
                }
                if (lastRefreshedAt.current + 1000 * 60 * 10 > Date.now()) {
                    await new Promise((resolve) => setTimeout(resolve, 1000))
                    continue
                }
                try {
                    await refreshToken();
                    const user = await getProfile();
                    setProfile(user);
                    lastRefreshedAt.current = Date.now();
                } catch (error) {
                    setProfile(undefined);
                }
            }
        })();
    }, [profile])

    const navigate = useNavigate();

    const login = async (username: string, password: string) => {
        try {
            await loginRequest(username, password)
            setProfile({ username: username });
            navigate("/dashboard");
        } catch (error: any) {
            toast(error.message);
        }
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
