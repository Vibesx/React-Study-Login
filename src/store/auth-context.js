import React, { useState, useEffect } from "react";

// createContext gets as a parameter a state (usually an object); the parameter will also be the default value
// it returns an object that contains a component
// it's a good idea to also add functions as an empty function to the default value of the context for auto-completion
const AuthContext = React.createContext({
	isLoggedIn: false,
	onLogout: () => {},
	onLogin: (email, password) => {},
});

export const AuthContextProvider = (props) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	// useEffect always runs once when component is redered the first time
	// then it runs again every time one of the dependencies changes
	// as we do not have any dependecies declared, no dependencies can ever change,
	// so it will only run once, when the component is rendered
	// In this particular use case we want to make sure that if a user refreshes the page,
	// he is still logged in (as React has a single-page approach)
	// So what we do is we store the logged in state somewhere and make sure we get it once when component is ran for the first time
	useEffect(() => {
		const storeduserLoggedInInformation =
			localStorage.getItem("isLoggedIn");
		if (storeduserLoggedInInformation === "1") {
			setIsLoggedIn(true);
		}
	}, []);

	const logoutHandler = () => {
		localStorage.removeItem("isLoggedIn");
		setIsLoggedIn(false);
	};

	const loginHandler = () => {
		localStorage.setItem("isLoggedIn", "1");
		setIsLoggedIn(true);
	};

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: isLoggedIn,
				onLogout: logoutHandler,
				onLogin: loginHandler,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
