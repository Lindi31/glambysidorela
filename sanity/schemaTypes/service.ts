import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'service',
  title: 'Leistung',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Titel', type: 'string', validation: r => r.required() }),
    defineField({
      name: 'slug', title: 'URL-Slug', type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: r => r.required(),
    }),
    defineField({
      name: 'category', title: 'Kategorie', type: 'string',
      options: {
        list: [
          { title: 'Lashes', value: 'lashes' },
          { title: 'Brows', value: 'brows' },
          { title: 'PMU', value: 'pmu' },
          { title: 'Make-up', value: 'makeup' },
          { title: 'Gesichtsbehandlungen', value: 'facial' },
        ],
      },
      validation: r => r.required(),
    }),
    defineField({ name: 'shortDescription', title: 'Kurzbeschreibung (Karten)', type: 'text', rows: 2 }),
    defineField({ name: 'description', title: 'Ausführliche Beschreibung', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'duration', title: 'Dauer (Min.)', type: 'number' }),
    defineField({ name: 'priceFrom', title: 'Preis ab (€)', type: 'number' }),
    defineField({ name: 'lasts', title: 'Wie lange hält es?', type: 'string', description: 'Kurz, z.B. "3 bis 4 Wochen". Leer lassen, wenn es nicht passt.' }),
    defineField({ name: 'idealFor', title: 'Das passt zu dir, wenn …', type: 'array', of: [{ type: 'string' }], description: 'Am besten drei kurze Punkte.' }),
    defineField({
      name: 'faq', title: 'Häufige Fragen', type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'question', title: 'Frage', type: 'string', validation: r => r.required() }),
          defineField({ name: 'answer', title: 'Antwort', type: 'text', rows: 3, validation: r => r.required() }),
        ],
        preview: { select: { title: 'question', subtitle: 'answer' } },
      }],
    }),
    defineField({ name: 'image', title: 'Titelbild', type: 'image', options: { hotspot: true }, description: 'Erscheint groß oben auf der Seite und auf der Karte. Ohne Bild wird die feine Zeichnung gezeigt.' }),
    defineField({ name: 'gallery', title: 'Galerie', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] }),
    defineField({ name: 'calcomEventType', title: 'Cal.com Event Slug', type: 'string', description: 'z.B. "lash-lifting". Leer lassen: Die Behandlung wird per Anfrage gebucht.' }),
    defineField({ name: 'seoTitle', title: 'SEO-Titel', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO-Beschreibung', type: 'text', rows: 2 }),
    defineField({ name: 'order', title: 'Reihenfolge', type: 'number' }),
    defineField({ name: 'bookingOrder', title: 'Reihenfolge in der Terminbuchung', type: 'number' }),
    defineField({ name: 'quizWhy', title: 'Text beim Beauty-Check', type: 'text', rows: 2 }),
  ],
})