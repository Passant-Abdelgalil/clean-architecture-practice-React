// firebase realted imports
import {
	createUserWithEmailAndPassword,
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import app from "../../../services/firebase-config";

// utils
import AuthApiRepository from "../domain/Repositories/AuthApiRepository";
import AuthorizationResult from "../domain/datastructures/AuthorizationResult";


export default class AuthApi extends AuthApiRepository {
	/**
	 * holds a reference to firebase SDK auth object.
	 */
	#auth;
	/**
	 * array of references to objects that need to listen for
	 * firebase auth state changes
	 */
	#listeners;
	/**
	 * holds a reference to the unsubscribe function returned by firebase
	 * to avoid multiple async subscribtions
	 */
	#unsubscribe;

	constructor() {
		super();
		this.#auth = getAuth(app);
		this.#listeners = [];
		this.#unsubscribe = null;
	}

	/**
	 * login the user with the provided credentials
	 * @param {String} email
	 * @param {String} password
	 * @param {String} validationKey
	 * @throws {Error} if credentials have not passed
	 * @returns {Promise<AuthorizationResult>}
	 */
	async login(email, password) {
		const credentials = await signInWithEmailAndPassword(
			this.#auth,
			email,
			password
		);
		const token = await credentials.user.getIdToken();
		return new AuthorizationResult(token, credentials.user.toJSON());
	}

	/**
	 * create new account with provided email and password
	 * @param {String} email
	 * @param {String} password
	 * @throws {Error} if credentials have not passed
	 * @returns {Promise<AuthorizationResult>}
	 */
	async signup(email, password) {
		const credentials = await createUserWithEmailAndPassword(
			this.#auth,
			email,
			password
		);
		const token = await credentials.user.getIdToken();
		return new AuthorizationResult(token, credentials.user.toJSON());
	}

	/**
	 *
	 * @throws {Error} if log out failed
	 * @returns {Promise<void>}
	 */
	logout() {
		return signOut(this.#auth)
			.then(() => {})
			.catch((error) => {
				throw new Error(error.code);
			});
	}

	/**
	 * attach the object as a listener to firebase auth state changes
	 * unsubsribe if previous subscribtion is made
	 * call the firebase subscribtion function and set the unsubscribe field
	 * @param {Object} listener must have onAuthStateChanged function
	 * @throws {Error} if parameter is of invalid type
	 */
	attachListener(listener) {
		if (typeof listener.onAuthStateChanged !== "function")
			throw new Error(
				`${typeof listener} do not implement onAuthStateChanged function`
			);

		const listenerIdx = this.#listeners.indexOf(listener);
		if (listenerIdx !== -1) return;

		/**
		 * since onAuthStateChanged is called once to aviod race conditions
		 * it's mandatory to remove previous subscirbtion before updating
		 * the listeners list
		 * after that re-register a subscriber with the new listeners list
		 */
		if (this.#unsubscribe) this.#unsubscribe();

		this.#listeners.push(listener);
		const unsubscribe = onAuthStateChanged(this.#auth, (user) => {
			this.#listeners.forEach((listener) => listener.onAuthStateChanged(user));
		});
		this.#unsubscribe = () => {
			unsubscribe();
		};
	}

	/**
	 * detach the registered listener Object and unsubscribe from firebase
	 */
	detachListener(listener) {
		const listenerIdx = this.#listeners.indexOf(listener);
		if (listenerIdx === -1) return;
		this.#listeners.splice(listenerIdx, 1);

		// if listeners list empty, unsubscribe from firebase auth
		if (this.#unsubscribe && !this.#listeners.length) {
			this.#unsubscribe();
			this.#unsubscribe = null;
		}
	}
}
