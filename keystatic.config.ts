import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    divisions: collection({
      label: 'Divisiones del Grupo',
      slugField: 'name',
      path: 'src/content/divisions/*',
      schema: {
        name: fields.slug({ name: { label: 'Nombre de la División' } }),
        subheading: fields.text({ label: 'Subtítulo / Especialidad' }),
        tagline: fields.text({ label: 'Lema / Tagline' }),
        description: fields.text({ label: 'Descripción Editorial', multiline: true }),
        badge: fields.text({ label: 'Etiqueta / Badge' }),
        ctaText: fields.text({ label: 'Texto del Botón' }),
        ctaUrl: fields.text({ label: 'Enlace de Destino' }),
      },
    }),
    properties: collection({
      label: 'Alojamientos y Propiedades',
      slugField: 'title',
      path: 'src/content/properties/*',
      schema: {
        title: fields.slug({ name: { label: 'Título del Inmueble' } }),
        location: fields.text({ label: 'Ubicación / Urbanización' }),
        ref: fields.text({ label: 'Referencia (ej: AP0129)' }),
        type: fields.select({
          label: 'Tipología',
          options: [
            { label: 'Apartamento', value: 'Apartamento' },
            { label: 'Ático Dúplex', value: 'Ático Dúplex' },
            { label: 'Casa Adosada', value: 'Casa Adosada' },
            { label: 'Villa', value: 'Villa' },
          ],
          defaultValue: 'Apartamento',
        }),
        bedrooms: fields.integer({ label: 'Número de Dormitorios' }),
        bathrooms: fields.integer({ label: 'Número de Baños' }),
        area: fields.text({ label: 'Superficie Construida (ej: 120 m²)' }),
        priceVacational: fields.text({ label: 'Tarifa Vacacional Orientativa' }),
        priceSale: fields.text({ label: 'Precio de Compraventa' }),
        guestyUrl: fields.text({ label: 'Enlace a Ficha en Guesty Engine' }),
      },
    }),
    services: collection({
      label: 'Servicios para Propietarios',
      slugField: 'title',
      path: 'src/content/services/*',
      schema: {
        title: fields.slug({ name: { label: 'Nombre del Servicio' } }),
        tagline: fields.text({ label: 'Subtítulo del Servicio' }),
        description: fields.text({ label: 'Descripción Detallada', multiline: true }),
        division: fields.select({
          label: 'División Responsable',
          options: [
            { label: 'Just Banús', value: 'JUST BANUS' },
            { label: 'Iberian Sun', value: 'IBERIAN SUN' },
            { label: 'Serinamar', value: 'SERINAMAR' },
          ],
          defaultValue: 'JUST BANUS',
        }),
      },
    }),
  },
  singletons: {
    home: singleton({
      label: 'Página de Inicio',
      path: 'src/content/singletons/home',
      schema: {
        heroTitle: fields.text({ label: 'Titular Principal (H1)', multiline: true }),
        heroSubtitle: fields.text({ label: 'Subtítulo del Hero', multiline: true }),
        aboutTitle: fields.text({ label: 'Titular Sobre Nosotros' }),
        aboutText: fields.text({ label: 'Texto Institucional', multiline: true }),
      },
    }),
    settings: singleton({
      label: 'Configuración y Contacto',
      path: 'src/content/singletons/settings',
      schema: {
        companyName: fields.text({ label: 'Nombre de Empresa', defaultValue: 'Grupo Serinamar' }),
        phone: fields.text({ label: 'Teléfono Fijo', defaultValue: '952 81 33 62' }),
        mobile: fields.text({ label: 'Móvil / WhatsApp', defaultValue: '678 48 75 94' }),
        email: fields.text({ label: 'Email Corporativo', defaultValue: 'info@serinamar.com' }),
        address: fields.text({ label: 'Dirección Central', defaultValue: 'Urb. Los Naranjos De Marbella, Centro Comercial, Local 5, 29660 Marbella (Málaga)' }),
        guestyUrl: fields.text({ label: 'URL Motor Guesty', defaultValue: 'https://serinamar.guestybookings.com' }),
        guestyOwnersUrl: fields.text({ label: 'URL Owner Portal Guesty', defaultValue: 'https://serinamar.guestyowners.com' }),
      },
    }),
  },
});
