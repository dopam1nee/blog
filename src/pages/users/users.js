import { useEffect, useState } from 'react'
import { H2, PrivateContent } from '../../components'
import { TableRow, UserRow } from './components'
import { ROLE } from '../../constants'
import { checkAccess } from '../../utils'
import { useSelector } from 'react-redux'
import { selectUserRole } from '../../selectors'
import styled from 'styled-components'
import { request } from '../../utils/request'

const UsersContainer = ({ className }) => {
	const [users, setUsers] = useState([])
	const [roles, setRoles] = useState([])
	const [errorMessage, setErrorMessage] = useState(null)
	const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false)

	const userRole = useSelector(selectUserRole)

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], userRole)) return

		Promise.all([request('/users'), request('/users/roles')]).then(
			([userRes, rolesRes]) => {
				if (userRes.error || rolesRes.error) {
					setErrorMessage(userRes.error || rolesRes.error)
					return
				}

				setUsers(userRes.data)
				setRoles(rolesRes.data)
			},
		)
	}, [shouldUpdateUserList, userRole]) // не будет вызываться повторно, пока не изменится пользователь

	const onUserRemove = userId => {
		if (!checkAccess([ROLE.ADMIN], userRole)) return

		request(`/users/${userId}`, 'DELETE').then(() => {
			setShouldUpdateUserList(!shouldUpdateUserList)
		})
	}

	return (
		<PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}>
			<div className={className}>
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
			</div>
		</PrivateContent>
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
