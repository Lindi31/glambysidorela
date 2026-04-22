import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'training',
  title: 'Schulung',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Titel', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'level', title: 'Niveau', type: 'string',
      options: { list: ['Einsteiger', 'Fortgeschritten', 'Masterclass'] } }),
    defineField({ name: 'description', title: 'Beschreibung', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'durationDays', title: 'Dauer (Tage)', type: 'number' }),
    defineField({ name: 'price', title: 'Preis (€)', type: 'number' }),
    defineField({ name: 'includes', title: 'Enthalten', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'upcomingDates', title: 'Kommende Termine', type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'date', type: 'date', title: 'Datum' },
        { name: 'location', type: 'string', title: 'Ort', options: { list: ['Bruchsal', 'Jülich', 'Online'] } },
        { name: 'spotsLeft', type: 'number', title: 'Freie Plätze' },
      ]}] }),
    defineField({ name: 'image', title: 'Titelbild', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'seoTitle', type: 'string' }),
    defineField({ name: 'seoDescription', type: 'text', rows: 2 }),
  ],
})