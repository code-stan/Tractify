import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Fragment, useRef } from "react";
import TestimonialCard from "./TestimonialCard";
import { testimonialCards } from "./data";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CopySplit from "../CopySplit";
import { BREAKPOINT } from "../../utils/constants";

gsap.registerPlugin(ScrollTrigger);

// const positions = [14, 38, 62, 86];
// const rotations = [-15, -7.5, 7.5, 15];

const Testimonials = () => {
	const containerRef = useRef<HTMLElement>(null);
	const cardsContainerRef = useRef<HTMLDivElement>(null);
	const testimonialCardsRef = useRef<(HTMLDivElement | null)[]>([]);
	if (!containerRef || !testimonialCardsRef) return;

	useGSAP(() => {
		const mm = gsap.matchMedia();

		// Desktop animation
		mm.add(`(min-width: ${BREAKPOINT + 1}px)`, () => {
			const tl = gsap.timeline({ paused: true });
			tl.to(
				".card-container",
				{
					opacity: 1,
					x: 0,
					y: 0,
					duration: 1.6,
					rotation: 0,
					ease: "expo.out",
					stagger: { amount: 0.4 },
				},
				"<"
			);
			ScrollTrigger.create({
				trigger: ".testimonials",
				markers: true,
				start: "top 65%",
				onEnter() {
					tl.play();
				},
			});
		});

		// Mobile horizontal scroll animation
		mm.add(`(max-width: ${BREAKPOINT}px)`, () => {
			if (!cardsContainerRef.current) return;

			const cards = cardsContainerRef.current.querySelectorAll(".card-container");
			if (cards.length === 0) return;

			// Simple calculation: scroll exactly enough to show all cards
			const totalGap = 3 * 2;
			const cardWidth = 19.1; // rem
			const cardsWidth = 4 * cardWidth;
			// const gap = 2; // remw

			// Total width of all 4 cards + 3 gaps between them
			const totalCardsWidth = cardsWidth + totalGap + 4;

			// Viewport width in rem
			const viewportWidthRem = window.innerWidth / 10;
			const scrollDistance = totalCardsWidth - viewportWidthRem;

			gsap.fromTo(
				cardsContainerRef.current,
				{ x: 0 },
				{
					x: `-${scrollDistance}rem`,
					ease: "none",
					scrollTrigger: {
						trigger: containerRef.current,
						start: "-50% top",
						end: () => `+=${window.innerHeight * 2}`,
						scrub: 1,
						pin: true,
						pinSpacing: true,
					},
				}
			);
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
			<div className="cards-container" ref={cardsContainerRef}>
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
