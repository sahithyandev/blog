import { CustomLink } from "./CustomLink"

import styles from "@/styles/social-links.module.css"
import { SITE_CONSTANTS } from "global";
export const SocialLinks = (props) => {
	/**
	 * @typedef SocialMediaLinkObj
	 * @property {string} link
	 * @property {string} providerName
	 * @property {string} id
	 * @property {string} icon
	 * @property {"fab" | "fas"} iconType
	 */

	/**
	 * @type {SocialMediaLinkObj[]}
	 */
	const SocialMediaLinks = [
		{
			providerName: "Twitter",
			link: "https://www.twitter.com/iamSahithyan"
		}, {
			providerName: "Instagram",
			link: "https://www.instagram.com/sahithyan_"
		}, {
			providerName: "GitHub",
			link: "https://www.github.com/sahithyandev"
		}, {
			providerName: "Telegram",
			link: "https://www.t.me/sahithyan",
			icon: "telegram-plane"
		}, {
			providerName: "RSS",
			link: SITE_CONSTANTS.rss_feed_url,
			iconType: "fas"
		}].map(socialLinkObj => ({
			icon: socialLinkObj.providerName.toLowerCase(),
			iconType: "fab",
			id: socialLinkObj.link.split("/").reverse()[0],
			...socialLinkObj
		}))

	return (
		<div className={styles["social-media-icons-container"]}>
			{SocialMediaLinks.map(s => {
				return (
					<CustomLink className="reset" href={s.link} key={s.providerName} title={`${s.providerName} (${s.id})`}>
						{s.icon ?
							<i className={`${s.iconType} fa-${s.icon}`}></i> :
							<span className={styles["sm-icon"]}>{s.shortName}</span>
						}
					</CustomLink>
				)
			})}
		</div>
	)
}