import { useGSAP } from "@gsap/react";
import CopySplit from "../CopySplit";
import Nav from "../nav/Nav";
import "./style.scss";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
gsap.registerEffect({
	name: "heroImageAnimation",
	effect: (targets: HTMLElement, config: Record<string, string>) => {
		return gsap.to(targets, {
			y: 0,
			rotateX: 0,
			scale: 1,
			duration: config.duration || 1.5,
			ease: "power2.out",
		});
	},
});
const Hero = () => {
	useGSAP(() => {
		const animation = gsap.to(".hero-image img", {
			yPercent: -75,
			rotateX: 0,
			scale: 1,
			duration: 1.5,
			ease: "power1.out",
			filter: "blur(0px) brightness(1)",
		});
		ScrollTrigger.create({
			trigger: ".hero-image__container",
			start: "top 30%",
			end: "+=150%",
			animation,
			pin: true,
			pinSpacing: false,
			scrub: true,
			id: "hero-image-pin",
		});
	});
	return (
		<section className="hero">
			<Nav />
			<div className="hero__container">
				<div className="hero__container-wrapper">
					<CopySplit delay={0.3}>
						<img className="stars-img" src="/hero-stars.svg" alt="" width={289} height={528} />
						<h1>
							Streamline <br /> your workflow and manage your time.
						</h1>
					</CopySplit>
					<div className="hero__container-content">
						<CopySplit delay={0.45}>
							<p>Tractify automates the busywork, organizes your cases, and helps you bill more (without working more).</p>
							<p>It’s fast. Simple. Invisible. Just how good tech should be.</p>
						</CopySplit>
						<CopySplit delay={0.65}>
							<div className="btn-container">
								<button>
									<div>
										<img src="./orb-icon.svg" alt="" width={25} height={25} />
										Get started
									</div>
									<img src="./yellow-right-arr.svg" alt="" width={11} height={11} />
								</button>
							</div>
						</CopySplit>
					</div>
				</div>
				<div className="hero-image__container">
					<div className="hero-image">
						<img src="./hero-image.webp" alt="" width={1171} height={732} />
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
