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
                    cotizacionIndices: "Cotizacion de Indices"
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
                    cotizacionIndices: "Котировки индексов"
                },
            },
        }
    });

export default i18next;
