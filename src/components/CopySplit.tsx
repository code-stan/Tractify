import { type ReactNode, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

interface CopySplitProps {
	children: ReactNode;
	animateOnScroll?: boolean;
	delay?: number;
	preserveLayout?: boolean;
}

const CopySplit = ({ children, animateOnScroll = true, delay = 0, preserveLayout = true }: CopySplitProps) => {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const splitInstances = useRef<any[]>([]);
	const resizeTimeout = useRef<number | null>(null);

	const originalLayout = useRef<
		{
			element: HTMLElement;
			parentDisplay: string;
			parentGap: string;
			parentFlexDirection: string;
			display: string;
			margin: string;
			padding: string;
		}[]
	>([]);

	const cleanup = () => {
		splitInstances.current.forEach((split) => split.revert());
		splitInstances.current = [];
		originalLayout.current = [];
		ScrollTrigger.getAll()
			.filter((st) => st.trigger === containerRef.current)
			.forEach((st) => st.kill());
		ScrollTrigger.refresh();
	};

	const initSplit = () => {
		if (!containerRef.current) return;
		cleanup();

		const container = containerRef.current;
		const elements: HTMLElement[] = container.hasAttribute("data-copy-wrapper") ? (Array.from(container.children) as HTMLElement[]) : [container];

		const allLines: HTMLElement[] = [];

		if (preserveLayout) {
			const storeLayout = (el: HTMLElement) => {
				const style = window.getComputedStyle(el);
				const parent = el.parentElement;
				const pStyle = parent ? window.getComputedStyle(parent) : null;
				originalLayout.current.push({
					element: el,
					parentDisplay: pStyle?.display || "",
					parentGap: pStyle?.gap || "",
					parentFlexDirection: pStyle?.flexDirection || "",
					display: style.display,
					margin: style.margin,
					padding: style.padding,
				});
				Array.from(el.children).forEach((child) => {
					if (child instanceof HTMLElement) storeLayout(child);
				});
			};
			elements.forEach(storeLayout);
		}

		elements.forEach((el) => {
			const hasComplex = el.querySelector('ul, ol, [style*="display: flex"], [style*="display: grid"]') !== null;
			const splitOpts: any = { type: "lines", linesClass: "line++" };
			if (!hasComplex || !preserveLayout) splitOpts.mask = "lines";

			const split = new SplitText(el, splitOpts);
			splitInstances.current.push(split);
			allLines.push(...(split.lines as HTMLElement[]));

			// handle textIndent on first line
			const indent = window.getComputedStyle(el).textIndent;
			if (indent && indent !== "0px" && split.lines.length) {
				(split.lines[0] as HTMLElement).style.paddingLeft = indent;
				el.style.textIndent = "0";
			}
		});

		if (preserveLayout) {
			originalLayout.current.forEach((info) => {
				const lineContainer = allLines.find((line) => line.contains(info.element) || info.element.contains(line));
				if (!lineContainer) return;
				// restore parent flex/grid
				if (info.parentDisplay === "flex" || info.parentDisplay === "grid") {
					const parent = info.element.parentElement;
					if (parent) {
						parent.style.display = info.parentDisplay;
						parent.style.gap = info.parentGap;
						if (info.parentFlexDirection) parent.style.flexDirection = info.parentFlexDirection;
					}
				}
				if (info.display === "flex" || info.display === "grid") {
					info.element.style.display = info.display;
				}
				info.element.style.margin = info.margin;
				info.element.style.padding = info.padding;
			});
		}

		gsap.set(container, { opacity: 1 });
			gsap.set(allLines, { y: "115%", rotation: -5, skewX: 20, skewY: 3 });

		const anim = { y: "0%", rotate: 0, duration: 1, skewX: 0, skewY: 0, stagger: 0.1, ease: "power2.out", delay };

		if (animateOnScroll) {
			gsap.to(allLines, {
				...anim,
			});
			const tl = gsap.timeline({
				scrollTrigger: { trigger: container, start: "top 90%", once: true },
			});
			tl.to(allLines, {
				...anim,
			});
			allLines.forEach((line) => {
				const parent = line.parentElement;
				if (parent) {
					tl.to(
						parent,
						{
							overflow: "visible",
							duration: 0.1,
						},
						"<+=0.5"
					);
				}
			});
		} else {
			const tl = gsap.timeline();
			tl.to(allLines, anim);
			allLines.forEach((line) => {
				const parent = line.parentElement;
				if (parent) {
					tl.to(
						parent,
						{
							overflow: "visible",
							duration: 0.1,
						},
						"<+=0.5"
					);
				}
			});
		}
	};

	useLayoutEffect(() => {
		if (document.fonts && document.fonts.ready) {
			document.fonts.ready
				.then(() => {
					initSplit();
				})
				.catch(() => {
					initSplit();
				});
		} else {
			initSplit();
		}

		let lastWidth = window.innerWidth;

		const onResize = () => {
			const currentWidth = window.innerWidth;

			if (currentWidth !== lastWidth) {
				lastWidth = currentWidth;
				if (resizeTimeout.current) clearTimeout(resizeTimeout.current);
				resizeTimeout.current = window.setTimeout(initSplit, 250);
			}
		};
		window.addEventListener("resize", onResize);

		return () => {
			window.removeEventListener("resize", onResize);
			cleanup();
		};
	}, [animateOnScroll, delay, preserveLayout]);
	return (
		<div ref={containerRef} data-copy-wrapper="true">
			{children}
		</div>
	);
};

export default CopySplit;
