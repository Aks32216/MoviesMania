import React from 'react';
import Home from "./Home";
import Favourites from './Favourites';
import PageNotFound from "./PageNotFound";
import {Route,Redirect,Switch} from "react-router-dom";

function Movies() {
  return (
    <>
    {/* Matching in the route happens with startsWith Function so any route starting with matches then it is executed e */}
        {/* switich will mathch the first matching route and return that component */}
        <Switch>
          {/* route will match the path from url and render it */}
          {/* exact keyword matches for exact route */}
          <Route path="/home" exact>
            <Home></Home>
          </Route>
          <Route path="/favourites" exact>
            <Favourites></Favourites>
          </Route>
          {/* redirects from one route to another */}
          <Redirect from="/" to="/home" exact></Redirect>
          {/* if no path is provided then all the route is mathched with it */}
          <Route>
            <PageNotFound></PageNotFound>
          </Route>
        </Switch>
    </>
  )
};

export default Movies;