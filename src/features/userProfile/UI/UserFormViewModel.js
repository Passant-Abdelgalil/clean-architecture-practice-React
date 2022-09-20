import { useContext, useState } from "react";
import FormValidator from "../../../util/FormValidation";
import { UseCasesContext } from "../../../services/contexts/UseCasesProvider";
import { userHolder } from "../../../settings";
import { useNavigate } from "react-router-dom";
import UserProfile from "../domain/datastructures/UserProfile";
/**
 * Defines all public fields that View will be using
 */

export const useUserFormViewModel = () => {
	const { updateUserProfileUseCase, updateUserEmailUseCase } =
		useContext(UseCasesContext);
	const navigate = useNavigate();

	const [emailQuery, setEmailQuery] = useState(userHolder.getEmail());
	const [userNameQuery, setUserNameQuery] = useState(
		userHolder.getDisplayName()
	);
	const [photoURLQuery, setPhotoURLQuery] = useState(userHolder.getPhotoURL());

	const [isShowError, setIsShowError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	function onEmailQueryChanged(loginQuery) {
		setEmailQuery(loginQuery);
	}

	function onUserNameQueryChanged(userNameQuery) {
		setUserNameQuery(userNameQuery);
	}
	function onPhotoURLQueryChanged(photoURLQuery) {
		setPhotoURLQuery(photoURLQuery);
	}

	async function onClickSave() {
		if (!validateLoginForm()) {
			return;
		}

		try {
			setIsLoading(true);
			const profileData = new UserProfile(userNameQuery, photoURLQuery);

			await updateUserProfileUseCase.updateProfile(profileData);
			await updateUserEmailUseCase.updateEmail(emailQuery);

			setIsLoading(false);
			setIsShowError(false);
			setErrorMessage("");
			navigate("/");
		} catch (error) {
			setIsLoading(false);
			setIsShowError(true);
			setErrorMessage(error.message);
		}
	}

	function onClickCancel() {
		setUserNameQuery(userHolder.getDisplayName());
		setPhotoURLQuery(userHolder.getPhotoURL());
		setEmailQuery(userHolder.getEmail());
		setIsLoading(false);
		setIsShowError(false);
		setErrorMessage("");
		navigate("/");
	}

	function validateLoginForm() {
		if (!FormValidator.isValidEmail(emailQuery)) {
			setIsShowError(true);
			setErrorMessage("Email format is not valid");
			return false;
		}

		if (!FormValidator.isValidUserName(userNameQuery)) {
			setIsShowError(true);
			setErrorMessage(
				"Your name must be at least 3 characters long with at least 1 letter"
			);
			return false;
		}
		if (!FormValidator.isValidURL(photoURLQuery)) {
			setIsShowError(true);
			setErrorMessage("Please provide valid photo url");
			return false;
		}

		return true;
	}

	return {
		emailQuery,
		photoURLQuery,
		userNameQuery,
		isLoading,
		isShowError,
		errorMessage,
		onClickSave,
		onClickCancel,
		onEmailQueryChanged,
		onUserNameQueryChanged,
		onPhotoURLQueryChanged,
	};
};
