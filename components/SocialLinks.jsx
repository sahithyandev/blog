import { CustomLink } from "./CustomLink"

import styles from "@/styles/social-links.module.css"
export const SocialLinks = (props) => {
	const createSocialMediaLinkObj = (dataArr) => {
		/**
		 * @type {string}
		 */
		const [providerName, link, __icon, shortName] = dataArr;

		return {
			providerName, link,
			icon: __icon === null ? null : __icon || providerName.toLowerCase(),
			id: link.split("/").reverse()[0],
			shortName
		}
	}

	const updatedSocialMedia = [
		// ["providerName", "profileLink", "<optional>iconName", "(to be used if the icon is undefined)<optional>shortName"]
		["Twitter", "https://www.twitter.com/iamSahithyan"],
		["Instagram", "https://www.instagram.com/sahithyan_"],
		["GitHub", "https://www.github.com/sahithyandev"],
		["Telegram", "https://www.t.me/sahithyan", "telegram-plane"]
	].map(createSocialMediaLinkObj)

	return (
		<div className={styles["social-media-icons-container"]}>
			{updatedSocialMedia.map(s => {
				return (
					<CustomLink className="reset" href={s.link} key={s.providerName} title={`${s.providerName} (${s.id})`}>
						{s.icon ?
							<i className={`fab fa-${s.icon}`}></i> :
							<span className={styles["sm-icon"]}>{s.shortName}</span>
						}
					</CustomLink>
				)
			})}
		</div>
	)
}