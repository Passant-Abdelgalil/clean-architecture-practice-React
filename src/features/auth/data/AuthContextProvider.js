import React from "react";
import { UseCasesContext } from "../../../services/contexts/UseCasesProvider";
import { authHolder } from "../../../settings";

export const AuthContext = React.createContext({ authHolder: authHolder });

export default class AuthContextProvider extends React.Component {
	static contextType = UseCasesContext;

	/**
	 * Initialize the component state and register the component
	 * as a subscriber to authHolder object
	 */
	constructor(props) {
		super(props);

		authHolder?.addAuthListener(this);

		this.state = {
			authHolder: authHolder,
		};
	}

	/**
	 * It removes subscribtion of the provider to the authHolder
	 */
	componentWillUnmount() {
		authHolder?.removeAuthListener(this);
	}

	/**
	 * It updates AuthContextProvider state with the new authHolder
	 * as a workaround to implement observer design pattern for
	 * components using the fact that context consumers are rerendered
	 * whenever the provider's value changes
	 */
	onAuthChanged() {
		this.setState({
			authHolder: authHolder,
		});
	}

	render() {
		return (
			<AuthContext.Provider value={this.state}>
				{this.props.children}
			</AuthContext.Provider>
		);
	}
}
