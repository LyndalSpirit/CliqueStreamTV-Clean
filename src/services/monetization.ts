/**
 * Represents a subscription tier.
 */
export interface SubscriptionTier {
  /**
   * The name of the tier (e.g., 'Ad-Supported', 'Premium').
   */
  name: string;
  /**
   * The monthly price of the tier.
   */
  monthlyPrice: number;
  /**
   * Whether this tier is ad-supported.
   */
  adSupported: boolean;
  /**
   * Whether this tier supports creator revenue sharing.
   */
  creatorRevenueSharing: boolean;
}

/**
 * Retrieves available subscription tiers.
 * @returns A promise that resolves to an array of SubscriptionTier objects.
 */
export async function getSubscriptionTiers(): Promise<SubscriptionTier[]> {
  // TODO: Implement this by calling an API.

  return [
    {
      name: 'Ad-Supported',
      monthlyPrice: 0,
      adSupported: true,
      creatorRevenueSharing: false,
    },
    {
      name: 'Premium',
      monthlyPrice: 9.99,
      adSupported: false,
      creatorRevenueSharing: true,
    },
  ];
}

/**
 * Represents a creator's monetization settings.
 */
export interface CreatorMonetization {
  /**
   * Whether tipping is enabled.
   */
  tippingEnabled: boolean;
  /**
   * Whether fire screens are enabled.
   */
  fireScreensEnabled: boolean;
}

/**
 * Retrieves a creator's monetization settings.
 * @param creatorId The ID of the creator.
 * @returns A promise that resolves to a CreatorMonetization object.
 */
export async function getCreatorMonetization(creatorId: string): Promise<CreatorMonetization> {
  // TODO: Implement this by calling an API.

  return {
    tippingEnabled: true,
    fireScreensEnabled: true,
  };
}
