import React from 'react';

export interface PrinterCreationDTO {
    id?: number;
    code: string;
    location: string;
    brand: string;
    model: string;
    type: number;
    printerIP?: string;
    printerUser?: string;
    printerPassword?: string;
    supplies?: string;
    assetNumber?: string;
    serialNumber?: string;
    status: int;
    acquisitionDate?: string;
    notes?: string;
}

export interface PrinterDTO {
    id: number;
    code: string;
    location: string;
    brand: string;
    model: string;
    type: number;
    printerIP: string;
    printerUser: string;
    printerPassword: string;
    supplies: string;
    assetNumber: string;
    serialNumber: string;
    status: int;
    acquisitionDate: Date | null;
    notes: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface PrinterFilterDTO {
    type: number;
    statusFilter: number;
    printerIp?: string;
    printerUser?: string;
    printerPassword?: string;
    fromAcquisitionDate?: string;
    toAcquisitionDate?: string;
}

