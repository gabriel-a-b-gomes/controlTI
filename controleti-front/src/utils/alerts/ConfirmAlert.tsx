import Swal from "sweetalert2";

function ConfirmAlert(
    onConfirm: any,
    title: string = "Excluir",
    text: string = "Tem Certeza que deseja deletar este item?",
    confirmButtonText: string = "Deletar"
) {
    Swal.fire({
        title,
        text, 
        confirmButtonText,
        cancelButtonText: 'Cancelar',
        showCancelButton: true, 
        confirmButtonColor: '#d33'
    }).then(result => {
        if (result.isConfirmed) onConfirm();
    })
}

export default ConfirmAlert;