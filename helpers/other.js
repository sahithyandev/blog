export const NormalDateFormat = new Intl.DateTimeFormat('en-GB', {
	year: 'numeric',
	month: "long",
	day: "numeric",
})

export const isTag = str => new RegExp(/^#[A-Za-z]*$/i).test(str)