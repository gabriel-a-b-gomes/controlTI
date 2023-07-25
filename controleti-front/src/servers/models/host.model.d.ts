import { MemoryCreationDTO, StorageCreationDTO } from "../../computers/models/computer.components.model";
import { selectOptions } from "../../formshook/models/form.model";
import { HostFunctionalities, ServerMemory, ServerStorage } from "./server.components.model";
import { ServerVMDTO } from "./vm.model";

export interface InfoServerDTO {
    hostQtde: number,
    vmQtde: number,
    preventivesTodo: number,
    vmsSetupThisYear: number
}

export interface ServerHostCreationDTO {
    id?: number;
    code: string;
    machineBrand: string;
    machineModel: string;
    processorModelDescription: string;
    processorFrequency: string;
    operationalSystemDescription: string;
    memorySize: number;
    storageSize: number;

    lastPreventiveDate?: string;
    ticketId?: string;
    acquisitionDate?: string;
    status: number;
    assetNumber?: string;
    notes?: string;

    functionalitySelected: selectOptions[];
    funcsIds: number[];
    memories: MemoryCreationDTO[];
    storages: StorageCreationDTO[];
}

export interface ServerHostDTO {
    id: number;
    code: string;
    machineBrand: string;
    machineModel: string;
    processorModelDescription: string;
    processorFrequency: string;
    operationalSystemDescription: string;
    memorySize: number;
    storageSize: number;

    lastPreventiveDate: Date;
    ticketId: string;
    acquisitionDate: Date;
    status: number;
    assetNumber: string;
    notes: string;

    createdAt: Date;
    updatedAt: Date;

    memories: ServerMemory[];
    storages: ServerStorage[];
    functionalities: HostFunctionalities[];
    virtualMachines: ServerVMDTO[];
}

export interface ServerFilterDTO {
    hostFunctionality: number;
    vmFunctionality: number;
    statusFilter: number;
    fromMemorySize?: number;
    toMemorySize?: number;
    fromStorageSize?: number;
    toStorageSize?: number;
    fromAcquisionDate?: string;
    toAcquisitionDate?: string;
    fromLastPreventive?: string;
    toLastPreventive?: string;
}

