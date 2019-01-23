export const LAST_FIVE_YEARS = 5;

export const getCurrentYear = () => new Date().getFullYear();

export const getLastYears = numberOfYears => {
	const currentYear = getCurrentYear();
	return Array.from({ length: numberOfYears }, (item, i) => currentYear - i);
};
