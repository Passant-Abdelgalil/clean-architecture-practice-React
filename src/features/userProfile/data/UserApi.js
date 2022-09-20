import UserApiRepository from "../domain/Repositories/UserApiRepository";
import { getAuth, updateEmail, updateProfile } from "firebase/auth";

import app from "../../../services/firebase-config";

function getFirbaseAuth() {
	return getAuth(app);
}

export default class UserApi extends UserApiRepository {
	#auth;

	constructor() {
		super();
		this.#auth = getFirbaseAuth();
	}

	/**
	 * Updates a user's basic profile information
	 * @param {UserProfile} data
	 * @throws {Error} if operation failed
	 * @returns {Promise<void>}
	 */
	updateUserProfile(data) {
		return updateProfile(this.#auth.currentUser, {
			displayName: data.displayName,
			photoURL: data.photoURL,
		}).catch((error) => {
			throw new Error(error.code);
		});
	}

	/**
	 *
	 * @param {String} email
	 * @throws {Error} if operation failed
	 * @returns {Promise<void>}
	 */
	updateUserEmail(email) {
		updateEmail(this.#auth.currentUser, email).catch((error) => {
			throw new Error(error.code);
		});
	}
}
