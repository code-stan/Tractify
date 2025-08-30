import { useRef } from "react";
import CopySplit from "../CopySplit";
import { solutionPoints, solutionPointsImages } from "./data";
import "./style.scss";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BREAKPOINT } from "../../utils/constants";

gsap.registerPlugin(ScrollTrigger);

const WhatItSolves = () => {
	const containerRef = useRef<HTMLElement>(null);
	const sectionRef = useRef<HTMLDivElement>(null);
	const yellowBarRef = useRef<HTMLDivElement>(null);
	const mobileYellowBarRef = useRef<HTMLDivElement>(null);
	const pointsRefs = useRef<(HTMLLIElement | null)[]>([]);
	const mobilePointsRefs = useRef<(HTMLLIElement | null)[]>([]);
	const imagesRefs = useRef<(HTMLImageElement | null)[]>([]);
	const mobileImagesRefs = useRef<(HTMLImageElement | null)[]>([]);
	const grey = "#6a6d6e";
	useGSAP(
		() => {
			// Null checks
			if (!containerRef.current) return;

			const mm = gsap.matchMedia();

			// Desktop animation
			mm.add(`(min-width: ${BREAKPOINT + 1}px)`, () => {
				if (!yellowBarRef.current) return;

				const validPoints = pointsRefs.current.filter(Boolean);
				const validImages = imagesRefs.current.filter(Boolean);

				if (validPoints.length < 3 || validImages.length < 3) return;

				const tl = gsap.timeline({
					ease: "none",
					scrollTrigger: {
						trigger: containerRef.current,
						start: "-24% top",
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
			});

			// Mobile animation
			mm.add(`(max-width: ${BREAKPOINT}px)`, () => {
				if (!mobileYellowBarRef.current) return;
				const validMobilePoints = mobilePointsRefs.current.filter(Boolean);
				const validMobileImages = mobileImagesRefs.current.filter(Boolean);

				if (validMobilePoints.length < 3 || validMobileImages.length < 3) return;

				// Set initial states
				gsap.set(
					validMobilePoints
						.slice(1)
						.map((p) => p?.querySelector("h4, p"))
						.filter(Boolean),
					{ color: grey }
				);
				const firstPointElements = validMobilePoints[0]?.querySelectorAll("h4, p");
				if (firstPointElements) {
					gsap.set(firstPointElements, { color: "white" });
				}
				gsap.set(validMobileImages.slice(1), { opacity: 0.3 });
				gsap.set(validMobileImages[0], { opacity: 1 });
				gsap.set(mobileYellowBarRef.current, { height: "0%", transformOrigin: "top" });

				ScrollTrigger.create({
					trigger: containerRef.current,
					start: "top center",
					end: "bottom center",
					scrub: 1,
					onUpdate: (self) => {
						const progress = self.progress;

						// Bar growth - animate height instead of scaleY
						if (mobileYellowBarRef.current) {
							mobileYellowBarRef.current.style.height = `${progress * 100}%`;
						}

						// Point and image animations based on progress thresholds
						const section1Threshold = 0.33;
						const section2Threshold = 0.66;

						validMobilePoints.forEach((point, index) => {
							const pointElements = point?.querySelectorAll("h4, p");
							const image = validMobileImages[index];

							let isActive = false;
							if (index === 0 && progress < section1Threshold) isActive = true;
							if (index === 1 && progress >= section1Threshold && progress < section2Threshold) isActive = true;
							if (index === 2 && progress >= section2Threshold) isActive = true;

							if (pointElements && image) {
								gsap.to(pointElements, {
									color: isActive ? "white" : grey,
									duration: 0.3,
								});
								gsap.to(image, {
									opacity: isActive ? 1 : 0.3,
									duration: 0.3,
								});
							}
						});
					},
				});
			});
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
				<div className="content-container desktop-view">
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
							{solutionPointsImages.map((data, index) => (
								<img src={`/demo${index + 1}.webp`} alt="" ref={(el) => (imagesRefs.current[index] = el)} width={data.width} height={data.height} className={`demo${index + 0}`} style={{ aspectRatio: data.width / data.height, width: data.width / 10 + "rem", height: data.height / 10 + "rem" }} />
							))}
						</div>
					</div>
				</div>
				<div className="content-container mobile-view ">
					<div className="col content">
						<div className="bar-container">
							<div className="bar" ref={mobileYellowBarRef}></div>
						</div>
						<ul className="points">
							{solutionPoints.map(({ heading, content }, index) => (
								<li className="point" key={heading} ref={(el) => (mobilePointsRefs.current[index] = el)}>
									<div className="point-content">
										<h4>{heading}</h4>
										<p>{content}</p>
									</div>
									<div className="point-img-container">
										<img src={`/demo${index + 1}.webp`} alt="" ref={(el) => (mobileImagesRefs.current[index] = el)} width={solutionPointsImages[index].width} height={solutionPointsImages[index].height} className={`demo${index}`} style={{ width: solutionPointsImages[index].width / 10 + "rem", height: solutionPointsImages[index].height / 10 + "rem" }} />
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
};

export default WhatItSolves;
