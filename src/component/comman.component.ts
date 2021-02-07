import {Component} from '@loopback/core';
import {HttpErrors} from '@loopback/rest';
import {applicationContext} from '..';
import * as constants from '../constants.json';
import {AdminuserController} from '../controllers';
import * as el from '../label/error.json';
import { } from '../repositories';
const Joi = require('@hapi/joi');
const xss = require('xss');
const errorLabel: any = el;
/**
 * This component handle the validation or calculation
 */
export class CommonComponent implements Component {
  constructor(

  ) { }



  private readonly schemaObjForCreateAdminUser = Joi.object({
    firstName: Joi.string()
      .trim()
      .required()
      .error(() => errorLabel.adminUser.firstName),
    lastName: Joi.string()
      .trim()
      .required()
      .error(() => errorLabel.adminUser.lastName),
    rollID: Joi.array()
      .empty()
      .error(() => errorLabel.adminUser.rollID),
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

  //global validate function for joi validation
  protected validateData(data: object, schemaname: string): void {
    let result: any = {};

    switch (schemaname) {
      case 'adminUser':
        result = this.schemaObjForCreateAdminUser.validate(data);
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

  protected async duplicatedCheckForEmail(email: string, id: string): Promise<void> {
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

    const adminuserController = await applicationContext.get<
      AdminuserController
    >('controllers.AdminuserController');
    let Result: any = {};
    Result = await adminuserController.find(filter);

    if (Result.data && Result.count != 0) {
      throw new HttpErrors.UnprocessableEntity(
        errorLabel.adminUser.dublicateEmailExist,
      );
    }
  }


  protected async duplicatedCheckForPhoneNumber(phoneNumber: string, id: string): Promise<void> {
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

    const adminuserController = await applicationContext.get<
      AdminuserController
    >('controllers.AdminuserController');
    let Result: any = {};
    Result = await adminuserController.find(filter);

    if (Result.data && Result.count != 0) {
      throw new HttpErrors.UnprocessableEntity(
        errorLabel.adminUser.dublicatePhoneNumberExists,
      );
    }
  }

}
