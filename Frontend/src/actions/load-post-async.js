import { request } from '../utils/request'
import { setPostData } from './set-post-data'

export const loadPostAsync = postId => dispatch =>
	request(`/posts/${postId}`).then(postData => {
		if (postData.data) {
			// если есть ответ, устанавливаем данные
			dispatch(setPostData(postData.data))
		}

		return postData // возвращаем для обработки данных
	})
