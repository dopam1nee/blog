import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Header, Footer } from './components'
import { Authorization } from './pages'
import styled from 'styled-components'

const AppColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 1000px;
	min-height: 100%;
	margin: 0 auto;
	background-color: #fff;
`
const Content = styled.div`
	padding: 120px 0;
` // вызвали стилизованный компонент с тегом div (функцию объекта styled)

export const Blog = () => {
	return (
		<AppColumn>
			<Header />
			<Content>
				<Routes>
					<Route path="/" element={<div>Main</div>} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<div>Register</div>} />
					<Route path="/users" element={<div>Users</div>} />
					<Route path="/post" element={<div>New post</div>} />
					<Route path="/post/:postId" element={<div>Post</div>} />
					<Route path="*" element={<div>Error</div>} />
				</Routes>
			</Content>
			<Footer />
		</AppColumn>
	)
}
