export const sessions = {
	list: {}, // сессии пользователей
	create(user) {
		// создание сессии
		const hash = Math.random().toFixed(50) // создали хеш

		this.list[hash] = user // добавили хеш в список

		return hash // вернули хеш
	},
	remove(hash) {
		// выход из сессии
		delete this.list[hash]
	},
}
