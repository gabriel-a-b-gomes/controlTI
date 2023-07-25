import React from 'react';
import { FilterDTO } from '../../components/models/filter.model';
import { EmployeeDTO } from '../../employees/models/employee.model';
import { selectOptions } from '../../formshook/models/form.model';
import { DepartmentDTO } from '../../settings/departments/models/department.model';
import { ProfileDTO } from '../../settings/profiles/models/profile.model';
import { 
    ProcessingUnitCreationDTO, 
    StorageCreationDTO, 
    MemoryCreationDTO,
    StorageDTO,
    ComputerMemoryDTO,
    MemoryDTO,
    ProcessingUnitDTO
} from './computer.components.model';

// Creation DTOs
 
export interface ComputerCreationDTO {
    id?: number;
    code: string;
    computerType: number;
    memorySize: number;
    operationalSystem: string;
    rankOperationalSystem: number;
    status: number;
    assetNumber?: string;
    acquisitionDate?: string;
    lastPreventiveDate?: string;
    ticketId?: string;
    notes?: string;

    departmentId?: number;
    employeeId?: number;
    profileId: number;

    processingUnit: ProcessingUnitCreationDTO,
    storage: StorageCreationDTO,

    memories: MemoryCreationDTO[]
}

export interface FormGetComputerDTO {
    departments: DepartmentDTO[];
    employees: EmployeeDTO[];
    profiles: ProfileDTO[];
    processingUnits: ProcessingUnitDTO[];
    storages: StorageDTO[];
}

// Computer Default DTOs

export interface ComputerDTO {
    id: number;
    code: string;
    computerType: number;
    memorySize: number;
    operationalSystem: string;
    rankOperationalSystem: number;
    status: number;
    isGood: boolean;
    assetNumber: string;
    acquisitionDate: Date;
    lastPreventiveDate: Date;
    ticketId: string;
    notes: string;
    createdAt: Date;

    departmentId: number;
    employeeId: number;
    profileId: number;
    processorId: number;
    storageId: number;

    department: DepartmentDTO;
    employee: EmployeeDTO;
    profile: ProfileDTO;
    processingUnit: ProcessingUnitDTO;
    storage: StorageDTO

    logs: ComputerLogDTO[];
    memories: ComputerMemoryDTO[];
}


export interface ComputerLogDTO {
    id: number;
    code: string;
    department: string;
    enterprise: string;
    employee: string;
    processingUnit: string;
    operationalSystem: string;
    computerProfile: string;
    memorySize: number;
    storageSize: number;
    storageType: string;
    isGood: boolean;
    status: number;
    updatedAt: Date;

    computerId: number;
    computer: ComputerDTO;
}

export interface InfoComputerDTO {
    countComputer: number;
    countNotebook: number;
    countPreventives: number;
    countIsNotGood: number;
} 

export interface ComputerFilterDTO {
    classification: number;
    statusFilter: number;
    computerTypeFilter: number;
    profileFilter: number;
    storageTypeFilter: string;
    fromStorageSize?: number;
    toStorageSize?: number;
    fromMemorySize?: number;
    toMemorySize?: number;
    fromLastPreventive?: string;
    toLastPreventive?: string;
}

export interface FilterGetComputerDTO {
    profiles: ProfileDTO[];
}

