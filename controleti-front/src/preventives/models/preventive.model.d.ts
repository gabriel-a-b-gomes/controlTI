import React from 'react';
import { IDevice } from '../../shared/devices/devices.model';

export interface IPreventive {
    device: IDevice;
    filter: string[];
}

export interface ItemsPreventive<T> {
    items: T[] | undefined;
    pages: number;
}

export interface PreventiveCreationDTO {
    id?: number;
    lastPreventiveDate: string;
    ticketId: string;
    deviceId: number;
}

export interface DevicePreventiveDTO {
    id: number;
    code: string;
    employee?: { displayName: string; };
    department?: { description: string; enterprise: string; };
    createdAt: Date;
    preventives: PreventiveDTO[];
}

interface PreventiveDTO {
    id: number;
    preventiveDate: Date;
    ticketId: string;
    deviceId: number;
}

export interface PreventiveReportDTO {
    computersPreventives: PreventiveDeviceReportDTO;
    nobreakPreventives: PreventiveDeviceReportDTO;
    dvrPreventives: PreventiveDeviceReportDTO;
    serverPreventives: PreventiveDeviceReportDTO;
}

interface PreventiveDeviceReportDTO {
    preventives: PreventiveReportItemDTO[];
    total: number;
    doneQtde: number;
    overdueQtde: number;
    todoQtde: number;
    forecastFinish?: Date;
}

interface PreventiveReportItemDTO {
    deviceId: number;
    deviceCode: number;
    statusPreventive: number;
    ticketId: string;
    lastPreventiveDate: Date;
    dueDate: Date;

    employee?: string;
    department?: string;
    enterprise?: string;
}