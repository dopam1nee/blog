import { forwardRef } from 'react' // для передачи пропа ref (это необычный проп)
import styled from 'styled-components'

const InputContainer = forwardRef(({ className, width, ...props }, ref) => {
	// принимаем пропсы и необычный проп ref
	return (
		<input
			className={className}
			{...props} // ...props - type="login" placeholder="Login..."
			ref={ref} // передаём этот проп уже как обычный
		/>
	)
})

export const Input = styled(InputContainer)`
	width: ${({ width = '100%' }) => width};
	height: 40px;
	margin: 0 0 10px 0;
	padding: 10px;
	border: 1px solid #000;
	border-radius: 5px;
` // width вытянули из пропсов компонента, который принимает этот width.
