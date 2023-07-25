import { useState } from 'react';
import { urlEmployees } from '../apis/endpoints';
import EditItem from '../components/items/EditItem';
import FormNotify from '../formshook/boxes/FormNotify';
import { handleDateForm, handleUndefinedOption } from '../utils/functions/Handles';
import { EmployeeCreationDTO, EmployeeDTO } from './models/employee.model';
import FormEmployee from './form/FormEmployee';
import { SkypeCreatingDTO, SkypeDTO } from './models/skype.model';
import { VpnCreatingDTO, VpnDTO } from './models/vpn.model';

function EditEmployee() {
    const [success, setSuccess] = useState<boolean>(false);

    function transformEmployee(upEmployee: EmployeeDTO): EmployeeCreationDTO {
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

        document.title = "Editar Colaborador - " + upEmployee.name;

        return({
            id: upEmployee.id,
            name: upEmployee.name,
            displayName: upEmployee.displayName,
            email: upEmployee.email,
            emailPassword: upEmployee.emailPassword,
            alternativeEmail: upEmployee.alternativeEmail,
            alternativeEmailPassword: upEmployee.alternativeEmailPassword,
            status: upEmployee.status,
            departmentId: handleUndefinedOption(upEmployee.department.id),
            skype: transformSkype(upEmployee.skype),
            vpn: transformVpn(upEmployee.vpn),
            ingressDate: handleDateForm(upEmployee.ingressDate),
            notes: upEmployee.notes
        });
    }

    return (
        <EditItem<EmployeeCreationDTO, EmployeeDTO>
            url={urlEmployees}
            indexUrl="/employees"
            transform={transformEmployee}
        >
            {(employee, edit, buttons, error) => (
                <FormEmployee
                    title='Alterar Colaborador'
                    model={employee}
                    error={error}
                    buttons={() => buttons("/employees/create", employee.id ? employee.id : 0)}
                    onSubmit={async (values, actions) => {
                        setSuccess(false);
                        const status = await edit(values);
                        setSuccess(status === 200);
                    } }
                >
                    <FormNotify listingLink="/employees" success={success} text="Colaborador alterado com sucesso" />
                </FormEmployee>
            )}
        </EditItem>
    );
}

export default EditEmployee;