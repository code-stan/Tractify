import SmoothScroll from "./components/common/smoothScroll";
import Hero from "./components/hero/Hero";
import HowItWorks from "./components/how-it-works/HowItWorks";
import TrailingAnimation from "./components/trailingAnimation/TrailingAnimation";
import { LenisProvider } from "./context/LenisContext";
import LoaderContext from "./context/LoaderContext";

function App() {
	return (
		<>
			<LoaderContext>
				<TrailingAnimation />
				<LenisProvider>
					<SmoothScroll>
						<Hero />
						<HowItWorks />
					</SmoothScroll>
				</LenisProvider>
			</LoaderContext>
		</>
	);
}

export default App;
