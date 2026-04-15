"use client"

import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"
import { useState, useEffect } from "react"

import { getAllTransactions, type Transaction } from "@/api/transactions"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards() {
  const [balance, setBalance] = useState(0)
  const [income, setIncome] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [expenses, setExpenses] = useState(0)
  const [balanceTrend, setBalanceTrend] = useState<number>(0)
  const [incomeTrend, setIncomeTrend] = useState<number>(0)
  const [expensesTrend, setExpensesTrend] = useState<number>(0)

  const getPeriodMetrics = (transactions: Transaction[]) => {
    return transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === "income") {
          acc.income += transaction.amount
        } else if (transaction.type === "expense") {
          acc.expenses += transaction.amount
        }
        acc.balance = acc.income - acc.expenses
        return acc
      },
      { balance: 0, income: 0, expenses: 0 }
    )
  }

  const getTrend = (thisMonthValue: number, lastMonthValue: number) => {
    if (lastMonthValue === 0) return 0
    const trend = ((thisMonthValue - lastMonthValue) / Math.abs(lastMonthValue)) * 100
    return Number(trend.toFixed(1))
  }

  useEffect(() => {
    let isMounted = true

    const loadTransactions = async () => {
      setLoading(true)
      setError(false)

      try {
        const transactions = await getAllTransactions()
        const now = new Date()
        const thisMonth = now.getMonth()
        const thisYear = now.getFullYear()
        const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1
        const lastMonthYear = thisMonth === 0 ? thisYear - 1 : thisYear

        const thisMonthTransactions = transactions.filter((tx) => {
          const date = new Date(tx.date)
          return date.getMonth() === thisMonth && date.getFullYear() === thisYear
        })

        const lastMonthTransactions = transactions.filter((tx) => {
          const date = new Date(tx.date)
          return date.getMonth() === lastMonth && date.getFullYear() === lastMonthYear
        })

        const thisMonthMetrics = getPeriodMetrics(thisMonthTransactions)
        const lastMonthMetrics = getPeriodMetrics(lastMonthTransactions)

        if (isMounted) {
          setBalance(thisMonthMetrics.balance)
          setIncome(thisMonthMetrics.income)
          setExpenses(thisMonthMetrics.expenses)

          setBalanceTrend(getTrend(thisMonthMetrics.balance, lastMonthMetrics.balance))
          setIncomeTrend(getTrend(thisMonthMetrics.income, lastMonthMetrics.income))
          setExpensesTrend(getTrend(thisMonthMetrics.expenses, lastMonthMetrics.expenses))
        }
      } catch {
        if (isMounted) setError(true)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadTransactions()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-3 grid grid-cols-1 gap-4 px-4 lg:px-6">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Balance</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {loading
              ? "Loading..."
              : error
                ? "Error"
                : balance.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Badge
              variant="outline"
              className={`flex gap-1 rounded-lg text-xs ${
                balanceTrend >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {balanceTrend >= 0 ? (
                <IconTrendingUp className="size-3" />
              ) : (
                <IconTrendingDown className="size-3" />
              )}
              {balanceTrend >= 0 ? `+${balanceTrend}%` : `${balanceTrend}%`}
            </Badge>
            <span className="text-muted-foreground text-sm">
              {balanceTrend >= 0 ? "Up from last month" : "Down from last month"}
            </span>
          </div>
        </CardContent>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Income</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {loading
              ? "Loading..."
              : error
                ? "Error"
                : income.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Badge
              variant="outline"
              className={`flex gap-1 rounded-lg text-xs ${
                incomeTrend >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {incomeTrend >= 0 ? (
                <IconTrendingUp className="size-3" />
              ) : (
                <IconTrendingDown className="size-3" />
              )}
              {incomeTrend >= 0 ? `+${incomeTrend}%` : `${incomeTrend}%`}
            </Badge>
            <span className="text-muted-foreground text-sm">
              {incomeTrend >= 0 ? "Up from last month" : "Down from last month"}
            </span>
          </div>
        </CardContent>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Expenses</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {loading
              ? "Loading..."
              : error
                ? "Error"
                : expenses.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Badge
              variant="outline"
              className={`flex gap-1 rounded-lg text-xs ${
                expensesTrend >= 0 ? "text-red-600"  : "text-green-600"
              }`}
            >
              {expensesTrend >= 0 ? (
                <IconTrendingUp className="size-3" />
              ) : (
                <IconTrendingDown className="size-3" />
              )}
              {expensesTrend >= 0 ? `+${expensesTrend}%` : `${expensesTrend}%`}
            </Badge>
            <span className="text-muted-foreground text-sm">
              {expensesTrend >= 0 ? "Up from last month" : "Down from last month"}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
