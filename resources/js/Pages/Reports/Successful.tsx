import Modal from "@/Components/Common/Modal";

function ReportSuccessFul(props: any) {
  return (
    <Modal>
      <h1>Reporte enviado correctamente</h1>
      <p>Espera a que nuestras autoridades atiendan tu solicitud.</p>
      <code>Tu código de consulta: {props.report.id}</code>
    </Modal>
  );
}

export default ReportSuccessFul;
