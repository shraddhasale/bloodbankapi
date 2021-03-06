import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Userbloodbankdonate extends Entity {
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
  bloodBankID: string;

  @property({
    type: 'string',
    required: true,
  })
  userID: string;

  @property({
    type: 'string',
    required: true,
  })
  requestFor: string;

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

  constructor(data?: Partial<Userbloodbankdonate>) {
    super(data);
  }
}

export interface UserbloodbankdonateRelations {
  // describe navigational properties here
}

export type UserbloodbankdonateWithRelations = Userbloodbankdonate &
  UserbloodbankdonateRelations;
