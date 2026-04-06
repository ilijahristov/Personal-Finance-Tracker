"use client"

import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"
import { useState, useEffect } from "react"

import { getAllTransactions } from "@/api/transactions"
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
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let isMounted = true

    const loadTransactions = async () => {
      setLoading(true)
      setError(false)

      try {
        const transactions = await getAllTransactions()
        const computedBalance = transactions.reduce((total, transaction) => {
          if (transaction.type === "income") return total + transaction.amount
          if (transaction.type === "expense") return total - transaction.amount
          return total
        }, 0)

        if (isMounted) setBalance(computedBalance)
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
    <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 lg:px-6">
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
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <IconTrendingUp className="size-3" />
              +8.2%
            </Badge>
            <span className="text-muted-foreground text-sm">
              Up from last month
            </span>
          </div>
        </CardContent>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Income</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            $6,000.00
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <IconTrendingUp className="size-3" />
              +12.5%
            </Badge>
            <span className="text-muted-foreground text-sm">
              Salary + freelance
            </span>
          </div>
        </CardContent>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Expenses</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            $1,750.00
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <IconTrendingDown className="size-3" />
              -4.1%
            </Badge>
            <span className="text-muted-foreground text-sm">
              Under budget this month
            </span>
          </div>
        </CardContent>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Savings Rate</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            29.2%
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <IconTrendingUp className="size-3" />
              +3.1%
            </Badge>
            <span className="text-muted-foreground text-sm">
              On track for goal
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
