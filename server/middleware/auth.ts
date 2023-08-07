import jwt from 'jsonwebtoken'

export default defineEventHandler((event) => {
  const authorizationHeader = getHeader(event, 'Authorization')
  const { PRIVATE_KEY } = process.env

  if (!PRIVATE_KEY) {
    throw createError({
      statusCode: 500,
      statusMessage: 'internal server error'
    })
  }

  if (!event.path.startsWith('/api/v1')) {
    return
  }

  if (event.path.endsWith('/login') || event.path.endsWith('/register') || event.path.endsWith('/activate')) {
    return
  }

  if (!authorizationHeader) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }

  try {
    jwt.verify(authorizationHeader, process.env.PRIVATE_KEY as string)
  } catch {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }
})
