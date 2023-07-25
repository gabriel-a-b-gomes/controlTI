import React from 'react';
import { EmployeeDTO } from './employee.model';

export interface VpnCreatingDTO {
    id?: number;
    vpnUser: string;
    vpnPassword: string;
}

export interface VpnDTO {
    id: number;
    vpnUser: string;
    vpnPassword: string;
    employee: EmployeeDTO;
}