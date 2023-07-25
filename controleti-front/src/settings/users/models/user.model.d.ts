import React from 'react';

export interface UserCreationDTO {
    id?: number;
    displayname: string;
    username: string;
    email: string;
    userIsActive: number;
    claims: Claims[];
}

export interface Claims {
    display: string;
    value: string;
}

export interface UserDTO {
    id: number;
    displayname: string;
    username: string;
    email: string;
    userIsActive: boolean;
    userClaims: UserClaimsDTO[];
}

export interface UserClaimsDTO {
    id: number;
    userId: number;
    claimType: string;
    claimValue: string;
}