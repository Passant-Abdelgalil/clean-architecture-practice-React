import UserApiRepository from "../Repositories/UserApiRepository";
import UserStorage from "../../data/UserStorage";
import UserHolder from "../../domain/entities/userHolder";

export default class UpdateUserEmailUseCase {
	#userApi;
	#userStorage;
	#userHolder;

	/**
	 *
	 * @param {UserApiRepository} userApi
	 * @param {UserStorage} userStorage
	 * @param {UserHolder} userHolder
	 * @throws {Error} if parameters are of invalid types
	 */
	constructor(userApi, userStorage, userHolder) {
		if (!(userApi instanceof UserApiRepository))
			throw new Error(`${typeof userApi} must be of type UserApiRepository`);
		if (!(userStorage instanceof UserStorage))
			throw new Error(`${typeof userStorage} must be of type UserStorage`);
		if (!(userHolder instanceof UserHolder))
			throw new Error(`${typeof userHolder} must be of type UserHolder`);

		this.#userApi = userApi;
		this.#userStorage = userStorage;
		this.#userHolder = userHolder;
	}

	/**
	 *
	 * @param {String} email
	 * @throws {Error} if operation failed
	 */
	async updateEmail(email) {
		await this.#userApi.updateUserEmail(email);
		// this.#userHolder.onAuthStateChanged({ email });
		this.#userStorage.save(this.#userHolder.getUserData());
	}
}
