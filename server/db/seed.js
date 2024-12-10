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
    establishedYear: 2009,
    description: "A popular first-person shooter gamer series.",
    image_url: "https://upload.wikimedia.org/wikipedia/en/5/52/Call_of_Duty_Modern_Warfare_2_%282009%29_cover.png" 
  });
  const business2 = await createBusiness({
    name: "Halo 3",
    owner: "Microsoft",
    establishedYear: 2007,
    description: "Halo 3, released in 2007 by Bungie, is a monumental first-person shooter that defined a generation of gaming and marked a turning point in modern video game history. It brought the original Halo trilogy to a stunning conclusion, delivering a groundbreaking campaign that combined cinematic storytelling with intense action across sprawling environments. The game revolutionized multiplayer with Xbox Live integration, introducing competitive matchmaking, iconic maps, and modes that became staples of the genre. The innovative Forge mode empowered players to create and customize maps, fostering a new era of user-generated content. With its refined gameplay mechanics, seamless co-op experience, and unforgettable moments like the climactic Warthog run, Halo 3 set new standards for visual fidelity, audio design, and online interaction, establishing itself as a cornerstone of the gaming industry and a cultural phenomenon.",
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
  description: "A post-apocalyptic RPG masterpiece that revolutionized player choice and narrative freedom. Set in the Mojave Wasteland, New Vegas offers a breathtaking open-world experience where every decision carries weight, from allying with war-torn factions to shaping the fate of New Vegas itself. Obsidian's blend of dark humor, deep moral dilemmas, and unforgettable characters makes this game more than a classic—it's a cultural phenomenon. With hardcore survival mechanics, multiple endings, and endless replayability, it's hailed as one of the greatest RPGs ever crafted. Every encounter leaves players questioning their ethics, and every journey feels fresh, whether you’re roaming with the enigmatic Mr. House or rallying a revolution for the NCR. Simply put, New Vegas is where the Fallout series found its soul—unchallenged by time and cemented in the halls of gaming history.",
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
  description: "Cyberpunk 2077, released in 2020 by CD Projekt Red, launched to massive anticipation but quickly became infamous for its technical issues, especially on older consoles. Despite its ambitious open-world design, immersive narrative, and vibrant Night City setting, the game’s initial state was marred by bugs and performance problems, leading to widespread criticism and refunds. Over time, CD Projekt Red committed to extensive updates, stabilizing the experience and restoring player trust. With the release of the Phantom Liberty DLC in 2023, the game achieved its full potential, offering a gripping spy-thriller expansion, enhanced gameplay mechanics, and a reworked skill system. Combined with its compelling characters, breathtaking visuals, and rich storytelling, Cyberpunk 2077 has transformed into a must-play RPG, earning its place as one of the most remarkable gaming comebacks in history.",
  image_url: "https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg"
});

const business10 = await createBusiness({
  name: "Dota 2",
  owner: "Valve Corporation",
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

const business19 = await createBusiness({
  name: "Death Stranding",
  owner: "Kojima Productions",
  establishedYear: 2019,
  description: "Death Stranding is a genre-defying masterpiece from Hideo Kojima that delivers a haunting, emotional experience. Set in a post-apocalyptic America, players take on the role of Sam Porter Bridges, tasked with reconnecting isolated communities. The gameplay revolves around strategic traversal and intense encounters with mysterious BTs. Its stunning landscapes, deep narrative, and thought-provoking themes of connection and isolation make it unforgettable. With an all-star cast, cinematic cutscenes, and a haunting soundtrack, Death Stranding pushes the boundaries of gaming, offering a journey that's both profound and unparalleled in its ambition",
  image_url: "https://upload.wikimedia.org/wikipedia/en/2/22/Death_Stranding.jpg"
});

const business20 = await createBusiness({
  name: "Half Life 2",
  owner: "Valve Corporation",
  establishedYear: 2004,
  description: "Half-Life 2 is a groundbreaking first-person shooter that redefined the genre. Set in a dystopian world under the control of the oppressive Combine, you play as Gordon Freeman, a scientist-turned-rebel fighting to free humanity. The game blends intense combat, mind-bending puzzles, and an immersive narrative to create an unforgettable experience. With its revolutionary physics engine and AI, every encounter feels dynamic and engaging. Iconic weapons like the Gravity Gun and unforgettable characters like Alyx Vance make this journey deeply personal. Half-Life 2 isn't just a game; it's a masterclass in storytelling, atmosphere, and gameplay innovation, cementing its place as one of the greatest games ever made.",
  image_url: "https://upload.wikimedia.org/wikipedia/en/2/25/Half-Life_2_cover.jpg"
});

const business21 = await createBusiness({
  name: "Civilization V",
  owner: "Firaxis Games",
  establishedYear: 2010,
  description: "Civilization V is a masterclass in strategy gaming, inviting players to build and rule an empire from the dawn of man to the space age. With a hex-based map and streamlined mechanics, every decision feels impactful, from founding cities to waging war or negotiating alliances. Its deep diplomacy, advanced AI, and varied victory conditions let you shape history your way, whether through cultural dominance, scientific achievement, or military conquest. Stunning visuals, an epic soundtrack, and diverse leaders, each with unique abilities, keep gameplay fresh and engaging. Civ V's expansions add even more depth, making it one of the most rewarding, endlessly replayable strategy games ever crafted.",
  image_url: "https://upload.wikimedia.org/wikipedia/en/5/5c/CIVILIZATION-V-FRONT-OF-BOX.jpg"
});

const business22 = await createBusiness({
  name: "Guitar Hero World Tour",
  owner: "Neversoft",
  establishedYear: 2008,
  description: "Guitar Hero World Tour revolutionized music games by expanding beyond guitar to include drums, bass, and vocals, creating a full-band experience. Featuring an iconic setlist with tracks from legends like Metallica, The Eagles, and Van Halen, it delivers an epic mix of rock, metal, and pop. The game introduced a music creation mode, letting players craft and share their own songs. Its refined mechanics, cooperative band play, and competitive modes made it a hit at parties and a staple for music lovers. With realistic instruments, dynamic venues, and a career mode packed with challenges, World Tour became more than a game—it was a cultural phenomenon that rocked living rooms worldwide.",
  image_url: "https://upload.wikimedia.org/wikipedia/en/4/4c/Guitar_Hero_World_Tour.jpg"
});

const business23 = await createBusiness({
  name: "Pokemon Platinum",
  owner: "Game Freak",
  establishedYear: 2008,
  description: "Pokémon Platinum, an enhanced version of Pokémon Diamond and Pearl, takes players back to the Sinnoh region with new features, improved gameplay, and an expanded storyline. The game introduces the Distortion World, a surreal realm where players confront the Legendary Pokémon Giratina. With updated graphics and animations, Platinum offers a more immersive experience. Players can challenge the new Battle Frontier, featuring varied battle facilities to test their skills. Sinnoh's Pokédex is expanded to include over 200 Pokémon, adding variety to team-building. The story delves deeper into Team Galactic's schemes, while new Wi-Fi features enhance multiplayer interactions, including trading and battling globally.",
  image_url: "https://upload.wikimedia.org/wikipedia/en/c/ca/Pokemon_Platinum.png"
});

const business24 = await createBusiness({
  name: "Jet Set Radio",
  owner: "Smilebit, BitWorks",
  establishedYear: 2000,
  description: "Jet Set Radio is a vibrant, fast-paced action game set in the futuristic city of Tokyo-to, where players join the rebellious GG gang to spread graffiti, reclaim turf, and evade the oppressive authorities. With its iconic cel-shaded art style and an energetic soundtrack blending hip-hop, funk, and electronic beats, the game creates a unique aesthetic. Players perform tricks, grind on rails, and outrun the police, led by the relentless Captain Onishima, while battling rival gangs. The game challenges players to tag various city areas before time runs out, combining stylish movement with creative expression. Jet Set Radio stands out for its bold visuals, addictive gameplay, and cultural impact.",
  image_url: "https://upload.wikimedia.org/wikipedia/en/7/7b/Jetsetradiopalboxart.jpg"
});

const business25 = await createBusiness({
  name: "Ratchet & Clank",
  owner: "Insomniac Games",
  establishedYear: 2002,
  description: "Ratchet & Clank (2002) is a groundbreaking action-platformer that follows the adventures of Ratchet, a skilled mechanic, and Clank, his witty robot companion. Set in a vibrant galaxy, the duo teams up to stop the evil Chairman Drek from destroying planets to build a new world for his race. The game blends platforming, puzzle-solving, and combat with an arsenal of inventive weapons and gadgets, such as the Blaster and Swingshot. Each planet offers unique environments, characters, and challenges, encouraging exploration. With its humorous tone, polished gameplay, and stunning visuals for its time, Ratchet & Clank became a beloved classic, laying the foundation for a long-running series.",
  image_url: "https://psxdatacenter.com/psx2/images2/covers/SCUS-97199.jpg"
});

const business26 = await createBusiness({
  name: "Doom",
  owner: "id Software",
  establishedYear: 1993,
  description: "DOOM (1993) revolutionized the gaming world as a fast-paced, first-person shooter that set players loose in a hellish sci-fi world. As a space marine on Mars' moons, players face hordes of demonic enemies after a portal to Hell is opened. Featuring maze-like levels, players navigate through corridors, finding keys, secrets, and powerful weapons like the shotgun, plasma rifle, and the iconic BFG 9000. Known for its intense action, atmospheric sound design, and fluid movement, DOOM introduced multiplayer deathmatches and co-op play, solidifying its place in gaming history. Its innovative 3D graphics, moddable engine, and adrenaline-pumping gameplay made it a timeless classic that shaped the FPS genre.",
  image_url: "https://upload.wikimedia.org/wikipedia/en/5/57/Doom_cover_art.jpg"
});

const business27 = await createBusiness({
  name: "Midnight Club: Los Angeles",
  owner: "Rockstar San Diego",
  establishedYear: 2008,
  description: "Midnight Club: Los Angeles is an open-world racing game that puts players behind the wheel in a meticulously recreated version of Los Angeles. Players compete in high-stakes street races, earning money to customize their cars and motorcycles with performance upgrades and aesthetic tweaks. The game features dynamic day-night cycles and weather changes, enhancing its immersive urban atmosphere. With a variety of race types, from standard circuits to high-speed sprints, the gameplay emphasizes speed, precision, and risk-taking. Players can explore the city freely, challenging AI or other players online. Known for its fast-paced action, detailed customization, and seamless open-world design, the game offers a thrilling racing experience.",
  image_url: "https://upload.wikimedia.org/wikipedia/en/e/ea/Midnight_Club-Los_Angeles.jpg"
});

const business28 = await createBusiness({
  name: "Sly 3: Honor Among Thieves",
  owner: "Sucker Punch Productions",
  establishedYear: 2005,
  description: "Sly 3: Honor Among Thieves is an action-adventure platformer that follows master thief Sly Cooper and his crew as they attempt to reclaim the Cooper family vault from the villainous Dr. M. The game expands on its predecessors with a diverse roster of playable characters, including Bentley and Murray, each with unique abilities. New allies like Dimitri and the Guru join the heist, adding variety to gameplay. Players explore vibrant, open levels, solving puzzles, pulling off heists, and engaging in stealth-based missions. Mini-games and 3D support add extra depth. With its engaging story, humor, and refined mechanics, Sly 3 delivers a thrilling and cinematic conclusion to the trilogy.",
  image_url: "https://upload.wikimedia.org/wikipedia/en/c/c4/Sly_3.jpg"
});

const business29 = await createBusiness({
  name: "Tony Hawk's Underground 2",
  owner: "Neversoft",
  establishedYear: 2004,
  description: "Tony Hawk's Underground 2 takes skateboarding to wild new heights in this over-the-top sequel. Players join Team Hawk or Team Bam in a chaotic “World Destruction Tour,” a globe-trotting competition filled with outrageous stunts and pranks. The game combines classic skateboarding mechanics with hilarious, larger-than-life objectives, letting players pull off tricks, ride vehicles, and interact with diverse environments. The Story Mode blends humor and rebellion, featuring real-life skaters like Tony Hawk and Bam Margera. Customization is a highlight, allowing players to create skaters, parks, and graffiti. With its high-energy soundtrack and diverse challenges, THUG 2 delivers an unforgettable, adrenaline-fueled skateboarding experience.",
  image_url: "https://upload.wikimedia.org/wikipedia/en/f/f8/Tony_Hawks_Underground_2_PS2.jpg"
});
const business30 = await createBusiness({
  name: "Sonic Heroes",
  owner: "Sonic Team USA",
  establishedYear: 2003,
  description: "Sonic Heroes (2003) brings a fresh twist to the Sonic franchise, featuring fast-paced action with a unique team-based gameplay mechanic. Players control one of four teams—Team Sonic, Team Dark, Team Rose, and Team Chaotix—each consisting of three characters with distinct abilities: speed, power, and flight. Switching between characters in real-time adds strategic depth as players race through vibrant levels, defeat enemies, and solve puzzles. The game offers diverse environments, from lush forests to bustling cities, with each team experiencing a different storyline that ties into the overarching plot. Featuring a colorful art style, upbeat soundtrack, and multiplayer modes, Sonic Heroes delivers a dynamic and accessible experience for newcomers and longtime fans alike.",
  image_url: "https://upload.wikimedia.org/wikipedia/en/4/48/Sonic_Heroes_cover.png"
});
const business31 = await createBusiness({
  name: "RuneScape",
  owner: "Jagex",
  establishedYear: 2001,
  description: "RuneScape is a fantasy MMORPG that offers an expansive, open-world experience, first released in 2001 by Jagex. Set in the medieval-themed realm of Gielinor, players explore diverse regions such as bustling cities, desolate wilderness, and enchanting dungeons. With a focus on player freedom, RuneScape features no fixed storyline, allowing adventurers to carve their own paths through quests, combat, crafting, and trading. The game boasts a classless progression system, enabling players to train 28 unique skills, including magic, smithing, and fishing. PvE and PvP elements coexist, with iconic bosses and the high-risk Wilderness adding challenge. Its vibrant community and frequent updates ensure evolving content, from seasonal events to major expansions. RuneScape has evolved with versions like RuneScape 3 and Old School RuneScape, maintaining its legacy as a dynamic, ever-growing virtual world.",
  image_url: "https://cdn2.steamgriddb.com/thumb/1325bf8e00cd6fdecc9c918f58d832ee.jpg"
});
const business32 = await createBusiness({
  name: "NBA Street Vol. 2",
  owner: "NuFx EA Canada",
  establishedYear: 2003,
  description: "NBA Street Vol. 2 is an iconic arcade-style basketball game released by EA Sports BIG in 2003, celebrated for its dynamic gameplay and vibrant streetball culture. Set across urban courts with legendary graffiti and beats, players build a team of streetballers or NBA legends to dominate 3v3 matches. The game blends flashy tricks, jaw-dropping dunks, and fast-paced action with style points earned for creative plays. Its unique “Gamebreaker” feature lets players unleash powerful, score-boosting moves. Featuring iconic players like Michael Jordan, Dr. J, and Magic Johnson, it bridges eras of basketball. With engaging modes like Be a Legend and Pick-Up Game, along with a killer hip-hop soundtrack, NBA Street Vol. 2 is hailed as a timeless classic that captures the spirit of basketball with electrifying energy and fun.",
  image_url: "https://upload.wikimedia.org/wikipedia/en/e/ea/NBA_Street_Vol._2_Coverart.png"
});
const business33 = await createBusiness({
  name: "ToonTown Online",
  owner: "Disney's Virtual Reality Studio",
  establishedYear: 2001,
  description: "Toontown Online was a groundbreaking MMORPG developed by Disney Interactive, capturing the whimsy of classic cartoons. Launched in 2003, the game immersed players in a vibrant world where they created customizable “Toons” to battle humorless robots called “Cogs” attempting to turn the colorful world into a corporate dystopia. Toons used gags like pies, squirting flowers, and anvils to defeat Cogs in turn-based combat. The game encouraged collaboration, with players teaming up to tackle Cog buildings, factories, and the epic Bossbot HQ battles. Toontown featured diverse activities, from fishing and kart racing to owning estates and decorating houses. Its charm lay in its family-friendly humor, engaging gameplay, and a social experience that fostered teamwork and creativity. Though officially closed in 2013, its legacy lives on through fan-made revivals, preserving Toontown's zany, joyful spirit for generations.",
  image_url: "https://www.vgfacts.com/media/boxart/2/1640.png"
});
const business34 = await createBusiness({
  name: "Left 4 Dead 2",
  owner: "Valve",
  establishedYear: 2009,
  description: "Left 4 Dead 2, released in 2009 by Valve, is a co-op first-person shooter that has become a timeless classic. Set in a post-apocalyptic world, players team up as Survivors battling through relentless hordes of zombies across diverse campaigns, utilizing unique weapons, melee tools, and explosive gadgets. Its hallmark is the AI “Director,” which dynamically adjusts enemy placement and intensity to keep each playthrough fresh and challenging. Beyond its stellar core gameplay, the Steam Workshop has played a crucial role in the game's enduring popularity. Players create and share custom campaigns, maps, character skins, weapons, and mods, injecting endless creativity and replayability. From fan-made levels to complete overhauls, the Workshop has allowed Left 4 Dead 2 to evolve with its community, ensuring its relevance over a decade later as one of the most engaging and replayable co-op experiences in gaming.",
  image_url: "https://upload.wikimedia.org/wikipedia/en/b/ba/Left4Dead2.jpg"
});

const business35 = await createBusiness({
  name: "Project Zomboid",
  owner: "The Indie Stone",
  establishedYear: 2011,
  description: "Project Zomboid is a deep and immersive survival game developed by The Indie Stone, currently in early access on Steam. Set in a sprawling, post-apocalyptic world overrun by zombies, it challenges players to survive as long as possible in a sandbox environment where every decision matters. Featuring realistic survival mechanics like hunger, thirst, injuries, and mental health, players must scavenge, build, and fight to endure the inevitable. The game boasts a robust crafting system, base-building, and complex AI, offering endless replayability. Regular updates from a dedicated development team have expanded features like multiplayer, vehicles, and modding support, keeping the community engaged. With a thriving workshop of user-created content and a roadmap promising even more features, Project Zomboid is a must-play for fans of challenging survival experiences and remains one of the most ambitious zombie survival games in development.",
  image_url: "https://upload.wikimedia.org/wikipedia/en/0/0c/Boxshot_of_video_game_Project_zomboid.jpg"
});

const business36 = await createBusiness({
  name: "Power Stone 2",
  owner: "Capcom",
  establishedYear: 2000,
  description: "Power Stone 2, released in 2000 by Capcom, is a fast-paced 3D arena fighting game that stands out with its chaotic, multiplayer gameplay and interactive environments. Players select from a colorful roster of characters, battling in multi-tiered stages filled with items, hazards, and Power Stones that unlock transformations and powerful attacks. Supporting up to four players, the game is a beloved party brawler, praised for its dynamic action, vibrant visuals, and strategic depth. In 2025, Capcom will re-release Power Stone 2 as part of the Capcom Fighting Collection 2, alongside classics like Capcom vs. SNK 2 and Project Justice. This version includes online play with rollback netcode, training modes, and quality-of-life improvements, bringing this cult favorite to modern platforms. The re-release offers both nostalgic fans and newcomers a chance to experience this unique, action-packed classic.",
  image_url: "https://m.media-amazon.com/images/I/51bLRqmzw9L._SX300_SY300_QL70_FMwebp_.jpg"
});

const business37 = await createBusiness({
  name: "Mortal Kombat 9",
  owner: "NetherRealm Studios",
  establishedYear: 2011,
  description: "Mortal Kombat 9, released in 2011 by NetherRealm Studios, is a critically acclaimed reboot of the iconic fighting game series. Serving as both a continuation and retelling of the original trilogy's events, it features a cinematic story mode that reimagines Mortal Kombat's lore with gripping twists. The game reintroduces classic characters like Scorpion, Sub-Zero, and Raiden while maintaining the franchise's signature brutal combat and over-the-top fatalities. With accessible mechanics and deep combos, it caters to both casual players and competitive fighters. Mortal Kombat 9 also marked the return of the classic 2D fighting plane, combined with stunning 3D visuals and interactive arenas. It introduced a robust Challenge Tower, tag team battles, and extensive online modes. Praised for its nostalgic yet fresh approach, Mortal Kombat 9 revitalized the series, setting the stage for its modern resurgence.",
  image_url: "https://upload.wikimedia.org/wikipedia/en/1/1f/Mortal_Kombat_box_art.png"
});

const business38 = await createBusiness({
  name: "Assassin's' Creed 2",
  owner: "Ubisoft Montreal",
  establishedYear: 2009,
  description: "Assassin's Creed II, released in 2009 by Ubisoft, is a critically acclaimed sequel that elevated the series to new heights. Set during the Italian Renaissance, players follow the journey of Ezio Auditore da Firenze, a young noble turned assassin, seeking revenge and uncovering a vast conspiracy. The game introduced richer storytelling, a charismatic protagonist, and a detailed open world featuring iconic cities like Florence, Venice, and Rome. Gameplay improvements included a broader range of weapons, economic systems, and more fluid parkour mechanics. Assassin's Creed II expanded on the original's stealth-action formula with diverse missions, hidden tombs, and a more dynamic combat system. With its engaging narrative, stunning visuals, and immersive historical setting, it set a new standard for the franchise, cementing Ezio's legacy as one of gaming's most beloved characters and establishing Assassin's Creed as a premier series.",
  image_url: "https://upload.wikimedia.org/wikipedia/en/7/77/Assassins_Creed_2_Box_Art.JPG"
});

const business39 = await createBusiness({
  name: "True Crime: Streets of LA",
  owner: "Luxoflux",
  establishedYear: 2003,
  description: "True Crime: Streets of LA, released in 2003 by Luxoflux and Activision, is an open-world action-adventure game that blends gritty storytelling with explosive gameplay. Players take on the role of Nick Kang, a hard-nosed LAPD detective seeking justice in a sprawling, crime-ridden Los Angeles. The game features a mix of third-person shooting, hand-to-hand combat, and high-speed driving across a detailed recreation of LA's streets. With its branching storyline, player choices affect the narrative's outcome, leading to multiple endings. True Crime distinguishes itself with its freedom to explore, dynamic missions, and a morality system that tracks Nick's actions as lawful or rogue. The game's cinematic style, diverse gameplay, and Hollywood-level voice cast, including Christopher Walken and Gary Oldman, earned it praise as a precursor to modern open-world titles, cementing its status as a cult classic.",
  image_url: "https://upload.wikimedia.org/wikipedia/en/6/62/True_Crime_-_Streets_of_LA_coverart.jpg"
});

const business40 = await createBusiness({
  name: "HITMAN World of Assinssination",
  owner: "IO Interactive",
  establishedYear: 2021,
  description: "Hitman 3, released in 2021 by IO Interactive, is the stunning conclusion to the World of Assassination trilogy, offering players the ultimate stealth-action experience. As Agent 47, players traverse meticulously crafted sandbox environments across global locations like Dubai, Dartmoor, and Chongqing, executing targets with creativity and precision. The game emphasizes freedom of choice, allowing players to utilize disguises, environmental interactions, and diverse weaponry to complete missions their way. With enhanced visuals, improved AI, and atmospheric storytelling, Hitman 3 elevates the franchise's signature blend of strategy and stealth. It also integrates content from the previous two games, creating a seamless trilogy experience. Post-launch updates, user-created contracts, and VR support further enhance replayability. Praised for its innovation and depth, Hitman 3 is a masterclass in assassination gameplay and a fitting finale to Agent 47's journey.",
  image_url: "https://upload.wikimedia.org/wikipedia/en/4/4b/Hitman_3_Packart.jpg"
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