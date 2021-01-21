import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Url extends Entity {
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
    type: 'string',
    required: true,
  })
  method: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  url: string[];

  @property({
    type: 'string',
    required: true,
  })
  rollid: string;

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

  constructor(data?: Partial<Url>) {
    super(data);
  }
}

export interface UrlRelations {
  // describe navigational properties here
}

export type UrlWithRelations = Url & UrlRelations;
