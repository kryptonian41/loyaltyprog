const getLevel = num => {
  if (num < 450 && num > 100) {
    return 'Silver'
  } else if (num > 450 && num < 1200) {
    return 'Gold'
  } else if (num >= 1200) {
    return 'Platinum'
  } else {
    return null
  }
}
/**
 *
 * @param {Object} data - Containing name, email, phone-num
 */
const createNewUserSchema = ({ email, name, pno }) => {
  return {
    email,
    name,
    pno,
    isLoyal: false,
    loyaltyLevel: 0,
    orderCount: 0,
    orders: [],
    amt_spent: 0
  }
}
