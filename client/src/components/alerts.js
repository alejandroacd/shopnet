import swal from 'sweetalert'

export const succesfullAlert = (propTitle) => {
    return swal({
        title: propTitle,
        icon: 'success',
        timer: '3000'
    })
}


export const deleteMpAlert = () => {
    return swal({
        title: 'Desasociaste tu cuenta de Mercado Pago',
        icon: 'info',
        timer: '3000'
    })
}

export const errorAlert = () => {
    return swal({
        title: `Oopss!, algo anduvo mal. Recuerda que debes rellenar todos los campos y subir al menos una foto`,
        icon: 'error',
        timer:'3000'
    })
}


export default {succesfullAlert, deleteMpAlert, errorAlert}
