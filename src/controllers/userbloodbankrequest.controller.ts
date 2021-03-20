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
import {Userbloodbankrequest} from '../models';
import {UserbloodbankrequestRepository} from '../repositories';
import * as exampleRequest from './exampleRequest.json';
export class UserbloodbankrequestController extends common.CommonComponent {
  constructor(
    @repository(UserbloodbankrequestRepository)
    public userbloodbankrequestRepository: UserbloodbankrequestRepository,
  ) {
    super();
  }

  @post('/userbloodbankrequest', {
    responses: {
      '200': {
        description: 'Userbloodbankrequest model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(Userbloodbankrequest)},
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          example: exampleRequest.userBloddBankRequest,
        },
      },
    })
    userbloodbankrequest: Omit<Userbloodbankrequest, 'userbloodbankrequestID'>,
  ): Promise<Userbloodbankrequest> {
    //return this.userbloodbankrequestRepository.create(userbloodbankrequest);

    // return this.userbloodbankrequestRepository.create(apikey);
    //return this.roleRepository.create(role);
    await this.sanitizeRequestBody(userbloodbankrequest);
    await this.validateData(userbloodbankrequest, 'userbloodbankrequest');

    //check bloodbankID is valdi
    await this.checkBloodBankisValid(userbloodbankrequest.bloodBankID);

    //check bloodbankID is valdi
    await this.checkUserisValid(userbloodbankrequest.userID);

    userbloodbankrequest.createdAt = new Date();
    userbloodbankrequest.updatedAt = new Date();

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
              items: getModelSchemaRef(Userbloodbankrequest, {
                includeRelations: true,
              }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Userbloodbankrequest) filter?: Filter<Userbloodbankrequest>,
  ): Promise<Userbloodbankrequest[]> {
    //return this.userbloodbankrequestRepository.find(filter);

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
      filter.fields = constants.defaultFieldsForUserBloodRequest; //change per controller fields
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
    result.data = await this.userbloodbankrequestRepository.find(filter);
    count = await this.userbloodbankrequestRepository.count(where);
    result.count = count.count;

    return result;
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
            schema: getModelSchemaRef(Userbloodbankrequest, {
              includeRelations: true,
            }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('userbloodbankrequestID') userbloodbankrequestID: string,
    @param.filter(Userbloodbankrequest, {exclude: 'where'})
    filter?: FilterExcludingWhere<Userbloodbankrequest>,
  ): Promise<Userbloodbankrequest> {
    return this.userbloodbankrequestRepository.findById(
      userbloodbankrequestID,
      filter,
    );
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
    @requestBody({
      content: {
        'application/json': {
          example: exampleRequest.userBloddBankRequest,
        },
      },
    })
    userbloodbankrequest: any,
  ): Promise<void> {
    // await this.userbloodbankrequestRepository.replaceById(
    //   userbloodbankrequestID,
    //   userbloodbankrequest,
    // );

    await this.sanitizeRequestBody(userbloodbankrequest);
    await this.validateData(userbloodbankrequest, 'userbloodbankrequest');

    //check bloodbankID is valdi
    await this.checkBloodBankisValid(userbloodbankrequest.bloodBankID);

    //check bloodbankID is valdi
    await this.checkUserisValid(userbloodbankrequest.userID);

    let userbloodbankrequestDetail: any = await this.userbloodbankrequestRepository.find(
      {
        where: {
          id: userbloodbankrequestID,
        },
      },
    );

    if (
      userbloodbankrequestDetail &&
      userbloodbankrequestDetail[0] &&
      userbloodbankrequestDetail[0]['createdAt']
    ) {
      userbloodbankrequest.createdAt =
        userbloodbankrequestDetail[0]['createdAt'];
    }

    userbloodbankrequest.updatedAt = new Date();

    await this.userbloodbankrequestRepository.replaceById(
      userbloodbankrequestID,
      userbloodbankrequest,
    );

    var result: any = await this.userbloodbankrequestRepository.findById(
      userbloodbankrequestID,
      {},
    );

    return {...result};
  }

  @del('/userbloodbankrequest/{userbloodbankrequestID}', {
    responses: {
      '204': {
        description: 'Userbloodbankrequest DELETE success',
      },
    },
  })
  async deleteById(
    @param.path.string('userbloodbankrequestID') userbloodbankrequestID: string,
  ): Promise<void> {
    // await this.userbloodbankrequestRepository.deleteById(
    //   userbloodbankrequestID,
    // );

    let userbloodbankrequest: any = {};
    userbloodbankrequest = {statusID: constants.status.Delete};
    let result: any = {};
    await this.userbloodbankrequestRepository.updateById(
      userbloodbankrequestID,
      userbloodbankrequest,
    );
    result = await this.userbloodbankrequestRepository.findById(
      userbloodbankrequestID,
    );
    return {...result};
  }
}
