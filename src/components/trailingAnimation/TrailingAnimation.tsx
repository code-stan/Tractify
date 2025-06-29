import React from "react";
import styles from "./style.module.scss";

const NUM_STARS = 4;

const TrailingAnimation: React.FC = () => {
	return (
		<section className={styles.section}>
			{Array.from({ length: NUM_STARS }).map((_, i) => (
				<div className={styles["star-line"]} key={i} style={{ "--idx": i } as React.CSSProperties}>
					<span className={styles.star} style={{ "--idx": i } as React.CSSProperties} />
				</div>
			))}
		</section>
	);
};

export default TrailingAnimation;
