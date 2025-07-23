export interface Token {
  id: string
  name: string
  symbol: string
  price: number
  amount: number
  totalValue: number
  icon: any
  iconColor: string
}

export interface Asset {
  id: string
  name: string
  status: "Ongoing" | "Completed"
  image: any
}

export interface Transaction {
  id: string
  type: "Transfer"
  direction: "incoming" | "outgoing"
  from?: string
  to?: string
  amount: number
  currency: string
  value: number
  date: string
}

export type WalletTab = "Tokens" | "Transactions" | "Assets"
