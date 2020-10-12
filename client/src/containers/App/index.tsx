import React, {FunctionComponent, lazy, Suspense} from 'react';
import { Route, Switch } from "react-router";
import Login from '../Login'
import ResponsiveDrawer from "../ResponsiveDrawer";
import InitiateAutoLogin from "./hooks";
import ProtectedRoute from "../ProtectedRoute";

const Signup = lazy(async ()=> {
    return  await import(`../Signup`)
})
const Home = lazy(async ()=> {
    return  await import(`../Home`)
})

const App = () =>  {
    InitiateAutoLogin()
    return (
     <div>
         <Suspense fallback={<div>Loading</div>}>
             <Switch>
                 <Route exact path="/" component={Login} />
                 <Route exact path="/signup" component={Signup} />
                 <ResponsiveDrawer>
                     <ProtectedRoute path='/home' component={Home} />
                 </ResponsiveDrawer>
                 {/*<Route component={NotFoundPage} />*/}
             </Switch>
         </Suspense>
     </div>
   )
}
export default App
