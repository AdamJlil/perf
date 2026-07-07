// Default per-video calorie matrices and descriptions.
// Used to seed newly created videos and backfill legacy videos that
// predate the `calories`/`description` fields on the Video model.
// Matrix shape: { [ageRange]: { [weightRange]: { [dumbbellWeight]: "min-max" } } }

export const AGE_RANGES = ["20-40", "40-60", "Over 60"] as const;
export const WEIGHT_RANGES = ["50-70", "70-90", "90-120"] as const;
export const DUMBBELL_WEIGHTS = ["2.5", "5", "10"] as const;

export type CalorieMatrix = {
  [ageRange: string]: { [weightRange: string]: { [dumbbell: string]: string } };
};

const M = (
  rows: [string, string, string][][]
): CalorieMatrix => {
  const matrix: CalorieMatrix = {};
  AGE_RANGES.forEach((age, ai) => {
    matrix[age] = {};
    WEIGHT_RANGES.forEach((weight, wi) => {
      const [d25, d5, d10] = rows[ai][wi];
      matrix[age][weight] = { "2.5": d25, "5": d5, "10": d10 };
    });
  });
  return matrix;
};

export const DEFAULT_VIDEO_DATA: { description: string; calories: CalorieMatrix }[] = [
  {
    description:
      "This full-body workout focuses on strength and core engagement, making it ideal for muscle toning and fat burning.",
    calories: M([
      [["900-1000", "900-1100", "1000-1200"], ["950-1150", "1050-1250", "1150-1350"], ["1100-1300", "1200-1400", "1300-1500"]],
      [["750-950", "850-1050", "950-1150"], ["900-1100", "1050-1250", "1150-1350"], ["1050-1250", "1150-1350", "1250-1450"]],
      [["700-900", "800-1000", "900-1100"], ["850-1050", "1000-1200", "1100-1300"], ["1000-1200", "1100-1300", "1200-1400"]],
    ]),
  },
  {
    description:
      "This high-intensity strength and endurance workout combines compound movements with explosive cardio exercises to maximize calorie burn.",
    calories: M([
      [["850-1050", "950-1150", "1050-1250"], ["1000-1200", "1100-1300", "1200-1400"], ["1150-1350", "1250-1450", "1350-1550"]],
      [["800-1000", "900-1100", "1000-1200"], ["950-1150", "1050-1250", "1150-1350"], ["1100-1300", "1200-1400", "1300-1500"]],
      [["750-950", "850-1050", "950-1150"], ["900-1100", "1000-1200", "1100-1300"], ["1000-1200", "1100-1300", "1200-1400"]],
    ]),
  },
  {
    description:
      "This full-body workout focuses on strength and core engagement, making it ideal for muscle toning and fat burning.",
    calories: M([
      [["800-1000", "900-1100", "1000-1200"], ["950-1150", "1050-1250", "1150-1350"], ["1100-1300", "1200-1400", "1300-1500"]],
      [["750-950", "850-1050", "950-1150"], ["900-1100", "1050-1250", "1150-1350"], ["1050-1250", "1150-1350", "1250-1450"]],
      [["700-900", "800-1000", "900-1100"], ["850-1050", "1000-1200", "1100-1300"], ["1000-1200", "1100-1300", "1200-1400"]],
    ]),
  },
  {
    description:
      "This calorie Burner targets the entire body, engaging major muscle groups while keeping the heart rate elevated for optimal fat-burning.",
    calories: M([
      [["850-1050", "950-1150", "1050-1250"], ["1000-1200", "1100-1300", "1200-1400"], ["1150-1350", "1250-1450", "1350-1550"]],
      [["750-950", "900-1100", "1000-1200"], ["950-1150", "1100-1300", "1200-1400"], ["1050-1250", "1200-1400", "1300-1500"]],
      [["700-900", "850-1050", "950-1150"], ["900-1100", "1050-1250", "1150-1350"], ["1000-1200", "1150-1350", "1350-1450"]],
    ]),
  },
  {
    description:
      "A high-intensity interval training session designed to push your limits and maximize cardiovascular endurance.",
    calories: M([
      [["900-1100", "1000-1200", "1100-1300"], ["1000-1200", "1100-1300", "1200-1400"], ["1100-1300", "1200-1400", "1300-1500"]],
      [["800-1000", "900-1100", "1000-1200"], ["900-1100", "1000-1200", "1100-1300"], ["1000-1200", "1100-1300", "1200-1400"]],
      [["700-900", "800-1000", "900-1100"], ["800-1000", "900-1100", "1000-1200"], ["900-1100", "1000-1200", "1100-1300"]],
    ]),
  },
  {
    description:
      "A deep stretching routine focused on improving flexibility, reducing muscle tension, and promoting physical recovery.",
    calories: M([
      [["200-300", "250-350", "300-400"], ["250-350", "300-400", "350-450"], ["300-400", "350-450", "400-500"]],
      [["150-250", "200-300", "250-350"], ["200-300", "250-350", "300-400"], ["250-350", "300-400", "350-450"]],
      [["100-200", "150-250", "200-300"], ["150-250", "200-300", "250-350"], ["200-300", "250-350", "300-400"]],
    ]),
  },
];

export const defaultVideoDataForIndex = (index: number) => {
  const safe = ((index % DEFAULT_VIDEO_DATA.length) + DEFAULT_VIDEO_DATA.length) % DEFAULT_VIDEO_DATA.length;
  return DEFAULT_VIDEO_DATA[safe];
};

// Returns a fully-populated matrix; fills any missing cells with the given fallback.
export const normalizeCalorieMatrix = (input: any, fallback: CalorieMatrix): CalorieMatrix => {
  const out: CalorieMatrix = {};
  for (const age of AGE_RANGES) {
    out[age] = {};
    for (const weight of WEIGHT_RANGES) {
      out[age][weight] = {};
      for (const d of DUMBBELL_WEIGHTS) {
        const raw = input?.[age]?.[weight]?.[d];
        out[age][weight][d] =
          typeof raw === "string" && raw.trim() !== "" ? raw.trim() : fallback[age][weight][d];
      }
    }
  }
  return out;
};
