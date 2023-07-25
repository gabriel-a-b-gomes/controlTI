import React from 'react';
import { EmployeeDTO } from '../../employees/models/employee.model';
import { DepartmentDTO } from '../../settings/departments/models/department.model';
import { CellPhoneCreationDTO, CellphoneDTO } from './cellphone.model'; 

export interface ChipCreationDTO {
    id?: number;
    number: string;
    status: number;
    type: string;
    account: string;
    acctualICCID: string;
    assetNumber?: string;
    acquisitionDate?: string;
    notes?: string;

    departmentId?: number;
    employeeId?: number;
    cellPhone?: CellPhoneCreationDTO;
}

export interface ChipDTO {
    id: number;
    number: string;
    status: number;
    account: string;
    type: string;
    acctualICCID: string;
    assetNumber: string;
    acquisitionDate: Date;
    notes: string;
    createdAt: Date;
    updatedAt: Date;

    departmentId: number;
    department: DepartmentDTO;
    employeeId: number;
    employee: EmployeeDTO;
    cellphoneId: number;
    cellPhone: CellphoneDTO;
}

export interface FormGetChipDTO {
    departments: DepartmentDTO[];
    employees: EmployeeDTO[];
    cellPhones: CellPhoneCreationDTO[];
}

export interface ChipFilterDTO {
    statusFilter: number;
    typeFilter: string;
    deepFilterCellphone: string;
    toCellphoneMemorySize?: number;
    toCellphoneStorageSize?: number;
    fromAcquisitionDate?: string;
    toAcquisitionDate?: string;
}

export interface FilterGetChipDTO {
    types: string[];
    cellphoneMemorySizes: number[];
    cellphoneStorageSizes: number[];
}


export interface InfoChipDTO {
    countChipActive: number;   
    countWithoutEmployee: number;
    countChipWithCellphone: number;
    countChipBoughtLastYear: number;
}