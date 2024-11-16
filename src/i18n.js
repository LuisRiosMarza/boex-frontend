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
                    cotizaciones: "Cotizaciones",
                    indices: "Índices",
                    cotizacionAcciones: "Cotización de Acciones",
                    cotizacionesDe: "Cotizaciones de",
                    dia: "Día",
                    mes: "Mes",
                    fecha: "Fecha",
                    cotizacion: "Cotización",
                    agregarEmpresa: "Agregar Empresa"
                },
            },
            ru: {
                translation: {
                    inicio: "Начинать",
                    empresas: "Компании",
                    cotizaciones: "Котировки",
                    indices: "Индексы",
                    cotizacionAcciones: "Котировка акций",
                    cotizacionesDe: "Котировки для",
                    dia: "День",
                    mes: "Месяц",
                    fecha: "Дата",
                    cotizacion: "Котировка",
                    agregarEmpresa: "Добавить компанию"
                },
            },
        }
    });

export default i18next;
