# ZoneTimes

**ZoneTimes** is a sleek, responsive world clock web app with a built-in timezone converter. Track live clocks for major global time zones, search and add any IANA timezone by city name, and convert between timezones with accuracy.

---

## Features

- **Live Clocks**: Real-time clocks for 20+ major world time zones.
- **Mobile Responsive Grid**: Displays 2 clocks per row on mobile screens down to 320px width.
- **City & Timezone Search**: Search any IANA timezone by city name, abbreviation (IST, PST, UTC), or zone ID.
- **Custom Clocks**: Save custom clocks to your grid persisted in `localStorage`.
- **Timezone Converter**: Convert between any two timezones with auto-completion and DD-MM-YYYY date support.
- **Calendar Picker**: Built-in touch-friendly date selector for mobile and desktop.
- **Modern Themes**: Glassmorphic themes with interactive theme switcher panel.
- **Zero Dependencies**: Pure HTML5, Vanilla CSS3, and modern ES6+ JavaScript.

---

## Tech Stack

- HTML5
- CSS3 (custom properties, glassmorphism, flexbox & grid)
- JavaScript (Intl.DateTimeFormat + Intl.supportedValuesOf APIs)
- No frameworks, no build tools

---

## How to Use

Open `index.html` in a browser, or serve with any static server:

```bash
npx serve .
```

### Search
Type a city name (e.g. "Kolkata", "New York"), abbreviation ("PST", "IST"), or timezone ID ("Asia/Tokyo") in the search bar. Click or tap a result to add it to your clock grid.

### Timezone Converter
Click **Time Converter** to expand the panel. Select From/To timezones by typing and choosing from the dropdown. Pick a date with the calendar icon or enter DD-MM-YYYY manually. Click **Convert** to see the result.

### Themes
Click the palette icon (🎨) in the header to choose themes. Your selection is saved automatically.

---

## Author

Created by [AdityaKrishnamurthy](https://github.com/AdityaKrishnamurthy)
