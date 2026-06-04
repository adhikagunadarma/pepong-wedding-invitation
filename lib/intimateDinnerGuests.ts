// Derived from the “Master Guest List” sheet for the intimate-dinner-enabled family groups:
// - Famili Oma -> disebut apa?
// - Fams Keluarga Josephine
// - Fams Pong
// Note: because the invitation route only uses ?to=<guest name>, duplicate names in different groups
// cannot be distinguished at runtime.
const INTIMATE_DINNER_GUESTS = [
  "Mr. Winarto and Family",
  "Mrs. Linda Santoso",
  "Lia and Family",
  "Irene and Family",
  "Ricardo and Family",
  "Yanny and Family",
  "Om Gie and Om Soen",
  "Mr. Gunawan Santoso and Mrs. Viona",
  "Mr. Yohanes Anggawijaya and Mrs. Tien",
  "Mr. and Mrs. Christianus Anggawijaya",
  "Mr. Yoannes Worang",
  "Mrs. Herlina Subroto",
  "Jocelyne",
  "Oma Yanti",
  "Mr. Wahyudi Subroto and family",
  "Juan and Sheryl",
  "Mr. Mulyadi Subroto and family",
  "Mr. Nasaruddin Toha and family",
  "Darryl",
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
  "Basuki and Family",
  "Hadi and Family",
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
