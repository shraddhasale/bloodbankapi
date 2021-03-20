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
import {Role} from '../models/role.model';
import {RoleRepository} from '../repositories';
import * as exampleRequest from './exampleRequest.json';

export class RoleController extends common.CommonComponent {
  constructor(
    @repository(RoleRepository)
    public roleRepository: RoleRepository,
  ) {
    super();
  }

  @post('/role', {
    responses: {
      '200': {
        description: 'Roll model instance',
        content: {'application/json': {schema: getModelSchemaRef(Role)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          example: exampleRequest.roleCreateBody,
        },
      },
    })
    role: any,
  ): Promise<Role> {
    //return this.roleRepository.create(role);
    await this.sanitizeRequestBody(role);
    await this.validateData(role, 'role');

    //check duplicate role name id
    await this.duplicatedCheckForRoleName(role.name, '');

    role.createdAt = new Date();
    role.updatedAt = new Date();

    return this.roleRepository.create(role);
  }

  @get('/role/count', {
    responses: {
      '200': {
        description: 'Roll model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(@param.where(Role) where?: Where<Role>): Promise<Count> {
    return this.roleRepository.count(where);
  }

  @get('/role', {
    responses: {
      '200': {
        description: 'Array of Roll model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Role, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(@param.filter(Role) filter?: any): Promise<Role[]> {
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
      filter.fields = constants.defaultFieldsForRoll; //change per controller fields
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
    result.data = await this.roleRepository.find(filter);
    count = await this.roleRepository.count(where);
    result.count = count.count;

    return result;
    //  return this.roleRepository.find(filter);
  }
  /*
    @patch('/role', {
      responses: {
        '200': {
          description: 'Roll PATCH success count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async updateAll(
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(Role, {partial: true}),
          },
        },
      })
      roll: Role,
      @param.where(Role) where?: Where<Role>,
    ): Promise<Count> {
      return this.roleRepository.updateAll(role, where);
    }
  */
  @get('/role/{roleID}', {
    responses: {
      '200': {
        description: 'Roll model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Role, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findByroleID(
    @param.path.string('roleID') roleID: string,
    @param.filter(Role, {exclude: 'where'}) filter?: FilterExcludingWhere<Role>,
  ): Promise<Role> {
    return this.roleRepository.findById(roleID, filter);
  }
  /*
    @patch('/role/{roleID}', {
      responses: {

        '204': {
          description: 'Roll PATCH success',
        },
      },
    })
    async updateByroleID(
      @param.path.string('roleID') roleID: string,
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(Role, {partial: true}),
          },
        },
      })
      roll: Role,
    ): Promise<voroleID> {
      await this.roleRepository.updateByID(id, roleID);
    }
  */
  @put('/role/{roleID}', {
    responses: {
      '204': {
        description: 'Roll PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('roleID') roleID: string,
    @requestBody({
      content: {
        'application/json': {
          example: exampleRequest.roleCreateBody,
        },
      },
    })
    role: any,
  ): Promise<void> {
    //await this.roleRepository.replaceById(roleID, roll);

    await this.sanitizeRequestBody(role);
    await this.validateData(role, 'role');

    //check duplicate email id
    await this.duplicatedCheckForEmail(role.name, roleID);
    //check duplicate phonenumber
    await this.duplicatedCheckForPhoneNumber(role.name, roleID);

    let roleDetail: any = await this.roleRepository.find({
      where: {
        id: roleID,
      },
    });

    if (roleDetail && roleDetail[0] && roleDetail[0]['createdAt']) {
      role.createdAt = roleDetail[0]['createdAt'];
    }

    role.updatedAt = new Date();

    await this.roleRepository.replaceById(roleID, role);

    var result: any = await this.roleRepository.findById(roleID, {});

    return {...result};
  }

  @del('/role/{roleID}', {
    responses: {
      '204': {
        description: 'Roll DELETE success',
      },
    },
  })
  async deleteBy(@param.path.string('roleID') roleID: string): Promise<void> {
    //await this.roleRepository.deleteById(roleID);

    let role: any = {};
    role = {statusID: constants.status.Delete};
    let result: any = {};
    await this.roleRepository.updateById(roleID, role);
    result = await this.roleRepository.findById(roleID);
    return {...result};
  }
}
