import { useDispatch, useSelector } from 'react-redux'
import { CLOSE_MODAL, openModal, removePostAsync } from '../../../../actions'
import { useServerRequest } from '../../../../hooks'
import { Icon } from '../../../../components'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { checkAccess } from '../../../../utils'
import { ROLE } from '../../../../constants'
import { selectUserRole } from '../../../../selectors'

const SpecialPanelContainer = ({ className, id, publishedAt, editButton }) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const requestServer = useServerRequest()
	const userRole = useSelector(selectUserRole)

	const onPostRemove = id => {
		dispatch(
			openModal({
				text: 'Delete the post?',
				onConfirm: () => {
					dispatch(removePostAsync(requestServer, id)).then(() => {
						navigate('/')
					})
					dispatch(CLOSE_MODAL)
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		)
	}

	const isAdmin = checkAccess([ROLE.ADMIN], userRole)

	return (
		<div className={className}>
			<div className="published-at">
				{publishedAt && (
					<Icon
						inactive={true}
						id="fa-solid fa-calendar"
						margin="0 7px 0 0"
						size="18px"
					/>
				)}
				{publishedAt}
			</div>
			{isAdmin && (
				<div className="buttons">
					{editButton}
					{publishedAt && (
						<Icon
							id="fa-solid fa-trash"
							size="21px"
							margin="0 0 0 7px"
							onClick={() => onPostRemove(id)}
						/>
					)}
				</div>
			)}
		</div>
	)
}

export const SpecialPanel = styled(SpecialPanelContainer)`
	display: flex;
	justify-content: space-between;
	margin: ${({ margin }) => margin};

	& .published-at {
		display: flex;
		font-size: 18px;
	}

	& .buttons {
		display: flex;
	}

	& i {
		position: relative;
		top: -1px;
	}
`
