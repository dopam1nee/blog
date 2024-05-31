export const debounce = (fn, delay) => {
	let timeoutId

	return (...args) => {
		clearTimeout(timeoutId)
		timeoutId = setTimeout(fn, delay, ...args) // функция, задержка, аргументы для fn
		//timeoutId = setTimeout(() => fn(...args), delay) // идентичная запись
	}
}
