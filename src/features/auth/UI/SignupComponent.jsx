import React from "react";
import { Link } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import { useSignupViewModel } from "./SignupViewModel";

const SignupComponent = () => {
	const {
		isLoading,
		isShowError,
		errorMessage,
		onClickSignUp,
		onEmailQueryChanged,
		onPasswordQueryChanged,
		onConfirmPasswordQueryChanged,
		onUserNameQueryChanged,
	} = useSignupViewModel();

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
			}}
			className="form-container"
		>
			{isLoading && <Spinner />}
			<div className="form-container__field-control">
				<label
					htmlFor="username"
					className="form-container__field-control_label"
				>
					Name
				</label>
				<input
					id="username"
					type="text"
					onBlur={(e) => onUserNameQueryChanged(e.target.value)}
					className="form-container__field-control_input"
				/>
			</div>
			<div className="form-container__field-control">
				<label htmlFor="email" className="form-container__field-control_label">
					Email
				</label>
				<input
					id="email"
					type="email"
					onBlur={(e) => onEmailQueryChanged(e.target.value)}
					className="form-container__field-control_input"
				/>
			</div>
			<div className="form-container__field-control">
				<label
					htmlFor="password"
					className="form-container__field-control_label"
				>
					Password
				</label>
				<input
					id="password"
					type="password"
					onBlur={(e) => onPasswordQueryChanged(e.target.value)}
					className="form-container__field-control_input"
				/>
			</div>{" "}
			<div className="form-container__field-control">
				<label
					htmlFor="confirmPassword"
					className="form-container__field-control_label"
				>
					Confirm Password
				</label>
				<input
					id="confirmPassword"
					type="password"
					onBlur={(e) => onConfirmPasswordQueryChanged(e.target.value)}
					className="form-container__field-control_input"
				/>
			</div>{" "}
			<button onClick={onClickSignUp} className="form-container--btn">
				Sign Up
			</button>
			<Link to="/login">Already have an account?</Link>
			{isShowError && <div className="error-msg">{errorMessage}</div>}
		</form>
	);
};

export default SignupComponent;
