import { useEffect, useMemo, useState } from 'react'
import { Pagination, PostCard, Search } from './components'
import { PAGINATION_LIMIT } from '../../constants'
import { debounce } from './utils'
import styled from 'styled-components'
import { request } from '../../utils/request'

const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([])
	const [page, setPage] = useState(1)
	const [lastPage, setLastPage] = useState(1)
	const [searchPhrase, setSearchPhrase] = useState('')
	const [shouldSearch, setShouldSearch] = useState(false)

	useEffect(() => {
		request(
			`/posts?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`,
		).then(({ data: { posts, lastPage } }) => {
			// если ({ res }) вместо ({ res: { posts, links } }), тогда
			setPosts(posts) // res.posts
			setLastPage(lastPage) // TODO ''; res.links
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, shouldSearch])

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
						{posts.map(({ id, title, imageUrl, publishedAt, comments }) => (
							<PostCard
								key={id}
								id={id}
								title={title}
								imageUrl={imageUrl}
								publishedAt={publishedAt}
								commentsCount={comments.length}
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
