import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Pflege-Produkt',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'detail', title: 'Kurzer Text', type: 'text', rows: 2 }),
    defineField({ name: 'price', title: 'Preis (€)', type: 'number' }),
    defineField({
      name: 'shape', title: 'Form der Zeichnung', type: 'string',
      options: { list: [
        { title: 'Pumpflasche', value: 'pump' }, { title: 'Serum', value: 'serum' },
        { title: 'Tube', value: 'tube' }, { title: 'Stift', value: 'wand' },
      ] },
      initialValue: 'pump',
    }),
    defineField({ name: 'isExample', title: 'Beispielprodukt?', type: 'boolean', initialValue: true }),
    defineField({ name: 'order', title: 'Reihenfolge', type: 'number' }),
  ],
})
