import * as childProcess from 'child_process'

// @ts-ignore TS7016: Could not find a declaration file for module 'proper-url-join'
import urlJoin from 'proper-url-join'

interface ApiGatewayOptions {
  region: string
  restApiId: string
  resourceId: string
  httpMethod: string
  url: string
  path: string
  stageName: string
  profile?: string
}

const apiGatewayService = {
  putIntegration: ({
    region,
    restApiId,
    resourceId,
    httpMethod,
    url,
    path,
    profile
  }: {
    region?: string
    restApiId?: string
    resourceId?: string
    httpMethod?: string
    url?: string
    path?: string
    profile?: string
  }): string => {
    if (!region) throw new Error('API Gateway region is required')
    if (!restApiId) throw new Error('API Gateway restApiId is required')
    if (!resourceId) throw new Error('API Gateway resourceId is required')
    if (!httpMethod) throw new Error('API Gateway httpMethod is required')
    if (!url) throw new Error('API Gateway url is required')
    if (!path) throw new Error('API Gateway path is required')

    const apiGatewayOptions: ApiGatewayOptions = {
      region,
      restApiId,
      resourceId,
      httpMethod,
      url,
      path,
      stageName: 'prod'
    }

    if (profile) Object.assign(apiGatewayOptions, { profile })

    // コマンドラインオプション - AWS Command Line Interface
    // https://docs.aws.amazon.com/ja_jp/cli/latest/userguide/cli-configure-options.html
    const putIntegrationCommandArray = [
      'aws apigateway put-integration',
      '--type HTTP_PROXY',
      `--region ${apiGatewayOptions.region}`,
      `--rest-api-id ${apiGatewayOptions.restApiId}`,
      `--resource-id ${apiGatewayOptions.resourceId}`,
      `--http-method ${apiGatewayOptions.httpMethod}`,
      `--integration-http-method ${apiGatewayOptions.httpMethod}`,
      `--uri ${urlJoin(apiGatewayOptions.url, apiGatewayOptions.path)}`
    ]

    if (apiGatewayOptions.profile) {
      putIntegrationCommandArray.push(`--profile ${apiGatewayOptions.profile}`)
    }

    childProcess.execSync(putIntegrationCommandArray.join(' '))

    const createDeploymentCommandArray = [
      'aws apigateway create-deployment',
      `--region ${apiGatewayOptions.region}`,
      `--rest-api-id ${apiGatewayOptions.restApiId}`,
      `--stage-name ${apiGatewayOptions.stageName}`
    ]

    if (apiGatewayOptions.profile) {
      createDeploymentCommandArray.push(
        `--profile ${apiGatewayOptions.profile}`
      )
    }

    childProcess.execSync(createDeploymentCommandArray.join(' '))

    return urlJoin(
      `https://${apiGatewayOptions.restApiId}.execute-api.ap-northeast-1.amazonaws.com`,
      apiGatewayOptions.stageName,
      apiGatewayOptions.path
    )
  }
}

export default apiGatewayService
