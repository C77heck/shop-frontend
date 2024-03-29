import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import { AdminContext } from './shared/context/admin-context';
import { useAdmin } from './shared/hooks/admin-hook';
import { useAuth } from './shared/hooks/auth-hook';
import { AuthContext } from './shared/context/auth-context';
import { PurchaseContext } from './shared/context/purchase-context';
import { SearchContext } from './shared/context/search-context'
import { usePurchase } from './shared/hooks/purchase-hook';
import { useSearch } from './shared/hooks/search-hook';
import NavigationBar from './shared/navigation/NavigationBar';
import Carousel from './shared/carousel/Carousel';
import LoadingSpinner from './shared/UIElements/LoadingSpinner';
import Welcome from './users/components/Welcome';
import Footer from './shared/footer/Footer'
import Newscard from './shared/UIElements/NewsCard';
import './App.css';

const Shopping = React.lazy(() => import('./products/pages/Shopping'))
const Contact = React.lazy(() => import('./users/pages/Contact'))
const Upload = React.lazy(() => import('./admin/pages/Upload'))
const Admin = React.lazy(() => import('./admin/pages/Admin'))
const SearchResults = React.lazy(() => import('./products/pages/SearchResults'))
const Checkout = React.lazy(() => import('./products/pages/Checkout'))
const ThankYou = React.lazy(() => import('./products/pages/ThankYou'))
const UserInfo = React.lazy(() => import('./users/pages/UserInfo'))
const PassRecovery = React.lazy(() => import('./users/pages/PassRecovery'))
const ViewOrders = React.lazy(() => import('./users/pages/ViewOrders'))
const NotMe = React.lazy(() => import('./users/pages/NotMe'))
const Favourites = React.lazy(() => import('./users/pages/Favourites'))

function App() {

  const { adminId, isAdminLoggedIn, adminSignin, adminSignout } = useAdmin()

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

  const { searchCriteria, search } = useSearch();

  const { signin, signout, token, userId, favourites } = useAuth();

  let routes;

  routes = (
    <Router>
      <Switch>
        <Route path='/' exact>
          <NavigationBar />
          <div >
            <Welcome />
          </div>
          <Carousel
            className=''
            element='img'
          />
          <Newscard />
          <Carousel
            className={'_product-slider'}
            animation='special'
          />
          <Footer />
        </Route>
        <Route path='/admin' exact>
          <NavigationBar />
          <Admin />
          <Footer />
        </Route>
        <Route path='/shopping' exact>
          <NavigationBar />
          <Shopping />
          <Footer show={'scroll-button'} />
        </Route>
        <Route path='/searchresults' exact>
          <NavigationBar />
          <SearchResults />
        </Route>
        <Route path='/checkout' exact>
          <NavigationBar />
          <Checkout />
          <Footer />
        </Route>
        <Route path='/contact' exact>
          <NavigationBar />
          <Contact />
          <Footer />
        </Route>
        <Route path='/admin/resources' exact>
          <NavigationBar />
          <Upload />
          <Footer />
        </Route>
        <Route path='/thankyou' exact>
          <NavigationBar />
          <ThankYou />
          <Newscard />
          <Carousel
            className={'_product-slider'}
            animation='special'
          />
          <Footer />
        </Route>
        <Route path='/userdata/:userId' exact>
          <NavigationBar />
          <UserInfo />
          <Carousel
            className={'_product-slider'}
            animation='special'
          />
          <Footer />
        </Route>
        <Route path='/orderhistory/:userId' exact>
          <NavigationBar />
          <ViewOrders />
        </Route>
        <Route path='/favourites/:userId' exact>
          <NavigationBar />
          <Favourites />
          <Footer />
        </Route>
        <Route path='/passwordrecovery/:requestId' exact>
          <PassRecovery />
        </Route>
        <Route path='/notme/:requestId' exact>
          <NotMe />
        </Route>
        <Redirect to='/' />
      </Switch>
    </Router>
  )

  return (
    <AdminContext.Provider
      value={{
        adminId: adminId,
        isAdminLoggedIn: isAdminLoggedIn,
        adminSignin: adminSignin,
        adminSignout: adminSignout
      }}
    >
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
            searchCriteria: searchCriteria,
            search: search
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
            <main><Suspense fallback={<div className='center'><LoadingSpinner asOverlay /> </div>}>{routes}</Suspense></main>
          </PurchaseContext.Provider>
        </SearchContext.Provider>
      </AuthContext.Provider>
    </AdminContext.Provider>
  );
}

export default App;
