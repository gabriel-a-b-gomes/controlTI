import React from 'react';

export interface NobreakCreationDTO {
    id?: number;
    code: string;
    location: string;
    brand: string;
    model: string;
    qtdeVA: number;
    isSenoidal: boolean;
    typeOfUse?: number;
    status: int;
    assetNumber?: string;
    acquisitionDate?: string;
    lastPreventive?: string;
    ticketId?: string;
    notes?: string;
}

export interface NobreakFilterDTO {
    filterSenoidal: number;
    statusFilter: number;
    typeOfUse: number;
    fromQtdeVA?: number;
    toQtdeVA?: number;
    fromAcquisitionDate?: string;
    toAcquisitionDate?: string;
    fromLastPreventive?: Date;
    toLastPreventive?: Date;
}

export interface NobreakDTO {
    id: number;
    code: string;
    location: string;
    brand: string;
    model: string;
    qtdeVA: number;
    isSenoidal: boolean;
    typeOfUse: number;
    status: number;
    assetNumber: string;
    acquisitionDate: Date | null;
    lastPreventive: Date | null;
    ticketId: string;
    notes: string;
    createdAt: Date;
    updatedAt: Date;
}
