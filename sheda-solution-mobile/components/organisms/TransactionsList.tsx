import type React from "react"
import { ScrollView } from "react-native"
import TransactionItem from "../molecules/TransactionItem"
import type { Transaction } from "../../types/wallet"

interface TransactionsListProps {
  transactions: Transaction[]
}

const TransactionsList: React.FC<TransactionsListProps> = ({ transactions }) => {
  return (
    <ScrollView className="flex-1">
      {transactions.map((transaction) => (
        <TransactionItem key={transaction.id} transaction={transaction} />
      ))}
    </ScrollView>
  )
}

export default TransactionsList
