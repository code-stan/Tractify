import { useGSAP } from "@gsap/react";
import "./style.scss";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CopySplit from "../CopySplit";
import { BREAKPOINT } from "../../utils/constants";

gsap.registerPlugin(ScrollTrigger);

const RightArr = () => (
	<svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M6.15909 10.3679L5.13494 9.35369L8.20242 6.28622H0.75V4.80469H8.20242L5.13494 1.74219L6.15909 0.723011L10.9815 5.54545L6.15909 10.3679Z" fill="white" style={{ fill: "white", fillOpacity: 1 }} />
	</svg>
);

const HowItWorks = () => {
	useGSAP(() => {
		const mm = gsap.matchMedia();
		mm.add(`min-width: ${BREAKPOINT}`, () => {
			ScrollTrigger.create({
				trigger: ".how-it-works",
				start: "top 0%",
				end: "+=150%",
				pin: true,
				pinSpacing: true,
				scrub: true,
				onLeave: () => {
					gsap.set(".how-it-works", { zIndex: "1" });
				},
			});
		});
	});
	return (
		<section className="how-it-works">
			<div className="how-it-works__container">
				<div className="col">
					<div className="left">
						<div className="how-it-works__image-container">
							<img src="/how-it-works-star.svg" width={208} height={208} alt="" />
						</div>
						<CopySplit>
							<h2>40%</h2>
						</CopySplit>
						<CopySplit>
							<p>Of 100% is a lot</p>
						</CopySplit>
					</div>

					<div className="right">
						<small>Lawyers lose 40% of their time</small>
						<ul>
							<li>
								<div></div>
								<span>Manually tracking billable hours</span>
							</li>
							<li>
								<div></div>
								<span>Drafting and organizing legal documents</span>
							</li>
							<li>
								<div></div>
								<span>Managing endless emails & client intake</span>
							</li>
						</ul>
					</div>
				</div>
				<div className="col">
					<div className="left"></div>
					<div className="right right-2">
						<img src="/how-it-works-star2.svg" width={297} height={114} alt="" />

						<p className="description">Tractify eliminates the friction—so you get time back, bill more, and stress less.</p>
						<button className="button">
							See How It Works <RightArr />
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HowItWorks;
