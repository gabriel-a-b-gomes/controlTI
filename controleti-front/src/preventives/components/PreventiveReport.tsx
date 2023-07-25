import '../styles/PreventiveReportStyles.css';

import { IoMdDesktop } from 'react-icons/io';
import logo from '../../assets/logo.jpg';
import { PreventiveReportDTO } from '../models/preventive.model';
import List from '../../components/List';
import { handleDateIndex } from '../../utils/functions/Handles';
import { computersScript, dvrsScript, nobreaksScript, serversScript } from './ScriptPopover';

enum PreventiveStatus {
    overdue = 0,
    todo = 1,
    done = 2
}

function PreventiveReport(props: PreventiveReportProps) {
    function handleGetPreventiveStatus(status: number) {
        switch (status) {
            case PreventiveStatus.overdue: 
                return <span className='status-prev overdue-prev-report'>Atrasada</span>;
            case PreventiveStatus.todo:
                return <span className='status-prev todo-on-time'>Pendente</span>;
            case PreventiveStatus.done:
                return <span className='status-prev done-prev-report'>Realizada</span>;
            default:
                return <></>;
        }
    }
 
    return (
        <table className="report-container">
            <thead className="report-header">
                <tr>
                    <th className="report-header-cell">
                        <div className="header-info">
                            <div className='report-title'>Relatório de Preventivas</div>
                            <div className='report-brand'>
                                <IoMdDesktop />{"Controle TI"}<img src={logo} alt="Logo INNARA" />
                            </div>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody className="report-content">
                <tr>
                    <td className="report-content-cell">
                        <div className="main">
                            <section>
                                <div className='section-name'>
                                    <div className='indicator-prev' style={{ background: '#BD9E3E' }} />
                                    <span>Computadores</span>
                                </div>
                                <table className='table table-bordered report-prev'>
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Colaborador</th>
                                            <th>Departamento</th>
                                            <th>Status</th>
                                            <th>Prazo</th>
                                            <th>Última Preventiva</th>
                                            <th>Ticket</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <List list={props.content.computersPreventives.preventives}>
                                            <>
                                            {props.content.computersPreventives.preventives.map(cmpPrev =>
                                                <tr key={cmpPrev.deviceCode + cmpPrev.deviceId + cmpPrev.statusPreventive}>
                                                    <td>{cmpPrev.deviceCode}</td>
                                                    <td>{cmpPrev.employee}</td>
                                                    <td>{cmpPrev.department} {cmpPrev.enterprise}</td>
                                                    <td>{handleGetPreventiveStatus(cmpPrev.statusPreventive)}</td>
                                                    <td>{handleDateIndex(cmpPrev.dueDate)}</td>
                                                    <td>{handleDateIndex(cmpPrev.lastPreventiveDate)}</td>
                                                    <td>{cmpPrev.ticketId ? '#' + cmpPrev.ticketId : ''}</td>
                                                </tr>
                                            )}
                                            </>
                                        </List>
                                    </tbody>
                                </table>
                                <div className='report-prevs-infos'>
                                    <div className='general'>
                                        <table className='table table-bordered report-prev'>
                                            <thead><tr><th>Informações Gerais</th><th></th></tr></thead>
                                            <tbody>
                                                <tr>
                                                    <td>Concluídas</td>
                                                    <td>
                                                        <strong>
                                                            {props.content.computersPreventives.doneQtde === 0 ?
                                                                '0%'
                                                            :
                                                                `${Math.round(props.content.computersPreventives.doneQtde / props.content.computersPreventives.total * 100)}%` 
                                                            }
                                                        </strong>
                                                    </td>
                                                </tr>    
                                                <tr>
                                                    <td>Pendentes</td>
                                                    <td>
                                                        <strong>
                                                            {props.content.computersPreventives.todoQtde === 0 ?
                                                                '0%'
                                                            :
                                                                `${Math.round(props.content.computersPreventives.todoQtde / props.content.computersPreventives.total * 100)}%` 
                                                            }
                                                        </strong>
                                                    </td>
                                                </tr>    
                                                <tr>
                                                    <td>Em Atraso</td>
                                                    <td>
                                                        <strong>
                                                            {props.content.computersPreventives.overdueQtde === 0 ?
                                                                '0%'
                                                            :
                                                                `${Math.round(props.content.computersPreventives.overdueQtde / props.content.computersPreventives.total * 100)}%` 
                                                            }
                                                        </strong>
                                                    </td>
                                                </tr>   
                                            </tbody>
                                        </table>
                                        <div className='overview'>
                                            <span>
                                                <p>Previsão de Conclusão</p>
                                                <strong>{props.content.computersPreventives.forecastFinish ? handleDateIndex(props.content.computersPreventives.forecastFinish) : ''}</strong>
                                            </span>
                                        </div>
                                    </div>
                                    <table className='table table-bordered report-prev scripts'>
                                        <thead><tr><th>Procedimento</th></tr></thead>
                                        <tbody>{computersScript.map(script => <tr key={script}><td>{script}</td></tr>)}</tbody>
                                    </table>
                                </div>

                            </section>
                            <section>
                                <div className='section-name'>
                                    <div className='indicator-prev' style={{ background: '#1F598E' }} />
                                    <span>Servidores</span>
                                </div>
                                <table className='table table-bordered report-prev'>
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Status</th>
                                            <th>Prazo</th>
                                            <th>Última Preventiva</th>
                                            <th>Ticket</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <List list={props.content.serverPreventives.preventives}>
                                            <>
                                            {props.content.serverPreventives.preventives.map(srvPrev =>
                                                <tr key={srvPrev.deviceCode + srvPrev.deviceId + srvPrev.statusPreventive}>
                                                    <td>{srvPrev.deviceCode}</td>
                                                    <td>{handleGetPreventiveStatus(srvPrev.statusPreventive)}</td>
                                                    <td>{handleDateIndex(srvPrev.dueDate)}</td>
                                                    <td>{handleDateIndex(srvPrev.lastPreventiveDate)}</td>
                                                    <td>{srvPrev.ticketId ? '#' + srvPrev.ticketId : ''}</td>
                                                </tr>
                                            )}
                                            </>
                                        </List>
                                    </tbody>
                                </table>
                                <div className='report-prevs-infos'>
                                    <div className='general'>
                                        <table className='table table-bordered report-prev'>
                                            <thead><tr><th>Informações Gerais</th><th></th></tr></thead>
                                            <tbody>
                                                <tr>
                                                    <td>Concluídas</td>
                                                    <td>
                                                        <strong>
                                                            {props.content.serverPreventives.doneQtde === 0 ?
                                                                '0%'
                                                            :
                                                                `${Math.round(props.content.serverPreventives.doneQtde / props.content.serverPreventives.total * 100)}%` 
                                                            }
                                                        </strong>
                                                    </td>
                                                </tr>    
                                                <tr>
                                                    <td>Pendentes</td>
                                                    <td>
                                                        <strong>
                                                            {props.content.serverPreventives.todoQtde === 0 ?
                                                                '0%'
                                                            :
                                                                `${Math.round(props.content.serverPreventives.todoQtde / props.content.serverPreventives.total * 100)}%` 
                                                            }
                                                        </strong>
                                                    </td>
                                                </tr>    
                                                <tr>
                                                    <td>Em Atraso</td>
                                                    <td>
                                                        <strong>
                                                            {props.content.serverPreventives.overdueQtde === 0 ?
                                                                '0%'
                                                            :
                                                                `${Math.round(props.content.serverPreventives.overdueQtde / props.content.serverPreventives.total * 100)}%` 
                                                            }
                                                        </strong>
                                                    </td>
                                                </tr>   
                                            </tbody>
                                        </table>
                                    </div>
                                    <table className='table table-bordered report-prev scripts'>
                                        <thead><tr><th>Procedimento</th></tr></thead>
                                        <tbody>{serversScript.map(script => <tr key={script}><td>{script}</td></tr>)}</tbody>
                                    </table>
                                </div>
                            </section>
                            <section>
                                <div className='section-name'>
                                    <div className='indicator-prev' style={{ background: '#ff3f34' }} />
                                    <span>Nobreaks</span>
                                </div>
                                <table className='table table-bordered report-prev'>
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Status</th>
                                            <th>Prazo</th>
                                            <th>Última Preventiva</th>
                                            <th>Ticket</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <List list={props.content.nobreakPreventives.preventives}>
                                            <>
                                            {props.content.nobreakPreventives.preventives.map(nbkPrev =>
                                                <tr key={nbkPrev.deviceCode + nbkPrev.deviceId + nbkPrev.statusPreventive}>
                                                    <td>{nbkPrev.deviceCode}</td>
                                                    <td>{handleGetPreventiveStatus(nbkPrev.statusPreventive)}</td>
                                                    <td>{handleDateIndex(nbkPrev.dueDate)}</td>
                                                    <td>{handleDateIndex(nbkPrev.lastPreventiveDate)}</td>
                                                    <td>{nbkPrev.ticketId ? '#' + nbkPrev.ticketId : ''}</td>
                                                </tr>
                                            )}
                                            </>
                                        </List>
                                    </tbody>
                                </table>
                                <div className='report-prevs-infos'>
                                    <div className='general'>
                                        <table className='table table-bordered report-prev'>
                                            <thead><tr><th>Informações Gerais</th><th></th></tr></thead>
                                            <tbody>
                                                <tr>
                                                    <td>Concluídas</td>
                                                    <td>
                                                        <strong>
                                                            {props.content.nobreakPreventives.doneQtde === 0 ?
                                                                '0%'
                                                            :
                                                                `${Math.round(props.content.nobreakPreventives.doneQtde / props.content.nobreakPreventives.total * 100)}%` 
                                                            }
                                                        </strong>
                                                    </td>
                                                </tr>    
                                                <tr>
                                                    <td>Pendentes</td>
                                                    <td>
                                                        <strong>
                                                            {props.content.nobreakPreventives.todoQtde === 0 ?
                                                                '0%'
                                                            :
                                                                `${Math.round(props.content.nobreakPreventives.todoQtde / props.content.nobreakPreventives.total * 100)}%` 
                                                            }
                                                        </strong>
                                                    </td>
                                                </tr>    
                                                <tr>
                                                    <td>Em Atraso</td>
                                                    <td>
                                                        <strong>
                                                            {props.content.nobreakPreventives.overdueQtde === 0 ?
                                                                '0%'
                                                            :
                                                                `${Math.round(props.content.nobreakPreventives.overdueQtde / props.content.nobreakPreventives.total * 100)}%` 
                                                            }
                                                        </strong>
                                                    </td>
                                                </tr>   
                                            </tbody>
                                        </table>
                                    </div>
                                    <table className='table table-bordered report-prev scripts'>
                                        <thead><tr><th>Procedimento</th></tr></thead>
                                        <tbody>{nobreaksScript.map(script => <tr key={script}><td>{script}</td></tr>)}</tbody>
                                    </table>
                                </div>
                            </section>
                            <section>
                                <div className='section-name'>
                                    <div className='indicator-prev' style={{ background: '#2c3e50' }} />
                                    <span>DVRs</span>
                                </div>
                                <table className='table table-bordered report-prev'>
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Status</th>
                                            <th>Prazo</th>
                                            <th>Última Preventiva</th>
                                            <th>Ticket</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <List list={props.content.dvrPreventives.preventives}>
                                            <>
                                            {props.content.dvrPreventives.preventives.map(dvrPrev =>
                                                <tr key={dvrPrev.deviceCode + dvrPrev.deviceId + dvrPrev.statusPreventive}>
                                                    <td>{dvrPrev.deviceCode}</td>
                                                    <td>{handleGetPreventiveStatus(dvrPrev.statusPreventive)}</td>
                                                    <td>{handleDateIndex(dvrPrev.dueDate)}</td>
                                                    <td>{handleDateIndex(dvrPrev.lastPreventiveDate)}</td>
                                                    <td>{dvrPrev.ticketId ? '#' + dvrPrev.ticketId : ''}</td>
                                                </tr>
                                            )}
                                            </>
                                        </List>
                                    </tbody>
                                </table>
                                <div className='report-prevs-infos'>
                                    <div className='general'>
                                        <table className='table table-bordered report-prev'>
                                            <thead><tr><th>Informações Gerais</th><th></th></tr></thead>
                                            <tbody>
                                                <tr>
                                                    <td>Concluídas</td>
                                                    <td>
                                                        <strong>
                                                            {props.content.dvrPreventives.doneQtde === 0 ?
                                                                '0%'
                                                            :
                                                                `${Math.round(props.content.dvrPreventives.doneQtde / props.content.dvrPreventives.total * 100)}%` 
                                                            }
                                                        </strong>
                                                    </td>
                                                </tr>    
                                                <tr>
                                                    <td>Pendentes</td>
                                                    <td>
                                                        <strong>
                                                            {props.content.dvrPreventives.todoQtde === 0 ?
                                                                '0%'
                                                            :
                                                                `${Math.round(props.content.dvrPreventives.todoQtde / props.content.dvrPreventives.total * 100)}%` 
                                                            }
                                                        </strong>
                                                    </td>
                                                </tr>    
                                                <tr>
                                                    <td>Em Atraso</td>
                                                    <td>
                                                        <strong>
                                                            {props.content.dvrPreventives.overdueQtde === 0 ?
                                                                '0%'
                                                            :
                                                                `${Math.round(props.content.dvrPreventives.overdueQtde / props.content.dvrPreventives.total * 100)}%` 
                                                            }
                                                        </strong>
                                                    </td>
                                                </tr>   
                                            </tbody>
                                        </table>
                                    </div>
                                    <table className='table table-bordered report-prev'>
                                        <thead><tr><th>Procedimento</th></tr></thead>
                                        <tbody>{dvrsScript.map(script => <tr key={script}><td>{script}</td></tr>)}</tbody>
                                    </table>
                                </div>
                            </section>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

interface PreventiveReportProps {
    content: PreventiveReportDTO;
}

export default PreventiveReport;

