import { Link } from 'react-router-dom'
import { Icon } from '../../../../components'
import styled from 'styled-components'

const LargeText = styled.div`
	font-size: 48px;
	font-weight: bold;
	line-height: 48px;
	margin-top: 2px;
`
const SmallText = styled.div`
	font-size: 18px;
	font-weight: bold;
`

const LogoContainer = ({ className }) => (
	<Link className={className} to="/">
		<Icon id="fa-code" size="65px" margin="0 10px 0 0" />
		<div>
			<LargeText>Blog</LargeText>
			<SmallText>Web developer</SmallText>
		</div>
	</Link>
)

export const Logo = styled(LogoContainer)`
	display: flex;
`
