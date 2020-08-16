import { createContext, useContext } from 'react';

const AuthContext = createContext();

export default AuthContext;

export function useAuthContext() {
    return useContext(AuthContext);
}