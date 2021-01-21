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
import {Url} from '../models';
import {UrlRepository} from '../repositories';

export class UrlController {
  constructor(
    @repository(UrlRepository)
    public urlRepository : UrlRepository,
  ) {}

  @post('/url', {
    responses: {
      '200': {
        description: 'Url model instance',
        content: {'application/json': {schema: getModelSchemaRef(Url)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Url, {
            title: 'NewUrl',
            exclude: ['id'],
          }),
        },
      },
    })
    url: Omit<Url, 'id'>,
  ): Promise<Url> {
    return this.urlRepository.create(url);
  }

  @get('/url/count', {
    responses: {
      '200': {
        description: 'Url model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Url) where?: Where<Url>,
  ): Promise<Count> {
    return this.urlRepository.count(where);
  }

  @get('/url', {
    responses: {
      '200': {
        description: 'Array of Url model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Url, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Url) filter?: Filter<Url>,
  ): Promise<Url[]> {
    return this.urlRepository.find(filter);
  }

  @patch('/url', {
    responses: {
      '200': {
        description: 'Url PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Url, {partial: true}),
        },
      },
    })
    url: Url,
    @param.where(Url) where?: Where<Url>,
  ): Promise<Count> {
    return this.urlRepository.updateAll(url, where);
  }

  @get('/url/{id}', {
    responses: {
      '200': {
        description: 'Url model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Url, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Url, {exclude: 'where'}) filter?: FilterExcludingWhere<Url>
  ): Promise<Url> {
    return this.urlRepository.findById(id, filter);
  }

  @patch('/url/{id}', {
    responses: {
      '204': {
        description: 'Url PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Url, {partial: true}),
        },
      },
    })
    url: Url,
  ): Promise<void> {
    await this.urlRepository.updateById(id, url);
  }

  @put('/url/{id}', {
    responses: {
      '204': {
        description: 'Url PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() url: Url,
  ): Promise<void> {
    await this.urlRepository.replaceById(id, url);
  }

  @del('/url/{id}', {
    responses: {
      '204': {
        description: 'Url DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.urlRepository.deleteById(id);
  }
}
