export const removePostAsync = (requestServer, id) => () =>
	requestServer('removePost', id)

//import { setPostData } from './set-post-data'

//export const removePostAsync = (requestServer, id) => dispatch => {
//	requestServer('removePost', id).then(postData => {
//		dispatch(setPostData(postData.res))
//	})
//}
