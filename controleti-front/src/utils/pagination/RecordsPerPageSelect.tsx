function RecordsPerPageSelect(props: RecordsPerPageProps) {
    return (
        <div className="records-container">
            <label>Registros Por Página:</label>
            <select
                className="records-select"
                defaultValue={20}
                onChange={e => {
                    props.onChange(parseInt(e.currentTarget.value, 10))
                }}
            >
                <option>10</option>
                <option>20</option>
                <option>40</option>
            </select>
        </div>
    );
}

interface RecordsPerPageProps {
    onChange(recordsPerPage: number): void;
}

export default RecordsPerPageSelect;