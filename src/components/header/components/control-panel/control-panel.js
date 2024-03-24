import { Link, useNavigate } from 'react-router-dom'
import { Icon } from '../../../../components'
import styled from 'styled-components'

const RightAligned = styled.div`
	display: flex;
	justify-content: flex-end;
`

const StyledLink = styled(Link)`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 18px;
	width: 100px;
	height: 32px;
	border-radius: 5px;
	background-color: #eee;
`
const StyledButton = styled.div`
	&:hover {
		cursor: pointer;
	}
`

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate()

	return (
		<div className={className}>
			<RightAligned>
				<StyledLink to="/login">Log in</StyledLink>
			</RightAligned>
			<RightAligned>
				<StyledButton onClick={() => navigate(-1)}>
					<Icon id="fa-backward" margin="10px 0 0 0" />
				</StyledButton>
				<Link to="/post">
					<Icon id="fa-solid fa-file" margin="10px 0 0 13px" />
				</Link>
				<Link to="/users">
					<Icon id="fa-users" margin="10px 0 0 13px" />
				</Link>
			</RightAligned>
		</div>
	)
} // у Icon другая логика: она не перенаправляет на другую страницу по адресу, она возвращает на предыдущую. Мы её завернули в div (StyledButton), в котором настроили стили, чтобы повесить обработчик события onClick

export const ControlPanel = styled(ControlPanelContainer)``
