// Every number shown on the site lives here with its receipt (S2.3.1).
export type Stat = {
  value: string;
  label: string;
  sourceUrl: string;
};

export const UPWORK_PROFILE_URL =
  "https://www.upwork.com/freelancers/~01387050d017e0878f";

export const STATS: Stat[] = [
  {
    value: "10+",
    label: "years shipping production software",
    sourceUrl: UPWORK_PROFILE_URL,
  },
  {
    value: "6 mo",
    label:
      "from empty repo to a claims platform with three portals, live on AWS",
    sourceUrl: "/work/bluegrass-damage-appraisal",
  },
  {
    value: "3",
    label: "people, one accountable team, no account manager in between",
    sourceUrl: "/about",
  },
];

export const UPWORK_STATS: Stat[] = [
  { value: "100%", label: "job success on Upwork", sourceUrl: UPWORK_PROFILE_URL },
  { value: "Top Rated Plus", label: "Upwork standing", sourceUrl: UPWORK_PROFILE_URL },
  { value: "86", label: "completed jobs", sourceUrl: UPWORK_PROFILE_URL },
  { value: "740+", label: "tracked hours", sourceUrl: UPWORK_PROFILE_URL },
];
