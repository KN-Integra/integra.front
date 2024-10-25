/**
 * Middleware to respond CORS preflight requests using OPTIONS method.
 */
export default defineEventHandler((event) => {
  // Answers HTTP 204 OK to CORS preflight requests using OPTIONS method :
  // if (event.method === 'OPTIONS' && isPreflightRequest(event)) {
  if (isPreflightRequest(event)) {
    event.node.res.statusCode = 204
    event.node.res.statusMessage = 'No Content'
    return 'OK'
  }
})
