export interface FunctionalityCreationDTO {
    id?: number;
    description: string;
}

export interface FunctionalityDTO {
    id: number;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    virtualMachines: [];
    hosts: [];
}