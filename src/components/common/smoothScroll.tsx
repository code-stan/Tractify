import { ReactLenis } from "lenis/react";
import { useLenisContext } from "../../context/LenisContext";
import type { ReactNode } from "react";
import type { Orientation } from "lenis";

const SmoothScroll = ({ children }: { children: ReactNode }) => {
	const context = useLenisContext();
	if (!context) {
		throw new Error("useLenisContext must be used within a LenisProvider");
	}
	const { lenisMultiplierValue } = context;
	const lenisOptions = {
		duration: 1.75,
		easing: (x: number) => (x === 1 ? 1 : 1 - Math.pow(2, -10 * x)),
		orientation: "vertical" as Orientation,
		gestureOrientation: "vertical" as Orientation,
		smoothWheel: true,
		wheelMultiplier: lenisMultiplierValue ? 0 : 0.95,
		touchMultiplier: lenisMultiplierValue ? 0 : 0.95,
		infinite: false,
	};
	return (
		<ReactLenis root options={lenisOptions}>
			{children}
		</ReactLenis>
	);
};

export default SmoothScroll;
