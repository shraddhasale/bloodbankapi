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
import {Bloodbank} from '../models';
import {BloodbankRepository} from '../repositories';
import * as exampleRequest from './exampleRequest.json';
const emailRegx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export class BloodbankController extends common.CommonComponent {
  constructor(
    @repository(BloodbankRepository)
    public bloodbankRepository: BloodbankRepository,
  ) {
    super();
  }

  @post('/bloodbank', {
    responses: {
      '200': {
        description: 'Bloodbank model instance',
        content: {'application/json': {schema: getModelSchemaRef(Bloodbank)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          example: exampleRequest.bloodBankCreateBody,
        },
      },
    })
    bloodbank: Omit<Bloodbank, 'bloodbankID'>,
  ): Promise<Bloodbank> {
    //return this.bloodbankRepository.create(bloodbank);

    await this.sanitizeRequestBody(bloodbank);
    await this.validateData(bloodbank, 'bloodbank');

    //check duplicate email id
    await this.duplicatedCheckForEmailForBloodbank(bloodbank.email, '');
    //check duplicate phonenumber
    await this.duplicatedCheckForPhoneNumberForBloodbank(
      bloodbank.phoneNumber,
      '',
    );

    bloodbank.createdAt = new Date();
    bloodbank.updatedAt = new Date();

    return this.bloodbankRepository.create(bloodbank);
  }

  @get('/bloodbank/count', {
    responses: {
      '200': {
        description: 'Bloodbank model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Bloodbank) where?: Where<Bloodbank>,
  ): Promise<Count> {
    return this.bloodbankRepository.count(where);
  }

  @get('/bloodbank', {
    responses: {
      '200': {
        description: 'Array of Bloodbank model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Bloodbank, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(@param.filter(Bloodbank) filter?: any): Promise<Bloodbank[]> {
    //return this.bloodbankRepository.find(filter);
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
      filter.fields = constants.defaultFieldsForBloodbank; //change per controller fields
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
      if (/^\d+$/.test(search)) {
        if (search.length === 10) {
          or.push({
            phoneNumber: search,
          });
        } else {
          or.push({
            phoneNumber: new RegExp(search, 'i'),
          });
        }
      } else if (emailRegx.test(search)) {
        or.push({
          email: search,
        });
      } else {
        const splitVal = search.split(' ');
        const fName = splitVal[0];
        const lastName = splitVal[1]
          ? search.substr(search.indexOf(' ') + 1)
          : '';

        if (lastName !== '') {
          or.push(
            {firstName: fName, lastName: lastName},
            {
              firstName: fName.toLowerCase(),
              lastName: lastName.toLowerCase(),
            },
            {
              firstName: fName.charAt(0).toUpperCase() + fName.slice(1),
              lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1),
            },
          );
        } else {
          or.push(
            {firstName: fName},
            {firstName: fName.toLowerCase()},
            {firstName: fName.charAt(0).toUpperCase() + fName.slice(1)},
            {email: new RegExp(search, 'i')},
          );
        }
      }
      filter['where']['or'] = or;
    }

    result.data = await this.bloodbankRepository.find(filter);
    count = await this.bloodbankRepository.count(where);
    result.count = count.count;

    /**********************************find relation data end here************************************************************* */
    return result;
  }
  /*
  @patch('/bloodbank', {
    responses: {
      '200': {
        description: 'Bloodbank PATCH success count',
        content: {'application/json': {schema: CountSchema},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bloodbank, {partial: true}),
        },
      },
    })
    bloodbank: Bloodbank,
    @param.where(Bloodbank) where?: Where<Bloodbank>,
  ): Promise<Count> {
    return this.bloodbankRepository.updateAll(bloodbank, where);
  }
*/
  @get('/bloodbank/{bloodbankID}', {
    responses: {
      '200': {
        description: 'Bloodbank model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Bloodbank, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('bloodbankID') bloodbankID: string,
    @param.filter(Bloodbank, {exclude: 'where'})
    filter?: FilterExcludingWhere<Bloodbank>,
  ): Promise<Bloodbank> {
    return this.bloodbankRepository.findById(bloodbankID, filter);
  }
  /*
  @patch('/bloodbank/{bloodbankID}', {
    responses: {
      '204': {
        description: 'Bloodbank PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('bloodbankID') bloodbankID: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bloodbank, {partial: true}),
        },
      },
    })
    bloodbank: Bloodbank,
  ): Promise<void> {
    await this.bloodbankRepository.updateById(bloodbankID, bloodbank);
  }
*/
  @put('/bloodbank/{bloodbankID}', {
    responses: {
      '204': {
        description: 'Bloodbank PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('bloodbankID') bloodbankID: string,
    @requestBody({
      content: {
        'application/json': {
          example: exampleRequest.bloodBankCreateBody,
        },
      },
    })
    bloodbank: any,
  ): Promise<void> {
    // await this.bloodbankRepository.replaceById(bloodbankID, bloodbank);
    await this.sanitizeRequestBody(bloodbank);
    await this.validateData(bloodbank, 'bloodbank');

    //check duplicate email id
    await this.duplicatedCheckForEmailForBloodbank(
      bloodbank.email,
      bloodbankID,
    );
    //check duplicate phonenumber
    await this.duplicatedCheckForPhoneNumberForBloodbank(
      bloodbank.phoneNumber,
      bloodbankID,
    );

    let bloodbankDetail: any = await this.bloodbankRepository.find({
      where: {
        id: bloodbankID,
      },
    });

    if (
      bloodbankDetail &&
      bloodbankDetail[0] &&
      bloodbankDetail[0]['createdAt']
    ) {
      bloodbank.createdAt = bloodbankDetail[0]['createdAt'];
    }

    bloodbank.updatedAt = new Date();

    await this.bloodbankRepository.replaceById(bloodbankID, bloodbank);

    var result: any = await this.bloodbankRepository.findById(bloodbankID, {});

    return {...result};
  }

  @del('/bloodbank/{bloodbankID}', {
    responses: {
      '204': {
        description: 'Bloodbank DELETE success',
      },
    },
  })
  async deleteById(
    @param.path.string('bloodbankID') bloodbankID: string,
  ): Promise<void> {
    //await this.bloodbankRepository.deleteById(bloodbankID);

    let bloodbank: any = {};
    bloodbank = {statusID: constants.status.Delete};
    let result: any = {};
    await this.bloodbankRepository.updateById(bloodbankID, bloodbank);
    result = await this.bloodbankRepository.findById(bloodbankID);
    return {...result};
  }
}
