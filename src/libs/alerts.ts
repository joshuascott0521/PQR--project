import Swal from "sweetalert2";

export const mostrarAlertaSimple = (titulo: string, mensaje: string) => {
  Swal.fire(titulo, mensaje, "info");
};

export const mostrarAlertaExito = (mensaje: string) => {
  Swal.fire("¡Éxito!", mensaje, "success");
};

export const mostrarAlertaError = (mensaje: string) => {
  Swal.fire("¡Error!", mensaje, "error");
};

export const mostrarAlertaConfirmacion = async (titulo: string, texto: string) => {
  const result = await Swal.fire({
    title: titulo,
    text: texto,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, confirmar",
    cancelButtonText: "Cancelar",
  });

  return result.isConfirmed;
};

export const mostrarAlertaTemporizada = async (
  titulo: string,
  mensaje: string,
  duracion: number = 2000,
  icono: "success" | "error" | "warning" | "info" | "question" = "info"
) => {
  await Swal.fire({
    title: titulo,
    html: mensaje,
    icon: icono,
    timer: duracion,
    didOpen: () => {
      Swal.showLoading();
    },
    willClose: () => {
      // Ya no se necesita clearInterval
    }
  }).then((result) => {
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log("Se cerró automáticamente por el temporizador");
    }
  });
};
