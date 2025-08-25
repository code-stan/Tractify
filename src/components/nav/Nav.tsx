import React from "react";
import CopySplit from "../CopySplit";
import { navLinksItems } from "./data";
import useScrollDirection from "../../hooks/useScrollDirection";
import useScrollPosition from "../../hooks/useScrollPosition";
import styles from "./style.module.scss";

const Nav = () => {
	const scrollDirection = useScrollDirection();
	const isScrolled = useScrollPosition(100);
	
	const navLinks = navLinksItems.map((item) => (
		<React.Fragment key={item}>
			<CopySplit delay={0.25}>
				<span>{item}</span>
			</CopySplit>
		</React.Fragment>
	));
	return (
		<nav className={`${styles.nav} ${scrollDirection === 'down' ? styles.nav__hidden : ''} ${isScrolled ? styles.nav__blurred : ''}`}>
			<ul>
				<CopySplit delay={0.25}>
					<li className={styles.nav__logo}>Tractify</li>
				</CopySplit>
				<div className={styles.nav__items}>
					<li className={styles.nav__links}>{navLinks}</li>

					<CopySplit delay={0.25}>
						<li className={styles.nav__buttons}>
							<button>Login</button>
							<button>Get started <img src="/right-arr.svg" alt=""/></button>
						</li>
					</CopySplit>
				</div>
			</ul>
		</nav>
	);
};

export default Nav;
