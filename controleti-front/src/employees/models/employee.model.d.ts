import React from 'react';
import { selectOptions } from '../../formshook/models/form.model';
import { DepartmentCreationDTO, DepartmentDTO } from '../../settings/departments/models/department.model';
import { SkypeCreatingDTO, SkypeDTO } from './skype.model';
import { VpnCreatingDTO, VpnDTO } from './vpn.model';

export interface EmployeeCreationDTO {
    id?: number;
    name: string;
    displayName: string;
    email: string;
    emailPassword: string;
    alternativeEmail?: string;
    alternativeEmailPassword?: string;

    departmentId: number;
    skype?: SkypeCreatingDTO | null;
    vpn?: VpnCreatingDTO | null;

    status: number;
    ingressDate?: string;
    notes?: string;
}
 
export interface EmployeeDTO {
    id: number;
    name: string;
    displayName: string;
    email: string;
    emailPassword: string;
    alternativeEmail: string;
    alternativeEmailPassword: string;
    status: number;
    ingressDate: Date | null;
    notes: string;
    createdAt: Date | null;
    updatedAt: Date | null;

    department: DepartmentDTO;
    skype: SkypeDTO;
    vpn: VpnDTO;
    chips: any[];
    computers: any[];
    ramals: any[];
}

export interface InfoEmployeeDTO {
    countEmployeeActive: number;
    countSkypeAccountActive: number;
    countVpnAccountActive: number;
}

export interface EmployeeFilterDTO {
    statusFilter: number;
    employeeUser: string;
    employeeEmail: string;
    employeeEmailPassword: string;
    alternativeEmail: string;
    fromIngressDate?: string;
    toIngressDate?: string;
}

export interface AccountFilterDTO {
    statusFilter: number;
    employeeName: string;
    employeeUser: string;
    employeeDepartment: string;
    employeeEnterprise: string;
}