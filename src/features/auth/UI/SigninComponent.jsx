import { Link } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import { useSigninViewModel } from "./SigninViewModel";

const SigninComponent = () => {
	const {
		isLoading,
		isShowError,
		errorMessage,
		onClickSignIn,
		onEmailQueryChanged,
		onPasswordQueryChanged,
	} = useSigninViewModel();

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
			}}
			className="form-container"
		>
			{isLoading && <Spinner />}
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
			</div>
			<button onClick={onClickSignIn} className="form-container--btn">
				Sign In
			</button>
			<Link to="/signup">Create new account?</Link>
			{isShowError && <div className="error-msg">{errorMessage}</div>}
		</form>
	);
};

export default SigninComponent;
