import { useContext, useState } from "react";
import FormValidator from "../../../util/FormValidation";
import { UseCasesContext } from "../../../services/contexts/UseCasesProvider";

/**
 * Defines all public fields that View will be using
 */

export const useSigninViewModel = () => {
	const { loginUseCase } = useContext(UseCasesContext);

	const [emailQuery, setEmailQuery] = useState("");
	const [passwordQuery, setPasswordQuery] = useState("");
	const [isShowError, setIsShowError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	function onEmailQueryChanged(loginQuery) {
		setEmailQuery(loginQuery);
	}
	function onPasswordQueryChanged(passwordQuery) {
		setPasswordQuery(passwordQuery);
	}

	async function onClickSignIn() {
		if (!validateLoginForm()) {
			return;
		}

		try {
			setIsLoading(true);
			await loginUseCase.loginUser(emailQuery, passwordQuery);
			setIsShowError(false);
			setIsLoading(false);
			setErrorMessage("");
		} catch (error) {
			console.log(error.message);
			setIsLoading(false);
			setIsShowError(true);
			setErrorMessage(error.message);
		}
	}
	function validateLoginForm() {
		if (!FormValidator.isValidEmail(emailQuery)) {
			setIsShowError(true);
			setErrorMessage("Email format is not valid");
			return false;
		}

		if (!FormValidator.isValidPassword(passwordQuery)) {
			setIsShowError(true);
			setErrorMessage(
				"Password must contain at least 1 letter, 1 number, 1 special character"
			);
			return false;
		}

		return true;
	}

	return {
		isLoading,
		isShowError,
		errorMessage,
		onClickSignIn,
		onEmailQueryChanged,
		onPasswordQueryChanged,
	};
};
