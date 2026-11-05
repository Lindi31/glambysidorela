import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'treatmentCategory',
  title: 'Behandlungs-Bereich',
  type: 'document',
  fields: [
    defineField({ name: 'key', title: 'Kennung (nicht ändern)', type: 'string', readOnly: true }),
    defineField({ name: 'title', title: 'Name auf der Startseite', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'label', title: 'Name auf der Seite Leistungen', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'line', title: 'Kurzer Text', type: 'text', rows: 2 }),
    defineField({ name: 'order', title: 'Reihenfolge', type: 'number' }),
  ],
  orderings: [{ title: 'Reihenfolge', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
})
