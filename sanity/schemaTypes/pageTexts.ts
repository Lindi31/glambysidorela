import { defineField, defineType } from 'sanity'
import { DEFAULT_TEXTS } from '../../lib/texts'

const GROUPS: Record<string, string> = {
  home: 'Startseite', cta: 'Abschluss-Bereich (dunkel)', leistungen: 'Leistungen', leistung: 'Einzelne Leistung',
  schulungen: 'Academy', galerie: 'Galerie', kontakt: 'Kontakt', ueberMich: 'Über mich', termin: 'Terminbuchung',
  brautpaket: 'Brautpaket', gutschein: 'Gutschein', shop: 'Pflege', bewertung: 'Bewertung', beautyCheck: 'Beauty-Check',
}

const LABELS: Record<string, string> = {
  title: 'Überschrift', lead: 'Einleitung', text: 'Text', action: 'Link-Text', empty: 'Text, wenn nichts da ist',
  kicker: 'Kleine Zeile oben', headline: 'Große Überschrift', statement: 'Großer Text unter dem Foto', railTitle: 'Überschrift Behandlungen',
  locationsTitle: 'Überschrift Standorte', testimonialsTitle: 'Überschrift Kundenstimmen', voucherLabel: 'Wort auf der Gutschein-Karte',
  tileCheck: 'Kachel Beauty-Check', tileBeratung: 'Kachel Beratung', tileGutschein: 'Kachel Gutschein', tileBraut: 'Kachel Brautpaket',
  tilePflege: 'Kachel Pflege', tileSchulung: 'Kachel Academy', doneTitle: 'Überschrift nach dem Absenden', doneText: 'Text nach dem Absenden',
  bookingTitle: 'Überschrift Buchungskarte', photosTitle: 'Überschrift Bilder', stepsTitle: 'Überschrift Ablauf', relatedTitle: 'Überschrift Weitere Leistungen',
  step1: 'Ablauf Schritt 1', step2: 'Ablauf Schritt 2', step3: 'Ablauf Schritt 3', reminderTitle: 'Überschrift Erinnerung',
  reminderConsent: 'Text Einwilligung', reminderDone: 'Text nach dem Absenden', includesTitle: 'Überschrift Inhalte', datesTitle: 'Überschrift Termine',
  requestTitle: 'Überschrift Anfrage', calculatorTitle: 'Überschrift Rechner', calculatorNote: 'Hinweis unter dem Rechner', waitlistTitle: 'Überschrift Warteliste',
  waitlistLead: 'Text Warteliste', waitlistDoneTitle: 'Überschrift nach Eintrag', waitlistDoneText: 'Text nach Eintrag', whatsappNote: 'Zusatz bei WhatsApp',
  formTitle: 'Überschrift Formular', fallbackHeadline: 'Überschrift (wenn in "Über Sidorela" keine steht)', fallbackStory: 'Text (wenn in "Über Sidorela" keiner steht)',
  certificatesTitle: 'Überschrift Zertifikate', treatmentTitle: 'Schritt Behandlung', placeTitle: 'Schritt Standort', timeTitle: 'Schritt Uhrzeit', detailsTitle: 'Schritt Daten',
  requestTitleJuelich: 'Anfrage Jülich', requestTitleOther: 'Anfrage andere Behandlungen', requestLead: 'Text Anfrage', requestDoneTitle: 'Überschrift nach Anfrage',
  companionTitle: 'Überschrift Begleitung', companionText: 'Text Begleitung', cardNote: 'Text auf der Karte', payNote: 'Hinweis zur Zahlung', badge: 'Kennzeichnung',
  q1: 'Frage 1', q2: 'Frage 2', q3: 'Frage 3', question: 'Frage', a1: 'Antwort 1', a2: 'Antwort 2', a3: 'Antwort 3', a4: 'Antwort 4', a5: 'Antwort 5', resultLead: 'Text über dem Ergebnis',
}

const toFields = (value: Record<string, unknown>): ReturnType<typeof defineField>[] =>
  Object.entries(value).map(([name, entry]) =>
    typeof entry === 'object'
      ? defineField({ name, title: LABELS[name] ?? name, type: 'object', options: { collapsible: true, collapsed: true }, fields: toFields(entry as Record<string, unknown>) })
      : defineField({ name, title: LABELS[name] ?? name, type: String(entry).length > 60 ? 'text' : 'string', ...(String(entry).length > 60 ? { rows: 3 } : {}) }),
  )

export default defineType({
  name: 'pageTexts',
  title: 'Seitentexte',
  type: 'document',
  groups: Object.entries(GROUPS).map(([name, title], index) => ({ name, title, default: index === 0 })),
  fields: Object.entries(DEFAULT_TEXTS).map(([name, entry]) =>
    defineField({ name, title: GROUPS[name], group: name, type: 'object', fields: toFields(entry) }),
  ),
  preview: { prepare: () => ({ title: 'Seitentexte' }) },
})
