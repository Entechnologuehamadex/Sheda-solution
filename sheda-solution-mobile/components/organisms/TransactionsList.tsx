import type React from "react";
import { View } from "react-native";
import TransactionItem from "../molecules/TransactionItem";
import InterRegular from "../Text/InterRegular";
import InterMedium from "../Text/InterMedium";
import type { Transaction } from "../../types/wallet";

interface TransactionsListProps {
  transactions: Transaction[];
  loading?: boolean;
}

const TransactionsList: React.FC<TransactionsListProps> = ({
  transactions,
  loading = false,
}) => {
  if (loading) {
    return (
      <View className="flex-1 items-center justify-center py-8">
        <InterMedium className="text-base text-gray-500">
          Loading transactions...
        </InterMedium>
      </View>
    );
  }

  if (transactions.length === 0) {
    return (
      <View className="flex-1 items-center justify-center py-8">
        <InterMedium className="text-base text-gray-500 mb-2">
          No transactions found
        </InterMedium>
        <InterRegular className="text-sm text-gray-400 text-center px-4">
          Your transaction history will appear here once you make transactions
        </InterRegular>
      </View>
    );
  }

  return (
    <View className="flex-1">
      {transactions.map((transaction) => (
        <TransactionItem key={transaction.id} transaction={transaction} />
      ))}
    </View>
  );
};

export default TransactionsList;
