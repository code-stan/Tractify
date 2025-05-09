"use client"
import { createContext, type ReactNode } from "react";

interface IProps {
	children: ReactNode;
}

const ThemeWrapper = ({ children }: IProps) => {
	const ThemeWrapperProvider = createContext(null);
	return <ThemeWrapperProvider.Provider value={null}>{children}</ThemeWrapperProvider.Provider>;
};

export default ThemeWrapper;
