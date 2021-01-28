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
import {Userbloodbankrequest} from '../models';
import {UserbloodbankrequestRepository} from '../repositories';

export class UserbloodbankrequestController {
  constructor(
    @repository(UserbloodbankrequestRepository)
    public userbloodbankrequestRepository : UserbloodbankrequestRepository,
  ) {}

  @post('/userbloodbankrequest', {
    responses: {
      '200': {
        description: 'Userbloodbankrequest model instance',
        content: {'application/json': {schema: getModelSchemaRef(Userbloodbankrequest)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Userbloodbankrequest, {
            title: 'NewUserbloodbankrequest',
            exclude: ['userbloodbankrequestID'],
          }),
        },
      },
    })
    userbloodbankrequest: Omit<Userbloodbankrequest, 'userbloodbankrequestID'>,
  ): Promise<Userbloodbankrequest> {
    return this.userbloodbankrequestRepository.create(userbloodbankrequest);
  }

  @get('/userbloodbankrequest/count', {
    responses: {
      '200': {
        description: 'Userbloodbankrequest model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Userbloodbankrequest) where?: Where<Userbloodbankrequest>,
  ): Promise<Count> {
    return this.userbloodbankrequestRepository.count(where);
  }

  @get('/userbloodbankrequest', {
    responses: {
      '200': {
        description: 'Array of Userbloodbankrequest model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Userbloodbankrequest, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Userbloodbankrequest) filter?: Filter<Userbloodbankrequest>,
  ): Promise<Userbloodbankrequest[]> {
    return this.userbloodbankrequestRepository.find(filter);
  }
/*
  @patch('/userbloodbankrequest', {
    responses: {
      '200': {
        description: 'Userbloodbankrequest PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Userbloodbankrequest, {partial: true}),
        },
      },
    })
    userbloodbankrequest: Userbloodbankrequest,
    @param.where(Userbloodbankrequest) where?: Where<Userbloodbankrequest>,
  ): Promise<Count> {
    return this.userbloodbankrequestRepository.updateAll(userbloodbankrequest, where);
  }
*/
  @get('/userbloodbankrequest/{userbloodbankrequestID}', {
    responses: {
      '200': {
        description: 'Userbloodbankrequest model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Userbloodbankrequest, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('userbloodbankrequestID') userbloodbankrequestID: string,
    @param.filter(Userbloodbankrequest, {exclude: 'where'}) filter?: FilterExcludingWhere<Userbloodbankrequest>
  ): Promise<Userbloodbankrequest> {
    return this.userbloodbankrequestRepository.findById(userbloodbankrequestID, filter);
  }
/*
  @patch('/userbloodbankrequest/{id}', {
    responses: {
      '204': {
        description: 'Userbloodbankrequest PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('userbloodbankrequestID') userbloodbankrequestID: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Userbloodbankrequest, {partial: true}),
        },
      },
    })
    userbloodbankrequest: Userbloodbankrequest,
  ): Promise<void> {
    await this.userbloodbankrequestRepository.updateById(userbloodbankrequestID, userbloodbankrequest);
  }
*/
  @put('/userbloodbankrequest/{userbloodbankrequestID}', {
    responses: {
      '204': {
        description: 'Userbloodbankrequest PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('userbloodbankrequestID') userbloodbankrequestID: string,
    @requestBody() userbloodbankrequest: Userbloodbankrequest,
  ): Promise<void> {
    await this.userbloodbankrequestRepository.replaceById(userbloodbankrequestID, userbloodbankrequest);
  }

  @del('/userbloodbankrequest/{userbloodbankrequestID}', {
    responses: {
      '204': {
        description: 'Userbloodbankrequest DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('userbloodbankrequestID') userbloodbankrequestID: string): Promise<void> {
    await this.userbloodbankrequestRepository.deleteById(userbloodbankrequestID);
  }
}
