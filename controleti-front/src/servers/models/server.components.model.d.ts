import { MemoryDTO, StorageDTO } from "../../computers/models/computer.components.model";
import { FunctionalityDTO } from "../../settings/functionalities/models/functionalities.model";
import { ServerHostDTO } from "./host.model";

export interface ServerMemory {
    serverHostId: number;
    memoryId: number;
    qtde: number;
    
    host: ServerHostDTO;
    memory: MemoryDTO;
}

export interface ServerStorage {
    serverHostId: number;
    storageId: number;
    qtde: number;
    
    host: ServerHostDTO;
    storage: StorageDTO;
}

export interface HostFunctionalities {
    hostId: number;
    functionalityId: number;
    host: ServerHostDTO;
    functionality: FunctionalityDTO;
}

export interface VMFunctionalities {
    vmId: number;
    functionalityId: number;
    virtualMachine: ServerVMDTO;
    functionality: FunctionalityDTO;
}

export interface ServerPreventives {
    preventiveDate: Date;
    ticketId: string;
    hostId: number;
    host: ServerHostDTO;
}