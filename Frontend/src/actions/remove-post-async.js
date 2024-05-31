import { request } from '../utils/request'

export const removePostAsync = id => () => request(`/posts/${id}`, 'DELETE')

//import { setPostData } from './set-post-data'

//export const removePostAsync = (requestServer, id) => dispatch => {
//	requestServer('removePost', id).then(postData => {
//		dispatch(setPostData(postData.res))
//	})
//}
