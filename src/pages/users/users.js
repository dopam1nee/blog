import { useEffect, useState } from 'react'
import { H2, Content } from '../../components'
import { useServerRequest } from '../../hooks/use-server-request'
import { TableRow, UserRow } from './components'
import styled from 'styled-components'
import { ROLE } from '../../constants'

const UsersContainer = ({ className }) => {
	const [users, setUsers] = useState([])
	const [roles, setRoles] = useState([])
	const [errorMessage, setErrorMessage] = useState(null)
	const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false)

	const requestServer = useServerRequest() // всегда будет с одной и той же ссылкой для одного и того же пользователя

	useEffect(() => {
		Promise.all([requestServer('fetchUsers'), requestServer('fetchRoles')]).then(
			([userRes, rolesRes]) => {
				if (userRes.error || rolesRes.error) {
					setErrorMessage(userRes.error || rolesRes.error)
					return
				}

				setUsers(userRes.res)
				setRoles(rolesRes.res)
			},
		)
	}, [requestServer, shouldUpdateUserList]) // не будет вызываться повторно, пока не изменится пользователь

	const onUserRemove = userId => {
		requestServer('removeUser', userId).then(() => {
			setShouldUpdateUserList(!shouldUpdateUserList)
		})
	}

	return (
		<div className={className}>
			<Content error={errorMessage}>
				<H2>Users</H2>
				<div>
					<TableRow>
						<div className="login-column">Login</div>
						<div className="registered-at-column">Registered at</div>
						<div className="role-column">Role</div>
					</TableRow>
					{users.map(({ id, login, registeredAt, roleId }) => (
						<UserRow
							key={id}
							id={id}
							login={login}
							registeredAt={registeredAt}
							roleId={roleId}
							roles={roles.filter(({ id: roleId }) => roleId !== ROLE.GUEST)}
							onUserRemove={() => onUserRemove(id)}
						/>
					))}
				</div>
			</Content>
		</div>
	)
}

export const Users = styled(UsersContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0 auto;
	width: 570px;
	font-size: 18px;
`
