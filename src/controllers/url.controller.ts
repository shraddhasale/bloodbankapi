import {
  Count,
  CountSchema,
  Filter,
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
import {Url} from '../models';
import {UrlRepository} from '../repositories';
import * as exampleRequest from './exampleRequest.json';

export class UrlController extends common.CommonComponent {
  constructor(
    @repository(UrlRepository)
    public urlRepository: UrlRepository,
  ) {
    super();
  }

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
          example: exampleRequest.urlCreateBody,
        },
      },
    })
    url: Omit<Url, 'urlID'>,
  ): Promise<Url> {
    //return this.urlRepository.create(url);
    await this.sanitizeRequestBody(url);
    await this.validateData(url, 'url');

    //check duplicate url
    await this.duplicatedCheckForURL(url, '');
    //check role exists
    if (url.roleID && url.roleID.length > 0) {
      await this.checkRoleIdIsvalid(url.roleID);
    }

    url.createdAt = new Date();
    url.updatedAt = new Date();

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
  async count(@param.where(Url) where?: Where<Url>): Promise<Count> {
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
  async find(@param.filter(Url) filter?: Filter<Url>): Promise<Url[]> {
    //return this.urlRepository.find(filter);
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
      filter.fields = constants.defaultFieldsForURL; //change per controller fields
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
    result.data = await this.urlRepository.find(filter);
    count = await this.urlRepository.count(where);
    result.count = count.count;

    return result;
  }
  /*
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
*/
  @get('/url/{urlID}', {
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
    @param.path.string('urlID') urlID: string,
    @param.filter(Url, {exclude: 'where'}) filter?: FilterExcludingWhere<Url>,
  ): Promise<Url> {
    return this.urlRepository.findById(urlID, filter);
  }
  /*
  @patch('/url/{urlID}', {
    responses: {
      '204': {
        description: 'Url PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('urlID') urlID: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Url, {partial: true}),
        },
      },
    })
    url: Url,
  ): Promise<void> {
    await this.urlRepository.updateById(urlID, url);
  }
*/
  @put('/url/{urlID}', {
    responses: {
      '204': {
        description: 'Url PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('urlID') urlID: string,
    @requestBody({
      content: {
        'application/json': {
          example: exampleRequest.urlCreateBody,
        },
      },
    })
    url: any,
  ): Promise<void> {
    await this.sanitizeRequestBody(url);
    await this.validateData(url, 'url');

    //check duplicate url
    await this.duplicatedCheckForURL(url, urlID);
    //check role exists
    if (url.roleID && url.roleID.length > 0) {
      await this.checkRoleIdIsvalid(url.roleID);
    }

    let urlDetails: any = await this.urlRepository.find({
      where: {
        id: urlID,
      },
    });

    if (urlDetails && urlDetails[0] && urlDetails[0]['createdAt']) {
      url.createdAt = urlDetails[0]['createdAt'];
    }

    url.updatedAt = new Date();

    await this.urlRepository.replaceById(urlID, url);

    var result: any = await this.urlRepository.findById(urlID, {});

    return {...result};
    //await this.urlRepository.replaceById(urlID, url);
  }

  @del('/url/{urlID}', {
    responses: {
      '204': {
        description: 'Url DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('urlID') urlID: string): Promise<void> {
    //await this.urlRepository.deleteById(urlID);

    let url: any = {};
    url = {statusID: constants.status.Delete};
    let result: any = {};
    await this.urlRepository.updateById(urlID, url);
    result = await this.urlRepository.findById(urlID);
    return {...result};
  }
}
