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
import {Userregister} from '../models';
import {UserregisterRepository} from '../repositories';

export class UserregisterController {
  constructor(
    @repository(UserregisterRepository)
    public userregisterRepository : UserregisterRepository,
  ) {}

  @post('/userredister', {
    responses: {
      '200': {
        description: 'Userregister model instance',
        content: {'application/json': {schema: getModelSchemaRef(Userregister)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Userregister, {
            title: 'NewUserregister',
            exclude: ['id'],
          }),
        },
      },
    })
    userregister: Omit<Userregister, 'id'>,
  ): Promise<Userregister> {
    return this.userregisterRepository.create(userregister);
  }

  @get('/userredister/count', {
    responses: {
      '200': {
        description: 'Userregister model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Userregister) where?: Where<Userregister>,
  ): Promise<Count> {
    return this.userregisterRepository.count(where);
  }

  @get('/userredister', {
    responses: {
      '200': {
        description: 'Array of Userregister model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Userregister, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Userregister) filter?: Filter<Userregister>,
  ): Promise<Userregister[]> {
    return this.userregisterRepository.find(filter);
  }

  @patch('/userredister', {
    responses: {
      '200': {
        description: 'Userregister PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Userregister, {partial: true}),
        },
      },
    })
    userregister: Userregister,
    @param.where(Userregister) where?: Where<Userregister>,
  ): Promise<Count> {
    return this.userregisterRepository.updateAll(userregister, where);
  }

  @get('/userredister/{id}', {
    responses: {
      '200': {
        description: 'Userregister model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Userregister, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Userregister, {exclude: 'where'}) filter?: FilterExcludingWhere<Userregister>
  ): Promise<Userregister> {
    return this.userregisterRepository.findById(id, filter);
  }

  @patch('/userredister/{id}', {
    responses: {
      '204': {
        description: 'Userregister PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Userregister, {partial: true}),
        },
      },
    })
    userregister: Userregister,
  ): Promise<void> {
    await this.userregisterRepository.updateById(id, userregister);
  }

  @put('/userredister/{id}', {
    responses: {
      '204': {
        description: 'Userregister PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() userregister: Userregister,
  ): Promise<void> {
    await this.userregisterRepository.replaceById(id, userregister);
  }

  @del('/userredister/{id}', {
    responses: {
      '204': {
        description: 'Userregister DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.userregisterRepository.deleteById(id);
  }
}
