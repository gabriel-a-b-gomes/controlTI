import Swal from "sweetalert2";

function InfoAlert(
    title: string = "Informação",
    text: string,
    confirmButtonText: string = "Certo",
    confirmButtonColor: string = '#885AC3'
) {
    Swal.fire({
        icon: 'info',
        title,
        html: `${text}`, 
        confirmButtonText,
        confirmButtonColor: confirmButtonColor
    })
}

export default InfoAlert;