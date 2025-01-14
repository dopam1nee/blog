import { useEffect } from 'react'
import { useStore } from 'react-redux'

export const useResetForm = reset => {
	const store = useStore()

	useEffect(() => {
		let currentWasLogout = store.getState().app.wasLogout // по умолчанию false

		const unsubscribe = store.subscribe(() => {
			let previousWasLogout = currentWasLogout
			currentWasLogout = store.getState().app.wasLogout

			if (currentWasLogout !== previousWasLogout) {
				reset()
			}
		})

		return unsubscribe
	}, [reset, store])
}
