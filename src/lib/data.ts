export const examples = [
  {
    id: 1,
    label: 'List of Marvel superheroes',
    prompt: `
    [
      { name: 'full_name', type: 'string', description: 'full name of the superhero. If there is a middle name, write first letter and put dot, like "Peter B. Parker"' },
      { name: 'alias', type: 'string', description: 'superhero alias or nickname' },
      { name: 'powers', type: 'string', description: 'main superpowers of the character' },
      { name: 'first_appearance', type: 'string', description: 'first comic book appearance of the character' }
    ]
    `,
    result: `
[
  { 
    full_name: 'Peter B. Parker', 
    alias: 'Spider-Man', 
    powers: 'Super strength, agility, spider-sense', 
    first_appearance: 'Amazing Fantasy #15' 
  },
  { 
    full_name: 'Tony Stark', 
    alias: 'Iron Man', 
    powers: 'Genius intellect, powered armor suit', 
    first_appearance: 'Tales of Suspense #39' 
  },
  { 
    full_name: 'Natasha Romanoff', 
    alias: 'Black Widow', 
    powers: 'Expert martial artist, espionage, agility', 
    first_appearance: 'Tales of Suspense #52' 
  }
]
    `
  },
  {
    id: 2,
    label: 'List of programming languages',
    prompt: `
    [
      { name: 'name', type: 'string', description: 'name of the programming language' },
      { name: 'year', type: 'number', description: 'year of first release' },
      { name: 'paradigm', type: 'string', description: 'programming paradigm of the language' }
    ]
    `,
    result: `
[
  { 
    name: 'JavaScript', 
    year: 1995, 
    paradigm: 'multi-paradigm' 
  },
  { 
    name: 'Python', 
    year: 1991, 
    paradigm: 'multi-paradigm' 
  },
  { 
    name: 'Java', 
    year: 1995, 
    paradigm: 'object-oriented' 
  },
  { 
    name: 'Ruby', 
    year: 1995, 
    paradigm: 'object-oriented' 
  },
  { 
    name: 'C++', 
    year: 1985, 
    paradigm: 'multi-paradigm' 
  }
]
    `
    },
    {
      id: 3,
      label: 'List of countries in Europe',
      prompt: `
      [
        { name: 'name', type: 'string', description: 'name of the country' },
        { name: 'capital', type: 'string', description: 'capital city of the country' },
        { name: 'population', type: 'number', description: 'population of the country' }
      ]
      `,
      result: `
[
  { 
    name: 'Germany', 
    capital: 'Berlin', 
    population: 83000000 
  },
  { 
    name: 'France', 
    capital: 'Paris', 
    population: 67000000 
  },
  { 
    name: 'Italy', 
    capital: 'Rome', 
    population: 60000000 
  }
  { 
    name: 'Spain', 
    capital: 'Madrid', 
    population: 47000000 
  }
  { 
    name: 'Poland', 
    capital: 'Warsaw', 
    population: 38000000 
  }
]
      `
  },
  {
    id: 4,
    label: 'List of fruits',
    prompt: `
    [
      { name: 'name', type: 'string', description: 'name of the fruit' },
      { name: 'color', type: 'string', description: 'color of the fruit' },
      { name: 'taste', type: 'string', description: 'taste of the fruit' }
    ]
    `,
    result: `
[
  { 
    name: 'Apple', 
    color: 'red', 
    taste: 'sweet' 
  },
  { 
    name: 'Banana', 
    color: 'yellow', 
    taste: 'sweet' 
  },
  { 
    name: 'Orange', 
    color: 'orange', 
    taste: 'citrus' 
  },
  { 
    name: 'Strawberry', 
    color: 'red', 
    taste: 'sweet' 
  },
  { 
    name: 'Grapes', 
    color: 'purple', 
    taste: 'sweet' 
  }
]
    `
  },
  {
    id: 5,
    label: 'List of famous inventors',
    prompt: `
    [
      { name: 'name', type: 'string', description: 'name of the inventor' },
      { name: 'invention', type: 'string', description: 'most famous invention of the inventor' },
      { name: 'year', type: 'number', description: 'year the invention was patented' }
    ]
    `,
    result: `
[
  { 
    name: 'Thomas Edison', 
    invention: 'light bulb', 
    year: 1879 
  },
  { 
    name:'Alexander Graham Bell', 
    invention: 'telephone', 
    year: 1876 
  },
  { 
    name: 'Albert Einstein', 
    invention: 'theory of relativity', 
    year: 1915 
  },
  { 
    name: 'Nikola Tesla', 
    invention: 'alternating current', 
    year: 1888 
  },
  { 
    name: 'Leonardo da Vinci', 
    invention: 'flying machine', 
    year: 1485 
  }
]
    `
  },
  {
    id: 6,
    label: 'List of planets in the solar system',
    prompt: `
    [
      { name: 'name', type: 'string', description: 'name of the planet' },
      { name: 'type', type: 'string', description: 'type of planet (terrestrial, gas giant, ice giant, dwarf)' },
      { name: 'moons', type: 'number', description: 'number of moons orbiting the planet' }
    ]
    `,
    result: `
[
  { 
    name: 'Mercury', 
    type: 'terrestrial', 
    moons: 0 
  },
  { 
    name: 'Venus', 
    type: 'terrestrial', 
    moons: 0 
  },
  { 
    name: 'Earth', 
    type: 'terrestrial', 
    moons: 1 
  },
  { 
    name: 'Mars', 
    type: 'terrestrial', 
    moons: 2 
  },
  { 
    name: 'Jupiter', 
    type: 'gas giant', 
    moons: 79
  }
]
    `
  },
  {
    id: 7,
    label: 'Notable fiction authors',
    prompt: `
    [
      { name: 'name', type: 'string', description: 'name of the author' },
      { name: 'genre', type: 'string', description: 'main genre of the author' },
      { name: 'notable_work', type: 'string', description: 'most famous work of the author' }
    ]
    `,
    result: `
[
  { 
    full_name: 'J.K. Rowling', 
    notable_work: 'Harry Potter series', 
    genre: 'Fantasy' 
  },
  { 
    full_name: 'George R.R. Martin', 
    notable_work: 'A Song of Ice and Fire series', 
    genre: 'Fantasy' 
  },
  { 
    full_name: 'Agatha Christie', 
    notable_work: 'Murder on the Orient Express', 
    genre: 'Mystery' 
  }
]
    `
  },
  {
    id: 8,
    label: 'Famous sci-fi movies',
    prompt: `
    [
      { name: 'title', type: 'string', description: 'title of the movie' },
      { name: 'release_year', type: 'string', description: 'year the movie was released' },
      { name: 'director', type: 'string', description: 'name of the director of the movie' }
    ]
    `,
    result: `
[
  { 
    title: 'Blade Runner', 
    release_year: '1982', 
    director: 'Ridley Scott' 
  },
  { 
    title: 'The Matrix', 
    release_year: '1999', 
    director: 'Lana and Lilly Wachowski' 
  },
  { 
    title: 'Inception', 
    release_year: '2010', 
    director: 'Christopher Nolan' 
  },
  { 
    title: 'Interstellar', 
    release_year: '2014', 
    director: 'Christopher Nolan' 
  }
]
    `
  }
];

export const typeJSONExample = 
`type User = {
  id: number;
  name: string;
  email: string;
};
`;

export const jsonExample = 
`[
  {
    "id": 1,
    "name": "Usuario 1",
    "email": "usuario1@example.com"
  },
  {
    "id": 2,
    "name": "Usuario 2",
    "email": "usuario2@example.com"
  },
  {
    "id": 3,
    "name": "Usuario 3",
    "email": "usuario3@example.com"
  }
]
`;