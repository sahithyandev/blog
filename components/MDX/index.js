import { CustomLink } from "./../CustomLink";
import TableOfContents from "./TableOfContents";
import { linkableH2, linkableH3 } from "./linkableHead";
import Anchor from "./Anchor";
import BlockQuote from "./BlockQuote";
import Note from "./Note";
import Image from "./Image";
import Paragraph from "./Paragraph";
import Table from "./Table";
import Strong from "./Strong";

export const MDXComponents = {
	a: Anchor,
	img: Image,
	p: Paragraph,
	strong: Strong,
	table: Table,
	Anchor,
	BlockQuote,
	CustomLink,
	linkableH2,
	linkableH3,
	Note,
	TableOfContents,
}