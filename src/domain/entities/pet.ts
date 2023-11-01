import { Entity } from 'src/core/entitites/entity';
import { Optional } from 'src/core/types/optional';
import { UniqueEntityID } from 'src/core/entitites/unique-entity-id';

export interface PetProps {
  orgId: UniqueEntityID;
  name: string;
  description: string;
  age: number;
  size: 'Pequeno' | 'Mediano' | 'Grande';
  energy: 'Muito baixa' | 'Baixa' | 'Mediana' | 'Alta' | 'Muita alta';
  independency: 'Baixo' | 'Moderado' | 'Alto';
  environment: 'Pequeno' | 'Mediano' | 'Grande';
  photosIds: string[];
  createdAt: Date;
  updatedAt?: Date;
}

export class Pet extends Entity<PetProps> {
  
  static create(props: Optional<PetProps, 'createdAt' | 'photosIds'>, id?: UniqueEntityID) {
    const pet = new Pet({
      ...props,
      createdAt: props.createdAt ?? new Date(),
      photosIds: props.photosIds ?? [],
    }, id);
    return pet;
  }

  get orgId() {
    return this.props.orgId;
  }

  get name() {
    return this.props.name;
  }
}