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
  userID: string;

  @property({
    type: 'string',
    required: true,
  })
  bloodBankID: string;

  @property({
    type: 'string',
    required: true,
  })
  requestFor: string;

  @property({
    type: 'boolean',
    required: true,
  })
  isHospitalize: boolean;

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

  constructor(data?: Partial<Userbloodbankrequest>) {
    super(data);
  }
}

export interface UserbloodbankrequestRelations {
  // describe navigational properties here
}

export type UserbloodbankrequestWithRelations = Userbloodbankrequest &
  UserbloodbankrequestRelations;
