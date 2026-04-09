"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { useState, useEffect } from "react"
import { getAllTransactions } from "@/api/transactions"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"

export const description = "A multiple bar chart"

const chartConfig = {
    income: {
        label: "Income",
        color: "var(--chart-1)",
    },
    expenses: {
        label: "Expenses",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig

export function MultiBarChart() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [chartData, setChartData] = useState<
        { month: string; income: number; expenses: number }[]
    >([])

    useEffect(() => {
        let isMounted = true

        const loadTransactions = async () => {
            setLoading(true)
            setError(false)

            try {
                const transactions = await getAllTransactions()
                const now = new Date()
                const twelveMonthsAgo = new Date(
                    now.getFullYear(),
                    now.getMonth() - 11,
                    1
                )
                const recent = transactions.filter(
                    (tx) => new Date(tx.date) >= twelveMonthsAgo
                )

                const grouped: Record<
                    string,
                    { month: string; income: number; expenses: number }
                > = {}

                for (const tx of recent) {
                    const date = new Date(tx.date)
                    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`

                    if (!grouped[key]) {
                        grouped[key] = {
                            month: date.toLocaleString("en-US", {
                                month: "long",
                            }),
                            income: 0,
                            expenses: 0,
                        }
                    }

                    if (tx.type === "income") {
                        grouped[key].income += tx.amount
                    } else if (tx.type === "expense") {
                        grouped[key].expenses += tx.amount
                    }
                }

                const result = Object.entries(grouped)
                    .sort(([a], [b]) => a.localeCompare(b))
                    .map(([, v]) => v)

                if (isMounted) {
                    setChartData(result)
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

    const rangeDescription = (() => {
        const now = new Date()
        const start = new Date(now.getFullYear(), now.getMonth() - 11, 1)
        const firstMonth = start.toLocaleString("en-US", { month: "long" })
        const lastMonth = now.toLocaleString("en-US", { month: "long" })
        const startYear = start.getFullYear()
        const currentYear = now.getFullYear()
        if (startYear === currentYear) {
            return `${firstMonth} – ${lastMonth} ${currentYear}`
        }
        return `${firstMonth} ${startYear} – ${lastMonth} ${currentYear}`
    })()

    return (
        <Card>
            <CardHeader>
                <CardTitle>Income vs Expenses</CardTitle>
                <CardDescription>{rangeDescription}</CardDescription>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="flex aspect-[32/9] items-center justify-center text-sm text-muted-foreground">
                        Loading...
                    </div>
                ) : error ? (
                    <div className="flex aspect-[32/9] items-center justify-center text-sm text-muted-foreground">
                        Error
                    </div>
                ) : (
                    <ChartContainer
                        config={chartConfig}
                        className="aspect-[32/9]"
                    >
                        <BarChart accessibilityLayer data={chartData}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent indicator="dashed" />}
                            />
                            <Bar
                                dataKey="income"
                                fill="var(--color-income)"
                                radius={4}
                            />
                            <Bar
                                dataKey="expenses"
                                fill="var(--color-expenses)"
                                radius={4}
                            />
                        </BarChart>
                    </ChartContainer>
                )}
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="leading-none text-muted-foreground">
                    Total income and expenses for the last 12 months
                </div>
            </CardFooter>
        </Card>
    )
}
