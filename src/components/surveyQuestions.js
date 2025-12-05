// 🚚 ENQUÊTE TRANSPORT DE MARCHANDISES
// Based on the French freight transport questionnaire

export const templateSurveyQuestions = [
    // POSTE - Survey position (pre-filled by surveyor)
    {
        id: "POSTE",
        text: "Position de l'enquêteur :",
        type: 'singleChoice',
        options: [
            { id: 1, text: "Passerelle côté Est (en haut au niveau des ascenseurs / escaliers côté Est, montants uniquement)", next: "Q1" },
            { id: 2, text: "Passerelle côté Ouest (en haut au niveau des ascenseurs / escaliers côté Ouest, montants uniquement)", next: "Q1" },
            { id: 3, text: "PASO côté Est (personnes qui descendent les escaliers sur le PASO Est)", next: "Q1" },
            { id: 4, text: "PASO côté Ouest (en bas des escaliers côté Ouest, sous la couverture, entrants uniquement)", next: "Q1" }
        ]
    },

    // Q1 - RER usage filter
    {
        id: "Q1",
        text: "Allez-vous ou venez vous de prendre le RER ?",
        type: 'singleChoice',
        options: [
            { id: 1, text: "Oui", next: "end" },
            { id: 2, text: "Non", next: "Q2" }
        ]
    },

    // Q2 - Bus usage filter
    {
        id: "Q2",
        text: "Allez-vous ou venez vous de prendre le bus ?",
        type: 'singleChoice',
        options: [
            { id: 1, text: "Oui", next: "Q2A_ORIGINE_BUS" },
            { id: 2, text: "Non", next: "Q3_ORIGINE" }
        ]
    },

    // ============ SECTION BUS ============

    // Q2a - Bus origin type
    {
        id: "Q2A_ORIGINE_BUS",
        text: "D'où venez-vous ?",
        type: 'singleChoice',
        options: [
            { id: 1, text: "Quartier", next: "Q2A_QUARTIER_ORIGINE" },
            { id: 2, text: "Gare routière", next: "Q2A_GARE_ROUTIERE_ORIGINE" }
        ]
    },

    // Q2a - Quartier origin
    {
        id: "Q2A_QUARTIER_ORIGINE",
        text: "Quartier (carte ou adresse si ils ne reconnaissent pas sur la carte, où s'ils viennent de plus loin) :",
        type: 'freeText',
        freeTextPlaceholder: "Quartier ou adresse",
        next: "Q2B_DESTINATION_BUS"
    },

    // Q2a - Gare routière origin
    {
        id: "Q2A_GARE_ROUTIERE_ORIGINE",
        text: "Quelle gare routière et numéro de bus ?",
        type: 'singleChoice',
        options: [
            { id: 1, text: "Gare routière Zola Ouest Cimetière", next: "Q2A_NUMERO_BUS_ORIGINE" },
            { id: 2, text: "Gare routière Barbusse Est Centre-ville", next: "Q2A_NUMERO_BUS_ORIGINE" }
        ]
    },

    // Q2a - Bus number origin
    {
        id: "Q2A_NUMERO_BUS_ORIGINE",
        text: "Numéro de bus :",
        type: 'freeText',
        freeTextPlaceholder: "Numéro",
        next: "Q2B_DESTINATION_BUS"
    },

    // Q2b - Bus destination type
    {
        id: "Q2B_DESTINATION_BUS",
        text: "Où allez-vous ?",
        type: 'singleChoice',
        options: [
            { id: 1, text: "Quartier", next: "Q2B_QUARTIER_DESTINATION" },
            { id: 2, text: "Gare routière", next: "Q2B_GARE_ROUTIERE_DESTINATION" }
        ]
    },

    // Q2b - Quartier destination
    {
        id: "Q2B_QUARTIER_DESTINATION",
        text: "Quartier (carte ou adresse si ils ne reconnaissent pas sur la carte, où s'ils viennent de plus loin) :",
        type: 'freeText',
        freeTextPlaceholder: "Quartier ou adresse",
        next: "end"
    },

    // Q2b - Gare routière destination
    {
        id: "Q2B_GARE_ROUTIERE_DESTINATION",
        text: "Quelle gare routière et numéro de bus ?",
        type: 'singleChoice',
        options: [
            { id: 1, text: "Zola Ouest Cimetière", next: "Q2B_NUMERO_BUS_DESTINATION" },
            { id: 2, text: "Barbusse Est Centre-ville", next: "Q2B_NUMERO_BUS_DESTINATION" }
        ]
    },

    // Q2b - Bus number destination
    {
        id: "Q2B_NUMERO_BUS_DESTINATION",
        text: "Numéro de bus :",
        type: 'freeText',
        freeTextPlaceholder: "Numéro",
        next: "end"
    },

    // ============ SECTION NON-BUS (Q3) ============

    // Q3 - Origin for non-bus users
    {
        id: "Q3_ORIGINE",
        text: "D'où venez-vous ? Quartier (carte ou adresse si ils ne reconnaissent pas sur la carte, où s'ils viennent de plus loin) :",
        type: 'freeText',
        freeTextPlaceholder: "Quartier ou adresse",
        next: "Q3_DESTINATION"
    },

    // Q3 - Destination for non-bus users
    {
        id: "Q3_DESTINATION",
        text: "Où allez-vous ? Quartier (carte ou adresse si ils ne reconnaissent pas sur la carte, où s'ils viennent de plus loin) :",
        type: 'freeText',
        freeTextPlaceholder: "Quartier ou adresse",
        next: "end"
    }
];

/*
🎯 FLASH SURVEY STRUCTURE:

⚡ FLOW:
POSTE → Q1 → Q2 → Q2A/Q3 → end

📋 POSTE - POSITIONS D'ENQUÊTE:
- Passerelle côté Est (en haut, montants uniquement)
- Passerelle côté Ouest (en haut, montants uniquement)
- PASO côté Est (personnes qui descendent les escaliers)
- PASO côté Ouest (en bas des escaliers, entrants uniquement)

🔀 ROUTING LOGIC:
- POSTE: Surveyor position (pre-filled, fixed per surveyor)
- Q1: RER user? → Yes = END / No = Q2
- Q2: Bus user? → Yes = Q2A (origin+destination) / No = Q3 (origin+destination)
- Q2A: Origin type → Quartier or Gare routière (with bus number)
- Q2B: Destination type → Quartier or Gare routière (with bus number)
- Q3: Simple origin + destination for non-bus/non-RER users

✅ FEATURES:
- Ultra-short survey (maximum 4-5 questions)
- Filters out RER users immediately
- Separate flow for bus vs non-bus users
- Allows back navigation if user makes mistake
- Position tracking for data analysis (1 surveyor per position, no rotation)
*/