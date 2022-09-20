import React from "react";
import { UseCasesContext } from "../../../services/contexts/UseCasesProvider";
import { userHolder } from "../../../settings";

export const UserProfileContext = React.createContext({
	userHolder: userHolder,
});

export default class UserProfileContextProvider extends React.Component {
	static contextType = UseCasesContext;

	/**
	 * Initialize the component state and register the component
	 * as a subscriber to authHolder object
	 */
	constructor(props) {
		super(props);

		userHolder?.addUserListener(this);

		this.state = {
			userHolder,
		};
	}

	/**
	 * It removes subscribtion of the provider to the authHolder
	 */
	componentWillUnmount() {
		userHolder?.removeUserListener(this);
	}

	/**
	 * It updates AuthContextProvider state with the new authHolder
	 * as a workaround to implement observer design pattern for
	 * components using the fact that context consumers are rerendered
	 * whenever the provider's value changes
	 */
	onUserChanged() {
		this.setState({
			userHolder,
		});
	}

	render() {
		return (
			<UserProfileContext.Provider value={this.state}>
				{this.props.children}
			</UserProfileContext.Provider>
		);
	}
}
