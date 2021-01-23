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
  bloodbankid: string;

  @property({
    type: 'string',
    required: true,
  })
  userid: string;

  @property({
    type: 'number',
    required: true,
  })
  paidamount: number;

  @property({
    type: 'number',
    required: true,
  })
  paidstatus: number;

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

export type UserbloodbankdonateWithRelations = Userbloodbankdonate & UserbloodbankdonateRelations;
