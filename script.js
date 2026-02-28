'use strict';

const TZ_REFERENCE = [
  {
    abbr: "UTC / GMT",
    name: "Coordinated Universal Time / Greenwich Mean Time",
    offset: "UTC+0:00",
    country: "Global / United Kingdom",
    cities: ["London", "Greenwich", "Reykjavik", "Dublin", "Lisbon", "Accra", "Dakar"],
    zone: "UTC"
  },
  {
    abbr: "IST",
    name: "Indian Standard Time",
    offset: "UTC+5:30",
    country: "India",
    cities: ["Kolkata", "New Delhi", "Mumbai", "Bengaluru", "Chennai", "Hyderabad", "Ahmedabad", "Pune", "Jaipur", "Surat", "Lucknow", "Chandigarh"],
    zone: "Asia/Kolkata"
  },
  {
    abbr: "PST / PDT",
    name: "Pacific Time",
    offset: "UTC-8:00 / UTC-7:00",
    country: "United States, Canada & Mexico",
    cities: ["Los Angeles", "San Francisco", "Seattle", "San Jose", "San Diego", "Vancouver", "Tijuana", "Las Vegas", "Portland", "Sacramento"],
    zone: "America/Los_Angeles"
  },
  {
    abbr: "EST / EDT",
    name: "Eastern Time",
    offset: "UTC-5:00 / UTC-4:00",
    country: "United States, Canada & Bahamas",
    cities: ["New York", "Toronto", "Washington D.C.", "Boston", "Miami", "Atlanta", "Philadelphia", "Montreal", "Ottawa", "Detroit", "Cleveland", "Baltimore"],
    zone: "America/New_York"
  },
  {
    abbr: "CST / CDT",
    name: "Central Time (US & Canada)",
    offset: "UTC-6:00 / UTC-5:00",
    country: "United States, Canada & Mexico",
    cities: ["Chicago", "Houston", "Dallas", "Austin", "San Antonio", "Mexico City", "Winnipeg", "Minneapolis", "New Orleans", "St. Louis"],
    zone: "America/Chicago"
  },
  {
    abbr: "MST / MDT",
    name: "Mountain Time",
    offset: "UTC-7:00 / UTC-6:00",
    country: "United States, Canada & Mexico",
    cities: ["Denver", "Phoenix", "Salt Lake City", "Calgary", "Edmonton", "Albuquerque", "El Paso", "Tucson"],
    zone: "America/Denver"
  },
  {
    abbr: "AKST / AKDT",
    name: "Alaska Time",
    offset: "UTC-9:00 / UTC-8:00",
    country: "United States (Alaska)",
    cities: ["Anchorage", "Fairbanks", "Juneau"],
    zone: "America/Anchorage"
  },
  {
    abbr: "HST",
    name: "Hawaii-Aleutian Time",
    offset: "UTC-10:00",
    country: "United States (Hawaii)",
    cities: ["Honolulu", "Hilo", "Kailua"],
    zone: "Pacific/Honolulu"
  },
  {
    abbr: "JST",
    name: "Japan Standard Time",
    offset: "UTC+9:00",
    country: "Japan",
    cities: ["Tokyo", "Osaka", "Yokohama", "Kyoto", "Nagoya", "Sapporo", "Fukuoka", "Kobe"],
    zone: "Asia/Tokyo"
  },
  {
    abbr: "CST (China)",
    name: "China Standard Time",
    offset: "UTC+8:00",
    country: "China",
    cities: ["Beijing", "Shanghai", "Shenzhen", "Guangzhou", "Chengdu", "Wuhan", "Hangzhou", "Xi'an", "Tianjin", "Chongqing"],
    zone: "Asia/Shanghai"
  },
  {
    abbr: "CET / CEST",
    name: "Central European Time",
    offset: "UTC+1:00 / UTC+2:00",
    country: "Germany, France, Italy, Spain, Netherlands & Switzerland",
    cities: ["Berlin", "Paris", "Rome", "Madrid", "Amsterdam", "Zurich", "Vienna", "Brussels", "Munich", "Milan", "Frankfurt", "Barcelona", "Geneva"],
    zone: "Europe/Berlin"
  },
  {
    abbr: "AEST / AEDT",
    name: "Australian Eastern Time",
    offset: "UTC+10:00 / UTC+11:00",
    country: "Australia",
    cities: ["Sydney", "Melbourne", "Brisbane", "Canberra", "Gold Coast", "Hobart"],
    zone: "Australia/Sydney"
  },
  {
    abbr: "ACST / ACDT",
    name: "Australian Central Time",
    offset: "UTC+9:30 / UTC+10:30",
    country: "Australia",
    cities: ["Adelaide", "Darwin", "Alice Springs"],
    zone: "Australia/Adelaide"
  },
  {
    abbr: "AWST",
    name: "Australian Western Time",
    offset: "UTC+8:00",
    country: "Australia",
    cities: ["Perth", "Fremantle"],
    zone: "Australia/Perth"
  },
  {
    abbr: "KST",
    name: "Korea Standard Time",
    offset: "UTC+9:00",
    country: "South Korea",
    cities: ["Seoul", "Busan", "Incheon", "Daegu", "Daejeon"],
    zone: "Asia/Seoul"
  },
  {
    abbr: "SGT",
    name: "Singapore Time",
    offset: "UTC+8:00",
    country: "Singapore",
    cities: ["Singapore", "Jurong", "Woodlands", "Tampines"],
    zone: "Asia/Singapore"
  },
  {
    abbr: "HKT",
    name: "Hong Kong Time",
    offset: "UTC+8:00",
    country: "Hong Kong",
    cities: ["Hong Kong", "Kowloon", "Shatin", "Tuen Mun"],
    zone: "Asia/Hong_Kong"
  },
  {
    abbr: "GST / AST",
    name: "Gulf & Arabian Standard Time",
    offset: "UTC+4:00 / UTC+3:00",
    country: "UAE, Saudi Arabia, Qatar & Kuwait",
    cities: ["Dubai", "Abu Dhabi", "Riyadh", "Jeddah", "Doha", "Kuwait City", "Muscat"],
    zone: "Asia/Dubai"
  },
  {
    abbr: "BRT",
    name: "Brasília Time",
    offset: "UTC-3:00",
    country: "Brazil",
    cities: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador", "Fortaleza", "Belo Horizonte"],
    zone: "America/Sao_Paulo"
  },
  {
    abbr: "EET / EEST",
    name: "Eastern European Time",
    offset: "UTC+2:00 / UTC+3:00",
    country: "Egypt, Greece, Finland, Ukraine & Romania",
    cities: ["Cairo", "Athens", "Helsinki", "Kyiv", "Bucharest", "Istanbul"],
    zone: "Africa/Cairo"
  },
  {
    abbr: "NZST / NZDT",
    name: "New Zealand Time",
    offset: "UTC+12:00 / UTC+13:00",
    country: "New Zealand",
    cities: ["Auckland", "Wellington", "Christchurch", "Hamilton", "Dunedin"],
    zone: "Pacific/Auckland"
  },
  {
    abbr: "SAST",
    name: "South Africa Standard Time",
    offset: "UTC+2:00",
    country: "South Africa",
    cities: ["Johannesburg", "Cape Town", "Durban", "Pretoria"],
    zone: "Africa/Johannesburg"
  },
  {
    abbr: "ART",
    name: "Argentina Time",
    offset: "UTC-3:00",
    country: "Argentina",
    cities: ["Buenos Aires", "Córdoba", "Rosario", "Mendoza"],
    zone: "America/Argentina/Buenos_Aires"
  },
  {
    abbr: "PKT",
    name: "Pakistan Standard Time",
    offset: "UTC+5:00",
    country: "Pakistan",
    cities: ["Karachi", "Lahore", "Islamabad", "Rawalpindi"],
    zone: "Asia/Karachi"
  },
  {
    abbr: "BST (Bangladesh)",
    name: "Bangladesh Standard Time",
    offset: "UTC+6:00",
    country: "Bangladesh",
    cities: ["Dhaka", "Chittagong", "Khulna", "Sylhet"],
    zone: "Asia/Dhaka"
  },
  {
    abbr: "NPT",
    name: "Nepal Time",
    offset: "UTC+5:45",
    country: "Nepal",
    cities: ["Kathmandu", "Pokhara", "Lalitpur"],
    zone: "Asia/Kathmandu"
  },
  {
    abbr: "MSK",
    name: "Moscow Standard Time",
    offset: "UTC+3:00",
    country: "Russia",
    cities: ["Moscow", "Saint Petersburg", "Kazan", "Nizhny Novgorod", "Sochi", "Rostov-on-Don", "Samara"],
    zone: "Europe/Moscow"
  },
  {
    abbr: "YEKT",
    name: "Yekaterinburg Time",
    offset: "UTC+5:00",
    country: "Russia",
    cities: ["Yekaterinburg", "Chelyabinsk", "Ufa", "Tyumen", "Perm"],
    zone: "Asia/Yekaterinburg"
  },
  {
    abbr: "KRAT",
    name: "Krasnoyarsk Time",
    offset: "UTC+7:00",
    country: "Russia",
    cities: ["Novosibirsk", "Krasnoyarsk", "Barnaul", "Tomsk"],
    zone: "Asia/Krasnoyarsk"
  },
  {
    abbr: "VLAT",
    name: "Vladivostok Time",
    offset: "UTC+10:00",
    country: "Russia",
    cities: ["Vladivostok", "Khabarovsk"],
    zone: "Asia/Vladivostok"
  }
];

const THEMES = [
  { group: "Dark", slug: "", name: "Slate (Default)", swatch: ["#0f0f1a","#1a1a2e","#6366f1"] },
  { group: "Dark", slug: "theme-forest-eclipse", name: "Forest Eclipse", swatch: ["#061a16","#0a241d","#4fd6a8"] },
  { group: "Light", slug: "", name: "Cloud (Default)", swatch: ["#f0f4f8","#e2e8f0","#4f46e5"] },
  { group: "Light", slug: "theme-mint-glass", name: "Mint Glass", swatch: ["#eaf7f3","#f4faf7","#0f8a72"] }
];

const DEFAULT_CLOCKS = [
  { zone: "UTC", label: "UTC – Universal Time" },
  { zone: "Etc/GMT", label: "GMT – Greenwich Mean Time" },
  { zone: "America/New_York", label: "New York, Eastern Time" },
  { zone: "America/Los_Angeles", label: "Los Angeles, Pacific Time" },
  { zone: "America/Chicago", label: "Chicago, Central Time" },
  { zone: "America/Denver", label: "Denver, Mountain Time" },
  { zone: "America/Toronto", label: "Toronto, Canada" },
  { zone: "America/Halifax", label: "Halifax, Atlantic Time" },
  { zone: "America/Anchorage", label: "Anchorage, Alaska Time" },
  { zone: "America/Sao_Paulo", label: "São Paulo, Brazil" },
  { zone: "Europe/London", label: "London, UK" },
  { zone: "Europe/Paris", label: "Paris, France" },
  { zone: "Europe/Berlin", label: "Berlin, Germany" },
  { zone: "Europe/Amsterdam", label: "Amsterdam, Netherlands" },
  { zone: "Europe/Zurich", label: "Zurich, Switzerland" },
  { zone: "Europe/Moscow", label: "Moscow, Russia" },
  { zone: "Asia/Dubai", label: "Dubai, UAE" },
  { zone: "Asia/Kolkata", label: "Kolkata, India" },
  { zone: "Asia/Shanghai", label: "Shanghai, China" },
  { zone: "Asia/Tokyo", label: "Tokyo, Japan" },
  { zone: "Asia/Seoul", label: "Seoul, South Korea" },
  { zone: "Asia/Singapore", label: "Singapore" },
  { zone: "Asia/Hong_Kong", label: "Hong Kong" },
  { zone: "Australia/Sydney", label: "Sydney, Australia" },
  { zone: "Australia/Adelaide", label: "Adelaide, Australian Central Time" },
  { zone: "Australia/Perth", label: "Perth, Australian Western Time" },
  { zone: "Pacific/Auckland", label: "Auckland, New Zealand" },
  { zone: "Africa/Cairo", label: "Cairo, Egypt" },
  { zone: "Africa/Johannesburg", label: "Johannesburg, South Africa" },
  { zone: "Pacific/Honolulu", label: "Honolulu, Hawaii" },
  { zone: "America/Argentina/Buenos_Aires", label: "Buenos Aires, Argentina" },
  { zone: "Asia/Karachi", label: "Karachi, Pakistan" },
  { zone: "Asia/Dhaka", label: "Dhaka, Bangladesh" },
  { zone: "Asia/Kathmandu", label: "Kathmandu, Nepal" }
];

const ZONE_ALIASES = {
  "Asia/Kolkata": ["kolkata","calcutta","india","ist","indian standard time","new delhi","delhi","mumbai","bengaluru","bangalore","chennai","hyderabad","ahmedabad","pune","jaipur","surat","lucknow","chandigarh"],
  "Asia/Calcutta": ["kolkata","calcutta","india","ist","indian standard time","new delhi","delhi","mumbai","bengaluru","bangalore","chennai","hyderabad","ahmedabad","pune","jaipur","surat","lucknow","chandigarh"],
  "Etc/UTC": ["utc","gmt","zulu","z","universal","greenwich"],
  "UTC": ["utc","gmt","zulu","z","universal","greenwich"],
  "America/New_York": ["new york","nyc","eastern","eastern time","est","edt","new york city","washington d.c.","washington","boston","miami","atlanta","philadelphia","montreal","ottawa","detroit","cleveland","baltimore"],
  "America/Los_Angeles": ["los angeles","la","pacific","pacific time","pst","pdt","california","san francisco","seattle","san jose","san diego","vancouver","tijuana","las vegas","portland","sacramento"],
  "America/Chicago": ["chicago","central","central time","cst","cdt","texas","houston","dallas","austin","san antonio","mexico city","winnipeg","minneapolis","new orleans","st. louis"],
  "America/Denver": ["denver","mountain","mountain time","mst","mdt","colorado","salt lake city","calgary","edmonton","albuquerque","el paso","tucson"],
  "America/Halifax": ["halifax","atlantic","atlantic time","ast","adt","nova scotia"],
  "America/Phoenix": ["phoenix","arizona","mst no dst"],
  "America/Anchorage": ["anchorage","alaska","alaska time","akst","akdt","fairbanks","juneau"],
  "Pacific/Honolulu": ["honolulu","hawaii","hst","hawaii time","hilo","kailua"],
  "Europe/London": ["london","uk","united kingdom","england","bst","british","great britain","greenwich","reykjavik","dublin","lisbon"],
  "Europe/Paris": ["paris","france","cet","cest","marseille","lyon"],
  "Europe/Berlin": ["berlin","germany","deutschland","cet","cest","munich","frankfurt"],
  "Europe/Moscow": ["moscow","russia","msk"],
  "Asia/Dubai": ["dubai","uae","united arab emirates","gst","ast","abu dhabi","riyadh","jeddah","doha","kuwait city","muscat"],
  "Asia/Shanghai": ["shanghai","china","beijing","cst china","cst","chinese","shenzhen","guangzhou","chengdu","wuhan","hangzhou","xi'an","tianjin","chongqing"],
  "Asia/Tokyo": ["tokyo","japan","jst","osaka","yokohama","kyoto","nagoya","sapporo","fukuoka","kobe"],
  "Asia/Singapore": ["singapore","sgt","jurong","woodlands","tampines"],
  "Asia/Hong_Kong": ["hong kong","hkt","kowloon","shatin","tuen mun"],
  "Asia/Seoul": ["seoul","korea","kst","south korea","busan","incheon","daegu","daejeon"],
  "Australia/Sydney": ["sydney","australia","aest","aedt","melbourne","brisbane","canberra","gold coast","hobart"],
  "Australia/Adelaide": ["adelaide","australian central time","acst","acdt","darwin","alice springs"],
  "Australia/Perth": ["perth","australian western time","awst","fremantle"],
  "Pacific/Auckland": ["auckland","new zealand","nzst","nzdt","wellington","christchurch","hamilton","dunedin"],
  "Africa/Cairo": ["cairo","egypt","eet","eest","athens","helsinki","kyiv","bucharest","istanbul"],
  "Africa/Johannesburg": ["johannesburg","south africa","sa","sast","cape town","durban","pretoria"],
  "America/Mexico_City": ["mexico city","mexico"],
  "America/Toronto": ["toronto","canada","ontario"],
  "America/Vancouver": ["vancouver","british columbia","bc"],
  "Asia/Bangkok": ["bangkok","thailand","ict"],
  "Asia/Jakarta": ["jakarta","indonesia","wib"],
  "Asia/Karachi": ["karachi","pakistan","pkt","lahore","islamabad","rawalpindi"],
  "Asia/Manila": ["manila","philippines","pht"],
  "Asia/Kathmandu": ["kathmandu","nepal","npt","pokhara","lalitpur"],
  "Asia/Yangon": ["yangon","myanmar","burma","rangoon"],
  "Asia/Tehran": ["tehran","iran","irst"],
  "Asia/Baghdad": ["baghdad","iraq"],
  "Asia/Kuwait": ["kuwait"],
  "Asia/Riyadh": ["riyadh","saudi arabia","ksa"],
  "Asia/Dhaka": ["dhaka","bangladesh","bst bangladesh","bst","chittagong","khulna","sylhet"],
  "Pacific/Fiji": ["fiji"],
  "Pacific/Tahiti": ["tahiti","french polynesia"],
  "Pacific/Guam": ["guam","chamorro"],
  "Pacific/Samoa": ["samoa"],
  "Pacific/Tongatapu": ["tonga"],
  "Atlantic/Azores": ["azores"],
  "Atlantic/Cape_Verde": ["cape verde"],
  "America/Argentina/Buenos_Aires": ["buenos aires","argentina","art","córdoba","rosario","mendoza"],
  "America/Santiago": ["santiago","chile"],
  "America/Lima": ["lima","peru"],
  "America/Bogota": ["bogota","colombia"],
  "Europe/Rome": ["rome","italy"],
  "Europe/Madrid": ["madrid","spain"],
  "Europe/Amsterdam": ["amsterdam","netherlands","holland"],
  "Europe/Stockholm": ["stockholm","sweden"],
  "Europe/Zurich": ["zurich","switzerland"],
  "Europe/Istanbul": ["istanbul","turkey"],
  "Europe/Athens": ["athens","greece"],
  "Africa/Lagos": ["lagos","nigeria"],
  "Africa/Nairobi": ["nairobi","kenya"],
  "Africa/Casablanca": ["casablanca","morocco"],
  "Pacific/Easter": ["easter island","rapa nui"],
  "America/St_Johns": ["st johns","newfoundland","nst","ndt"]
};

function zoneSupported(zone) {
  try {
    Intl.DateTimeFormat("en-US", { timeZone: zone, hour: "numeric" }).format(new Date());
    return true;
  } catch (e) {
    return false;
  }
}

function resolveZone(zone) {
  if (zone === "Asia/Calcutta") return zoneSupported("Asia/Kolkata") ? "Asia/Kolkata" : "Asia/Calcutta";
  if (zone === "Asia/Kolkata") return zoneSupported("Asia/Kolkata") ? "Asia/Kolkata" : "Asia/Calcutta";
  if (zone === "Etc/UTC") return zoneSupported("UTC") ? "UTC" : "Etc/UTC";
  if (zone === "UTC") return zoneSupported("UTC") ? "UTC" : "Etc/UTC";
  if (zone === "Etc/GMT") return zoneSupported("Etc/GMT") ? "Etc/GMT" : (zoneSupported("GMT") ? "GMT" : "UTC");
  if (zone === "GMT") return zoneSupported("GMT") ? "GMT" : (zoneSupported("Etc/GMT") ? "Etc/GMT" : "UTC");
  return zone;
}

function getAvailableTimezones() {
  if (typeof Intl !== "undefined" && Intl.supportedValuesOf) {
    try {
      return Intl.supportedValuesOf("timeZone");
    } catch (e) {}
  }
  var fallback = [];
  for (var i = 0; i < DEFAULT_CLOCKS.length; i++) {
    var z = resolveZone(DEFAULT_CLOCKS[i].zone);
    if (fallback.indexOf(z) === -1) fallback.push(z);
  }
  return fallback;
}

function buildSearchTerms(zone) {
  var terms = [];
  var parts = zone.split("/");
  for (var i = 0; i < parts.length; i++) {
    var part = parts[i];
    part = part.replace(/_/g, " ").toLowerCase().trim();
    var subParts = part.split(" ");
    for (var j = 0; j < subParts.length; j++) {
      var t = subParts[j].trim();
      if (t.length > 0) terms.push(t);
    }
  }
  if (parts.length >= 2 && parts[0] === "Pacific" && parts[1] === "Easter") {
    terms = ["easter island"];
  }
  if (ZONE_ALIASES[zone]) {
    for (var k = 0; k < ZONE_ALIASES[zone].length; k++) {
      var alias = ZONE_ALIASES[zone][k].toLowerCase().trim();
      if (terms.indexOf(alias) === -1) terms.push(alias);
    }
  }
  return terms;
}

function getZoneLabel(zone) {
  var resolved = resolveZone(zone);
  for (var r = 0; r < TZ_REFERENCE.length; r++) {
    var ref = TZ_REFERENCE[r];
    if (ref.zone && resolveZone(ref.zone) === resolved) {
      return ref.abbr + " – " + ref.name;
    }
  }
  for (var i = 0; i < DEFAULT_CLOCKS.length; i++) {
    if (DEFAULT_CLOCKS[i].zone === zone || DEFAULT_CLOCKS[i].zone === resolved) {
      return DEFAULT_CLOCKS[i].label;
    }
    if (resolveZone(DEFAULT_CLOCKS[i].zone) === resolved) {
      return DEFAULT_CLOCKS[i].label;
    }
  }
  var parts = zone.split("/");
  var city = parts[parts.length - 1].replace(/_/g, " ");
  return city;
}

function getDisplayLabelForInput(inputEl, zone) {
  var val = (inputEl ? inputEl.value : "").trim();
  var resolved = resolveZone(zone);
  var refEntry = null;

  for (var i = 0; i < TZ_REFERENCE.length; i++) {
    if (TZ_REFERENCE[i].zone && resolveZone(TZ_REFERENCE[i].zone) === resolved) {
      refEntry = TZ_REFERENCE[i];
      break;
    }
  }

  if (refEntry) {
    return refEntry.abbr + " (" + refEntry.name + ")";
  }
  return val || getZoneLabel(zone);
}

var tzFamilyBoost = function(zone) {
  var lower = zone.toLowerCase();
  var aliases = ZONE_ALIASES[zone] || [];
  for (var i = 0; i < aliases.length; i++) {
    var a = aliases[i];;
    if (a === "eastern" || a === "eastern time" || a === "est" || a === "edt") return 30;
    if (a === "pacific" || a === "pacific time" || a === "pst" || a === "pdt") return 30;
    if (a === "central" || a === "central time" || a === "cst" || a === "cdt") return 30;
    if (a === "mountain" || a === "mountain time" || a === "mst" || a === "mdt") return 30;
    if (a === "atlantic" || a === "atlantic time" || a === "ast" || a === "adt") return 30;
  }
  return 0;
};

function hideDropdown(el) {
  if (!el) return;
  el.innerHTML = "";
  el.classList.add("hidden");
}

function showEl(el) {
  if (!el) return;
  el.classList.remove("hidden");
}

function hideEl(el) {
  if (!el) return;
  el.classList.add("hidden");
}

function renderDropdown(resultsEl, results, onSelect, opts) {
  if (!resultsEl) return;
  resultsEl.innerHTML = "";
  if (!results || results.length === 0) {
    hideEl(resultsEl);
    return;
  }
  var frag = document.createDocumentFragment();
  var hasTimeColumn = opts && opts.showTime;
  for (var i = 0; i < results.length; i++) {
    var item = results[i];
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "search-result-item";
    if (item.alreadyAdded) btn.className += " already-added";
    btn.setAttribute("role", "option");
    var labelSpan = document.createElement("span");
    labelSpan.className = "result-label";
    labelSpan.textContent = item.alreadyAdded ? item.label + " ✓" : item.label;
    btn.appendChild(labelSpan);
    if (hasTimeColumn) {
      var timeSpan = document.createElement("span");
      timeSpan.className = "result-time";
      timeSpan.textContent = item.time || "";
      btn.appendChild(timeSpan);
    }
    (function(zone) {
      function handleSelect(e) {
        e.preventDefault();
        e.stopPropagation();
        onSelect(zone);
        hideDropdown(resultsEl);
      }
      btn.addEventListener("mousedown", handleSelect);
      btn.addEventListener("touchend", handleSelect);
      btn.addEventListener("pointerdown", handleSelect);
    })(item.zone);
    frag.appendChild(btn);
  }
  resultsEl.appendChild(frag);
  showEl(resultsEl);
}

function scoreMatch(zone, terms, queryLower) {
  var score = 0;
  var aliases = ZONE_ALIASES[zone] || [];
  for (var i = 0; i < aliases.length; i++) {
    if (aliases[i].toLowerCase() === queryLower) { score = Math.max(score, 100); break; }
    if (aliases[i].toLowerCase().indexOf(queryLower) === 0) score = Math.max(score, 80);
    if (aliases[i].toLowerCase().indexOf(queryLower) !== -1) score = Math.max(score, 50);
  }
  var label = getZoneLabel(zone).toLowerCase();
  if (label === queryLower) score = Math.max(score, 95);
  if (label.indexOf(queryLower) === 0) score = Math.max(score, 75);
  if (label.indexOf(queryLower) !== -1) score = Math.max(score, 45);
  var zoneLower = zone.replace(/_/g, " ").toLowerCase();
  var zoneParts = zoneLower.split("/");
  for (var j = 0; j < zoneParts.length; j++) {
    if (zoneParts[j].trim() === queryLower) score = Math.max(score, 90);
    if (zoneParts[j].trim().indexOf(queryLower) === 0) score = Math.max(score, 70);
    if (zoneParts[j].trim().indexOf(queryLower) !== -1) score = Math.max(score, 40);
  }
  if (score < 70) {
    var allHit = true;
    for (var k = 0; k < terms.length; k++) {
      var found = false;
      for (var m = 0; m < aliases.length; m++) {
        if (aliases[m].toLowerCase().indexOf(terms[k]) !== -1) { found = true; break; }
      }
      if (!found) { allHit = false; break; }
    }
    if (allHit && terms.length > 0) score = Math.max(score, 70);
  }
  score += tzFamilyBoost(zone);
  return score;
}

function searchTimezones(query) {
  var q = query.toLowerCase().trim();
  if (!q) return [];
  var terms = q.split(/\s+/).filter(function(t) { return t.length > 0; });
  var all = getAvailableTimezones();
  var results = [];
  for (var i = 0; i < all.length; i++) {
    var zone = all[i];
    var score = scoreMatch(zone, terms, q);
    if (score > 0) {
      results.push({ zone: zone, label: getZoneLabel(zone), score: score });
    }
  }
  results.sort(function(a, b) { return b.score - a.score; });
  return results.slice(0, 20);
}

function formatTime(date, zone) {
  try {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: zone, hour: "numeric", minute: "2-digit", hour12: true
    }).format(date);
  } catch (e) {
    return "--:--";
  }
}

function formatDateDisplay(date, zone) {
  try {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: zone,
      weekday: "long", year: "numeric", month: "long", day: "numeric"
    }).format(date);
  } catch (e) {
    return "--";
  }
}

function getUTCOffset(date, zone) {
  try {
    var parts = new Intl.DateTimeFormat("en-US", {
      timeZone: zone, timeZoneName: "shortOffset", hour: "numeric", minute: "2-digit"
    }).formatToParts(date);
    for (var i = 0; i < parts.length; i++) {
      if (parts[i].type === "timeZoneName") {
        var v = parts[i].value || "";
        if (v.indexOf("GMT") === 0) return v.replace("GMT", "UTC");
        if (v.indexOf("UTC") === 0) return v;
        return "UTC" + v;
      }
    }
  } catch (e) {}
  return "";
}

function getAbbreviationForZone(date, zone) {
  var resolved = resolveZone(zone);
  var knownMap = {
    "Asia/Kolkata": "IST",
    "Asia/Calcutta": "IST",
    "Asia/Tokyo": "JST",
    "America/Los_Angeles": "PST/PDT",
    "America/New_York": "EST/EDT",
    "America/Chicago": "CST/CDT",
    "America/Denver": "MST/MDT",
    "America/Anchorage": "AKST/AKDT",
    "Pacific/Honolulu": "HST",
    "Europe/Berlin": "CET/CEST",
    "Europe/Paris": "CET/CEST",
    "Europe/London": "GMT/BST",
    "Europe/Amsterdam": "CET/CEST",
    "Europe/Zurich": "CET/CEST",
    "Australia/Sydney": "AEST/AEDT",
    "Australia/Adelaide": "ACST/ACDT",
    "Australia/Perth": "AWST",
    "Asia/Seoul": "KST",
    "Asia/Singapore": "SGT",
    "Asia/Hong_Kong": "HKT",
    "Asia/Dubai": "GST",
    "America/Sao_Paulo": "BRT",
    "Africa/Cairo": "EET/EEST",
    "Pacific/Auckland": "NZST/NZDT",
    "Africa/Johannesburg": "SAST",
    "America/Argentina/Buenos_Aires": "ART",
    "Asia/Karachi": "PKT",
    "Asia/Dhaka": "BST",
    "Asia/Kathmandu": "NPT",
    "UTC": "UTC",
    "Etc/UTC": "UTC",
    "Etc/GMT": "GMT",
    "GMT": "GMT",
    "Asia/Shanghai": "CST",
    "Europe/Moscow": "MSK",
    "Asia/Yekaterinburg": "YEKT",
    "Asia/Krasnoyarsk": "KRAT",
    "Asia/Vladivostok": "VLAT"
  };

  try {
    var parts = new Intl.DateTimeFormat("en-US", {
      timeZone: resolved, timeZoneName: "short"
    }).formatToParts(date);
    for (var i = 0; i < parts.length; i++) {
      if (parts[i].type === "timeZoneName") {
        var val = parts[i].value || "";
        if (val && val.indexOf("GMT") !== 0 && val.indexOf("UTC") !== 0 && val.indexOf("+") === -1 && val.indexOf("-") === -1) {
          return val;
        }
      }
    }
  } catch (e) {}

  if (knownMap[resolved]) return knownMap[resolved];
  if (knownMap[zone]) return knownMap[zone];

  return "";
}

function updateClockDisplays() {
  var now = new Date();
  var cards = document.querySelectorAll(".clock");
  for (var i = 0; i < cards.length; i++) {
    var card = cards[i];
    var zone = card.getAttribute("data-zone");
    if (!zone) continue;
    var timeEl = card.querySelector(".time-display");
    var dateEl = card.querySelector(".zone-date");
    var offsetEl = card.querySelector(".zone-offset");
    var abbrEl = card.querySelector(".zone-abbr");

    if (timeEl) timeEl.textContent = formatTime(now, zone);
    if (dateEl) dateEl.textContent = formatDateDisplay(now, zone);
    if (offsetEl) offsetEl.textContent = getUTCOffset(now, zone);

    var abbrText = getAbbreviationForZone(now, zone);
    if (abbrEl) {
      if (abbrText) {
        abbrEl.textContent = abbrText;
        abbrEl.style.display = "inline-block";
      } else {
        abbrEl.style.display = "none";
      }
    }
  }
}

function loadUserClocks() {
  try {
    var raw = localStorage.getItem("zonetimes-user-clocks");
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return [];
}

function saveUserClocks(clocks) {
  try {
    localStorage.setItem("zonetimes-user-clocks", JSON.stringify(clocks));
  } catch (e) {}
}

function getUserClocks() {
  return loadUserClocks().filter(function(c) { return zoneSupported(c.zone); });
}

function addUserClock(zone, label) {
  var clocks = loadUserClocks();
  var exists = clocks.some(function(c) { return c.zone === zone || resolveZone(c.zone) === resolveZone(zone); });
  if (exists) return false;
  clocks.push({ zone: zone, label: label });
  saveUserClocks(clocks);
  return true;
}

function removeUserClock(zone) {
  var clocks = loadUserClocks();
  clocks = clocks.filter(function(c) { return c.zone !== zone && resolveZone(c.zone) !== resolveZone(zone); });
  saveUserClocks(clocks);
}

function isUserClock(zone) {
  var clocks = loadUserClocks();
  return clocks.some(function(c) { return c.zone === zone || resolveZone(c.zone) === resolveZone(zone); });
}

function isDefaultClock(zone) {
  return DEFAULT_CLOCKS.some(function(d) { return resolveZone(d.zone) === resolveZone(zone); });
}

function createClockCard(zone, label, isUser) {
  var card = document.createElement("div");
  card.className = "clock";
  card.setAttribute("data-zone", zone);

  if (isUser) {
    var removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "remove-btn";
    removeBtn.textContent = "\u00d7";
    removeBtn.setAttribute("aria-label", "Remove clock");
    removeBtn.addEventListener("click", function(e) {
      e.stopPropagation();
      removeUserClock(zone);
      card.remove();
    });
    card.appendChild(removeBtn);
  }

  var timeEl = document.createElement("div");
  timeEl.className = "time-display";
  timeEl.textContent = "--:--";

  var labelDiv = document.createElement("div");
  labelDiv.className = "zone-label";
  labelDiv.textContent = label;

  var dateEl = document.createElement("div");
  dateEl.className = "zone-date";
  dateEl.textContent = "--";

  var metaDiv = document.createElement("div");
  metaDiv.className = "zone-meta";

  var abbrSpan = document.createElement("span");
  abbrSpan.className = "zone-abbr";
  abbrSpan.textContent = "";

  var offsetSpan = document.createElement("span");
  offsetSpan.className = "zone-offset";
  offsetSpan.textContent = "";

  metaDiv.appendChild(abbrSpan);
  metaDiv.appendChild(offsetSpan);

  card.appendChild(timeEl);
  card.appendChild(labelDiv);
  card.appendChild(dateEl);
  card.appendChild(metaDiv);

  return card;
}

function getLocalTimeZone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "";
  } catch (e) {
    return "";
  }
}

function renderClocks() {
  var container = document.getElementById("clockContainer");
  if (!container) return;
  container.innerHTML = "";
  var defaultAdded = [];

  // 1. Hero Card: Your Local Time (always Card 1)
  var localZone = resolveZone(getLocalTimeZone());
  if (localZone && zoneSupported(localZone)) {
    var localLabel = "Your Local Time (" + getZoneLabel(localZone) + ")";
    var localCard = createClockCard(localZone, localLabel, false);
    localCard.classList.add("local-clock");
    container.appendChild(localCard);
  }

  // 2. Mandatory Top Clocks: UTC & GMT placed immediately after Local Time (Cards 2 & 3)
  var topClocks = [
    { zone: "UTC", label: "UTC – Universal Time" },
    { zone: "Etc/GMT", label: "GMT – Greenwich Mean Time" }
  ];

  for (var k = 0; k < topClocks.length; k++) {
    var tz = resolveZone(topClocks[k].zone);
    if (zoneSupported(tz) && defaultAdded.indexOf(tz) === -1) {
      defaultAdded.push(tz);
      container.appendChild(createClockCard(tz, topClocks[k].label, false));
    }
  }

  // 3. Remaining Default Global Clocks
  for (var i = 0; i < DEFAULT_CLOCKS.length; i++) {
    var dc = DEFAULT_CLOCKS[i];
    var zone = resolveZone(dc.zone);
    if (zone === "UTC" || zone === "Etc/GMT") continue;
    if (zoneSupported(zone) && defaultAdded.indexOf(zone) === -1) {
      defaultAdded.push(zone);
      container.appendChild(createClockCard(zone, dc.label, false));
    }
  }

  var userClocks = getUserClocks();
  for (var j = 0; j < userClocks.length; j++) {
    var uc = userClocks[j];
    var uz = resolveZone(uc.zone);
    if (zoneSupported(uz) && defaultAdded.indexOf(uz) === -1) {
      defaultAdded.push(uz);
      var card = createClockCard(uz, uc.label, true);
      card.classList.add("highlight");
      container.appendChild(card);
      setTimeout((function(c) {
        return function() { if (c) c.classList.remove("highlight"); };
      })(card), 1500);
    }
  }

  updateClockDisplays();
}

function clearThemeClasses(keepLight) {
  var body = document.body;
  var keep = [];
  var parts = body.className.split(/\s+/);
  for (var i = 0; i < parts.length; i++) {
    var c = parts[i];
    if (!c) continue;
    if (c.indexOf("theme-") === 0) continue;
    if (c === "light" && !keepLight) continue;
    keep.push(c);
  }
  body.className = keep.join(" ");
}

function setThemeMode(mode) {
  localStorage.setItem("zonetimes-theme-mode", mode);
  var isLight = mode === "light";
  clearThemeClasses(isLight);
  if (isLight) {
    document.body.classList.add("light");
    var lt = localStorage.getItem("zonetimes-light-theme") || "";
    if (lt) document.body.classList.add(lt);
  } else {
    var dt = localStorage.getItem("zonetimes-dark-theme") || "";
    if (dt) document.body.classList.add(dt);
  }
  updateThemePanel();
  updateThemeToggleIcon();
}

function setTheme(slug, group) {
  var mode = (group || "").toLowerCase() === "light" ? "light" : "dark";
  localStorage.setItem("zonetimes-theme-mode", mode);
  if (mode === "light") {
    localStorage.setItem("zonetimes-light-theme", slug || "");
  } else {
    localStorage.setItem("zonetimes-dark-theme", slug || "");
  }
  clearThemeClasses(mode === "light");
  if (mode === "light") document.body.classList.add("light");
  if (slug) document.body.classList.add(slug);
  updateThemePanel();
  updateThemeToggleIcon();
}

function initTheme() {
  var mode = localStorage.getItem("zonetimes-theme-mode") || "dark";
  setThemeMode(mode);
}

function updateThemePanel() {
  var panel = document.getElementById("themeSwitcherPanel");
  if (!panel) return;

  var body = document.body;
  var mode = body.classList.contains("light") ? "light" : "dark";
  var currentSlug = "";
  var allClasses = body.className.split(/\s+/);
  for (var i = 0; i < allClasses.length; i++) {
    if (allClasses[i].indexOf("theme-") === 0) {
      currentSlug = allClasses[i];
      break;
    }
  }

  panel.innerHTML = "";

  var groups = {};
  for (var g = 0; g < THEMES.length; g++) {
    var t = THEMES[g];
    if (!groups[t.group]) groups[t.group] = [];
    groups[t.group].push(t);
  }

  var groupNames = Object.keys(groups);
  for (var gi = 0; gi < groupNames.length; gi++) {
    var gn = groupNames[gi];
    var groupLabel = document.createElement("div");
    groupLabel.className = "theme-group-label";
    groupLabel.textContent = gn;
    panel.appendChild(groupLabel);

    var items = groups[gn];
    for (var ti = 0; ti < items.length; ti++) {
      var theme = items[ti];
      var isActive = (currentSlug === theme.slug) && (mode === gn.toLowerCase());

      var row = document.createElement("button");
      row.type = "button";
      row.className = "theme-option" + (isActive ? " active" : "");

      var swatches = document.createElement("span");
      swatches.className = "theme-swatch";
      swatches.setAttribute("aria-hidden", "true");
      for (var si = 0; si < theme.swatch.length; si++) {
        var dot = document.createElement("span");
        dot.style.backgroundColor = theme.swatch[si];
        swatches.appendChild(dot);
      }

      var nameSpan = document.createElement("span");
      nameSpan.className = "theme-option-name";
      nameSpan.textContent = theme.name;

      row.appendChild(swatches);
      row.appendChild(nameSpan);

      (function(slug, group) {
        function selectThemeHandler(e) {
          e.preventDefault();
          setTheme(slug, group);
        }
        row.addEventListener("mousedown", selectThemeHandler);
        row.addEventListener("touchend", selectThemeHandler);
        row.addEventListener("pointerdown", selectThemeHandler);
      })(theme.slug, theme.group);

      panel.appendChild(row);
    }
  }
}

function buildThemeSwitcherPanel() {
  var panel = document.getElementById("themeSwitcherPanel");
  if (!panel) return;
  updateThemePanel();
}

function parseDateDMY(value) {
  if (!value) return { valid: false, iso: null, day: null, month: null, year: null };
  var str = value.trim().replace(/[/.\s]/g, "-");

  var match = str.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
  if (match) {
    var d = parseInt(match[1], 10);
    var m = parseInt(match[2], 10);
    var y = parseInt(match[3], 10);
    if (m >= 1 && m <= 12 && d >= 1 && d <= 31 && y >= 1900 && y <= 2100) {
      return {
        valid: true,
        iso: y + "-" + String(m).padStart(2, "0") + "-" + String(d).padStart(2, "0"),
        day: d, month: m, year: y
      };
    }
  }

  var alt = str.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (alt) {
    var dAlt = parseInt(alt[3], 10);
    var mAlt = parseInt(alt[2], 10);
    var yAlt = parseInt(alt[1], 10);
    if (mAlt >= 1 && mAlt <= 12 && dAlt >= 1 && dAlt <= 31 && yAlt >= 1900 && yAlt <= 2100) {
      return {
        valid: true,
        iso: yAlt + "-" + String(mAlt).padStart(2, "0") + "-" + String(dAlt).padStart(2, "0"),
        day: dAlt, month: mAlt, year: yAlt
      };
    }
  }

  var rawDigits = value.replace(/\D/g, "");
  if (rawDigits.length === 8) {
    var dRaw = parseInt(rawDigits.slice(0, 2), 10);
    var mRaw = parseInt(rawDigits.slice(2, 4), 10);
    var yRaw = parseInt(rawDigits.slice(4, 8), 10);
    if (mRaw >= 1 && mRaw <= 12 && dRaw >= 1 && dRaw <= 31 && yRaw >= 1900 && yRaw <= 2100) {
      return {
        valid: true,
        iso: yRaw + "-" + String(mRaw).padStart(2, "0") + "-" + String(dRaw).padStart(2, "0"),
        day: dRaw, month: mRaw, year: yRaw
      };
    }
  }

  return { valid: false, iso: null, day: null, month: null, year: null };
}

function createDateForZone(day, month, year, hour, minute, zone) {
  var targetUtc = Date.UTC(year, month - 1, day, hour, minute, 0);
  var d = new Date(targetUtc);

  for (var i = 0; i < 5; i++) {
    var formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: zone,
      year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", second: "2-digit",
      hour12: false
    });
    var parts = formatter.formatToParts(d);
    var actual = {};
    for (var j = 0; j < parts.length; j++) {
      if (parts[j].type !== "literal") {
        actual[parts[j].type] = parseInt(parts[j].value, 10);
      }
    }
    if (actual.hour === 24) actual.hour = 0;

    var actualAsUtc = Date.UTC(
      actual.year,
      actual.month - 1,
      actual.day,
      actual.hour,
      actual.minute,
      actual.second || 0
    );

    var diff = targetUtc - actualAsUtc;
    if (diff === 0) {
      return d;
    }
    d = new Date(d.getTime() + diff);
  }
  return d;
}

function parseTimeInput(timeStr, ampmVal) {
  var str = (timeStr || "").trim().toUpperCase();
  if (!str) return { hour: 0, minute: 0 };

  var hasAm = str.indexOf("AM") !== -1;
  var hasPm = str.indexOf("PM") !== -1;
  var clean = str.replace(/[^\d:]/g, "");
  var parts = clean.split(":");
  var h = parseInt(parts[0], 10);
  var m = parts.length > 1 ? parseInt(parts[1], 10) : 0;
  if (isNaN(h)) h = 0;
  if (isNaN(m)) m = 0;

  var isPm = hasPm || (!hasAm && (ampmVal || "").toUpperCase() === "PM");
  var isAm = hasAm || (!hasPm && (ampmVal || "").toUpperCase() === "AM");

  if (!hasAm && !hasPm && h >= 13) {
    return { hour: h, minute: m };
  }

  if (isPm && h < 12) {
    h += 12;
  } else if (isAm && h === 12) {
    h = 0;
  }

  return { hour: h, minute: m };
}

function setNow() {
  var dateInput = document.getElementById("convDate");
  var timeInput = document.getElementById("convTime");
  var ampmSelect = document.getElementById("convAmpm");
  if (!dateInput || !timeInput) return;

  var now = new Date();
  var dd = String(now.getDate()).padStart(2, "0");
  var mm = String(now.getMonth() + 1).padStart(2, "0");
  var yyyy = now.getFullYear();
  dateInput.value = dd + "-" + mm + "-" + yyyy;

  var hours24 = now.getHours();
  var minutes = String(now.getMinutes()).padStart(2, "0");
  var isPm = hours24 >= 12;
  var hours12 = hours24 % 12;
  if (hours12 === 0) hours12 = 12;
  var hh12 = String(hours12).padStart(2, "0");

  timeInput.value = hh12 + ":" + minutes;
  if (ampmSelect) {
    ampmSelect.value = isPm ? "PM" : "AM";
  }
}

const ABBR_MAP = {
  "IST": "Asia/Kolkata",
  "JST": "Asia/Tokyo",
  "PST": "America/Los_Angeles",
  "PDT": "America/Los_Angeles",
  "EST": "America/New_York",
  "EDT": "America/New_York",
  "CST": "America/Chicago",
  "CDT": "America/Chicago",
  "MST": "America/Denver",
  "MDT": "America/Denver",
  "AKST": "America/Anchorage",
  "AKDT": "America/Anchorage",
  "HST": "Pacific/Honolulu",
  "CET": "Europe/Berlin",
  "CEST": "Europe/Berlin",
  "EET": "Africa/Cairo",
  "EEST": "Africa/Cairo",
  "AEST": "Australia/Sydney",
  "AEDT": "Australia/Sydney",
  "ACST": "Australia/Adelaide",
  "ACDT": "Australia/Adelaide",
  "AWST": "Australia/Perth",
  "KST": "Asia/Seoul",
  "SGT": "Asia/Singapore",
  "HKT": "Asia/Hong_Kong",
  "GST": "Asia/Dubai",
  "AST": "Asia/Dubai",
  "BRT": "America/Sao_Paulo",
  "NZST": "Pacific/Auckland",
  "NZDT": "Pacific/Auckland",
  "SAST": "Africa/Johannesburg",
  "ART": "America/Argentina/Buenos_Aires",
  "PKT": "Asia/Karachi",
  "BST": "Asia/Dhaka",
  "NPT": "Asia/Kathmandu",
  "UTC": "UTC",
  "GMT": "Etc/GMT",
  "CST CHINA": "Asia/Shanghai",
  "CST (CHINA)": "Asia/Shanghai",
  "MSK": "Europe/Moscow",
  "SAMT": "Europe/Samara",
  "YEKT": "Asia/Yekaterinburg",
  "OMST": "Asia/Omsk",
  "KRAT": "Asia/Krasnoyarsk",
  "IRKT": "Asia/Irkutsk",
  "YAKT": "Asia/Yakutsk",
  "VLAT": "Asia/Vladivostok",
  "MAGT": "Asia/Magadan",
  "PETT": "Asia/Kamchatka"
};

function getOrResolveZone(inputEl) {
  if (!inputEl) return "";
  var val = (inputEl.value || "").trim();
  if (!val) return "";

  var upper = val.toUpperCase();
  if (ABBR_MAP[upper]) {
    var mappedZone = resolveZone(ABBR_MAP[upper]);
    if (zoneSupported(mappedZone)) {
      inputEl.setAttribute("data-zone", mappedZone);
      return mappedZone;
    }
  }

  var currentAttr = inputEl.getAttribute("data-zone") || "";
  if (currentAttr && zoneSupported(currentAttr)) {
    return currentAttr;
  }

  var matches = searchTimezones(val);
  if (matches.length > 0) {
    var zone = matches[0].zone;
    inputEl.setAttribute("data-zone", zone);
    return zone;
  }
  return "";
}

function doConvert() {
  var fromTz = document.getElementById("fromTzInput");
  var toTz = document.getElementById("toTzInput");
  var dateEl = document.getElementById("convDate");
  var timeEl = document.getElementById("convTime");
  var ampmEl = document.getElementById("convAmpm");
  var resultEl = document.getElementById("convResult");

  if (!fromTz || !toTz || !dateEl || !timeEl || !resultEl) return;

  var fromZone = getOrResolveZone(fromTz);
  var toZone = getOrResolveZone(toTz);
  if (!fromZone || !toZone) {
    resultEl.innerHTML = "<p class=\"no-results\">Please select or type valid timezones for both fields to convert.</p>";
    showEl(resultEl);
    return;
  }

  if (!dateEl.value.trim() || !timeEl.value.trim()) {
    setNow();
  }

  var parsedDate = parseDateDMY(dateEl.value);
  if (!parsedDate.valid) {
    resultEl.innerHTML = "<p class=\"no-results\">Invalid date. Use DD-MM-YYYY format.</p>";
    showEl(resultEl);
    return;
  }

  var ampmVal = ampmEl ? ampmEl.value : "";
  var parsedTime = parseTimeInput(timeEl.value, ampmVal);

  var fromDate = createDateForZone(parsedDate.day, parsedDate.month, parsedDate.year, parsedTime.hour, parsedTime.minute, fromZone);
  var toDate = new Date(fromDate.getTime());

  var fromLabel = getDisplayLabelForInput(fromTz, fromZone);
  var toLabel = getDisplayLabelForInput(toTz, toZone);
  var fromTimeStr = formatTime(fromDate, fromZone);
  var fromDateStr = formatDateDisplay(fromDate, fromZone);
  var fromOffset = getUTCOffset(fromDate, fromZone);
  var toTimeStr = formatTime(toDate, toZone);
  var toDateStr = formatDateDisplay(toDate, toZone);
  var toOffset = getUTCOffset(toDate, toZone);

  var fromDay = formatDateDisplay(fromDate, fromZone);
  var toDay = formatDateDisplay(toDate, toZone);
  var dayDiff = "";
  if (fromDay !== toDay) {
    var fParts = new Intl.DateTimeFormat("en-CA", { timeZone: fromZone, year: "numeric", month: "2-digit", day: "2-digit" }).format(fromDate);
    var tParts = new Intl.DateTimeFormat("en-CA", { timeZone: toZone, year: "numeric", month: "2-digit", day: "2-digit" }).format(toDate);
    var fMs = new Date(fParts + "T00:00:00").getTime();
    var tMs = new Date(tParts + "T00:00:00").getTime();
    var diffDays = Math.round((tMs - fMs) / 86400000);
    if (diffDays > 0) dayDiff = "+" + diffDays + " day" + (diffDays > 1 ? "s" : "");
    else if (diffDays < 0) dayDiff = diffDays + " day" + (diffDays < -1 ? "s" : "");
  }

  resultEl.innerHTML =
    '<div class="conv-result-grid">' +
      '<div class="conv-result-card">' +
        '<div class="conv-label">' + fromLabel + '</div>' +
        '<div class="conv-time">' + fromTimeStr + '</div>' +
        '<div class="conv-date">' + fromDateStr + '</div>' +
        '<div class="conv-offset">' + fromOffset + '</div>' +
      '</div>' +
      '<div class="conv-arrow">→</div>' +
      '<div class="conv-result-card">' +
        '<div class="conv-label">' + toLabel + '</div>' +
        '<div class="conv-time">' + toTimeStr + '</div>' +
        '<div class="conv-date">' + toDateStr + '</div>' +
        '<div class="conv-offset">' + toOffset + '</div>' +
      '</div>' +
    '</div>' +
    (dayDiff ? '<div class="conv-diff">' + dayDiff + '</div>' : '');
  showEl(resultEl);
}

function buildDatePicker() {
  var picker = document.getElementById("datePicker");
  if (!picker) return;

  picker.innerHTML = "";

  var header = document.createElement("div");
  header.className = "date-picker-header";

  var monthSelect = document.createElement("select");
  monthSelect.setAttribute("aria-label", "Month");
  var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  for (var m = 0; m < months.length; m++) {
    var opt = document.createElement("option");
    opt.value = m;
    opt.textContent = months[m];
    monthSelect.appendChild(opt);
  }

  var yearSelect = document.createElement("select");
  yearSelect.setAttribute("aria-label", "Year");
  var currentYear = new Date().getFullYear();
  for (var y = currentYear - 10; y <= currentYear + 10; y++) {
    var yopt = document.createElement("option");
    yopt.value = y;
    yopt.textContent = y;
    yearSelect.appendChild(yopt);
  }

  header.appendChild(monthSelect);
  header.appendChild(yearSelect);

  var weekdays = document.createElement("div");
  weekdays.className = "date-picker-weekdays";
  var dayHeaders = ["Su","Mo","Tu","We","Th","Fr","Sa"];
  for (var dh = 0; dh < dayHeaders.length; dh++) {
    var dhEl = document.createElement("span");
    dhEl.textContent = dayHeaders[dh];
    weekdays.appendChild(dhEl);
  }

  var daysGrid = document.createElement("div");
  daysGrid.className = "date-picker-days";

  function renderCalendar() {
    daysGrid.innerHTML = "";
    var month = parseInt(monthSelect.value, 10);
    var year = parseInt(yearSelect.value, 10);
    var firstDay = new Date(year, month, 1).getDay();
    var daysInMonth = new Date(year, month + 1, 0).getDate();
    var today = new Date();

    var selected = parseDateDMY((document.getElementById("convDate") || {}).value || "");

    for (var d = 0; d < firstDay; d++) {
      var emptyBtn = document.createElement("button");
      emptyBtn.type = "button";
      emptyBtn.disabled = true;
      emptyBtn.textContent = "";
      daysGrid.appendChild(emptyBtn);
    }

    for (var day = 1; day <= daysInMonth; day++) {
      var cell = document.createElement("button");
      cell.type = "button";
      cell.textContent = day;
      if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
        cell.classList.add("today");
      }
      if (selected.valid && selected.day === day && selected.month === month + 1 && selected.year === year) {
        cell.classList.add("selected");
      }
      (function(dVal, mon, yr) {
        cell.addEventListener("mousedown", function(e) {
          e.preventDefault();
          var dateInput = document.getElementById("convDate");
          if (dateInput) {
            dateInput.value = String(dVal).padStart(2, "0") + "-" + String(mon + 1).padStart(2, "0") + "-" + yr;
          }
          hideEl(picker);
        });
      })(day, month, year);
      daysGrid.appendChild(cell);
    }
  }

  monthSelect.addEventListener("change", renderCalendar);
  yearSelect.addEventListener("change", renderCalendar);

  picker.appendChild(header);
  picker.appendChild(weekdays);
  picker.appendChild(daysGrid);

  var footer = document.createElement("div");
  footer.className = "date-picker-footer";

  var todayBtn = document.createElement("button");
  todayBtn.type = "button";
  todayBtn.textContent = "Today";
  todayBtn.addEventListener("mousedown", function(e) {
    e.preventDefault();
    var now = new Date();
    monthSelect.value = String(now.getMonth());
    yearSelect.value = String(now.getFullYear());
    renderCalendar();
    var di = document.getElementById("convDate");
    if (di) {
      di.value = String(now.getDate()).padStart(2, "0") + "-" + String(now.getMonth() + 1).padStart(2, "0") + "-" + now.getFullYear();
    }
    hideEl(picker);
  });

  var closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.textContent = "Close";
  closeBtn.addEventListener("mousedown", function(e) {
    e.preventDefault();
    hideEl(picker);
  });

  footer.appendChild(todayBtn);
  footer.appendChild(closeBtn);
  picker.appendChild(footer);

  var now = new Date();
  var parsedDate = parseDateDMY((document.getElementById("convDate") || {}).value || "");
  if (parsedDate.valid) {
    monthSelect.value = String(parsedDate.month - 1);
    yearSelect.value = String(parsedDate.year);
  } else {
    monthSelect.value = String(now.getMonth());
    yearSelect.value = String(now.getFullYear());
  }
  renderCalendar();
}

function enrichMatches(matches, opts) {
  var showTime = opts && opts.showTime;
  var markAdded = opts && opts.markAdded;
  var now = showTime ? new Date() : null;
  for (var i = 0; i < matches.length; i++) {
    if (showTime) matches[i].time = formatTime(now, matches[i].zone);
    if (markAdded) {
      matches[i].alreadyAdded = isDefaultClock(matches[i].zone) || isUserClock(matches[i].zone);
    }
  }
  return matches;
}

function setupSearch(inputId, resultsId, onSelect, opts) {
  var input = document.getElementById(inputId);
  var results = document.getElementById(resultsId);
  if (!input || !results) return;

  var debounceTimer = null;
  var showTime = !!(opts && opts.showTime);

  function openResults(val) {
    var matches = enrichMatches(searchTimezones(val), opts);
    renderDropdown(results, matches, function(zone) {
      input.value = getZoneLabel(zone);
      input.setAttribute("data-zone", zone);
      if (onSelect) onSelect(zone);
    }, { showTime: showTime });
  }

  input.addEventListener("input", function() {
    clearTimeout(debounceTimer);
    var val = input.value.trim();
    if (!val) {
      hideDropdown(results);
      return;
    }
    debounceTimer = setTimeout(function() { openResults(val); }, 150);
  });

  input.addEventListener("focus", function() {
    var val = input.value.trim();
    if (val) openResults(val);
  });

  input.addEventListener("blur", function() {
    setTimeout(function() { hideDropdown(results); }, 180);
  });

  document.addEventListener("click", function(e) {
    if (!input.contains(e.target) && !results.contains(e.target)) {
      hideDropdown(results);
    }
  });
}

function updateThemeToggleIcon() {
  var toggleTheme = document.getElementById("toggleTheme");
  if (!toggleTheme) return;
  toggleTheme.textContent = document.body.classList.contains("light") ? "☀️" : "🌙";
}

function findClockCard(zone) {
  var resolved = resolveZone(zone);
  var cards = document.querySelectorAll(".clock[data-zone]");
  for (var i = 0; i < cards.length; i++) {
    var z = cards[i].getAttribute("data-zone");
    if (z === zone || resolveZone(z) === resolved) return cards[i];
  }
  return null;
}

function renderInfoModal(filterText) {
  var body = document.getElementById("infoModalBody");
  if (!body) return;
  body.innerHTML = "";

  var query = (filterText || "").toLowerCase().trim();
  var filtered = TZ_REFERENCE.filter(function(item) {
    if (!query) return true;
    var matchAbbr = item.abbr.toLowerCase().indexOf(query) !== -1;
    var matchName = item.name.toLowerCase().indexOf(query) !== -1;
    var matchCountry = item.country.toLowerCase().indexOf(query) !== -1;
    var matchCities = item.cities.some(function(c) { return c.toLowerCase().indexOf(query) !== -1; });
    return matchAbbr || matchName || matchCountry || matchCities;
  });

  if (filtered.length === 0) {
    body.innerHTML = '<p class="no-results">No matching timezone, country, or city found.</p>';
    return;
  }

  var grid = document.createElement("div");
  grid.className = "info-guide-grid";

  for (var i = 0; i < filtered.length; i++) {
    var ref = filtered[i];
    var card = document.createElement("div");
    card.className = "info-guide-card";

    var topRow = document.createElement("div");
    topRow.className = "info-guide-header";

    var abbrSpan = document.createElement("span");
    abbrSpan.className = "info-guide-abbr";
    abbrSpan.textContent = ref.abbr;

    var offsetSpan = document.createElement("span");
    offsetSpan.className = "info-guide-offset";
    offsetSpan.textContent = ref.offset;

    topRow.appendChild(abbrSpan);
    topRow.appendChild(offsetSpan);

    var nameDiv = document.createElement("div");
    nameDiv.className = "info-guide-name";
    nameDiv.textContent = ref.name;

    var countryDiv = document.createElement("div");
    countryDiv.className = "info-guide-country";
    countryDiv.textContent = ref.country;

    var citiesWrap = document.createElement("div");
    citiesWrap.className = "info-guide-cities";

    for (var c = 0; c < ref.cities.length; c++) {
      var cityName = ref.cities[c];
      var cityBtn = document.createElement("button");
      cityBtn.type = "button";
      cityBtn.className = "city-pill";
      cityBtn.textContent = cityName;
      cityBtn.title = "Search " + cityName + " live clock";
      (function(name) {
        cityBtn.addEventListener("click", function() {
          var overlay = document.getElementById("infoModalOverlay");
          if (overlay) hideEl(overlay);
          var searchInput = document.getElementById("searchInput");
          if (searchInput) {
            searchInput.value = name;
            searchInput.focus();
            var matches = searchTimezones(name);
            if (matches.length > 0) {
              var zone = matches[0].zone;
              if (isDefaultClock(zone) || isUserClock(zone)) {
                var existing = findClockCard(zone);
                if (existing) {
                  existing.classList.add("highlight");
                  existing.scrollIntoView({ behavior: "smooth", block: "center" });
                  setTimeout(function() { existing.classList.remove("highlight"); }, 1500);
                }
              } else {
                if (addUserClock(zone, matches[0].label)) {
                  renderClocks();
                }
              }
            }
          }
        });
      })(cityName);
      citiesWrap.appendChild(cityBtn);
    }

    card.appendChild(topRow);
    card.appendChild(nameDiv);
    card.appendChild(countryDiv);
    card.appendChild(citiesWrap);
    grid.appendChild(card);
  }

  body.appendChild(grid);
}

function initInfoModal() {
  var infoBtn = document.getElementById("infoBtn");
  var overlay = document.getElementById("infoModalOverlay");
  var closeBtn = document.getElementById("closeInfoModal");
  var searchInput = document.getElementById("infoSearchInput");

  if (!infoBtn || !overlay) return;

  function openModal() {
    renderInfoModal(searchInput ? searchInput.value : "");
    showEl(overlay);
    if (searchInput) searchInput.focus();
  }

  function closeModal() {
    hideEl(overlay);
  }

  infoBtn.addEventListener("click", openModal);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  overlay.addEventListener("click", function(e) {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && !overlay.classList.contains("hidden")) {
      closeModal();
    }
  });

  if (searchInput) {
    searchInput.addEventListener("input", function() {
      renderInfoModal(searchInput.value);
    });
  }
}

function init() {
  initTheme();
  updateThemeToggleIcon();
  renderClocks();
  buildDatePicker();
  buildThemeSwitcherPanel();
  initInfoModal();

  var logoLink = document.getElementById("logoLink");
  if (logoLink) {
    logoLink.addEventListener("click", function(e) {
      e.preventDefault();
      window.location.reload();
    });
  }

  var searchInput = document.getElementById("searchInput");
  var searchResults = document.getElementById("searchResults");
  if (searchInput && searchResults) {
    setupSearch("searchInput", "searchResults", function(zone) {
      var label = getZoneLabel(zone);
      if (isDefaultClock(zone) || isUserClock(zone)) {
        searchInput.value = "";
        searchInput.removeAttribute("data-zone");
        var existing = findClockCard(zone);
        if (existing) {
          existing.classList.add("highlight");
          existing.scrollIntoView({ behavior: "smooth", block: "center" });
          setTimeout(function() { existing.classList.remove("highlight"); }, 1500);
        }
        return;
      }
      if (addUserClock(zone, label)) {
        searchInput.value = "";
        searchInput.removeAttribute("data-zone");
        renderClocks();
      }
    }, { showTime: true, markAdded: true });
  }

  var convDate = document.getElementById("convDate");
  if (convDate) {
    convDate.addEventListener("blur", function() {
      var parsed = parseDateDMY(convDate.value);
      if (parsed.valid) {
        convDate.value = String(parsed.day).padStart(2, "0") + "-" + String(parsed.month).padStart(2, "0") + "-" + parsed.year;
      }
    });
  }

  var datePickerBtn = document.getElementById("datePickerBtn");
  var datePicker = document.getElementById("datePicker");
  if (datePickerBtn && datePicker) {
    datePickerBtn.addEventListener("click", function(e) {
      e.stopPropagation();
      var isHidden = datePicker.classList.contains("hidden");
      if (isHidden) {
        buildDatePicker();
        showEl(datePicker);
      } else {
        hideEl(datePicker);
      }
    });
    document.addEventListener("click", function(e) {
      if (!datePicker.contains(e.target) && e.target !== datePickerBtn) {
        hideEl(datePicker);
      }
    });
  }

  var useNowBtn = document.getElementById("useNow");
  if (useNowBtn) {
    useNowBtn.addEventListener("click", function() { setNow(); });
  }

  var doConvertBtn = document.getElementById("doConvert");
  if (doConvertBtn) {
    doConvertBtn.addEventListener("click", function() { doConvert(); });
  }

  var swapTz = document.getElementById("swapTz");
  if (swapTz) {
    swapTz.addEventListener("click", function() {
      var fromInput = document.getElementById("fromTzInput");
      var toInput = document.getElementById("toTzInput");
      if (!fromInput || !toInput) return;
      var fromZone = fromInput.getAttribute("data-zone") || "";
      var toZone = toInput.getAttribute("data-zone") || "";
      var fromVal = fromInput.value;
      var toVal = toInput.value;
      fromInput.value = toVal;
      toInput.value = fromVal;
      if (toZone) fromInput.setAttribute("data-zone", toZone); else fromInput.removeAttribute("data-zone");
      if (fromZone) toInput.setAttribute("data-zone", fromZone); else toInput.removeAttribute("data-zone");
    });
  }

  setupSearch("fromTzInput", "fromResults", null, { showTime: true });
  setupSearch("toTzInput", "toResults", null, { showTime: true });

  var toggleConverter = document.getElementById("toggleConverter");
  var converterPanel = document.getElementById("converterPanel");
  if (toggleConverter && converterPanel) {
    toggleConverter.addEventListener("click", function() {
      var open = converterPanel.classList.toggle("collapsed") === false;
      toggleConverter.classList.toggle("active", open);
      toggleConverter.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  var toggleTheme = document.getElementById("toggleTheme");
  if (toggleTheme) {
    toggleTheme.addEventListener("click", function() {
      var isLight = document.body.classList.contains("light");
      setThemeMode(isLight ? "dark" : "light");
      updateThemeToggleIcon();
    });
  }

  var themeSwitcherBtn = document.getElementById("themeSwitcherBtn");
  var themeSwitcherPanel = document.getElementById("themeSwitcherPanel");
  if (themeSwitcherBtn && themeSwitcherPanel) {
    themeSwitcherBtn.addEventListener("click", function(e) {
      e.stopPropagation();
      var isHidden = themeSwitcherPanel.classList.contains("hidden");
      if (isHidden) {
        updateThemePanel();
        showEl(themeSwitcherPanel);
        themeSwitcherBtn.setAttribute("aria-expanded", "true");
      } else {
        hideEl(themeSwitcherPanel);
        themeSwitcherBtn.setAttribute("aria-expanded", "false");
      }
    });
    themeSwitcherPanel.addEventListener("mousedown", function(e) {
      e.stopPropagation();
    });
    document.addEventListener("click", function(e) {
      if (!themeSwitcherPanel.contains(e.target) && e.target !== themeSwitcherBtn) {
        hideEl(themeSwitcherPanel);
        themeSwitcherBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  setNow();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

setInterval(updateClockDisplays, 1000);
