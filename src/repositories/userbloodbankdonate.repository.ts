import {DefaultCrudRepository} from '@loopback/repository';
import {Userbloodbankdonate, UserbloodbankdonateRelations} from '../models';
import {BloodbankdbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UserbloodbankdonateRepository extends DefaultCrudRepository<
  Userbloodbankdonate,
  typeof Userbloodbankdonate.prototype.id,
  UserbloodbankdonateRelations
> {
  constructor(
    @inject('datasources.bloodbankdb') dataSource: BloodbankdbDataSource,
  ) {
    super(Userbloodbankdonate, dataSource);
  }
}
