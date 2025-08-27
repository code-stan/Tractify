import { useState, useEffect } from "react";

const useScrollDirection = () => {
	const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(null);
	const [lastScrollY, setLastScrollY] = useState(0);

	useEffect(() => {
		const updateScrollDirection = () => {
			const scrollY = window.scrollY;
			
			// Always show nav when at the top of the page
			if (scrollY === 0) {
				setScrollDirection("up");
				setLastScrollY(0);
				return;
			}
			
			const direction = scrollY > lastScrollY ? "down" : "up";

			if (direction !== scrollDirection && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
				setScrollDirection(direction);
			}
			setLastScrollY(scrollY > 0 ? scrollY : 0);
		};

		const handleScroll = () => {
			window.requestAnimationFrame(updateScrollDirection);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [scrollDirection, lastScrollY]);

	return scrollDirection;
};

export default useScrollDirection;
