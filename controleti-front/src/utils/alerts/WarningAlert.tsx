import Swal from "sweetalert2";

function WarningAlert(
    title: string = "Informação",
    text: string = "Nada a melhorar",
    confirmButtonText: string = "OK"
) {
    Swal.fire({
        icon: 'warning',
        title,
        html: `${text}`, 
        confirmButtonText,
        confirmButtonColor: '#db2323'
    })
}

export default WarningAlert;