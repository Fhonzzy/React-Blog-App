import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { Usercontext } from "../src/UserContext";

function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [redirect, setRedirect] = useState(false)
	const {setUserData} = useContext(Usercontext)

	async function login(e) {
		e.preventDefault();

		const response = await fetch("http://localhost:5000/login", {
			method: "POST",
			body: JSON.stringify({ email, password }),
			headers: { "Content-Type": "application/json" },
			credentials: "include",
		});

		if(response.ok) {
			response.json()
			.then((userData) => setUserData(userData))
			setRedirect(true)
		}

	}

	if(redirect) {
		return <Navigate to='/'/>
	}

	return (
		<form action="" onSubmit={login} className="login-form">
			<h1>Login</h1>

			<input
				type="text"
				placeholder="Enter Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type="password"
				placeholder="Enter Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button>Log In</button>
		</form>
	);
}

export default LoginPage;
