import React from "react";
import { createGlobalStyle } from "styled-components";
import tw, { theme, GlobalStyles as BaseStyles } from "twin.macro";

const CustomStyles = createGlobalStyle`
	@font-face {
		font-family: 'Inter';
		font-style: normal;
		font-weight: 400;
		font-display: swap;
		src: url("/fonts/Inter-Regular.ttf");
	}

	@font-face {
		font-family: 'Inter';
		font-style: normal;
		font-weight: 500;
		font-display: swap;
		src: url("/fonts/Inter-Medium.ttf");
	}

	@font-face {
		font-family: 'Inter';
		font-style: normal;
		font-weight: 600;
		font-display: swap;
		src: url("/fonts/Inter-SemiBold.ttf");
	}

	@font-face {
		font-family: 'Inter';
		font-style: normal;
		font-weight: 700;
		font-display: swap;
		src: url("/fonts/Inter-Bold.ttf");
	}

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
	
	nav {
		margin-top: 10px;
		margin-bottom: 20px;
		align-items: center;
		justify-content: space-between;
		display: flex;
	}
	
	.nav--logo {
		text-transform: uppercase;
	}
	
	.nav--links-container {
		display: flex;
		width: fit-content;
		gap: 20px;
		
		list-style: none;
		padding: 0;
	}
	
	.nav--link {
		padding: none;
		opacity: 0.6;
		transition: opacity .2s;
	}
	
	.nav--link:hover {
		opacity: 1;
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