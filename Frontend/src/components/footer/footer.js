import { useEffect, useState } from 'react'
import styled from 'styled-components'

const FooterContainer = ({ className }) => {
	const [city, setCity] = useState('')
	const [temperature, setTemperature] = useState('')
	const [weather, setWeather] = useState('')

	useEffect(() => {
		fetch(
			'https://api.openweathermap.org/data/2.5/weather?q=Kaliningrad&units=metric&lang=en&appid=a858a73adc4dc6d0bf83cafda4f22818',
		)
			.then(res => res.json())
			.then(({ name, main, weather }) => {
				setCity(name)
				setTemperature(Math.round(main.temp))
				setWeather(weather[0].description)
			})
	})

	return (
		<div className={className}>
			<div>
				<div>Blog wed developer</div>
				<div>wed@developer.com</div>
			</div>
			<div>
				<div>
					{city},{' '}
					{new Date().toLocaleDateString('en', { day: 'numeric', month: 'long' })}
				</div>
				<div>
					{temperature}˚, {weather}
				</div>
			</div>
		</div>
	)
}

export const Footer = styled(FooterContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 1000px;
	height: 120px;
	padding: 20px 40px;
	font-weight: bold;
	background-color: #fff;
	box-shadow: 0 3px 15px #000;
`
