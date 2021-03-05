import 'source-map-support/register'
import { parseUserId } from '../../auth/utils'
import { createLogger } from '../../utils/logger'
import { getAllTodos } from '../../businessLogic/Todos'
    
const logger = createLogger('getTodos')

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // TODO: Get all TODO items for a current user
  logger.info('Processing event: ', event)

  const authorization = event.headers.Authorization
  const split = authorization.split(' ')
  const jwtToken = split[1]
  const userId = parseUserId(jwtToken)

  const result = await getAllTodos(userId)
  logger.info('Todos are quired', {
    result : result
  })

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      items: result
    })
  }
}
