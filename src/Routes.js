import React from "react";
import {BrowserRouter,Switch,Route} from "react-router-dom";
import Home from "./core/Home.js";
import PrivateRoutes from "./auth/helper/PrivateRoutes.js";
import Signup from "./user/Signup.js";
import UserDashboard from './user/UserDashboard.js';
import Signin from "./user/Signin.js";
import Cart from './core/Cart.js';

const Routes = () => {
	return(
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/signup" exact component={Signup} />
				<Route path="/signin" exact component={Signin} />
				<PrivateRoutes path="/user/dashboard" exact component={UserDashboard} />
				<Route path="/cart" exact component={Cart} />
			</Switch>
		</BrowserRouter>
		);
};

export default Routes;