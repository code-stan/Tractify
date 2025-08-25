import { useState, useEffect } from 'react';
import { BREAKPOINT } from '../utils/constants';

const useIsMobile = () => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkIsMobile = () => {
			setIsMobile(window.innerWidth <= BREAKPOINT);
		};

		checkIsMobile();
		window.addEventListener('resize', checkIsMobile);

		return () => window.removeEventListener('resize', checkIsMobile);
	}, []);

	return isMobile;
};

export default useIsMobile;