import React from "react";
import { createGlobalStyle } from "styled-components";
import tw, { theme, GlobalStyles as BaseStyles } from "twin.macro";

const CustomStyles = createGlobalStyle`
	:root {
		font-size: 18px;
		color-scheme: dark;
		
		--dark: #131315;
		--light: #FFFBFE;
		--main: #FAF33E;
		--main-half-opacity: #faf33e70;
		--secondary: #087F8C;
		--post-card-bg: hsl(236, 10%, 25%);
		--post-card-bg-hover: hsl(220, 12%, 35%);
		
		--social-twitter: hsl(203, 89%, 42%);
	}

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

	@media (max-width: 600px) {
		html, body {
			max-width: 90vw;
			width: auto; 
		}
	}	
`;

export const GlobalStyles = () => {
	return (
		<>
			{/* <BaseStyles /> */}
			<CustomStyles />
		</>
	);
}