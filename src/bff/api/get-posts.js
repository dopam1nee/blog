import { transformPost } from '../transformers'

export const getPosts = () =>
	// функция стала асинхронной из-за fetch
	fetch('http://localhost:3101/posts')
		.then(loadedPosts => loadedPosts.json())
		.then(loadedPosts => loadedPosts && loadedPosts.map(transformPost)) // массив постов
