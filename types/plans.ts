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
          { text: "Member accounts", isDisabled: false },
          { text: "Analytics dashboard", isDisabled: false },
          { text: "Email support", isDisabled: false },
          { text: "Custom branding", isDisabled: true },
          { text: "Priority support", isDisabled: true },
        ],
        price: "6500 dh",
        discount: "6500 dh",
      },
      plan_2: {
        title: "EXPERIENCE",
        duration: "Between 10-20 rooms",
        features: [
          { text: "Member accounts", isDisabled: false },
          { text: "Analytics dashboard", isDisabled: false },
          { text: "Email support", isDisabled: false },
          { text: "Custom branding", isDisabled: false },
          { text: "Priority support", isDisabled: true },
        ],
        price: "7500 dh",
        discount: "Save 7500 dh",
      },
      plan_3: {
        title: "SIGNATURE",
        duration: "More than 20 rooms",
        features: [
          { text: "Member accounts", isDisabled: false },
          { text: "Analytics dashboard", isDisabled: false },
          { text: "Email support", isDisabled: false },
          { text: "Custom branding", isDisabled: false },
          { text: "Priority support", isDisabled: false },
        ],
        price: "8000 dh",
        discount: "Save 8000 dh",
      },
    },
  },
};
