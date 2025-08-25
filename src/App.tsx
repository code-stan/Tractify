import SmoothScroll from "./components/common/smoothScroll";
import Hero from "./components/hero/Hero";
import HowItWorks from "./components/how-it-works/HowItWorks";
import MoreBenefits from "./components/more-benefits/MoreBenefits";
import Spacer from "./components/spacer/Spacer";
import TalkToSales from "./components/TalkToSales/TalkToSales";
import Testimonials from "./components/Testimonials/Testimonials";
import TrailingAnimation from "./components/trailingAnimation/TrailingAnimation";
import TrustedBy from "./components/TrustedBy/TrustedBy";
import WhatItSolves from "./components/WhatItSolves/WhatItSolves";
import { LenisProvider } from "./context/LenisContext";
import LoaderContext from "./context/LoaderContext";
import useIsMobile from "./hooks/useIsMobile";

function App() {
	const isMobile = useIsMobile();

	if (isMobile) {
		return (
			<div style={{ 
				display: 'flex', 
				alignItems: 'center', 
				justifyContent: 'center', 
				height: '100vh', 
				padding: '20px',
				textAlign: 'center',
				fontSize: '18px'
			}}>
				<div>
					<h2>Desktop Only</h2>
					<p>This application is optimized for desktop viewing. Please access it from a desktop or laptop computer for the best experience.</p>
				</div>
			</div>
		);
	}

	return (
		<>
			<LoaderContext>
				<TrailingAnimation />
				<LenisProvider>
					<SmoothScroll>
						<Hero />
						<HowItWorks />
						<MoreBenefits />
						<WhatItSolves />
						<TalkToSales />
						<TrustedBy />
						<Testimonials />
						<Spacer />
					</SmoothScroll>
				</LenisProvider>
			</LoaderContext>
		</>
	);
}

export default App;
