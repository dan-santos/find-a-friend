import { InvalidCredentialsError } from 'src/core/errors/custom-errors';
import { Organization } from '../entities/organization';
import { IOrganizationRepository } from '../repositories/organization.repository';
import { ICrypto } from '../auth/crypto.interface';

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
  organization: Organization;
}

export class AuthenticateUseCase {
  constructor(
    private organizationsRepository: IOrganizationRepository,
    private cryptoService: ICrypto
  ){}

  async execute({ email, password }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const organization = await this.organizationsRepository.findByEmail(email);

    if (!organization) throw new InvalidCredentialsError();

    const doesPasswordMatches = await this.cryptoService.compare(password, organization.password);

    if (!doesPasswordMatches) throw new InvalidCredentialsError();

    return {
      organization,
    };
  }
}