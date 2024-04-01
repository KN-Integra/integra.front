import type { NuxtError } from '@nuxt/types'

interface HashPayload {
  data: string
}

export default defineEventHandler(async (event): Promise<string | NuxtError> => {
  const body = (await readBody(event)) as Partial<HashPayload>

  if (!body.data) {
    return createError({
      statusCode: 400,
      message: 'Data is required'
    })
  }

  const h = await hash(body.data)

  return h
})
