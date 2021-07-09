import Link from 'next/link'

import { CustomLink } from "./CustomLink";

export const Nav = ({ hideLogo }) => {
	return (
		<nav>
			{
				hideLogo ? <div></div> : <CustomLink href="/" className="nav--logo">Sahithyan</CustomLink>
			}

			<ul className="nav--links-container">
				<li className="nav--link">
					<CustomLink href="/posts">Posts</CustomLink>
				</li>
				<li className="nav--link">
					<CustomLink href="/about">About</CustomLink>
				</li>
			</ul>

		</nav>
	)
}