import Swal from 'sweetalert2'

export function showAlertSuccess() {
  Swal.fire({
    title: 'Success',
    text: 'Success Do Payment!',
    icon: 'success',
    backdrop: 'static',
    allowOutsideClick: false,

    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel1',
  }).then((result) => {
    if (result.value) {
      window.location.reload();
    } else if (result.dismiss === Swal.DismissReason.cancel) {
    }
  })

}

export function showAlertWarning(message) {
  Swal.fire({
    title: 'Warning!',
    text: message,
    icon: 'warning',
    backdrop: 'static',
    allowOutsideClick: false,
    confirmButtonText: 'OK',
  })
  .then((result) => {
    if (result.value) {
    } else if (result.dismiss === Swal.DismissReason.cancel) {
    }
  })
}

export function showAlertError(error) {
  Swal.fire({
    title: 'Error!',
    text: error,
    icon: 'error',
    backdrop: 'static',
    allowOutsideClick: false,
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
  })
  .then((result) => {
    if (result.value) {
    } else if (result.dismiss === Swal.DismissReason.cancel) {
    }
  })
}