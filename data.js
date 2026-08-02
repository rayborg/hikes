"use strict";

const REGION_LABELS = Object.freeze({
  smokies: "Great Smoky Mountains",
  knoxville: "Knoxville Area",
  "cumberland-trail": "Cumberland Trail",
  "big-south-fork": "Big South Fork",
  "cumberland-plateau": "Cumberland Plateau",
  obed: "Obed Wild and Scenic River",
  pisgah: "Pisgah National Forest"
});

const FEATURE_LABELS = Object.freeze({
  waterfall: "Waterfall",
  overlook: "Overlook",
  summit: "Summit",
  arch: "Natural arch",
  gorge: "Gorge",
  lake: "Lake",
  historic: "Historic site",
  "rock-formation": "Rock formation"
});

const SMOKIES_SOURCES = Object.freeze({
  region: "smokies",
  features: Object.freeze(["waterfall"]),
  landManager: "National Park Service, Great Smoky Mountains National Park",
  officialSource: "https://www.nps.gov/grsm/planyourvisit/waterfalls.htm",
  officialSourceLabel: "NPS waterfall guide",
  statusUpdated: "2026-07-31",
  statusSource: "https://www.nps.gov/grsm/planyourvisit/temproadclose.htm",
  mapSource: "https://www.nps.gov/grsm/planyourvisit/maps.htm",
  feeSource: "https://www.nps.gov/grsm/planyourvisit/fees.htm",
  feeNote: "A Smokies parking tag is required when parking longer than 15 minutes.",
  elevationNote: "Planning estimate; actual gain varies by route and measurement method."
});

const NEW_ELEVATION_NOTE = "Planning estimate; actual gain varies by route and measurement method.";
const GRSM_MANAGER = "National Park Service, Great Smoky Mountains National Park";
const BISO_MANAGER = "National Park Service, Big South Fork National River and Recreation Area";
const GRSM_STATUS = "https://www.nps.gov/grsm/planyourvisit/temproadclose.htm";
const GRSM_MAPS = "https://www.nps.gov/grsm/planyourvisit/maps.htm";
const GRSM_FEES = "https://www.nps.gov/grsm/planyourvisit/fees.htm";
const GRSM_FEE_NOTE = "A Smokies parking tag is required when parking longer than 15 minutes.";
const BISO_STATUS = "https://www.nps.gov/biso/planyourvisit/conditions.htm";
const BISO_FEES = "https://www.nps.gov/biso/planyourvisit/fees.htm";
const BISO_FEE_NOTE = "There is no entrance fee; camping fees are separate.";
const TN_PARKS_FEES = "https://tnstateparks.com/about/frequently-asked-questions";
const TN_DAY_FEE_NOTE = "There is no day-use entrance fee.";

window.HIKES_CONFIG = Object.freeze({
  homeOrigin: { lat: 35.96, lon: -83.92, label: "Home origin near Knoxville" },
  regions: REGION_LABELS,
  features: FEATURE_LABELS
});

window.HIKES = Object.freeze([
  {
    ...SMOKIES_SOURCES,
    officialSource: "https://www.nps.gov/thingstodo/hike-ramsey-cascades.htm",
    officialSourceLabel: "Official trail information",
    slug: "ramsey-cascades", rank: 1, name: "Ramsey Cascades", miles: 8.0,
    difficulty: "Strenuous", difficultyOrder: 5, coolness: 10.0, elevation: 2190,
    routeType: "Out-and-back", feature: "The park's tallest waterfall, an approximately 100-foot cascade reached by a demanding mountain trail.",
    parking: "Ramsey Cascades Trailhead Parking", lat: 35.7027153, lon: -83.3577988,
    fallbackMiles: 44.9, fallbackMinutes: 74, status: "open", statusLabel: "Open / recheck",
    advisory: "No closure is listed for this trail, but conditions can change. Recheck the NPS temporary closure page before leaving.",
    access: "Route to the signed Ramsey Cascades trailhead parking area. The final approach is on mountain roads; allow extra time and never block gates.",
    youtube: "https://www.youtube.com/results?search_query=Ramsey+Cascades+trail+Great+Smoky+Mountains",
    photos: [
      ["Ramsey Cascades, July 2015--Andrea Walton (39409902424).jpg", "Great Smoky Mountains National Park/NPS", "Public domain", "Ramsey Cascades in midsummer"],
      ["Ramsey Cascades, June 2017--Andrea Walton (25249409327).jpg", "NPS", "Public domain", "Water descending Ramsey Cascades"]
    ]
  },
  {
    ...SMOKIES_SOURCES,
    officialSource: "https://www.nps.gov/thingstodo/hike-to-rainbow-falls.htm",
    officialSourceLabel: "Official trail information",
    slug: "rainbow-falls", rank: 2, name: "Rainbow Falls", miles: 5.6,
    difficulty: "Moderate-strenuous", difficultyOrder: 4, coolness: 9.5, elevation: 1685,
    routeType: "Out-and-back", feature: "An approximately 80-foot drop whose mist can produce a rainbow on sunny afternoons.",
    parking: "Rainbow Falls/Bull Head Parking A", lat: 35.6757596, lon: -83.4854404,
    fallbackMiles: 41.6, fallbackMinutes: 67, status: "open", statusLabel: "Open / recheck",
    advisory: "No closure is listed for this trail, but conditions can change. Recheck the NPS temporary closure page before leaving.",
    access: "Use the Rainbow Falls/Bull Head parking area on Cherokee Orchard Road. Parking fills early; use only designated spaces.",
    youtube: "https://www.youtube.com/results?search_query=Rainbow+Falls+Trail+Great+Smoky+Mountains",
    photos: [
      ["Rainbow Falls View.jpg", "HAL333", "CC BY-SA 4.0", "Rainbow Falls from the trail"],
      ["Rainbow Falls Trail, Great Smoky Mountain National Park.jpg", "John Manard", "CC BY-SA 2.0", "A view along Rainbow Falls Trail"]
    ]
  },
  {
    ...SMOKIES_SOURCES,
    officialSource: "https://www.nps.gov/thingstodo/hike-to-abrams-falls.htm",
    officialSourceLabel: "Official trail information",
    slug: "abrams-falls", rank: 3, name: "Abrams Falls", miles: 5.0,
    difficulty: "Moderate", difficultyOrder: 3, coolness: 9.2, elevation: 675,
    routeType: "Out-and-back", feature: "A short but exceptionally powerful, high-volume waterfall on Abrams Creek.",
    parking: "Abrams Falls Parking Lot", lat: 35.5911062, lon: -83.8515642,
    fallbackMiles: 47.9, fallbackMinutes: 94, status: "open", statusLabel: "Open / recheck",
    advisory: "No closure is listed for this trail, but Cades Cove access and road schedules can change. Recheck NPS conditions.",
    access: "The trailhead is off the one-way Cades Cove Loop Road. Road closures, vehicle-free days, and heavy traffic can substantially affect arrival time.",
    youtube: "https://www.youtube.com/results?search_query=Abrams+Falls+trail+Cades+Cove",
    photos: [
      ["Abramsfalls.jpg", "Silent melanie", "Public domain", "Abrams Falls and its broad pool"],
      ["Abrams Falls 1 (391634803).jpg", "Chris M Morris", "CC BY 2.0", "High water at Abrams Falls"]
    ]
  },
  {
    ...SMOKIES_SOURCES,
    officialSource: "https://www.nps.gov/thingstodo/hike-to-grotto-falls.htm",
    officialSourceLabel: "Official trail information",
    slug: "grotto-falls", rank: 4, name: "Grotto Falls", miles: 2.6,
    difficulty: "Moderate", difficultyOrder: 3, coolness: 9.0, elevation: 585,
    routeType: "Out-and-back", feature: "The trail passes behind an approximately 25-foot waterfall in a cool, shaded grotto.",
    parking: "Trillium Gap Trail Trailhead", lat: 35.6802594, lon: -83.4626653,
    fallbackMiles: 43.6, fallbackMinutes: 81, status: "caution", statusLabel: "Caution: bear warning",
    advisory: "Trillium Gap Trail currently has a bear warning. Follow posted guidance, carry no exposed food, and check the NPS status page before departure.",
    access: "The Trillium Gap trailhead is on the narrow Roaring Fork Motor Nature Trail, which is one-way and seasonally managed. Park only in designated spaces.",
    youtube: "https://www.youtube.com/results?search_query=Grotto+Falls+trail+Great+Smoky+Mountains",
    photos: [
      ["Grotto-falls-gsmnp1.jpg", "Brian Stansberry", "CC BY 3.0", "The path behind Grotto Falls"],
      ["Behind a frozen Grotto Falls, January 2018--Maggie Blake (39404578334).jpg", "NPS", "Public domain", "Behind frozen Grotto Falls"]
    ]
  },
  {
    ...SMOKIES_SOURCES,
    slug: "spruce-flats-falls", rank: 5, name: "Spruce Flats Falls", miles: 1.8,
    difficulty: "Moderate; rocky", difficultyOrder: 3, coolness: 8.7, elevation: 413,
    routeType: "Out-and-back", feature: "A photogenic, multi-tiered cascade on a short but rocky route near Tremont.",
    parking: "Tremont Falls Trailhead Parking", lat: 35.6396648, lon: -83.6891731,
    fallbackMiles: 37.4, fallbackMinutes: 69, status: "open", statusLabel: "Open / recheck",
    advisory: "No closure is listed for this trail, but conditions can change. Recheck NPS conditions before leaving.",
    access: "Park near the Great Smoky Mountains Institute at Tremont and locate the signed trail access. The route is rougher than its mileage suggests.",
    youtube: "https://www.youtube.com/results?search_query=Spruce+Flats+Falls+trail+Tremont",
    photos: [
      ["15 2018 - Spruce Flats Falls.jpg", "ZachN 0421", "CC BY-SA 4.0", "Tiers of Spruce Flats Falls"],
      ["Spruce Flats Falls.JPG", "Scott Basford", "CC BY-SA 3.0", "Spruce Flats Falls in the forest"]
    ]
  },
  {
    ...SMOKIES_SOURCES,
    slug: "baskins-creek-falls", rank: 6, name: "Baskins Creek Falls", miles: 3.0,
    difficulty: "Moderate-strenuous", difficultyOrder: 4, coolness: 8.5, elevation: 953,
    routeType: "Out-and-back", feature: "A secluded, two-tier waterfall reached by a steep trail that often sees fewer visitors.",
    parking: "Baskins Creek Trail Trailhead", lat: 35.6774456, lon: -83.4785422,
    fallbackMiles: 42.1, fallbackMinutes: 70, status: "open", statusLabel: "Open / recheck",
    advisory: "No closure is listed for this trail, but conditions can change. Recheck NPS conditions before leaving.",
    access: "The trailhead is along the one-way Roaring Fork Motor Nature Trail. Road operating dates and limited roadside parking affect access.",
    youtube: "https://www.youtube.com/results?search_query=Baskins+Creek+Falls+trail",
    photos: [
      ["Baskins Creek Falls, November 2012.jpg", "ZachN 0421", "CC BY-SA 3.0", "Baskins Creek Falls in autumn"],
      ["Baskins Creek Falls.jpg", "Scott Basford", "CC BY-SA 3.0", "The two tiers of Baskins Creek Falls"]
    ]
  },
  {
    ...SMOKIES_SOURCES,
    slug: "deep-creek-loop", rank: 7, name: "Deep Creek Three-Waterfall Loop", miles: 2.4,
    difficulty: "Easy-moderate", difficultyOrder: 2, coolness: 8.3, elevation: 600,
    routeType: "Loop", feature: "One compact loop visiting Toms Branch, Indian Creek, and Juney Whank Falls.",
    parking: "Deep Creek Falls and Trail Parking", lat: 35.4641694, lon: -83.4345139,
    fallbackMiles: 81.9, fallbackMinutes: 145, status: "open", statusLabel: "Open / recheck",
    advisory: "No closure is listed for this trail, but conditions can change. Recheck NPS conditions before leaving.",
    access: "Navigate to the Deep Creek trail parking north of Bryson City. Confirm your loop junctions on an NPS map before starting.",
    youtube: "https://www.youtube.com/results?search_query=Deep+Creek+three+waterfall+loop+Smoky+Mountains",
    photos: [
      ["3 4 Selfie at Toms Branch Falls (0dfa781d-1dd8-b71b-0b1a-e8930ab2bfaa).JPG", "NPS", "Public domain", "Toms Branch Falls"],
      ["3 11 Selfie at Indian Creek Falls (0f6c1450-1dd8-b71b-0b0f-483910dba604).JPG", "NPS", "Public domain", "Indian Creek Falls"]
    ]
  },
  {
    ...SMOKIES_SOURCES,
    slug: "mouse-creek-falls", rank: 8, name: "Mouse Creek Falls", miles: 4.0,
    currentMiles: 5.5, difficulty: "Easy-moderate", difficultyOrder: 2, coolness: 8.1, elevation: 605,
    routeType: "Out-and-back", feature: "A creekside walk to an approximately 45-foot waterfall, with a temporary longer approach currently required.",
    parking: "Temporary Big Creek area parking near ranger/horse camp", lat: 35.7540292, lon: -83.1079909,
    fallbackMiles: 66.3, fallbackMinutes: 85, status: "caution", statusLabel: "Open with access change",
    advisory: "Big Creek Trail is open only for the first two miles to Mouse Creek Falls. Parking near the ranger station adds about 0.75 mile each way, making the hike approximately 5.5 miles currently.",
    access: "Use temporary parking near the Big Creek ranger station/horse camp. Do not attempt to continue beyond the open first two miles of Big Creek Trail.",
    youtube: "https://www.youtube.com/results?search_query=Mouse+Creek+Falls+trail+Big+Creek",
    photos: [
      ["Mouse Creek Falls. Great Smokies National Park (6565283223).jpg", "Frank Kovalchek", "CC BY 2.0", "Mouse Creek Falls in Great Smoky Mountains"],
      ["Mouse creek falls bigcreek.jpg", "Wncoutdoors", "CC BY-SA 3.0", "Mouse Creek Falls beside Big Creek Trail"]
    ]
  },
  {
    ...SMOKIES_SOURCES,
    officialSource: "https://www.nps.gov/thingstodo/hike-to-hen-wallow-falls.htm",
    officialSourceLabel: "Official trail information",
    slug: "hen-wallow-falls", rank: 9, name: "Hen Wallow Falls", miles: 4.3,
    difficulty: "Moderate", difficultyOrder: 3, coolness: 7.8, elevation: 900,
    routeType: "Out-and-back", feature: "A tall, narrow, approximately 90-foot cascade tucked into the Cosby forest.",
    parking: "Gabes Mountain Trail Trailhead", lat: 35.7578331, lon: -83.2096325,
    fallbackMiles: 50.9, fallbackMinutes: 79, status: "open", statusLabel: "Open / recheck",
    advisory: "No closure is listed for this trail, but conditions can change. Recheck NPS conditions before leaving.",
    access: "Start from the Gabes Mountain Trail trailhead in the Cosby area. Follow signs from the hiker parking area and keep campground access clear.",
    youtube: "https://www.youtube.com/results?search_query=Hen+Wallow+Falls+trail+Cosby",
    photos: [
      ["Hen Wallow Falls, June 2017--Andrea Walton (39222610365).jpg", "NPS", "Public domain", "Hen Wallow Falls in summer"],
      ["Hen-wallow-falls-gsmnp1.jpg", "Brian Stansberry", "CC BY 3.0", "The narrow drop at Hen Wallow Falls"]
    ]
  },
  {
    ...SMOKIES_SOURCES,
    officialSource: "https://www.nps.gov/thingstodo/hike-to-laurel-falls.htm",
    officialSourceLabel: "Official trail information",
    slug: "laurel-falls", rank: 10, name: "Laurel Falls", miles: 2.6,
    difficulty: "Easy-moderate", difficultyOrder: 2, coolness: 7.7, elevation: 396,
    routeType: "Out-and-back", feature: "A two-level, approximately 80-foot waterfall on one of the park's best-known routes.",
    parking: "Laurel Falls Parking", lat: 35.6719377, lon: -83.5805250,
    fallbackMiles: 41.5, fallbackMinutes: 67, status: "closed", statusLabel: "Closed for rehabilitation",
    advisory: "Laurel Falls Trail is CLOSED for rehabilitation. Reopening is expected sometime in 2027. Do not enter the closure.",
    access: "The trail and its trailhead facilities are closed during rehabilitation. This destination is retained for planning only; do not navigate there to hike.",
    youtube: "https://www.youtube.com/results?search_query=Laurel+Falls+trail+Great+Smoky+Mountains",
    photos: [
      ["Laurel Falls, July 2017--Andrea Walton (25249428577).jpg", "NPS", "Public domain", "Upper Laurel Falls"],
      ["Lower Laurel Falls, July 2017--Andrea Walton (40088945342).jpg", "NPS", "Public domain", "Lower Laurel Falls"]
    ]
  },
  {
    ...SMOKIES_SOURCES,
    slug: "cataract-falls", rank: 11, name: "Cataract Falls", miles: 1.1,
    difficulty: "Easy", difficultyOrder: 1, coolness: 6.5, elevation: 30,
    routeType: "Out-and-back", feature: "A gentle, short woodland walk to a small waterfall near Sugarlands Visitor Center.",
    parking: "Sugarlands Visitor Center Parking A", lat: 35.6850241, lon: -83.5361898,
    fallbackMiles: 41.2, fallbackMinutes: 60, status: "open", statusLabel: "Open / recheck",
    advisory: "No closure is listed for this trail, but conditions can change. Recheck NPS conditions before leaving.",
    access: "Park at Sugarlands Visitor Center and begin on the nature trail. Visitor center congestion can affect parking availability.",
    youtube: "https://www.youtube.com/results?search_query=Cataract+Falls+Sugarlands+trail",
    photos: [
      ["Cataract Falls, May 2017--Andrea Walton (40088988222).jpg", "NPS", "Public domain", "Cataract Falls in spring"],
      ["Cataract-falls-gsmnp1.jpg", "Brian Stansberry", "CC BY 3.0", "The short drop at Cataract Falls"]
    ]
  },
  {
    region: "smokies", features: ["overlook", "rock-formation"], landManager: GRSM_MANAGER,
    officialSource: "https://www.nps.gov/thingstodo/charlies-bunion-via-appalachian-trail.htm", statusUpdated: "2026-08-02", statusSource: GRSM_STATUS, mapSource: GRSM_MAPS, feeSource: GRSM_FEES, feeNote: GRSM_FEE_NOTE, elevationNote: NEW_ELEVATION_NOTE,
    slug: "charlies-bunion-appalachian-trail", rank: 12, name: "Charlies Bunion via Appalachian Trail", miles: 8.0,
    difficulty: "Strenuous", difficultyOrder: 5, coolness: 9.8, elevation: 1600, routeType: "Out-and-back",
    feature: "An eight-mile Appalachian Trail ridge walk to an exposed rock outcrop with sweeping high-elevation views.",
    parking: "Newfound Gap Overlook parking area", lat: 35.6105725, lon: -83.4259834, fallbackMiles: 54.1, fallbackMinutes: 88.1,
    status: "caution", statusLabel: "No route-specific closure listed; recheck",
    advisory: "No closure appeared on the reviewed list. Expect exposed cliffs, possible ice, and parking congestion; recheck conditions before departure.",
    access: "Park at Newfound Gap Overlook; the Appalachian Trail starts at the left end of the parking area. Consider a shuttle during busy periods.",
    youtube: "https://www.youtube.com/results?search_query=Charlies+Bunion+Appalachian+Trail",
    photos: [
      ["Charlies-bunion-protrusion.jpg", "Brian Stansberry, own work", "CC BY 2.5", "The characteristic rocky protrusion at Charlies Bunion, with hiking packs at its base."],
      ["View from Charlies Bunion - Flickr - pellaea.jpg", "Jason Hollinger, Flickr", "CC BY 2.0", "Mountain ridges viewed from Charlies Bunion in the Great Smoky Mountains."]
    ]
  },
  {
    region: "big-south-fork", features: ["arch", "rock-formation", "historic"], landManager: BISO_MANAGER,
    officialSource: "https://www.nps.gov/biso/planyourvisit/upload/Twin-Arches-Trails-and-Trail-Profile.pdf", officialSourceLabel: "Official trail profile", statusUpdated: "2026-08-02", statusSource: BISO_STATUS, mapSource: "https://www.nps.gov/biso/planyourvisit/upload/Twin-Arches-Trails-and-Trail-Profile.pdf", feeSource: BISO_FEES, feeNote: BISO_FEE_NOTE, elevationNote: NEW_ELEVATION_NOTE,
    slug: "twin-arches-loop", rank: 13, name: "Twin Arches Loop", miles: 4.5,
    difficulty: "Moderate", difficultyOrder: 3, coolness: 9.7, elevation: 750, routeType: "Loop",
    feature: "Two immense sandstone arches, cliff shelters, and a historic homestead landscape on one compact loop.",
    parking: "Twin Arches Trailhead parking area", lat: 36.5444051, lon: -84.7418895, fallbackMiles: 92.3, fallbackMinutes: 149.2,
    status: "caution", statusLabel: "No active alert listed; recheck conditions", advisory: "No active alert was listed on the conditions page during review. The approach is remote and the route includes steep steps; recheck conditions before leaving.",
    access: "Take Divide Road to Twin Arches Road and use the designated lot, which has a public toilet.",
    youtube: "https://www.youtube.com/results?search_query=Twin+Arches+Loop+Big+South+Fork",
    photos: [
      ["North-twin-arch-bsf-tn1.jpg", "Brian Stansberry, own work", "CC BY 3.0", "The north arch at Twin Arches."],
      ["South-twin-arch-bsf-tn1.jpg", "Brian Stansberry, own work", "CC BY 3.0", "The south arch at Twin Arches."]
    ]
  },
  {
    region: "big-south-fork", features: ["waterfall", "overlook", "gorge", "rock-formation"], landManager: BISO_MANAGER,
    officialSource: "https://www.nps.gov/biso/planyourvisit/upload/Hike-5-Honey-Creek-John-Muir-Burnt-Mill-Backcountry-Hiking-Route-18-1_1_10_15.jpg", officialSourceLabel: "Official route map", statusUpdated: "2026-08-02", statusSource: BISO_STATUS, mapSource: "https://www.nps.gov/biso/planyourvisit/upload/Quad-7.pdf", feeSource: BISO_FEES, feeNote: BISO_FEE_NOTE, elevationNote: NEW_ELEVATION_NOTE,
    slug: "honey-creek-loop", rank: 14, name: "Honey Creek Loop", miles: 5.5,
    difficulty: "Strenuous", difficultyOrder: 5, coolness: 9.6, elevation: 1000, routeType: "Loop",
    feature: "A technical gorge loop through cascades, creek crossings, narrow passages, and mossy boulder fields.",
    parking: "Honey Creek Trailhead and Overlook parking area", lat: 36.4213217, lon: -84.6517674, fallbackMiles: 68.9, fallbackMinutes: 112.5,
    status: "caution", statusLabel: "No active alert listed; strenuous remote route", advisory: "No active alert was listed during review. NPS calls this its most challenging trail and recommends allowing at least five hours. Recheck conditions, and avoid high water and freezing conditions.",
    access: "Use the remote Honey Creek trailhead, download the official map in advance, and expect limited cellular signal.",
    youtube: "https://www.youtube.com/results?search_query=Honey+Creek+Loop+Big+South+Fork",
    photos: [
      ["Honey Creek (264157305).jpg", "Chris M Morris, Flickr", "CC BY 2.0", "Leaf-covered rocks along Honey Creek."],
      ["Honey Creek 2 (264157313).jpg", "Chris M Morris, Flickr", "CC BY 2.0", "Moss-covered rocks along Honey Creek."]
    ]
  },
  {
    region: "smokies", features: ["arch", "rock-formation", "overlook"], landManager: GRSM_MANAGER,
    officialSource: "https://www.nps.gov/thingstodo/alum-cave-to-the-bluffs.htm", statusUpdated: "2026-08-02", statusSource: GRSM_STATUS, mapSource: GRSM_MAPS, feeSource: GRSM_FEES, feeNote: GRSM_FEE_NOTE, elevationNote: NEW_ELEVATION_NOTE,
    slug: "alum-cave-bluffs", rank: 15, name: "Alum Cave Bluffs", miles: 4.6,
    difficulty: "Moderate-strenuous", difficultyOrder: 4, coolness: 9.5, elevation: 1125, routeType: "Out-and-back",
    feature: "A feature-dense climb through Arch Rock to an immense inward-curving mountain bluff.",
    parking: "Alum Cave Bluffs Trailhead parking area", lat: 35.6295571, lon: -83.4515814, fallbackMiles: 49.7, fallbackMinutes: 78.9,
    status: "caution", statusLabel: "No route-specific closure listed; recheck", advisory: "No route-specific closure was listed. Parking is limited, and winter ice and falling icicles can create hazards; recheck conditions.",
    access: "Use the designated lots between mile markers 10 and 11. A shuttle is advised during busy periods.",
    youtube: "https://www.youtube.com/results?search_query=Alum+Cave+Bluffs+Trail",
    photos: [
      ["Alum-cave-bluffs-tn1.jpg", "Brian Stansberry, own work", "CC BY 3.0", "Alum Cave Bluffs."],
      ["Arch Rock in the Snow.JPG", "Scott Basford, own work", "CC BY-SA 3.0", "Snowy Arch Rock on the trail."]
    ]
  },
  {
    region: "cumberland-plateau", features: ["waterfall", "gorge", "overlook"], landManager: "Tennessee State Parks, Scott's Gulf Wilderness State Park",
    officialSource: "https://www.tn.gov/environment/natural-areas/what-we-do/sna/cu/virgin-falls.html", statusUpdated: "2026-08-02", statusSource: "https://www.tn.gov/environment/natural-areas/what-we-do/sna/cu/virgin-falls.html", mapSource: "https://www.tn.gov/content/dam/tn/environment/natural-areas/maps/Scotts_Gulf_Wilderness_web_1.png", feeSource: TN_PARKS_FEES, feeNote: "Day hiking is free; overnight use requires a reservation.", elevationNote: NEW_ELEVATION_NOTE,
    slug: "virgin-falls-trail", rank: 16, name: "Virgin Falls Trail", miles: 8.7,
    difficulty: "Strenuous", difficultyOrder: 5, coolness: 9.4, elevation: 1400, routeType: "Out-and-back",
    feature: "A demanding gorge hike to a cave-fed waterfall that emerges and disappears underground.",
    parking: "Virgin Falls Trailhead parking area", lat: 35.8540009, lon: -85.2821763, fallbackMiles: 95.2, fallbackMinutes: 138.1,
    status: "caution", statusLabel: "Full access; strenuous all-day route", advisory: "TDEC states full access and estimates five to nine hours. Do not attempt flood-stage crossings, and observe cave closures.",
    access: "Use the signed lot at 2080 Scotts Gulf Road and start early enough to finish before dark.",
    youtube: "https://www.youtube.com/results?search_query=Virgin+Falls+Trail+Tennessee",
    photos: [
      ["Virgin-falls-tennessee.jpg", "Brian Stansberry, own work", "CC BY 3.0", "The cave-fed stream at Virgin Falls."],
      ["Big-laurel-falls-tennessee.jpg", "Brian Stansberry, own work", "CC BY 3.0", "Big Laurel Falls along the route."]
    ]
  },
  {
    region: "pisgah", features: ["summit", "overlook"], landManager: "USDA Forest Service, Appalachian Ranger District, Pisgah National Forest",
    officialSource: "https://www.fs.usda.gov/r08/northcarolina/recreation/max-patch", statusUpdated: "2026-08-02", statusSource: "https://www.fs.usda.gov/r08/northcarolina/alerts/max-patch-restrictions-appalachian-ranger-district", mapSource: "https://www.fs.usda.gov/media/269767", feeSource: "https://www.fs.usda.gov/r08/northcarolina/recreation/max-patch", feeNote: "No recreation fee is listed for Max Patch.", elevationNote: NEW_ELEVATION_NOTE,
    slug: "max-patch-loop", rank: 17, name: "Max Patch Loop", miles: 1.5,
    difficulty: "Moderate", difficultyOrder: 3, coolness: 9.3, elevation: 300, routeType: "Loop",
    feature: "A short grassy-bald loop with a broad summit and 360-degree Appalachian panoramas.",
    parking: "Max Patch main parking lot", lat: 35.79591632, lon: -82.96249829, fallbackMiles: 77.4, fallbackMinutes: 133.2,
    status: "caution", statusLabel: "Open with active restrictions", advisory: "Camping and fires are prohibited. Visit in daylight, keep groups to 10 or fewer, leash pets, and stay on designated trails.",
    access: "Use the 11-space main lot. Roadside parking is prohibited, and there are no facilities.",
    youtube: "https://www.youtube.com/results?search_query=Max+Patch+Loop+Pisgah",
    photos: [
      ["Pano Max Patch.jpg", "Firehill, own work", "CC BY-SA 4.0", "A wide panorama from the Max Patch summit."],
      ["Appalachian Trail crosses the grassy bald area atop Max Patch Mountain.jpg", "Washedwithblood7, originally English Wikipedia", "Public domain", "The Appalachian Trail crossing the grassy summit."]
    ]
  },
  {
    region: "knoxville", features: ["summit", "overlook", "rock-formation"], landManager: "Knox County Parks and Recreation, cooperatively with TDEC",
    officialSource: "https://www.knoxcounty.org/parks/park_map/locations/HouseMountain/index.php", statusUpdated: "2026-08-02", statusSource: "https://www.tn.gov/environment/natural-areas/what-we-do/sna/rv/house-mountain.html", mapSource: "https://www.tn.gov/content/dam/tn/environment/natural-areas/documents/natural-areas/na_house-mtn.pdf", feeSource: "https://www.knoxcounty.org/parks/park_map/locations/HouseMountain/index.php", feeNote: "No day-use fee is listed by Knox County for House Mountain Park.", elevationNote: NEW_ELEVATION_NOTE,
    slug: "house-mountain-west-overlook", rank: 18, name: "House Mountain West Overlook Loop", miles: 3.2,
    difficulty: "Moderate-strenuous", difficultyOrder: 4, coolness: 9.0, elevation: 950, routeType: "Loop",
    feature: "A steep local ridge loop with rocky overlooks across Knoxville and the Cumberland Plateau.",
    parking: "House Mountain Park parking area", lat: 36.1047648, lon: -83.7627711, fallbackMiles: 16.6, fallbackMinutes: 24.7,
    status: "caution", statusLabel: "Full access; daylight only", advisory: "TDEC lists sunrise-to-sunset access. Expect a steep, rocky trail and allow time to descend before closing.",
    access: "Use the parking area at 9601 Hogskin Road; facilities are available at the park.",
    youtube: "https://www.youtube.com/results?search_query=House+Mountain+West+Overlook+Loop",
    photos: [
      ["House-mountain-summit-tn1.jpg", "Brian Stansberry, own work", "CC BY 3.0", "The wooded summit of House Mountain."],
      ["House-mountain-southwest-tn1.jpg", "Brian Stansberry, own work", "CC BY 3.0", "The view from the west overlook."]
    ]
  },
  {
    region: "smokies", features: ["summit", "overlook"], landManager: GRSM_MANAGER,
    officialSource: "https://www.nps.gov/thingstodo/hike-to-andrews-bald.htm", statusUpdated: "2026-08-02", statusSource: GRSM_STATUS, mapSource: GRSM_MAPS, feeSource: GRSM_FEES, feeNote: GRSM_FEE_NOTE, elevationNote: NEW_ELEVATION_NOTE,
    slug: "andrews-bald-forney-ridge", rank: 19, name: "Andrews Bald via Forney Ridge Trail", miles: 3.6,
    difficulty: "Moderate", difficultyOrder: 3, coolness: 9.0, elevation: 900, routeType: "Out-and-back",
    feature: "A high-elevation forest walk to an open grassy bald known for mountain views and summer blooms.",
    parking: "Kuwohi parking area", lat: 35.5567499, lon: -83.49488, fallbackMiles: 61.1, fallbackMinutes: 115.2,
    status: "caution", statusLabel: "Seasonal road; recheck access", advisory: "Kuwohi Road is scheduled for April 1 through November 29, 2026, but weather and crowding can affect access. Recheck before departure.",
    access: "Use the primary Kuwohi lot. The Forney Ridge trailhead is on the left before the visitor information area.",
    youtube: "https://www.youtube.com/results?search_query=Andrews+Bald+Forney+Ridge+Trail",
    photos: [
      ["Andrews Bald Meadow.JPG", "Scott Basford, own work", "CC BY-SA 3.0", "The meadow at Andrews Bald."],
      ["Forney Ridge Trail at Andrews Bald.JPG", "Scott Basford, own work", "CC BY-SA 3.0", "Forney Ridge Trail arriving at Andrews Bald."]
    ]
  },
  {
    region: "cumberland-trail", features: ["overlook", "rock-formation", "waterfall"], landManager: "Tennessee State Parks, Justin P. Wilson Cumberland Trail State Park",
    officialSource: "https://cumberlandtrail.org/trail-segments/cumberland-mountain-segment/eagle-bluff-section/", statusUpdated: "2026-08-02", statusSource: "https://cumberlandtrail.org/trail-segments/cumberland-mountain-segment/eagle-bluff-section/", mapSource: "https://cumberlandtrail.org/wp-content/uploads/2026/06/section_map_Eagle-Bluff.jpg", feeSource: TN_PARKS_FEES, feeNote: TN_DAY_FEE_NOTE, elevationNote: NEW_ELEVATION_NOTE,
    slug: "devils-racetrack-overlook", rank: 20, name: "Devils Racetrack Overlook from Bruce Gap", miles: 6.6,
    difficulty: "Strenuous", difficultyOrder: 5, coolness: 8.9, elevation: 1600, routeType: "Out-and-back",
    feature: "A rugged Cumberland Trail climb past cascades and tilted sandstone fins to a dramatic valley overlook.",
    parking: "Bruce Gap Road Trailhead parking lot", lat: 36.30318, lon: -84.22273, fallbackMiles: 31.6, fallbackMinutes: 39.8,
    status: "caution", statusLabel: "Overlook usable; closure farther north", advisory: "The overlook remains reachable, but a closure is posted farther north. Turn around at the overlook and do not pass the closure.",
    access: "Use the paved, fenced lot on Old TN 63 and start behind the left side. Do not continue beyond the posted closure.",
    youtube: "https://www.youtube.com/results?search_query=Devils+Racetrack+Overlook+Cumberland+Trail",
    photos: [
      ["Devils-racetrack-south-tn1.jpg", "Brian Stansberry, own work", "CC BY 3.0", "The south view from Devils Racetrack."],
      ["Cross-mountain-from-devils-racetrack-tn1.jpg", "Brian Stansberry, own work", "CC BY 3.0", "Cross Mountain viewed from Devils Racetrack."]
    ]
  },
  {
    region: "obed", features: ["arch", "overlook", "gorge"], landManager: "National Park Service, Obed Wild and Scenic River",
    officialSource: "https://www.nps.gov/obed/planyourvisit/hiking.htm", statusUpdated: "2026-08-02", statusSource: "https://www.nps.gov/obed/planyourvisit/conditions.htm", mapSource: "https://www.nps.gov/obed/planyourvisit/upload/Obed-Trails-Final-508-2.pdf", feeSource: "https://www.nps.gov/obed/planyourvisit/fees.htm", feeNote: "There is no entrance fee for Obed Wild and Scenic River.", elevationNote: NEW_ELEVATION_NOTE,
    slug: "obed-point-trail", rank: 21, name: "Point Trail at Obed", miles: 3.8,
    difficulty: "Moderate-strenuous", difficultyOrder: 4, coolness: 8.8, elevation: 650, routeType: "Out-and-back",
    feature: "A secluded gorge trail linking a seasonal cascade, hidden natural arch, and bluff-top river view.",
    parking: "Lilly Bluff Trails parking area", lat: 36.1024795, lon: -84.717879, fallbackMiles: 56.6, fallbackMinutes: 85.0,
    status: "caution", statusLabel: "No active alert listed; recheck", advisory: "No active alert was listed during review. The route is moderate-strenuous and approaches bluff edges; recheck conditions.",
    access: "Use the Ridge Road parking area and follow signs for Point Trail.",
    youtube: "https://www.youtube.com/results?search_query=Point+Trail+Obed+Wild+Scenic+River",
    photos: [
      ["Aerial views of Obed Wild and Scenic River, Tennessee (16ddbac7-0d44-49b1-9c44-9567697ac289).jpg", "NPS staff, NPGallery", "Public domain", "Regional gorge context for Obed Wild and Scenic River."],
      ["Obed river.jpg", "ChristopherM, transferred from English Wikipedia", "CC BY 2.5", "Regional river context, not the exact Point Trail viewpoint."]
    ]
  },
  {
    region: "cumberland-plateau", features: ["waterfall", "gorge", "rock-formation"], landManager: "Tennessee State Parks, Cumberland Trail State Park, with TDEC Division of Natural Areas",
    officialSource: "https://www.tn.gov/environment/natural-areas/what-we-do/sna/cu/ozone-falls.html", statusUpdated: "2026-08-02", statusSource: "https://www.tn.gov/environment/natural-areas/what-we-do/sna/cu/ozone-falls.html", mapSource: "https://www.tn.gov/content/dam/tn/environment/natural-areas/documents/natural-areas/na_ozone-falls.pdf", feeSource: TN_PARKS_FEES, feeNote: TN_DAY_FEE_NOTE, elevationNote: NEW_ELEVATION_NOTE,
    slug: "ozone-falls-gorge-trail", rank: 22, name: "Ozone Falls Gorge Trail", miles: 1.5,
    difficulty: "Moderate-strenuous", difficultyOrder: 4, coolness: 8.6, elevation: 250, routeType: "Out-and-back",
    feature: "A rugged descent beside a 110-foot plunge waterfall into a sandstone gorge and rockhouse.",
    parking: "Ozone Falls roadside parking area", lat: 35.881559, lon: -84.8101186, fallbackMiles: 56.9, fallbackMinutes: 68.7,
    status: "caution", statusLabel: "Full access; rugged route", advisory: "Access is listed as full from sunrise to sunset. Stay back from cliff edges; rappelling and camping are prohibited.",
    access: "Use designated parking on US 70. The official trail is 0.75 mile one way; backtrack to return.",
    youtube: "https://www.youtube.com/results?search_query=Ozone+Falls+Gorge+Trail",
    photos: [
      ["Ozone-falls-tennessee1.jpg", "Brian Stansberry, own work", "CC BY 3.0", "Ozone Falls viewed from the trail."],
      ["Ozone-falls-tennessee2.jpg", "Brian Stansberry, own work", "CC BY 3.0", "Ozone Falls viewed from its base."]
    ]
  },
  {
    region: "knoxville", features: ["lake", "historic", "rock-formation"], landManager: "Ijams Nature Center",
    officialSource: "https://www.ijams.org/hike", officialSourceLabel: "Ijams hiking guide", statusUpdated: "2026-08-02", statusSource: "https://www.ijams.org/trail-maps-closures", mapSource: "https://www.ijams.org/_files/ugd/3dc05f_ffab070f8367407aa33efdab0f16e5c2.pdf", feeSource: "https://www.ijams.org/hours-directions", feeNote: "Parking is $5 per day; current membership and payment options are listed by Ijams.", elevationNote: NEW_ELEVATION_NOTE,
    slug: "meads-quarry-tharp-trace", rank: 23, name: "Mead's Quarry and Tharp Trace", miles: 3.5,
    difficulty: "Easy-moderate", difficultyOrder: 2, coolness: 8.4, elevation: 300, routeType: "Loop",
    feature: "An urban-wilderness loop around a historic marble quarry, blue-green lake, and wooded overlooks.",
    parking: "Ijams Nature Center main parking lot", lat: 35.9558276, lon: -83.8678098, fallbackMiles: 3.8, fallbackMinutes: 8.5,
    status: "caution", statusLabel: "Grounds open; check closures", advisory: "Grounds are open from 8 a.m. to dusk. River Boardwalk and Toll Creek are closed, but the selected route was not listed as closed; recheck before visiting.",
    access: "Use the main lot at 2915 Island Home Avenue and follow the current official trail map.",
    youtube: "https://www.youtube.com/results?search_query=Meads+Quarry+Tharp+Trace+Ijams",
    photos: [
      ["Mead's Quarry at Ijams Nature Center from Tharp Trace.JPG", "Scott Basford, own work", "CC BY-SA 3.0", "Mead's Quarry from the Tharp Trace overlook."],
      ["Mead's Quarry Lake.jpg", "Kinseikun, own work", "CC BY-SA 4.0", "The lake at Mead's Quarry."]
    ]
  }
]);
