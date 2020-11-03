import React, {FunctionComponent, lazy, Suspense} from 'react';
import { Route, Switch } from "react-router";
import Login from '../Login'
import ResponsiveDrawer from "../ResponsiveDrawer";
import ProtectedRoute from "../ProtectedRoute";
import ProgressBar from "../../components/ProgressBar";
import {createMuiTheme, useMediaQuery} from "@material-ui/core";

const Signup = lazy(async ()=> {
    return  await import(`../Signup`)
})
const Home = lazy(async ()=> {
    return  await import(`../Home`)
})


const App = () =>  {
    return (
     <div>
         <Suspense fallback={<ProgressBar />}>
             <Switch>
                 <Route exact path="/login" component={Login} />
                 <Route exact path="/signup" component={Signup} />
                 <ResponsiveDrawer>
                     <ProtectedRoute path='/' component={Home} />
                 </ResponsiveDrawer>
                 {/*<Route component={NotFoundPage} />*/}
             </Switch>
         </Suspense>
     </div>
   )
}
export default App
