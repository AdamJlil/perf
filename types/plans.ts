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
        title: 'EXPLORER',
        duration: 'Less than 10 rooms',
        features: [
          { text: '1 PERF BOX', isDisabled: false },
          { text: '1 MONTH ACCESS TO THE PLATFORM', isDisabled: false },
          { text: 'GREAT FOR ROOMS, TERRACES OR GARDEN CORNERS', isDisabled: false },
          { text: 'NO SETUP, NO EFFORT - JUST EXPERIENCE', isDisabled: false },
        ],
        price: '6500 dh',
        discount: ''
      },
      plan_2: {
        title: 'EXPERIENCE',
        duration: 'Between 10-20 rooms',
        features: [
          { text: '1 PERF BOX', isDisabled: false },
          { text: '1 MONTH ACCESS TO THE PLATFORM', isDisabled: false },
          { text: 'FOR THOUGHTFUL STAYS THAT PRIORITIZE WELL-BEING', isDisabled: false },
          { text: 'UPGRADE TO EVERYDAY HOSTING', isDisabled: false },
        ],
        price: '7500 dh',
        discount: 'save 500 dh'
      },
      plan_3: {
        title: 'SIGNATURE',
        duration: 'More than 20 rooms',
        features: [
          { text: '1 PERF BOX', isDisabled: false },
          { text: '1 MONTH ACCESS TO THE PLATFORM', isDisabled: false },
          { text: 'MADE FOR UPSCALE MULTI-ROOM PROPERTIES', isDisabled: false },
          { text: 'FLEXIBLE, SCALABLE, READY FOR VOLUME', isDisabled: false },
        ],
        price: '8000 dh',
        discount: ''
      }
    }
  },
  ESTABLISHEMENT: {
    title: "Either you join, or get left behind",
    plans: {
      plan_1: {
        title: 'EXPLORER',
        duration: 'Less than 10 rooms',
        features: [
          { text: '1 PERF BOX', isDisabled: false },
          { text: '1 MONTH ACCESS TO THE PLATFORM', isDisabled: false },
          { text: 'GREAT FOR ROOMS, TERRACES OR GARDEN CORNERS', isDisabled: false },
          { text: 'NO SETUP, NO EFFORT - JUST EXPERIENCE', isDisabled: false },
        ],
        price: '6500 dh',
        discount: ''
      },
      plan_2: {
        title: 'EXPERIENCE',
        duration: 'Between 10-20 rooms',
        features: [
          { text: '1 PERF BOX', isDisabled: false },
          { text: '1 MONTH ACCESS TO THE PLATFORM', isDisabled: false },
          { text: 'FOR THOUGHTFUL STAYS THAT PRIORITIZE WELL-BEING', isDisabled: false },
          { text: 'UPGRADE TO EVERYDAY HOSTING', isDisabled: false },
        ],
        price: '7500 dh',
        discount: 'save 500 dh'
      },
      plan_3: {
        title: 'SIGNATURE',
        duration: 'More than 20 rooms',
        features: [
          { text: '1 PERF BOX', isDisabled: false },
          { text: '1 MONTH ACCESS TO THE PLATFORM', isDisabled: false },
          { text: 'MADE FOR UPSCALE MULTI-ROOM PROPERTIES', isDisabled: false },
          { text: 'FLEXIBLE, SCALABLE, READY FOR VOLUME', isDisabled: false },
        ],
        price: '8000 dh',
        discount: ''
      }
    }
  }
};
