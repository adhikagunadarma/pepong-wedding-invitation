// Derived from the “Master Guest List” sheet for groups:
// - Famili Oma
// - Fams Keluarga Josephine
// - Fams Pong
// Note: because the invitation route only uses ?to=<guest name>, duplicate names in different groups
// cannot be distinguished at runtime. At the moment the only duplicate in the sheet is “Nina”.
const INTIMATE_DINNER_GUESTS = [
  "Keluarga Ipoh Kim",
  "Ipoh Lien",
  "Om Nggie",
  "Kukong Swie",
  "Kukong Bing",
  "Kukong Ping",
  "Kukong Ling",
  "Lina",
  "Joy",
  "Oma",
  "Ku Yudi",
  "Kim Yane",
  "Juan",
  "Jordi",
  "Nina",
  "Sheryl",
  "Bibo",
  "Tante Dian",
  "Hazel",
  "Ieie",
  "Om Didin",
  "Aless",
  "Andoni",
  "Gaia",
  "Deril",
  "Ian Tanto and Patricia Sulianti",
  "Nirmala and Oki",
  "Mayura and Partner",
  "Om Hurip and Family",
  "Om Toni and Family",
  "Tante Siska and Family",
  "Sella and Partner",
  "Om Yuyu",
  "Om Yos and Partner",
  "Tante Ay and Family",
  "Om Adhi and Family",
] as const;

function normalizeGuestName(value: string) {
  return decodeURIComponent(value)
    .toLowerCase()
    .replace(/\+/g, " ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const INTIMATE_DINNER_GUEST_SET = new Set(
  INTIMATE_DINNER_GUESTS.map(normalizeGuestName)
);

export function isIntimateDinnerGuest(guestName: string) {
  const normalizedGuestName = normalizeGuestName(guestName);

  if (!normalizedGuestName || normalizedGuestName === "guest") {
    return false;
  }

  return INTIMATE_DINNER_GUEST_SET.has(normalizedGuestName);
}
