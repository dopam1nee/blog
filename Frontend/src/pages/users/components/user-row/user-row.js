import PropTypes from 'prop-types'
import { useState } from 'react'
import { Icon } from '../../../../components'
import { TableRow } from '../table-row/table-row' // импортируем так, а не через components, потому что в index.js (components) также реэкспортируется UserRow, то есть здесь файл будет импортировать самого себя, из-за чего приложение может возникнуть циклическся зависимость, то есть приложение может зависнуть
import { PROP_TYPE } from '../../../../constants'
import styled from 'styled-components'
import { request } from '../../../../utils/request'

const UserRowContainer = ({
	className,
	id,
	login,
	registeredAt,
	roleId: userRoleId,
	roles,
	onUserRemove,
}) => {
	const [initialRoleId, setInitialRoleId] = useState(userRoleId)
	const [selectedRoleId, setSelectedRoleId] = useState(userRoleId)

	const onRoleChange = ({ target }) => {
		setSelectedRoleId(Number(target.value))
	}

	const onRoleSave = (userId, newUserRoleId) => {
		request(`/users/${userId}`, 'PATCH', { roleId: newUserRoleId }).then(() => {
			setInitialRoleId(newUserRoleId)
		})
	}

	const isSaveButtonDisabled = selectedRoleId === initialRoleId

	return (
		<div className={className}>
			<TableRow border={true}>
				<div className="login-column">{login}</div>
				<div className="registered-at-column">{registeredAt}</div>
				<div className="role-column">
					<select value={selectedRoleId} onChange={onRoleChange}>
						{roles.map(({ id: roleId, name: roleName }) => (
							<option key={roleId} value={roleId}>
								{roleName}
							</option>
						))}
					</select>

					<Icon
						id="fa-floppy-o"
						margin="0 0 0 10px"
						disabled={isSaveButtonDisabled}
						inactive={isSaveButtonDisabled}
						onClick={() => onRoleSave(id, selectedRoleId)}
					/>
				</div>
			</TableRow>
			<Icon id="fa-solid fa-trash" margin="0 0 0 10px" onClick={onUserRemove} />
		</div>
	)
}

export const UserRow = styled(UserRowContainer)`
	display: flex;
	margin-top: 10px;

	& select {
		font-size: 16px;
	}
`

UserRow.propTypes = {
	id: PropTypes.string.isRequired,
	login: PropTypes.string.isRequired,
	registeredAt: PropTypes.string.isRequired,
	roleId: PROP_TYPE.ROLE_ID.isRequired,
	roles: PropTypes.arrayOf(PROP_TYPE.ROLE).isRequired,
	onUserRemove: PropTypes.func.isRequired,
}
