export interface Plan {
  title: string;
  duration: string;
  features: Array<{ text: string; isDisabled?: boolean }>;
  price: string;
  discount: string;
}

export interface PlanSet {
  title: string;
  plans: {
    plan_1: Plan;
    plan_2: Plan;
    plan_3: Plan;
  };
}

export const plans: Record<"ESTABLISHEMENT", PlanSet> = {
  ESTABLISHEMENT: {
    title: "Establishment Program",
    plans: {
      plan_1: {
        title: "EXPLORER",
        duration: "Less than 10 rooms",
        features: [
          { text: "Up to 30 guest accounts", isDisabled: false },
          { text: "Workout Library", isDisabled: false },
          { text: "Basic analytics", isDisabled: false },
          { text: "Email support", isDisabled: false },
        ],
        price: "500 dh /mois",
        discount: "500 dh",
      },
      plan_2: {
        title: "EXPERIENCE",
        duration: "Between 10-20 rooms",
        features: [
          { text: "Up to 100 guest accounts", isDisabled: false },
          { text: "Workout Library", isDisabled: false },
          { text: "Advanced Analytics", isDisabled: false },
          { text: "Email support", isDisabled: false },
        ],
        price: "800 dh /mois",
        discount: "Save 800 dh",
      },
      plan_3: {
        title: "SIGNATURE",
        duration: "More than 20 rooms",
        features: [
          { text: "Unlimited guest accounts", isDisabled: false },
          { text: "Workout Library", isDisabled: false },
          { text: "Advanced Analytics", isDisabled: false },
          { text: "Email support", isDisabled: false },
          { text: "Priority support", isDisabled: false },
        ],
        price: "900 dh /mois",
        discount: "Save 900 dh",
      },
    },
  },
};
