import { FaTrophy, FaHandshake } from 'react-icons/fa';

import PricingPlan from '~/components/marketing/PricingPlan';

const PRICING_PLANS = [
  {
    id: 'p1',
    title: 'Basic',
    price: 'Free forever',
    perks: ['1 User', 'Up to 100 expenses/year', 'Basic analytics'],
    icon: FaHandshake
  },
  {
    id: 'p2',
    title: 'Pro',
    price: '$9.99/month',
    perks: ['Unlimited Users', 'Unlimited expenses/year', 'Detailed analytics'],
    icon: FaTrophy
  },
];

export default function PricingPage() {
  return (
    <main id="pricing">
      <h2>Great Product, Simple Pricing</h2>
      <ol id="pricing-plans">
        {PRICING_PLANS.map((plan) => (
          <li key={plan.id} className="plan">
            <PricingPlan
              title={plan.title}
              price={plan.price}
              perks={plan.perks}
              icon={plan.icon}
            />
          </li>
        ))}
      </ol>
    </main>
  );
}

export function meta() {
  return [{
    title: "Pricing | Choose the Plan That Fits You",
    description: "Compare our Basic and Pro plans to find the right fit for your expense tracking needs. Simple, transparent pricing for everyone."
  }];
}

export function headers(receivedHeaders) {
  return {
    'Cache-Control': receivedHeaders.parentHeaders.get("Cache-Control")
  };
}

export const handle = {disabled: true};