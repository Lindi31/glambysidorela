import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({ name: 'text', title: 'Text', type: 'text', rows: 4 }),
    defineField({ name: 'rating', title: 'Sterne', type: 'number',
      options: { list: [1, 2, 3, 4, 5] } }),
    defineField({ name: 'serviceCategory', title: 'Passend zu Kategorie', type: 'string' }),
    defineField({ name: 'featured', title: 'Auf Startseite zeigen?', type: 'boolean' }),
  ],
})