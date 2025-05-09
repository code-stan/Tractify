import SmoothScroll from "./components/common/smoothScroll";
import Hero from "./components/hero/Hero";
import LoaderContext from "./context/LoaderContext";

function App() {

	return (
		<>
			<LoaderContext>
				<SmoothScroll>
					<Hero />
				</SmoothScroll>
			</LoaderContext>
		</>
	);
}

export default App;
