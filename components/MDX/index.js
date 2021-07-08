import { CustomLink } from "./../CustomLink";
import TableOfContents from "./TableOfContents";
import { linkableH2, linkableH3 } from "./linkableHead";
import BlockQuote from "./BlockQuote";
import Note from "./Note";
import Image from "./Image";

export const MDXComponents = {
	a: CustomLink,
	img: Image,
	BlockQuote,
	CustomLink,
	linkableH2,
	linkableH3,
	Note,
	TableOfContents,
}