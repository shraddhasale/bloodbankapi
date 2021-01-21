import {Entity, model, property} from '@loopback/repository';

@model()
export class Apikey extends Entity {
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
  statusId: number;

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


  constructor(data?: Partial<Apikey>) {
    super(data);
  }
}

export interface ApikeyRelations {
  // describe navigational properties here
}

export type ApikeyWithRelations = Apikey & ApikeyRelations;
