import { IEncryptPassword } from '../../adapters/interfaces/IEncryptPassword';
import { ITokenGenerator } from '../../adapters/interfaces/ITokenGenerator';
import { IUserRepository } from '../../adapters/interfaces/IUserRepository';
import { ServerError } from '../../utils/error/error';
import { Either, left, right } from '../../utils/shared/monad';
import { DomainError, InvalidEmailError, MissingParamsError, UnauthorizedError, UserNotFoundError } from '../error/domainError';
import { EmailValidator } from '../helpers/emailValidator';

export interface IGetUserUseCase {
  execute(data: Financer.User): Promise<Either<DomainError, Response>>
}
type Response = {
  token: string | DomainError;
  user: Financer.User;
}
type Login = {
  email: string
  password: string
}
export class GetUserUseCase implements IGetUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly encryptPassword: IEncryptPassword,
    private readonly tokenGenerator: ITokenGenerator,
  ) { }
  async execute({ email, password }: Login): Promise<Either<DomainError, Response>> {
    if (!email || !password) {
      return left(new MissingParamsError('mandatory parameters not informed'));
    }
    const emailUser = EmailValidator.validator(email);
    if (!emailUser) {
      return left(new InvalidEmailError('Email is invalid'));
    }
    const result = await this.userRepository.findByEmail(email);
    console.log(result);
    if (result.isLeft()) {
      return left(new UserNotFoundError('User does not exist'));
    }
    if (result.value === null) {
      return left(new UserNotFoundError('User does not exist'));
    }

    const passwordError = await this.encryptPassword.decrypt(result.value.password, password);

    if (passwordError.isLeft()) {
      return left(new ServerError(passwordError.value.message));
    }
    if (!passwordError.value) {
      return left(new UnauthorizedError());
    }
    const token = await this.tokenGenerator.generator(result.value.id);
    if (passwordError.isLeft()) {
      return left(new ServerError('erro'));
    }
    const user = { firstName: result.value.firstName, email: result.value.email, password: result.value.password };
    Reflect.deleteProperty(user, 'password');
    return right({ token: token.value, user });
  }
}
