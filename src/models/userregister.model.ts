import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Userregister extends Entity {
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
  firstname: string;

  @property({
    type: 'string',
    required: true,
  })
  lastname: string;

  @property({
    type: 'string',
    required: true,
  })
  address: string;

  @property({
    type: 'string',
    required: true,
  })
  country: string;

  @property({
    type: 'string',
    required: true,
  })
  city: string;

  @property({
    type: 'number',
    required: true,
  })
  pincode: number;

  @property({
    type: 'string',
    required: true,
  })
  landmark: string;

  @property({
    type: 'string',
    required: true,
  })
  state: string;

  @property({
    type: 'string',
    required: true,
  })
  location: string;

  @property({
    type: 'string',
    required: true,
  })
  username: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
    required: true,
  })
  bloodgroup: string;

  @property({
    type: 'date',
    required: true,
  })
  lastdonatedate: string;

  @property({
    type: 'boolean',
    required: true,
  })
  isemailverfied: boolean;

  @property({
    type: 'string',
    required: true,
  })
  hash: string;

  @property({
    type: 'string',
    required: true,
  })
  gender: string;

  @property({
    type: 'number',
    required: true,
  })
  dateofbrth: number;

  @property({
    type: 'number',
    required: true,
  })
  pancardno: number;

  @property({
    type: 'number',
    required: true,
  })
  addharcardno: number;

  @property({
    type: 'string',
    required: true,
  })
  nationality: string;

  @property({
    type: 'number',
    required: true,
  })
  statusAT: number;

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

  constructor(data?: Partial<Userregister>) {
    super(data);
  }
}

export interface UserregisterRelations {
  // describe navigational properties here
}

export type UserregisterWithRelations = Userregister & UserregisterRelations;
