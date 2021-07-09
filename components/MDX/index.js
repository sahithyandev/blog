import { CustomLink } from "./../CustomLink";
import TableOfContents from "./TableOfContents";
import { linkableH2, linkableH3 } from "./linkableHead";
import Anchor from "./Anchor";
import BlockQuote from "./BlockQuote";
import Note from "./Note";
import Image from "./Image";
import Paragraph from "./Paragraph";
import Table from "./Table";

export const MDXComponents = {
	a: Anchor,
	img: Image,
	p: Paragraph,
	table: Table,
	Anchor,
	BlockQuote,
	CustomLink,
	linkableH2,
	linkableH3,
	Note,
	TableOfContents,
}