import { MissingParamsError } from '../error/missing_params_error';
import { PasswordParamsError } from '../error/password_params_error';
import { TokenGenerator } from './token_generator';

const token = new TokenGenerator();

describe('testando geração de token', () => {
  test('testando erro de id nao passado', async () => {
    const result = await token.generator('');

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(new MissingParamsError('id'));
  });

  test('testando parâmetros certos', async () => {
    const result = await token.generator('123');
    console.log(result.value);
    expect(result.isRight()).toBeTruthy();

  });

  test('testando erro de falta de parâmetro password', async () => {
    const password = '';
    const hash = 'invalid';
    const result = await token.decoded(password, hash);
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(new MissingParamsError('password'));
  });
  test('testando erro de falta de hash', async () => {
    const password = 'valid';
    const hash = '';
    const result = await token.decoded(password, hash);
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(new MissingParamsError('hash'));
  });
  // test('testando error de senha invalida', async () => {
  //   const password = '123';
  //   const hash = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxMjMiLCJpYXQiOjE2MTY4NTY2OTksImV4cCI6MTYxNjk0MzA5OX0.odDgkdzTE5zGwtMtxuEhBj_w5UPaNAkj23dnEYkefRA';
  //   const result = await token.decoded(password, hash);
  //   expect(result.isLeft()).toBeTruthy();
  //   expect(result.value).toEqual(new PasswordParamsError(password));
  // });
  // test('testando error de senha valida', async () => {
  //   const password = '123';
  //   const hash = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxMjMiLCJpYXQiOjE2MTczMTY5NDUsImV4cCI6MTYxNzMyMDU0NX0.r_BYhfWu5C5IuLPr4ydsomoFJjnOpKqtI2b0n1s9YQc';
  //   const result = await token.decoded(password, hash);
  //   console.log(result);
  //   expect(result.isRight()).toBeTruthy();
  //   expect(result.value).toEqual(true);
  // });
});
