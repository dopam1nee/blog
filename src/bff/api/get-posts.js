import { transformPost } from '../transformers'

export const getPosts = (searchPhrase, page, limit) =>
	// функция стала асинхронной из-за fetch
	fetch(
		`http://localhost:3101/posts?title_like=${searchPhrase}&_page=${page}&_limit=${limit}`,
	)
		.then(loadedPosts =>
			Promise.all([loadedPosts.json(), loadedPosts.headers.get('Link')]),
		)
		.then(([loadedPosts, links]) => ({
			posts: loadedPosts && loadedPosts.map(transformPost),
			links,
		})) // массив постов и ссылок
