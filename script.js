'use strict';

const THEMES = [
  { group: "Dark", slug: "", name: "Slate (Default)", swatch: ["#0f0f1a","#1a1a2e","#6366f1"] },
  { group: "Dark", slug: "theme-midnight-indigo", name: "Midnight Indigo", swatch: ["#0b0e2a","#1a1147","#8b7dff"] },
  { group: "Dark", slug: "theme-carbon-ember", name: "Carbon Ember", swatch: ["#1a1410","#0d0b09","#ff9d4d"] },
  { group: "Dark", slug: "theme-forest-eclipse", name: "Forest Eclipse", swatch: ["#061a16","#0a241d","#4fd6a8"] },
  { group: "Light", slug: "", name: "Cloud (Default)", swatch: ["#f0f4f8","#e2e8f0","#4f46e5"] },
  { group: "Light", slug: "theme-morning-frost", name: "Morning Frost", swatch: ["#eaf2fb","#f5f9fd","#3a4fd6"] },
  { group: "Light", slug: "theme-sandstone", name: "Sandstone", swatch: ["#f7f1e8","#fbf6ee","#a8501f"] },
  { group: "Light", slug: "theme-mint-glass", name: "Mint Glass", swatch: ["#eaf7f3","#f4faf7","#0f8a72"] }
];

const DEFAULT_CLOCKS = [
  { zone: "America/New_York", label: "New York, Eastern Time" },
  { zone: "America/Los_Angeles", label: "Los Angeles, Pacific Time" },
  { zone: "America/Chicago", label: "Chicago, Central Time" },
  { zone: "America/Denver", label: "Denver, Mountain Time" },
  { zone: "America/Halifax", label: "Halifax, Atlantic Time" },
  { zone: "America/Sao_Paulo", label: "São Paulo, Brazil" },
  { zone: "Europe/London", label: "London, UK" },
  { zone: "Europe/Paris", label: "Paris, France" },
  { zone: "Europe/Berlin", label: "Berlin, Germany" },
  { zone: "Europe/Moscow", label: "Moscow, Russia" },
  { zone: "Asia/Dubai", label: "Dubai, UAE" },
  { zone: "Asia/Kolkata", label: "Kolkata, India" },
  { zone: "Asia/Shanghai", label: "Shanghai, China" },
  { zone: "Asia/Tokyo", label: "Tokyo, Japan" },
  { zone: "Asia/Singapore", label: "Singapore" },
  { zone: "Australia/Sydney", label: "Sydney, Australia" },
  { zone: "Pacific/Auckland", label: "Auckland, New Zealand" },
  { zone: "Africa/Cairo", label: "Cairo, Egypt" },
  { zone: "Africa/Johannesburg", label: "Johannesburg, South Africa" },
  { zone: "Pacific/Honolulu", label: "Honolulu, Hawaii" }
];

const ZONE_ALIASES = {
  "Asia/Kolkata": ["kolkata","calcutta","india","ist","indian standard time"],
  "Asia/Calcutta": ["kolkata","calcutta","india","ist","indian standard time"],
  "Etc/UTC": ["utc","gmt","zulu","z","universal","greenwich"],
  "UTC": ["utc","gmt","zulu","z","universal","greenwich"],
  "America/New_York": ["new york","nyc","eastern","eastern time","est","edt","new york city"],
  "America/Los_Angeles": ["los angeles","la","pacific","pacific time","pst","pdt","california"],
  "America/Chicago": ["chicago","central","central time","cst","cdt","texas"],
  "America/Denver": ["denver","mountain","mountain time","mst","mdt","colorado"],
  "America/Halifax": ["halifax","atlantic","atlantic time","ast","adt","nova scotia"],
  "America/Phoenix": ["phoenix","arizona","mst no dst"],
  "America/Anchorage": ["anchorage","alaska","alaska time","akst","akdt"],
  "Pacific/Honolulu": ["honolulu","hawaii","hst","hawaii time"],
  "Europe/London": ["london","uk","united kingdom","england","bst","british","great britain"],
  "Europe/Paris": ["paris","france"],
  "Europe/Berlin": ["berlin","germany","deutschland"],
  "Europe/Moscow": ["moscow","russia","msk"],
  "Asia/Dubai": ["dubai","uae","united arab emirates"],
  "Asia/Shanghai": ["shanghai","china","beijing","cst china","chinese"],
  "Asia/Tokyo": ["tokyo","japan","jst"],
  "Asia/Singapore": ["singapore","sgt"],
  "Asia/Hong_Kong": ["hong kong","hkt"],
  "Asia/Seoul": ["seoul","korea","kst","south korea"],
  "Australia/Sydney": ["sydney","australia","aest","aedt"],
  "Pacific/Auckland": ["auckland","new zealand","nzst","nzdt"],
  "Africa/Cairo": ["cairo","egypt"],
  "Africa/Johannesburg": ["johannesburg","south africa","sa"],
  "America/Mexico_City": ["mexico city","mexico"],
  "America/Toronto": ["toronto","canada","ontario"],
  "America/Vancouver": ["vancouver","british columbia","bc"],
  "Asia/Bangkok": ["bangkok","thailand","ict"],
  "Asia/Jakarta": ["jakarta","indonesia","wib"],
  "Asia/Karachi": ["karachi","pakistan","pkt"],
  "Asia/Manila": ["manila","philippines","pht"],
  "Asia/Kathmandu": ["kathmandu","nepal","npt"],
  "Asia/Yangon": ["yangon","myanmar","burma","rangoon"],
  "Asia/Tehran": ["tehran","iran","irst"],
  "Asia/Baghdad": ["baghdad","iraq"],
  "Asia/Kuwait": ["kuwait"],
  "Asia/Riyadh": ["riyadh","saudi arabia","ksa"],
  "Asia/Dhaka": ["dhaka","bangladesh","bst bangladesh"],
  "Pacific/Fiji": ["fiji"],
  "Pacific/Tahiti": ["tahiti","french polynesia"],
  "Pacific/Guam": ["guam","chamorro"],
  "Pacific/Samoa": ["samoa"],
  "Pacific/Tongatapu": ["tonga"],
  "Atlantic/Azores": ["azores"],
  "Atlantic/Cape_Verde": ["cape verde"],
  "America/Argentina/Buenos_Aires": ["buenos aires","argentina"],
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
    if (timeEl) timeEl.textContent = formatTime(now, zone);
    if (dateEl) dateEl.textContent = formatDateDisplay(now, zone);
    if (offsetEl) offsetEl.textContent = getUTCOffset(now, zone);
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

  var offsetDiv = document.createElement("div");
  offsetDiv.className = "zone-offset";
  offsetDiv.textContent = "";

  card.appendChild(timeEl);
  card.appendChild(labelDiv);
  card.appendChild(dateEl);
  card.appendChild(offsetDiv);

  return card;
}

function renderClocks() {
  var container = document.getElementById("clockContainer");
  if (!container) return;
  container.innerHTML = "";
  var addedZones = [];

  for (var i = 0; i < DEFAULT_CLOCKS.length; i++) {
    var dc = DEFAULT_CLOCKS[i];
    var zone = resolveZone(dc.zone);
    if (zoneSupported(zone) && addedZones.indexOf(zone) === -1) {
      addedZones.push(zone);
      container.appendChild(createClockCard(zone, dc.label, false));
    }
  }

  var userClocks = getUserClocks();
  for (var j = 0; j < userClocks.length; j++) {
    var uc = userClocks[j];
    var uz = resolveZone(uc.zone);
    if (zoneSupported(uz) && addedZones.indexOf(uz) === -1) {
      addedZones.push(uz);
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
        row.addEventListener("mousedown", function(e) {
          e.preventDefault();
          setTheme(slug, group);
        });
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
  var match = value.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
  if (!match) {
    var alt = value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
    if (alt) {
      return {
        valid: true,
        iso: alt[1] + "-" + alt[2].padStart(2, "0") + "-" + alt[3].padStart(2, "0"),
        day: parseInt(alt[3], 10),
        month: parseInt(alt[2], 10),
        year: parseInt(alt[1], 10)
      };
    }
    return { valid: false, iso: null, day: null, month: null, year: null };
  }
  return {
    valid: true,
    iso: match[3] + "-" + match[2].padStart(2, "0") + "-" + match[1].padStart(2, "0"),
    day: parseInt(match[1], 10),
    month: parseInt(match[2], 10),
    year: parseInt(match[3], 10)
  };
}

function createDateForZone(day, month, year, hour, minute, zone) {
  var d = new Date(year, month - 1, day, hour, minute, 0);
  for (var i = 0; i < 5; i++) {
    var formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: zone, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit",
      hour12: false
    });
    var parts = formatter.formatToParts(d);
    var actual = {};
    for (var j = 0; j < parts.length; j++) {
      if (parts[j].type !== "literal") actual[parts[j].type] = parseInt(parts[j].value, 10);
    }
    if (actual.month === month && actual.day === day && actual.hour === hour && actual.minute === minute) {
      return d;
    }
    var offset = 0;
    if (actual.month !== month || actual.day !== day) {
      if (actual.month < month || (actual.month === month && actual.day < day)) {
        offset = 86400000;
      } else {
        offset = -86400000;
      }
    } else {
      if (actual.hour < hour || (actual.hour === hour && actual.minute < minute)) {
        offset = 60 * 60 * 1000;
      } else {
        offset = -60 * 60 * 1000;
      }
    }
    d = new Date(d.getTime() + offset);
  }
  return d;
}

function setNow() {
  var dateInput = document.getElementById("convDate");
  var timeInput = document.getElementById("convTime");
  if (!dateInput || !timeInput) return;
  var now = new Date();
  var dd = String(now.getDate()).padStart(2, "0");
  var mm = String(now.getMonth() + 1).padStart(2, "0");
  var yyyy = now.getFullYear();
  var hh = String(now.getHours()).padStart(2, "0");
  var min = String(now.getMinutes()).padStart(2, "0");
  dateInput.value = dd + "-" + mm + "-" + yyyy;
  timeInput.value = hh + ":" + min;
}

function getOrResolveZone(inputEl) {
  if (!inputEl) return "";
  var zone = inputEl.getAttribute("data-zone") || "";
  if (zone) return zone;
  var val = (inputEl.value || "").trim();
  if (!val) return "";
  var matches = searchTimezones(val);
  if (matches.length > 0) {
    inputEl.setAttribute("data-zone", matches[0].zone);
    inputEl.value = matches[0].label;
    return matches[0].zone;
  }
  return "";
}

function doConvert() {
  var fromTz = document.getElementById("fromTzInput");
  var toTz = document.getElementById("toTzInput");
  var dateEl = document.getElementById("convDate");
  var timeEl = document.getElementById("convTime");
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

  var parsed = parseDateDMY(dateEl.value);
  if (!parsed.valid) {
    resultEl.innerHTML = "<p class=\"no-results\">Invalid date. Use DD-MM-YYYY format.</p>";
    showEl(resultEl);
    return;
  }

  var timeParts = (timeEl.value || "00:00").split(":");
  var hour = parseInt(timeParts[0], 10);
  var minute = parseInt(timeParts[1], 10);
  if (isNaN(hour)) hour = 0;
  if (isNaN(minute)) minute = 0;

  var fromDate = createDateForZone(parsed.day, parsed.month, parsed.year, hour, minute, fromZone);
  var toDate = new Date(fromDate.getTime());

  var fromLabel = getZoneLabel(fromZone);
  var toLabel = getZoneLabel(toZone);
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

function init() {
  initTheme();
  updateThemeToggleIcon();
  renderClocks();
  buildDatePicker();
  buildThemeSwitcherPanel();

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
    convDate.addEventListener("input", function() {
      var digits = convDate.value.replace(/\D/g, "").slice(0, 8);
      var out = digits;
      if (digits.length > 4) out = digits.slice(0, 2) + "-" + digits.slice(2, 4) + "-" + digits.slice(4);
      else if (digits.length > 2) out = digits.slice(0, 2) + "-" + digits.slice(2);
      convDate.value = out;
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
