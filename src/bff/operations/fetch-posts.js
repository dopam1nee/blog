import { getComments, getPosts } from '../api'
import { getCommentsCount } from '../utils'

export const fetchPosts = async (searchPhrase, page, limit) => {
	const [{ posts, links }, comments] = await Promise.all([
		getPosts(searchPhrase, page, limit),
		getComments(),
	]) // деструктуризировали массив с постами и комментами, и затем деструктуризировали массив с постами и ссылками

	return {
		error: null,
		res: {
			posts: posts.map(post => ({
				...post,
				commentsCount: getCommentsCount(comments, post.id),
			})),
			links,
		},
	}
}

// Получили массив данных
// Array [ {...}, [...] ]

// Деструктуризировали массив с объектами, и получили объект и массив
// Object { posts: [], links: 'http...' } Array [ {...} {...} {...} ]

// Деструктуризировали объект с постами и ссылками, и получили массив объектов с постами и ссылку
// Array [ {...} {...} {...} {...} {...} {...} {...} {...} {...} ] 'http...'
