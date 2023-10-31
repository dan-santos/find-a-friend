import { Entity } from 'src/core/entitites/entity';
import { Optional } from 'src/core/types/optional';
import { UniqueEntityID } from 'src/core/entitites/unique-entity-id';
import { WrongTypeError } from 'src/core/errors/custom-errors';
import { isValidCEP, isValidEmail } from 'src/core/utils/validors';

export interface OrganizationProps {
  responsableName: string;
  email: string;
  cep: string;
  phone: string;
  address: string;
  password: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class Organization extends Entity<OrganizationProps> {
  
  static create(props: Optional<OrganizationProps, 'createdAt'>, id?: UniqueEntityID) {

    if (!isValidEmail(props.email)) throw new WrongTypeError('email', 'Email');

    if (!isValidCEP(props.cep)) throw new WrongTypeError('cep', '"NNNNN-NNN format"');

    const organization = new Organization({
      ...props,
      createdAt: props.createdAt ?? new Date(),
    }, id);
    return organization;
  }
}