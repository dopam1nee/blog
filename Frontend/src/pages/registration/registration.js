import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { AuthFormError, Button, Input, H2 } from '../../components'
import { useResetForm } from '../../hooks'
import { setUser } from '../../actions'
import { selectUserRole } from '../../selectors'
import styled from 'styled-components'
import { ROLE } from '../../constants'
import { request } from '../../utils/request'

const regFormSchema = yup.object().shape({
	// валидация
	login: yup
		.string()
		.required('Fill in the login field') // обязательно заполнить
		.matches(/^\w+$/, 'Invalid user name. Only letters and numbers are allowed')
		.min(3, 'Invalid user name. Minimum of 3 characters')
		.max(15, 'Invalid user name. Maximum of 15 characters'),
	password: yup
		.string()
		.required('Fill in the password field') // обязательно заполнить
		.matches(
			/^[\w#$%]+$/,
			'Invalid password. Only letters, numbers and signs are allowed: # $ %',
		)
		.min(6, 'Invalid password. Minimum of 6 characters')
		.max(30, 'Invalid password. Maximum of 30 characters'),
	passcheck: yup
		.string()
		.required('Fill in repeat the password field')
		.oneOf(
			[yup.ref('password'), null],
			'This password does not match the specified one',
		), // должен соответствовать тому, что ввели в password
})

const RegistrationContainer = ({ className }) => {
	const {
		register, // функция от useForm
		reset, // сброс формы
		handleSubmit, // обработка подтверждения формы
		formState: { errors }, // отсюда достаём текст об ошибке
	} = useForm({
		defaultValues: {
			// значения по умолчанию
			login: '',
			password: '',
			passcheck: '',
		},
		resolver: yupResolver(regFormSchema), // подключили валидацию
	})

	const [serverError, setServerError] = useState(null)

	const dispatch = useDispatch()

	const roleId = useSelector(selectUserRole)

	useResetForm(reset)

	const onSubmit = ({ login, password }) => {
		// поля name (register)
		request('/register', 'POST', { login, password }).then(({ error, user }) => {
			if (error) {
				setServerError(`Request error: ${error}`)
				return // если есть ошибка, прерываем работу кода
			}

			dispatch(setUser(user))
			sessionStorage.setItem('userData', JSON.stringify(user))
		})
	}

	const formError =
		errors?.login?.message || errors?.password?.message || errors?.passcheck?.message // ошибка в логине или пароле
	const errorMessage = formError || serverError // ошибка из всех возможных (+ ошибка с сервера)

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />
	}

	return (
		<div className={className}>
			<H2>Registration</H2>
			<form
				onSubmit={handleSubmit(onSubmit)} // повесили обработчик события, который обернули функцией для валидации
			>
				<Input
					type="text"
					placeholder="Login..."
					{...register('login', {
						onChange: () => setServerError(null),
					})} // пропсы из хука useForm передаются благодаря register. 'login' вместо атрибута name="login", также useForm передаёт сюда ref на элемент
				/>
				<Input
					type="password"
					placeholder="Password..."
					{...register('password', {
						onChange: () => setServerError(null),
					})}
				/>
				<Input
					type="password"
					placeholder="Repeat the password..."
					{...register('passcheck', {
						onChange: () => setServerError(null),
					})}
				/>
				<Button
					type="submit"
					disabled={!!formError} // явное преобразование переменной в boolean значение. Блокируем кнопку, если есть ошибка в заполнении формы
				>
					Sign up
				</Button>
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
				{/* если есть ошибка, то выводим разметку с текстом ошибки */}
			</form>
		</div>
	)
}

export const Registration = styled(RegistrationContainer)`
	display: flex;
	align-items: center;
	flex-direction: column;

	& > form {
		display: flex;
		flex-direction: column;
		width: 260px;
	}
` // стили для тега form в этом компоненте
