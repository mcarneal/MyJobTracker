/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, {FunctionComponent, lazy, Suspense} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { useInjectReducer, } from '../../utils/injectReducer'
import reducer from "../../components/ResponsiveDrawer"
import { IApp } from "./types";
// import reducer from './reducer'
import {sendMessage} from "./actions";
// import  ResponsiveDrawer  from '../../components/ResponsiveDrawer'

// import { Switch, Route } from 'react-router-dom';

const ResponsiveDrawer = lazy(async ()=> {
    return  await import(`../../components/ResponsiveDrawer`)
})

const App = () =>  {

    return (
     <div>
         <Suspense fallback={<div>Loading</div>}>
            <ResponsiveDrawer>
                <h1>hi</h1>
            </ResponsiveDrawer>
         </Suspense>
       {/*<Switch>*/}
       {/*  <Route exact path="/" component={HomePage} />*/}
       {/*  <Route component={NotFoundPage} />*/}
       {/*</Switch>*/}
       {/*<GlobalStyle />*/}
     </div>
   )
}
export default App
