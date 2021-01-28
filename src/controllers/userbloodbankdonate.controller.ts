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
            exclude: ['usrbloodbankdonateID'],
          }),
        },
      },
    })
    userbloodbankdonate: Omit<Userbloodbankdonate, 'usrbloodbankdonateID'>,
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
/*
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
*/
  @get('/userbloodbankdonate/{usrbloodbankdonateID}', {
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
    @param.path.string('usrbloodbankdonateID') usrbloodbankdonateID: string,
    @param.filter(Userbloodbankdonate, {exclude: 'where'}) filter?: FilterExcludingWhere<Userbloodbankdonate>
  ): Promise<Userbloodbankdonate> {
    return this.userbloodbankdonateRepository.findById(usrbloodbankdonateID, filter);
  }
/*
  @patch('/userbloodbankdonate/{id}', {
    responses: {
      '204': {
        description: 'Userbloodbankdonate PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('usrbloodbankdonateID') usrbloodbankdonateID: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Userbloodbankdonate, {partial: true}),
        },
      },
    })
    userbloodbankdonate: Userbloodbankdonate,
  ): Promise<void> {
    await this.userbloodbankdonateRepository.updateById(usrbloodbankdonateID, userbloodbankdonate);
  }
*/
  @put('/userbloodbankdonate/{usrbloodbankdonateID}', {
    responses: {
      '204': {
        description: 'Userbloodbankdonate PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('usrbloodbankdonateID') usrbloodbankdonateID: string,
    @requestBody() userbloodbankdonate: Userbloodbankdonate,
  ): Promise<void> {
    await this.userbloodbankdonateRepository.replaceById(usrbloodbankdonateID, userbloodbankdonate);
  }

  @del('/userbloodbankdonate/{usrbloodbankdonateID}', {
    responses: {
      '204': {
        description: 'Userbloodbankdonate DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('usrbloodbankdonateID') usrbloodbankdonateID: string): Promise<void> {
    await this.userbloodbankdonateRepository.deleteById(usrbloodbankdonateID);
  }
}
