import { useEffect, useState } from "react";

const useScrollPosition = (threshold: number = 100) => {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const scrollY = window.scrollY;
			setIsScrolled(scrollY > threshold);
		};

		window.addEventListener("scroll", handleScroll);
		
		// Check initial position
		handleScroll();

		return () => window.removeEventListener("scroll", handleScroll);
	}, [threshold]);

	return isScrolled;
};

export default useScrollPosition;