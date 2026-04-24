import { defineField, defineType } from "sanity"

export default defineType({
  name: "legalPage",
  title: "Rechtliche Seiten",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Titel", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "URL-Slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "content",
      title: "Inhalt",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "object",
          name: "section",
          title: "Abschnitt",
          fields: [
            defineField({ name: "heading", title: "Überschrift", type: "string" }),
            defineField({ name: "body", title: "Text", type: "array", of: [{ type: "block" }] }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title", slug: "slug.current" },
    prepare({ title, slug }) {
      return { title, subtitle: `/${slug}` }
    },
  },
})
