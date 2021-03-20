import {
  Count,
  CountSchema,

  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, post,




  put,

  requestBody
} from '@loopback/rest';
import * as constants from '../constants.json';
import {Roll} from '../models';
import {RollRepository} from '../repositories';


export class RollController {
  constructor(
    @repository(RollRepository)
    public rollRepository: RollRepository,
  ) { }

  @post('/roll', {
    responses: {
      '200': {
        description: 'Roll model instance',
        content: {'application/json': {schema: getModelSchemaRef(Roll)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Roll, {
            title: 'NewRoll',
            exclude: ['id'],
          }),
        },
      },
    })
    roll: Omit<Roll, 'rollID'>,
  ): Promise<Roll> {
    return this.rollRepository.create(roll);
  }

  @get('/roll/count', {
    responses: {
      '200': {
        description: 'Roll model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Roll) where?: Where<Roll>,
  ): Promise<Count> {
    return this.rollRepository.count(where);
  }

  @get('/roll', {
    responses: {
      '200': {
        description: 'Array of Roll model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Roll, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Roll) filter?: any,
  ): Promise<Roll[]> {

    filter = filter || {};
    const result: any = {};
    const roleData: any = {};
    const relationData: any = {};
    let where: any = {};
    const filterRelation: any = {};
    let count: any = {};

    if (filter && !filter.skip) {
      filter.skip = constants.defaultSkip;
    }

    if (filter && !filter.limit) {
      filter.limit = constants.defaultLIMIT;
    } else if (
      filter &&
      filter.limit &&
      filter.limit > constants.defaultMaxLimit
    ) {
      filter.limit = constants.defaultMaxLimit;
    }
    //console.log(filter.limit)

    if (filter && !filter.offset) {
      filter.offset = constants.defaultOffset;
    }

    if (filter && !filter.order) {
      filter.order = [
        constants.defaultSortkey + ' ' + constants.defaultSortOrder,
      ];
    }

    if (filter && !filter.fields) {
      filter.fields = constants.defaultFieldsForRoll;  //change per controller fields
    }

    if (filter && !filter.where) {
      filter.where = {
        statusID: {inq: [constants.status.Active, constants.status.Inactive]},
      };
      where = filter.where;
    } else {
      //filter.where.statusID = {inq:[constants.status.Active, constants.status.Inactive]};
      where = filter?.where;
    }
    result.data = await this.rollRepository.find(filter);
    count = await this.rollRepository.count(where);
    result.count = count.count;

    return result;
    //  return this.rollRepository.find(filter);
  }
  /*
    @patch('/roll', {
      responses: {
        '200': {
          description: 'Roll PATCH success count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async updateAll(
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(Roll, {partial: true}),
          },
        },
      })
      roll: Roll,
      @param.where(Roll) where?: Where<Roll>,
    ): Promise<Count> {
      return this.rollRepository.updateAll(roll, where);
    }
  */
  @get('/roll/{rollID}', {
    responses: {
      '200': {
        description: 'Roll model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Roll, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findByrollID(
    @param.path.string('rollID') rollID: string,
    @param.filter(Roll, {exclude: 'where'}) filter?: FilterExcludingWhere<Roll>
  ): Promise<Roll> {
    return this.rollRepository.findById(rollID, filter);
  }
  /*
    @patch('/roll/{rollID}', {
      responses: {

        '204': {
          description: 'Roll PATCH success',
        },
      },
    })
    async updateByrollID(
      @param.path.string('rollID') rollrollID: string,
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(Roll, {partial: true}),
          },
        },
      })
      roll: Roll,
    ): Promise<vorollID> {
      await this.rollRepository.updateByID(id, rollID);
    }
  */
  @put('/roll/{rollID}', {
    responses: {
      '204': {
        description: 'Roll PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('rollID') rollrollID: string,
    @requestBody() roll: Roll,
  ): Promise<void> {
    await this.rollRepository.replaceById(rollrollID, roll);
  }

  @del('/roll/{rollID}', {
    responses: {
      '204': {
        description: 'Roll DELETE success',
      },
    },
  })
  async deleteBy(@param.path.string('rollID') rollrollID: string): Promise<void> {
    await this.rollRepository.deleteById(rollrollID);
  }
}
