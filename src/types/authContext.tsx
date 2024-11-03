import { User } from "./user";

export interface AuthContextProps {
    profile: User | undefined;
    login: (username: string, password: string) => void;
    logout: () => void;
}