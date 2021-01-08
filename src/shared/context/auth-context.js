
import { createContext } from 'react';


export const AuthContext = createContext({
  userId: null,
  token: null,
  isLoggedIn: false,
  isAdmin: false,
  favourites: [],
  signin: () => { },
  signout: () => { }
});
