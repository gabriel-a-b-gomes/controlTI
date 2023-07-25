const ScriptPopover = (props: ScriptPopoverProps) => {
    return (
        <div className="popover-script" style={{ borderColor: props.color }}>
            <ul className="list-script">
                {props.scripts.map(script => 
                    <li key={script}>{script}</li>
                )}
            </ul>
        </div>
    );
}

interface ScriptPopoverProps {
    scripts: string[];
    color: string;
}

export default ScriptPopover;

export const computersScript = [
    "Limpeza Internar de pó, cooler, fonte, ventiladores com ar comprimido",
    "Limpeza Contatos Memória",
    "Pasta térmica",
    "Limpeza Externa",
    "Limpeza teclado (Notebook)",
    "Limpeza tela (Notebook)",
    "Verificar atualização do Windows",
    "Verificar atualização anti-vírus",
    "Limpeza de arquivos temporários",
    "Verificação do sistema e inicialização do windows (msconfig)",
    "Verificar necessidade ou melhoria com usuário",
    "Verificar se está bloqueado Storage (PenDrive, HD Externo)",
    "Backup Arquivos PST"
];

export const serversScript = [
    "Limpeza Internar de pó, cooler, fonte, ventiladores com ar comprimido",
    "Limpeza Contatos Memória",
    "Pasta térmica",
    "Limpeza Externa",
    "Verificar atualização do Windows",
    "Verificar atualização anti-vírus",
    "Limpeza de arquivos temporários",
    "Verificação do sistema e inicialização do windows (msconfig)",
    "Verificação e Cópia das Maquinas Virtuais"
];

export const nobreaksScript = [
    "Limpeza geral",
    "Trocas de baterias",
    "Testes de efetividade",
    "Laudo"
];

export const dvrsScript = [
    "Limpeza Interna",
    "Limpeza Externa",
    "Teste de Gravação"
]