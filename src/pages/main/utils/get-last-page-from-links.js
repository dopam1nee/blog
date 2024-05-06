export const getLastPageFromLinks = links => {
	const result = links.match(/_page=(\d{1,4})&_limit=\d{1,3}>; rel="last"/)

	return Number(result[1])
	// [0] - вся строка, [1] - первая скобочная группа (\d[1,4])
}
