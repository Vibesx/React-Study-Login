import React, { useEffect, useState } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./store/auth-context";

function App() {
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

	const loginHandler = (email, password) => {
		// We should of course check email and password
		// But it's just a dummy/ demo anyways
		localStorage.setItem("isLoggedIn", "1");
		setIsLoggedIn(true);
	};

	const logoutHandler = () => {
		localStorage.removeItem("isLoggedIn");
		setIsLoggedIn(false);
	};

	// AuthContext.Provider returns a component that can be used to wrap other components or tags in order to give them access to the AuthContext context
	return (
		<AuthContext.Provider value={{ isLoggedIn: isLoggedIn }}>
			<MainHeader onLogout={logoutHandler} />
			<main>
				{!isLoggedIn && <Login onLogin={loginHandler} />}
				{isLoggedIn && <Home onLogout={logoutHandler} />}
			</main>
		</AuthContext.Provider>
	);
}

export default App;
