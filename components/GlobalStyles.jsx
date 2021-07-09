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
		${tw`box-border`}
	}

	html,
	body {
		${tw`m-auto bg-dark text-light max-w-3xl`}
		font-family: Inter, ui-sans-serif, sans-serif;
		scroll-behavior: smooth;
		width: 72vw;
	}

	@media (max-width: 600px) {
		html, body {
			max-width: 90vw;
			width: auto; 
		}
	}
	
	a {
		${tw`no-underline border-b-0`}
		color: inherit;
	}
	
	nav {
		${tw`mt-2 mb-4 flex justify-between items-center`}
	}
	
	.nav--logo {
		${tw`uppercase font-bold text-xl tracking-tight`}
	}
	
	.nav--links-container {
		${tw`flex gap-5 list-none p-0`}
	}
	
	.nav--link {
		${tw`opacity-60 hover:opacity-100 transition-opacity`}
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