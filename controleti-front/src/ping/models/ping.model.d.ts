import React from 'react';

export interface PingDTO {
    roundTripTime:number;
    status: number;
    address: string;
    code: string;
    deviceId: number;
    deviceCategory: number;

    employee?: string;
    department?: string;
    enterprise?: string;
}