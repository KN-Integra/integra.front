export default defineEventHandler(async (event) => {
  const context = await auth(event)

  if (!context) {
    return createError({ statusCode: 401, message: 'Unauthorized' })
  }

  return {
    statusCode: 200,
    body: context
  }
})
