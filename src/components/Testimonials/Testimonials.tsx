import { useGSAP } from "@gsap/react";
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

	useGSAP(() => {
		const tl = gsap.timeline({ defaults: { ease: "elastic.inOut(1, 0.7)", duration: 2.5 }, paused: true});
		tl.to(".cards-container", {
			x: 0,
			y: 0,
			opacity: 1
		}).to(
			".card-container",
			{
				opacity: 1,
				x: 0,
				y: 0,
				rotation: 0,
				stagger: {amount: .25},
			},
			"<"
		);
		ScrollTrigger.create({
			trigger: ".testimonials",
			start: "top 100%",
			onEnter() {
				tl.play();
			},
		});
	}, [containerRef]);
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
