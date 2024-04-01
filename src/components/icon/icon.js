import styled from 'styled-components'

const IconContainer = (
	{ className, id, ...props }, // className - font-size, margin-right...
) => (
	<div className={className} {...props}>
		<i className={`fa ${id}`} aria-hidden="true"></i>
	</div>
)

export const Icon = styled(IconContainer)`
	font-size: ${({ size = '24px' }) => size};
	margin: ${({ margin = '0' }) => margin};
` // функция всегда принимает все пропсы, которые передают в контейнер
