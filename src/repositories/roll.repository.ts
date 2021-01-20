import {DefaultCrudRepository} from '@loopback/repository';
import {Roll, RollRelations} from '../models';
import {BloodbankdbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class RollRepository extends DefaultCrudRepository<
  Roll,
  typeof Roll.prototype.id,
  RollRelations
> {
  constructor(
    @inject('datasources.bloodbankdb') dataSource: BloodbankdbDataSource,
  ) {
    super(Roll, dataSource);
  }
}
