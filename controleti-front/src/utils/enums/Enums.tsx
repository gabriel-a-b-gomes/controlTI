export enum NobreakFilterTypeOfUses {
    nofilter = 0,
    printer = 1,
    server = 2,
    network = 3,
    notype = 4
}

export enum SenoidalFilter {
    nofilter = 0,
    onlySenoidal = 1,
    onlyNotSenoidal = 2
}

export enum NobreakType {
    Impressora = 1,
    Servidor = 2,
    Rede = 3
}

export enum PrinterType {
    Padrao = 1,
    Multifuncional = 2,
    Etiqueta = 3,
    Colorida = 4
}

export enum PrinterFilterType {
    noFilter = 0,
    standart = 1,
    multifunction = 2,
    productTag = 3,
    colorful = 4,
}

export enum Status {
    Ativo = 1,
    Desativo = 0
}

export enum StatusFilter {
    Todos = 2,
    Ativo = 1,
    Desativo = 0
}

export enum ComputerClassification {
    Todos = 2, 
    SoBom = 1,
    SoRuim = 0
}

export enum RamalClassification {
    all = 0,
    onlyDeparment = 1,
    onlyPersonal = 2
}

export enum HasBalunClassification {
    noFilter = 0,
    onlyHasBalun = 1,
    onlyNotHasBalun = 2
}

export enum ComputerTypeFilter {
    Todos = 2,
    Desktop = 0,
    Notebook = 1
}

export enum RankProcessing {
    'Muito Ruim' = 1,
    'Ruim' = 2,
    'Normal' = 3,
    'Bom' = 4,
    'Muito Bom' = 5
}

export enum RankSO {
    'Ultrapassado' = 1,
    'Atual' = 2,
    'Novo' = 3
}