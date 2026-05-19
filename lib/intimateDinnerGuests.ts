// Derived from the “Master Guest List” sheet where selected/intimate-dinner guests
// are currently marked with Priority = 1.
// Note: because the invitation route only uses ?to=<guest name>, duplicate names in different groups
// cannot be distinguished at runtime.
const INTIMATE_DINNER_GUESTS = [
  "Stephen",
  "Deo and Partner",
  "Benedict and Yoshi",
  "Rita and Devin",
  "Mrs. Herlina Subroto",
  "Jocelyne",
  "Oma Yanti",
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
  "Mario and Novi",
  "Upay and Partner",
  "Mr. Andreas K & Family",
  "Koor and Petugas Gereja",
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
