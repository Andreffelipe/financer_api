import { MongoDatabaseImplementation } from './mongoDatabaseImplementation';

const query = new MongoDatabaseImplementation();

describe('testando as query do banco', () => {
  test.only('buscando usuário', async () => {
    const result = await query.findByEmail('valid@valid.com');
    expect(result.isLeft()).toBeTruthy();
  });
});
