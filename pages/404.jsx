import tw from "twin.macro";

import { HeadBase, Nav, Footer } from "@/components"
import { SITE_CONSTANTS } from "../global"

const NotFoundPage = () => {
	return (
		<div css={tw`flex flex-col h-screen`}>
			<HeadBase title={`NoT_foUND`} description={`Page not found - ${SITE_CONSTANTS.description}`} />

			<Nav />

			<h1 css={tw`text-light m-auto text-center`}>{"!> pAgE n0T_f0uNd"}</h1>

			<Footer />
		</div >
	)
}

export default NotFoundPage