import React from 'react'
import styled from 'styled-components'

const Div = styled.div`
	margin: 200px;
	color: white;
	font-size: 50px;
` // вызвали стилизованный компонент с тегом div (функцию объекта styled)

export const App = () => {
	return (
		<Div>
			<i className="fa-solid fa-user"></i>
			<i className="fa-brands fa-github-square"></i>
			<div>hello</div>
		</Div>
	)
}
