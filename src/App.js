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
import NotMe from './users/pages/NotMe';



import './App.css';
import FavouriteIcon from './products/components/FavouriteIcon';


function App() {

  const {
    code,
    favouriteHandler,
    saveToLocalStorage,
    add,
    subtract,
    basket,
    basketContent,
    clearBasket,
    deleteItem
  } = usePurchase()

  const { products, productCode, findProducts } = useSearch();

  const { signin, signout, token, userId, favourites } = useAuth();

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
            <FavouriteIcon />
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
        <Route path='/userdata/:userId' exact>
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
        <Route path='/orderhistory/:userId' exact>
          <div>
            <NavigationBar />
          </div>
          <div>
            <ViewOrders />
          </div>
        </Route>
        <Route path='/passwordrecovery/:requestId' exact>
          <div>
            <PassRecovery />
          </div>
        </Route>
        <Route path='/notme/:requestId' exact>
          <div>
            <NotMe />
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
        favourites: favourites,
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
            favouriteHandler: favouriteHandler,
            saveToLocalStorage: saveToLocalStorage,
            clearBasket: clearBasket,
            add: add,
            subtract: subtract,
            deleteItem: deleteItem,
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
