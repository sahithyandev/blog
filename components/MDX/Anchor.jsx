import tw from "twin.macro";

import { CustomLink } from "../CustomLink";

const Anchor = tw(CustomLink)`text-link hover:text-link-hover underline transition-colors`;

export default Anchor