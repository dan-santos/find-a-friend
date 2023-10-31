import { ICrypto } from 'src/domain/auth/crypto.interface';
import { compare, hash } from 'bcryptjs';

export class BcryptHasher implements ICrypto {
  async compare(plainText: string, hashedText: string): Promise<boolean> {
    const doesPasswordMatches = await compare(plainText, hashedText);
    return doesPasswordMatches;
  }

  async hash(plainText: string): Promise<string> {
    const hashed = await hash(plainText, 7);
    return hashed;
  }
}