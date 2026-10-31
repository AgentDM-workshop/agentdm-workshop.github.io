/* =====================================================================
 *  AgentDM @ WWW 2027 — SITE CONFIG
 *  Edit this file to update dates, people, links. No HTML knowledge needed.
 * ===================================================================== */
window.AGENTDM = {

  /* ---------- Links ---------- */
  links: {
    submission: "",          // e.g. "https://openreview.net/group?id=ACM.org/TheWebConf/2027/Workshop/AgentDM"  (empty = "Coming Soon")
    conference: "https://www2027.thewebconf.org/",
    email: "agentdm.workshop@gmail.com",   // TODO: replace with your workshop contact email
    template: "https://www.acm.org/publications/proceedings-template"
  },

  /* ---------- Important dates (all 23:59 AoE) ----------
   * status: "tentative" | "confirmed" | "passed"
   * The countdown in the hero targets the entry with countdown:true.     */
  dates: [
    { label: "Call for Papers Opens",        date: "2026-12-01", status: "tentative" },
    { label: "Paper Submission Deadline",    date: "2027-02-05", status: "tentative", countdown: true, highlight: true },
    { label: "Notification of Acceptance",   date: "2027-03-01", status: "tentative" },
    { label: "Camera-Ready Deadline",        date: "2027-03-08", status: "tentative" },
    { label: "Workshop Day @ WWW 2027",      date: "2027-05-11", status: "tentative", note: "Exact day within May 10–14 TBA" }
  ],

  /* ---------- Organizers ----------
   * photo: put a square image in assets/img/people/ and write its path, e.g. "assets/img/people/yankai.jpg"
   * url:   personal homepage (optional)                                   */
  organizers: [
    { name: "Yankai Chen",     aff: "Mohamed bin Zayed University of Artificial Intelligence", country: "UAE",           photo: "", url: "" },
    { name: "Dongyuan Li",     aff: "The University of Tokyo",                                 country: "Japan",         photo: "", url: "" },
    { name: "Chen Ma",         aff: "City University of Hong Kong",                            country: "Hong Kong SAR", photo: "", url: "" },
    { name: "Ying Zhang",      aff: "RIKEN Center for Advanced Intelligence Project",          country: "Japan",         photo: "", url: "" },
    { name: "Bowei He",        aff: "Mohamed bin Zayed University of Artificial Intelligence", country: "UAE",           photo: "", url: "" },
    { name: "Jian Wu",         aff: "Westlake University",                                     country: "China",         photo: "", url: "" },
    { name: "Haolun Wu",       aff: "McGill University & Mila",                                country: "Canada",        photo: "", url: "" },
    { name: "Satoshi Kosugi",  aff: "Institute of Science Tokyo",                              country: "Japan",         photo: "", url: "" },
    { name: "Mengting Wan",    aff: "Microsoft",                                               country: "USA",           photo: "", url: "" }
  ],

  /* ---------- Invited speakers ----------
   * Leave empty to show "To be announced" cards.
   * Only add a speaker AFTER they have confirmed. Example:
   * { name: "Jane Doe", aff: "University X", photo: "", url: "", title: "Talk title TBA" }  */
  speakers: [],
  speakerPlaceholders: 4,

  /* ---------- Program committee ----------
   * Set showPC:true and fill pc[] once members confirm.                   */
  showPC: false,
  pc: [
    // { name: "Name", aff: "Affiliation" },
  ],

  /* ---------- Tentative schedule (local time, Dublin, IST = UTC+1) ----------
   * type: talk | paper | break | interactive | panel | ceremony           */
  schedule: [
    { time: "09:00 – 09:15", title: "Opening, objectives & community goals",                       type: "ceremony" },
    { time: "09:15 – 10:00", title: "Invited Talk 1 + moderated discussion",                       type: "talk" },
    { time: "10:00 – 10:30", title: "Contributed paper spotlights",                                type: "paper" },
    { time: "10:30 – 11:00", title: "Coffee & informal interaction",                               type: "break" },
    { time: "11:00 – 12:00", title: "Posters + structured research speed-dating",                  type: "interactive" },
    { time: "12:00 – 12:30", title: "Invited Talk 2 + discussion",                                 type: "talk" },
    { time: "12:30 – 14:00", title: "Lunch",                                                       type: "break" },
    { time: "14:00 – 14:45", title: "Invited Talk 3 + discussion",                                 type: "talk" },
    { time: "14:45 – 15:30", title: "Breakouts: planning · benchmarks · verification · deployment", type: "interactive" },
    { time: "15:30 – 16:00", title: "Coffee & interaction",                                        type: "break" },
    { time: "16:00 – 16:45", title: "Panel: When should an autonomous data-mining agent be trusted?", type: "panel" },
    { time: "16:45 – 17:30", title: "Benchmark design & AgentDM research roadmap",                  type: "interactive" },
    { time: "17:30 – 18:00", title: "Group reports, commitments & closing",                         type: "ceremony" }
  ]
};
