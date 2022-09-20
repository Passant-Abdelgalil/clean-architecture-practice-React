import AuthHolder from "../entities/AuthHolder";
import AuthApiRepository from "../Repositories/AuthApiRepository";
import AuthStorage from "../../data/AuthStorage";
import UserHolder from "../../../userProfile/domain/entities/userHolder";

export default class LogoutUseCase {
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
	 * @param {AuthHolder} authHolder
	 * @param {UserHolder} userHolder
	 * @param {AuthStorage} authStorage
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
	async logoutUser() {
		await this.#authApi.logout();
		this.#authHolder.onSignedOut();
		this.#userHolder.clearUser();
		this.#authStorage.remove();
	}
}
