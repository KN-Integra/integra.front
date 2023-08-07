import getCurrentUserHandler from '~~/server/utils/v1/auth/getCurrentUser.handler'

export default defineEventHandler(async (event) => {
  const authorizationHeader = getHeader(event, 'Authorization')

  const response = await getCurrentUserHandler(authorizationHeader)

  if (response instanceof Error) {
    throw createError({
      statusCode: response.cause as number,
      statusMessage: JSON.stringify(response.message)
    })
  }

  return response
})
