import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Userbloodbankrequest extends Entity {
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
  userId: string;

  @property({
    type: 'string',
    required: true,
  })
  requestDetail: string;

  @property({
    type: 'string',
    required: true,
  })
  firstName: string;

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
  addharCard: number;

  @property({
    type: 'string',
    required: true,
  })
  address: string;

  @property({
    type: 'boolean',
    required: true,
  })
  isHospitalize: boolean;

  @property({
    type: 'string',
    required: true,
  })
  gender: string;

  @property({
    type: 'string',
    required: true,
  })
  giveBy: string;

  @property({
    type: 'string',
    required: true,
  })
  requestBy: string;

  @property({
    type: 'string',
    required: true,
  })
  hospitalId: string;

  @property({
    type: 'string',
    required: true,
  })
  doctorId: string;

  @property({
    type: 'number',
    required: true,
  })
  paidAmount: number;

  @property({
    type: 'number',
    required: true,
  })
  paidStatus: number;

  @property({
    type: 'number',
    required: true,
  })
  statuId: number;

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

  constructor(data?: Partial<Userbloodbankrequest>) {
    super(data);
  }
}

export interface UserbloodbankrequestRelations {
  // describe navigational properties here
}

export type UserbloodbankrequestWithRelations = Userbloodbankrequest & UserbloodbankrequestRelations;
