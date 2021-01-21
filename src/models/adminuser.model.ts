import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Adminuser extends Entity {
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
  first: string;

  @property({
    type: 'string',
    required: true,
  })
  lastname: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  rollid: string[];

  @property({
    type: 'number',
    required: true,
  })
  contactno: number;

  @property({
    type: 'string',
    required: true,
  })
  emailid: string;

  @property({
    type: 'number',
    required: true,
  })
  statusid: number;

  @property({
    type: 'date',
    required: true,
  })
  createdAt: string;

  @property({
    type: 'date',
    required: true,
  })
  upadatedAt: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Adminuser>) {
    super(data);
  }
}

export interface AdminuserRelations {
  // describe navigational properties here
}

export type AdminuserWithRelations = Adminuser & AdminuserRelations;
