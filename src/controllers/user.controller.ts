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
  HttpErrors,
  param,
  patch,
  post,
  put,
  requestBody,
} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {compare, genSalt, hash} from 'bcryptjs';
import * as common from '../component/comman.component';
import * as constants from '../constants.json';
import * as el from '../label/error.json';
import {User} from '../models';
import {UserRepository} from '../repositories';
import * as exampleRequest from './exampleRequest.json';
const emailRegx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const errorLabel: any = el;

const jwt = require('jsonwebtoken');
const Cryptr = require('cryptr');
const cryptr = new Cryptr(constants.crypto.myTotalySecretKey);
const moment = require('moment');

export class UserController extends common.CommonComponent {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) {
    super();
  }

  @post('/user', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(User)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          example: exampleRequest.userCreateBody,
        },
      },
    })
    user: any,
  ): Promise<User> {
    //return this.userRepository.create(user);

    await this.sanitizeRequestBody(user);
    await this.validateData(user, 'user');

    //check duplicate email id
    await this.duplicatedCheckForUserEmail(user.email, '');
    //check duplicate phonenumber
    await this.duplicatedCheckForUserPhoneNumber(user.phoneNumber, '');
    //check duplicate username
    await this.duplicatedCheckForUserName(user.username, '');
    //check role exists
    user.roleID = [constants.userRoleID];
    if (user.roleID && user.roleID.length > 0) {
      await this.checkRoleIdIsvalid(user.roleID);
    }

    user.password = await hash(user.password, await genSalt());

    user.createdAt = new Date();
    user.updatedAt = new Date();

    return this.userRepository.create(user);
  }

  @get('/user/count', {
    responses: {
      '200': {
        description: 'User model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(@param.where(User) where?: Where<User>): Promise<Count> {
    return this.userRepository.count(where);
  }

  @get('/user', {
    responses: {
      '200': {
        description: 'Array of User model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(User, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(@param.filter(User) filter?: any): Promise<User[]> {
    //return this.userRepository.find(filter);
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
      filter.fields = constants.defaultFieldsForUser; //change per controller fields
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

    result.data = await this.userRepository.find(filter);
    count = await this.userRepository.count(where);
    result.count = count.count;

    /**********************************find relation data end here************************************************************* */
    return result;
  }

  @patch('/user', {
    responses: {
      '200': {
        description: 'User PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
    @param.where(User) where?: Where<User>,
  ): Promise<Count> {
    return this.userRepository.updateAll(user, where);
  }

  @get('/user/{userID}', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(User, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('userID') userID: string,
    @param.filter(User, {exclude: 'where'}) filter?: FilterExcludingWhere<User>,
  ): Promise<User> {
    return this.userRepository.findById(userID, filter);
  }

  @patch('/user/{userID}', {
    responses: {
      '204': {
        description: 'User PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('userID') userID: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
  ): Promise<void> {
    await this.userRepository.updateById(userID, user);
  }

  @put('/user/{userID}', {
    responses: {
      '204': {
        description: 'User PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('userID') userID: string,
    @requestBody({
      content: {
        'application/json': {
          example: exampleRequest.userCreateBody,
        },
      },
    })
    user: any,
  ): Promise<void> {
    // await this.userRepository.replaceById(userID, user);
    await this.sanitizeRequestBody(user);
    await this.validateData(user, 'user');

    //check duplicate email id
    await this.duplicatedCheckForUserEmail(user.email, '');
    //check duplicate phonenumber
    await this.duplicatedCheckForUserPhoneNumber(user.phoneNumber, '');
    //check duplicate username
    await this.duplicatedCheckForUserName(user.username, '');
    //check role exists
    user.roleID = [constants.userRoleID];
    if (user.roleID && user.roleID.length > 0) {
      await this.checkRoleIdIsvalid(user.roleID);
    }

    let userDetail: any = await this.userRepository.find({
      where: {
        id: userID,
      },
    });

    if (userDetail && userDetail[0] && userDetail[0]['createdAt']) {
      user.createdAt = userDetail[0]['createdAt'];
    }

    user.updatedAt = new Date();

    await this.userRepository.replaceById(userID, user);

    var result: any = await this.userRepository.findById(userID, {});

    return {...result};
  }

  @del('/user/{userID}', {
    responses: {
      '204': {
        description: 'User DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('userID') userID: string): Promise<void> {
    //await this.userRepository.deleteById(id);

    let user: any = {};
    user = {statususerID: constants.status.Delete};
    let result: any = {};
    await this.userRepository.updateById(userID, user);
    result = await this.userRepository.findById(userID);
    return {...result};
  }

  @post('/user/login', {
    responses: {
      '200': {
        description: 'User Login success',
      },
    },
  })
  async login(
    @requestBody({
      content: {
        'application/json': {
          example: exampleRequest.userLogin,
        },
      },
    })
    adminUserLoginRequest: any,
  ): Promise<User> {
    try {
      console.log('inside admin user start === ' + moment());
      adminUserLoginRequest = this.sanitizeRequestBody(adminUserLoginRequest);
      this.validateData(adminUserLoginRequest, 'adminUserLogin');
      //login c=start from here
      const foundUser = await this.userRepository.findOne({
        where: {phoneNumber: adminUserLoginRequest.phoneNumber, statusID: 1},
        fields: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phoneNumber: true,
          roleID: true,
          password: true,
        },
      });
      if (!foundUser) {
        throw new HttpErrors.Unauthorized(
          errorLabel.user.invalidCredentialsError,
        );
      }
      const passwordMatched = await compare(
        adminUserLoginRequest.password,
        foundUser.password,
      );
      if (!passwordMatched) {
        throw new HttpErrors.Unauthorized(
          errorLabel.user.invalidCredentialsError,
        );
      }
      var token = await this.generateUserToken(foundUser.id);
      var result: any = {};

      result = token;
      console.log('inside user end === ' + moment());
      return {...result};
    } catch (err) {
      throw err;
    }
  }

  //function for adminUser token
  public async generateUserToken(userID: any): Promise<void> {
    const foundUser = await this.userRepository.findOne({
      where: {
        id: userID,
      },
      fields: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
        roleID: true,
      },
    });

    if (!foundUser) {
      throw new HttpErrors.Unauthorized(
        errorLabel.user.invalidCredentialsError,
      );
    }

    // convert a User object into a UserProfile object (reduced set of properties)
    const userProfile = this.convertToUserProfile(foundUser);

    let token = jwt.sign(userProfile, constants.jwebtokensecret, {
      expiresIn: 60 * constants.jwttokenexpiryminuteAdmin,
    });

    token = cryptr.encrypt(token);
    var finalResult: any = {};
    finalResult = foundUser;
    finalResult.token = token;

    return {...finalResult};
  }

  convertToUserProfile(user: any): UserProfile {
    return {
      [securityId]: user.id.toString(),
      type: constants.userTypeforjwttoken.user,
      firstname: user.firstName,
      lastName: user.firstName,
      id: user.id.toString(),
      roleID: user.roleID,
      email: user.email,
      phoneNumber: user.phoneNumber,
    };
  }
}
