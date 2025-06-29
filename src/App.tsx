import SmoothScroll from "./components/common/smoothScroll";
import Hero from "./components/hero/Hero";
import TrailingAnimation from "./components/trailingAnimation/TrailingAnimation";
import LoaderContext from "./context/LoaderContext";

function App() {

	return (
		<>
			<LoaderContext>
				<SmoothScroll>
					<TrailingAnimation />
					<Hero />
				</SmoothScroll>
			</LoaderContext>
		</>
	);
}

export default App;
