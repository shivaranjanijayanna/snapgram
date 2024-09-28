import { getCurrentUser } from '@/lib/appwrite/api';
import { IContextType, IUser } from '@/types';
import {createContext, useContext, useEffect, useState} from 'react';

export const INTIAL_USER = {
    id: '',
    name: '',
    username: '',
    email: '',
    imageUrl: '',
    bio: '',
},


export const INTIAL_STATE = {
    user: INTIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser: () => {},
    setIsAuthenticated : () => {},
    checkAuthUser : async () => false as boolean,
}

const AuthContext = createContext<IContextType>(INTIAL_STATE);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<IUser>(INTIAL_USER);
    const [isLoading, setisLoading] = useState(false);
    const [isAuthenticated, setisAuthenticated] = useState(false);

    const checkAuthUser = async() => {
        try {
            const currentAccount = await getCurrentUser();

            if(currentAccount){
                setUser({ 
                    id:currentAccount.$id, 
                    name: currentAccount.name, 
                    username: currentAccount.username, 
                    email: currentAccount.email, 
                    imageUrl: currentAccount.imageUrl, 
                    bio: currentAccount.bio,
                })
            }
        } catch (error) {
            console.log(error)
            return false;
        } finally {
            setisLoading(false);
        }
    };

    const value = {
        user,
        setUser,
        isLoading,
        isAuthenticated,
        setisAuthenticated,
        checkAuthUser,
    }

  return (
    <AuthContext.Provider value={value}>
    
    </AuthContext.Provider>
  )
}

export default AuthContext