import {DefaultCrudRepository} from '@loopback/repository';
import {Hospital, HospitalRelations} from '../models';
import {BloodbankdbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class HospitalRepository extends DefaultCrudRepository<
  Hospital,
  typeof Hospital.prototype.id,
  HospitalRelations
> {
  constructor(
    @inject('datasources.bloodbankdb') dataSource: BloodbankdbDataSource,
  ) {
    super(Hospital, dataSource);
  }
}
