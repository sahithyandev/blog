export const Page = ({ children }) => {
	return <>
		<style jsx global>{`
			a.reset {
				text-decoration: none;
				color: inherit;	
				border-bottom: none;
			}
			
		`}
		</style>

		{children}
	</>
}