import React from 'react';
import { EmployeeDTO } from '../../employees/models/employee.model';
import { SwitchDTO } from '../../switches/models/switch.model';

export interface NetworkNodeCreationDTO {
    id?: number;
    code: string;
    location: string;
    switchPort: number;
    switchId: number;
    employeeId: number;
    patchPanelLocation?: string;
    patchPanelPort?: number;
    patchPanelNodeId?: string;
    notes?: string;
}

export interface NetworkNodeDTO {
    id: number;
    code: string;
    location: string;
    switchPort: number;
    patchPanelLocation: string;
    patchPanelPort: number;
    patchPanelNodeId: string;
    notes: string;

    createdAt: Date | null;
    updateAt: Date | null;

    switchId: number;
    employeeId: number;

    switchOfNode: SwitchDTO;
    employeeNetworkNode: EmployeeDTO;
}

export interface NetworkNodeFilterDTO {
    statusFilter: number;
    switchId?: number;
    patchPanel: string;
    fromPorts?: number;
    toPorts?: number;
    fromPatchPort?: number;
    toPatchPort?: number;
}

export interface FilterGetNodeDTO {
    switches: SwitchGet[];
    patchpanels: string[];
}

export interface SwitchGet {
    id: number;
    code: string;
}

export interface PostGetNodeDTO {
    employees: EmployeeDTO[];
    switches: SwitchDTO[];
}