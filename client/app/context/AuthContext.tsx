import {createContext, useContext, useEffect, useState} from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { register } from 'module';

interface AuthProps {
    authState?: {token : string | null; authenticated: boolean | null};
    onRegister?: (email: string, password: string) => Promise<any>; 
    onLogin?: (email: string, password: string) => Promise<any>;
    onLogout?: () => Promise<any>;   
}

const TOKEN_KEY = "asfdl";
export const API_URL = "http://10.64.45.17:8080";
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({children}: any) => {
    const [authState, setAuthState] = useState<{
        token: string | null; authenticated: boolean | null}>({token: null, authenticated: null});
    
    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);
            if (token) {
                setAuthState({token:token, authenticated: true});
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }
        }
        loadToken();
    }, []);
    const register = async (email: string, password: string) => {
        try {
            return await axios.post(`${API_URL}/users`, {email, password});
        } catch (error) {
            console.error(error);
        }
    }

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post(`${API_URL}/auth`, {email, password});
            setAuthState({token: response.data.token, authenticated: true});
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            await SecureStore.setItemAsync(TOKEN_KEY, response.data.token);
            console.log(response.data.token);
            return response;
        } catch (error) {
            console.error(error);
        }
    }

    const logout = async () => {
        try {
            setAuthState({token: null, authenticated: false});
            axios.defaults.headers.common['Authorization'] = '';
            await SecureStore.deleteItemAsync(TOKEN_KEY);
        } catch (error) {
            console.error(error);
        }
    }

    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        authState
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}