import React, { ReactElement } from 'react';

interface IDevice {
    name: string;
    plural: string;
    color: string;
    icon: ReactElement;
    to: string;
    url: string;
    css: string;
}