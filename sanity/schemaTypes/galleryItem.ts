import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'galleryItem',
  title: 'Galerie-Eintrag',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Titel', type: 'string' }),
    defineField({ name: 'category', title: 'Kategorie', type: 'string',
      options: { list: ['lashes', 'brows', 'pmu', 'makeup', 'facial'] } }),
    defineField({ name: 'before', title: 'Vorher', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'after', title: 'Nachher', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'consent', title: 'Einverständnis der Kundin eingeholt?', type: 'boolean',
      description: 'Pflicht vor Veröffentlichung (Bildrechte)', validation: r => r.required() }),
  ],
})