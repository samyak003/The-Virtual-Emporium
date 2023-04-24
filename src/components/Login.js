import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../firebase";

function Login() {
	const history = useHistory();
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");
	const [password, setPassword] = useState("");

	const signIn = (event) => {
		event.preventDefault();
		auth
			.signInWithEmailAndPassword(email, password)
			.then((auth) => {
				history.push("/");
			})
			.catch((error) => setError(error.message));
	};
	const register = (event) => {
		event.preventDefault();
		history.push("/signUp");
	};
	return (
		<section className="login">
			<Link to="/">
				<img className="login__logo" src="/logo.png" alt="banner"></img>
			</Link>
			<main className="login__container">
				<h1>Sign-In</h1>
				<form>
					<h5>E-mail</h5>
					<input
						type="email"
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					></input>
					<h5>Password</h5>
					<input
						type="password"
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					></input>
					<button
						onClick={signIn}
						type="submit"
						className="login__signInButton btn"
					>
						Sign In
					</button>
				</form>
				<p className="error">{error}</p>
				<p>
					By signing-in you agree to The-Virtual-Emporium's Conditions of Use &
					Sale. Please see our Privacy Notice, our Cookies Notice and our
					Interest-Based Ads Notice.
				</p>
				<button onClick={register} className="login__registerButton">
					Create Your Account
				</button>
			</main>
		</section>
	);
}

export default Login;
