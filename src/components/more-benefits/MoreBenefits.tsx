import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import "./style.scss";
// import { BREAKPOINT } from "../../utils/constants";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CopySplit from "../CopySplit";
import { RightArr } from "../how-it-works/HowItWorks";

gsap.registerPlugin(ScrollTrigger);
const MoreBenefits = () => {
	const container = useRef<HTMLElement>(null);
	useGSAP(
		() => {
			if (!container.current) return;

			// const mm = gsap.matchMedia();

			// mm.add(`(min-width: ${BREAKPOINT}px)`, () => {
			const element = container.current?.querySelector(".image-container") as HTMLDivElement;
			if (!element) return;

			const image = element.querySelector("img");
			if (!image) return;

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: element,
					scrub: true,
					pin: false,
				},
			});

			tl.from(image, {
				scaleY: 1.1,
				transformOrigin: "50% 50%",
				yPercent: -40,
				ease: "none",
			}).to(image, {
				transformOrigin: "50% 50%",
				scaleY: 1.08,
				yPercent: 30,
				ease: "none",
			});
			// });
		},
		{ scope: container }
	);

	return (
		<section className="more-benefits" ref={container}>
			<div className="col image-container">
				<img src="/man-in-suit.webp" alt="A lawyer" width={676} height={794} />
			</div>
			<div className="col content-container">
				{/* .col-content */}
				<div className="star-container">
					<img src="/how-it-works-star2.svg" width={297} height={114} alt="" />
				</div>

				<CopySplit>
					<h2>
						Work Smarter. <br />
						Bill More.
					</h2>
				</CopySplit>
				<CopySplit>
					<p>Tractify automates your legal practice so you can spend more time lawyering, less time adminning. It’s simple, fast, and built for the modern law firm.</p>
				</CopySplit>
				<CopySplit>
					<button>
						<div>
							<img src="./orb-icon.svg" alt="" width={25} height={25} />
							Get started
						</div>
						<RightArr />
					</button>
				</CopySplit>
			</div>
		</section>
	);
};

export default MoreBenefits;
