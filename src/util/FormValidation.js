export default class FormValidator {
	/**
	 *
	 * @param {String} email
	 * @returns {Boolean} email validity
	 */
	static isValidEmail(email) {
		const emailRegex =
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;
		return emailRegex.test(email);
	}

	/**
	 *
	 * @param {String} password
	 * @returns {Boolean} password validity
	 */
	static isValidPassword(password) {
		const passwordRegex =
			/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
		return passwordRegex.test(password);
	}

	/**
	 *
	 * @param {String} confPassword
	 * @param {String} password
	 * @returns {Boolean} confirm password validity
	 */
	static isValidConfirmPassword(confPassword, password) {
		return confPassword === password;
	}

	static isValidUserName(userName) {
		const userNameRegex = /^(?=.*[a-zA-Z])[\w\-_\s]{3,}$/;
		return userNameRegex.test(userName);
	}

	static isValidURL(url) {
		try {
			new URL(url);
			return true;
		} catch {
			return false;
		}
	}
}
