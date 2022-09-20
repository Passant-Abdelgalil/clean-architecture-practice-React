export default class AuthorizationResult {
	/**
	 *
	 * @param {String} authorizationToken
	 */
	constructor(authorizationToken, user) {
		this.authorizationToken = authorizationToken;
		this.user = user;
	}
}
