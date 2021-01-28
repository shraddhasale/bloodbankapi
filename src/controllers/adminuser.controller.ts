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


  post,




  put,

  requestBody
} from '@loopback/rest';
import {Adminuser} from '../models';
import {AdminuserRepository} from '../repositories';
import * as exampleRequest from './exampleRequest.json';
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
          example: exampleRequest.adminuserCreatBody,
        },
      },
    })
    adminuser: Omit<Adminuser, 'adminuserID'>,
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
/*
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
  */

  @get('/adminuser/{adminuserID}', {
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
    @param.path.string('adminuserID') adminuserID: string,
    @param.filter(Adminuser, {exclude: 'where'}) filter?: FilterExcludingWhere<Adminuser>
  ): Promise<Adminuser> {
    return this.adminuserRepository.findById(adminuserID, filter);
  }
/*
  @patch('/adminuser/{adminuserID}', {
    responses: {
      '204': {
        description: 'Adminuser PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('adminuserID') adminuserID: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Adminuser, {partial: true}),
        },
      },
    })
    adminuser: Adminuser,
  ): Promise<void> {
    await this.adminuserRepository.updateById(adminuserID adminuser);
  }*/

  @put('/adminuser/{adminuserID}',{
    responses: {
      '204': {
        description: 'Adminuser PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('adminuserID') adminuserID: string,
    @requestBody() adminuser: Adminuser,
  ): Promise<void> {
    await this.adminuserRepository.replaceById(adminuserID, adminuser);
  }

  @del('/adminuser/{adminuserID}', {
    responses: {
      '204': {
        description: 'Adminuser DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('adminuserID') adminuserID: string): Promise<void> {
    await this.adminuserRepository.deleteById(adminuserID);
  }
}
