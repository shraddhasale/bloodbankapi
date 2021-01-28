import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, post,




  put,

  requestBody
} from '@loopback/rest';
import {Department} from '../models';
import {DepartmentRepository} from '../repositories';

export class DepartmentController {
  constructor(
    @repository(DepartmentRepository)
    public departmentRepository : DepartmentRepository,
  ) {}

  @post('/department', {
    responses: {
      '200': {
        description: 'Department model instance',
        content: {'application/json': {schema: getModelSchemaRef(Department)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Department, {
            title: 'NewDepartment',
            exclude: ['id'],
          }),
        },
      },
    })
    department: Omit<Department, 'id'>,
  ): Promise<Department> {
    return this.departmentRepository.create(department);
  }

  @get('/department/count', {
    responses: {
      '200': {
        description: 'Department model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Department) where?: Where<Department>,
  ): Promise<Count> {
    return this.departmentRepository.count(where);
  }

  @get('/department', {
    responses: {
      '200': {
        description: 'Array of Department model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Department, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Department) filter?: Filter<Department>,
  ): Promise<Department[]> {
    return this.departmentRepository.find(filter);
  }
/*
  @patch('/department', {
    responses: {
      '200': {
        description: 'Department PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Department, {partial: true}),
        },
      },
    })
    department: Department,
    @param.where(Department) where?: Where<Department>,
  ): Promise<Count> {
    return this.departmentRepository.updateAll(department, where);
  }
*/
  @get('/department/{departmentID}', {
    responses: {
      '200': {
        description: 'Department model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Department, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('departmentID') departmentID:string,
    @param.filter(Department, {exclude: 'where'}) filter?: FilterExcludingWhere<Department>
  ): Promise<Department> {
    return this.departmentRepository.findById(departmentID, filter);
  }
/*
  @patch('/department/{departmentID}',
    responses: {
      '204': {
        description: 'Department PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('departmentID') departmentdepartmentID: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Department, {partial: true}),
        },
      },
    })
    department: Department,
  ): Promise<void> {
    await this.departmentRepository.updateById(id, department);
  }
*/
  @put('/department/{departmentID}', {
    responses: {
      '204': {
        description: 'Department PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('departmentID') departmentID: string,
    @requestBody() department: Department,
  ): Promise<void> {
    await this.departmentRepository.replaceById(departmentID, department);
  }

  @del('/department/{departmentID}', {
    responses: {
      '204': {
        description: 'Department DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('departmentID') departmentID: string): Promise<void> {
    await this.departmentRepository.deleteById(departmentID);
  }
}
