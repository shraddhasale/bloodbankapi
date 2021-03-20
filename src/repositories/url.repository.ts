import {DefaultCrudRepository} from '@loopback/repository';
import {Url, UrlRelations} from '../models';
import {BloodbankdbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UrlRepository extends DefaultCrudRepository<
  Url,
  typeof Url.prototype.id,
  UrlRelations
> {
  constructor(
    @inject('datasources.bloodbankdb') dataSource: BloodbankdbDataSource,
  ) {
    super(Url, dataSource);
  }
}
