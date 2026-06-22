import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site-Einstellungen',
  type: 'document',
  groups: [
    { name: 'general', title: 'Allgemein', default: true },
    { name: 'maintenance', title: '🚧 Wartungsmodus' },
  ],
  fields: [
    defineField({
      name: 'maintenanceMode',
      title: 'Wartungsmodus aktivieren',
      description:
        'Wenn aktiviert, sehen alle Besucher die Wartungsseite. Du selbst kannst die Seite über deinen Vorschau-Link weiter besuchen. Das Studio bleibt immer erreichbar.',
      type: 'boolean',
      initialValue: false,
      group: 'maintenance',
    }),
    defineField({
      name: 'maintenanceMessage',
      title: 'Nachricht auf der Wartungsseite',
      description: 'Optionaler Text, der den Besuchern angezeigt wird.',
      type: 'text',
      rows: 3,
      group: 'maintenance',
    }),
    defineField({ name: 'brandName', type: 'string', group: 'general' }),
    defineField({ name: 'tagline', type: 'string', group: 'general' }),
    defineField({ name: 'locations', type: 'array', group: 'general', of: [{ type: 'object', fields: [
      { name: 'city', type: 'string' },
      { name: 'addressLine', type: 'string' },
      { name: 'hours', type: 'string' },
      { name: 'phone', type: 'string' },
    ]}] }),
    defineField({ name: 'instagram', type: 'url', group: 'general' }),
    defineField({ name: 'tiktok', type: 'url', group: 'general' }),
    defineField({ name: 'whatsapp', type: 'string', description: 'Nummer inkl. Ländercode, ohne +', group: 'general' }),
    defineField({ name: 'clientCount', title: 'Anzahl zufriedener Kundinnen', type: 'number', group: 'general' }),
  ],
})