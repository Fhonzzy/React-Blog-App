import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Usercontext } from "../src/UserContext";

function Header() {
	const { userData, setUserData } = useContext(Usercontext);

	// const fetchProfile = () => {
	// 	fetch("http://localhost:5000/profile")
	// 		.then((response) => response.json())
	// 		.then((data) => setUserData(data.username));
	// };

	useEffect(() => {
		fetch("http://localhost:5000/profile")
			.then((response) => response.json())
			.then((data) => setUserData(data.username));
	}, []);

	const logOut = () => {
		fetch("http://localhost:5000/logout", {
			method: "POST",
			credentials: "include",
		});
		setUserData(null);
	};

	const username = userData?.username;
	return (
		<header className="nav-header">
			<div>
				<Link to={"/"} className="logo">
					My Blog
				</Link>
			</div>
			<div>
				{username && (
					<>
						<Link to={"/create"} className="create-link">
							Create Post
						</Link>
						<a className="login-link" onClick={logOut}>
							Log Out
						</a>
					</>
				)}
				{!username && (
					<>
						<Link to={"/register"} className="create-link">
							Create Acount
						</Link>
						<Link to={"/login"} className="login-link">
							Login
						</Link>
					</>
				)}
			</div>
		</header>
	);
}

export default Header;
