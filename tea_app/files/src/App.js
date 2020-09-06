import React from 'react';
import {Provider} from 'react-redux'
import {Route, BrowserRouter as Router} from 'react-router-dom'
import {Switch} from 'react-router-dom'
// import './App.css'
import AppNav from './component/nav/AppNav'
import HomePage from './component/pages/HomePage'
import FarmerPage from './component/pages/FarmerPage'
import CartPage from './component/pages/CartPage'
import AboutPage from './component/pages/AboutPage'
import PostPage from './component/pages/PostPage'
import PostListPage from './component/pages/PostListPage'
import ItemPage from './component/pages/ItemPage'
import ItemListPage from './component/pages/ItemListPage'
import LoadingPage from './component/pages/LoadingPage'
import Fab from './component/fab/Fab'
import {Alert} from './component/popUps/Alert'
import {pop_up_store} from './component/popUps/PopUpStore'
import {combine_store} from './component/redux/store'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';


import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from './component/footer/Footer';

function App() {
  AOS.init({
    duration: 2000,
  });
  // let {path, url} = useRouteMatch();
  return (
    <div className="App">
      <Provider store={combine_store}>
        <Provider store={pop_up_store}>
          <Router>
              <AppNav/>
              <Switch>
                <Route path="/home" exact component={HomePage}/>
                <Route path="/about" exact component={AboutPage}/>
                <Route path="/item" exact component={ItemListPage}/>
                <Route path="/cart" exact component={CartPage}/>
                <Route path="/post" exact component={PostListPage} />
                <Route path={`/farmer/:farmerId`} exact component={FarmerPage}/>
                <Route path={`/post/:postId`} exact component={PostPage}/>
                <Route path={`/item/:itemId`} exact component={ItemPage}/>
                <Route component={HomePage}/>
              </Switch>
              {/* <LoadingPage/> */}
              <Alert />
              <Footer/>
          </Router>
        </Provider>
      </Provider>
    </div>
  );
}

export default App;
