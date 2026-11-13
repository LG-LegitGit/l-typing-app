// lib/data/wisdom.ts
// Sacred Wisdom Database - Contextual meaning for LamediYah exercises
//
// Every exercise in lib/data/exercises.ts must have an entry here, keyed by its
// exact text (including punctuation). Run `pnpm check:wisdom` to verify.
// Scripture translations follow the King James Version (public domain), except
// Genesis 1:1, which uses the American Standard Version's "heavens" (שמים is plural).

export interface ExerciseWisdom {
  /** English translation of the Hebrew phrase (or letter names for drills) */
  translation: string;
  /** Spiritual/cultural significance and source */
  wisdom: string;
  /** Optional: Hebrew source reference */
  source?: string;
  /** Optional: Audio pronunciation file */
  audio?: string;
}

export const exerciseMetadata: Record<string, ExerciseWisdom> = {
  // ─────────────────────────────────────────────
  // 🎹 LETTERS · BEGINNER (home row)
  // ─────────────────────────────────────────────
  'שדגכ עיחל שדגכ עיחל': {
    translation: "Shin · Dalet · Gimel · Kaf — Ayin · Yod · Chet · Lamed",
    wisdom: "The home row, keys A S D F G H J K. Rest your fingers here and return after every reach.",
    source: "שורת הבית",
  },
  'לחי גדש כעי שדל גדח': {
    translation: "Home-row letter clusters: finger patterns, not words.",
    wisdom: "Mixing the eight home-row letters builds muscle memory without leaving the row.",
    source: "שורת הבית",
  },
  'ששש דדד גגג כככ עעע ייי חחח ללל': {
    translation: "Shin, Dalet, Gimel, Kaf, Ayin, Yod, Chet, Lamed: three times each.",
    wisdom: "Repeating each key teaches every finger which letter it owns.",
    source: "שורת הבית",
  },
  'יד כל חג דג ילד': {
    translation: "Hand · all · festival · fish · child",
    wisdom: "Your first Hebrew words, typed without leaving the home row.",
  },
  'שלג דגל גדי יחד שכל': {
    translation: "Snow · banner · young goat · together · understanding",
    wisdom: "“His banner over me was love” (Song of Solomon 2:4) uses דגל.",
    source: "שיר השירים ב:ד",
  },
  'ידיד שיח חיל גיל': {
    translation: "Beloved friend · meditation · strength · joy",
    wisdom: "ידיד gives Solomon his other name, Jedidiah, “beloved of the LORD” (2 Samuel 12:25).",
    source: "שמואל ב יב:כה",
  },

  // ─────────────────────────────────────────────
  // 🎹 LETTERS · INTERMEDIATE (top row, bottom row, then all rows)
  // ─────────────────────────────────────────────
  'קרא אור קול רוח פרי': {
    translation: "Read, call · light · voice · spirit, wind · fruit",
    wisdom: "Top-row letters ק ר א ו פ meet the home row. רוח is both “wind” and “spirit” (Genesis 1:2).",
    source: "בראשית א:ב",
  },
  'שלום ירושלים עולם חיים': {
    translation: "Peace · Jerusalem · world, eternity · life",
    wisdom: "“Pray for the peace of Jerusalem” (Psalm 122:6). Final mem (ם) sits on the top row.",
    source: "תהילים קכב:ו",
  },
  'בית בן בת נס מצה': {
    translation: "House · son · daughter · miracle · matzah",
    wisdom: "Bottom-row letters ב ת נ ס מ צ ה. בית is also the name of the letter ב.",
  },
  'שלג דבש חלב דג עץ': {
    translation: "Snow · honey · milk · fish · tree",
    wisdom: "Bottom-row ב and ץ join the home row. חלב and דבש together: “a land flowing with milk and honey” (Exodus 3:8).",
    source: "שמות ג:ח",
  },
  'קר אט ון מצ תס זף': {
    translation: "Letter pairs that reach to the top and bottom rows.",
    wisdom: "Leave the home row and come straight back. Bonus: קר means “cold.”",
  },
  'אמת סוד קץ ון זך': {
    translation: "Truth · secret · end · (vav + final nun) · pure",
    wisdom: "אמת (truth) spans the alphabet: א first, מ middle, ת last. The sages called truth the seal of God.",
  },
  'ברא שמים ארץ אור יום': {
    translation: "Created · heavens · earth · light · day",
    wisdom: "Key words from the first chapter of Genesis.",
    source: "בראשית א",
  },
  'מים חיים קול דממה דקה': {
    translation: "Living water · a still small voice",
    wisdom: "מים חיים: Jeremiah 2:13. קול דממה דקה: 1 Kings 19:12, how God spoke to Elijah.",
    source: "ירמיהו ב:יג · מלכים א יט:יב",
  },

  // ─────────────────────────────────────────────
  // 🎹 LETTERS · ADVANCED (full alphabet & finals)
  // ─────────────────────────────────────────────
  'ךךך םםם ןןן ףףף ץץץ': {
    translation: "Final Kaf, Final Mem, Final Nun, Final Pe, Final Tsadi: three times each.",
    wisdom: "Five letters change shape at the end of a word. ך and ף sit on the home row, ם and ן on the top row, ץ on the bottom row.",
  },
  'מלך שלום אמן כף ארץ': {
    translation: "King · peace · amen · palm of the hand · land",
    wisdom: "One word for each final letter: ך ם ן ף ץ.",
  },
  'אבגד הוזח טיכל מנסע פצקר שת': {
    translation: "The whole alef-bet in order, from Alef to Tav.",
    wisdom: "All 22 letters. Psalm 119 and Lamentations 1 are written as alphabetic acrostics.",
  },
  'שלום למדייה אמת צדק חסד': {
    translation: "Peace · LamediYah · truth · righteousness · lovingkindness",
    wisdom: "Four of the great words of the Hebrew Bible, with this app's name in the middle.",
  },
  'לך לך מארצך וממולדתך ומבית אביך': {
    translation: "Get thee out of thy country, and from thy kindred, and from thy father's house.",
    wisdom: "Genesis 12:1, God's call to Abram. Final kaf (ך) ends five of these words.",
    source: "בראשית יב:א",
  },

  // ─────────────────────────────────────────────
  // 🏺 ROOTS · BEGINNER
  // ─────────────────────────────────────────────
  'ברא קדש חסד': {
    translation: "create · holy · lovingkindness",
    wisdom: "In the Bible, ברא (create) is used only of God's own creating, as in Genesis 1:1.",
    source: "ב־ר־א · ק־ד־ש · ח־ס־ד",
  },
  'אהב ידע עשה': {
    translation: "love · know · do, make",
    wisdom: "Most Hebrew words grow from three-letter roots like these.",
    source: "א־ה־ב · י־ד־ע · ע־ש־ה",
  },
  'שמע דבר הלך': {
    translation: "hear · speak · walk",
    wisdom: "שמע also means “obey.” It opens the Shema (Deuteronomy 6:4).",
    source: "ש־מ־ע · ד־ב־ר · ה־ל־ך",
  },
  'שלם נתן זכר': {
    translation: "whole · give · remember",
    wisdom: "שלום (peace) grows from שלם: peace as wholeness. נתן reads the same in both directions.",
    source: "ש־ל־ם · נ־ת־ן · ז־כ־ר",
  },
  'אור חיה טוב': {
    translation: "light · live · good",
    wisdom: "“And God saw the light, that it was good” (Genesis 1:4): אור and טוב meet.",
    source: "א־ו־ר · ח־י־ה · ט־ו־ב",
  },
  'קום שיר בוא': {
    translation: "rise · sing · come",
    wisdom: "Rise, sing and come: the movement of worship in three roots.",
    source: "ק־ו־ם · ש־י־ר · ב־ו־א",
  },

  // ─────────────────────────────────────────────
  // 🏺 ROOTS · INTERMEDIATE (one root, many words)
  // ─────────────────────────────────────────────
  'קדוש קדושה מקדש קדיש': {
    translation: "holy · holiness · sanctuary · Kaddish",
    wisdom: "Four words, one root: ק־ד־ש, holy, set apart.",
    source: "ק־ד־ש",
  },
  'אהבה אהוב באהבה ואהבת': {
    translation: "love · beloved · with love · and thou shalt love",
    wisdom: "One root, א־ה־ב. ואהבת opens Deuteronomy 6:5, right after the Shema.",
    source: "א־ה־ב",
  },
  'מדבר דברי דברתי דבור': {
    translation: "speaks (or wilderness) · words of · I spoke · speech",
    wisdom: "Root ד־ב־ר. מדבר means both “speaks” and “wilderness,” where Israel heard God's word.",
    source: "ד־ב־ר",
  },
  'שמר שומר שמירה משמרת': {
    translation: "keep · keeper, watchman · keeping · watch, charge",
    wisdom: "Root ש־מ־ר, to guard or keep. “Watchman, what of the night?” (Isaiah 21:11).",
    source: "ש־מ־ר",
  },
  'כתב כותב מכתב כתובים': {
    translation: "wrote · writes, writer · letter · Writings",
    wisdom: "Root כ־ת־ב. כתובים (Writings) is the third part of the Tanakh: Torah, Prophets, Writings.",
    source: "כ־ת־ב",
  },

  // ─────────────────────────────────────────────
  // 🏺 ROOTS · ADVANCED (roots in phrases)
  // ─────────────────────────────────────────────
  'קדוש קדוש קדוש יהוה צבאות': {
    translation: "Holy, holy, holy, is the LORD of hosts.",
    wisdom: "Isaiah 6:3, the song of the seraphim. Root ק־ד־ש, three times.",
    source: "ישעיהו ו:ג",
  },
  'ואהבת לרעך כמוך': {
    translation: "Thou shalt love thy neighbour as thyself.",
    wisdom: "Leviticus 19:18. Rabbi Akiva called it a great principle of the Torah.",
    source: "ויקרא יט:יח",
  },
  'דברי חכמים בנחת נשמעים': {
    translation: "The words of wise men are heard in quiet.",
    wisdom: "Ecclesiastes 9:17. Roots ד־ב־ר (speak), ח־כ־ם (wise), ש־מ־ע (hear).",
    source: "קהלת ט:יז",
  },
  'יהוה שמרך יהוה צלך': {
    translation: "The LORD is thy keeper: the LORD is thy shade.",
    wisdom: "Psalm 121:5. Root ש־מ־ר (keep), with final kaf (ך) meaning “your.”",
    source: "תהילים קכא:ה",
  },
  'נתתי את תורתי בקרבם ועל לבם אכתבנה': {
    translation: "I will put my law in their inward parts, and write it in their hearts.",
    wisdom: "Jeremiah 31:33 (31:32 in Hebrew), the new covenant. Roots נ־ת־ן (give) and כ־ת־ב (write).",
    source: "ירמיהו לא:לב",
  },

  // ─────────────────────────────────────────────
  // 📜 VERSES · BEGINNER
  // ─────────────────────────────────────────────
  'יהוה רעי לא אחסר.': {
    translation: "The LORD is my shepherd; I shall not want.",
    wisdom: "Psalm 23:1, a declaration of complete trust in God's care.",
    source: "תהילים כג:א",
  },
  'אור זרע לצדיק.': {
    translation: "Light is sown for the righteous.",
    wisdom: "Psalm 97:11. Light planted like seed, ready to grow.",
    source: "תהילים צז:יא",
  },
  'טוב להודות ליהוה.': {
    translation: "It is a good thing to give thanks unto the LORD.",
    wisdom: "Psalm 92:1 (92:2 in Hebrew), the Psalm for the Sabbath day.",
    source: "תהילים צב:ב",
  },
  'יהי אור ויהי אור.': {
    translation: "Let there be light: and there was light.",
    wisdom: "Genesis 1:3, God's first spoken words in the Bible.",
    source: "בראשית א:ג",
  },
  'נר לרגלי דברך.': {
    translation: "Thy word is a lamp unto my feet.",
    wisdom: "Psalm 119:105, from the great alphabetic psalm.",
    source: "תהילים קיט:קה",
  },
  'כי עמך מקור חיים.': {
    translation: "For with thee is the fountain of life.",
    wisdom: "Psalm 36:9 (36:10 in Hebrew). מקור חיים echoes the “living water” of Jeremiah 2:13.",
    source: "תהילים לו:י",
  },

  // ─────────────────────────────────────────────
  // 📜 VERSES · INTERMEDIATE
  // ─────────────────────────────────────────────
  'שמע ישראל יהוה אלהינו יהוה אחד.': {
    translation: "Hear, O Israel: The LORD our God is one LORD.",
    wisdom: "Deuteronomy 6:4, the Shema. The central declaration of Jewish faith, said morning and evening.",
    source: "דברים ו:ד",
  },
  'הללויה הודו ליהוה כי טוב כי לעולם חסדו.': {
    translation: "Praise ye the LORD. O give thanks unto the LORD; for he is good: for his mercy endureth for ever.",
    wisdom: "Psalm 106:1. הללויה (Hallelujah) means “praise Yah.”",
    source: "תהילים קו:א",
  },
  'אשא עיני אל ההרים מאין יבא עזרי.': {
    translation: "I will lift up mine eyes unto the hills, from whence cometh my help.",
    wisdom: "Psalm 121:1, a Song of Ascents sung by pilgrims going up to Jerusalem.",
    source: "תהילים קכא:א",
  },
  'הנה מה טוב ומה נעים שבת אחים גם יחד.': {
    translation: "Behold, how good and how pleasant it is for brethren to dwell together in unity!",
    wisdom: "Psalm 133:1, a Song of Ascents, often sung as Hineh Mah Tov.",
    source: "תהילים קלג:א",
  },

  // ─────────────────────────────────────────────
  // 📜 VERSES · ADVANCED
  // ─────────────────────────────────────────────
  'בראשית ברא אלהים את השמים ואת הארץ.': {
    translation: "In the beginning God created the heavens and the earth.",
    wisdom: "Genesis 1:1, the first words of the Torah.",
    source: "בראשית א:א",
  },
  'כי ידעתי את המחשבות אשר אנכי חשב עליכם.': {
    translation: "For I know the thoughts that I think toward you.",
    wisdom: "Jeremiah 29:11 (slightly shortened), written to the exiles in Babylon.",
    source: "ירמיהו כט:יא",
  },
  'צדיק כתמר יפרח כארז בלבנון ישגה.': {
    translation: "The righteous shall flourish like the palm tree: he shall grow like a cedar in Lebanon.",
    wisdom: "Psalm 92:12 (92:13 in Hebrew), from the Psalm for the Sabbath day.",
    source: "תהילים צב:יג",
  },
  'עשות משפט ואהבת חסד והצנע לכת עם אלהיך.': {
    translation: "To do justly, and to love mercy, and to walk humbly with thy God.",
    wisdom: "Micah 6:8, the prophet's summary of what the LORD requires.",
    source: "מיכה ו:ח",
  },

  // ─────────────────────────────────────────────
  // 🕍 PRAYERS · BEGINNER
  // ─────────────────────────────────────────────
  'ברוך אתה יהוה אלהינו מלך העולם.': {
    translation: "Blessed are You, LORD our God, King of the universe.",
    wisdom: "The opening of nearly every Jewish blessing.",
    source: "נוסח הברכות",
  },
  'מודה אני לפניך מלך חי וקיים.': {
    translation: "I give thanks before You, living and eternal King.",
    wisdom: "Modeh Ani, the first words said on waking.",
    source: "מודה אני",
  },
  'יברכך יהוה וישמרך.': {
    translation: "The LORD bless thee, and keep thee.",
    wisdom: "Numbers 6:24, the first line of the Priestly Blessing (Birkat Kohanim).",
    source: "במדבר ו:כד",
  },
  'ברוך שם כבוד מלכותו לעולם ועד.': {
    translation: "Blessed be the name of His glorious kingdom for ever and ever.",
    wisdom: "Said quietly right after the first line of the Shema.",
    source: "קריאת שמע",
  },

  // ─────────────────────────────────────────────
  // 🕍 PRAYERS · INTERMEDIATE
  // ─────────────────────────────────────────────
  'אדון עולם אשר מלך בטרם כל יציר נברא.': {
    translation: "Lord of the world, who reigned before any creature was formed.",
    wisdom: "Opening line of Adon Olam, a hymn sung in many services.",
    source: "אדון עולם",
  },
  'עושה שלום במרומיו הוא יעשה שלום עלינו.': {
    translation: "He who makes peace in His high places, may He make peace upon us.",
    wisdom: "Closes the Amidah and the Kaddish. Its first words come from Job 25:2.",
    source: "קדיש · איוב כה:ב",
  },
  'יאר יהוה פניו אליך ויחנך.': {
    translation: "The LORD make his face shine upon thee, and be gracious unto thee.",
    wisdom: "Numbers 6:25, the second line of the Priestly Blessing.",
    source: "במדבר ו:כה",
  },
  'ישא יהוה פניו אליך וישם לך שלום.': {
    translation: "The LORD lift up his countenance upon thee, and give thee peace.",
    wisdom: "Numbers 6:26, the last line of the Priestly Blessing, ending in שלום.",
    source: "במדבר ו:כו",
  },
  'אשרי יושבי ביתך עוד יהללוך סלה.': {
    translation: "Blessed are they that dwell in thy house: they will be still praising thee. Selah.",
    wisdom: "Psalm 84:4 (84:5 in Hebrew), the opening of Ashrei, said three times a day.",
    source: "תהילים פד:ה",
  },

  // ─────────────────────────────────────────────
  // 🕍 PRAYERS · ADVANCED
  // ─────────────────────────────────────────────
  'אנא בכח גדולת ימינך תתיר צרורה.': {
    translation: "We beg You, by the great power of Your right hand, set the captive free.",
    wisdom: "Opening line of Ana B'Koach, attributed to Rabbi Nechunya ben HaKanah and sung on Friday night.",
    source: "אנא בכח",
  },
  'אשרי האיש אשר לא הלך בעצת רשעים.': {
    translation: "Blessed is the man that walketh not in the counsel of the ungodly.",
    wisdom: "Psalm 1:1, the first verse of the Psalms.",
    source: "תהילים א:א",
  },
  'יושב בסתר עליון בצל שדי יתלונן.': {
    translation: "He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty.",
    wisdom: "Psalm 91:1, a psalm of protection traditionally said at bedtime.",
    source: "תהילים צא:א",
  },
} as const;

// 🧠 Type-safe lookup helper
export const getExerciseWisdom = (exercise: string): ExerciseWisdom | undefined => {
  return exerciseMetadata[exercise as keyof typeof exerciseMetadata];
};

// 📊 Metadata stats (for debugging/development)
export const wisdomCount = Object.keys(exerciseMetadata).length;
export const wisdomKeys = Object.keys(exerciseMetadata) as (keyof typeof exerciseMetadata)[];
