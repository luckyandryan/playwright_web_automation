// for generating unique test credentials
export function generateCredentials(prefix = 'test') {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  const suffix = `${timestamp}${random}`;

  return {
    username: `${prefix}_user_${suffix}`,
    password: `${prefix}_pasS_${suffix}`
  };
}

// book data
export const BOOKS = [
  {
    title: "Git Pocket Guide",
    author: "Richard E. Silverman",
    publisher: "O'Reilly Media"
  },
  {
    title: "Learning JavaScript Design Patterns",
    author: "Addy Osmani",
    publisher: "O'Reilly Media"
  },
  {
    title: "Designing Evolvable Web APIs with ASP.NET",
    author: "Glenn Block et al.",
    publisher: "O'Reilly Media"
  },
  {
    title: "Speaking JavaScript",
    author: "Axel Rauschmayer",
    publisher: "O'Reilly Media"
  },
  {
    title: "You Don't Know JS",
    author: "Kyle Simpson",
    publisher: "O'Reilly Media"
  },
  {
    title: "Programming JavaScript Applications",
    author: "Eric Elliott",
    publisher: "O'Reilly Media"
  },
  {
    title: "Eloquent JavaScript, Second Edition",
    author: "Marijn Haverbeke",
    publisher: "No Starch Press"
  },
  {
    title: "Understanding ECMAScript 6",
    author: "Nicholas C. Zakas",
    publisher: "No Starch Press"
  }
];

