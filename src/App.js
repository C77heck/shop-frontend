import React, { useState, useCallback, useEffect, useContext } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import { useHttpClient } from './shared/hooks/http-hook';
import { AuthContext } from './shared/context/auth-context';
import { PurchaseContext } from './shared/context/purchase-context';
import { SearchContext } from './shared/context/search-context'
import { usePurchase } from './shared/hooks/purchase-hook';
import { useSearch } from './shared/hooks/search-hook';
import NavigationBar from './shared/navigation/NavigationBar';
import Footer from './shared/footer/Footer'
import Newscard from './shared/UIElements/NewsCard';
import Admin from './admin/pages/Admin';
import Shopping from './products/pages/Shopping';
import SearchResults from './products/pages/SearchResults';
import Checkout from './products/pages/Checkout';
import Carousel from './shared/carousel/Carousel';



import './App.css';

function App() {

  const { sendRequest } = useHttpClient();
  const {
    code,
    saveToLocalStorage,
    add,
    subtract,
    basket,
    updateBasket,
    basketContent
  } = usePurchase()
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false)
  //  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const signin = useCallback((uid, token) => {
    (async () => {
      try {
        const responseData = await sendRequest(process.env.REACT_APP_BACKEND)
        saveToLocalStorage(responseData.products.map(i => {
          return {
            ...i,
            number: 0,
            totalPrice: 0
          }
        }))
      } catch (err) {
      }
    })()
    setToken(token);
    setUserId(uid);
    //    setIsLoggedIn(true)
    localStorage.setItem('userData',
      JSON.stringify({ userId: uid, token: token })
    )

  }, []);

  const signout = useCallback(() => {
    setToken(null);
    setUserId(null)
    localStorage.removeItem('userData')
    localStorage.removeItem('basketContent')

  }, []);



  const { products, productCode, findProducts } = useSearch();


  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'))
    if (storedData) {
      signin(storedData.userId, storedData.token)
    }
  }, [signin])

  let routes;

  routes = (
    <Router>
      <Switch>
        <Route path='/' exact>
          <div>
            <NavigationBar />
          </div>
          <div>
            <Carousel
              className=''
              element='img'
            />
          </div>
          <div>
            <Newscard />
          </div>

          <div>
            <Carousel
              className={'_product-slider'}
              animation='special'
            />
          </div>
          <div>
            <Footer />
          </div>
        </Route>
        <Route path='/admin' exact>
          <div>
            <NavigationBar />
          </div>
          <div>
            <Admin />
          </div>
          <div>
            <Footer />
          </div>
        </Route>
        <Route path='/shopping' exact>
          <div>
            <NavigationBar />
          </div>
          <div>
            <Shopping />
          </div>
          <div>
            <Footer />
          </div>
        </Route>
        <Route path='/searchresults' exact>
          <div>
            <NavigationBar />
          </div>
          <div>
            <SearchResults />
          </div>
          <div>
            <Footer />
          </div>
        </Route>
        <Route path='/checkout' exact>
          <div>
            <NavigationBar />
          </div>
          <div>
            <Checkout />
          </div>
          <div>
            <Footer />
          </div>
        </Route>
        <Route path='/contact' exact>
          <div>
            <NavigationBar />
          </div>


        </Route>
        <Redirect to='/' />
      </Switch>
    </Router>
  )

  return (
    <AuthContext.Provider
      value={{
        token: token,
        isLoggedIn: !!token,
        userId: userId,
        signin: signin,
        signout: signout
      }}
    >
      <SearchContext.Provider
        value={{
          products: products,
          productCode: productCode,
          findProducts: findProducts
        }}
      >
        <PurchaseContext.Provider
          value={{
            code: code,
            saveToLocalStorage: saveToLocalStorage,
            add: add,
            subtract: subtract,
            updateBasket: updateBasket,
            basket: basket,
            basketContent: basketContent
          }}
        >
          <main><div className='center'>{routes}</div></main>
        </PurchaseContext.Provider>
      </SearchContext.Provider>
    </AuthContext.Provider>

  );
}

export default App;
