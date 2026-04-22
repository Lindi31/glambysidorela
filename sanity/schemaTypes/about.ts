import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'about',
  title: 'Über Sidorela',
  type: 'document',
  fields: [
    defineField({ name: 'heroImage', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'headline', title: 'Headline', type: 'string' }),
    defineField({ name: 'story', title: 'Meine Geschichte', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'certifications', title: 'Zertifikate / Ausbildungen', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'yearsExperience', title: 'Jahre Erfahrung', type: 'number' }),
  ],
})