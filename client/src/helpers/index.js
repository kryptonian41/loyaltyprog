import GoldBadge from '@/assets/badges/gold.jpg'
import SilverBadge from '@/assets/badges/silver.png'
import PlatinumBadge from '@/assets/badges/platinum.jpg'

export const levels = {
  SILVER: 'Silver',
  GOLD: 'Gold',
  PLATINUM: 'Platinum',
  NONE: 'none'
}

export const getBadge = level => {
  switch (level) {
    case levels.GOLD:
      return GoldBadge
      break
    case levels.SILVER:
      return SilverBadge
      break
    case levels.PLATINUM:
      return PlatinumBadge
      break
    default:
      break
  }
}

export const getLevel = num => {
  if (num < 450 && num >= 100) {
    return levels.SILVER
  } else if (num >= 450 && num < 1200) {
    return levels.GOLD
  } else if (num >= 1200) {
    return levels.PLATINUM
  } else {
    return levels.NONE
  }
}

export const incentives = {
  [levels.SILVER]: {
    incentives: [
      'Earn Rewards through surveys',
      'Free Delivery for orders above 1000'
    ]
  },
  [levels.GOLD]: {
    incentives: [
      'Earn Rewards through surveys',
      'Free Delivery on all orders',
      'Exclusive Access to sales and product launches',
      'Upto 5% cashback'
    ]
  },
  [levels.PLATINUM]: {
    incentives: [
      'Earn rewards through surveys',
      'Free Delivery on all orders',
      'Exclusive Access to sales and product launches',
      'Exclusive Discounts on some products',
      'Special Birthday Discount coupon',
      'Upto 15% cashback',
      'Premium Customer Service'
    ]
  },
  [levels.NONE]: {
    incentives: ['You currently have no incentives.']
  }
}

/**
 *
 * @param {Object} data - Containing name, email, phone-num
 */
export const createNewUserSchema = ({ email, name, pno }) => {
  return {
    email,
    name,
    pno,
    isLoyal: false,
    loyaltyPoints: 0,
    orderCount: 0,
    orders: [],
    amount_spent: 0
  }
}
