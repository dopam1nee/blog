import { setPostData } from './set-post-data'

export const loadPostAsync = (requestServer, postId) => dispatch =>
	requestServer('fetchPost', postId).then(postData => {
		if (postData.res) {
			// если есть ответ, устанавливаем данные
			dispatch(setPostData(postData.res))
		}

		return postData // возвращаем для обработки данных
	})
