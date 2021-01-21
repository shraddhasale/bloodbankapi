import {DefaultCrudRepository} from '@loopback/repository';
import {Adminuser, AdminuserRelations} from '../models';
import {BloodbankdbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AdminuserRepository extends DefaultCrudRepository<
  Adminuser,
  typeof Adminuser.prototype.id,
  AdminuserRelations
> {
  constructor(
    @inject('datasources.bloodbankdb') dataSource: BloodbankdbDataSource,
  ) {
    super(Adminuser, dataSource);
  }
}
