import { Entity } from 'src/core/entitites/entity';
import { Optional } from 'src/core/types/optional';
import { UniqueEntityID } from 'src/core/entitites/unique-entity-id';

export interface AdoptionProps {
  petId: UniqueEntityID;
  orgId: UniqueEntityID;
  requirements: string[];
  createdAt: Date;
  updatedAt?: Date | null;
}

export class Adoption extends Entity<AdoptionProps> {
  
  static create(props: Optional<AdoptionProps, 'createdAt'>, id?: UniqueEntityID) {

    const adoption = new Adoption({
      ...props,
      createdAt: props.createdAt ?? new Date(),
    }, id);
    return adoption;
  }

  get petId() {
    return this.props.petId;
  }

  get orgId() {
    return this.props.orgId;
  }

  get requirements() {
    return this.props.requirements;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }
}