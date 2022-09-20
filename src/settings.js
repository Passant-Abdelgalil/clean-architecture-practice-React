import AuthHolder from "./features/auth/domain/entities/AuthHolder";
import AuthApi from "./features/auth/data/AuthApi";
import AuthStorage from "./features/auth/data/AuthStorage";
import UserHolder from "./features/userProfile/domain/entities/userHolder";
import UserApi from "./features/userProfile/data/UserApi";
import UserStorage from "./features/userProfile/data/UserStorage";

const userHolder = new UserHolder();
const authHolder = new AuthHolder();

const userStorage = new UserStorage();
const authStorage = new AuthStorage();

const userApi = new UserApi();
const authApi = new AuthApi();

authApi.attachListener(userHolder);
authApi.attachListener(authHolder);

export { authApi, userHolder, userStorage, userApi, authStorage, authHolder };
