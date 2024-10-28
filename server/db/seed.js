const { client } = require("./client");

const { createUser, fetchUsers, createBusiness, createReview } = require("./index.js");

const createTables = async () => {
  const SQL = `
    DROP TABLE IF EXISTS comments;
    DROP TABLE IF EXISTS reviews;
    DROP TABLE IF EXISTS businesses;
    DROP TABLE IF EXISTS users cascade;

    CREATE TABLE businesses (
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) UNIQUE NOT NULL,
      owner VARCHAR(100),
      establishedYear INT,
      description TEXT,
      image_url TEXT
    );

    CREATE TABLE users(
      id UUID PRIMARY KEY,
      username VARCHAR(20) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    );

    CREATE TABLE reviews (
      id SERIAL PRIMARY KEY,
      user_id UUID REFERENCES users(id),
      business_id INTEGER REFERENCES businesses(id),
      review_text TEXT NOT NULL,
      rating INTEGER CHECK (rating >= 1 and rating <= 5),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE (user_id, business_id) -- Ensure each user can only review a business once
    );

    CREATE TABLE comments (
      id SERIAL PRIMARY KEY,
      review_id INTEGER REFERENCES reviews(id),
      user_id UUID REFERENCES users(id),
      comment_text TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  
  await client.query(SQL);
};

const init = async () => {
  await client.connect();
  console.log("connected to database");

  await createTables();
  console.log("tables created");

  const [moe, lucy, ethyl, curly] = await Promise.all([
    createUser({ username: "moe", password: "m_pw" }),
    createUser({ username: "lucy", password: "l_pw" }),
    createUser({ username: "ethyl", password: "e_pw" }),
    createUser({ username: "curly", password: "c_pw" }),
  ]);

  const additionalUsers = await Promise.all([
    createUser({ username: "gamerboy", password: "password123" }),
    createUser({ username: "pixielover", password: "pixie@123" }),
    createUser({ username: "kratosfan", password: "godofwar" }),
    createUser({ username: "nukedude", password: "fallout4life" }),
    createUser({ username: "zeldaMaster", password: "hyrule" }),
    createUser({ username: "smashking", password: "finalsmash" }),
    createUser({ username: "dragonborn", password: "fusrodah" }),
    createUser({ username: "witcherwolf", password: "yennifer" }),
    createUser({ username: "cyberv", password: "nightcity" }),
    createUser({ username: "overlord", password: "overwatch" }),
  ]);

  const business1 = await createBusiness({
    name: "Call of Duty: Modern Warfare II",
    owner: "Activision",
    establishedYear: 2003,
    description: "A popular first-person shooter gamer series.",
    image_url: "https://upload.wikimedia.org/wikipedia/en/5/52/Call_of_Duty_Modern_Warfare_2_%282009%29_cover.png" 
  });
  const business2 = await createBusiness({
    name: "Halo 3",
    owner: "Microsoft",
    establishedYear: 2001,
    description: "A Sci-Fi shooter known for multiplayer.",
    image_url: "https://upload.wikimedia.org/wikipedia/en/b/b4/Halo_3_final_boxshot.JPG"
  });
  const business3 = await createBusiness({
  name: "Super Mario Odyssey",
  owner: "Nintendo",
  establishedYear: 2017,
  description: "Mario’s adventure across worlds with his new friend, Cappy, to rescue Princess Peach.",
  image_url: "https://upload.wikimedia.org/wikipedia/en/8/8d/Super_Mario_Odyssey.jpg"
});

const business4 = await createBusiness({
  name: "Overwatch",
  owner: "Blizzard Entertainment",
  establishedYear: 2016,
  description: "A multiplayer hero-shooter, featuring colorful characters and competitive gameplay.",
  image_url: "https://upload.wikimedia.org/wikipedia/en/5/51/Overwatch_cover_art.jpg"
});

const business5 = await createBusiness({
  name: "Fortnite",
  owner: "Epic Games",
  establishedYear: 2017,
  description: "A battle-royale phenomenon known for its cultural impact and in-game events.",
  image_url: "https://imgcdn.stablediffusionweb.com/2024/10/5/f3c8aede-ef4e-4f4e-aefa-53db1e1b2936.jpg"
});

const business6 = await createBusiness({
  name: "Animal Crossing: New Horizons",
  owner: "Nintendo",
  establishedYear: 2020,
  description: "A life simulation game where players build a peaceful island paradise.",
  image_url: "https://upload.wikimedia.org/wikipedia/en/1/1f/Animal_Crossing_New_Horizons.jpg"
});

const business7 = await createBusiness({
  name: "Fallout: New Vegas",
  owner: "Obsidian Entertainment",
  establishedYear: 2010,
  description: "A post-apocalyptic RPG masterpiece that revolutionized player choice and narrative freedom. Set in the Mojave Wasteland, New Vegas offers a breathtaking open-world experience where every decision carries weight, from allying with war-torn factions to shaping the fate of New Vegas itself. Obsidian's blend of dark humor, deep moral dilemmas, and unforgettable characters makes this game more than a classic—it’s a cultural phenomenon. With hardcore survival mechanics, multiple endings, and endless replayability, it’s hailed as one of the greatest RPGs ever crafted. Every encounter leaves players questioning their ethics, and every journey feels fresh, whether you’re roaming with the enigmatic Mr. House or rallying a revolution for the NCR. Simply put, New Vegas is where the Fallout series found its soul—unchallenged by time and cemented in the halls of gaming history.",
  image_url: "https://upload.wikimedia.org/wikipedia/en/3/34/Fallout_New_Vegas.jpg"
});

const business8 = await createBusiness({
  name: "The Witcher 3: Wild Hunt",
  owner: "CD Projekt",
  establishedYear: 2015,
  description: "An epic open-world RPG where players take on the role of Geralt of Rivia, a monster hunter searching for his adopted daughter. With a rich narrative, expansive landscapes, and engaging combat, this game set a new benchmark for storytelling in RPGs.",
  image_url: "https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg"
});

const business9 = await createBusiness({
  name: "Cyberpunk 2077",
  owner: "CD Projekt",
  establishedYear: 2020,
  description: "Set in the dystopian Night City, Cyberpunk 2077 offers a vast open-world adventure, merging first-person shooting, role-playing mechanics, and immersive storytelling. Despite its rocky launch, it has since become a unique blend of future-tech RPG with unparalleled depth.",
  image_url: "https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg"
});

const business10 = await createBusiness({
  name: "Dota 2",
  owner: "Valve",
  establishedYear: 2013,
  description: "A multiplayer online battle arena (MOBA) that defined competitive gaming. With an ever-changing meta and a vibrant esports scene, Dota 2 demands skill, strategy, and teamwork from every player.",
  image_url: "https://upload.wikimedia.org/wikipedia/en/3/31/Dota_2_Steam_artwork.jpg"
});

const business11 = await createBusiness({
  name: "Red Dead Redemption 2",
  owner: "Rockstar Games",
  establishedYear: 2018,
  description: "A Western-themed open-world game where players live the life of an outlaw in the late 1800s. Its breathtaking world and poignant story make it one of the most immersive games ever made.",
  image_url: "https://upload.wikimedia.org/wikipedia/en/4/44/Red_Dead_Redemption_II.jpg"
});

const business12 = await createBusiness({
  name: "Elden Ring",
  owner: "FromSoftware",
  establishedYear: 2022,
  description: "A dark-fantasy RPG developed in collaboration with George R.R. Martin. It offers an expansive open-world experience with the studio’s signature challenging combat and cryptic storytelling.",
  image_url: "https://upload.wikimedia.org/wikipedia/en/b/b9/Elden_Ring_Box_art.jpg"
});

const business13 = await createBusiness({
  name: "Hades",
  owner: "Supergiant Games",
  establishedYear: 2020,
  description: "A rogue-like dungeon crawler where players assume the role of Zagreus, the son of Hades. Known for its fast-paced combat, evolving narrative, and incredible voice acting.",
  image_url: "https://upload.wikimedia.org/wikipedia/en/c/cc/Hades_cover_art.jpg"
});

const business14 = await createBusiness({
  name: "Sekiro: Shadows Die Twice",
  owner: "FromSoftware",
  establishedYear: 2019,
  description: "An action-adventure game set in a reimagined Japan, blending stealth mechanics with punishing combat. Players control a shinobi on a quest for revenge and redemption.",
  image_url: "https://upload.wikimedia.org/wikipedia/en/6/6e/Sekiro_art.jpg"
});

const business15 = await createBusiness({
  name: "The Last of Us Part II",
  owner: "Naughty Dog",
  establishedYear: 2020,
  description: "A gripping narrative-driven game that explores the consequences of revenge. With stunning visuals and emotional depth, it continues the story of Ellie in a post-apocalyptic world.",
  image_url: "https://upload.wikimedia.org/wikipedia/en/4/4f/TLOU_P2_Box_Art_2.png"
});

const business16 = await createBusiness({
  name: "God of War (2018)",
  owner: "Santa Monica Studio",
  establishedYear: 2018,
  description: "A reimagining of the God of War series, following Kratos and his son, Atreus, as they explore Norse mythology. With breathtaking visuals and emotional storytelling, it is considered one of the best games of its generation.",
  image_url: "https://upload.wikimedia.org/wikipedia/en/a/a7/God_of_War_4_cover.jpg"
});

const business17 = await createBusiness({
  name: "Super Smash Bros. Ultimate",
  owner: "Nintendo",
  establishedYear: 2018,
  description: "A massive crossover fighting game featuring nearly every Nintendo character and many others. It has become the ultimate party and competitive fighting experience.",
  image_url: "https://upload.wikimedia.org/wikipedia/en/5/50/Super_Smash_Bros._Ultimate.jpg"
});

const business18 = await createBusiness({
  name: "Dark Souls III",
  owner: "FromSoftware",
  establishedYear: 2016,
  description: "A dark-fantasy RPG that concludes the Souls series. Known for its challenging gameplay, atmospheric world, and deep lore, it remains one of the most celebrated games in the genre.",
  image_url: "https://upload.wikimedia.org/wikipedia/en/b/bb/Dark_souls_3_cover_art.jpg"
});

  await Promise.all([
    createReview({ userId: moe.id, businessId: business1.id, review_text: "Great game!", rating: 5 }),
    createReview({ userId: lucy.id, businessId: business2.id, review_text: "Not my favorite.", rating: 3 }),
  ]);
  const reviews = await Promise.all([
    createReview({
      userId: ethyl.id,
      businessId: business3.id,
      review_text: "A masterpiece that redefines platforming!",
      rating: 5,
    }),
    createReview({
      userId: curly.id,
      businessId: business4.id,
      review_text: "The character designs are gorgeous!",
      rating: 4,
    }),
    createReview({
      userId: additionalUsers[0].id,
      businessId: business5.id,
      review_text: "Fortnite isn't for everyone, but I love it.",
      rating: 4,
    }),
    createReview({
      userId: additionalUsers[1].id,
      businessId: business6.id,
      review_text: "Animal Crossing helped me survive quarantine.",
      rating: 5,
    }),
    createReview({
      userId: additionalUsers[2].id,
      businessId: business7.id,
      review_text: "Fallout New Vegas is the best RPG ever made!",
      rating: 5,
    }),
    createReview({
      userId: additionalUsers[3].id,
      businessId: business8.id,
      review_text: "The Witcher 3 deserves all the awards it got.",
      rating: 5,
    }),
    createReview({
      userId: additionalUsers[4].id,
      businessId: business9.id,
      review_text: "Cyberpunk 2077 is so much better now after updates.",
      rating: 4,
    }),
    createReview({
      userId: additionalUsers[5].id,
      businessId: business10.id,
      review_text: "Dota 2 is the king of competitive gaming!",
      rating: 5,
    }),
    createReview({
      userId: additionalUsers[6].id,
      businessId: business11.id,
      review_text: "Red Dead Redemption 2 feels like a living world.",
      rating: 5,
    }),
    createReview({
      userId: additionalUsers[7].id,
      businessId: business12.id,
      review_text: "Elden Ring is brutally hard but so rewarding.",
      rating: 4,
    }),
    createReview({
      userId: additionalUsers[8].id,
      businessId: business13.id,
      review_text: "Hades combines storytelling and gameplay perfectly.",
      rating: 5,
    }),
    createReview({
      userId: additionalUsers[9].id,
      businessId: business14.id,
      review_text: "Sekiro's combat is on another level.",
      rating: 4,
    }),
  ]);

  
  client.end();
};

init();