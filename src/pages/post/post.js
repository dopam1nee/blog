import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { PostContent, Comments } from './components'
import { useServerRequest } from '../../hooks'
import { loadPostAsync } from '../../actions/load-post-async'
import { selectPost } from '../../selectors'
import styled from 'styled-components'

const PostContainer = ({ className }) => {
	const dispatch = useDispatch()
	const requestServer = useServerRequest()
	const params = useParams()
	const post = useSelector(selectPost)

	useEffect(() => {
		dispatch(loadPostAsync(requestServer, params.id))
	}, [dispatch, requestServer, params.id])

	return (
		<div className={className}>
			<PostContent post={post} />
			<Comments comments={post.comments} postId={post.id} />
		</div>
	)
}

export const Post = styled(PostContainer)`
	margin: 40px 0;
	padding: 0 80px;
`
