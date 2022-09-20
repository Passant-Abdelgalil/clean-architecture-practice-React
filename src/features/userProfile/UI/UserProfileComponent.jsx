import { useContext } from "react";
import { UserProfileContext } from "../data/UserProfileContextProvider";
import { useNavigate } from "react-router-dom";

const fallbackImgSrc =
	"https://via.placeholder.com/150/FFFFFF/000000/?text=Avatar";

const UserProfileComponent = () => {
	const userProfileContext = useContext(UserProfileContext);

	const navigate = useNavigate();

	const handleChangeBtnClick = () => {
		navigate("/settings");
	};

	const userProfilePhoto =
		userProfileContext.userHolder.getPhotoURL() || fallbackImgSrc;

	const onError = (e) => {
		e.currentTarget.onerror = null;
		e.currentTarget.src = fallbackImgSrc;
	};

	return (
		<div className="profile-card">
			<div className="profile-card__content">
				<div className="profile-card__img">
					<img alt="user profile" src={userProfilePhoto} onError={onError} />
				</div>
				<div className="profile-card__info">
					<p className="profile-card__info-name">
						{userProfileContext.userHolder.getDisplayName()}
					</p>
					<p className="profile-card__info-email">
						{userProfileContext.userHolder.getEmail()}
					</p>
				</div>
			</div>
			<button className="profile-card--settings" onClick={handleChangeBtnClick}>
				Change Settings
			</button>
		</div>
	);
};

export default UserProfileComponent;
