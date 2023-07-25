import React from 'react';
import { ComputerDTO } from './computer.model';

// Creation DTOs

export interface ProcessingUnitCreationDTO {
    id?: number;
    model: string;
    generation: string;
    frequency: string;
    rankProcessingUnit: number;
}

export interface StorageCreationDTO {
    id?: number;
    type: string;
    brand: string;
    storageSize: number;
    qtde?:number;
}

export interface MemoryCreationDTO {
    id?: number;
    model: string;
    memoryPentSize: number;
    qtde: number;
}

// Default DTOs

export interface ProcessingUnitDTO {
    id: number;
    model: string;
    generation: string;
    frequency: string;
    rankProcessingUnit: number;

    computers: ComputerDTO[];
}


export interface StorageDTO {
    id: number;
    type: string;
    brand: string;
    storageSize: number;

    computers: ComputerDTO[];
}

export interface ComputerMemoryDTO {
    computerId: number;
    memoryId: number;
    qtde: number;
    memory: MemoryDTO;
    computer: ComputerDTO;
}

export interface MemoryDTO {
    id: number;
    model: string;
    memoryPentSize: number;

    computers: ComputerMemoryDTO[];
}