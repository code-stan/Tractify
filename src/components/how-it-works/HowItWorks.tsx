import { useGSAP } from "@gsap/react";
import "./style.scss";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CopySplit from "../CopySplit";

gsap.registerPlugin(ScrollTrigger);

const StarImage = ``;

const HowItWorks = () => {
	useGSAP(() => {
		ScrollTrigger.create({
			trigger: ".how-it-works",
			start: "top 0%",
			end: "+=150%",
			pin: true,
			scrub: true,
			markers: true,
			onLeave: () => {
				gsap.set(".how-it-works", { zIndex: "1" });
			},
		});
	});
	return (
		<section className="how-it-works">
			<div className="how-it-works__container">
				<div className="col">
					<div className="left">
						<div className="how-it-works__image-container">{StarImage}</div>
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
								<span></span>Manually tracking billable hours
							</li>
							<li>
								<span></span>Drafting and organizing legal documents
							</li>
							<li>
								<span></span>Managing endless emails & client intake
							</li>
						</ul>
					</div>
				</div>
				<div className="col">
					<div className="left"></div>
					<div className="right">
						<p className="description">Tractify eliminates the friction—so you get time back, bill more, and stress less.</p>
						<button className="button">
							See How It Works <img src="/little-right-arrow.svg" width={14} height={10} />
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HowItWorks;
