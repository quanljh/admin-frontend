import { User } from "./user";

export interface AuthContextProps {
    profile: User | undefined;
    login: (profile: User | undefined) => void;
    logout: () => void;
}