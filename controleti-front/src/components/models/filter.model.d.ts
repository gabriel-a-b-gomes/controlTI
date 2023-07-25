import React from 'react';
import { DeepPartial } from 'react-hook-form';
import { SearchDTO } from '../../shared/search-input/search.model';

export interface FilterDTO<TFilter>  {
    searches: SearchDTO[]
    extra: DeepPartial<TFilter>;
}