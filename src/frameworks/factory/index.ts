import { MailtrapMailProvider } from '../provider/mailerProvider';
import { CreateUserUseCase } from '../../domain/use_case/CreateUserUseCase';
import { UserController } from '../../adapters/controllers/UserController';
import { EncryptPassword } from '../../utils/shared/encrypt';
import { GetUserUseCase } from '../../domain/use_case/GetUserUseCase';
import { TokenGenerator } from '../../utils/token/token_generator';
import { SequelizeUserDatabaseImplementation } from '../repository/sequelizeRepsitory/sequelizeUserDatabaseImplementation';

const mailtrapMailProvider = new MailtrapMailProvider();
const databaseImplementation = new SequelizeUserDatabaseImplementation();
const encryptPassword = new EncryptPassword();
const tokenGenerator = new TokenGenerator();

const registerUserUseCase = new CreateUserUseCase(databaseImplementation, mailtrapMailProvider, encryptPassword);
const loginUserUseCase = new GetUserUseCase(databaseImplementation, encryptPassword, tokenGenerator);

const userController = new UserController();

export { loginUserUseCase, registerUserUseCase, userController };
