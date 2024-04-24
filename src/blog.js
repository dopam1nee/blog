import React, { useLayoutEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Header, Footer, Modal } from './components'
import { Authorization, Registration, Users, Post } from './pages'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { setUser } from './actions'

const AppColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 1000px;
	min-height: 100%;
	margin: 0 auto;
	background-color: #fff;
`
const Page = styled.div`
	padding: 120px 0 20px;
` // вызвали стилизованный компонент с тегом div (функцию объекта styled)

export const Blog = () => {
	const dispatch = useDispatch()

	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData')

		if (!currentUserDataJSON) return // если пользователя нет, то ничего не делаем

		const currentUserData = JSON.parse(currentUserDataJSON)

		dispatch(
			setUser({
				...currentUserData,
				roleId: Number(currentUserData), // важно, чтобы значение roleId было числом, а не строкой, в которую преобразует sessionStorage (метод браузера)
			}),
		)
	}, [dispatch]) // отличие от useEffect в том, что useEffect вызывается только после отрисовки разметки, а useLayoutEffect вызывается до отрисовки, то есть выполняет действие до рендера страницы

	return (
		<AppColumn>
			<Header />
			<Page>
				<Routes>
					<Route path="/" element={<div>Main</div>} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/users" element={<Users />} />
					<Route path="/post" element={<div>New post</div>} />
					<Route path="/post/:id" element={<Post />} />
					<Route path="*" element={<div>Error</div>} />
				</Routes>
			</Page>
			<Footer />
			<Modal />
		</AppColumn>
	)
}
