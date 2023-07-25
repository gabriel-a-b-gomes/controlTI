import './styles/Loading.css';

function Loading() {
    return (
        <div className='loading-spinner'></div> 
    );
}

export default Loading;

export function LoadingList() {
    return (
        <ul className='loading-list'>
            <li className='loading-item' />
            <li className='loading-item' />
            <li className='loading-item' />
        </ul>
    );
}

export function LoadingHomeBoxes() {
    return (
        <div className='loading-home-boxes'>
            <div />
            <div />
            <div />
            <div />
        </div>
    );
}

export function LoadingHomeSide() {
    return (
        <div className='loading-home-side-boxes'>
            <div />
            <div />
            <div />
        </div>
    );
}

export function LoadingTable() {
    return (
        <table className='table'>
            <thead>
                <tr className='pulse-row'>
                    <th>Carregando...</th>
                </tr>
            </thead>
            <tbody className='tbody-loading'>
                <Loading /> 
            </tbody>
        </table>
    );
}

export function LoadingInfo() {
    return (
        <span className="loading-info" />
    );
}

export function LoadingFilter() {
    return (
        <div className='loading-filter'>
            <div className="loading-filter-area" />
            <div className="loading-filter-button" />
        </div>
    );
}

export function LoadingForm() {
    return (
        <>
        <div className='form-area-loading'>
            <h1>Carregando...</h1>
            <div className='header-loading'></div>
            <div className='body-loading'></div>
        </div>
        <div className='actions-loading'>
            <span className='row' />
        </div>
        </>
    );
}