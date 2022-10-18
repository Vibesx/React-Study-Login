import React, { useEffect, useReducer, useState, useContext } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";

// because the reducer doesn't use anything from within the component, it can be declared outside of it
const emailReducer = (state, action) => {
	if (action.type === "USER_INPUT") {
		return { value: action.val, isValid: action.val.includes("@") };
	}
	if (action.type === "INPUT_BLUR") {
		// state stores the last state of our object
		return { value: state.value, isValid: state.value.includes("@") };
	}
	return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
	if (action.type === "USER_INPUT") {
		return {
			value: action.val,
			isValid: action.val.trim().length > 6,
		};
	}
	if (action.type === "INPUT_BLUR") {
		return { value: state.value, isValid: state.value.trim().length > 6 };
	}
	return { value: "", isValid: false };
};

const Login = (props) => {
	// const [enteredEmail, setEnteredEmail] = useState("");
	// const [emailIsValid, setEmailIsValid] = useState();
	// const [enteredPassword, setEnteredPassword] = useState("");
	// const [passwordIsValid, setPasswordIsValid] = useState();
	const [formIsValid, setFormIsValid] = useState(false);

	const [emailState, dispatchEmail] = useReducer(emailReducer, {
		value: "",
		isValid: false,
	});

	const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
		value: "",
		isValid: false,
	});

	const ctx = useContext(AuthContext);

	// because we need the isValid property from both objects, we will assign aliases to them to avoid naming collision
	const { isValid: emailIsValid } = emailState;
	const { isValid: passwordIsValid } = passwordState;

	// we use useEffect here to trigger a re-render when either field is changed
	// this way we can have the setFormIsValid in one place instead of each field that needs validation
	// note: not adding dependencies array (even empty) means the useEffect function will run
	// on every component re-render; in our case, it will cause an endless loop as we change a state variable,
	// which triggers a re-render, which would trigger the useEffect and so on
	useEffect(() => {
		console.log(emailIsValid && passwordIsValid);

		const timerIdentifier = setTimeout(() => {
			console.log("Checking form validity!");
			//console.log(emailIsValid && passwordIsValid);
			setFormIsValid(emailIsValid && passwordIsValid);
		}, 500);

		return () => {
			console.log("CLEANUP");
			// clearTimeout is a built-in function that takes a timeout object as a parameter and clears it
			clearTimeout(timerIdentifier);
		};
		// we only want the useEffect to trigger when the isValid value changes, not when the object changes; that is why we can use object destructuring to extract only the isValid property from the objects and use them as dependencies
		// we can do this without destructuring as well, using emailState.isValid and passwordState.isValid as dependencies, but it keeps the code cleaner
	}, [/*setFormIsValid,*/ emailIsValid, passwordIsValid]);

	const emailChangeHandler = (event) => {
		// calling dispatchEmail causes the function defined in useReducer (emailReducer in this case) to run
		// the second parameter of useReducer (action in our case) will contain the parameter given to dispatchEmail
		dispatchEmail({ type: "USER_INPUT", val: event.target.value });

		// setting formIsValid here (same for password) isn't recommended as we cannot be sure passwordState has the latest version; that is why we should put this in useEffect
		// the reason why it will have the latest version inside a useEffect is that whenever emailState or passwordState changes, the useEffect is triggered, so it will always have the latest version inside it
		// setFormIsValid(
		// 	event.target.value.includes("@") &&
		// 		passwordState.value.trim().length > 6
		// );
	};

	const passwordChangeHandler = (event) => {
		// setEnteredPassword(event.target.value);
		dispatchPassword({ type: "USER_INPUT", val: event.target.value });

		// setFormIsValid(
		// 	event.target.value.trim().length > 6 && emailState.isValid
		// );
	};

	const validateEmailHandler = () => {
		// setEmailIsValid(emailState.isValid);
		dispatchEmail({ type: "INPUT_BLUR" });
	};

	const validatePasswordHandler = () => {
		// setPasswordIsValid(enteredPassword.trim().length > 6);
		dispatchPassword({ type: "INPUT_BLUR" });
	};

	const submitHandler = (event) => {
		event.preventDefault();
		ctx.onLogin(emailState.value, passwordState.value);
	};

	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<div
					className={`${classes.control} ${
						emailState.isValid === false ? classes.invalid : ""
					}`}
				>
					<label htmlFor="email">E-Mail</label>
					<input
						type="email"
						id="email"
						value={emailState.value}
						onChange={emailChangeHandler}
						onBlur={validateEmailHandler}
					/>
				</div>
				<div
					className={`${classes.control} ${
						passwordState.isValid === false ? classes.invalid : ""
					}`}
				>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						value={passwordState.value}
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
