import { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMatch, useParams } from 'react-router-dom'
import { PostContent, Comments, PostForm } from './components'
import { RESET_POST_DATA, loadPostAsync } from '../../actions'
import { useServerRequest } from '../../hooks'
import { selectPost } from '../../selectors'
import { Error, PrivateContent } from '../../components'
import { ROLE } from '../../constants'
import styled from 'styled-components'

const PostContainer = ({ className }) => {
	const [error, setError] = useState(null) // ИЗМЕНЕНО по умолчанию устанавливаем ошибку (true), чтобы не выводились комментарии без поста. true не выводится в разметку, поэтому ошибку на странице не увидим. Затем сделаем запрос на сервер, и если ответ будет успешным, то устанавливаем false (увидим разметку), иначе - выводим ошибку
	const [isLoading, setIsLoading] = useState(true)

	const dispatch = useDispatch()
	const params = useParams()
	const isCreating = !!useMatch('/post') // вместо объекта - true / false
	const isEditing = !!useMatch('/post/:id/edit') // вместо объекта - true / false
	const requestServer = useServerRequest()
	const post = useSelector(selectPost)

	useLayoutEffect(() => {
		dispatch(RESET_POST_DATA)
	}, [dispatch, isCreating])

	useEffect(() => {
		if (isCreating) {
			setIsLoading(false)
			return
		}

		dispatch(loadPostAsync(requestServer, params.id)).then(postData => {
			setError(postData.error)
			setIsLoading(false)
		})
	}, [dispatch, requestServer, params.id, isCreating])

	if (isLoading) return null

	const SpecificPostPage =
		isCreating || isEditing ? (
			<PrivateContent access={[ROLE.ADMIN]}>
				<div className={className}>
					<PostForm post={post} />
				</div>
			</PrivateContent>
		) : (
			<div className={className}>
				<PostContent post={post} />
				<Comments comments={post.comments} postId={post.id} />
			</div>
		)

	return error ? <Error error={error} /> : SpecificPostPage
}

export const Post = styled(PostContainer)`
	margin: 40px 0;
	padding: 0 80px;
`
