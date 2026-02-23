/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'KAZ' | 'ENG';

export interface Generation {
  id: number;
  kazakhName: string;
  englishName: string;
  percentage: number;
  kazakhDescription: string;
  englishDescription: string;
}

export const GENERATIONS: Generation[] = [
  {
    id: 0,
    kazakhName: "Өзің",
    englishName: "You",
    percentage: 100,
    kazakhDescription: "Сіздің генетикалық кодыңыздың бастауы.",
    englishDescription: "The origin of your genetic code."
  },
  {
    id: 1,
    kazakhName: "Бала",
    englishName: "Child",
    percentage: 50,
    kazakhDescription: "Геннің жартысы анасынан, жартысы әкесінен.",
    englishDescription: "Half from mother, half from father."
  },
  {
    id: 2,
    kazakhName: "Немере",
    englishName: "Grandchild",
    percentage: 25,
    kazakhDescription: "Қан екі есе сұйыла түсті.",
    englishDescription: "The blood is diluted twice."
  },
  {
    id: 3,
    kazakhName: "Шөбере",
    englishName: "Great-grandchild",
    percentage: 12.5,
    kazakhDescription: "Генетикалық байланыс азаюда.",
    englishDescription: "Genetic connection is decreasing."
  },
  {
    id: 4,
    kazakhName: "Шөпшек",
    englishName: "Great-great-grandchild",
    percentage: 6.25,
    kazakhDescription: "Төртінші ұрпақ.",
    englishDescription: "Fourth generation."
  },
  {
    id: 5,
    kazakhName: "Немене",
    englishName: "5th Gen Descendant",
    percentage: 3.125,
    kazakhDescription: "Бесінші ұрпақ.",
    englishDescription: "Fifth generation."
  },
  {
    id: 6,
    kazakhName: "Туажат",
    englishName: "6th Gen Descendant",
    percentage: 1.5625,
    kazakhDescription: "Алтыншы ұрпақ.",
    englishDescription: "Sixth generation."
  },
  {
    id: 7,
    kazakhName: "Жекжат",
    englishName: "7th Gen Descendant",
    percentage: 0.78125,
    kazakhDescription: "Жетінші ата. Туыстық шегі.",
    englishDescription: "Seventh generation. Limit of kinship."
  },
  {
    id: 8,
    kazakhName: "Жегжат",
    englishName: "8th Gen Descendant",
    percentage: 0.390625,
    kazakhDescription: "Сегізінші ұрпақ. Генетикалық байланыс үзілді.",
    englishDescription: "Eighth generation. Genetic connection lost."
  }
];

export const TRANSLATIONS = {
  KAZ: {
    heroTitle: "Жеті Ата: Генетикалық код",
    heroSub: "Сенің қаның қанша ұрпаққа жетеді? 8-ші ұрпақта туыстық неге бітеді?",
    startBtn: "Экспериментті бастау",
    infoTitle: "Интерактивті инфографика",
    infoDesc: "Әр ұрпақ сайын ата-баба қаны екі есе сұйылып отырады.",
    labTitle: "Виртуалды лаборатория",
    labDesc: "Өз есіміңізді жазып, ұрпақтардың қалай өсетінін бақылаңыз.",
    theoryTitle: "Ғылыми негіздеме",
    why7: "Неге 7 ата?",
    why7Desc: "Биологиялық тұрғыдан 7-ші ұрпаққа дейін гендердің сақталу ықтималдығы жоғары болады.",
    mutation: "Мутация қаупі",
    mutationDesc: "Жақын туыстар арасындағы неке рецессивті гендердің қосылуына әкеледі.",
    limit: "0.35% шегі",
    limitDesc: "8-ші ұрпақта генетикалық ұқсастық 0.35%-дан төмендейді.",
    paintTitle: "Бояудың сұйылуы (Аналогия)",
    paintDesc: "Көз алдына елестет: сенде бір стақан қанық қызыл бояу бар.",
    dnaTitle: "ДНҚ Спиралының өзгеруі",
    treeTitle: "Жеті ата ағашы",
    sliderLabel: "Ұрпақты таңдаңыз:",
    kinshipEnded: "Туыстық бітті"
  },
  ENG: {
    heroTitle: "Seven Ancestors: Genetic Code",
    heroSub: "How many generations will your blood reach? Why does kinship end at the 8th generation?",
    startBtn: "Start Experiment",
    infoTitle: "Interactive Infographic",
    infoDesc: "Ancestral blood is diluted twice with each generation.",
    labTitle: "Virtual Laboratory",
    labDesc: "Write your name and watch how generations grow.",
    theoryTitle: "Scientific Basis",
    why7: "Why 7 Ancestors?",
    why7Desc: "Biologically, the probability of gene conservation is high up to the 7th generation.",
    mutation: "Mutation Risk",
    mutationDesc: "Marriage between close relatives leads to the combination of recessive genes.",
    limit: "0.35% Limit",
    limitDesc: "At the 8th generation, genetic similarity drops below 0.35%.",
    paintTitle: "Paint Dilution (Analogy)",
    paintDesc: "Imagine: you have a glass of deep red paint.",
    dnaTitle: "DNA Spiral Changes",
    treeTitle: "Seven Ancestors Tree",
    sliderLabel: "Select Generation:",
    kinshipEnded: "Kinship Ended"
  }
};
