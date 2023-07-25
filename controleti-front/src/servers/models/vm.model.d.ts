import { ServerHostDTO } from "./host.model";
import { VMFunctionalities } from "./server.components.model";

export interface ServerVMCreationDTO {
    id?: number;
    code: string;
    operationalSystem: string;
    memorySize: number;
    storageSize: number;
    setupDate?: string;
    status: number;
    notes?: string;

    serverHostId: number;
    funcsIds: number[];
    functionalitySelected: selectOptions[];
}

export interface ServerVMDTO {
    id: number;
    code: string;
    operationalSystem: string;
    memorySize: number;
    storageSize: number;
    setupDate: Date;
    status: number;
    notes: string;
    createdAt: Date;
    updatedAt: Date;

    serverHostId: number;
    host: ServerHostDTO;
    functionalities: VMFunctionalities[];
}