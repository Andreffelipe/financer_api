import { IEncryptPassword } from '../../adapters/interfaces/IEncryptPassword';
import { IMailProvider } from '../../adapters/interfaces/ImailProviders';
import { IUserRepository } from '../../adapters/interfaces/IUserRepository';
import { ServerError } from '../../utils/error/error';
import { Either, left, right } from '../../utils/shared/monad';
import { User } from '../entities/user_entitie';
import { DomainError, InvalidEmailError, MissingParamsError } from '../error/domainError';
import { EmailValidator } from '../helpers/emailValidator';
export interface ICreateUserUseCase {
  execute(data: Financer.User): Promise<Either<DomainError, string | Financer.User>>
}
export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly mailProvider: IMailProvider,
    private readonly encryptPassword: IEncryptPassword,
  ) { }
  async execute(data: Financer.User): Promise<Either<DomainError, Financer.User>> {
    if (!data.firstName || !data.email || !data.password) {
      return left(new MissingParamsError('mandatory parameters not informed'));
    }
    const email = EmailValidator.validator(data.email);
    if (!email) {
      return left(new InvalidEmailError('Email is invalid'));
    }
    const hashedPassword = await this.encryptPassword.encrypt(data.password);
    if (hashedPassword.isLeft()) {
      return left(new ServerError('error internal'));
    }
    const user = new User({ firstName: data.firstName, email: data.email, password: hashedPassword.value });
    const result = await this.userRepository.save(user);
    if (result.isLeft()) {
      return left(new ServerError(result.value.message));
    }
    if (result.value === null) {
      return left(new ServerError('falha ao salvar usuário'));
    }
    await this.mailProvider.sendMail({
      to: {
        name: data.firstName,
        email: data.email,
      },
      from: {
        name: 'Equipe do Meu App',
        email: 'equipe@meuapp.com',
      },
      subject: 'Seja bem-vindo à plataforma',
      body: '<p>Você já pode fazer login em nossa plataforma.</p>'
    });
    return right(result.value);
  }
}
