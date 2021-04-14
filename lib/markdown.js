const remark = require('remark');
const html = require('remark-html')
const prism = require('remark-prism')

async function markdownToHtml(markdown) {
	const result = await remark().use(html).use(prism).process(markdown);
	return result.toString();
}

module.exports = markdownToHtml;