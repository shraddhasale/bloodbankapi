import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Bloodbank extends Entity {
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
  phoneNumber: string;

  @property({
    type: 'string',
    required: true,
  })
  firstName: string;

  @property({
    type: 'string',
    required: true,
  })
  lastName: string;

  @property({
    type: 'object',
    required: true,
  })
  address: object;

  @property({
    type: 'string',
    required: true,
  })
  thumbnail: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

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

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Bloodbank>) {
    super(data);
  }
}

export interface BloodbankRelations {
  // describe navigational properties here
}

export type BloodbankWithRelations = Bloodbank & BloodbankRelations;
