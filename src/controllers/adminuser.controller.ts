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
import {Adminuser} from '../models';
import {AdminuserRepository} from '../repositories';

export class AdminuserController {
  constructor(
    @repository(AdminuserRepository)
    public adminuserRepository : AdminuserRepository,
  ) {}

  @post('/adminuser', {
    responses: {
      '200': {
        description: 'Adminuser model instance',
        content: {'application/json': {schema: getModelSchemaRef(Adminuser)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Adminuser, {
            title: 'NewAdminuser',
            exclude: ['id'],
          }),
        },
      },
    })
    adminuser: Omit<Adminuser, 'id'>,
  ): Promise<Adminuser> {
    return this.adminuserRepository.create(adminuser);
  }

  @get('/adminuser/count', {
    responses: {
      '200': {
        description: 'Adminuser model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Adminuser) where?: Where<Adminuser>,
  ): Promise<Count> {
    return this.adminuserRepository.count(where);
  }

  @get('/adminuser', {
    responses: {
      '200': {
        description: 'Array of Adminuser model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Adminuser, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Adminuser) filter?: Filter<Adminuser>,
  ): Promise<Adminuser[]> {
    return this.adminuserRepository.find(filter);
  }

  @patch('/adminuser', {
    responses: {
      '200': {
        description: 'Adminuser PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Adminuser, {partial: true}),
        },
      },
    })
    adminuser: Adminuser,
    @param.where(Adminuser) where?: Where<Adminuser>,
  ): Promise<Count> {
    return this.adminuserRepository.updateAll(adminuser, where);
  }

  @get('/adminuser/{id}', {
    responses: {
      '200': {
        description: 'Adminuser model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Adminuser, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Adminuser, {exclude: 'where'}) filter?: FilterExcludingWhere<Adminuser>
  ): Promise<Adminuser> {
    return this.adminuserRepository.findById(id, filter);
  }

  @patch('/adminuser/{id}', {
    responses: {
      '204': {
        description: 'Adminuser PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Adminuser, {partial: true}),
        },
      },
    })
    adminuser: Adminuser,
  ): Promise<void> {
    await this.adminuserRepository.updateById(id, adminuser);
  }

  @put('/adminuser/{id}', {
    responses: {
      '204': {
        description: 'Adminuser PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() adminuser: Adminuser,
  ): Promise<void> {
    await this.adminuserRepository.replaceById(id, adminuser);
  }

  @del('/adminuser/{id}', {
    responses: {
      '204': {
        description: 'Adminuser DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.adminuserRepository.deleteById(id);
  }
}
