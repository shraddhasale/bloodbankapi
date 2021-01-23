import {DefaultCrudRepository} from '@loopback/repository';
import {Userregister, UserregisterRelations} from '../models';
import {BloodbankdbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UserregisterRepository extends DefaultCrudRepository<
  Userregister,
  typeof Userregister.prototype.id,
  UserregisterRelations
> {
  constructor(
    @inject('datasources.bloodbankdb') dataSource: BloodbankdbDataSource,
  ) {
    super(Userregister, dataSource);
  }
}
