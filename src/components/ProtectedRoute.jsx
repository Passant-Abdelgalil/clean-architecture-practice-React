// React imports
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
// custom components
import Spinner from "./Spinner";
// utils
import { AuthContext } from "../features/auth/data/AuthContextProvider";



const ProtectedRoute = ({ children }) => {
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

	/**
	 * if the user is authorized render the requested route
	 * otherwise navigate to the login route while storing 
	 * the current requested route so the app navigates
	 * to it later for better user experience
	 */
	const authorized = !!authContext.authHolder.isUserAuthorized();

	return authorized ? (
		<>{children}</>
	) : (
		<Navigate to="/login" state={{ from: { pathname: location.pathname } }} />
	);
};

export default ProtectedRoute;
