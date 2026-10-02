import { socialPlatforms } from "./landing-data";
import { ConnectionAction } from "./landing-interactions";
import styles from "./page.module.css";

export default function SocialLinks() {
  return <div className={styles.social} id="social">
    <div className={styles.socialButtons}>{socialPlatforms.map((platform) => <ConnectionAction key={platform.name} connection={platform} className={styles.socialButton} />)}</div>
  </div>;
}
