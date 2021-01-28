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
import {Staff} from '../models';
import {StaffRepository} from '../repositories';

export class StaffController {
  constructor(
    @repository(StaffRepository)
    public staffRepository : StaffRepository,
  ) {}

  @post('/staff', {
    responses: {
      '200': {
        description: 'Staff model instance',
        content: {'application/json': {schema: getModelSchemaRef(Staff)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Staff, {
            title: 'NewStaff',
            exclude: ['staffID'],
          }),
        },
      },
    })
    staff: Omit<Staff, 'staffID'>,
  ): Promise<Staff> {
    return this.staffRepository.create(staff);
  }

  @get('/staff/count', {
    responses: {
      '200': {
        description: 'Staff model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Staff) where?: Where<Staff>,
  ): Promise<Count> {
    return this.staffRepository.count(where);
  }

  @get('/staff', {
    responses: {
      '200': {
        description: 'Array of Staff model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Staff, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Staff) filter?: Filter<Staff>,
  ): Promise<Staff[]> {
    return this.staffRepository.find(filter);
  }
/*
  @patch('/staff', {
    responses: {
      '200': {
        description: 'Staff PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Staff, {partial: true}),
        },
      },
    })
    staff: Staff,
    @param.where(Staff) where?: Where<Staff>,
  ): Promise<Count> {
    return this.staffRepository.updateAll(staff, where);
  }
*/
  @get('/staff/{staffID}', {
    responses: {
      '200': {
        description: 'Staff model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Staff, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('staffID') staffID: string,
    @param.filter(Staff, {exclude: 'where'}) filter?: FilterExcludingWhere<Staff>
  ): Promise<Staff> {
    return this.staffRepository.findById(staffID, filter);
  }
/*
  @patch('/staff/{staffID}', {
    responses: {
      '204': {
        description: 'Staff PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('staffID') staffID: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Staff, {partial: true}),
        },
      },
    })
    staff: Staff,
  ): Promise<void> {
    await this.staffRepository.updateById(staffID, staff);
  }
*/
  @put('/staff/{staffID}', {
    responses: {
      '204': {
        description: 'Staff PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('staffID') staffID: string,
    @requestBody() staff: Staff,
  ): Promise<void> {
    await this.staffRepository.replaceById(staffID, staff);
  }

  @del('/staff/{staffID}', {
    responses: {
      '204': {
        description: 'Staff DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('staffID') staffID: string): Promise<void> {
    await this.staffRepository.deleteById(staffID);
  }
}
