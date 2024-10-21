const sanitizeInput = input => {
	let sanitizedInput = input
	// For XSS
	sanitizedInput = sanitizedInput.replace(/<[^>]*>?/gm, '')

	// For SQL injection
	sanitizedInput = sanitizedInput.replace(/'/g, "''")

	return sanitizedInput
}

const sanitizeBodyMiddleware = (req, res, next) => {
	console.log('Sanitize middleware')

	for (const key in req.body) {
		if (req.body.hasOwnProperty(key)) {
			req.body[key] = sanitizeInput(req.body[key])
		}
	}

	next()
}

export default sanitizeBodyMiddleware
