import React from 'react';
import { ComputerDTO } from '../../../computers/models/computer.model';

export interface ProfileCreationDTO {
    id?: number;
    name: string;
    rankOfProcessingUnit: number;
    memoryMinSize: number;
    storageMinSize: number;
    storageType: string;
    rankOfOperationSystem: number;
}

export interface ProfileDTO {
    id: number;
    name: string;
    rankOfProcessingUnit: number;
    memoryMinSize: number;
    storageMinSize: number;
    storageType: string;
    rankOfOperationSystem: number;
    computers: ComputerDTO[];
}