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
import {Userbloodbankdonate} from '../models';
import {
  BloodbankRepository,
  UserbloodbankdonateRepository,
  UserRepository,
} from '../repositories';
import * as exampleRequest from './exampleRequest.json';

export class UserbloodbankdonateController extends common.CommonComponent {
  constructor(
    @repository(UserbloodbankdonateRepository)
    public userbloodbankdonateRepository: UserbloodbankdonateRepository,
    @repository(UserRepository)
    public userRepository: UserRepository,
    @repository(BloodbankRepository)
    public bloodbankRepository: BloodbankRepository,
  ) {
    super();
  }

  @post('/userbloodbankdonate', {
    responses: {
      '200': {
        description: 'Userbloodbankdonate model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(Userbloodbankdonate)},
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          example: exampleRequest.userBloddBankDonate,
        },
      },
    })
    userbloodbankdonate: Omit<Userbloodbankdonate, 'userbloodbankdonateID'>,
  ): Promise<Userbloodbankdonate> {
    //return this.userbloodbankdonateRepository.create(userbloodbankdonate);

    // return this.userbloodbankdonateRepository.create(apikey);
    //return this.roleRepository.create(role);
    await this.sanitizeRequestBody(userbloodbankdonate);
    await this.validateData(userbloodbankdonate, 'userbloodbankdonate');

    //check bloodbankID is valid
    await this.checkBloodBankisValid(userbloodbankdonate.bloodBankID);

    //check bloodbankID is valdi
    await this.checkUserisValid(userbloodbankdonate.userID);

    userbloodbankdonate.createdAt = new Date();
    userbloodbankdonate.updatedAt = new Date();

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
              items: getModelSchemaRef(Userbloodbankdonate, {
                includeRelations: true,
              }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Userbloodbankdonate) filter?: Filter<Userbloodbankdonate>,
  ): Promise<Userbloodbankdonate[]> {
    // return this.userbloodbankdonateRepository.find(filter);

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
      filter.fields = constants.defaultFieldsForUserBloodDonation; //change per controller fields
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
    result.data = await this.userbloodbankdonateRepository.find(filter);
    count = await this.userbloodbankdonateRepository.count(where);
    result.count = count.count;

    if (result) {
      let userID = [];
      let bloodBankID = [];

      for (var i = 0; i < result.data.length; i++) {
        if (result.data[i]['userID']) {
          userID.push(result.data[i]['userID']);
          bloodBankID.push(result.data[i]['bloodBankID']);
        }
      }

      filterRelation.where = {id: {inq: userID}};
      filterRelation.fields = {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
      };
      const userData: any = await this.userRepository.find(filterRelation, {});
      for (var i = 0; i < userData.length; i++) {
        relationData[userData[i]['id'].toString()] = {
          firstName: userData[i]['firstName'],
          lastName: userData[i]['lastName'],
          email: userData[i]['email'],
          phoneNumber: userData[i]['phoneNumber'],
        };
      }

      let filterRelationBloodbank: any = {};
      filterRelationBloodbank.where = {id: {inq: bloodBankID}};
      filterRelationBloodbank.fields = {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
      };
      const bloodbankData: any = await this.bloodbankRepository.find(
        filterRelationBloodbank,
        {},
      );
      let bloodbankReationData: any = {};
      for (var i = 0; i < bloodbankData.length; i++) {
        bloodbankReationData[bloodbankData[i]['id'].toString()] = {
          firstName: bloodbankData[i]['firstName'],
          lastName: bloodbankData[i]['lastName'],
          email: bloodbankData[i]['email'],
          phoneNumber: bloodbankData[i]['phoneNumber'],
        };
      }
      result.relationData = {
        user: relationData,
        bloodbank: bloodbankReationData,
      };
    }

    return result;
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
  @get('/userbloodbankdonate/{userbloodbankdonateID}', {
    responses: {
      '200': {
        description: 'Userbloodbankdonate model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Userbloodbankdonate, {
              includeRelations: true,
            }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('userbloodbankdonateID') userbloodbankdonateID: string,
    @param.filter(Userbloodbankdonate, {exclude: 'where'})
    filter?: FilterExcludingWhere<Userbloodbankdonate>,
  ): Promise<Userbloodbankdonate> {
    return this.userbloodbankdonateRepository.findById(
      userbloodbankdonateID,
      filter,
    );
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
    @param.path.string('userbloodbankdonateID') userbloodbankdonateID: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Userbloodbankdonate, {partial: true}),
        },
      },
    })
    userbloodbankdonate: Userbloodbankdonate,
  ): Promise<void> {
    await this.userbloodbankdonateRepository.updateById(userbloodbankdonateID, userbloodbankdonate);
  }
*/
  @put('/userbloodbankdonate/{userbloodbankdonateID}', {
    responses: {
      '204': {
        description: 'Userbloodbankdonate PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('userbloodbankdonateID') userbloodbankdonateID: string,
    @requestBody({
      content: {
        'application/json': {
          example: exampleRequest.userBloddBankDonate,
        },
      },
    })
    userbloodbankdonate: any,
  ): Promise<void> {
    // await this.userbloodbankdonateRepository.replaceById(
    //   userbloodbankdonateID,
    //   userbloodbankdonate,
    // );

    await this.sanitizeRequestBody(userbloodbankdonate);
    await this.validateData(userbloodbankdonate, 'userbloodbankdonate');

    //check bloodbankID is valdi
    await this.checkBloodBankisValid(userbloodbankdonate.bloodBankID);

    //check bloodbankID is valdi
    await this.checkUserisValid(userbloodbankdonate.userID);

    let userbloodbankdonateDetail: any = await this.userbloodbankdonateRepository.find(
      {
        where: {
          id: userbloodbankdonate,
        },
      },
    );

    if (
      userbloodbankdonateDetail &&
      userbloodbankdonateDetail[0] &&
      userbloodbankdonateDetail[0]['createdAt']
    ) {
      userbloodbankdonate.createdAt = userbloodbankdonateDetail[0]['createdAt'];
    }

    userbloodbankdonate.updatedAt = new Date();

    await this.userbloodbankdonateRepository.replaceById(
      userbloodbankdonateID,
      userbloodbankdonate,
    );

    var result: any = await this.userbloodbankdonateRepository.findById(
      userbloodbankdonate,
      {},
    );

    return {...result};
  }

  @del('/userbloodbankdonate/{userbloodbankdonateID}', {
    responses: {
      '204': {
        description: 'Userbloodbankdonate DELETE success',
      },
    },
  })
  async deleteById(
    @param.path.string('userbloodbankdonateID') userbloodbankdonateID: string,
  ): Promise<void> {
    //await this.userbloodbankdonateRepository.deleteById(userbloodbankdonateID);

    let userbloodbankdonate: any = {};
    userbloodbankdonate = {statusID: constants.status.Delete};
    let result: any = {};
    await this.userbloodbankdonateRepository.updateById(
      userbloodbankdonateID,
      userbloodbankdonate,
    );
    result = await this.userbloodbankdonateRepository.findById(
      userbloodbankdonateID,
    );
    return {...result};
  }
}
