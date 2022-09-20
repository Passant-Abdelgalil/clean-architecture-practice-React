import React from "react";
import UserProfileComponent from "../features/userProfile/UI/UserProfileComponent";
import { UseCasesContext } from "../services/contexts/UseCasesProvider";
const HomePage = () => {
	const { logoutUseCase } = React.useContext(UseCasesContext);

	const logout = (e) => {
		try {
			logoutUseCase.logoutUser();
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<React.Fragment>
			<UserProfileComponent />
			<button onClick={logout}>Sign Out</button>
		</React.Fragment>
	);
};

export default HomePage;
