import tw from "twin.macro";

import { CustomLink } from "./CustomLink"
import { GithubIcon, InstagramIcon, RSSIcon, TelegramIcon, TwitterIcon } from "@/assets/icons"
import { SITE_CONSTANTS } from "global";

export const SocialLinks = (props) => {
	/**
	 * @typedef SocialMediaLinkObj
	 * @property {string} link
	 * @property {string} providerName
	 * @property {string} id
	 * @property {any} svgIcon
	 */

	/**
	 * @type {SocialMediaLinkObj[]}
	 */
	const SocialMediaLinks = [
		{
			providerName: "Twitter",
			link: "https://www.twitter.com/sahithyandev",
			icon: TwitterIcon
		}, {
			providerName: "Instagram",
			link: "https://www.instagram.com/sahithyan_",
			icon: InstagramIcon
		}, {
			providerName: "GitHub",
			link: "https://www.github.com/sahithyandev",
			icon: GithubIcon
		}, {
			providerName: "Telegram",
			link: "https://www.t.me/sahithyan",
			icon: TelegramIcon
		}, {
			providerName: "RSS",
			link: SITE_CONSTANTS.rss_feed_url,
			icon: RSSIcon
		}].map(socialLinkObj => ({
			id: socialLinkObj.link.split("/").reverse()[0],
			...socialLinkObj
		}))

	return (
		<div css={tw`mt-2 flex gap-2`}>
			{SocialMediaLinks.map(s => {
				return (
					<CustomLink css={tw`opacity-60 hover:opacity-100 transition-opacity`} className="reset" href={s.link} key={s.providerName} title={`${s.providerName} (${s.id})`}>

						{s.icon ? <s.icon /> : (console.error(`provider ${s.providerName} doesn't have an icon`), null)}
					</CustomLink>
				)
			})}
		</div>
	)
}