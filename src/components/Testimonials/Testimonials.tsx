// import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Fragment, useRef } from "react";
import TestimonialCard from "./TestimonialCard";
import { testimonialCards } from "./data";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CopySplit from "../CopySplit";

gsap.registerPlugin(ScrollTrigger);

// const positions = [14, 38, 62, 86];
// const rotations = [-15, -7.5, 7.5, 15];

const Testimonials = () => {
	const containerRef = useRef<HTMLElement>(null);
	const testimonialCardsRef = useRef<(HTMLDivElement | null)[]>([]);
	if (!containerRef || !testimonialCardsRef) return;

	// useGSAP(
	// 	() => {
	// 		const cards = testimonialCardsRef.current;
	// 		ScrollTrigger.create({
	// 			trigger: containerRef.current,
	// 			start: "top top",
	// 			end: () => `+=${window.innerHeight * 2}`,
	// 			pin: true,
	// 			markers: true,
	// 		});

	// 		cards.forEach((card, index) => {
	// 			gsap.to(card, {
	// 				left: `${positions[index]}%`,
	// 				rotation: `${rotations[index]}`,
	// 				ease: "none",
	// 				scrollTrigger: {
	// 					trigger: containerRef.current,
	// 					start: "top top",
	// 					end: () => `+=${window.innerHeight}`,
	// 					scrub: 1,
	// 					id: `card-${index}`,
	// 				},
	// 			});
	// 		});
	// 	},
	// 	{ scope: containerRef }
	// );

	return (
		<section className="testimonials" ref={containerRef}>
			<div className="title-container">
				<CopySplit>
					<h2>Testimonials</h2>
				</CopySplit>
			</div>
			<div className="heading-container">
				<CopySplit>
					<h3>
						Trusted by <br />
						forward-thinking lawyers
					</h3>
				</CopySplit>
			</div>
			<div className="cards-container">
				{testimonialCards.map((data, i) => (
					<Fragment key={data.name}>
						<div className="card-container" ref={(el) => (testimonialCardsRef.current[i] = el)}>
							<TestimonialCard {...data} />
						</div>
					</Fragment>
				))}
			</div>
		</section>
	);
};

export default Testimonials;
