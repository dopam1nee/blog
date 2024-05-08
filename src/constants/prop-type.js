import PropTypes from 'prop-types'
import { ROLE } from './role'

const ROLE_ID = PropTypes.oneOf(Object.values(ROLE)) // 0, 1, 2...

export const PROP_TYPE = {
	ROLE_ID,
	ROLE: PropTypes.shape({
		id: ROLE_ID,
		name: PropTypes.string.isRequired,
	}),
	ERROR: PropTypes.oneOfType([PropTypes.string, PropTypes.exact(null)]), // exact - должно быть точно равно указанному значению (null)
	COMMENT: PropTypes.shape({
		// объект с определённой структурой (id, author...)
		id: PropTypes.number.isRequired,
		author: PropTypes.string.isRequired,
		content: PropTypes.string.isRequired,
		publishedAt: PropTypes.string.isRequired,
	}),
	POST: PropTypes.shape({
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		imageUrl: PropTypes.string.isRequired,
		content: PropTypes.string.isRequired,
		publishedAt: PropTypes.string.isRequired,
	}),
}
