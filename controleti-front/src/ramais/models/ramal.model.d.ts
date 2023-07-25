import React from 'react';
import { EmployeeDTO } from '../../employees/models/employee.model';
import { DepartmentDTO } from '../../settings/departments/models/department.model';

export interface RamalCreationDTO {
    id?: number;
    number: string;
    model?: string;
    exitNumber: string;
    isDepartment: boolean;
    deviceIP: string;
    deviceConfig: string;
    deviceUser: string;
    devicePassword: string;
    status: number;
    assetNumber?: string;
    acquisitionDate?: string;
    notes?: string;

    departmentId: number;
    employeeId?: number;
}

export interface FormGetRamalDTO {
    employees: EmployeeDTO[];
    departments: DepartmentDTO[];
}

export interface RamalDTO {
    id: number;
    number: string;
    model: string;
    exitNumber: string;
    isDepartment: boolean;
    deviceIP: string;
    deviceConfig: string;
    deviceUser: string;
    devicePassword: string;
    status: number;
    assetNumber: string;
    acquisitionDate: Date | null;
    notes: string;
    createdAt: Date;
    updatedAt: Date;
    departmentId: number;
    employeeId: number;

    department: DepartmentDTO;
    employee: EmployeeDTO;
}

export interface RamalFilterDTO {
    configExitNumber: string;
    statusFilter: number;

    classifyRamal: number;
    configIp?: string;
    configGateway: string;

    fromAcquisitionDate?: string;
    toAcquisitionDate?: string;
}

export interface FilterGetRamalDTO {
    exitNumbers: string[];
    gateways: string[];
}