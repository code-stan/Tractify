import React, { createContext, useContext, useState } from "react";

interface LenisContextProps {
	children: React.ReactNode;
}

interface LenisContextValue {
	lenisMultiplierValue: boolean;
	setLenisMultiplierValue: React.Dispatch<React.SetStateAction<boolean>>;
}

const LenisWrapper = createContext<LenisContextValue | undefined>(undefined);

export const useLenisContext = () => useContext(LenisWrapper);

export const LenisProvider = ({ children }: LenisContextProps) => {
	const [lenisMultiplierValue, setLenisMultiplierValue] = useState<boolean>(false);

	return <LenisWrapper.Provider value={{ lenisMultiplierValue, setLenisMultiplierValue }}>{children}</LenisWrapper.Provider>;
};
