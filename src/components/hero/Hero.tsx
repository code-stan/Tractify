import CopySplit from "../CopySplit";
import Nav from "../nav/Nav";
import styles from "./style.module.scss";

const Hero = () => {
	return (
		<section className={styles.hero}>
			<Nav />
			<div className={styles["hero__container"]}>
				<CopySplit delay={0.3}>
					<img className={styles["stars-img"]} src="/hero-stars.svg" alt="" width={289} height={528} />
					<h1>
						Streamline <br /> your workflow and manage your time.
					</h1>
				</CopySplit>
				<div className={styles["hero__container-content"]}>
					<CopySplit delay={0.45}>
						<p>Tractify automates the busywork, organizes your cases, and helps you bill more (without working more). </p>
						<p>It’s fast. Simple. Invisible. Just how good tech should be.</p>
					</CopySplit>
					<button>
						<div>
							<img src="./orb-icon.svg" alt="" width="25" height="25" />
							Get started
						</div>
						<img src="./yellow-right-arr.svg" alt="" width={11} height={11} />
					</button>
				</div>
			</div>
		</section>
	);
};

export default Hero;
