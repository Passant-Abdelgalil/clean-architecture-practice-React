import { useContext, useState } from "react";
import FormValidator from "../../../util/FormValidation";
import { UseCasesContext } from "../../../services/contexts/UseCasesProvider";
/**
 * Defines all public fields that View will be using
 */

export const useSignupViewModel = () => {
	const { signupUseCase } = useContext(UseCasesContext);

	const [emailQuery, setEmailQuery] = useState("");
	const [passwordQuery, setPasswordQuery] = useState("");
	const [confirmPasswordQuery, setConfirmPasswordQuery] = useState("");
	const [userNameQuery, setUserNameQuery] = useState("");

	const [isShowError, setIsShowError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	function onEmailQueryChanged(loginQuery) {
		setEmailQuery(loginQuery);
	}
	function onPasswordQueryChanged(passwordQuery) {
		setPasswordQuery(passwordQuery);
	}
	function onConfirmPasswordQueryChanged(confirmPasswordQuery) {
		setConfirmPasswordQuery(confirmPasswordQuery);
	}
	function onUserNameQueryChanged(userNameQuery) {
		setUserNameQuery(userNameQuery);
	}

	async function onClickSignUp() {
		if (!validateLoginForm()) {
			return;
		}

		try {
			setIsLoading(true);
			await signupUseCase.signupUser({
				email: emailQuery,
				password: passwordQuery,
				displayName: userNameQuery,
				photoURL: "",
			});
			setIsLoading(false);
			setIsShowError(false);
			setErrorMessage("");
		} catch (error) {
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
		if (
			!FormValidator.isValidConfirmPassword(confirmPasswordQuery, passwordQuery)
		) {
			setIsShowError(true);
			setErrorMessage("Confirm password value must match entered password");
			return false;
		}
		if (!FormValidator.isValidUserName(userNameQuery)) {
			setIsShowError(true);
			setErrorMessage(
				"Your name must be at least 3 characters long with at least 1 letter"
			);
			return false;
		}

		return true;
	}

	return {
		isLoading,
		isShowError,
		errorMessage,
		onClickSignUp,
		onEmailQueryChanged,
		onPasswordQueryChanged,
		onConfirmPasswordQueryChanged,
		onUserNameQueryChanged,
	};
};
