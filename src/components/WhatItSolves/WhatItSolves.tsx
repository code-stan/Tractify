import { useRef } from "react";
import CopySplit from "../CopySplit";
import { solutionPoints } from "./data";
import "./style.scss";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WhatItSolves = () => {
	const containerRef = useRef<HTMLElement>(null);
	const sectionRef = useRef<HTMLDivElement>(null);
	const yellowBarRef = useRef<HTMLDivElement>(null);
	const pointsRefs = useRef<(HTMLLIElement | null)[]>([]);
	const imagesRefs = useRef<(HTMLImageElement | null)[]>([]);
	const grey = "#6a6d6e";
	useGSAP(
		() => {
			// Null checks
			if (!containerRef.current || !yellowBarRef.current) return;

			const validPoints = pointsRefs.current.filter(Boolean);
			const validImages = imagesRefs.current.filter(Boolean);

			if (validPoints.length < 3 || validImages.length < 3) return;

			const tl = gsap.timeline({
				ease: "none",
				scrollTrigger: {
					trigger: containerRef.current,
					start: "top top",
					end: () => `+=${window.innerHeight * 3}`,
					scrub: 0,
					pin: true,
					pinSpacing: true,
					anticipatePin: 1,
					snap: {
						snapTo: [0, 0.5, 1],
						directional: false,
						duration: 0,
						delay: 0.1,
						ease: "power2.inOut",
					},
				},
			});

			// Set initial states
			gsap.set(validPoints.slice(1), { color: grey });
			gsap.set(validPoints[0], { color: "white" });
			gsap.set(validImages, { opacity: 0 });
			gsap.set(validImages[0], { opacity: 1 });
			gsap.set(yellowBarRef.current, { y: 0 });

			// Animation sequence
			tl.to(yellowBarRef.current, {
				y: "100%",
				duration: 0.3,
				ease: "power2.inOut",
			})
				.to(validPoints[0], { color: grey, duration: 0.2 }, "<")
				.to(validPoints[1], { color: "white", duration: 0.3 }, "<0.1")
				.to(validImages[0], { opacity: 0, duration: 0.2 }, "<")
				.to(validImages[1], { opacity: 1, duration: 0.3 }, "<0.1")
				.to({}, { duration: 0.4 })
				.to(yellowBarRef.current, { y: "200%", duration: 0.3, ease: "power2.inOut" })
				.to(validPoints[1], { color: grey, duration: 0.2 }, "<")
				.to(validPoints[2], { color: "white", duration: 0.3 }, "<0.1")
				.to(validImages[1], { opacity: 0, duration: 0.2 }, "<")
				.to(validImages[2], { opacity: 1, duration: 0.3 }, "<0.1");
		},
		{ scope: containerRef }
	);

	return (
		<section className="what-it-solves" ref={containerRef}>
			<div className="pin-section-container" ref={sectionRef}>
				<CopySplit>
					<div className="title-container">
						<h2>How It Works</h2>
					</div>
				</CopySplit>
				<div className="heading-container">
					<CopySplit>
						<h3>
							What Tractify <br />
							<span>Solves</span>
						</h3>
					</CopySplit>
				</div>
				<div className="content-container">
					<div className="col content">
						<div className="bar-container">
							<div className="bar" ref={yellowBarRef}></div>
						</div>
						<ul className="points">
							{solutionPoints.map(({ heading, content }, index) => (
								<li className="point" key={heading} ref={(el) => (pointsRefs.current[index] = el)}>
									<h4>{heading}</h4>
									<p>{content}</p>
								</li>
							))}
						</ul>
					</div>
					<div className="col image-container">
						<img src="/what-it-solves-stars.svg" alt="" width={297} height={273} className="stars" />
						<div className="demo-container">
							<img src="/demo1.webp" alt="" ref={(el) => (imagesRefs.current[0] = el)} width={519} height={290} className="demo1" />
							<img src="/demo2.webp" alt="" ref={(el) => (imagesRefs.current[1] = el)} width={550} height={416} className="demo2" />
							<img src="/demo3.webp" alt="" ref={(el) => (imagesRefs.current[2] = el)} width={550} height={312} className="demo3" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default WhatItSolves;
