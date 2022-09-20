export default class UserHolder {
	#displayName;
	#photoURL;
	#email;
	#uid;

	#userListeners;

	constructor() {
		this.#displayName = null;
		this.#photoURL = null;
		this.#email = null;

		this.#userListeners = [];
	}

	clearUser() {
		this.#displayName = null;
		this.#photoURL = null;
		this.#email = null;
	}

	isUserExists() {
		return this.#email && this.#displayName;
	}

	getDisplayName() {
		return this.#displayName;
	}

	getPhotoURL() {
		return this.#photoURL;
	}

	getEmail() {
		return this.#email;
	}

	getUserData() {
		return {
			displayName: this.#displayName,
			photoURL: this.#photoURL,
			email: this.#email,
		};
	}

	/**
	 * update user data with passed values.
	 * in case the passed value is null/undefined all user
	 * data will be set to null, otherwise only the passed
	 * values will be reflected on the user object
	 * @param {Object} user
	 */
	onAuthStateChanged(user) {
		if (!user) {
			this.#displayName = null;
			this.#email = null;
			this.#photoURL = null;
			this.#uid = null;
		} else {
			if (user?.displayName) this.#displayName = user.displayName;
			if (user?.photoURL) this.#photoURL = user.photoURL;
			if (user?.email) this.#email = user.email;
			if (user?.uid) this.#uid = user.id;
		}
		this.#notifyListeners();
	}

	/**
	 *
	 * @param {Object} userListener object to register as a listener
	 * @throws {Error} if parameter do not implement onUserChanged function
	 */
	addUserListener(userListener) {
		if (typeof userListener.onUserChanged !== "function")
			throw new Error(
				`${typeof userListener} do not implement onUserChanged function`
			);

		this.#userListeners.push(userListener);
	}

	/**
	 *
	 * @param {Object} userListener object listener to unregister
	 */
	removeUserListener = (userListener) => {
		const listenerIdx = this.#userListeners.indexOf(userListener);

		if (listenerIdx === -1) return;

		this.#userListeners.splice(listenerIdx, 1);
	};

	#notifyListeners = () => {
		this.#userListeners.forEach((listener) => {
			if (typeof listener["onUserChanged"] === "function")
				listener.onUserChanged();
		});
	};
}
