import { socialPlatforms } from "@/app/_data/landing";
import { ConnectionAction } from "./interactions";
import styles from "./landing.module.css";

export default function SocialLinks() {
  return <div className={styles.social} id="social">
    <div className={styles.socialButtons}>{socialPlatforms.map((platform) => <ConnectionAction key={platform.name} connection={platform} className={styles.socialButton} />)}</div>
  </div>;
}
