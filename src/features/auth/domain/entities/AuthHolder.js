// This class holde the authorization state

export default class AuthHolder {
	// Array of Auth Listeners
	#authListeners;
	// boolean
	#isAuthorized;
	// boolean
	#pending;
	// string
	#authToken;

	constructor() {
		this.#authListeners = [];
		this.#authToken = "";
		this.#pending = true;
		this.#isAuthorized = false;
	}

	/**
	 * Sets authToken / isAuthorized and notify listeners with updates
	 * @param {String} authToken
	 */
	onSignedIn = (authToken) => {
		this.#authToken = authToken;
		this.#isAuthorized = true;
		this.#pending = false;
		this.#notifyListeners();
	};

	/**
	 * Clear authToken / isAuthorized and notify listeners with updates
	 */
	onSignedOut = () => {
		this.#authToken = "";
		this.#isAuthorized = false;
		this.#pending = false;
		this.#notifyListeners();
	};

	/**
	 *
	 * @returns {Boolean} user isAuthorized
	 */
	isUserAuthorized = () => {
		return this.#isAuthorized;
	};

	isUserStatusPending = () => {
		return this.#pending;
	};

	/**
	 * @throws {Error} if user is not authorized
	 * @returns {String} contains user authToken
	 */
	getAuthToken = () => {
		if (!this.#isAuthorized) throw new Error("User is not authorized");

		return this.#authToken;
	};

	/**
	 * This function is called inside firebase auth onAuthStateChanged
	 * function which is used here to catch auth status on refreshes
	 * @param {Object} user
	 */
	onAuthStateChanged(user) {
		this.#isAuthorized = !!user;
		this.#pending = false;
		this.#authToken = user?.refreshToken;

		this.#notifyListeners();
	}

	/**
	 *
	 * @param {AuthListener} authListener object to register as a listener
	 * @throws {Error} if parameter do not implement onAuthChanged function
	 */
	addAuthListener = (authListener) => {
		if (typeof authListener.onAuthChanged !== "function")
			throw new Error(
				`${typeof authListener} do not implement onAuthChanged function`
			);

		this.#authListeners.push(authListener);
	};

	/**
	 *
	 * @param {AuthListener} authListener object listener to unregister
	 */
	removeAuthListener = (authListener) => {
		const listenerIdx = this.#authListeners.indexOf(authListener);

		if (listenerIdx === -1) return;

		this.#authListeners.splice(listenerIdx, 1);
	};

	#notifyListeners = () => {
		this.#authListeners.forEach((listener) => {
			if (typeof listener["onAuthChanged"] === "function")
				listener.onAuthChanged();
		});
	};
}
