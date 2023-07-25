import React from 'react';
import { NetworkNodeDTO } from '../../nodes/models/networknodes.model';

export interface SwitchCreationDTO {
    id?: number;
    code: string;
    location: string;
    brand: string;
    qtdePorts: number;
    switchIP: string;
    switchMAC?: string;
    switchUser: string;
    switchPassword: string;
    status: number;
    assetNumber?: string;
    acquisitionDate?: string;
    notes?: string;
}

export interface SwitchDTO {
    id: number;
    code: string;
    location: string;
    brand: string;
    qtdePorts: number;
    switchIP: string;
    switchMAC: string;
    switchUser: string;
    switchPassword: string;
    status: number;
    assetNumber: string;
    acquisitionDate: Date | null;
    notes: string;
    networkNodes: NetworkNodeDTO[];
    createdAt: Date | null;
    updateAt: Date | null;
}

export interface SwitchFilterDTO {
    statusFilter: number;
    switchIp: string;
    switchUser: string;
    switchPassword: string;
    fromQtdePorts?: number;
    toQtdePorts?: number;
    fromUsedPorts?: number;
    toUsedPorts?: number;
    fromAcquisitionDate?: string;
    toAcquisitionDate?: string;
}

