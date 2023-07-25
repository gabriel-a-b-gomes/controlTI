import React from 'react';

export interface RouterCreationDTO {
    id?: number;
    code: string;
    location: string;
    brand: string;
    routerIP: string;
    routerMAC?: string;
    routerSSID: string;
    routerUser: string;
    routerPassword: string;
    status: number;
    assetNumber?: string;
    acquisitionDate?: string;
    notes?: string;
}

export interface RouterDTO {
    id: number;
    code: string;
    location: string;
    brand: string;
    routerIP: string;
    routerMAC: string;
    routerSSID: string;
    routerUser: string;
    routerPassword: string;
    status: number;
    assetNumber: string;
    acquisitionDate: Date | null;
    notes: string;
    createdAt: Date | null;
    updatedAt: Date | null;
}

export interface RouterFilterDTO {
    statusFilter: number;
    routerSSID: string;
    routerIp: string;
    routerUser: string;
    routerPassword: string;
    fromAcquisitionDate?: string;
    toAcquisitionDate?: string;
}

export interface FilterGetRouterDTO {
    routerSSIDs: string[];
}