import { H2, Icon } from '../../../../components'
import styled from 'styled-components'

const PostContentContainer = ({
	className,
	post: { id, title, imageUrl, content, publishedAt },
}) => {
	// <PostContent post={post} />
	return (
		<div className={className}>
			<img src={imageUrl} alt={title} />
			<H2>{title}</H2>
			<div className="special-panel">
				<div className="published-at">
					<Icon
						id="fa-solid fa-calendar"
						size="18px"
						margin="0 7px 0 0"
						onClick={() => {}}
					/>
					{publishedAt}
				</div>
				<div className="buttons">
					<Icon
						id="fa-solid fa-pencil"
						size="21px"
						margin="0 10px 0 0"
						onClick={() => {}}
					/>
					<Icon id="fa-solid fa-trash" size="21px" onClick={() => {}} />
				</div>
			</div>
			<div className="post-text">{content}</div>
		</div>
	)
}

export const PostContent = styled(PostContentContainer)`
	& img {
		float: left;
		margin: 0 20px 10px 0;
	}

	& .special-panel {
		display: flex;
		justify-content: space-between;
		margin: -20px 0 20px;
	}

	& .published-at {
		display: flex;
		font-size: 18px;
	}

	& i {
		position: relative;
		top: -1px;
	}

	& .buttons {
		display: flex;
	}

	& .post-text {
		font-size: 18px;
	}
`
