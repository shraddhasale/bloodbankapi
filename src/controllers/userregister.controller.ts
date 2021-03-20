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
  getModelSchemaRef, param,


  patch, post,




  put,

  requestBody
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
            exclude: ['userregisterID'],
          }),
        },
      },
    })
    userregister: Omit<Userregister, 'userregisterID'>,
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

  @get('/userredister/{userregisterID}', {
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
    @param.path.string('userregisterID') userregisterID: string,
    @param.filter(Userregister, {exclude: 'where'}) filter?: FilterExcludingWhere<Userregister>
  ): Promise<Userregister> {
    return this.userregisterRepository.findById(userregisterID, filter);
  }

  @patch('/userredister/{userregisterID}', {
    responses: {
      '204': {
        description: 'Userregister PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('userregisterID') userregisterID: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Userregister, {partial: true}),
        },
      },
    })
    userregister: Userregister,
  ): Promise<void> {
    await this.userregisterRepository.updateById(userregisterID, userregister);
  }

  @put('/userredister/{userregisterID}', {
    responses: {
      '204': {
        description: 'Userregister PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('userregisterID') userregisterID: string,
    @requestBody() userregister: Userregister,
  ): Promise<void> {
    await this.userregisterRepository.replaceById(userregisterID, userregister);
  }

  @del('/userredister/{userregisterID}', {
    responses: {
      '204': {
        description: 'Userregister DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('userregisterID') userregisterID: string): Promise<void> {
    await this.userregisterRepository.deleteById(userregisterID);
  }
}
