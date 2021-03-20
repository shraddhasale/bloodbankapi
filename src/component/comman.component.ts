import {Component} from '@loopback/core';
import {HttpErrors} from '@loopback/rest';
import {applicationContext} from '..';
import * as constants from '../constants.json';
import {
  AdminuserController,
  ApikeyController,
  BloodbankController,
  RoleController,
  UrlController,
  UserController,
} from '../controllers';
import * as el from '../label/error.json';
import {} from '../repositories';

const Joi = require('@hapi/joi');
const xss = require('xss');
const errorLabel: any = el;
/**
 * This component handle the validation or calculation
 */
export class CommonComponent implements Component {
  constructor() {}

  private readonly schemaObjForCreateAdminUser = Joi.object({
    firstName: Joi.string()
      .trim()
      .required()
      .error(() => errorLabel.adminUser.firstName),
    lastName: Joi.string()
      .trim()
      .required()
      .error(() => errorLabel.adminUser.lastName),
    password: Joi.string()
      .trim()
      .required()
      .error(() => errorLabel.adminUser.password),
    roleID: Joi.array()
      .empty()
      .error(() => errorLabel.adminUser.roleID),
    email: Joi.string()
      .email({})
      .error(() => errorLabel.adminUser.email),
    phoneNumber: Joi.string()
      .trim()
      .length(10)
      .error(() => errorLabel.adminUser.phoneNumber),
    statusID: Joi.number()
      .required()
      .error(() => errorLabel.adminUser.statusID),
  });

  private readonly schemaObjForCreateRole = Joi.object({
    name: Joi.string()
      .trim()
      .required()
      .error(() => errorLabel.role.name),
    statusID: Joi.number()
      .required()
      .error(() => errorLabel.role.statusID),
  });

  private readonly schemaObjForCreateAPIKEY = Joi.object({
    name: Joi.string()
      .trim()
      .required()
      .error(() => errorLabel.apikey.name),
    apikey: Joi.string()
      .trim()
      .required()
      .error(() => errorLabel.apikey.apikey),
    roleID: Joi.string()
      .trim()
      .required()
      .error(() => errorLabel.apikey.roleID),
    statusID: Joi.number()
      .required()
      .error(() => errorLabel.url.statusID),
  });

  private readonly schemaObjForCreateURL = Joi.object({
    name: Joi.string()
      .trim()
      .required()
      .error(() => errorLabel.url.name),
    verb: Joi.string()
      .trim()
      .required()
      .error(() => errorLabel.url.method),
    endPoint: Joi.string()
      .required()
      .error(() => errorLabel.url.endPoint),
    roleID: Joi.array()
      .empty()
      .error(() => errorLabel.url.roleID),
    statusID: Joi.number()
      .required()
      .error(() => errorLabel.url.statusID),
  });

  private readonly schemaObjForCreateBloodBank = Joi.object({
    firstName: Joi.string()
      .trim()
      .required()
      .error(() => errorLabel.bloodbank.firstName),
    lastName: Joi.string()
      .trim()
      .required()
      .error(() => errorLabel.bloodbank.lastName),
    email: Joi.string()
      .email({})
      .error(() => errorLabel.bloodbank.email),
    phoneNumber: Joi.string()
      .required()
      .error(() => errorLabel.bloodbank.phoneNumber),
    address: Joi.object()
      .empty()
      .error(() => errorLabel.bloodbank.address),
    thumbnail: Joi.string()
      .empty()
      .error(() => errorLabel.bloodbank.thumbnail),
    statusID: Joi.number()
      .required()
      .error(() => errorLabel.bloodbank.statusID),
  });

  private readonly schemaObjForCreateUser = Joi.object({
    firstName: Joi.string()
      .trim()
      .required()
      .error(() => errorLabel.user.firstName),
    lastName: Joi.string()
      .trim()
      .required()
      .error(() => errorLabel.user.lastName),
    password: Joi.string()
      .trim()
      .required()
      .error(() => errorLabel.user.password),
    email: Joi.string()
      .email({})
      .error(() => errorLabel.user.email),
    phoneNumber: Joi.string()
      .required()
      .error(() => errorLabel.user.phoneNumber),
    address: Joi.object()
      .empty()
      .error(() => errorLabel.user.address),
    username: Joi.string()
      .empty()
      .error(() => errorLabel.user.username),
    bloodgroup: Joi.string()
      .empty()
      .error(() => errorLabel.user.bloodgroup),
    gender: Joi.string()
      .empty()
      .error(() => errorLabel.user.gender),
    dob: Joi.string()
      .empty()
      .error(() => errorLabel.user.dob),
    nationality: Joi.string()
      .empty()
      .error(() => errorLabel.user.nationality),
    panCard: Joi.string()
      .empty()
      .error(() => errorLabel.user.panCard),
    adharCard: Joi.string()
      .empty()
      .error(() => errorLabel.user.adharCard),
    statusID: Joi.number()
      .required()
      .error(() => errorLabel.user.statusID),
  });

  private readonly schemaObjForCreatUserbloodbankdonate = Joi.object({
    userID: Joi.string()
      .trim()
      .required()
      .error(() => errorLabel.userbloodbankdonate.userID),
    bloodBankID: Joi.string()
      .trim()
      .required()
      .error(() => errorLabel.userbloodbankdonate.bloodbankID),
    paidAmount: Joi.number()
      .required()
      .error(() => errorLabel.userbloodbankdonate.paidAmount),
    paidStatus: Joi.number()
      .required()
      .error(() => errorLabel.userbloodbankdonate.paidStatus),
    statusID: Joi.number()
      .required()
      .error(() => errorLabel.userbloodbankdonate.statusID),
  });

  private readonly schemaObjForCreatUserbloodbankrequest = Joi.object({
    userID: Joi.string()
      .trim()
      .required()
      .error(() => errorLabel.userbloodbankrequest.userID),
    bloodBankID: Joi.string()
      .trim()
      .required()
      .error(() => errorLabel.userbloodbankrequest.bloodbankID),
    requestFor: Joi.string()
      .required()
      .error(() => errorLabel.userbloodbankrequest.requestFor),
    isHospitalize: Joi.string()
      .required()
      .error(() => errorLabel.userbloodbankrequest.isHospitalize),
    statusID: Joi.number()
      .required()
      .error(() => errorLabel.userbloodbankrequest.statusID),
  });

  private readonly schemaObjForAdminUserLogin = Joi.object({
    phoneNumber: Joi.string()
      .trim()
      .length(10)
      .error(() => errorLabel.adminUser.phoneNumber),
    password: Joi.string()
      .trim()
      .min(8)
      .required()
      .error(() => errorLabel.adminUser.password),
  });

  //global validate function for joi validation
  protected validateData(data: object, schemaname: string): void {
    let result: any = {};

    switch (schemaname) {
      case 'adminUser':
        result = this.schemaObjForCreateAdminUser.validate(data);
        break;

      case 'role':
        result = this.schemaObjForCreateRole.validate(data);
        break;

      case 'apikey':
        result = this.schemaObjForCreateAPIKEY.validate(data);
        break;

      case 'url':
        result = this.schemaObjForCreateURL.validate(data);
        break;

      case 'bloodbank':
        result = this.schemaObjForCreateBloodBank.validate(data);
        break;

      case 'user':
        result = this.schemaObjForCreateUser.validate(data);
        break;

      case 'userbloodbankdonate':
        result = this.schemaObjForCreatUserbloodbankdonate.validate(data);
        break;

      case 'userbloodbankrequest':
        result = this.schemaObjForCreatUserbloodbankrequest.validate(data);
        break;

      case 'adminUserLogin':
        result = this.schemaObjForAdminUserLogin.validate(data);
        break;
    }

    if (!(result && result.error === null)) {
      throw new HttpErrors.UnprocessableEntity(
        result.error.details[0].message.replace(/"/g, ''),
      );
    }
  }

  //sanitize request body - xss filter
  protected sanitizeRequestBody(data: any) {
    try {
      const strData = xss(JSON.stringify(data));
      const jsonData = JSON.parse(strData);
      return jsonData;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  protected async duplicatedCheckForEmail(
    email: string,
    id: string,
  ): Promise<void> {
    let filter: any = {};
    if (id == undefined) {
      filter = {
        where: {
          email: email,
          statusID: {inq: [constants.status.Active, constants.status.Inactive]},
        },
      };
    } else {
      filter = {
        where: {
          id: {nin: [id]},
          email: email,
          statusID: {inq: [constants.status.Active, constants.status.Inactive]},
        },
      };
    }

    const adminuserController = await applicationContext.get<AdminuserController>(
      'controllers.AdminuserController',
    );
    let Result: any = {};
    Result = await adminuserController.find(filter);

    if (Result.data && Result.count != 0) {
      throw new HttpErrors.UnprocessableEntity(
        errorLabel.adminUser.dublicateEmailExist,
      );
    }
  }

  protected async duplicatedCheckForURL(data: any, id: string): Promise<void> {
    let filter: any = {};
    if (id == undefined) {
      filter = {
        where: {
          name: data.name,
          endPoint: data.endPoint,
          verb: data.verb,
          statusID: {inq: [constants.status.Active, constants.status.Inactive]},
        },
      };
    } else {
      filter = {
        where: {
          id: {nin: [id]},
          name: data.name,
          url: data.url,
          method: data.method,
          statusID: {inq: [constants.status.Active, constants.status.Inactive]},
        },
      };
    }

    const urlController = await applicationContext.get<UrlController>(
      'controllers.UrlController',
    );
    let Result: any = {};
    Result = await urlController.find(filter);

    if (Result.data && Result.count != 0) {
      throw new HttpErrors.UnprocessableEntity(
        errorLabel.url.duplicateURlExist,
      );
    }
  }
  protected async checkRoleIdIsvalid(roleID: any): Promise<void> {
    const filter = {
      where: {
        id: {inq: roleID},
        statusID: {inq: [constants.status.Active]},
      },
      limit: constants.internalQueryLimit,
    };

    const roleController = await applicationContext.get<RoleController>(
      'controllers.RoleController',
    );

    const Result: any = await roleController.find(filter);
    if (Result.count != roleID.length) {
      throw new HttpErrors.UnprocessableEntity(errorLabel.role.roleNotExist);
    }
  }

  protected async duplicatedCheckForPhoneNumber(
    phoneNumber: string,
    id: string,
  ): Promise<void> {
    let filter: any = {};
    if (id == undefined) {
      filter = {
        where: {
          phoneNumber: phoneNumber,
          statusID: {inq: [constants.status.Active, constants.status.Inactive]},
        },
      };
    } else {
      filter = {
        where: {
          id: {nin: [id]},
          phoneNumber: phoneNumber,
          statusID: {inq: [constants.status.Active, constants.status.Inactive]},
        },
      };
    }

    const adminuserController = await applicationContext.get<AdminuserController>(
      'controllers.AdminuserController',
    );
    let Result: any = {};
    Result = await adminuserController.find(filter);

    if (Result.data && Result.count != 0) {
      throw new HttpErrors.UnprocessableEntity(
        errorLabel.adminUser.dublicatePhoneNumberExists,
      );
    }
  }

  protected async duplicatedCheckForPhoneNumberForBloodbank(
    phoneNumber: string,
    id: string,
  ): Promise<void> {
    let filter: any = {};
    if (id == undefined) {
      filter = {
        where: {
          phoneNumber: phoneNumber,
          statusID: {inq: [constants.status.Active, constants.status.Inactive]},
        },
      };
    } else {
      filter = {
        where: {
          id: {nin: [id]},
          phoneNumber: phoneNumber,
          statusID: {inq: [constants.status.Active, constants.status.Inactive]},
        },
      };
    }

    const bloodbankController = await applicationContext.get<BloodbankController>(
      'controllers.BloodbankController',
    );
    let Result: any = {};
    Result = await bloodbankController.find(filter);

    if (Result.data && Result.count != 0) {
      throw new HttpErrors.UnprocessableEntity(
        errorLabel.bloodbank.dublicatePhoneNumberExists,
      );
    }
  }

  protected async duplicatedCheckForUserEmail(
    email: string,
    id: string,
  ): Promise<void> {
    let filter: any = {};
    if (id == undefined) {
      filter = {
        where: {
          email: email,
          statusID: {inq: [constants.status.Active, constants.status.Inactive]},
        },
      };
    } else {
      filter = {
        where: {
          id: {nin: [id]},
          email: email,
          statusID: {inq: [constants.status.Active, constants.status.Inactive]},
        },
      };
    }

    const userController = await applicationContext.get<UserController>(
      'controllers.UserController',
    );
    let Result: any = {};
    Result = await userController.find(filter);

    if (Result.data && Result.count != 0) {
      throw new HttpErrors.UnprocessableEntity(
        errorLabel.bloodbank.dublicateEmailExist,
      );
    }
  }

  protected async duplicatedCheckForUserPhoneNumber(
    phoneNumber: string,
    id: string,
  ): Promise<void> {
    let filter: any = {};
    if (id == undefined) {
      filter = {
        where: {
          phoneNumber: phoneNumber,
          statusID: {inq: [constants.status.Active, constants.status.Inactive]},
        },
      };
    } else {
      filter = {
        where: {
          id: {nin: [id]},
          phoneNumber: phoneNumber,
          statusID: {inq: [constants.status.Active, constants.status.Inactive]},
        },
      };
    }

    const userController = await applicationContext.get<UserController>(
      'controllers.UserController',
    );
    let Result: any = {};
    Result = await userController.find(filter);

    if (Result.data && Result.count != 0) {
      throw new HttpErrors.UnprocessableEntity(
        errorLabel.user.dublicatePhoneNumberExists,
      );
    }
  }

  protected async duplicatedCheckForUserName(
    username: string,
    id: string,
  ): Promise<void> {
    let filter: any = {};
    if (id == undefined) {
      filter = {
        where: {
          username: username,
          statusID: {inq: [constants.status.Active, constants.status.Inactive]},
        },
      };
    } else {
      filter = {
        where: {
          id: {nin: [id]},
          username: username,
          statusID: {inq: [constants.status.Active, constants.status.Inactive]},
        },
      };
    }

    const userController = await applicationContext.get<UserController>(
      'controllers.UserController',
    );
    let Result: any = {};
    Result = await userController.find(filter);

    if (Result.data && Result.count != 0) {
      throw new HttpErrors.UnprocessableEntity(
        errorLabel.user.dublicateUserNameExists,
      );
    }
  }

  protected async duplicatedCheckForEmailForBloodbank(
    email: string,
    id: string,
  ): Promise<void> {
    let filter: any = {};
    if (id == undefined) {
      filter = {
        where: {
          email: email,
          statusID: {inq: [constants.status.Active, constants.status.Inactive]},
        },
      };
    } else {
      filter = {
        where: {
          id: {nin: [id]},
          email: email,
          statusID: {inq: [constants.status.Active, constants.status.Inactive]},
        },
      };
    }

    const userController = await applicationContext.get<UserController>(
      'controllers.UserController',
    );
    let Result: any = {};
    Result = await userController.find(filter);

    if (Result.data && Result.count != 0) {
      throw new HttpErrors.UnprocessableEntity(
        errorLabel.user.dublicateEmailExist,
      );
    }
  }

  protected async duplicatedCheckForRoleName(
    name: string,
    id: string,
  ): Promise<void> {
    let filter: any = {};
    if (id == undefined) {
      filter = {
        where: {
          name: name,
          statusID: {inq: [constants.status.Active, constants.status.Inactive]},
        },
      };
    } else {
      filter = {
        where: {
          id: {nin: [id]},
          name: name,
          statusID: {inq: [constants.status.Active, constants.status.Inactive]},
        },
      };
    }

    const roleController = await applicationContext.get<RoleController>(
      'controllers.RoleController',
    );
    let Result: any = {};
    Result = await roleController.find(filter);

    if (Result.data && Result.count != 0) {
      throw new HttpErrors.UnprocessableEntity(
        errorLabel.role.dublicateRoleExists,
      );
    }
  }

  protected async duplicatedCheckForRoleAPIKEY(
    name: string,
    id: string,
  ): Promise<void> {
    let filter: any = {};
    if (id == undefined) {
      filter = {
        where: {
          name: name,
          statusID: {inq: [constants.status.Active, constants.status.Inactive]},
        },
      };
    } else {
      filter = {
        where: {
          id: {nin: [id]},
          name: name,
          statusID: {inq: [constants.status.Active, constants.status.Inactive]},
        },
      };
    }

    const apikeyController = await applicationContext.get<ApikeyController>(
      'controllers.ApikeyController',
    );
    let Result: any = {};
    Result = await apikeyController.find(filter);

    if (Result.data && Result.count != 0) {
      throw new HttpErrors.UnprocessableEntity(
        errorLabel.apikey.dublicateAPIKEYExists,
      );
    }
  }

  protected async checkUserisValid(userID: any): Promise<void> {
    const filter = {
      where: {
        id: {inq: [userID]},
        statusID: {inq: [constants.status.Active]},
      },
      limit: constants.internalQueryLimit,
    };

    const userController = await applicationContext.get<UserController>(
      'controllers.UserController',
    );

    const Result: any = await userController.find(filter);
    if (Result.count == 0) {
      throw new HttpErrors.UnprocessableEntity(
        errorLabel.userbloodbankdonate.userNotExist,
      );
    }
  }

  protected async checkBloodBankisValid(userID: any): Promise<void> {
    const filter = {
      where: {
        id: {inq: [userID]},
        statusID: {inq: [constants.status.Active]},
      },
      limit: constants.internalQueryLimit,
    };

    const bloodbankController = await applicationContext.get<BloodbankController>(
      'controllers.BloodbankController',
    );

    const Result: any = await bloodbankController.find(filter);
    if (Result.count == 0) {
      throw new HttpErrors.UnprocessableEntity(
        errorLabel.userbloodbankdonate.bloodbankNotExist,
      );
    }
  }
}
