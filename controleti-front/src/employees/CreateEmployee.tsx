import { useState } from "react";
import { urlEmployees } from "../apis/endpoints";
import CreateItem from "../components/items/CreateItem";
import FormNotify from "../formshook/boxes/FormNotify";
import { handleDateForm, handleUndefinedOption } from "../utils/functions/Handles";
import { EmployeeCreationDTO, EmployeeDTO } from "./models/employee.model";
import FormEmployee from "./form/FormEmployee";
import { SkypeCreatingDTO, SkypeDTO } from "./models/skype.model";
import { VpnCreatingDTO, VpnDTO } from "./models/vpn.model";

function CreateEmployee() {
    document.title = "Cadastrar Colaborador";

    const base: EmployeeCreationDTO = {
        name: '',
        displayName: '',
        email: '',
        emailPassword: '',
        alternativeEmail: '',
        alternativeEmailPassword: '',
        status: 1,
        departmentId: 0,
        notes: '',
        ingressDate: undefined,

        skype: {
            skypeUser: '',
            skypePassword: ''
        },

        vpn: {
            vpnUser: '',
            vpnPassword: ''
        }
    }

    const [employee, setEmployee] = useState<EmployeeCreationDTO>(base);
    const [success, setSuccess] = useState<boolean>(false);

    function transformEmployee(dupEmployee: EmployeeDTO): void {
        function transformSkype(skype: SkypeDTO): SkypeCreatingDTO | null {
            if (skype != null)
                return ({ skypeUser: skype.skypeUser, skypePassword: skype.skypePassword });

            return { skypeUser: '', skypePassword: '' };
        }

        function transformVpn(vpn: VpnDTO): VpnCreatingDTO | null {
            if (vpn != null) {
                return ({ vpnUser: vpn.vpnUser, vpnPassword: vpn.vpnPassword });
            }

            return { vpnUser: '', vpnPassword: '' };
        }

        setEmployee({
            name: dupEmployee.name,
            displayName: dupEmployee.displayName,
            email: dupEmployee.email,
            emailPassword: dupEmployee.emailPassword,
            alternativeEmail: dupEmployee.alternativeEmail,
            alternativeEmailPassword: dupEmployee.alternativeEmailPassword,
            status: dupEmployee.status,
            departmentId: handleUndefinedOption(dupEmployee.department.id),
            skype: transformSkype(dupEmployee.skype),
            vpn: transformVpn(dupEmployee.vpn),
            ingressDate: handleDateForm(dupEmployee.ingressDate),
            notes: dupEmployee.notes
        });
    }

    return (
        <CreateItem<EmployeeCreationDTO, EmployeeDTO>
            url={urlEmployees}
            transform={transformEmployee}
        >
            {(create, buttons, error) => (
                <FormEmployee
                    title='Cadastrar Colaborador'
                    model={employee}
                    error={error}
                    buttons={(actions) => buttons(() => actions.reset(base))}
                    onSubmit={async (values, actions) => {
                        setSuccess(false);
                        const status = await create(values);
                        setSuccess(status === 200);

                        if (status === 200) {
                            actions.reset(base);
                        }
                    } }
                >
                    <FormNotify listingLink="/employees" success={success} text="Colaborador cadastrado com sucesso" />
                </FormEmployee>
            )}
        </CreateItem>
    );
}

export default CreateEmployee;