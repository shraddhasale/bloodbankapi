import {inject} from '@loopback/core';
import {
  ErrorWriterOptions,
  FindRoute,
  HttpErrors,
  InvokeMethod,
  InvokeMiddleware,
  LogError,
  ParseParams,
  Reject,
  RequestContext,
  RestBindings,
  Send,
  SequenceHandler,
} from '@loopback/rest';
import {applicationContext} from '.';
//jwt token
import {AuthController} from './controllers/auth.controller';
import * as el from './label/error.json';
const SequenceActions = RestBindings.SequenceActions;
//import {applicationContext} from '..';
const moment = require('moment');
const errorLabel: any = el;

export class MySequence implements SequenceHandler {
  /**
   * Optional invoker for registered middleware in a chain.
   * To be injected via SequenceActions.INVOKE_MIDDLEWARE.
   */
  @inject(SequenceActions.INVOKE_MIDDLEWARE, {optional: true})
  protected invokeMiddleware: InvokeMiddleware = () => false;

  constructor(
    @inject(SequenceActions.FIND_ROUTE) protected findRoute: FindRoute,
    @inject(SequenceActions.PARSE_PARAMS) protected parseParams: ParseParams,
    @inject(SequenceActions.INVOKE_METHOD) protected invoke: InvokeMethod,
    @inject(SequenceActions.SEND) public send: Send,
    @inject(SequenceActions.REJECT) public reject: Reject,
    @inject(RestBindings.SequenceActions.LOG_ERROR)
    protected logError: LogError,
    @inject(RestBindings.ERROR_WRITER_OPTIONS, {optional: true})
    protected errorWriterOptions?: ErrorWriterOptions,
  ) {}

  async handle(context: RequestContext) {
    try {
      const {request, response} = context;
      const finished = await this.invokeMiddleware(context);
      if (finished) return;
      const route = this.findRoute(request);
      // jwt auth start here
      //console.log(request.baseUrl)
      //console.log(route.path)
      const authController = await applicationContext.get<AuthController>(
        'controllers.AuthController',
      );
      //  console.log(request.headers.token);
      //console.log(request.path);
      //  console.log(request.method);
      const beforeAUTHTIME = moment();
      //var beforeAUTHTIME = new Date();
      console.log('Before Auth === ' + beforeAUTHTIME);
      await authController.verify(
        request.headers.token,
        request.headers.apikey,
        route.path,
        request.method,
        request.path,
      );
      const afterAUTHTIME = moment();
      //var afterAUTHTIME   = new Date();
      console.log('After Auth === ' + afterAUTHTIME);
      //console.log('Differnce === '+ (afterAUTHTIME - beforeAUTHTIME))
      console.log(
        'Auth start and end Differnce === ' +
          moment.duration(afterAUTHTIME.diff(beforeAUTHTIME)),
      );
      //jwt auth end here

      const args = await this.parseParams(request, route);
      const result = await this.invoke(route, args);
      this.send(response, result);
    } catch (err) {
      //this.reject(context, err);
      this.handleError(context, err as HttpErrors.HttpError);
    }
  }

  /**
   * Handle errors
   * If the request url is `/coffee-shops`, customize the error message.
   */
  handleError(context: RequestContext, err: HttpErrors.HttpError) {
    // 2. customize error for particular endpoint
    //console.log(err.message)
    // if this is a validation error
    if (err.statusCode === 401) {
      let errorData: any = {
        error: {
          statusCode: 401,
          name: err.name,
          message: err.message,
        },
      };

      if (
        errorData &&
        errorData.error &&
        errorData.error.message &&
        errorData.error.message &&
        errorData.error.message.includes('New Token = ')
      ) {
        errorData.error.token = errorData.error.message.replace(
          'New Token = ',
          '',
        );
        errorData.error.message = 'Token Expired';
      }

      context.response.status(401).send(errorData);

      // 4. log the error using RestBindings.SequenceActions.LOG_ERROR
      this.logError(err, err.statusCode, context.request);

      // The error was handled
      return;
    }

    // Otherwise fall back to the default error handler
    this.reject(context, err);
  }
}
