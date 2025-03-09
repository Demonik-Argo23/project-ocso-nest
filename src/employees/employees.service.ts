import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
  constructor(    
  @InjectRepository(Employee)
  private employeeRepository: Repository<Employee>){}
  
  async create(createEmployeeDto: CreateEmployeeDto) {
    const employee =await this.employeeRepository.save(createEmployeeDto);
    return employee;
  }

  findAll() {
    return this.employeeRepository.find();
  }

  
  findOne(id: string) {
    const employee = this.employeeRepository.findOneBy({
      employeeId: id
    });
    return employee;

  }


    async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
        const employeetToUpdate = await this.employeeRepository.preload({
          employeeId: id,
          ...updateEmployeeDto
        })
        if (!employeetToUpdate) throw new NotFoundException()
        this.employeeRepository.save(employeetToUpdate);
        return employeetToUpdate;
        }

  remove(id: string) {
    return this.employeeRepository.delete({
      employeeId: id
    });
    return {
      message: 'Employee deleted',
    }
  }
}