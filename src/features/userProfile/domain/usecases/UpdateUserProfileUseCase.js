import UserApiRepository from "../Repositories/UserApiRepository";
import UserStorage from "../../data/UserStorage";
import UserHolder from "../../domain/entities/userHolder";
import UserProfile from "../../domain/datastructures/UserProfile";

export default class UpdateUserProfileUseCase {
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
	async updateProfile(userProfile) {
		if (!(userProfile instanceof UserProfile))
			throw new Error("invalid data types");

		await this.#userApi.updateUserProfile(userProfile);

		this.#userHolder.onAuthStateChanged({
			displayName: userProfile.displayName,
			photoURL: userProfile.photoURL,
		});
		this.#userStorage.save(this.#userHolder.getUserData());
	}
}
