const memories = [
  {
    title: "Note at Geisel",
    dateStr: "Feb 1, 2025",
    city: "UCSD",
    rawDate: "2026-02-01",
    lat: 32.880952, lng: -117.237871, 
    description: "Where you first gave me the note after hours at the library on the weekend :) I'm so lucky to have met you on this day by pure happenstance. I only wish it could have been sooner.",
    pathCoords: [
      [32.880952, -117.237871]
    ],
    stops: [[32.880952, -117.237871]]
  },
  {
    title: "Our First Date",
    dateStr: "Feb 8, 2025",
    city: "La Jolla",
    rawDate: "2026-02-08",
    lat: 32.869679, lng: -117.212650, 
    description: "When we first actually met and introduced ourselves to each other. We went to Ramen Nagi and HeyTea for lunch. I had no idea what to expect from you and this day, but I'm so glad it happened. Now looking back the person who asked us if we were dating is a moment to just laugh at now lmao. Glad we are together now :)",
    pathCoords: [
      [32.869679, -117.212650],
      [32.871772, -117.212765],
      [32.87214651265481, -117.21304721836955],
      [32.872033, -117.212055],
      [32.870807, -117.210284],
      [32.870812, -117.210667],
      [32.869679, -117.212650],
      [32.869365, -117.213992]
    ],
    stops: [
      [32.869679, -117.212650],
      [32.87214651265481, -117.21304721836955],
      [32.870807, -117.210284],
      [32.870812, -117.210667],
      [32.869365, -117.213992]
      ]
  },
  {
    title: "Second Date at SomiSomi",
    dateStr: "Feb 11, 2026",
    city: "La Jolla",
    rawDate: "2026-02-11",
    lat: 32.872111, lng: -117.208679, 
    description: "When we went to SomiSomi for our second date. Apparently, I have to construct preferences for everything now huh lol.",
    pathCoords: [
      [32.872111, -117.208679]
    ],
    stops: [
      [32.872111, -117.208679]
    ]
  },
  {
    title: "Valentine's Day Date",
    dateStr: "Feb 14, 2026",
    city: "La Jolla",
    rawDate: "2026-02-14",
    lat: 32.8787925, lng: -117.24264944, 
    description: "This was a fun date hehe :) We had coffee/matcha at MOMs and then went to Gliderport to watch the sunset and then got dinner at Jose's Courtroom. A lot of good talks and conversations about life and love. And then I gave you the bonquet of flowers to finish off the night. It made me so happy that you were so happy about the flowers and just seeing that made me want to be with you more.",
    pathCoords: [
      [32.87879258679919, -117.24264944090304],
      [32.887025, -117.242429],
      [32.888647825822915, -117.24842629754433],
      [32.88992424978372, -117.2497711105027],
      [32.88864113883232, -117.2510827278818],
      [32.88721030271948, -117.25151841865078],
      [32.88864113883232, -117.2510827278818],
      [32.88992424978372, -117.2497711105027],
      [32.888647825822915, -117.24842629754433],
      [32.88756066621619, -117.24378470686764],
      [32.875533945294286, -117.24372273940914],
      [32.86927224237564, -117.24874873434484],
      [32.87114202402463, -117.25100903918208],
      [32.8506545429236, -117.25458481491194],
      [32.8471965383845, -117.26727021423135],
      [32.84801944544673, -117.27387199892362],
      [32.8471965383845, -117.26727021423135],
      [32.8506545429236, -117.25458481491194],
      [32.87114202402463, -117.25100903918208],
      [32.86927224237564, -117.24874873434484],
      [32.879668678450216, -117.24076027179781],
      [32.88704546028306, -117.2407764404375],
      [32.887716366257294, -117.24186110200486],
      [32.88704546028306, -117.2407764404375]
    ],
    stops: [
      [32.87879258679919, -117.24264944090304],
      [32.88721030271948, -117.25151841865078],
      [32.84801944544673, -117.27387199892362],
      [32.88704546028306, -117.2407764404375]
    ]
  },
  {
    title: "Tasty Noodle House & Yun Tea",
    dateStr: "Feb 21, 2026",
    city: "San Diego",
    rawDate: "2026-02-21",
    lat: 32.82488680000299, lng: -117.1559369149662, 
    description: "Where we went to Tasty Noodle House & Yun Tea for our first time at Convoy together. You gave me the white beaded bracelet on our way to the restaurant. And this is when we held hands for the first time on the walk back to your apartment. Didn't know I could be that excited about you until that finally happened hehe :)",
    pathCoords: [
      [32.82488680000299, -117.1559369149662],
      [32.82488680000299, -117.15534312593736],
      [32.819718961862364, -117.15519918576095],
      [32.81972364086464, -117.15602428975814]
    ],
    stops: [
      [32.82488680000299, -117.1559369149662],
      [32.81972364086464, -117.15602428975814]
    ]
  },
  {
    title: "Qin West Noodle",
    dateStr: "Feb 28, 2026",
    city: "La Jolla",
    rawDate: "2026-02-28",
    lat: 32.869725319837656, lng: -117.21235158308146, 
    description: "This is when we went to the CNY event where I met Matilda for the first time, and then we went to Qin West Noodle and you met Arman for the first time. Funny times lmao.",
    pathCoords: [
      [32.8789274700817, -117.23597302640955],
      [32.879563430394995, -117.23200942666578],
      [32.8824602359049, -117.2257108791507],
      [32.88104069885302, -117.21869104654763],
      [32.87871130769698, -117.21433640618551],
      [32.874017184489844, -117.21381650184055],
      [32.868565405603114, -117.21379843295017],
      [32.869725319837656, -117.21235158308146]
    ],
    stops: [
      [32.8789274700817, -117.23597302640955],
      [32.869725319837656, -117.21235158308146]
    ]
  },
  {
    title: "KBBQ after MCAT",
    dateStr: "Mar 7, 2026",
    city: "San Diego",
    rawDate: "2026-03-07",
    lat: 32.81947263168121, lng: -117.15592639956301,
    description: "The night after you finished your MCAT and we went to KBBQ together with Matilda and Arman. You were free from those hours and hours at Geisel :)",
    pathCoords: [
      [32.81947263168121, -117.15592639956301]
    ],
    stops: [
      [32.81947263168121, -117.15592639956301]
    ]
  },
  {
    title: "When we became official",
    dateStr: "Mar 9, 2026",
    city: "La Jolla",
    rawDate: "2026-03-09",
    lat: 32.88693843161802, lng: -117.24221471771367,
    description: "This one is one of my favorite memories and yours too. We walked along La Jolla Cove, and you were so excited about the seals on the beach. We got dinner at The Spot and then got gelato after. And then we went all the way back the the balcony on Rady where we became official. I'm so happy you said yes :) Oh these memories are so special to me. I love seeing you happy especially during this night. I love you so much.",
    pathCoords: [
      [32.875533945294286, -117.24372273940914],
      [32.86927224237564, -117.24874873434484],
      [32.87114202402463, -117.25100903918208],
      [32.8506545429236, -117.25458481491194],
      [32.8471965383845, -117.26727021423135],
      [32.84750243399673, -117.27444758201246],
      [32.8481283336383, -117.27439642108844],
      [32.8471965383845, -117.26727021423135],
      [32.8506545429236, -117.25458481491194],
      [32.87114202402463, -117.25100903918208],
      [32.86927224237564, -117.24874873434484],
      [32.875533945294286, -117.24372273940914],
      [32.880962882289786, -117.24367027011355],
      [32.881076457598176, -117.24246825257099],
      [32.88695631884755, -117.24243821791462],
      [32.88693843161802, -117.24221471771367]
    ],
    stops: [
      [32.84750243399673, -117.27444758201246],
      [32.8481283336383, -117.27439642108844],
      [32.88693843161802, -117.24221471771367]
    ]
  },
  {
    title: "Our first kisses",
    dateStr: "Mar 14, 2026",
    city: "UCSD",
    rawDate: "2026-03-14",
    lat: 32.87797416705165, lng: -117.22999964808494,
    description: "It was a lock in session for finals week where we studied in the upstairs of Price Center. On our way back to your apartment, we had our first kisses hehe :)  I didn't know how hard I could fall for you. Very special moments and memories.",
    pathCoords: [
      [32.879703118381585, -117.23611219904387],
      [32.879492102634416, -117.23451724263674],
      [32.87859362649844, -117.23433652006129],
      [32.87890321985701, -117.23181371017735],
      [32.878368956791505, -117.2304185874462],
      [32.87797416705165, -117.22999964808494]
    ],
    stops: [
      [32.879703118381585, -117.23611219904387],
      [32.87797416705165, -117.22999964808494]
    ]
  },
{
    title: "Eastern Dynasty",
    dateStr: "Mar 30, 2026",
    city: "San Diego",
    rawDate: "2026-03-30",
    lat: 32.82668598370515, lng: -117.15573917468389,
    description: "Finally able to catch up after not seeing you for the entirety of spring break. I love just talking to you about literally anything and being able to share my thoughts with you. I love seeing you so much.",
    pathCoords: [
      [32.82668598370515, -117.15573917468389]
    ],
    stops: [
      [32.82668598370515, -117.15573917468389]
    ]
  },
  {
    title: "SomiSomi then walking back in the rain",
    dateStr: "Apr 25, 2026",
    city: "La Jolla",
    rawDate: "2026-04-25",
    lat: 32.88110370334504, lng: -117.23803159243704,
    description: "When we went to get SomiSomi and then on our walk back from your apartment to mine, we were intially soaked in the rain but the it cleared up. This is one of my favorite memories where we walked around in the rain and were trying to rush back. I can clearly remember when we were walking by Geisel and you were so excited and hopping around. And then I got to kiss you. This is the closest thing we have to a kiss in the rain, but oh man what I would do to relive that very moment. I love you so much.",
    pathCoords: [
      [32.872111, -117.208679],
      [32.869029758197414, -117.21393008345933],
      [32.877702601825526, -117.2141012906416],
      [32.87935080033878, -117.2153277253257],
      [32.88135489830371, -117.21907427182505],
      [32.88262823118579, -117.22554142763443],
      [32.87998742409183, -117.23194162442837],
      [32.879088631583244, -117.23191920274034],
      [32.87820845741304, -117.2298676311119],
      [32.87892008362236, -117.23187459887951],
      [32.878601633921484, -117.23441674266623],
      [32.8801969180405, -117.23623157324772],
      [32.88029603226337, -117.23742246629155],
      [32.88110370334504, -117.23803159243704],
      [32.88477316852462, -117.2386496834209],
      [32.88770208260957, -117.24184691515516]
    ],
    stops: [
      [32.872111, -117.208679],
      [32.88110370334504, -117.23803159243704]
    ]
  },
  {
    title: "Taco Time Cantina & Scoops",
    dateStr: "Apr 28, 2026",
    city: "La Jolla",
    rawDate: "2026-04-28",
    lat: 32.841347386016004, lng: -117.27421196062289,
    description: "We finally were able to get tacos together. The hallmark of San Diego food and a lot of my memories from freshman year. I'm glad I got to share trying this taco place together for the first time for the both of us with you.",
    pathCoords: [
      [32.841347386016004, -117.27421196062289],
      [32.84162571618272, -117.27302084302299],
      [32.84737354252812, -117.27457728699773],
      [32.84776372276603, -117.2741946063717]
    ],
    stops: [
      [32.841347386016004, -117.27421196062289],
      [32.84776372276603, -117.2741946063717]
    ]
  },
  {
    title: "Sun God Festival, Yintang, and Games",
    dateStr: "May 2, 2026",
    city: "UCSD",
    rawDate: "2026-05-02",
    lat: 32.88710695528683, lng: -117.23964037129329,
    description: "This was a fun day at SGF. We went around mostly in lines for different things but watched Dominic Fike. I kinda regret not being closer to the crowd during MICO though oh well. It was a good time and I'm glad I got to share it with you. We got pictures of us together :) We went to Yintang for dinner and then drinks and switch games back at your apartment.",
    pathCoords: [
      [32.88710695528683, -117.23964037129329],
      [32.87224966037761, -117.23739005730391],
      [32.87440056552997, -117.19935999902435],
      [32.847950799913555, -117.17681636465616],
      [32.83688908309464, -117.15270329329222],
      [32.827021480892725, -117.15446446936532],
      [32.82688638515651, -117.15571386151156],
      [32.826373708276265, -117.15466365143693],
      [32.82189163050511, -117.1552900489926],
      [32.821800482784106, -117.16228646833152],
      [32.87610990412009, -117.1996732596676],
      [32.872774643005485, -117.21427384607469],
      [32.878758708750134, -117.21462470418437],
      [32.88189755808328, -117.21976479573978],
      [32.88129932861374, -117.22919871786966],
      [32.87837037181905, -117.23014484421516]
    ],
    stops: [
      [32.88710695528683, -117.23964037129329],
      [32.82688638515651, -117.15571386151156],
      [32.87837037181905, -117.23014484421516]
    ]
  },
{
    title: "2 month flowers",
    dateStr: "May 10, 2026",
    city: "UCSD",
    rawDate: "2026-05-10",
    lat: 32.87799169540395, lng: -117.23045879531415,
    description: "You get so excited every time I get you flowers, and it gives me so much joy. I want you to be happy and loved, and every time I go through the process of getting you a bonquet of flowers, it just reminds me of you. You get surprised every time and that always surprises me lol.",
    pathCoords: [
      [32.87799169540395, -117.23045879531415]
    ],
    stops: [
      [32.87799169540395, -117.23045879531415]
    ]
  },
{
    title: "Pho Cow Cali",
    dateStr: "May 12, 2026",
    city: "UCSD",
    rawDate: "2026-05-12",
    lat: 32.878772425365085, lng: -117.23288052024728,
    description: "Where we waited for 2+ hours for pho. Man. It was worth it because you were there though hehe :) I love talking to you.",
    pathCoords: [
      [32.878772425365085, -117.23288052024728]
    ],
    stops: [
      [32.878772425365085, -117.23288052024728]
    ]
  },
{
    title: "Regents Pizzaria",
    dateStr: "May 22, 2026",
    city: "La Jolla",
    rawDate: "2026-05-22",
    lat: 32.87335362720183, lng: -117.21803618257744,
    description: "Another memorable date just because you were there. I'm sorry I can't get a sweet treat after every time :(",
    pathCoords: [
      [32.87335362720183, -117.21803618257744]
    ],
    stops: [
      [32.87335362720183, -117.21803618257744]
    ]
  },
{
    title: "Fluffy 5k Run",
    dateStr: "May 23, 2026",
    city: "UCSD",
    rawDate: "2026-05-23",
    lat: 32.87460922658291, lng: -117.24097132397424,
    description: "Where we were able to run a 5k together for the first time. You didn't think I could like actually run when I did it for like 6+ years smh lol. I was able to get second but the more memorable part of the experience was being there with you :) cutie",
    pathCoords: [
      [32.87460922658291, -117.24097132397424]
    ],
    stops: [
      [32.87460922658291, -117.24097132397424]
    ]
  },
{
    title: "Crab Rangoon & Happy Lemon",
    dateStr: "May 23, 2026",
    city: "La Jolla",
    rawDate: "2026-05-23",
    lat: 32.87090647167023, lng: -117.2109506930059,
    description: "You were finally able to try the crab rangoons from the place in UTC. We got tea and then just talked. I'm so happy to be in your life and to just experience all the little things with you.",
    pathCoords: [
      [32.87027823239361, -117.21040888733589],
      [32.870797616304, -117.21061311600438],
      [32.87090647167023, -117.2109506930059],
      [32.87053655627379, -117.21177895025015]
    ],
    stops: [
      [32.87027823239361, -117.21040888733589],
      [32.87090647167023, -117.2109506930059],
      [32.87053655627379, -117.21177895025015]
    ]
  },
{
    title: "Senior Sendoff AS Event",
    dateStr: "May 29, 2026",
    city: "UCSD",
    rawDate: "2026-05-29",
    lat: 32.88675564354929, lng: -117.23931078506482,
    description: "Another one of my favorite memories of us together. It was too sunny tho :/ But we got a lot of freebies and food and made the bonquets together. And we were finally able to get physical pictures of ourselves together. They make me so happy every time I see us together.",
    pathCoords: [
      [32.88675564354929, -117.23931078506482]
    ],
    stops: [
      [32.88675564354929, -117.23931078506482]
    ]
  },
{
    title: "Chipotle & Med School Applications",
    dateStr: "May 30, 2026",
    city: "La Jolla",
    rawDate: "2026-05-30",
    lat: 32.87794162046597, lng: -117.2300844374769,
    description: "This was a 'fun' day for you. We got dinner at Chipotle and then went back to your apartment for you to submit your first stage of med school applications. I'm glad to be able to see every aspect of your life with you.",
    pathCoords: [
      [32.86573769244636, -117.23222522830108],
      [32.865608924248384, -117.23233891574495],
      [32.86651560718143, -117.23226301611528],
      [32.866866620251365, -117.23038223224142],
      [32.87871353364668, -117.23167237328552],
      [32.87794162046597, -117.2300844374769]
    ],
    stops: [
      [32.86573769244636, -117.23222522830108],
      [32.865608924248384, -117.23233891574495],
      [32.87794162046597, -117.2300844374769]
      ]
  },
{
    title: "3 month anniversary date",
    dateStr: "June 10, 2026",
    city: "UCSD",
    rawDate: "2026-06-10",
    lat: 32.84910648705565, lng: -117.27237063116102,
    description: "We're free from finals!! Yipeee! And then we were able to go on a date date after a it had been a while. Everytime we go out I'm reminded of how much I love you and enjoy just being with you. I was so happy to go out with you again. I was finally able to get you peonies after 3 months :) I'm glad you like them.",
    pathCoords: [
      [32.84910648705565, -117.27237063116102]
    ],
    stops: [
      [32.84910648705565, -117.27237063116102]
      ]
  },
{
    title: "Graduation & Dinner",
    dateStr: "June 13, 2026",
    city: "UCSD",
    rawDate: "2026-06-13",
    lat: 32.88013082780415, lng: -117.23048263157465,
    description: "When you walked for graduation and met your family. I'll do better next time with them (hopefully lol). But I'm glad to be present in each milestone of your life and see you continue to grow.",
    pathCoords: [
      [32.88013082780415, -117.23048263157465],
      [32.9619196627295, -117.26789582746294]
    ],
    stops: [
      [32.88013082780415, -117.23048263157465],
      [32.9619196627295, -117.26789582746294]
      ]
  },
{
    title: "Goodbye :(",
    dateStr: "June 13, 2026",
    city: "La Jolla",
    rawDate: "2026-06-13",
    lat: 32.89779468930769, lng: -117.19265302208079,
    description: "The last time I saw you :( Oh what I would do to have done something differently before I had left. I didn't get to kiss you or even hug you :(( I'm so sad that it'll be a while before we see each other again. I miss you so much.",
    pathCoords: [
      [32.89779468930769, -117.19265302208079]
    ],
    stops: [
      [32.89779468930769, -117.19265302208079]
      ]
  }
];

// Sort chronologically
memories.sort((a, b) => new Date(a.rawDate) - new Date(b.rawDate));

// Initialize Map - CENTERED ON UCSD / LA JOLLA
const map = L.map("map", {
  zoomControl: false, 
  attributionControl: false 
}).setView([32.8600, -117.2250], 13); // Centered between campus and the cove

// Dark Carto Basemap
L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
  { attribution: "&copy; OpenStreetMap &copy; CARTO" }
).addTo(map);

L.control.zoom({ position: 'topleft' }).addTo(map);
L.control.attribution({ position: 'bottomright', prefix: false }).addTo(map);

// Update the pill count dynamically
document.querySelector('.memories-pill').innerHTML = `
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line>
  </svg>
  ${memories.length} memories
`;

function createIcon(index) {
  return L.divIcon({
    // ✨ ADDED 'story-hidden' so markers fade in later
    className: "custom-leaflet-marker story-hidden",
    html: `
      <div class="custom-pin">
        <div class="pin-circle">${index + 1}</div>
        <div class="pin-line"></div>
      </div>
    `,
    iconSize: [26, 46], iconAnchor: [13, 46] 
  });
}

const markers = [];
const timelineNodes = []; // Kept track of nodes for the story reveal
const timeline = document.getElementById("timeline");
let activeRouteLayer = null;

// ✨ Global function to clean up the map cleanly
const collapseAll = () => {
  document.querySelectorAll('.memory-card').forEach(c => c.classList.remove('expanded'));
  if (activeRouteLayer) {
    map.removeLayer(activeRouteLayer);
    activeRouteLayer = null;
  }
  markers.forEach(mkr => mkr.setZIndexOffset(1000));
};

memories.forEach((m, i) => {
  
  // 1. Render Map Marker
  const marker = L.marker([m.lat, m.lng], {
    icon: createIcon(i),
    zIndexOffset: 1000 
  }).addTo(map);
  
  markers.push(marker);

  // 2. Render Timeline Entry
  const entryDiv = document.createElement("div");
  // ✨ ADDED 'story-hidden' so sidebar items fade in later
  entryDiv.className = "timeline-entry story-hidden";

  entryDiv.innerHTML = `
    <div class="timeline-dot"></div>
    <div class="timeline-date">${m.dateStr} &middot; ${m.city}</div>
    <div class="memory-card" data-index="${i}">
      <div class="card-content">
        <div class="card-title">${m.title}</div>
        <div class="card-desc">${m.description}</div>
      </div>
      <svg class="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#686d76" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </div>
  `;
  timeline.appendChild(entryDiv);
  timelineNodes.push(entryDiv);
  const card = entryDiv.querySelector(".memory-card");

  // 3. Click Logic (Accordion, Draw Path & Zoom)
  const handleMemoryClick = () => {
    const isAlreadyExpanded = card.classList.contains('expanded');

    collapseAll(); // ✨ Use clean helper

    // If it wasn't already open, open it and draw the map
    if (!isAlreadyExpanded) {
      card.classList.add('expanded');
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // ✨ BOOST this specific marker to the very top ✨
      marker.setZIndexOffset(9999);

      activeRouteLayer = L.layerGroup().addTo(map);

      // --- LAYERED PATHS ---
      // Layer 1: The solid, transparent background track
      const staticLine = L.polyline(m.pathCoords, {
        color: '#a78bfa', 
        weight: 3,
        opacity: 0.25 
      }).addTo(activeRouteLayer);

      // Layer 2: The slower animated dashed line on top
      const pathLine = L.polyline(m.pathCoords, {
        color: '#a78bfa', 
        weight: 2, 
        className: 'animated-path', 
        opacity: 0.9
      }).addTo(activeRouteLayer);

      // DRAW THE DOTS USING ONLY THE EXPLICIT STOPS
      if (m.stops) {
        m.stops.forEach((coords) => {
          L.circleMarker(coords, {
            radius: 4, 
            color: '#a78bfa', 
            fillColor: '#111216', 
            fillOpacity: 1, 
            weight: 2
          }).addTo(activeRouteLayer);
        });
      }

      // Zoom to the path bounds
      map.flyToBounds(pathLine.getBounds(), { padding: [80, 80], duration: 0.6, maxZoom: 16 });
    }
  };

  // Expose the click handler on the marker object so our Story Mode can trigger it automatically
  marker.customExpand = handleMemoryClick;

  card.addEventListener('click', handleMemoryClick);
  marker.on('click', handleMemoryClick);

  // 4. Hover States
  card.addEventListener('mouseenter', () => {
    card.classList.add('active');
    const iconElement = marker.getElement();
    if (iconElement) iconElement.querySelector('.custom-pin').classList.add('active');
    marker.setZIndexOffset(9999);
  });

  card.addEventListener('mouseleave', () => {
    card.classList.remove('active');
    const iconElement = marker.getElement();
    if (iconElement) iconElement.querySelector('.custom-pin').classList.remove('active');
    if (!card.classList.contains('expanded')) marker.setZIndexOffset(1000);
  });

  marker.on('mouseover', () => {
    const iconElement = marker.getElement();
    if (iconElement) iconElement.querySelector('.custom-pin').classList.add('active');
    card.classList.add('active');
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); 
    marker.setZIndexOffset(9999);
  });

  marker.on('mouseout', () => {
    const iconElement = marker.getElement();
    if (iconElement) iconElement.querySelector('.custom-pin').classList.remove('active');
    card.classList.remove('active');
    if (!card.classList.contains('expanded')) marker.setZIndexOffset(1000);
  });
});

// 5. Dismissal: Click empty map space to close everything
map.on('click', (e) => {
  if (e.originalEvent.target.closest('.custom-leaflet-marker')) return;
  collapseAll(); // ✨ Use clean helper
  
  // RESET ZOOM TO LA JOLLA / UCSD
  map.flyTo([32.8600, -117.2250], 13, { duration: 0.8 });
});

// MOBILE CHECK
const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

if (isMobile) {
  document.body.innerHTML = `
    <div style="padding:40px; text-align:center; color:white;">
      <h1>Almost there!</h1>
      <p>This gift is designed for a desktop or laptop computer.</p>
      <p>Please open this same link on your computer.</p>
    </div>
  `;
}
// =====================================
// ✨ THE STORY MODE ENGINE ✨
// =====================================

// Helper to create pauses in the playback
const delay = (ms) => new Promise(res => setTimeout(res, ms));
document.getElementById('begin-btn').addEventListener('click', async () => {
  // 1. Hide Intro
  const introScreen = document.getElementById('intro-screen');
  introScreen.classList.add('hidden');
  
  setTimeout(() => {
    introScreen.remove();
    map.invalidateSize();
  }, 800);

  await delay(1000); 

  const nextBtn = document.getElementById('next-story-btn');
  const skipBtn = document.getElementById('skip-btn');
  
  // Skip logic state
  let skipStory = false;
  let userClickResolve = null;

  // Map the buttons to resolve our pause loop
  nextBtn.onclick = () => { if (userClickResolve) userClickResolve(); };
  skipBtn.onclick = () => { 
    skipStory = true; 
    if (userClickResolve) userClickResolve(); 
  };

  // 2. Loop through memories
  for (let i = 0; i < memories.length; i++) {
    if (skipStory) break; // Break immediately if skip was pressed

    const marker = markers[i];
    const timelineEntry = timelineNodes[i];

    map.flyTo([memories[i].lat, memories[i].lng], 14, { duration: 1.3 });
    await delay(600); 

    if (skipStory) break;

    marker.getElement().classList.remove('story-hidden');
    timelineEntry.classList.remove('story-hidden');
    await delay(300); 

    marker.customExpand();
    await delay(1000); 

    if (skipStory) break;

    // Show buttons
    nextBtn.innerText = i === memories.length - 1 ? "Finish" : "Next ➔";
    nextBtn.classList.remove('hidden');
    skipBtn.classList.remove('hidden');

    // Pause the loop until she clicks 'Next' or 'Skip'
    await new Promise(resolve => { userClickResolve = resolve; });

    // Hide buttons and clean up map
    nextBtn.classList.add('hidden');
    skipBtn.classList.add('hidden');
    collapseAll();
    
    if (skipStory) break; // If she clicked skip to resolve the promise, break here
    await delay(400); 
  }

  // Ensure controls are hidden if skipped mid-way
  nextBtn.classList.add('hidden');
  skipBtn.classList.add('hidden');
  collapseAll();

  markers.forEach(marker => {
    if (marker.getElement()) marker.getElement().classList.remove('story-hidden');
  });
  timelineNodes.forEach(node => node.classList.remove('story-hidden'));

  // 3. Story Finished / Skipped - Reset camera and show letter
  map.flyTo([32.8600, -117.2250], 13, { duration: 1.5 });
  await delay(1500); 
  
  document.getElementById('letter-popup').classList.remove('hidden');
});

// =====================================
// ✨ LETTER TOGGLE LOGIC ✨
// =====================================

const letterPopup = document.getElementById('letter-popup');
const reopenBtn = document.getElementById('reopen-letter-btn');

// Close the letter and show the Reopen button
document.getElementById('close-letter-btn').addEventListener('click', () => {
  letterPopup.classList.add('hidden');
  
  // Wait for the fade-out, then reveal the button in the bottom right
  setTimeout(() => {
    reopenBtn.classList.remove('hidden');
  }, 800);
});

// Click the bottom right button to bring the letter back
reopenBtn.addEventListener('click', () => {
  letterPopup.classList.remove('hidden');
  reopenBtn.classList.add('hidden'); // Hide this button while reading
});

// =====================================
// ✨ DOWNLOAD LETTER LOGIC ✨
// =====================================

document.getElementById('download-letter-btn').addEventListener('click', function() {
  const popupElement = document.getElementById('letter-popup');
  const footerButtons = document.querySelector('.letter-footer');
  const originalBtnText = this.innerText;

  // Change text to show it's working
  this.innerText = "⏳ Saving...";

  // 1. Temporarily hide the buttons so they aren't in the picture
  footerButtons.style.opacity = '0';

  // 2. Take the screenshot
  html2canvas(popupElement, {
    scale: 2, // Doubles the resolution so it looks crisp
    useCORS: true, // Crucial: Allows it to capture external images (like Unsplash)
    backgroundColor: '#111216' // Matches your dark background
  }).then(canvas => {
    
    // 3. Create a fake link to trigger the download
    const link = document.createElement('a');
    link.download = 'Happy-Birthday-My-Love.png';
    link.href = canvas.toDataURL('image/png');
    link.click();

    // 4. Bring the buttons back
    footerButtons.style.opacity = '1';
    this.innerText = originalBtnText;
  });
});