import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

i18next
    .use(initReactI18next)
    .init({
        lng: 'es',  // Idioma por defecto
        fallbackLng: 'es',
        resources: {
            es: {
                translation: {
                    inicio: "Inicio",
                    empresas: "Empresas",
                    participaciones: "Participaciones",
                    indices: "Índices",
                    cotizacionAcciones: "Cotización de Acciones",
                    cotizacionesDe: "Cotizaciones de",
                    dia: "Día",
                    mes: "Mes",
                    fecha: "Fecha",
                    cotizacion: "Cotización",
                    agregarEmpresa: "Agregar Empresa",
                    cotizacionIndices: "Cotizacion de Indices",
                    ordenarPor: "Ordenar por",
                    seleccioneIndice: "Seleccione un índice",
                    aclaracionParticipaciones: "Datos de participación según el modo seleccionado (Día o Mes)",
                    participacionPorEmpresa: "Participaciones por Empresa",
                    codigo: "Codigo",
                    cotizacionIncial: "Cotizacion Inicial",
                    acciones: "Acciones",
                    agregarEmpresa: "Agregar Empresa",
                    codigoEmpresa: "Código de Empresa",
                    nombreEmpresa: "Nombre de la Empresa",
                    cantidadAcciones: "Cantidad de Acciones",
                    botonAgregar: "Agregar Empresa",
                    bienvenido: "Bienvenido a Moscow Exchange",
                    descripcionBienvenida: "Tu fuente confiable para obtener datos en tiempo real sobre el mercado de valores, cotizaciones de acciones, y mucho más.",
                    informacionTiempoReal: "Información en Tiempo Real",
                    descripcionInformacionTiempoReal: "Accede a cotizaciones en tiempo real de las principales empresas e índices bursátiles.",
                    estadisticasMercado: "Estadísticas del Mercado",
                    descripcionEstadisticasMercado: "Consulta estadísticas detalladas sobre el rendimiento de las acciones y mercados en general.",
                    analisisFinanciero: "Análisis Financiero",
                    descripcionAnalisisFinanciero: "Obtén análisis detallados y predicciones basadas en el comportamiento histórico del mercado.",
                    verEmpresas: "Ver empresas"
                },
            },
            ru: {
                translation: {
                    inicio: "Начинать",
                    empresas: "Компании",
                    participaciones: "акции",
                    indices: "Индексы",
                    cotizacionAcciones: "Котировка акций",
                    cotizacionesDe: "Котировки для",
                    dia: "День",
                    mes: "Месяц",
                    fecha: "Дата",
                    cotizacion: "Котировка",
                    agregarEmpresa: "Добавить компанию",
                    cotizacionIndices: "Котировки индексов",
                    ordenarPor: "Сортировать по",
                    seleccioneIndice: "Выберите индекс",
                    aclaracionParticipaciones: "Данные об участии в соответствии с выбранным режимом (День или Месяц)",
                    participacionPorEmpresa: "Участие компании",
                    codigo: "Код",
                    cotizacionIncial: "Первоначальная цена",
                    acciones: "Действия",
                    agregarEmpresa: "Добавить компанию",
                    codigoEmpresa: "Код компании",
                    nombreEmpresa: "Название компании",
                    cotizacionInicial: "Начальная котировка",
                    cantidadAcciones: "Количество акций",
                    botonAgregar: "Добавить компанию",
                    bienvenido: "Добро пожаловать на Московскую биржу",
                    descripcionBienvenida: "Ваш надежный источник для получения актуальных данных о фондовом рынке, котировках акций и многом другом.",
                    informacionTiempoReal: "Информация в реальном времени",
                    descripcionInformacionTiempoReal: "Получите котировки в реальном времени для ведущих компаний и фондовых индексов.",
                    estadisticasMercado: "Рынок статистики",
                    descripcionEstadisticasMercado: "Просматривайте подробную статистику о производительности акций и рынков в целом.",
                    analisisFinanciero: "Финансовый анализ",
                    descripcionAnalisisFinanciero: "Получите подробный анализ и прогнозы, основанные на историческом поведении рынка.",
                    verEmpresas: "Посмотреть компании"
                },
            },
        }
    });

export default i18next;
