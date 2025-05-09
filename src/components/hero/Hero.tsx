import CopySplit from "../CopySplit";
import Nav from "../nav/Nav";
import styles from "./style.module.scss";

const Hero = () => {
	return (
		<section className={styles.hero}>
			<Nav />
            <div className={styles["hero__container"]}>
                <CopySplit delay={0.3}>

                <h1>Streamline <br/> your workflow and manage your time.</h1>
                </CopySplit>
            </div>
		</section>
	);
};

export default Hero;
