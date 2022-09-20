import AuthHolder from "../entities/AuthHolder";
import AuthApiRepository from "../Repositories/AuthApiRepository";
import AuthStorage from "../../data/AuthStorage";
import UserHolder from "../../../userProfile/domain/entities/userHolder";
import UserApi from "../../../userProfile/data/UserApi";
import UserProfile from "../../../userProfile/domain/datastructures/UserProfile";

export default class SignupUseCase {
	// {AuthApiRepository}
	#authApi;
	// {UserApi}
	#userApi;
	// {AuthHolder}
	#authHolder;
	// {AuthStorage}
	#authStorage;
	// {UserHolder}
	#userHolder;

	/**
	 *
	 * @param {AuthApiRepository} authApi
	 * @param {UserHolder} userHolder
	 * @param {AuthHolder} authHolder
	 * @param {AuthStorage} authStorage
	 * @param {UserApi} userApi
	 * @throws {Error} if parameters are of invalid types
	 */
	constructor(authApi, authHolder, authStorage, userHolder, userApi) {
		if (!(authApi instanceof AuthApiRepository))
			throw new Error(`${typeof authApi} must be of type AuthApiRepository`);
		if (!(authHolder instanceof AuthHolder))
			throw new Error(`${typeof authHolder} must be of type AuthHolder`);
		if (!(userHolder instanceof UserHolder))
			throw new Error(`${typeof userHolder} must be of type UserHolder`);

		if (!(authStorage instanceof AuthStorage))
			throw new Error(`${typeof authStorage} must be of type AuthStorage`);
		if (!(userApi instanceof UserApi))
			throw new Error(`${typeof userApi} must be of type UserApi`);

		this.#authApi = authApi;
		this.#authHolder = authHolder;
		this.#userHolder = userHolder;
		this.#authStorage = authStorage;
		this.#userApi = userApi;
	}

	/**
	 *
	 * @param {String} email
	 * @param {String} password
	 * @throws {Error} if credentials are not valid or have not passed
	 */
	async signupUser({ email, password, displayName, photoURL }) {
		const authResult = await this.#authApi.signup(email, password);
		const userData = new UserProfile(displayName, photoURL);
		await this.#userApi.updateUserProfile(userData);

		authResult.user.displayName = displayName;
		this.#userHolder.onAuthStateChanged(authResult.user);
		/**
		 * next line is commented out because built-in firebase
		 * subscribtion mechanism is used and this line is called
		 * inside the subscribtion callback function
		 */
		// this.#authHolder.onSignedIn(authResult.authorizationToken);

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
