import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site-Einstellungen',
  type: 'document',
  fields: [
    defineField({ name: 'brandName', type: 'string' }),
    defineField({ name: 'tagline', type: 'string' }),
    defineField({ name: 'locations', type: 'array', of: [{ type: 'object', fields: [
      { name: 'city', type: 'string' },
      { name: 'addressLine', type: 'string' },
      { name: 'hours', type: 'string' },
      { name: 'phone', type: 'string' },
    ]}] }),
    defineField({ name: 'instagram', type: 'url' }),
    defineField({ name: 'tiktok', type: 'url' }),
    defineField({ name: 'whatsapp', type: 'string', description: 'Nummer inkl. Ländercode, ohne +' }),
    defineField({ name: 'clientCount', title: 'Anzahl zufriedener Kundinnen', type: 'number' }),
  ],
})