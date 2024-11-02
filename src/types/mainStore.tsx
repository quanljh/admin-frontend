import { User } from "./user";

export interface MainStore {
    profile: User | undefined;
    setProfile: (profile: User | undefined) => void;
}