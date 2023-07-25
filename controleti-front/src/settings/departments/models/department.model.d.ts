import React from 'react';
import { EmployeeDTO } from '../../../employees/models/employee.model';

export interface DepartmentCreationDTO {
    id?: number;
    description: string;
    enterprise: string;
}

export interface DepartmentDTO {
    id: number;
    description: string;
    enterprise: string;
    employees: EmployeeDTO[];
}