import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Hospital extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  location: string;

  @property({
    type: 'string',
    required: true,
  })
  country: string;

  @property({
    type: 'string',
    required: true,
  })
  state: string;

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
    type: 'number',
    required: true,
  })
  capacity: number;

  @property({
    type: 'number',
    required: true,
  })
  phoneNumber: number;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'number',
    required: true,
  })
  hospitalRegisterno: number;

  @property({
    type: 'string',
    required: true,
  })
  hospitalLobo: string;

  @property({
    type: 'string',
    required: true,
  })
  ownerName: string;

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

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Hospital>) {
    super(data);
  }
}

export interface HospitalRelations {
  // describe navigational properties here
}

export type HospitalWithRelations = Hospital & HospitalRelations;
