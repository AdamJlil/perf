interface PlanFeature {
  text: string;
  isDisabled: boolean;
}

interface Plan {
  title: string;
  duration: string;
  features: PlanFeature[];
  price: string;
  discount: string;
}

interface PlanSet {
  title: string;
  plans: {
    plan_1: Plan;
    plan_2: Plan;
    plan_3: Plan;
  };
}

export const plans: Record<'particular' | 'ESTABLISHEMENT', PlanSet> = {
  particular: {
    title: "Either you join, or get left behind",
    plans: {
      plan_1: {
        title: 'BRONZE',
        duration: '3 months',
        features: [
          { text: 'Monthly one-to-one consultation', isDisabled: false },
          { text: 'Nutrition plan adjustments: 1 time', isDisabled: false },
          { text: 'Personalized workout plans', isDisabled: false },
          { text: '2 free dumbbells', isDisabled: true },
          { text: 'Priority support', isDisabled: true }
        ],
        price: '999 dh',
        discount: '1300 dh'
      },
      plan_2: {
        title: 'PLATINUM',
        duration: '6 months',
        features: [
          { text: 'Monthly one-to-one consultation', isDisabled: false },
          { text: 'Nutrition plan adjustments: 1 time', isDisabled: false },
          { text: 'Personalized workout plans', isDisabled: false },
          { text: '2 free dumbbells', isDisabled: false },
          { text: 'Priority support', isDisabled: true }
        ],
        price: '1582 dh',
        discount: 'Save 410 dh'
      },
      plan_3: {
        title: 'GOLD',
        duration: '1 year',
        features: [
          { text: 'Monthly one-to-one consultation', isDisabled: false },
          { text: 'Nutrition plan adjustments: 1 time', isDisabled: false },
          { text: 'Personalized workout plans', isDisabled: false },
          { text: '2 free dumbbells', isDisabled: false },
          { text: 'Priority support', isDisabled: false }
        ],
        price: '999 dh',
        discount: 'Save 1006 dh'
      }
    }
  },
  ESTABLISHEMENT: {
    title: "Transform Your Establishment's Fitness Experience",
    plans: {
      plan_1: {
        title: 'BRONZE',
        duration: '3 months',
        features: [
          { text: 'Up to 50 member accounts', isDisabled: false },
          { text: 'Basic analytics dashboard', isDisabled: false },
          { text: 'Email support', isDisabled: false },
          { text: 'Custom branding', isDisabled: true },
          { text: 'Priority support', isDisabled: true }
        ],
        price: '2999 dh',
        discount: '3500 dh'
      },
      plan_2: {
        title: 'PLATINUM',
        duration: '6 months',
        features: [
          { text: 'Up to 200 member accounts', isDisabled: false },
          { text: 'Advanced analytics dashboard', isDisabled: false },
          { text: 'Email & phone support', isDisabled: false },
          { text: 'Custom branding', isDisabled: false },
          { text: 'Priority support', isDisabled: true }
        ],
        price: '4999 dh',
        discount: 'Save 1000 dh'
      },
      plan_3: {
        title: 'GOLD',
        duration: '1 year',
        features: [
          { text: 'Unlimited member accounts', isDisabled: false },
          { text: 'Full analytics suite', isDisabled: false },
          { text: '24/7 dedicated support', isDisabled: false },
          { text: 'Custom branding & API access', isDisabled: false },
          { text: 'Priority support & training', isDisabled: false }
        ],
        price: '8999 dh',
        discount: 'Save 2000 dh'
      }
    }
  }
};
