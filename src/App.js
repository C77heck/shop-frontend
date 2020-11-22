import React, { useState, useCallback } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';


import { PurchaseContext } from './shared/context/purchase-context';
import { SearchContext } from './shared/context/search-context'
import { usePurchase } from './shared/hooks/purchase-hook';
import { useSearch } from './shared/hooks/search-hook';
import NavigationBar from './shared/navigation/NavigationBar';
import Footer from './shared/footer/Footer'
import CCarousel from './shared/carousel/CCarousel';
import Newscard from './shared/UIElements/NewsCard';
import ProductSlider from './shared/carousel/ProductSlider';
import Admin from './admin/pages/Admin';
import Shopping from './products/pages/Shopping';
import SearchResults from './products/pages/SearchResults';
import Checkout from './products/pages/Checkout';
import Carousel from './shared/carousel/Carousel';


import './App.css';
import { AuthContext } from './shared/context/auth-context';

function App() {


  const { basketItems, number, getNumber, code, add, subtract } = usePurchase()
  const { products, productCode, findProducts } = useSearch();
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false)



  const signin = useCallback((uid, token) => {
    setToken(token);
    setUserId(uid)
  }, []);

  const signout = useCallback(() => {
    setToken(null);
    setUserId(null)
  }, []);

  let routes;

  routes = (
    <Router>
      <Switch>
        <Route path='/' exact>
          <div>
            <NavigationBar />
          </div>
          <div>
            <CCarousel />
          </div>
          <div>
            <Newscard />
          </div>

          <div>
            <ProductSlider />
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
          <div>
            <Carousel />
          </div>
          <div>
            <Footer />
          </div>
        </Route>
        <Redirect to='/' />
      </Switch>
    </Router>
  )

  return (
    <AuthContext.Provider
      value={{
        isloggedIn: !!token,
        token: token,
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
            basketItems: basketItems,
            code: code,
            number: number,
            getNumber: getNumber,
            add: add,
            subtract: subtract
          }}
        >
          <main><div className='center'>{routes}</div></main>
        </PurchaseContext.Provider>
      </SearchContext.Provider>
    </AuthContext.Provider>

  );
}

export default App;
