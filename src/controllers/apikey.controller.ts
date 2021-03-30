import {
  Count,
  CountSchema,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  post,
  put,
  requestBody,
} from '@loopback/rest';
import * as common from '../component/comman.component';
import * as constants from '../constants.json';
import {Apikey} from '../models';
import {ApikeyRepository} from '../repositories';
import * as exampleRequest from './exampleRequest.json';

export class ApikeyController extends common.CommonComponent {
  constructor(
    @repository(ApikeyRepository)
    public apikeyRepository: ApikeyRepository,
  ) {
    super();
  }

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
          example: exampleRequest.apikeyCreateBody,
        },
      },
    })
    apikey: any,
  ): Promise<Apikey> {
    // return this.apikeyRepository.create(apikey);
    //return this.roleRepository.create(role);
    await this.sanitizeRequestBody(apikey);
    await this.validateData(apikey, 'apikey');

    //check duplicate role name id
    await this.duplicatedCheckForRoleAPIKEY(apikey.name, '');

    if (apikey.roleID && apikey.roleID != '') {
      await this.checkRoleIdIsvalid([apikey.roleID]);
    }

    apikey.createdAt = new Date();
    apikey.updatedAt = new Date();

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
  async count(@param.where(Apikey) where?: Where<Apikey>): Promise<Count> {
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
  async find(@param.filter(Apikey) filter?: any): Promise<Apikey[]> {
    filter = filter || {};
    const result: any = {};
    const roleData: any = {};
    const relationData: any = {};
    let where: any = {};
    const filterRelation: any = {};
    let count: any = {};

    if (filter && !filter.skip) {
      filter.skip = constants.defaultSkip;
    }

    if (filter && !filter.limit) {
      filter.limit = constants.defaultLIMIT;
    } else if (
      filter &&
      filter.limit &&
      filter.limit > constants.defaultMaxLimit
    ) {
      filter.limit = constants.defaultMaxLimit;
    }
    //console.log(filter.limit)

    if (filter && !filter.offset) {
      filter.offset = constants.defaultOffset;
    }

    if (filter && !filter.order) {
      filter.order = [
        constants.defaultSortkey + ' ' + constants.defaultSortOrder,
      ];
    }

    if (filter && !filter.fields) {
      filter.fields = constants.defaultFieldsForAPI; //change per controller fields
    }

    if (filter && !filter.where) {
      filter.where = {
        statusID: {inq: [constants.status.Active, constants.status.Inactive]},
      };
      where = filter.where;
    } else {
      //filter.where.statusID = {inq:[constants.status.Active, constants.status.Inactive]};
      where = filter?.where;
    }

    if ('search' in filter['where']) {
      let search = filter['where']['search'];
      delete filter['where']['search'];
      const or: any = [];
      search = search.trim();
      or.push({
        name: new RegExp(search, 'i'),
      });
      filter['where']['or'] = or;
    }

    result.data = await this.apikeyRepository.find(filter);
    count = await this.apikeyRepository.count(where);
    result.count = count.count;

    return result;
    // return this.apikeyRepository.find(filter);
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
    @param.filter(Apikey, {exclude: 'where'})
    filter?: FilterExcludingWhere<Apikey>,
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

  @put('/apikey/{apikeyID}', {
    responses: {
      '204': {
        description: 'Apikey PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('apikeyID') apikeyID: string,
    @requestBody({
      content: {
        'application/json': {
          example: exampleRequest.apikeyCreateBody,
        },
      },
    })
    apikey: any,
  ): Promise<void> {
    //await this.apikeyRepository.replaceById(apikeyID, apikey);

    await this.sanitizeRequestBody(apikey);
    await this.validateData(apikey, 'apikey');

    //check duplicate email id
    await this.duplicatedCheckForEmail(apikey.name, apikeyID);
    //check duplicate phonenumber
    await this.duplicatedCheckForPhoneNumber(apikey.name, apikeyID);

    if (apikey.roleID && apikey.roleID != '') {
      await this.checkRoleIdIsvalid([apikey.roleID]);
    }

    let roleDetail: any = await this.apikeyRepository.find({
      where: {
        id: apikeyID,
      },
    });

    if (roleDetail && roleDetail[0] && roleDetail[0]['createdAt']) {
      apikey.createdAt = roleDetail[0]['createdAt'];
    }

    apikey.updatedAt = new Date();

    await this.apikeyRepository.replaceById(apikeyID, apikey);

    var result: any = await this.apikeyRepository.findById(apikeyID, {});

    return {...result};
  }

  @del('/apikey/{apikeyID}', {
    responses: {
      '204': {
        description: 'Apikey DELETE success',
      },
    },
  })
  async deleteById(
    @param.path.string('apikeyID') apikeyID: string,
  ): Promise<void> {
    //await this.apikeyRepository.deleteById(apikeyID);

    let apikey: any = {};
    apikey = {statusID: constants.status.Delete};
    let result: any = {};
    await this.apikeyRepository.updateById(apikeyID, apikey);
    result = await this.apikeyRepository.findById(apikeyID);
    return {...result};
  }
}
