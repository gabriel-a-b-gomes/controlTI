import React from "react";

export interface DVRCreationDTO {
    id?: number;
    code: string;
    location: string;
    brand: string;
    model?: string;
    qtdeChannels: number;
    hdSize: number;
    activeCams: number;
    hasBalun: boolean;
    dvrIP: string;
    dvrPort: string;
    dvrUser: string;
    dvrPassword: string;
    status: number;
    assetNumber?: string;
    acquisitionDate?: string;
    lastPreventive?: string;
    ticketId?: string;
    notes?: string;
}

export interface DVRDTO {
    id: number;
    code: string;
    location: string;
    brand: string;
    model: string;
    qtdeChannels: number;
    hdSize: number;
    activeCams: number;
    hasBalun: boolean;
    dvrIP: string;
    dvrPort: string;
    dvrUser: string;
    dvrPassword: string;
    status: number;
    assetNumber: string;
    acquisitionDate: Date | null;
    lastPreventive: Date | null;
    ticketId: string;
    notes: string;
}

export interface DVRFilterDTO {
    statusFilter: number;
    hasBalun: number;

    toHdSize: number;
    toChannels: number;

    fromActiveCams?: number;
    toActiveCams?: number;

    fromAcquisitionDate?: string;
    toAcquisitionDate?: string;

    fromLastPreventive?: string;
    toLastPreventive?: string;
}

export interface FilterGetDVRDTO {
    hdSizes: number[];
    channels: number[];
}

export interface DVRInfoDTO {
    countDVR: number;
    countDVRFull: number;
    countChannels: number;
    countFreeChannels: number;
    countCams: number;
}