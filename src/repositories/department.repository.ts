import {DefaultCrudRepository} from '@loopback/repository';
import {Department, DepartmentRelations} from '../models';
import {BloodbankdbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class DepartmentRepository extends DefaultCrudRepository<
  Department,
  typeof Department.prototype.hospitalid,
  DepartmentRelations
> {
  constructor(
    @inject('datasources.bloodbankdb') dataSource: BloodbankdbDataSource,
  ) {
    super(Department, dataSource);
  }
}
