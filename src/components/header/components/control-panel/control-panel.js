import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Icon } from '../../../../components'
import { ROLE } from '../../../../constants'
import { selectUserRole, selectUserLogin } from '../../../../selectors'
import { logout } from '../../../../actions'
import { checkAccess } from '../../../../utils'
import styled from 'styled-components'

const RightAligned = styled.div`
	display: flex;
	justify-content: flex-end;
	alifn-items: center;
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

	const onLogout = () => {
		dispatch(logout())
		sessionStorage.removeItem('userData')
	}

	const isAdmin = checkAccess([ROLE.ADMIN], roleId) // TODO не работает отображение кнопок после обновления страницы

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
						<Icon id="fa-sign-out" margin="0 0 0 10px" onClick={onLogout} />
					</>
				)}
			</RightAligned>
			<RightAligned>
				<Icon id="fa-backward" margin="10px 0 0 0" onClick={() => navigate(-1)} />
				{isAdmin && (
					<>
						<Link to="/post">
							<Icon id="fa-solid fa-file" margin="10px 0 0 16px" />
						</Link>
						<Link to="/users">
							<Icon id="fa-users" margin="10px 0 0 16px" />
						</Link>
					</>
				)}
			</RightAligned>
		</div>
	)
} // у Icon другая логика: она не перенаправляет на другую страницу по адресу, она возвращает на предыдущую. Мы её завернули в div (StyledButton), в котором настроили стили, чтобы повесить обработчик события onClick

export const ControlPanel = styled(ControlPanelContainer)``
