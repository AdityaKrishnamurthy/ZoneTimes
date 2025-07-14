const clocks = [
  { zone: "local", label: "Local Time" },
  { zone: "UTC", label: "UTC – Coordinated Universal Time" },
  { zone: "Europe/London", label: "GMT – Greenwich Mean Time" },
  { zone: "Asia/Kolkata", label: "IST – Indian Standard Time" },
  { zone: "Asia/Tokyo", label: "JST – Japan Standard Time" },
  { zone: "America/Los_Angeles", label: "PST / PDT – Pacific Time" },
  { zone: "America/New_York", label: "EST / EDT – Eastern Time" },
  { zone: "America/Chicago", label: "CST / CDT – Central Time" },
  { zone: "Asia/Shanghai", label: "CST – China Standard Time" },
  { zone: "Europe/Berlin", label: "CET / CEST – Central European Time" },
  { zone: "Asia/Seoul", label: "KST – Korea Standard Time" },
  {
    zone: "Australia/Sydney",
    label: "AEST – Australian Eastern Standard Time",
  },
];

const container = document.getElementById("clockContainer");

function updateClocks() {
  container.innerHTML = "";
  const now = new Date();

  clocks.forEach((clock) => {
    const formattedTime = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: clock.zone === "local" ? undefined : clock.zone,
    }).format(now);

    const clockDiv = document.createElement("div");
    clockDiv.className = "clock";
    clockDiv.innerHTML = `<div>${formattedTime}</div><div class="zone">${clock.label}</div>`;
    container.appendChild(clockDiv);
  });
}

updateClocks();
setInterval(updateClocks, 1000);

// Theme toggle logic
const prefersDarkScheme = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;
if (!prefersDarkScheme) {
  document.body.classList.add("light");
}

const toggleBtn = document.getElementById("toggleTheme");
toggleBtn.textContent = document.body.classList.contains("light") ? "🌙" : "☀️";
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  toggleBtn.textContent = document.body.classList.contains("light")
    ? "🌙"
    : "☀️";
});
