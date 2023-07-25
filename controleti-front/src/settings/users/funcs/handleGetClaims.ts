import { ClaimEnum } from "../models/ClaimEnum";
import { Claims, UserClaimsDTO } from "../models/user.model";

export function handleGetClaims(userClaims: UserClaimsDTO[]): Claims[] {
    let claims: Claims[] = [];

    if (userClaims && userClaims.length > 0) {

        userClaims.forEach(userclaim => {
            let claimDecoded = userclaim.claimValue.split(',');

            claimDecoded.forEach(dec => {
                let display = '';
                switch(dec) {
                    case ClaimEnum.ADMINISTRADOR:
                        display = 'Administrador'
                        break;
                    case ClaimEnum["Gerenciar Ativos (Listagem, Inclusão, Alteração e Remoção)"]:
                        display = "Gerenciar Ativos (Listagem, Inclusão, Alteração e Remoção)";
                        break;
                    case ClaimEnum["Gerenciamento de Preventivas e Estado de Conexão"]:
                        display = "Gerenciamento de Preventivas e Estado de Conexão";
                        break;
                    default:
                        display = '';
                }

                if (display.length > 0)
                    claims.push({ display: display, value: dec });
            });
        });   
    }
    return claims;
}