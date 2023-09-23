import { useState } from "react";

function SignInPage() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	async function signUp(e) {
		e.preventDefault();

		await fetch("http://localhost:5000/register", {
			method: "POST",
			body: JSON.stringify({ username, email, password }),
			headers: { "Content-Type": "application/json" },
			credentials: "include",
		});
	}

	return (
		<form action="" onSubmit={signUp} className="register-form">
			<h1>Sign Up</h1>

			<input
				type="text"
				placeholder="Enter Name"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			/>
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
			<button>Sign Up</button>
		</form>
	);
}

export default SignInPage;
