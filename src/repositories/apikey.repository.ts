import {DefaultCrudRepository} from '@loopback/repository';
import {Apikey, ApikeyRelations} from '../models';
import {BloodbankdbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ApikeyRepository extends DefaultCrudRepository<
  Apikey,
  typeof Apikey.prototype.id,
  ApikeyRelations
> {
  constructor(
    @inject('datasources.bloodbankdb') dataSource: BloodbankdbDataSource,
  ) {
    super(Apikey, dataSource);
  }
}
