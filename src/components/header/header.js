import { ControlPanel, Logo } from './components'
import styled from 'styled-components'

const Description = styled.div`
	margin-top: 10px;
`

const HeaderContainer = ({ className }) => (
	// принимаем класс стиля, который приходит нам из-за стилизации styled
	<header className={className}>
		<Logo />
		<Description>
			Web technologies
			<br />
			Writing code
			<br />
			Error analysis
		</Description>
		<ControlPanel />
	</header>
)

export const Header = styled(HeaderContainer)`
	display: flex;
	justify-content: space-between;
	position: fixed;
	top: 0;
	width: 1000px;
	height: 120px;
	padding: 20px 40px;
	background-color: #fff;
	box-shadow: 0 -3px 15px #000;
	z-index: 10;
` // стилизуем шапку

//const Header = () => ()
//const StyledHeader = () => ()
