export default class AuthApiRepository {
	/**
	 *
	 * @param {String} email
	 * @param {String} password
	 * @throws {Error} if validation has not passed
	 * @returns {Promise<ValidationResult>}
	 */
	validateCredentials(email, password) {}

	/**
	 *
	 * @param {String} email
	 * @param {String} password
	 * @param {String} validationKey
	 * @throws {Error} if credentials have not passed
	 * @returns {Promise<AuthorizationResult>}
	 */
	login(email, password) {}

	logout() {}

	/**
	 *
	 * @param {String} email
	 * @param {String} password
	 * @throws {Error} if credentials have not passed
	 * @returns {Promise<AuthorizationResult>}
	 */
	signup(email, password) {}
}
