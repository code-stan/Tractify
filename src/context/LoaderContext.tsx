import { createContext, useEffect, useState } from "react";

const LoaderContext = ({ children }: { children: React.ReactNode }) => {
	const Loader = createContext(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 900);
	}, []);

	return <Loader.Provider value={null}>{isLoading ? <div className="bg-cover"></div> : <>{children}</>}</Loader.Provider>;
};
export default LoaderContext;
