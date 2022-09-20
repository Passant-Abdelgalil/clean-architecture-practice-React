import AuthHolder from "../entities/AuthHolder";
import AuthApiRepository from "../Repositories/AuthApiRepository";
import AuthStorage from "../../data/AuthStorage";
import UserHolder from "../../../userProfile/domain/entities/userHolder";
export default class LoginUseCase {
	// {AuthApiRepository}
	#authApi;
	// {AuthHolder}
	#authHolder;
	// {AuthStorage}
	#authStorage;
	// {UserHolder}
	#userHolder;

	/**
	 *
	 * @param {AuthApiRepository} authApi
	 * @param {AuthHolder} #authHolder
	 * @param {AuthStorage} authStorage
	 * @param {UserHolder} userHolder
	 * @throws {Error} if parameters are of invalid types
	 */
	constructor(authApi, authHolder, authStorage, userHolder) {
		if (!(authApi instanceof AuthApiRepository))
			throw new Error(`${typeof authApi} must be of type AuthApiRepository`);
		if (!(authHolder instanceof AuthHolder))
			throw new Error(`${typeof authHolder} must be of type AuthHolder`);
		if (!(userHolder instanceof UserHolder))
			throw new Error(`${typeof userHolder} must be of type UserHolder`);
		if (!(authStorage instanceof AuthStorage))
			throw new Error(`${typeof authStorage} must be of type AuthStorage`);

		this.#authApi = authApi;
		this.#authHolder = authHolder;
		this.#authStorage = authStorage;
		this.#userHolder = userHolder;
	}

	/**
	 *
	 * @param {String} email
	 * @param {String} password
	 * @throws {Error} if credentials are not valid or have not passed
	 */
	async loginUser(email, password) {
		const authResult = await this.#authApi.login(email, password);

		this.#authHolder.onSignedIn(authResult.authorizationToken);

		/**
		 * next line is commented out because built-in firebase
		 * subscribtion mechanism is used and this line is called
		 * inside the subscribtion callback function
		 */
		// this.#userHolder.onAuthStateChanged(authResult.user);

		/**
		 * next line is commented out because currently no need
		 * to store the auth status in localStorage because it's
		 * always updated with the help of firebase
		 * subscribtion mechanism
		 * but it's left as a resource for implementing this
		 * feature in clean architecture
		 */
		// this.#authStorage.save({
		// 	isAuthorized: this.#authHolder.isUserAuthorized(),
		// 	accessToken: this.#authHolder.getAuthToken(),
		// });
	}
}
