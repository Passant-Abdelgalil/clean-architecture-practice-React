import LocalStorageRepository from "../../../services/localStorage/LocalStorageRepository";

export default class UserStorage extends LocalStorageRepository {
	#key = "user";

	save(data) {
		try {
			localStorage.setItem(this.#key, JSON.stringify(data));
		} catch {}
	}

	get() {
		const item = localStorage.getItem(this.#key);
		if (!item) return null;
		try {
			return JSON.parse(item);
		} catch {
			return null;
		}
	}

	remove() {
		localStorage.removeItem(this.#key);
	}
}
