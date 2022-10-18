import React from "react";

// createContext gets as a parameter a state (usually an object)
// it returns an object that contains a component
const AuthContext = React.createContext({ isLoggedIn: false });

export default AuthContext;
