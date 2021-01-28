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
    apikey: Omit<Apikey, 'apikeyID'>,
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
/*
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
*/
  @get('/apikey/{apikeyID}', {
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
    @param.path.string('apikeyID') apikeyID: string,
    @param.filter(Apikey, {exclude: 'where'}) filter?: FilterExcludingWhere<Apikey>
  ): Promise<Apikey> {
    return this.apikeyRepository.findById(apikeyID, filter);
  }
/*
  @patch('/apikey/{apikeyID}', {
    responses: {
      '204': {
        description: 'Apikey PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('apikeyID') apikeyID: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Apikey, {partial: true}),
        },
      },
    })
    apikey: Apikey,
  ): Promise<void> {
    await this.apikeyRepository.updateById(apikeyID, apikey);
  }*/

  @put('/apikey/{apikeyID}',{
    responses: {
      '204': {
        description: 'Apikey PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('apikeyID') apikeyID: string,
    @requestBody() apikey: Apikey,
  ): Promise<void> {
    await this.apikeyRepository.replaceById(apikeyID, apikey);
  }

  @del('/apikey/{apikeyID}', {
    responses: {
      '204': {
        description: 'Apikey DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('apikeyID') apikeyID: string): Promise<void> {
    await this.apikeyRepository.deleteById(apikeyID);
  }
}
