import {
  ArrowLeft,
  ArrowRight,
  Edit3,
  FileText,
  Paperclip,
  Sparkles,
  SquarePen,
  Stamp,
  Trash2,
  X,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

// Importaciones de Lexical
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";

// Importaciones de Nodos de Lexical
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";

import InitialContentPlugin from "../../Plugins/InitialContentPlugin";

// Importaciones de Estilos y Plugins
import { css } from "@emotion/css";
import ToolbarPlugin from "../../Plugins/ToolbarPlugin";
import type { EditorThemeClasses } from "lexical";
import EditablePlugin from "../../Plugins/EditablePlugin";
import CapturePlugin, {
  type CapturePluginApi,
} from "../../Plugins/CapturePlugin";
import { IA, PqrServices } from "../../services/pqrServices";
import { showToast } from "../../utils/toastUtils";
import ModalOtp from "./ModalOtp";
import { ModalSelectFirma } from "./ModalSelectFirma";
import { ModalSellado } from "./ModalSellado";
import type { AnalisisIA } from "../../interfaces/pqrInterfaces";

interface ModalRespuestaIAProps {
  isOpen: boolean;
  onClose: () => void;
  numeroRadicado?: string;
  pqrData?: string;
}
const plantillaHTML = `<div style="font-family: sans-serif; line-height: 1.6; margin: 40px">
  <div style="margin-bottom: 20px">
    <p>Baranoa, [#FechaRespuesta#]</p>
  </div>

  <div style="margin-bottom: 20px">
    <p>
      <strong>Señor(a):</strong><br />
      [#NombreCompletoSolicitante#]<br />
      [#DireccionSolicitante#]<br />
      [#CorreoElectronicoSolicitante#]<br />
      Baranoa - Atlántico
    </p>
  </div>

  <p>
    <strong>Asunto:</strong> Respuesta a solicitud del PQR con Radicado No.
    [#NumeroConsecutivo#]
  </p>

  <p>
    Por medio del presente, nos permitimos dar respuesta a su petición,
    indicándole en forma anticipada que este Despacho NO ACCEDE a la misma,
    atendiendo las siguientes razones:
  </p>

  <h2
    style="
      text-align: center;
      border-bottom: 1px solid #000;
      padding-bottom: 10px;
    "
  >
    ASPECTOS GENERALES Y ACLARACIONES RESPECTO AL FENÓMENO DE LA PRESCRIPCIÓN DE
    LA ACCIÓN DE COBRO EN MATERIA TRIBUTARIA TERRITORIAL
  </h2>

  <p>
    Nos permitimos indicarle que el artículo 59 de la Ley 788 de 2002, precisa
    siguiente, respecto al procedimiento tributario territorial:
  </p>

  <blockquote
    style="
      background-color: #f4f4f4;
      border-left: 5px solid #ccc;
      padding: 10px;
      margin-left: 20px;
    "
  >
    <p>
      (...) "ARTÍCULO 59. PROCEDIMIENTO TRIBUTARIO TERRITORIAL. Los
      Departamentos y municipios aplicarán los procedimientos establecidos en el
      Estatuto Tributario Nacional, para la administración, determinación,
      discusión, cobro, devoluciones, régimen sancionatorio incluida su
      imposición, a los impuestos por ellos administrados. Así mismo aplicarán
      el procedimiento administrativo de cobro a las multas, derechos y demás
      recursos territoriales. El monto de las sanciones y el término de la
      aplicación de los procedimientos anteriores, podrán disminuirse y
      simplificarse acorde con la naturaleza de sus tributos, y teniendo en
      cuenta la proporcionalidad de estas respecto del monto de los impuestos."
      (...)
    </p>
  </blockquote>

  <p>
    De lo anterior, es posible concluir que en lo atinente a los asuntos de
    prescripción y de cobro coactivo de los tributos municipales, le resultan
    aplicables las normas contempladas en el Estatuto Tributario Nacional,
    armonizadas con las disposiciones contenidas en el Estatuto Tributario
    municipal.
  </p>

  <p>
    Así las cosas, la prescripción de la acción de cobro se encuentra
    contemplada en el artículo 817 del Estatuto Tributario Nacional en la
    siguiente forma:
  </p>

  <blockquote
    style="
      background-color: #f4f4f4;
      border-left: 5px solid #ccc;
      padding: 10px;
      margin-left: 20px;
    "
  >
    <p>
      (...) "Art. 817. Término de prescripción de la acción de cobro. La acción
      de cobro de las obligaciones fiscales prescribe en el término de cinco (5)
      años, contados a partir de:
    </p>
    <ol>
      <li>
        La fecha de vencimiento del término para declarar, fijado por el
        Gobierno Nacional, para las declaraciones presentadas oportunamente;
      </li>
      <li>
        La fecha de presentación de la declaración, en el caso de las
        presentadas en forma extemporánea.
      </li>
      <li>
        La fecha de presentación de la declaración de corrección, en relación
        con los mayores valores.
      </li>
      <li>
        La fecha de ejecutoria del respectivo acto administrativo de
        determinación o discusión.
      </li>
    </ol>
    <p>
      La competencia para decretar la prescripción de la acción de cobro será de
      los Administradores de Impuestos o de Impuestos y Aduanas Nacionales
      respectivos, o de los servidores públicos de la respectiva administración
      en quien estos deleguen dicha facultad y será decretada de oficio o a
      petición de parte." (...)
    </p>
  </blockquote>

  <p>
    De la norma citada, podemos fácilmente concluir que la prescripción solo
    opera para los actos administrativos que determinen la obligación y que, por
    tanto, constituyan una obligación clara, expresa y actualmente exigible.
  </p>

  <p>De lo contrario no aplicará el fenómeno de la prescripción.</p>

  <p>
    Sobre lo anterior, la Subdirección de Fortalecimiento Institucional
    Territorial del Ministerio de Hacienda, mediante concepto N°. 002504 de
    2018, precisó lo siguiente:
  </p>

  <blockquote
    style="
      background-color: #f4f4f4;
      border-left: 5px solid #ccc;
      padding: 10px;
      margin-left: 20px;
    "
  >
    <p>
      "(...) El término para proferir liquidación oficial de aforo es de 5 años
      contados a partir del vencimiento del plazo para declarar. Teniendo en
      cuenta que es la norma aplicable para liquidación oficial del impuesto
      Predial Unificado, consideramos que la administración cuenta con el mismo
      término para proferir la liquidación oficial a través de resolución o por
      el sistema de facturación. En consecuencia, una vez perdida la competencia
      no hay lugar a practicar liquidación oficial frente a períodos frente a
      los cuales haya transcurrido dicho término./ (...) De conformidad con el
      artículo 817 del Estatuto Tributario Nacional, la prescripción, que se
      predica únicamente de las obligaciones contenidas en títulos ejecutivos
      (artículo 828 del ETN), debe ser decretada de oficio o a petición de
      parte./ (...) Los registros de deuda que no hayan sido objeto de
      liquidación oficial y frente a los cuales transcurrió el término para su
      determinación oficial, no constituyen cartera y podrán ser objeto de
      depuración contable en los términos del artículo 355 de la Ley 1819 de
      2016" (...)
    </p>
  </blockquote>

  <p>De lo expuesto podemos concluir lo siguiente:</p>

  <ol type="A">
    <li>
      La administración cuenta con el término de cinco (5) años a partir
      contados a partir de la vigencia fiscal respectiva para DETERMINAR el
      impuesto predial unificado.
    </li>
    <li>
      Una vez determinado se constituye un TÍTULO EJECUTIVO al que le resultan
      aplicables las disposiciones previstas en el artículo 817 del Estatuto
      Tributario Nacional, respecto a la prescripción de la acción de cobro.
    </li>
    <li>
      En ese orden de ideas, y a título de ejemplo, la vigencia por concepto del
      impuesto predial unificado correspondiente al año 2017, puede ser
      determinada hasta cinco (5) años después, esto es, máximo hasta el año
      2022 y, una vez determinada, el citado título ejecutivo puede ser cobrado
      hasta cinco (5) años después so pena de que se aplique el fenómeno de la
      prescripción, esto es, hasta el año 2027.
    </li>
    <li>
      Revisando la información el el sistema tributario del Municipio se
      identifica que para el contribuyente en mención
      [#InformacionDelSolicitante#] y para el predio en mención
      [#InformaciondelPredio o predios identificados#] tienen los siguientes
      titulos notificados y ejecutoriados en debida forma
      [#InformacionTitulosEjecutivos#].
    </li>
  </ol>

  <h2
    style="
      text-align: center;
      border-bottom: 1px solid #000;
      padding-bottom: 10px;
    "
  >
    ASPECTOS DEL CASO ESPECÍFICO
  </h2>

  <p>
    De conformidad con lo expuesto, procedemos a analizar su caso particular
    así:
  </p>

  <ol>
    <li>
      Que, atendiendo lo anterior, las obligaciones para las vigencias
      relacionadas debajo, de conformidad con el sistema de liquidación del
      impuesto predial del municipio de Baranoa, se encuentran debidamente
      determinadas según Factura oficial # 22100110001004 expedida el 17 de
      febrero del 2022, por tanto, opera el fenómeno de la prescripción para el
      título ejecutivo a partir del año 2027, de la matrícula inmobiliaria:
      040-3078457 vigencia 2017-2021.
    </li>
    <li>
      Los periodos comprendidos entre el año 2022 a 2024 se encuentran dentro de
      la competencia temporal para la determinación de las obligación
      tributarias que son 5 años contados a partir del vencimiento del plazo de
      pago según el calendario tributario municipal.
    </li>
    <li>
      Así mismo hacemos saber lo que reza en el estatuto tributario del
      Municipio de Baranoa acuerdo No 004 del 2020, "ARTÍCULO 24. LIQUIDACIÓN Y
      FACTURACIÓN DEL IMPUESTO PREDIAL UNIFICADO. El Impuesto Predial Unificado
      se cobrará al propietario y/o poseedor por la totalidad de los predios
      conforme al avalúo catastral resultante de los procesos catastrales, a
      través de la facturación que constituye determinación oficial del impuesto
      y presta merito ejecutivo. Ley 1430 de 2010 y en la Ley 1819 de 2016.
    </li>
  </ol>

  <p>
    <strong>PARÁGRAFO 1.</strong> El no envío de la factura física por parte de
    la administración no exime al contribuyente del cumplimiento de la
    obligación tributaria.
  </p>

  <p>
    <strong>PARÁGRAFO 2.</strong> Los contribuyentes, responsable, tenedores y
    usufructuarios, que se le determine el impuesto predial unificado, deberán
    pagar los intereses de mora a la tasa efectiva de usura vigente por cada día
    de retraso de mora a partir del vencimiento del plazo máximo estipulado para
    el pago en el calendario tributario.
  </p>

  <p>
    <strong>PARÁGRAFO 3.</strong> DETERMINACIÓN OFICIAL DEL IMPUESTO. Con
    fundamento en la autorización otorgada por el Articulo 69 de la Ley 1111 de
    2006 el cual fue modificado por el artículo 354 de la ley 1819 de 2016, el
    municipio de Baranoa adopta el sistema de facturación que constituirá
    determinación oficial del tributo y prestará merito ejecutivo, por tratarse
    de una obligación clara, expresa y exigible.
  </p>

  <p>
    Este acto de liquidación deberá contener la correcta identificación del
    sujeto pasivo y del bien objeto del impuesto (predial), así como los
    conceptos que permiten calcular el monto de la obligación.
  </p>

  <p>
    La secretaria de Hacienda deberá dejar constancia de la respectiva
    notificación.
  </p>

  <p>
    Previamente a la notificación de las facturas la secretaria de Hacienda
    deberá difundir ampliamente la forma en la que los ciudadanos podrán acceder
    a las mismas.
  </p>

  <p>
    La notificación de la factura se realizará mediante inserción en la página
    web de la Entidad y, simultáneamente, con la publicación en medios físicos
    en el registro, cartelera o lugar visible de la entidad territorial
    competente para la Administración del Tributo territorial.
  </p>

  <p>
    El envío que del acto se haga a la dirección del contribuyente surte efecto
    de divulgación adicional sin que la omisión de esta formalidad invalide la
    notificación efectuada.
  </p>

  <p>
    En los casos en que el contribuyente no esté de acuerdo con la factura
    expedida por la secretaria de Hacienda. Estará obligado a declarar y pagar
    el tributo conforme al sistema de declaración dentro de los plazos
    establecidos, caso en el cual la factura perderá fuerza ejecutoria y contra
    la misma no procederá recurso alguno.
  </p>

  <p>
    En los casos en que el contribuyente opte por el sistema declarativo, la
    factura expedida no producirá efecto legal alguno.
  </p>

  <p>
    En caso de que no exista el Sistema auto declarativo para el correspondiente
    impuesto, el contribuyente podrá interponer el recurso de reconsideración
    dentro de los plazos establecidos en el presente estatuto".
  </p>

  <p>
    Así las cosas, fueron expuestas de manera clara las razones por las cuales
    NO es posible acceder a su solicitud, por tanto, su petición se entiende
    contestada en los términos de la Ley 1755 de 2015, concordante con las
    disposiciones de la Ley 1437 de 2011.
  </p>

  <p>
    [#EstoMencionalo si hay información de mandamiento de pago#]Es nuestro deber
    informarle que la administración municipal expidió mandamiento de pago de su
    obligación por lo cual:
  </p>

  <ol>
    <li>
      [#EstoMencionalo si hay información de mandamiento de pago#] Sírvase
      comparecer ante la secretaria de hacienda de la alcaldía municipal de
      Baranoa Atlántico ubicado en la carrera CRA 19 # 16-47 Barrio Centro del
      Municipio de Baranoa (Atlántico), en horas hábiles de oficina, dentro de
      los diez (10) días siguientes a la fecha de la presente comunicación, para
      efectos de la notificación personal del Mandamiento de Pago No.
      22106111001420 del 21 de julio del 2022 librado dentro del proceso de
      cobro coactivo.
    </li>
  </ol>

  <p>
    Lo invitamos a cancelar las obligaciones, acercándose a la oficina de
    Hacienda Municipal de Baranoa, ya que pronto se harán efectivas estas
    medidas y otras para las siguientes vigencias.
  </p>

  <div style="display: flex; justify-content: space-between; margin-top: 40px">
    <div style="width: 45%; font-weight: bold">
      <p>Atentamente,</p>
      <br />
      <div class="firmaImg1"></div>
      <br />
      <p>[#NombreAbogadoQueProyecta#]</p>
      <p>[#CargoAbogadoQueProyecta#]</p>
    </div>
    <div style="width: 45%; font-weight: bold">
      <p>Atentamente,</p>
      <br />
      <div class="firmaImg1"></div>
      <br />
      <p>[#NombreFuncionarioQueSeLeSolicita#]</p>
      <p>[#CargoFuncionarioQueSeLeSolicita#]</p>
    </div>
  </div>
</div>
`;
console.log(plantillaHTML);
const RespuestaIA = ({
  isOpen,
  onClose,
  numeroRadicado,
  pqrData,
}: ModalRespuestaIAProps) => {
  const [respuesta, setRespuesta] = useState<AnalisisIA | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fetchRespuesta = async () => {
    if (!pqrData) return;

    try {
      // setLoading(true);
      setError(null);
      const res = await IA.getRespuestaByPqrId(pqrData);

      if (res.success) {
        setRespuesta(res.data);
        console.log(respuesta);
      } else {
        setError(res.message || "Ocurrió un error al obtener la respuesta");
      }
    } catch (err) {
      console.error(err);
      setError("Error al conectar con el servidor");
      console.log(error);
    } finally {
      // setLoading(false);
    }
  };
  // Se ejecuta cuando se abre la vista/modal y hay un PQR válido
  useEffect(() => {
    if (isOpen && pqrData) {
      fetchRespuesta();
    }
  }, [isOpen, pqrData]);
  const [ajusteIA, setAjusteIA] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const captureRef = useRef<CapturePluginApi>(null);

  const [step, setStep] = useState<0 | 1 | 2>(0);
  const handleNext = () => setStep((s) => (s < 2 ? ((s + 1) as 0 | 1 | 2) : s));
  const handlePrev = () => setStep((s) => (s > 0 ? ((s - 1) as 0 | 1 | 2) : s));
  // console.log(pqrData);

  {
    /* Hook de control para el modal de OTP */
  }
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);

  {
    /* Hook de control para el modal de seleccion de firmantes */
  }
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);

  {
    /* Hook de control para el manejo de errores en el OTP. Nota: este hook se envia por props al componente*/
  }
  const [otpError, setOtpError] = useState<string | null>(null);

  {
    /* Hook de control para el modal de confirmación de sellado */
  }
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  {
    /* Obtener el id del funcionario en sesion*/
  }
  const userData = localStorage.getItem("userData");
  if (!userData) return null;
  const user = JSON.parse(userData);
  const usuid = user?.id;
  if (!usuid) return null;

  const [firmado, setFirmado] = useState(false);
  const [solicitudFirmaActiva, setSolicitudFirmaActiva] = useState(false);
  const [, setSolicitudFuncionario] = useState<string | null>(null);

  {
    /*
      En esta funcion se obtiene el otp que se ingresa en el modal,
      una vez se tiene se envia junto con el id del usuario en
      sesión para verificar la validez del codigo. Si es valido el
      modal se cierra y se muestra un toast de exito. En esta
      funcion en la validacion de exito de la peticion se
      ubicaria el consumo (si lo hay) para que se posicione la
      firma en el html.
  
      IMPORTANTE: esta funcion debe ser ubicada en el archivo donde
      se va a llamar el modal ya que se envia como props al 
      componente.
    */
  }
  const handleSign = (otp: number) => {
    const validation = async () => {
      try {
        const response = await PqrServices.validateOtp(usuid, otp);
        if (!response.success) throw new Error(response.error);
        showToast(response.data.mensaje, "success");
        setOtpError(null);
        setIsOtpModalOpen(false);
        setFirmado(true);
      } catch (err) {
        console.error("Error al validar otp:", err);
        setOtpError("El código ingresado es incorrecto.");
      }
    };
    validation();
  };

  const handleDeleteSign = () => {
    setFirmado(false);
    showToast("Firma Eliminada");
  };

  const handleRequestSignature = ({ funcionario }: { funcionario: string }) => {
    if (solicitudFirmaActiva) {
      showToast("Ya existe una solicitud de firma en curso.");
      return;
    }
    setSolicitudFirmaActiva(true);
    setSolicitudFuncionario(funcionario);
  };

  const handleCancelSignatureRequest = () => {
    if (!solicitudFirmaActiva) {
      showToast("No hay solicitud de firma para cancelar.");
      return;
    }
    setSolicitudFirmaActiva(false);
    setSolicitudFuncionario(null);
    showToast("Solicitud de firma cancelada", "success");
  };

  const theme: EditorThemeClasses = {
    ltr: css({ textAlign: "left" }),
    rtl: css({ textAlign: "right" }),
    paragraph: css({ margin: "0 0 1rem 0" }),
    quote: css({
      margin: "0 0 1rem 20px",
      borderLeft: "4px solid #ccc",
      paddingLeft: "16px",
    }),
    list: {
      nested: {
        listitem: css({ listStyleType: "disc" }),
      },
      ol: css({ paddingLeft: "2rem" }),
      ul: css({ paddingLeft: "2rem" }),
    },
    text: {
      bold: css({ fontWeight: "bold" }),
      italic: css({ fontStyle: "italic" }),
      underline: css({ textDecoration: "underline" }),
      strikethrough: css({ textDecoration: "line-through" }),
      underlineStrikethrough: css({
        textDecoration: "underline line-through",
      }),
      code: css({
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        fontFamily: "monospace",
        padding: "1px 4px",
        borderRadius: "4px",
      }),
      highlight: css({
        backgroundColor: "yellow",
      }),
      superscript: css({
        verticalAlign: "super",
        fontSize: "smaller",
      }),
      subscript: css({
        verticalAlign: "sub",
        fontSize: "smaller",
      }),
    },
    align: {
      center: css({ textAlign: "center" }),
      right: css({ textAlign: "right" }),
      left: css({ textAlign: "left" }),
      justify: css({ textAlign: "justify" }),
    },
    heading: {
      h1: css({ fontSize: "2rem", margin: "1rem 0", fontWeight: "normal" }),
      h2: css({ fontSize: "1.5rem", margin: "1rem 0", fontWeight: "normal" }),
      h3: css({ fontSize: "1.17rem", margin: "1rem 0", fontWeight: "normal" }),
      h4: css({ fontSize: "1rem", margin: "1rem 0", fontWeight: "normal" }),
      h5: css({ fontSize: "0.83rem", margin: "1rem 0", fontWeight: "normal" }),
      h6: css({ fontSize: "0.67rem", margin: "1rem 0", fontWeight: "normal" }),
    },
  };

  const initialConfig = {
    namespace: "RespuestaIA-1",
    theme,
    onError: (error: Error) => {
      console.error("Error en el editor Lexical:", error);
    },
    editable: isEditable,
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      AutoLinkNode,
      LinkNode,
    ],
  };

  if (!isOpen) return null;
  // En RespuestaIA.tsx

  const handleSave = () => {
    setIsEditable(false);

    // --- PASO DE DEPURACIÓN ---
    if (captureRef.current) {
      const editorStateJSON = captureRef.current.getEditorState().toJSON();
      console.log(
        "Estado del editor (JSON):",
        JSON.stringify(editorStateJSON, null, 2)
      );
    }

    const htmlContent = captureRef.current?.getHtml?.();
    const texto = String(htmlContent);

    console.log("RESPUESTA EN HTML:", texto);
  };

  const renderFooter = () => {
    switch (step) {
      case 0:
        return (
          <div className="border-t bg-white px-6 py-4 flex-shrink-0">
            <div className="flex gap-4 items-center">
              {!isEditable && (
                <>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={ajusteIA}
                      onChange={(e) => setAjusteIA(e.target.value)}
                      placeholder="Añadir ajuste a la IA (ej.: 'Hazlo más formal')"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm resize-none h-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium">
                    <Sparkles className="w-4 h-4" />
                    Enviar
                  </button>
                </>
              )}
              {isEditable && <div className="flex-1"></div>}
              <div className="flex gap-3">
                {isEditable ? (
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
                  >
                    <SquarePen className="w-4 h-4" />
                    Guardar
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditable(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors text-sm font-medium"
                  >
                    <SquarePen className="w-4 h-4" />
                    Editar Manual
                  </button>
                )}
                {!isEditable && (
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
                  >
                    Siguiente
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="border-t bg-white px-6 py-4 flex-shrink-0">
            <div className="grid grid-cols-3 items-center">
              <div className="justify-self-start">
                <button
                  onClick={handlePrev}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 text-sm font-medium"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Anterior
                </button>
              </div>
              <div className="justify-self-center">
                <div className="flex gap-3">
                  {!firmado ? (
                    <button
                      onClick={() => setIsOtpModalOpen(true)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
                    >
                      Firmar
                    </button>
                  ) : (
                    <button
                      onClick={handleDeleteSign}
                      className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                      Eliminar Firma
                    </button>
                  )}
                  {!solicitudFirmaActiva ? (
                    <button
                      onClick={() => setIsSelectModalOpen(true)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                      disabled={!firmado}
                    >
                      Solicitar firma
                    </button>
                  ) : (
                    <button
                      onClick={handleCancelSignatureRequest}
                      className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                      Eliminar solicitud
                    </button>
                  )}
                </div>
              </div>
              <div className="justify-self-end">
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-medium"
                >
                  Siguiente
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="border-t bg-white px-6 py-4 flex-shrink-0">
            <div className="grid grid-cols-3 items-center">
              <div className="justify-self-start">
                <button
                  onClick={handlePrev}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 text-sm font-medium"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Anterior
                </button>
              </div>
              <div className="justify-self-center">
                <button
                  onClick={() => {}}
                  className="flex items-center gap-2 px-4 text-white py-2 bg-blue-600 rounded-md hover:bg-blue-700 text-sm font-medium"
                >
                  <Paperclip className="w-4 h-4" />
                  Agregar soporte a respuesta PDF
                </button>
              </div>
              <div className="justify-self-end">
                <button
                  onClick={() => setIsConfirmModalOpen(true)}
                  className="bg-green-500 text-white font-semibold px-4 flex items-center gap-2 py-2 rounded-lg text-sm hover:bg-green-600 transition"
                >
                  <Stamp />
                  Sellar y finalizar
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[95vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between pt-[10px] pr-[7px] pb-[9px] pl-[20px] border-b bg-gray-100 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 text-blue-800 rounded-sm flex items-center justify-center">
                <Sparkles />
              </div>
              <h2 className="text-base font-medium text-gray-800">
                Proyectar respuesta con agente IA - No. Radicado{" "}
                {numeroRadicado}
              </h2>
            </div>
            <div className="w-1/2 whitespace-nowrap 	overflow-hidden text-ellipsis">
              {/* <span className="font-medium text-gray-800">Asunto: </span> */}
              <span className="text-gray-700">
                Solicitud para revisión prueba para que me devuelvan el dinero
                porque me embargaron la cuenta y ya había pagado el predio.
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-hidden bg-gray-100 flex-grow max-h-[926px]">
            {/* Asunto y Action Buttons */}
            {/* <div className="px-6 py-4">
              <div className="bg-white p-4 rounded-full">
  
              </div>
            </div> */}
            <div className="relative flex justify-center gap-40 py-6">
              <div className=" left-0 right-0 h-0.5 bg-gray-300 z-0 mx-[346px] my-0 absolute top-[52px]" />
              {/* Paso 0: Proyección */}
              <div className="flex flex-col items-center gap-2 z-10">
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center
                      ${
                        step >= 0 ? "bg-blue-600" : "bg-gray-400"
                      } transition-colors`}
                >
                  <FileText className="w-7 h-7 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Proyectar
                </span>
              </div>
              {/* Paso 1: Firmado */}
              <div className="flex flex-col items-center gap-2 z-10">
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center
                      ${
                        step >= 1 ? "bg-blue-600" : "bg-gray-400"
                      } transition-colors`}
                >
                  <Edit3 className="w-7 h-7 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Firmar
                </span>
              </div>
              {/* Paso 2: Sellado*/}
              <div className="flex flex-col items-center gap-2 z-10">
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center
                      ${
                        step >= 2 ? "bg-blue-600" : "bg-gray-400"
                      } transition-colors`}
                >
                  <Stamp className="w-7 h-7 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Sellar
                </span>
              </div>
            </div>

            {/* Document Content */}
            <div className="mx-6 mb-6 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden h-max">
              <LexicalComposer initialConfig={initialConfig}>
                <div className="relative">
                  {isEditable && (
                    <>
                      <ToolbarPlugin />
                      <hr />
                    </>
                  )}
                  <RichTextPlugin
                    contentEditable={
                      <div className="p-4 h-max">
                        <ContentEditable
                          className={css({
                            height: 500,
                            maxHeight: 500,
                            overflowY: "auto",
                            fontSize: "15px",
                            outline: "none",
                            resize: "none",
                            cursor: isEditable ? "text" : "default",
                          })}
                        />
                      </div>
                    }
                    // placeholder={
                    //   <div
                    //     className={css({
                    //       color: "#999",
                    //       overflow: "hidden",
                    //       position: "absolute",
                    //       textOverflow: "ellipsis",
                    //       top: isEditable ? "55px" : "16px",
                    //       left: "16px",
                    //       fontSize: "15px",
                    //       userSelect: "none",
                    //       display: "inline-block",
                    //       pointerEvents: "none",
                    //     })}
                    //   >
                    //     Haz clic en "Editar manual" para comenzar a escribir...
                    //   </div>
                    // }
                    ErrorBoundary={LexicalErrorBoundary}
                  />
                  <HistoryPlugin />
                  <AutoFocusPlugin />
                  <InitialContentPlugin initialHtml={plantillaHTML} />
                  <EditablePlugin isEditable={isEditable} />
                  <CapturePlugin ref={captureRef} />
                </div>
              </LexicalComposer>
            </div>
          </div>
          {renderFooter()}
          <ModalOtp
            isOpen={isOtpModalOpen}
            onClose={() => setIsOtpModalOpen(false)}
            onSign={handleSign}
            otpError={otpError}
            setOtpError={setOtpError}
          />
          <ModalSelectFirma
            isOpen={isSelectModalOpen}
            onClose={() => setIsSelectModalOpen(false)}
            onRequestSignature={handleRequestSignature}
          />
          <ModalSellado
            isOpen={isConfirmModalOpen}
            onClose={() => setIsConfirmModalOpen(false)}
            onBack={() => {}}
            onConfirm={() => {
              showToast("Documento sellado exitosamente", "success");
              setIsConfirmModalOpen(false);
              onClose();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default RespuestaIA;
