import {
  Count,
  CountSchema,
  Filter,
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
import {Bloodbank} from '../models';
import {BloodbankRepository} from '../repositories';

export class BloodbankController {
  constructor(
    @repository(BloodbankRepository)
    public bloodbankRepository : BloodbankRepository,
  ) {}

  @post('/bloodbank', {
    responses: {
      '200': {
        description: 'Bloodbank model instance',
        content: {'application/json': {schema: getModelSchemaRef(Bloodbank)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bloodbank, {
            title: 'NewBloodbank',
            exclude: ['bloodbankID'],
          }),
        },
      },
    })
    bloodbank: Omit<Bloodbank, 'bloodbankID'>,
  ): Promise<Bloodbank> {
    return this.bloodbankRepository.create(bloodbank);
  }

  @get('/bloodbank/count', {
    responses: {
      '200': {
        description: 'Bloodbank model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Bloodbank) where?: Where<Bloodbank>,
  ): Promise<Count> {
    return this.bloodbankRepository.count(where);
  }

  @get('/bloodbank', {
    responses: {
      '200': {
        description: 'Array of Bloodbank model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Bloodbank, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Bloodbank) filter?: Filter<Bloodbank>,
  ): Promise<Bloodbank[]> {
    return this.bloodbankRepository.find(filter);
  }
/*
  @patch('/bloodbank', {
    responses: {
      '200': {
        description: 'Bloodbank PATCH success count',
        content: {'application/json': {schema: CountSchema},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bloodbank, {partial: true}),
        },
      },
    })
    bloodbank: Bloodbank,
    @param.where(Bloodbank) where?: Where<Bloodbank>,
  ): Promise<Count> {
    return this.bloodbankRepository.updateAll(bloodbank, where);
  }
*/
  @get('/bloodbank/{bloodbankID}', {
    responses: {
      '200': {
        description: 'Bloodbank model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Bloodbank, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('bloodbankID') bloodbankID: string,
    @param.filter(Bloodbank, {exclude: 'where'}) filter?: FilterExcludingWhere<Bloodbank>
  ): Promise<Bloodbank> {
    return this.bloodbankRepository.findById(bloodbankID, filter);
  }
/*
  @patch('/bloodbank/{bloodbankID}', {
    responses: {
      '204': {
        description: 'Bloodbank PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('bloodbankID') bloodbankID: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bloodbank, {partial: true}),
        },
      },
    })
    bloodbank: Bloodbank,
  ): Promise<void> {
    await this.bloodbankRepository.updateById(bloodbankID, bloodbank);
  }
*/
  @put('/bloodbank/{bloodbankID}', {
    responses: {
      '204': {
        description: 'Bloodbank PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('bloodbankID') bloodbankID: string,
    @requestBody() bloodbank: Bloodbank,
  ): Promise<void> {
    await this.bloodbankRepository.replaceById(bloodbankID, bloodbank);
  }

  @del('/bloodbank/{bloodbankID}', {
    responses: {
      '204': {
        description: 'Bloodbank DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('bloodbankID') bloodbankID: string): Promise<void> {
    await this.bloodbankRepository.deleteById(bloodbankID);
  }
}
