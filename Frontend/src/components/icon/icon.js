import PropTypes from 'prop-types'
import styled from 'styled-components'

const IconContainer = (
	{ className, id, inactive, ...props }, // className - font-size, margin-right...
) => (
	<div className={className} {...props}>
		<i className={`fa ${id}`} aria-hidden="true"></i>
	</div>
)

export const Icon = styled(IconContainer)`
	font-size: ${({ size = '24px' }) => size};
	margin: ${({ margin = '0' }) => margin};
	color: ${({ disabled }) => (disabled ? '#ccc' : '#000')};

	&:hover {
		cursor: ${({ inactive }) => (inactive ? 'default' : 'pointer')};
	}
` // функция всегда принимает все пропсы, которые передают в контейнер

Icon.propTypes = {
	id: PropTypes.string.isRequired,
	inactive: PropTypes.bool,
}
