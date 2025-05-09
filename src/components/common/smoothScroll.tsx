"use client";
import ReactLenis from "@studio-freight/react-lenis";
import type { ReactNode } from "react";
// import useSplit from "../../hooks/useSplit";

const SmoothScroll = ({ children }: { children: ReactNode }) => {
	// useSplit()
	return <ReactLenis root>{children}</ReactLenis>;
};

export default SmoothScroll;
