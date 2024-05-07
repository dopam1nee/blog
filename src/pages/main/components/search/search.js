import styled from 'styled-components'
import { Icon, Input } from '../../../../components'

const SearchContainer = ({ className, searchPhrase, onChange }) => {
	return (
		<div className={className}>
			<Input value={searchPhrase} onChange={onChange} placeholder="Search..." />
			<Icon inactive={true} id="fa-search" size="21px" />
		</div>
	)
}

export const Search = styled(SearchContainer)`
	display: flex;
	position: relative;
	width: 340px;
	height: 40px;
	margin: 40px auto 0;

	& > input {
		padding: 10px 33px 10px 10px;
		font-size: 18px;
	}

	& > div {
		position: absolute;
		top: 6px;
		right: 9px;
	}
`
