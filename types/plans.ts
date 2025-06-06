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
        title: 'ESSENTIAL',
        duration: '3 months',
        features: [
          { text: 'PERF BOX', isDisabled: false },
          { text: '1 MONTH ACCESS TO THE PLATFORM', isDisabled: false },
          { text: 'RENT TO GUESTS FOR 50 DH / SESSION', isDisabled: false },
          { text: 'KEEP 100% OF RENTAL PROFITS', isDisabled: false },
        ],
        price: '5500 dh',
        discount: ''
      },
      plan_2: {
        title: 'PREMIUM',
        duration: '6 months',
        features: [
          { text: 'PERF BOX', isDisabled: false },
          { text: '1 YEAR ACCESS TO THE PLATFORM', isDisabled: false },
          { text: 'RENT TO GUESTS FOR 50 DH / SESSION', isDisabled: false },
          { text: 'KEEP 100% OF RENTAL PROFITS', isDisabled: false },
        ],
        price: '9999 dh',
        discount: 'Save 1001 dh'
      },
      plan_3: {
        title: 'GROWTH',
        duration: '1 year',
        features: [
          { text: 'PERF BOX FOR FREE', isDisabled: false },
          { text: '1 MONTH ACCESS TO THE PLATFORM', isDisabled: false },
          { text: 'RENT TO GUESTS FOR 50 DH / SESSION', isDisabled: false },
          { text: '50% OF RENTAL REVENUE GOES TO PERF', isDisabled: false },
        ],
        price: '500 dh',
        discount: 'Save 1006 dh'
      }
    }
  },
  ESTABLISHEMENT: {
    title: "Either you join, or get left behind",
    plans: {
      plan_1: {
        title: 'ESSENTIAL',
        duration: '3 months',
        features: [
          { text: 'PERF BOX', isDisabled: false },
          { text: '1 MONTH ACCESS TO THE PLATFORM', isDisabled: false },
          { text: 'RENT TO GUESTS FOR 50 DH / SESSION', isDisabled: false },
          { text: 'KEEP 100% OF RENTAL PROFITS', isDisabled: false },
        ],
        price: '5500 dh',
        discount: ''
      },
      plan_2: {
        title: 'PREMIUM',
        duration: '6 months',
        features: [
          { text: 'PERF BOX', isDisabled: false },
          { text: '1 YEAR ACCESS TO THE PLATFORM', isDisabled: false },
          { text: 'RENT TO GUESTS FOR 50 DH / SESSION', isDisabled: false },
          { text: 'KEEP 100% OF RENTAL PROFITS', isDisabled: false },
        ],
        price: '9999 dh',
        discount: 'Save 1001 dh'
      },
      plan_3: {
        title: 'GROWTH',
        duration: '1 year',
        features: [
          { text: 'PERF BOX FOR FREE', isDisabled: false },
          { text: '1 MONTH ACCESS TO THE PLATFORM', isDisabled: false },
          { text: 'RENT TO GUESTS FOR 50 DH / SESSION', isDisabled: false },
          { text: '50% OF RENTAL REVENUE GOES TO PERF', isDisabled: false },
        ],
        price: '500 dh',
        discount: 'Save 1006 dh'
      }
    }
  }
};
