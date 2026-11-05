import type {StructureResolver} from 'sanity/structure'

// Einstellungen und Texte gibt es nur einmal, darum stehen sie als feste Einträge oben.
const SINGLES = ['pageTexts', 'siteSettings', 'about']

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Inhalte')
    .items([
      S.listItem().title('Seitentexte').id('pageTexts').child(S.document().schemaType('pageTexts').documentId('pageTexts')),
      S.listItem().title('Site-Einstellungen').id('siteSettings').child(S.document().schemaType('siteSettings').documentId('33ce2182-7ac1-45d8-903e-b93695ac8cd5')),
      S.listItem().title('Über Sidorela').id('about').child(S.document().schemaType('about').documentId('about')),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => !SINGLES.includes(item.getId() ?? '')),
    ])
