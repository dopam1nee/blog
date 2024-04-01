import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Icon } from '../../../../components'
import styled from 'styled-components'
import { ROLE } from '../../../../constants'
import {
	selectUserRole,
	selectUserLogin,
	selectUserSession,
} from '../../../../selectors'
import { logout } from '../../../../actions'

const RightAligned = styled.div`
	display: flex;
	justify-content: flex-end;
	alifn-items: center;
`
const StyledIcon = styled.div`
	&:hover {
		cursor: pointer;
	}
`
const UserName = styled.div`
	display: flex;
	align-items: center;
	font-size: 18px;
	font-weight: bold;
`

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const roleId = useSelector(selectUserRole)
	const login = useSelector(selectUserLogin)
	const session = useSelector(selectUserSession)

	return (
		<div className={className}>
			<RightAligned>
				{roleId === ROLE.GUEST ? (
					<Button>
						<Link to="/login">Log in</Link>
					</Button>
				) : (
					<>
						<UserName>{login}</UserName>
						<StyledIcon>
							<Icon
								id="fa-solid fa-right-from-bracket"
								margin="0 0 0 10px"
								onClick={() => dispatch(logout(session))}
							/>
						</StyledIcon>
					</>
				)}
			</RightAligned>
			<RightAligned>
				<StyledIcon onClick={() => navigate(-1)}>
					<Icon id="fa-backward" margin="10px 0 0 0" />
				</StyledIcon>
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
