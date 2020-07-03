import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

class FakeHashProvider implements IHashProvider {
  public async generatedHash(payload: string): Promise<string> {
    return payload;
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return payload === hashed;
  }
}
export default FakeHashProvider;
