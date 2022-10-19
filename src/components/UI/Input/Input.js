import React from "react";

import { useRef, useImperativeHandle } from "react";
import classes from "./Input.module.css";

// forwardRef returns a React component that can be bound to a React ref (normally it can't, only primitive tags can)
// 99% of the cases we will only need props as a parameter, but we can also have ref
const Input = React.forwardRef((props, ref) => {
	const inputRef = useRef();

	// we declare this function here so that we can call it through the ref of this input in the parent component (using <ref_name>.current.<function_name>)
	const activate = () => {
		// inputRef points to the DOM element of the input; focus() is a built-in function that focuses cursor on the DOM element
		inputRef.current.focus();
	};

	// second parameter is a function that returns an object containing all the stuff we want to have available outside the component
	useImperativeHandle(ref, () => {
		return {
			focus: activate,
		};
	});

	return (
		<div
			className={`${classes.control} ${
				props.isValid === false ? classes.invalid : ""
			}`}
		>
			<label htmlFor={props.id}>{props.label}</label>
			<input
				ref={inputRef}
				type={props.type}
				id={props.id}
				value={props.value}
				onChange={props.onChange}
				onBlur={props.onBlur}
			/>
		</div>
	);
});

export default Input;
