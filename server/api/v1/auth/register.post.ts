import registerHandler, { IRegisterPayload } from '~~/server/utils/v1/auth/register.handler'

export default defineEventHandler(async (event) => {
  const { email, password, full_name: fullName } = (await readBody(event)) as IRegisterPayload

  const response = await registerHandler({ email, password, full_name: fullName })

  if (response instanceof Error) {
    throw createError({
      statusCode: response.cause as number,
      statusMessage: JSON.stringify(response.message)
    })
  }

  return response
})
