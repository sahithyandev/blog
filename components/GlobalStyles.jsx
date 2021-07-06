import React from "react";
import { createGlobalStyle } from "styled-components";
import tw, { theme, GlobalStyles as BaseStyles } from "twin.macro";

const CustomStyles = createGlobalStyle`
	* {
		box-sizing: border-box;
	}

	html,
	body {
		margin: auto;
		max-width: 900px;
		width: 72vw;
		font-family: Inter, ui-sans-serif, sans-serif;
		background: var(--dark);
		color: var(--light);
		scroll-behavior: smooth;
	}
`;

export const GlobalStyles = () => {
	return (
		<>
			<BaseStyles />
			<CustomStyles />
		</>
	);
}