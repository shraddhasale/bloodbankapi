// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {get, HttpErrors, param} from '@loopback/rest';
import {AdminuserController, UserController} from '.';
import {applicationContext} from '..';
import * as constants from '../constants.json';
import * as el from '../label/error.json';
import {ApikeyRepository, RoleRepository, UrlRepository} from '../repositories';
const jwt = require('jsonwebtoken');
const errorLabel: any = el;
const _ = require('lodash');
const inarray = require('inarray');
const explorerPath = [
  '/explorer/',
  '/explorer/swagger-ui.css',
  '/explorer/swagger-ui-bundle.js',
  '/explorer/swagger-ui-standalone-preset.js',
  '/explorer/openapi.json',
  '/explorer/favicon-32x32.png',
  '/',
  '/favicon.ico',
  '/explorer',
];

const Cryptr = require('cryptr');
const cryptr = new Cryptr(constants.crypto.myTotalySecretKey);

export class AuthController {
  constructor(
    @repository(RoleRepository)
    public roleRepository: RoleRepository,
    @repository(ApikeyRepository)
    public apikeyRepository: ApikeyRepository,
    @repository(UrlRepository)
    public urlRepository: UrlRepository,
  ) {}

  @get('/path/{pathname}/token/{token}', {
    responses: {
      '200': {
        description: 'Verify jwt token',
      },
    },
  })
  async verify(
    @param.path.string('token') token: any,
    @param.path.string('apikey') apikey: any,
    @param.path.string('path') path: any,
    @param.path.string('verb') verb: any,
    @param.path.string('requestUrl') requestUrl: any,
  ): Promise<void> {
    //return;
    //to bypass authentication
    //console.log(token);
    //console.log(apikey);
    // console.log(path);
    //console.log(verb);
    //return;
    if (inarray(explorerPath, path) == true) {
      return;
    }

    //verify jwt token
    if (!token && !apikey) {
      //console.log('unauthrise 1')
      throw new HttpErrors.Unauthorized(errorLabel.httperror.unauthorized);
    }

    let roleID: string;
    if (apikey) {
      //find roleid based on
      const roleResult: any = await this.apikeyRepository.findOne({
        where: {
          apikey: apikey,
          statusID: constants.status.Active,
        },
        fields: {
          id: true,
          roleID: true,
        },
      });
      //console.log(roleResult);
      if (!roleResult) {
        //console.log('unauthrise 2')
        throw new HttpErrors.Unauthorized(errorLabel.httperror.unauthorized);
      } else {
        roleID = roleResult['roleID'];
      }
      console.log(roleID);
      //find role and url is mapped
      // console.log(roleID);
      // console.log(verb);
      // console.log(path);
      // console.log(constants.status.Active);
      const urlResult: any = await this.urlRepository.count({
        roleID: roleID,
        verb: verb,
        endPoint: path,
        statusID: constants.status.Active,
      });
      ////console.log(urlResult)
      if (urlResult.count == 0) {
        //console.log('unauthrise 3')
        throw new HttpErrors.Unauthorized(errorLabel.httperror.forbidden);
      }
    }

    //console.log('token')
    //console.log(token)
    if (token) {
      //decrept token to jwt token
      token = cryptr.decrypt(token);

      await jwt.verify(
        token,
        constants.jwebtokensecret,
        async (err: any, verifiedJwt: any) => {
          if (err) {
            console.log('err in jet token verify method');
            console.log(err);
            if (err.name == 'JsonWebTokenError') {
              //console.log('unauthrise 4')
              throw new HttpErrors.Unauthorized(
                errorLabel.httperror.unauthorized,
              );
            } else if (err.name == 'TokenExpiredError') {
              //console.log('TokenExpiredError')
              //TODO expiry token new token in nee key
              const decoded = jwt.decode(token);
              const claims = _.omit(decoded, ['iat', 'exp']);
              //var newToken = jwt.sign(claims, constants.jwebtokensecret, { expiresIn: 60 * constants.jwttokenexpiryminute });

              let newToken: any;
              //console.log('decoded')
              //console.log(decoded)
              if (decoded.type == constants.userTypeforjwttoken.adminUser) {
                //regenrate token from backend for admin user
                const adminuserController = await applicationContext.get<AdminuserController>(
                  'controllers.AdminuserController',
                );
                newToken = await adminuserController.generateUserToken(
                  decoded['id'],
                );
                newToken = newToken.token;
              } else if (decoded.type == constants.userTypeforjwttoken.user) {
                //regenrate token from backend for user
                const userController = await applicationContext.get<UserController>(
                  'controllers.UserController',
                );
                newToken = await userController.generateUserToken(
                  decoded['id'],
                );
                newToken = newToken.token;
              } else if (
                decoded.type ==
                constants.userTypeforjwttoken.hiddenOrganizationUser
              ) {
                throw new HttpErrors.Unauthorized(errorLabel.tokenExpired);
              }
              let errorMessage = errorLabel.httperror.newToken;
              errorMessage = errorMessage.replace(
                constants.newTokenPlaceHolder,
                newToken,
              );

              //console.log('unauthrise 5')
              throw new HttpErrors.Unauthorized(errorMessage);
            }
          } else {
            // jwt token verified
            //console.log(verifiedJwt);
            if (verifiedJwt.type == constants.userTypeforjwttoken.adminUser) {
              // console.log(verifiedJwt.roleID);
              // console.log(verb);
              // console.log(path);
              // console.log(constants.status.Active);
              const urlResult: any = await this.urlRepository.count({
                roleID: {inq: verifiedJwt.roleID},
                verb: verb,
                endPoint: path,
                statusID: constants.status.Active,
              });
              //console.log('url count')
              //console.log(urlResult)
              if (urlResult.count == 0) {
                throw new HttpErrors.Forbidden(errorLabel.httperror.forbidden);
              }
            }
            //organization user wise access
            else if (verifiedJwt.type == constants.userTypeforjwttoken.user) {
              let organizationInurlFalg = false;
              let roleID = [];
              for (let i = 0; i < verifiedJwt.organization.length; i++) {
                ////console.log(requestUrl)
                if (requestUrl.includes(verifiedJwt.organization[i]['id'])) {
                  organizationInurlFalg = true;
                  roleID = verifiedJwt.organization[i]['roleID'];
                  break;
                }
              }
              // //console.log(organizationInurlFalg);
              // //console.log(roleID);

              if (organizationInurlFalg == false) {
                throw new HttpErrors.Forbidden(errorLabel.httperror.forbidden);
              }
              // //console.log(roleID);
              //check organization user role and url mapping
              const urlResult: any = await this.urlRepository.count({
                roleID: {inq: roleID},
                verb: verb,
                endPoint: path,
                statusID: constants.status.Active,
              });
              ////console.log(urlResult)
              if (urlResult.count == 0) {
                throw new HttpErrors.Forbidden(errorLabel.httperror.forbidden);
              }
            }
          }
        },
      );
    }
  }
}
