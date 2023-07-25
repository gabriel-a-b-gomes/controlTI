import Swal from "sweetalert2";

function ErrorAlert(
    title: string = "Erro",
    text: string = "Erro",
    confirmButtonText: string = "OK"
) {
    Swal.fire({
        icon: 'error',
        title,
        html: `${text}`, 
        confirmButtonText,
        confirmButtonColor: '#d33'
    })
}

export default ErrorAlert;