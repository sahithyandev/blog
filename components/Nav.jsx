import Link from 'next/link'

export const Nav = ({ showLogo }) => {
	if (showLogo === undefined) { showLogo = true; }

	return (
		<nav>
			<Link href="/">
				<a className="name nav--logo reset">
					{
						showLogo ?
							"Sahithyan"
							: null
					}
				</a>
			</Link>

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