import React from 'react';
import { ChipDTO } from './chip.model';

export interface CellPhoneCreationDTO {
    id?: number;
    model: string;
    memorySize: number;
    storageSize: number;
    processingUnit: string;
    operationalSystem: string;
}

export interface CellphoneDTO {
    id: number;
    model: string;
    memorySize: number;
    storageSize: number;
    processingUnit: string;
    operationalSystem: string;
    chips: ChipDTO[];
}