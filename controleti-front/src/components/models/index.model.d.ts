import React from 'react';

export interface IndexDTO<T> {
    items: T[] | undefined;
    totalAmount: number;
    action: number;
}