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
  userid: string;

  @property({
    type: 'string',
    required: true,
  })
  requestdetail: string;

  @property({
    type: 'string',
    required: true,
  })
  firstname: string;

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
  addharcardno: number;

  @property({
    type: 'string',
    required: true,
  })
  address: string;

  @property({
    type: 'boolean',
    required: true,
  })
  ishospitalize: boolean;

  @property({
    type: 'string',
    required: true,
  })
  gender: string;

  @property({
    type: 'string',
    required: true,
  })
  giveby: string;

  @property({
    type: 'string',
    required: true,
  })
  requestby: string;

  @property({
    type: 'string',
    required: true,
  })
  hospitalid: string;

  @property({
    type: 'string',
    required: true,
  })
  doctorid: string;

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
