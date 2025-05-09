import type { LenisOptions } from '@studio-freight/lenis'

export const scrollOptions: LenisOptions = {
	// duration: 1,
	// easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
	orientation: 'vertical',
	gestureOrientation: 'vertical',
	smoothWheel: true,
	wheelMultiplier: 0.8,
	touchMultiplier: 1,
	infinite: false,
}

export const formatNum = (number: number | string) => {
	if (number === null || number === undefined) return
	return Intl.NumberFormat().format(
		Number(
			number.toLocaleString('en-US', {
				minimumIntegerDigits: 2,
				useGrouping: false,
			}) || '00'
		)
	)
}

export const capitalize = (s: string) =>
	s?.toLocaleLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const yearFunc = (): number =>{
	const date = new Date();
	return date.getFullYear()
}
export const currentYear: number = yearFunc()