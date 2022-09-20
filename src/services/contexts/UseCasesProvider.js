import React from "react";
import LoginUseCase from "../../features/auth/domain/usecases/LoginUseCase";
import LogoutUseCase from "../../features/auth/domain/usecases/LogoutUseCase";
import SignupUseCase from "../../features/auth/domain/usecases/SignupUseCase";
import UpdateUserEmailUseCase from "../../features/userProfile/domain/usecases/UpdateUserEmailUseCase";
import UpdateUserProfileUseCase from "../../features/userProfile/domain/usecases/UpdateUserProfileUseCase";

import {
	authHolder,
	authApi,
	authStorage,
	userHolder,
	userApi,
	userStorage,
} from "../../settings";

let useCases;
try {
	useCases = {
		loginUseCase: new LoginUseCase(
			authApi,
			authHolder,
			authStorage,
			userHolder
		),
		logoutUseCase: new LogoutUseCase(
			authApi,
			authHolder,
			authStorage,
			userHolder
		),
		signupUseCase: new SignupUseCase(
			authApi,
			authHolder,
			authStorage,
			userHolder,
			userApi
		),
		updateUserEmailUseCase: new UpdateUserEmailUseCase(
			userApi,
			userStorage,
			userHolder
		),
		updateUserProfileUseCase: new UpdateUserProfileUseCase(
			userApi,
			userStorage,
			userHolder
		),
	};
} catch (error) {
	console.log(error.message);
	useCases = {
		loginUseCase: null,
		logoutUseCase: null,
		signupUseCase: null,
		updateUserEmailUseCase: null,
		updateUserProfileUseCase: null,
	};
}

export const UseCasesContext = React.createContext(useCases);

const UseCasesProvider = ({ children }) => {
	return (
		<UseCasesContext.Provider value={useCases}>
			{children}
		</UseCasesContext.Provider>
	);
};

export default UseCasesProvider;
