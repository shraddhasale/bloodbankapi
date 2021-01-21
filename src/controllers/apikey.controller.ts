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
import {Apikey} from '../models';
import {ApikeyRepository} from '../repositories';

export class ApikeyController {
  constructor(
    @repository(ApikeyRepository)
    public apikeyRepository : ApikeyRepository,
  ) {}

  @post('/apikey', {
    responses: {
      '200': {
        description: 'Apikey model instance',
        content: {'application/json': {schema: getModelSchemaRef(Apikey)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Apikey, {
            title: 'NewApikey',
            exclude: ['id'],
          }),
        },
      },
    })
    apikey: Omit<Apikey, 'id'>,
  ): Promise<Apikey> {
    return this.apikeyRepository.create(apikey);
  }

  @get('/apikey/count', {
    responses: {
      '200': {
        description: 'Apikey model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Apikey) where?: Where<Apikey>,
  ): Promise<Count> {
    return this.apikeyRepository.count(where);
  }

  @get('/apikey', {
    responses: {
      '200': {
        description: 'Array of Apikey model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Apikey, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Apikey) filter?: Filter<Apikey>,
  ): Promise<Apikey[]> {
    return this.apikeyRepository.find(filter);
  }

  @patch('/apikey', {
    responses: {
      '200': {
        description: 'Apikey PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Apikey, {partial: true}),
        },
      },
    })
    apikey: Apikey,
    @param.where(Apikey) where?: Where<Apikey>,
  ): Promise<Count> {
    return this.apikeyRepository.updateAll(apikey, where);
  }

  @get('/apikey/{id}', {
    responses: {
      '200': {
        description: 'Apikey model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Apikey, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Apikey, {exclude: 'where'}) filter?: FilterExcludingWhere<Apikey>
  ): Promise<Apikey> {
    return this.apikeyRepository.findById(id, filter);
  }

  @patch('/apikey/{id}', {
    responses: {
      '204': {
        description: 'Apikey PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Apikey, {partial: true}),
        },
      },
    })
    apikey: Apikey,
  ): Promise<void> {
    await this.apikeyRepository.updateById(id, apikey);
  }

  @put('/apikey/{id}', {
    responses: {
      '204': {
        description: 'Apikey PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() apikey: Apikey,
  ): Promise<void> {
    await this.apikeyRepository.replaceById(id, apikey);
  }

  @del('/apikey/{id}', {
    responses: {
      '204': {
        description: 'Apikey DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.apikeyRepository.deleteById(id);
  }
}
