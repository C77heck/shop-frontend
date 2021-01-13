
import { createContext } from 'react';


export const AdminContext = createContext({
    adminId: null,
    isAdminLoggedIn: false,
    adminSignin: () => { },
    adminSignout: () => { }
});
