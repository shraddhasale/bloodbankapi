import {Entity, model, property} from '@loopback/repository';

@model()
export class Roll extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    required: true,
  })
  statusID: number;

  @property({
    type: 'date',
    required: true,
  })
  createdAt: string;

  @property({
    type: 'date',
    required: true,
  })
  updatedAt: string;


  constructor(data?: Partial<Roll>) {
    super(data);
  }
}

export interface RollRelations {
  // describe navigational properties here
}

export type RollWithRelations = Roll & RollRelations;
