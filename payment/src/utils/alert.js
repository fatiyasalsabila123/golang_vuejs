import Swal from 'sweetalert2'

export function showAlertSuccess() {
  Swal.fire({
    title: 'Success',
    text: 'Success Do Payment!',
    icon: 'success',
    backdrop: 'static',// Optional: also set allowOutsideClick to false
    allowOutsideClick: false, // Optional: also set allowOutsideClick to false
    // showCancelButton: true, //Optional if you need button cancel

    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel1',
  }).then((result) => {
    if (result.value) {
      window.location.reload();
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      // User clicked 'No' or closed the dialog
    }
    // Code here will execute after the SweetAlert2 dialog is closed
  })

}

export function showAlertWarning(message) {
  Swal.fire({
    title: 'Warning!',
    text: message,
    icon: 'warning',
    backdrop: 'static',
    allowOutsideClick: false, // Optional: also set allowOutsideClick to false
    confirmButtonText: 'OK',
  })
  .then((result) => {
    if (result.value) {
      // User clicked 'Yes', continue your logic
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      // User clicked 'No' or closed the dialog
    }
    // Code here will execute after the SweetAlert2 dialog is closed
  })
}

export function showAlertError(error) {
  Swal.fire({
    title: 'Error!',
    text: error,
    icon: 'error',
    backdrop: 'static',
    allowOutsideClick: false, // Optional: also set allowOutsideClick to false
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
  })
  .then((result) => {
    if (result.value) {
      // User clicked 'Yes', continue your logic
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      // User clicked 'No' or closed the dialog
    }
    // Code here will execute after the SweetAlert2 dialog is closed
  })
}