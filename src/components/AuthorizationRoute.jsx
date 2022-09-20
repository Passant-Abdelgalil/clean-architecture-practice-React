// React imports
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
// custom components
import Spinner from "./Spinner";
// utils
import { AuthContext } from "../features/auth/data/AuthContextProvider";

const AuthorizationRoute = ({ children }) => {
	const authContext = React.useContext(AuthContext);
	/**
	 * To access the pathname of the current location which is the
	 * requested route, so the app navigates to it after successful
	 * authentication
	 * */
	const location = useLocation();

	/**
	 * if the current user authentication status is still pending
	 * render a spinner till the status is configured to either
	 * signed in or signed out
	 */
	if (authContext.authHolder.isUserStatusPending()) return <Spinner />;

	const authorized = !!authContext.authHolder.isUserAuthorized();
	const from = location.state?.from?.pathname;

	/**
	 * if the user is authorized render the previously requested
	 * route if any, else if there is no previously requested route
	 * navigate to the home page
	 * otherwise navigate to the currently requested route for
	 * authorization that's either login or signup
	 */
	let to;
	if (!from && authorized) to = "/";
	else if (!from) to = location.pathname;
	else if (from === location.pathname) to = "/";
	else to = from;

	return authorized ? <Navigate to={to} /> : <>{children}</>;
};

export default AuthorizationRoute;
