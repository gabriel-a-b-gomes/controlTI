import React from 'react';
import { EmployeeDTO } from './employee.model';

export interface SkypeCreatingDTO {
    id?: number;
    skypeUser: string;
    skypePassword: string;
}

export interface SkypeDTO {
    id: number;
    skypeUser: string;
    skypePassword: string;
    employee: EmployeeDTO;
}