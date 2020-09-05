/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, {FunctionComponent, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { useInjectReducer, } from '../../utils/injectReducer'
import { IApp } from "./types";
import reducer from './reducer'
import {sendMessage} from "./actions";
import  ResponsiveDrawer  from '../../components/ResponsiveDrawer'

// import { Switch, Route } from 'react-router-dom';

const App: FunctionComponent<IApp> = ({title}) =>  {
    useInjectReducer({
        key: `forecast`,
        reducer,
    })
    const dispatch = useDispatch()
    const selector = useSelector( state => state)

    const clickHandle = () =>{
        dispatch(sendMessage({name: 'Morgan', age: 27}))
    }

    return (
     <div>
        <ResponsiveDrawer>
            <h1>hi</h1>
        </ResponsiveDrawer>
       {/*<Switch>*/}
       {/*  <Route exact path="/" component={HomePage} />*/}
       {/*  <Route component={NotFoundPage} />*/}
       {/*</Switch>*/}
       {/*<GlobalStyle />*/}
     </div>
   )
}
export default App
