"use strict";

window.HIKES_CONFIG = Object.freeze({
  homeOrigin: { lat: 35.96, lon: -83.92, label: "Home origin near Knoxville" },
  statusUpdated: "2026-07-31",
  statusSource: "https://www.nps.gov/grsm/planyourvisit/temproadclose.htm",
  waterfallSource: "https://www.nps.gov/grsm/planyourvisit/waterfalls.htm",
  mapsSource: "https://www.nps.gov/grsm/planyourvisit/maps.htm",
  feesSource: "https://www.nps.gov/grsm/planyourvisit/fees.htm"
});

window.HIKES = Object.freeze([
  {
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
    slug: "rainbow-falls", rank: 2, name: "Rainbow Falls", miles: 5.4,
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
    slug: "hen-wallow-falls", rank: 9, name: "Hen Wallow Falls", miles: 4.7,
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
  }
]);
