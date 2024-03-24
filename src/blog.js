import React from 'react'
import { Route, Routes } from 'react-router-dom'
import styled from 'styled-components'

const Content = styled.div`
	padding: 120px 0;
` // вызвали стилизованный компонент с тегом div (функцию объекта styled)
const H2 = styled.h2`
	text-align: center;
`

export const Header = () => <div>Header</div>
export const Footer = () => <div>Footer</div>

export const Blog = () => {
	return (
		<>
			<Header />
			<Content>
				<H2>Content</H2>
				<Routes>
					<Route path="/" element={<div>Main</div>} />
					<Route path="/login" element={<div>Login</div>} />
					<Route path="/register" element={<div>Register</div>} />
					<Route path="/users" element={<div>Users</div>} />
					<Route path="/post" element={<div>New post</div>} />
					<Route path="/post/:postId" element={<div>Post</div>} />
					<Route path="*" element={<div>Error</div>} />
				</Routes>
			</Content>
			<Footer />
		</>
	)
}
