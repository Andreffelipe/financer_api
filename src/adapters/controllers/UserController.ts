import { UnauthorizedError } from '../../domain/error/domainError';
import { loginUserUseCase, registerUserUseCase } from '../../frameworks/factory';
import { HttpRequest, HttpResponse } from './helpers/http';
import { badRequest, ok, serverError, unauthorized } from './helpers/httpHelpers';

export class UserController {
  async register(request: HttpRequest): Promise<HttpResponse> {
    const data = { firstName: request.body.firstName, email: request.body.email, password: request.body.password };
    const result = await registerUserUseCase.execute(data);
    if (result.isLeft()) {
      return badRequest(result.value.message);
    }
    if (result.isRight()) {
      return ok(result.value);
    }
    return serverError('internal');
  }
  async login(request: HttpRequest): Promise<HttpResponse> {
    const data = { email: request.body.email, password: request.body.password };
    const result = await loginUserUseCase.execute(data);
    if (result.isLeft()) {
      if (result.value == new UnauthorizedError()) {
        return unauthorized(result.value.message);
      }
      return badRequest(result.value.message);
    }
    if (result.isRight()) {
      return ok(result.value);
    }
    return serverError('internal');
  }
}
