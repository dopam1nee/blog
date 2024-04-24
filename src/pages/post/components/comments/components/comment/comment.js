import { useDispatch } from 'react-redux'
import { Icon } from '../../../../../../components'
import styled from 'styled-components'
import { useServerRequest } from '../../../../../../hooks'
import {
	CLOSE_MODAL,
	openModal,
	removeCommentAsync,
} from '../../../../../../actions'

const CommentContainer = ({
	className,
	id,
	postId,
	author,
	content,
	publishedAt,
}) => {
	const dispatch = useDispatch()
	const requestServer = useServerRequest()

	const onCommentRemove = id => {
		dispatch(
			openModal({
				text: 'Delete the comment?',
				onConfirm: () => {
					dispatch(removeCommentAsync(requestServer, postId, id))
					dispatch(CLOSE_MODAL)
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		)
	}

	return (
		<div className={className}>
			<div className="comment">
				<div className="information-panel">
					<div className="author">
						<Icon
							className="button"
							id="fa-solid fa-circle-user"
							margin="0"
							size="18px"
							onClick={() => {}}
						/>
						{author}
					</div>
					<div className="published-at">
						<Icon
							className="button1"
							id="fa-solid fa-calendar"
							margin="0 0 0 10px"
							size="18px"
							onClick={() => {}}
						/>
						{publishedAt}
					</div>
				</div>
				<div className="comment-text">{content}</div>
			</div>
			<Icon
				className="button2"
				id="fa-solid fa-trash"
				margin="0 0 0 10px"
				size="21px"
				onClick={() => onCommentRemove(id)}
			/>
		</div>
	)
}

export const Comment = styled(CommentContainer)`
	display: flex;
	margin-top: 10px;

	& .comment {
		width: 550px;
		padding: 5px 10px;
		border: 1px solid #000;
	}

	& .information-panel {
		display: flex;
		justify-content: space-between;
	}

	& .author {
		display: flex;
	}

	& .published-at {
		display: flex;
	}

	& .button {
		background-color: #666;
		width: 20px;
		height: 20px;
	}

	& .button1 {
		background-color: #999;
		width: 20px;
		height: 20px;
	}

	& .button2 {
		background-color: #abc378;
		width: 20px;
		height: 20px;
	}
`
