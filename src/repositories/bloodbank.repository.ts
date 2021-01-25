import {DefaultCrudRepository} from '@loopback/repository';
import {Bloodbank, BloodbankRelations} from '../models';
import {BloodbankdbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class BloodbankRepository extends DefaultCrudRepository<
  Bloodbank,
  typeof Bloodbank.prototype.id,
  BloodbankRelations
> {
  constructor(
    @inject('datasources.bloodbankdb') dataSource: BloodbankdbDataSource,
  ) {
    super(Bloodbank, dataSource);
  }
}
