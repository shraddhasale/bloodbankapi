import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
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
            exclude: ['id'],
          }),
        },
      },
    })
    bloodbank: Omit<Bloodbank, 'id'>,
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

  @patch('/bloodbank', {
    responses: {
      '200': {
        description: 'Bloodbank PATCH success count',
        content: {'application/json': {schema: CountSchema}},
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

  @get('/bloodbank/{id}', {
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
    @param.path.string('id') id: string,
    @param.filter(Bloodbank, {exclude: 'where'}) filter?: FilterExcludingWhere<Bloodbank>
  ): Promise<Bloodbank> {
    return this.bloodbankRepository.findById(id, filter);
  }

  @patch('/bloodbank/{id}', {
    responses: {
      '204': {
        description: 'Bloodbank PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bloodbank, {partial: true}),
        },
      },
    })
    bloodbank: Bloodbank,
  ): Promise<void> {
    await this.bloodbankRepository.updateById(id, bloodbank);
  }

  @put('/bloodbank/{id}', {
    responses: {
      '204': {
        description: 'Bloodbank PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() bloodbank: Bloodbank,
  ): Promise<void> {
    await this.bloodbankRepository.replaceById(id, bloodbank);
  }

  @del('/bloodbank/{id}', {
    responses: {
      '204': {
        description: 'Bloodbank DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.bloodbankRepository.deleteById(id);
  }
}
