/**
 * Rich offline cinema catalog spanning 1994 to 2026.
 * Contains 35 iconic, critically acclaimed titles across all major genres.
 * Uses universally accessible, high-resolution imagery that bypasses ISP censorship.
 */

export const MOCK_GENRES = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 18, name: 'Drama' },
  { id: 14, name: 'Fantasy' },
  { id: 27, name: 'Horror' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 53, name: 'Thriller' },
];

export const MOCK_MOVIES = [
  // 1. 2026 - Avatar: Fire and Ash
  {
    id: 83533,
    title: 'Avatar: Fire and Ash',
    tagline: 'Discover the ash people of Pandora.',
    overview:
      'The third installment in James Cameron’s epic Avatar saga, exploring new volcanic cultures and mystical biomes across Pandora.',
    release_date: '2026-12-19',
    runtime: 190,
    vote_average: 8.6,
    vote_count: 1200,
    genre_ids: [878, 12, 28],
    genres: [
      { id: 878, name: 'Science Fiction' },
      { id: 12, name: 'Adventure' },
      { id: 28, name: 'Action' },
    ],
    poster_path:
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    backdrop_path:
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80',
    credits: {
      cast: [
        {
          id: 101,
          name: 'Sam Worthington',
          character: 'Jake Sully',
          profile_path:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 102,
          name: 'Zoe Saldaña',
          character: 'Neytiri',
          profile_path:
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 103,
          name: 'Oona Chaplin',
          character: 'Varang',
          profile_path:
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
        },
      ],
    },
    videos: {
      results: [
        {
          id: 'v26',
          site: 'YouTube',
          key: 'd9MyW72ELq0',
          type: 'Trailer',
          official: true,
        },
      ],
    },
  },

  // 2. 2025 - Superman
  {
    id: 799883,
    title: 'Superman',
    tagline: 'Truth, justice, and a better tomorrow.',
    overview:
      'Clark Kent journeys to reconcile his Kryptonian heritage with his human upbringing in Smallville, Kansas, standing as the beacon of hope.',
    release_date: '2025-07-11',
    runtime: 145,
    vote_average: 8.4,
    vote_count: 2400,
    genre_ids: [28, 878, 12],
    genres: [
      { id: 28, name: 'Action' },
      { id: 878, name: 'Science Fiction' },
      { id: 12, name: 'Adventure' },
    ],
    poster_path:
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
    backdrop_path:
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1600&q=80',
    credits: {
      cast: [
        {
          id: 111,
          name: 'David Corenswet',
          character: 'Clark Kent / Superman',
          profile_path:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 112,
          name: 'Rachel Brosnahan',
          character: 'Lois Lane',
          profile_path:
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 113,
          name: 'Nicholas Hoult',
          character: 'Lex Luthor',
          profile_path:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        },
      ],
    },
    videos: {
      results: [
        {
          id: 'v25',
          site: 'YouTube',
          key: 'uhUht6vAsMY',
          type: 'Trailer',
          official: true,
        },
      ],
    },
  },

  // 3. 2024 - Dune: Part Two
  {
    id: 693134,
    title: 'Dune: Part Two',
    tagline: 'Long live the fighters.',
    overview:
      'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family on Arrakis.',
    release_date: '2024-02-27',
    runtime: 166,
    vote_average: 8.5,
    vote_count: 5100,
    genre_ids: [878, 12],
    genres: [
      { id: 878, name: 'Science Fiction' },
      { id: 12, name: 'Adventure' },
    ],
    poster_path:
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80',
    backdrop_path:
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1600&q=80',
    credits: {
      cast: [
        {
          id: 1,
          name: 'Timothée Chalamet',
          character: 'Paul Atreides',
          profile_path:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 2,
          name: 'Zendaya',
          character: 'Chani',
          profile_path:
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 3,
          name: 'Rebecca Ferguson',
          character: 'Lady Jessica',
          profile_path:
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
        },
      ],
    },
    videos: {
      results: [
        {
          id: 'v1',
          site: 'YouTube',
          key: 'Way9Dexny3w',
          type: 'Trailer',
          official: true,
        },
      ],
    },
  },

  // 4. 2024 - Deadpool & Wolverine
  {
    id: 533535,
    title: 'Deadpool & Wolverine',
    tagline: 'Come together.',
    overview:
      'A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary Deadpool behind him, until the TVA recruits him for a universe-saving mission.',
    release_date: '2024-07-24',
    runtime: 128,
    vote_average: 7.7,
    vote_count: 5800,
    genre_ids: [28, 35, 878],
    genres: [
      { id: 28, name: 'Action' },
      { id: 35, name: 'Comedy' },
      { id: 878, name: 'Science Fiction' },
    ],
    poster_path:
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80',
    backdrop_path:
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1600&q=80',
    credits: {
      cast: [
        {
          id: 71,
          name: 'Ryan Reynolds',
          character: 'Wade Wilson / Deadpool',
          profile_path:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 72,
          name: 'Hugh Jackman',
          character: 'Logan / Wolverine',
          profile_path:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 73,
          name: 'Emma Corrin',
          character: 'Cassandra Nova',
          profile_path:
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        },
      ],
    },
    videos: {
      results: [
        {
          id: 'v71',
          site: 'YouTube',
          key: '73_1biulkYk',
          type: 'Trailer',
          official: true,
        },
      ],
    },
  },

  // 5. 2024 - Gladiator II
  {
    id: 558449,
    title: 'Gladiator II',
    tagline: 'What we do in life echoes in eternity.',
    overview:
      'Years after witnessing the death of Maximus at the hands of his uncle, Lucius must enter the Colosseum after the powerful emperors of Rome conquer his home.',
    release_date: '2024-11-13',
    runtime: 148,
    vote_average: 6.8,
    vote_count: 2200,
    genre_ids: [28, 12, 18],
    genres: [
      { id: 28, name: 'Action' },
      { id: 12, name: 'Adventure' },
      { id: 18, name: 'Drama' },
    ],
    poster_path:
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&q=80',
    backdrop_path:
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1600&q=80',
    credits: {
      cast: [
        {
          id: 61,
          name: 'Paul Mescal',
          character: 'Lucius Verus',
          profile_path:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 62,
          name: 'Pedro Pascal',
          character: 'Marcus Acacius',
          profile_path:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 63,
          name: 'Denzel Washington',
          character: 'Macrinus',
          profile_path:
            'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80',
        },
      ],
    },
    videos: {
      results: [
        {
          id: 'v61',
          site: 'YouTube',
          key: '4rgYUipGJNo',
          type: 'Trailer',
          official: true,
        },
      ],
    },
  },

  // 6. 2023 - Oppenheimer
  {
    id: 872585,
    title: 'Oppenheimer',
    tagline: 'The world forever changes.',
    overview:
      'The story of J. Robert Oppenheimer’s role in the development of the atomic bomb during World War II, exploring moral conflict and political fallout.',
    release_date: '2023-07-19',
    runtime: 180,
    vote_average: 8.2,
    vote_count: 9400,
    genre_ids: [18, 53],
    genres: [
      { id: 18, name: 'Drama' },
      { id: 53, name: 'Thriller' },
    ],
    poster_path:
      'https://images.unsplash.com/photo-1579202673506-ca3ce28943ef?auto=format&fit=crop&w=600&q=80',
    backdrop_path:
      'https://images.unsplash.com/photo-1579202673506-ca3ce28943ef?auto=format&fit=crop&w=1600&q=80',
    credits: {
      cast: [
        {
          id: 21,
          name: 'Cillian Murphy',
          character: 'J. Robert Oppenheimer',
          profile_path:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 22,
          name: 'Emily Blunt',
          character: 'Kitty Oppenheimer',
          profile_path:
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 23,
          name: 'Robert Downey Jr.',
          character: 'Lewis Strauss',
          profile_path:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        },
      ],
    },
    videos: {
      results: [
        {
          id: 'v3',
          site: 'YouTube',
          key: 'uYPbbksMxE8',
          type: 'Trailer',
          official: true,
        },
      ],
    },
  },

  // 7. 2023 - Spider-Man: Across the Spider-Verse
  {
    id: 569094,
    title: 'Spider-Man: Across the Spider-Verse',
    tagline: 'It’s how you wear the mask that matters.',
    overview:
      'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.',
    release_date: '2023-05-31',
    runtime: 140,
    vote_average: 8.4,
    vote_count: 6700,
    genre_ids: [16, 28, 12],
    genres: [
      { id: 16, name: 'Animation' },
      { id: 28, name: 'Action' },
      { id: 12, name: 'Adventure' },
    ],
    poster_path:
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80',
    backdrop_path:
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1600&q=80',
    credits: {
      cast: [
        {
          id: 81,
          name: 'Shameik Moore',
          character: 'Miles Morales (voice)',
          profile_path:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 82,
          name: 'Hailee Steinfeld',
          character: 'Gwen Stacy (voice)',
          profile_path:
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 83,
          name: 'Oscar Isaac',
          character: 'Miguel O’Hara (voice)',
          profile_path:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        },
      ],
    },
    videos: {
      results: [
        {
          id: 'v81',
          site: 'YouTube',
          key: 'cqGjhVJWtEg',
          type: 'Trailer',
          official: true,
        },
      ],
    },
  },

  // 8. 2023 - Barbie
  {
    id: 346698,
    title: 'Barbie',
    tagline: 'She’s everything. He’s just Ken.',
    overview:
      'Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land. However, when they get a chance to go to the real world, they soon discover the joys and perils of living among humans.',
    release_date: '2023-07-19',
    runtime: 114,
    vote_average: 7.1,
    vote_count: 9100,
    genre_ids: [35, 14],
    genres: [
      { id: 35, name: 'Comedy' },
      { id: 14, name: 'Fantasy' },
    ],
    poster_path:
      'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80',
    backdrop_path:
      'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1600&q=80',
    credits: {
      cast: [
        {
          id: 91,
          name: 'Margot Robbie',
          character: 'Barbie',
          profile_path:
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 92,
          name: 'Ryan Gosling',
          character: 'Ken',
          profile_path:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 93,
          name: 'America Ferrera',
          character: 'Gloria',
          profile_path:
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        },
      ],
    },
    videos: {
      results: [
        {
          id: 'v91',
          site: 'YouTube',
          key: 'pBk4NYhWNMM',
          type: 'Trailer',
          official: true,
        },
      ],
    },
  },

  // 9. 2022 - The Batman
  {
    id: 414906,
    title: 'The Batman',
    tagline: 'Unmask the truth.',
    overview:
      'In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler.',
    release_date: '2022-03-01',
    runtime: 176,
    vote_average: 7.7,
    vote_count: 9800,
    genre_ids: [80, 9648, 53],
    genres: [
      { id: 80, name: 'Crime' },
      { id: 9648, name: 'Mystery' },
      { id: 53, name: 'Thriller' },
    ],
    poster_path:
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
    backdrop_path:
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=80',
    credits: {
      cast: [
        {
          id: 201,
          name: 'Robert Pattinson',
          character: 'Bruce Wayne / Batman',
          profile_path:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 202,
          name: 'Zoë Kravitz',
          character: 'Selina Kyle / Catwoman',
          profile_path:
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 203,
          name: 'Paul Dano',
          character: 'Edward Nashton / The Riddler',
          profile_path:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        },
      ],
    },
    videos: {
      results: [
        {
          id: 'v201',
          site: 'YouTube',
          key: 'mqqft2x_Aa4',
          type: 'Trailer',
          official: true,
        },
      ],
    },
  },

  // 10. 2022 - Top Gun: Maverick
  {
    id: 361743,
    title: 'Top Gun: Maverick',
    tagline: 'Feel the need. The need for speed.',
    overview:
      'After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads TOP GUN’s elite graduates on a perilous mission.',
    release_date: '2022-05-24',
    runtime: 130,
    vote_average: 8.2,
    vote_count: 8800,
    genre_ids: [28, 18],
    genres: [
      { id: 28, name: 'Action' },
      { id: 18, name: 'Drama' },
    ],
    poster_path:
      'https://images.unsplash.com/photo-1519074069444-1ba4eae16e60?auto=format&fit=crop&w=600&q=80',
    backdrop_path:
      'https://images.unsplash.com/photo-1519074069444-1ba4eae16e60?auto=format&fit=crop&w=1600&q=80',
    credits: {
      cast: [
        {
          id: 211,
          name: 'Tom Cruise',
          character: 'Capt. Pete "Maverick" Mitchell',
          profile_path:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 212,
          name: 'Miles Teller',
          character: 'Lt. Bradley "Rooster" Bradshaw',
          profile_path:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 213,
          name: 'Jennifer Connelly',
          character: 'Penny Benjamin',
          profile_path:
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
        },
      ],
    },
    videos: {
      results: [
        {
          id: 'v211',
          site: 'YouTube',
          key: 'giXco2jaZ_4',
          type: 'Trailer',
          official: true,
        },
      ],
    },
  },

  // 11. 2022 - Everything Everywhere All at Once
  {
    id: 545611,
    title: 'Everything Everywhere All at Once',
    tagline: 'The universe is so much bigger than you realize.',
    overview:
      'An aging Chinese immigrant is swept up in an insane adventure, where she alone can save what’s important to her by connecting with alternate lives across the multiverse.',
    release_date: '2022-03-24',
    runtime: 139,
    vote_average: 7.8,
    vote_count: 6100,
    genre_ids: [28, 12, 878],
    genres: [
      { id: 28, name: 'Action' },
      { id: 12, name: 'Adventure' },
      { id: 878, name: 'Science Fiction' },
    ],
    poster_path:
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
    backdrop_path:
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1600&q=80',
    credits: {
      cast: [
        {
          id: 301,
          name: 'Michelle Yeoh',
          character: 'Evelyn Wang',
          profile_path:
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 302,
          name: 'Ke Huy Quan',
          character: 'Waymond Wang',
          profile_path:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 303,
          name: 'Stephanie Hsu',
          character: 'Joy Wang / Jobu Tupaki',
          profile_path:
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        },
      ],
    },
    videos: {
      results: [
        {
          id: 'v9',
          site: 'YouTube',
          key: 'wxN1T1uxQ2g',
          type: 'Trailer',
          official: true,
        },
      ],
    },
  },

  // 12. 2021 - Dune: Part One
  {
    id: 438631,
    title: 'Dune: Part One',
    tagline: 'Beyond fear, destiny awaits.',
    overview:
      'Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and people.',
    release_date: '2021-09-15',
    runtime: 155,
    vote_average: 7.9,
    vote_count: 11200,
    genre_ids: [878, 12],
    genres: [
      { id: 878, name: 'Science Fiction' },
      { id: 12, name: 'Adventure' },
    ],
    poster_path:
      'https://images.unsplash.com/photo-1473580044384-7ba9967a16a0?auto=format&fit=crop&w=600&q=80',
    backdrop_path:
      'https://images.unsplash.com/photo-1473580044384-7ba9967a16a0?auto=format&fit=crop&w=1600&q=80',
    credits: {
      cast: [
        {
          id: 401,
          name: 'Timothée Chalamet',
          character: 'Paul Atreides',
          profile_path:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 402,
          name: 'Oscar Isaac',
          character: 'Duke Leto Atreides',
          profile_path:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        },
      ],
    },
    videos: {
      results: [
        {
          id: 'v401',
          site: 'YouTube',
          key: '8g18jFHCLXk',
          type: 'Trailer',
          official: true,
        },
      ],
    },
  },

  // 13. 2021 - Spider-Man: No Way Home
  {
    id: 634649,
    title: 'Spider-Man: No Way Home',
    tagline: 'The Multiverse unleashed.',
    overview:
      'Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super hero. When he asks for help from Doctor Strange the stakes become even more dangerous.',
    release_date: '2021-12-15',
    runtime: 148,
    vote_average: 8.0,
    vote_count: 19800,
    genre_ids: [28, 12, 878],
    genres: [
      { id: 28, name: 'Action' },
      { id: 12, name: 'Adventure' },
      { id: 878, name: 'Science Fiction' },
    ],
    poster_path:
      'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=600&q=80',
    backdrop_path:
      'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=1600&q=80',
    credits: {
      cast: [
        {
          id: 501,
          name: 'Tom Holland',
          character: 'Peter Parker / Spider-Man',
          profile_path:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 502,
          name: 'Zendaya',
          character: 'MJ',
          profile_path:
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 503,
          name: 'Benedict Cumberbatch',
          character: 'Stephen Strange / Doctor Strange',
          profile_path:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        },
      ],
    },
    videos: {
      results: [
        {
          id: 'v501',
          site: 'YouTube',
          key: 'JfVOs4VSpmA',
          type: 'Trailer',
          official: true,
        },
      ],
    },
  },

  // 14. 2019 - Parasite
  {
    id: 496243,
    title: 'Parasite',
    tagline: 'Act like you own the place.',
    overview:
      'All unemployed, Ki-taek’s family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident.',
    release_date: '2019-05-30',
    runtime: 132,
    vote_average: 8.5,
    vote_count: 18200,
    genre_ids: [35, 53, 18],
    genres: [
      { id: 35, name: 'Comedy' },
      { id: 53, name: 'Thriller' },
      { id: 18, name: 'Drama' },
    ],
    poster_path:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    backdrop_path:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    credits: {
      cast: [
        {
          id: 601,
          name: 'Song Kang-ho',
          character: 'Kim Ki-taek',
          profile_path:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 602,
          name: 'Lee Sun-kyun',
          character: 'Park Dong-ik',
          profile_path:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 603,
          name: 'Cho Yeo-jeong',
          character: 'Choi Yeon-gyo',
          profile_path:
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
        },
      ],
    },
    videos: {
      results: [
        {
          id: 'v601',
          site: 'YouTube',
          key: '5xH0R_qt8Rk',
          type: 'Trailer',
          official: true,
        },
      ],
    },
  },

  // 15. 2019 - Joker
  {
    id: 475557,
    title: 'Joker',
    tagline: 'Put on a happy face.',
    overview:
      'During the 1980s, a failed stand-up comedian is driven insane and turns to a life of crime and chaos in Gotham City while becoming an infamous psychopathic crime figure.',
    release_date: '2019-10-02',
    runtime: 122,
    vote_average: 8.2,
    vote_count: 24700,
    genre_ids: [80, 53, 18],
    genres: [
      { id: 80, name: 'Crime' },
      { id: 53, name: 'Thriller' },
      { id: 18, name: 'Drama' },
    ],
    poster_path:
      'https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&w=600&q=80',
    backdrop_path:
      'https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&w=1600&q=80',
    credits: {
      cast: [
        {
          id: 701,
          name: 'Joaquin Phoenix',
          character: 'Arthur Fleck / Joker',
          profile_path:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 702,
          name: 'Robert De Niro',
          character: 'Murray Franklin',
          profile_path:
            'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 703,
          name: 'Zazie Beetz',
          character: 'Sophie Dumond',
          profile_path:
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        },
      ],
    },
    videos: {
      results: [
        {
          id: 'v701',
          site: 'YouTube',
          key: 'zAGVQLHvwOY',
          type: 'Trailer',
          official: true,
        },
      ],
    },
  },

  // 16. 2019 - Avengers: Endgame
  {
    id: 299534,
    title: 'Avengers: Endgame',
    tagline: 'Part of the journey is the end.',
    overview:
      'After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos’ actions.',
    release_date: '2019-04-24',
    runtime: 181,
    vote_average: 8.3,
    vote_count: 25400,
    genre_ids: [12, 878, 28],
    genres: [
      { id: 12, name: 'Adventure' },
      { id: 878, name: 'Science Fiction' },
      { id: 28, name: 'Action' },
    ],
    poster_path:
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80',
    backdrop_path:
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1600&q=80',
    credits: {
      cast: [
        {
          id: 801,
          name: 'Robert Downey Jr.',
          character: 'Tony Stark / Iron Man',
          profile_path:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 802,
          name: 'Chris Evans',
          character: 'Steve Rogers / Captain America',
          profile_path:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        },
      ],
    },
    videos: {
      results: [
        {
          id: 'v801',
          site: 'YouTube',
          key: 'TcMBFSGVi1c',
          type: 'Trailer',
          official: true,
        },
      ],
    },
  },

  // 17. 2018 - Spider-Man: Into the Spider-Verse
  {
    id: 324857,
    title: 'Spider-Man: Into the Spider-Verse',
    tagline: 'More than one wears the mask.',
    overview:
      'Teenager Miles Morales becomes the new Spider-Man and joins other Spider-Heroes from parallel dimensions to stop a threat to all reality.',
    release_date: '2018-12-06',
    runtime: 117,
    vote_average: 8.4,
    vote_count: 15300,
    genre_ids: [16, 28, 12],
    genres: [
      { id: 16, name: 'Animation' },
      { id: 28, name: 'Action' },
      { id: 12, name: 'Adventure' },
    ],
    poster_path:
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80',
    backdrop_path:
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1600&q=80',
    credits: {
      cast: [
        {
          id: 901,
          name: 'Shameik Moore',
          character: 'Miles Morales (voice)',
          profile_path:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 902,
          name: 'Jake Johnson',
          character: 'Peter B. Parker (voice)',
          profile_path:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        },
      ],
    },
    videos: {
      results: [
        {
          id: 'v901',
          site: 'YouTube',
          key: 'tg52up16eq0',
          type: 'Trailer',
          official: true,
        },
      ],
    },
  },

  // 18. 2017 - Blade Runner 2049
  {
    id: 335984,
    title: 'Blade Runner 2049',
    tagline: 'There are still pages left in the book.',
    overview:
      'Thirty years after the events of the first film, a new blade runner, LAPD Officer K, unearths a long-buried secret that could plunge society into chaos.',
    release_date: '2017-10-04',
    runtime: 164,
    vote_average: 7.6,
    vote_count: 13300,
    genre_ids: [878, 18, 9648],
    genres: [
      { id: 878, name: 'Science Fiction' },
      { id: 18, name: 'Drama' },
      { id: 9648, name: 'Mystery' },
    ],
    poster_path:
      'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80',
    backdrop_path:
      'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1600&q=80',
    credits: {
      cast: [
        {
          id: 51,
          name: 'Ryan Gosling',
          character: 'Officer K',
          profile_path:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 52,
          name: 'Harrison Ford',
          character: 'Rick Deckard',
          profile_path:
            'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 53,
          name: 'Ana de Armas',
          character: 'Joi',
          profile_path:
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        },
      ],
    },
    videos: {
      results: [
        {
          id: 'v6',
          site: 'YouTube',
          key: 'gCcx85zbxz4',
          type: 'Trailer',
          official: true,
        },
      ],
    },
  },

  // 19. 2017 - Get Out
  {
    id: 419430,
    title: 'Get Out',
    tagline: 'Just because you’re invited, doesn’t mean you’re welcome.',
    overview:
      'Chris and his girlfriend Rose go upstate to visit her parents for the weekend. At first, Chris reads the family’s overly accommodating behavior as nervous attempts to deal with their daughter’s interracial relationship, but as the weekend progresses, a series of increasingly disturbing discoveries leads him to a truth that he never could have imagined.',
    release_date: '2017-02-24',
    runtime: 104,
    vote_average: 7.6,
    vote_count: 17100,
    genre_ids: [9648, 53, 27],
    genres: [
      { id: 9648, name: 'Mystery' },
      { id: 53, name: 'Thriller' },
      { id: 27, name: 'Horror' },
    ],
    poster_path:
      'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=600&q=80',
    backdrop_path:
      'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=1600&q=80',
    credits: {
      cast: [
        {
          id: 1001,
          name: 'Daniel Kaluuya',
          character: 'Chris Washington',
          profile_path:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 1002,
          name: 'Allison Williams',
          character: 'Rose Armitage',
          profile_path:
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
        },
      ],
    },
    videos: {
      results: [
        {
          id: 'v1001',
          site: 'YouTube',
          key: 'DzfpyUB60YY',
          type: 'Trailer',
          official: true,
        },
      ],
    },
  },

  // 20. 2016 - La La Land
  {
    id: 313369,
    title: 'La La Land',
    tagline: 'Here’s to the fools who dream.',
    overview:
      'Mia, an aspiring actress, and Sebastian, a dedicated jazz musician, struggle to make ends meet while pursuing their dreams in a city known for destroying hopes and breaking hearts.',
    release_date: '2016-11-29',
    runtime: 128,
    vote_average: 7.9,
    vote_count: 16500,
    genre_ids: [35, 18, 10749],
    genres: [
      { id: 35, name: 'Comedy' },
      { id: 18, name: 'Drama' },
      { id: 10749, name: 'Romance' },
    ],
    poster_path:
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
    backdrop_path:
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=80',
    credits: {
      cast: [
        {
          id: 1101,
          name: 'Ryan Gosling',
          character: 'Sebastian Wilder',
          profile_path:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 1102,
          name: 'Emma Stone',
          character: 'Mia Dolan',
          profile_path:
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
        },
      ],
    },
    videos: {
      results: [
        {
          id: 'v1101',
          site: 'YouTube',
          key: '0pdqf4P9MB8',
          type: 'Trailer',
          official: true,
        },
      ],
    },
  },

  // 21. 2015 - Mad Max: Fury Road
  {
    id: 76341,
    title: 'Mad Max: Fury Road',
    tagline: 'What a Lovely Day.',
    overview:
      'An apocalyptic story set in the furthest reaches of our planet, in a stark desert landscape where humanity is broken, and almost everyone is crazed fighting for the necessities of life.',
    release_date: '2015-05-13',
    runtime: 120,
    vote_average: 7.6,
    vote_count: 22100,
    genre_ids: [28, 12, 878],
    genres: [
      { id: 28, name: 'Action' },
      { id: 12, name: 'Adventure' },
      { id: 878, name: 'Science Fiction' },
    ],
    poster_path:
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80',
    backdrop_path:
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80',
    credits: {
      cast: [
        {
          id: 1201,
          name: 'Tom Hardy',
          character: 'Max Rockatansky',
          profile_path:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 1202,
          name: 'Charlize Theron',
          character: 'Imperator Furiosa',
          profile_path:
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 1203,
          name: 'Nicholas Hoult',
          character: 'Nux',
          profile_path:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        },
      ],
    },
    videos: {
      results: [
        {
          id: 'v1201',
          site: 'YouTube',
          key: 'hEJnMQG9654',
          type: 'Trailer',
          official: true,
        },
      ],
    },
  },

  // 22. 2014 - Interstellar
  {
    id: 157336,
    title: 'Interstellar',
    tagline: 'Mankind was born on Earth. It was never meant to die here.',
    overview:
      'Explorers make use of a newly discovered wormhole to surpass human space travel limitations and conquer vast cosmic distances across a dying universe.',
    release_date: '2014-11-05',
    runtime: 169,
    vote_average: 8.6,
    vote_count: 35000,
    genre_ids: [12, 18, 878],
    genres: [
      { id: 12, name: 'Adventure' },
      { id: 18, name: 'Drama' },
      { id: 878, name: 'Science Fiction' },
    ],
    poster_path:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
    backdrop_path:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80',
    credits: {
      cast: [
        {
          id: 31,
          name: 'Matthew McConaughey',
          character: 'Joseph Cooper',
          profile_path:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 32,
          name: 'Anne Hathaway',
          character: 'Dr. Amelia Brand',
          profile_path:
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 33,
          name: 'Jessica Chastain',
          character: 'Murphy "Murph" Cooper',
          profile_path:
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
        },
      ],
    },
    videos: {
      results: [
        {
          id: 'v4',
          site: 'YouTube',
          key: 'zSWdZVtXT7E',
          type: 'Trailer',
          official: true,
        },
      ],
    },
  },

  // 23. 2014 - Whiplash
  {
    id: 244786,
    title: 'Whiplash',
    tagline: 'The road to greatness can take you to the edge.',
    overview:
      'Under the direction of a ruthless instructor, a talented young drummer begins to pursue perfection at any cost, spiraling into physical and psychological obsession.',
    release_date: '2014-10-10',
    runtime: 107,
    vote_average: 8.4,
    vote_count: 14800,
    genre_ids: [18],
    genres: [{ id: 18, name: 'Drama' }],
    poster_path:
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
    backdrop_path:
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1600&q=80',
    credits: {
      cast: [
        {
          id: 1301,
          name: 'Miles Teller',
          character: 'Andrew Neiman',
          profile_path:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 1302,
          name: 'J.K. Simmons',
          character: 'Terence Fletcher',
          profile_path:
            'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80',
        },
      ],
    },
    videos: {
      results: [
        {
          id: 'v1301',
          site: 'YouTube',
          key: '7d_jQycdQGo',
          type: 'Trailer',
          official: true,
        },
      ],
    },
  },

  // 24. 2014 - The Grand Budapest Hotel
  {
    id: 120467,
    title: 'The Grand Budapest Hotel',
    tagline: 'A luxurious adventure.',
    overview:
      'The Grand Budapest Hotel tells of a legendary concierge at a famous European hotel between the wars and his friendship with a young employee who becomes his trusted protégé.',
    release_date: '2014-02-26',
    runtime: 99,
    vote_average: 8.1,
    vote_count: 14300,
    genre_ids: [35, 18],
    genres: [
      { id: 35, name: 'Comedy' },
      { id: 18, name: 'Drama' },
    ],
    poster_path:
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80',
    backdrop_path:
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80',
    credits: {
      cast: [
        {
          id: 1401,
          name: 'Ralph Fiennes',
          character: 'Monsieur Gustave H.',
          profile_path:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 1402,
          name: 'Tony Revolori',
          character: 'Zero Moustafa',
          profile_path:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        },
      ],
    },
    videos: {
      results: [
        {
          id: 'v1401',
          site: 'YouTube',
          key: '1Fg5iWmQjwk',
          type: 'Trailer',
          official: true,
        },
      ],
    },
  },

  // 25. 2013 - The Wolf of Wall Street
  {
    id: 106646,
    title: 'The Wolf of Wall Street',
    tagline: 'Earn. Spend. Party.',
    overview:
      'A New York stockbroker refuses to cooperate in a large securities fraud case that involves corruption on Wall Street, the corporate banking world and mob infiltration.',
    release_date: '2013-12-25',
    runtime: 180,
    vote_average: 8.0,
    vote_count: 23600,
    genre_ids: [80, 18, 35],
    genres: [
      { id: 80, name: 'Crime' },
      { id: 18, name: 'Drama' },
      { id: 35, name: 'Comedy' },
    ],
    poster_path:
      'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=600&q=80',
    backdrop_path:
      'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1600&q=80',
    credits: {
      cast: [
        {
          id: 1501,
          name: 'Leonardo DiCaprio',
          character: 'Jordan Belfort',
          profile_path:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 1502,
          name: 'Jonah Hill',
          character: 'Donnie Azoff',
          profile_path:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 1503,
          name: 'Margot Robbie',
          character: 'Naomi Lapaglia',
          profile_path:
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
        },
      ],
    },
    videos: {
      results: [
        {
          id: 'v1501',
          site: 'YouTube',
          key: 'iszwuX1AK6A',
          type: 'Trailer',
          official: true,
        },
      ],
    },
  },

  // 26. 2010 - Inception
  {
    id: 27205,
    title: 'Inception',
    tagline: 'Your mind is the scene of the crime.',
    overview:
      'A skilled thief who steals corporate secrets through subconscious dream-sharing is offered a chance to have his criminal history erased.',
    release_date: '2010-07-15',
    runtime: 148,
    vote_average: 8.4,
    vote_count: 36400,
    genre_ids: [28, 878, 12],
    genres: [
      { id: 28, name: 'Action' },
      { id: 878, name: 'Science Fiction' },
      { id: 12, name: 'Adventure' },
    ],
    poster_path:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
    backdrop_path:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
    credits: {
      cast: [
        {
          id: 11,
          name: 'Leonardo DiCaprio',
          character: 'Dom Cobb',
          profile_path:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 12,
          name: 'Joseph Gordon-Levitt',
          character: 'Arthur',
          profile_path:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 13,
          name: 'Elliot Page',
          character: 'Ariadne',
          profile_path:
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        },
      ],
    },
    videos: {
      results: [
        {
          id: 'v2',
          site: 'YouTube',
          key: 'YoHD9XEInc0',
          type: 'Trailer',
          official: true,
        },
      ],
    },
  },

  // 27. 2009 - Inglourious Basterds
  {
    id: 16869,
    title: 'Inglourious Basterds',
    tagline: 'Once upon a time in Nazi occupied France...',
    overview:
      'In Nazi-occupied France during World War II, a group of Jewish-American soldiers known as "The Basterds" are chosen to strike terror through the Third Reich by scalping and brutally slaughtering Nazis.',
    release_date: '2009-08-18',
    runtime: 153,
    vote_average: 8.2,
    vote_count: 21900,
    genre_ids: [18, 53, 28],
    genres: [
      { id: 18, name: 'Drama' },
      { id: 53, name: 'Thriller' },
      { id: 28, name: 'Action' },
    ],
    poster_path:
      'https://images.unsplash.com/photo-1533518463841-d62e1fc91373?auto=format&fit=crop&w=600&q=80',
    backdrop_path:
      'https://images.unsplash.com/photo-1533518463841-d62e1fc91373?auto=format&fit=crop&w=1600&q=80',
    credits: {
      cast: [
        {
          id: 1601,
          name: 'Brad Pitt',
          character: 'Lt. Aldo Raine',
          profile_path:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 1602,
          name: 'Christoph Waltz',
          character: 'Col. Hans Landa',
          profile_path:
            'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80',
        },
      ],
    },
    videos: {
      results: [
        {
          id: 'v1601',
          site: 'YouTube',
          key: 'KnrRy6kSFF0',
          type: 'Trailer',
          official: true,
        },
      ],
    },
  },

  // 28. 2008 - The Dark Knight
  {
    id: 155,
    title: 'The Dark Knight',
    tagline: 'Welcome to a world without rules.',
    overview:
      'Batman raises the stakes in his war on crime with the help of Lt. Jim Gordon and District Attorney Harvey Dent against the psychopathic criminal mastermind known as the Joker.',
    release_date: '2008-07-16',
    runtime: 152,
    vote_average: 8.5,
    vote_count: 32600,
    genre_ids: [18, 28, 80, 53],
    genres: [
      { id: 18, name: 'Drama' },
      { id: 28, name: 'Action' },
      { id: 80, name: 'Crime' },
      { id: 53, name: 'Thriller' },
    ],
    poster_path:
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
    backdrop_path:
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=80',
    credits: {
      cast: [
        {
          id: 41,
          name: 'Christian Bale',
          character: 'Bruce Wayne / Batman',
          profile_path:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 42,
          name: 'Heath Ledger',
          character: 'Joker',
          profile_path:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 43,
          name: 'Gary Oldman',
          character: 'Jim Gordon',
          profile_path:
            'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80',
        },
      ],
    },
    videos: {
      results: [
        {
          id: 'v5',
          site: 'YouTube',
          key: 'EXeTwQWrcwY',
          type: 'Trailer',
          official: true,
        },
      ],
    },
  },

  // 29. 2001 - Spirited Away
  {
    id: 129,
    title: 'Spirited Away',
    tagline: 'The tunnel led Chihiro to a mysterious world.',
    overview:
      'A young girl, Chihiro, becomes trapped in a strange world of spirits. After her parents undergo a mysterious transformation, she must call upon the courage she never knew she had to free herself and her family.',
    release_date: '2001-07-20',
    runtime: 125,
    vote_average: 8.5,
    vote_count: 16200,
    genre_ids: [16, 14, 12],
    genres: [
      { id: 16, name: 'Animation' },
      { id: 14, name: 'Fantasy' },
      { id: 12, name: 'Adventure' },
    ],
    poster_path:
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80',
    backdrop_path:
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=80',
    credits: {
      cast: [
        {
          id: 1701,
          name: 'Rumi Hiiragi',
          character: 'Chihiro Ogino (voice)',
          profile_path:
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 1702,
          name: 'Miyu Irino',
          character: 'Haku (voice)',
          profile_path:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        },
      ],
    },
    videos: {
      results: [
        {
          id: 'v1701',
          site: 'YouTube',
          key: 'ByXuk9QqQkk',
          type: 'Trailer',
          official: true,
        },
      ],
    },
  },

  // 30. 2001 - The Lord of the Rings: The Fellowship of the Ring
  {
    id: 120,
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    tagline: 'One ring to rule them all.',
    overview:
      'Young hobbit Frodo Baggins, after inheriting a mysterious ring from his uncle Bilbo, must leave his home behind in order to begin an epic quest to the fires of Mount Doom.',
    release_date: '2001-12-18',
    runtime: 178,
    vote_average: 8.4,
    vote_count: 24500,
    genre_ids: [12, 14, 28],
    genres: [
      { id: 12, name: 'Adventure' },
      { id: 14, name: 'Fantasy' },
      { id: 28, name: 'Action' },
    ],
    poster_path:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
    backdrop_path:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80',
    credits: {
      cast: [
        {
          id: 1801,
          name: 'Elijah Wood',
          character: 'Frodo Baggins',
          profile_path:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 1802,
          name: 'Ian McKellen',
          character: 'Gandalf',
          profile_path:
            'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 1803,
          name: 'Viggo Mortensen',
          character: 'Aragorn',
          profile_path:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        },
      ],
    },
    videos: {
      results: [
        {
          id: 'v1801',
          site: 'YouTube',
          key: 'V75dMMW-66k',
          type: 'Trailer',
          official: true,
        },
      ],
    },
  },

  // 31. 1999 - Fight Club
  {
    id: 550,
    title: 'Fight Club',
    tagline: 'Mischief. Mayhem. Soap.',
    overview:
      'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy.',
    release_date: '1999-10-15',
    runtime: 139,
    vote_average: 8.4,
    vote_count: 28900,
    genre_ids: [18, 53],
    genres: [
      { id: 18, name: 'Drama' },
      { id: 53, name: 'Thriller' },
    ],
    poster_path:
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=600&q=80',
    backdrop_path:
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1600&q=80',
    credits: {
      cast: [
        {
          id: 1901,
          name: 'Edward Norton',
          character: 'The Narrator',
          profile_path:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 1902,
          name: 'Brad Pitt',
          character: 'Tyler Durden',
          profile_path:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 1903,
          name: 'Helena Bonham Carter',
          character: 'Marla Singer',
          profile_path:
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        },
      ],
    },
    videos: {
      results: [
        {
          id: 'v1901',
          site: 'YouTube',
          key: 'qtRKDV93JU8',
          type: 'Trailer',
          official: true,
        },
      ],
    },
  },

  // 32. 1999 - The Matrix
  {
    id: 603,
    title: 'The Matrix',
    tagline: 'Welcome to the Real World.',
    overview:
      'Set in the 22nd century, The Matrix tells the story of a computer hacker who joins a group of underground insurgents fighting the vast machines who rule earth.',
    release_date: '1999-03-30',
    runtime: 136,
    vote_average: 8.3,
    vote_count: 25000,
    genre_ids: [28, 878],
    genres: [
      { id: 28, name: 'Action' },
      { id: 878, name: 'Science Fiction' },
    ],
    poster_path:
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
    backdrop_path:
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=80',
    credits: {
      cast: [
        {
          id: 151,
          name: 'Keanu Reeves',
          character: 'Neo',
          profile_path:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 152,
          name: 'Laurence Fishburne',
          character: 'Morpheus',
          profile_path:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 153,
          name: 'Carrie-Anne Moss',
          character: 'Trinity',
          profile_path:
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        },
      ],
    },
    videos: {
      results: [
        {
          id: 'v99',
          site: 'YouTube',
          key: 'vKQi3bBA1y8',
          type: 'Trailer',
          official: true,
        },
      ],
    },
  },

  // 33. 1994 - Pulp Fiction
  {
    id: 680,
    title: 'Pulp Fiction',
    tagline: 'Just because you are a character doesn’t mean you have character.',
    overview:
      'A burger-loving hit man, his philosophical partner, a drug-addled gangster’s moll and a washed-up boxer converge in this sprawling, comedic crime caper.',
    release_date: '1994-09-10',
    runtime: 154,
    vote_average: 8.5,
    vote_count: 27100,
    genre_ids: [53, 80],
    genres: [
      { id: 53, name: 'Thriller' },
      { id: 80, name: 'Crime' },
    ],
    poster_path:
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
    backdrop_path:
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80',
    credits: {
      cast: [
        {
          id: 2001,
          name: 'John Travolta',
          character: 'Vincent Vega',
          profile_path:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 2002,
          name: 'Samuel L. Jackson',
          character: 'Jules Winnfield',
          profile_path:
            'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 2003,
          name: 'Uma Thurman',
          character: 'Mia Wallace',
          profile_path:
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
        },
      ],
    },
    videos: {
      results: [
        {
          id: 'v2001',
          site: 'YouTube',
          key: 's7EdQ4FqbhY',
          type: 'Trailer',
          official: true,
        },
      ],
    },
  },

  // 34. 1994 - The Shawshank Redemption
  {
    id: 278,
    title: 'The Shawshank Redemption',
    tagline: 'Fear can hold you prisoner. Hope can set you free.',
    overview:
      'Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison facility, where he puts his accounting skills to work for an amoral warden.',
    release_date: '1994-09-23',
    runtime: 142,
    vote_average: 8.7,
    vote_count: 27500,
    genre_ids: [18, 80],
    genres: [
      { id: 18, name: 'Drama' },
      { id: 80, name: 'Crime' },
    ],
    poster_path:
      'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=600&q=80',
    backdrop_path:
      'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1600&q=80',
    credits: {
      cast: [
        {
          id: 2101,
          name: 'Tim Robbins',
          character: 'Andy Dufresne',
          profile_path:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 2102,
          name: 'Morgan Freeman',
          character: 'Ellis Boyd "Red" Redding',
          profile_path:
            'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80',
        },
      ],
    },
    videos: {
      results: [
        {
          id: 'v2101',
          site: 'YouTube',
          key: 'PLl99DlL6b4',
          type: 'Trailer',
          official: true,
        },
      ],
    },
  },

  // 35. 1994 - The Lion King
  {
    id: 8587,
    title: 'The Lion King',
    tagline: 'Life’s greatest adventure is finding your place in the Circle of Life.',
    overview:
      'A young lion prince is cast out of his pride by his cruel uncle, who claims he was responsible for his father’s murder. While the uncle rules with an iron paw, the prince grows up beyond the Savannah, living by a philosophy: No worries for the rest of your days.',
    release_date: '1994-06-23',
    runtime: 88,
    vote_average: 8.3,
    vote_count: 17900,
    genre_ids: [16, 18, 12],
    genres: [
      { id: 16, name: 'Animation' },
      { id: 18, name: 'Drama' },
      { id: 12, name: 'Adventure' },
    ],
    poster_path:
      'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=600&q=80',
    backdrop_path:
      'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=1600&q=80',
    credits: {
      cast: [
        {
          id: 2201,
          name: 'Matthew Broderick',
          character: 'Adult Simba (voice)',
          profile_path:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 2202,
          name: 'James Earl Jones',
          character: 'Mufasa (voice)',
          profile_path:
            'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 2203,
          name: 'Jeremy Irons',
          character: 'Scar (voice)',
          profile_path:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        },
      ],
    },
    videos: {
      results: [
        {
          id: 'v2201',
          site: 'YouTube',
          key: 'lFzVJEksoDY',
          type: 'Trailer',
          official: true,
        },
      ],
    },
  },
];
