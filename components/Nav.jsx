import Link from 'next/link'

export const Nav = ({ hideLogo }) => {
	return (
		<nav>
			{
				hideLogo ? <div></div> :
					<Link href="/">
						<a className="nav--logo reset">
							Sahithyan
						</a>
					</Link>
			}

			<ul className="nav--links-container">
				<li className="nav--link">
					<Link href="/posts">
						<a className="reset">Posts</a>
					</Link>
				</li>
				<li className="nav--link">
					<Link href="/about">
						<a className="reset">About</a>
					</Link>
				</li>
			</ul>

		</nav>
	)
}