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
import {Userbloodbankdonate} from '../models';
import {UserbloodbankdonateRepository} from '../repositories';

export class UserbloodbankdonateController {
  constructor(
    @repository(UserbloodbankdonateRepository)
    public userbloodbankdonateRepository : UserbloodbankdonateRepository,
  ) {}

  @post('/userbloodbankdonate', {
    responses: {
      '200': {
        description: 'Userbloodbankdonate model instance',
        content: {'application/json': {schema: getModelSchemaRef(Userbloodbankdonate)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Userbloodbankdonate, {
            title: 'NewUserbloodbankdonate',
            exclude: ['id'],
          }),
        },
      },
    })
    userbloodbankdonate: Omit<Userbloodbankdonate, 'id'>,
  ): Promise<Userbloodbankdonate> {
    return this.userbloodbankdonateRepository.create(userbloodbankdonate);
  }

  @get('/userbloodbankdonate/count', {
    responses: {
      '200': {
        description: 'Userbloodbankdonate model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Userbloodbankdonate) where?: Where<Userbloodbankdonate>,
  ): Promise<Count> {
    return this.userbloodbankdonateRepository.count(where);
  }

  @get('/userbloodbankdonate', {
    responses: {
      '200': {
        description: 'Array of Userbloodbankdonate model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Userbloodbankdonate, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Userbloodbankdonate) filter?: Filter<Userbloodbankdonate>,
  ): Promise<Userbloodbankdonate[]> {
    return this.userbloodbankdonateRepository.find(filter);
  }

  @patch('/userbloodbankdonate', {
    responses: {
      '200': {
        description: 'Userbloodbankdonate PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Userbloodbankdonate, {partial: true}),
        },
      },
    })
    userbloodbankdonate: Userbloodbankdonate,
    @param.where(Userbloodbankdonate) where?: Where<Userbloodbankdonate>,
  ): Promise<Count> {
    return this.userbloodbankdonateRepository.updateAll(userbloodbankdonate, where);
  }

  @get('/userbloodbankdonate/{id}', {
    responses: {
      '200': {
        description: 'Userbloodbankdonate model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Userbloodbankdonate, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Userbloodbankdonate, {exclude: 'where'}) filter?: FilterExcludingWhere<Userbloodbankdonate>
  ): Promise<Userbloodbankdonate> {
    return this.userbloodbankdonateRepository.findById(id, filter);
  }

  @patch('/userbloodbankdonate/{id}', {
    responses: {
      '204': {
        description: 'Userbloodbankdonate PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Userbloodbankdonate, {partial: true}),
        },
      },
    })
    userbloodbankdonate: Userbloodbankdonate,
  ): Promise<void> {
    await this.userbloodbankdonateRepository.updateById(id, userbloodbankdonate);
  }

  @put('/userbloodbankdonate/{id}', {
    responses: {
      '204': {
        description: 'Userbloodbankdonate PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() userbloodbankdonate: Userbloodbankdonate,
  ): Promise<void> {
    await this.userbloodbankdonateRepository.replaceById(id, userbloodbankdonate);
  }

  @del('/userbloodbankdonate/{id}', {
    responses: {
      '204': {
        description: 'Userbloodbankdonate DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.userbloodbankdonateRepository.deleteById(id);
  }
}
