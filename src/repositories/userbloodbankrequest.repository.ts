import {DefaultCrudRepository} from '@loopback/repository';
import {Userbloodbankrequest, UserbloodbankrequestRelations} from '../models';
import {BloodbankdbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UserbloodbankrequestRepository extends DefaultCrudRepository<
  Userbloodbankrequest,
  typeof Userbloodbankrequest.prototype.id,
  UserbloodbankrequestRelations
> {
  constructor(
    @inject('datasources.bloodbankdb') dataSource: BloodbankdbDataSource,
  ) {
    super(Userbloodbankrequest, dataSource);
  }
}
