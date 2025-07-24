export const mockTokens = [
  {
    id: "1",
    name: "BUSD",
    symbol: "BUSD",
    price: 0.99,
    amount: 700,
    totalValue: 700,
    icon: require("../assets/images/busd.png"),
    iconColor: "#F59E0B",
  },
  {
    id: "2",
    name: "sETH",
    symbol: "sETH",
    price: 3050.03,
    amount: 0.72,
    totalValue: 2196.02,
    icon: require("../assets/images/eth.png"),
    iconColor: "#3B82F6",
  },
]

export const mockAssets = [
  {
    id: "1",
    name: "Sunshine apartments",
    status: "Ongoing" as const,
    image: require("../assets/images/apt-1.png"),
  },
  {
    id: "2",
    name: "Sunshine apartments",
    status: "Completed" as const,
    image: require("../assets/images/apt-2.png"),
  },
]

export const mockTransactions = [
  {
    id: "1",
    type: "Transfer" as const,
    direction: "incoming" as const,
    from: "0xd3s2...34hs3",
    amount: 700,
    currency: "BUSD",
    value: 700,
    date: "2024-01-15",
  },
  {
    id: "2",
    type: "Transfer" as const,
    direction: "outgoing" as const,
    to: "0xd3s2...34hs3",
    amount: 52,
    currency: "BUSD",
    value: 52,
    date: "2024-01-14",
  },
]
