import React, { useEffect, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const Login = (props) => {
	const [enteredEmail, setEnteredEmail] = useState("");
	const [emailIsValid, setEmailIsValid] = useState();
	const [enteredPassword, setEnteredPassword] = useState("");
	const [passwordIsValid, setPasswordIsValid] = useState();
	const [formIsValid, setFormIsValid] = useState(false);

	// we use useEffect here to trigger a re-render when either field is changed
	// this way we can have the setFormIsValid in one place instead of each field that needs validation
	// note: not adding dependencies array (even empty) means the useEffect function will run
	// on every component re-render; in our case, it will cause an endless loop as we change a state variable,
	// which triggers a re-render, which would trigger the useEffect and so on
	useEffect(
		(event) => {
			setFormIsValid(
				enteredEmail.includes("@") && enteredPassword.trim().length > 6
			);
		},
		[/*setFormIsValid,*/ enteredEmail, enteredPassword]
	);

	const emailChangeHandler = (event) => {
		setEnteredEmail(event.target.value);

		// setFormIsValid(
		// 	event.target.value.includes("@") &&
		// 		enteredPassword.trim().length > 6
		// );
	};

	const passwordChangeHandler = (event) => {
		setEnteredPassword(event.target.value);

		// setFormIsValid(
		// 	event.target.value.trim().length > 6 && enteredEmail.includes("@")
		// );
	};

	const validateEmailHandler = () => {
		setEmailIsValid(enteredEmail.includes("@"));
	};

	const validatePasswordHandler = () => {
		setPasswordIsValid(enteredPassword.trim().length > 6);
	};

	const submitHandler = (event) => {
		event.preventDefault();
		props.onLogin(enteredEmail, enteredPassword);
	};

	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<div
					className={`${classes.control} ${
						emailIsValid === false ? classes.invalid : ""
					}`}
				>
					<label htmlFor="email">E-Mail</label>
					<input
						type="email"
						id="email"
						value={enteredEmail}
						onChange={emailChangeHandler}
						onBlur={validateEmailHandler}
					/>
				</div>
				<div
					className={`${classes.control} ${
						passwordIsValid === false ? classes.invalid : ""
					}`}
				>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						value={enteredPassword}
						onChange={passwordChangeHandler}
						onBlur={validatePasswordHandler}
					/>
				</div>
				<div className={classes.actions}>
					<Button
						type="submit"
						className={classes.btn}
						disabled={!formIsValid}
					>
						Login
					</Button>
				</div>
			</form>
		</Card>
	);
};

export default Login;
