import React from "react";
import Spinner from "../../../components/Spinner";
import { useUserFormViewModel } from "./UserFormViewModel";

const UserFormComponent = () => {
	const {
		emailQuery,
		photoURLQuery,
		userNameQuery,
		isLoading,
		isShowError,
		errorMessage,
		onClickCancel,
		onClickSave,
		onEmailQueryChanged,
		onUserNameQueryChanged,
		onPhotoURLQueryChanged,
	} = useUserFormViewModel();

	return (
		<form onSubmit={(e) => e.preventDefault()} className="form-container">
			{isLoading && <Spinner />}
			<div className="form-container__field-control">
				<img alt="user profile" src={photoURLQuery} />
				<label htmlFor="user-photo">Profile Photo</label>
				<input
					type="url"
					id="user-photo"
					defaultValue={photoURLQuery}
					onBlur={(e) => onPhotoURLQueryChanged(e.target.value)}
				/>
			</div>
			<div className="form-container__field-control">
				<label htmlFor="user-name">Your Name</label>
				<input
					id="user-name"
					type="text"
					defaultValue={userNameQuery}
					onBlur={(e) => onUserNameQueryChanged(e.target.value)}
				/>
			</div>
			<div className="form-container__field-control">
				<label htmlFor="user-email">Email</label>
				<input
					id="user-email"
					type="email"
					defaultValue={emailQuery}
					onBlur={(e) => onEmailQueryChanged(e.target.value)}
				/>
			</div>
			<button type="button" onClick={onClickSave}>
				Save
			</button>
			<button type="button" onClick={onClickCancel}>
				Cancel
			</button>
			{isShowError && <div className="error-msg">{errorMessage}</div>}
		</form>
	);
};

export default UserFormComponent;
