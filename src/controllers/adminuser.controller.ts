import {
  Count,
  CountSchema,

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
import * as common from '../component/comman.component';
import * as constants from '../constants.json';
import {Adminuser} from '../models';
import {AdminuserRepository} from '../repositories';
import * as exampleRequest from './exampleRequest.json';
const emailRegx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export class AdminuserController extends common.CommonComponent {
  constructor(
    @repository(AdminuserRepository)
    public adminuserRepository: AdminuserRepository,
  ) {
    super()
  }

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

    await this.sanitizeRequestBody(adminuser);
    await this.validateData(adminuser, 'adminUser');

    //check duplicate email id
    await this.duplicatedCheckForEmail(adminuser.email, '');
    //check duplicate phonenumber
    await this.duplicatedCheckForPhoneNumber(adminuser.phoneNumber, '');

    adminuser.createdAt = new Date();
    adminuser.upadatedAt = new Date();

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
    @param.filter(Adminuser) filter?: any,
  ): Promise<Adminuser[]> {
    /*************************Default param for find start here************************************** */
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
      filter.fields = constants.defaultFieldsForAdminUser;  //change per controller fields
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

    //console.log(filter)
    /*****************************Default param for find end here********************************** */
    /********************************findRelation data start here*************************************************************** */
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

    result.data = await this.adminuserRepository.find(filter);
    count = await this.adminuserRepository.count(where);
    result.count = count.count;



    /**********************************find relation data end here************************************************************* */
    return result;

    //return this.adminuserRepository.find(filter);
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

  @put('/adminuser/{adminuserID}', {
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

    await this.sanitizeRequestBody(adminuser);
    await this.validateData(adminuser, 'adminUser');

    //check duplicate email id
    await this.duplicatedCheckForEmail(adminuser.email, adminuserID);
    //check duplicate phonenumber
    await this.duplicatedCheckForPhoneNumber(adminuser.phoneNumber, adminuserID);

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
