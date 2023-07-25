export function handleDateForm(date: Date | null | undefined) {
    if (date !== null && date !== undefined) {
        const d = new Date(date);
        return d.toLocaleDateString('sv-SE');
    }
}

export function handleDateIndex(date: Date | null | undefined) {
    if (date !== null && date !== undefined) {
        const convertedDate = new Date(date);
        return convertedDate.toLocaleDateString('pt-br');
    }

    return "";
}

export function handleUndefinedOption(option?: number): number {
    if (option) return option;
    
    return 0;
}