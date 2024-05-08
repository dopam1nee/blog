import { useEffect, useMemo, useState } from 'react'
import { useServerRequest } from '../../hooks'
import { Pagination, PostCard, Search } from './components'
import { PAGINATION_LIMIT } from '../../constants'
import { getLastPageFromLinks, debounce } from './utils'
import styled from 'styled-components'

const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([])
	const [page, setPage] = useState(1)
	const [lastPage, setLastPage] = useState(1)
	const [searchPhrase, setSearchPhrase] = useState('')
	const [shouldSearch, setShouldSearch] = useState(false)

	const requestServer = useServerRequest()

	useEffect(() => {
		requestServer('fetchPosts', searchPhrase, page, PAGINATION_LIMIT).then(
			({ res: { posts, links } }) => {
				// если ({ res }) вместо ({ res: { posts, links } }), тогда
				setPosts(posts) // res.posts
				setLastPage(getLastPageFromLinks(links || '')) // TODO ''; res.links
			},
		)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [requestServer, page, shouldSearch])

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 1000), [])

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value)
		startDelayedSearch(!shouldSearch)
	}
	// (!shouldSearch) => {
	// clearTimeout(timeoutId)
	// timeoutId = setTimeout(() => setShouldSearch(!shouldSearch), 1000) }

	return (
		<div className={className}>
			<div className="posts-and-search">
				<Search searchPhrase={searchPhrase} onChange={onSearch} />
				{posts.length ? (
					<div className="post-list">
						{posts.map(({ id, title, imageUrl, publishedAt, commentsCount }) => (
							<PostCard
								key={id}
								id={id}
								title={title}
								imageUrl={imageUrl}
								publishedAt={publishedAt}
								commentsCount={commentsCount}
							/>
						))}
					</div>
				) : (
					<div className="no-posts-found">Articles not found</div>
				)}
			</div>
			{lastPage > 1 && (
				<Pagination page={page} lastPage={lastPage} setPage={setPage} />
			)}
			{/* если последняя страница больше 1 (т.е. больше стартовой), то показываем пагинацию */}
		</div>
	)
}

export const Main = styled(MainContainer)`
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	& .post-list {
		display: flex;
		flex-wrap: wrap;
		padding: 20px 20px 80px;
	}

	& .no-posts-found {
		font-size: 18px;
		margin-top: 40px;
		text-align: center;
	}
`
