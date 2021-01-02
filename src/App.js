import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import { useAuth } from './shared/hooks/auth-hook';
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
import ThankYou from './products/pages/ThankYou'
import UserInfo from './users/pages/UserInfo';
import PassRecovery from './users/pages/PassRecovery';
import ViewOrders from './users/pages/ViewOrders';

import './App.css';


function App() {

  const {
    code,
    saveToLocalStorage,
    add,
    subtract,
    basket,
    basketContent,
    updateBasket,
    deleteItem
  } = usePurchase()

  const { products, productCode, findProducts } = useSearch();

  const { signin, signout, token, userId } = useAuth();

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
            <Footer show={'scroll-button'} />
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
          </div>
        </Route>
        <Route path='/thankyou' exact>
          <div>
            <NavigationBar />
          </div>
          <div>
            <ThankYou />
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
        <Route path='/userdata' exact>
          <div>
            <NavigationBar />
          </div>
          <div>
            <UserInfo />
          </div>
          <div>
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
        <Route path='/orderhistory' exact>
          <div>
            <NavigationBar />
          </div>
          <div>
            <ViewOrders />
          </div>
          <div>
            <Footer />
          </div>
        </Route>
        <Route path='/passwordrecovery/:userId' exact>
          <div>
            <PassRecovery />
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
            deleteItem: deleteItem,
            basket: basket,
            basketContent: basketContent,
            updateBasket: updateBasket
          }}
        >
          <main><div className='center'>{routes}</div></main>
        </PurchaseContext.Provider>
      </SearchContext.Provider>
    </AuthContext.Provider>

  );
}

export default App;
