import loginHandler, { ILoginPayload } from '~~/server/utils/v1/auth/login.handler'

export default defineEventHandler(async (event) => {
  const { email, password } = (await readBody(event)) as ILoginPayload

  const response = await loginHandler({ email, password })

  if (response instanceof Error) {
    throw createError({
      statusCode: response.cause as number,
      statusMessage: JSON.stringify(response.message)
    })
  }

  return response
})
