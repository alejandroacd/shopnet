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


export default {succesfullAlert, deleteMpAlert}
