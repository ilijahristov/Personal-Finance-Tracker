"use client"

import { useState } from "react"
import { useAddTransaction } from "@/context/AddTransactionContext"
import { createTransaction } from "@/api/transactions"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"

const expenseCategories = [
  "Housing",
  "Transportation",
  "Food",
  "Utilities",
  "Clothing",
  "Medical",
  "Insurance",
  "Household Items/Supplies",
  "Personal",
  "Debt",
  "Education",
  "Savings",
  "Gifts/Donations",
  "Entertainment",
]

const expenseSubCategories = {
  "Housing": [
    "Rent",
    "Mortgage",
    "Property Taxes",
    "Home Insurance",
    "Home Maintenance",
  ],
  "Transportation": [
    "Gas",
    "Maintenance",
    "Public Transportation",
    "Parking",
    "Other",
  ],
  "Food": [
    "Groceries",
    "Restaurants",
    "Snacks",
    "Other",
  ],
  "Utilities": [
    "Electricity",
    "Water",
    "Internet",
    "Other",
  ],
  "Clothing": [
    "Clothing",
    "Shoes",
    "Other",
  ],
  "Medical": [
    "Doctor",
    "Dental",
    "Vision",
    "Other",
  ],
  "Insurance": [
    "Health",
    "Life",
    "Auto",
    "Home",
    "Other",
  ],
  "Household Items/Supplies": [
    "Cleaning Supplies",
    "Paper Products",
    "Other",
  ],
  "Personal": [
    "Entertainment",
    "Gifts",
    "Other",
  ],
  "Debt": [
    "Credit Card",
    "Loan",
    "Other",
  ],
  "Education": [
    "Tuition",
    "Books",
    "Other",
  ],
  "Savings": [
    "Emergency Fund",
    "Retirement",
    "Other",
  ],
  "Gifts/Donations": [
    "Charity",
    "Other",
  ],
  "Entertainment": [
    "Movies",
    "Concerts",
    "Other",
  ],
}

const incomeCategories = [
  "Salary",
  "Freelance",
  "Investments",
  "Other",
]

const incomeSubCategories = {
  "Salary": [
    "Full-Time",
    "Part-Time",
    "Other",
  ],
  "Freelance": [
    "Freelance",
    "Other",
  ],
  "Investments": [
    "Stocks",
    "Bonds",
    "Other",
  ],
}

export function AddTransactionModal() {
  const { isOpen, closeModal, triggerRefresh } = useAddTransaction()

  const [amount, setAmount] = useState("")
  const [type, setType] = useState<"income" | "expense" | "">("")
  const [category, setCategory] = useState("")
  const [subCategory, setSubCategory] = useState("")
  const [date, setDate] = useState("")
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  function handleReset() {
    setAmount(""); setType(""); setCategory("")
    setSubCategory(""); setDate(""); setNotes(""); setError("")
  }

  async function handleAdd() {
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount."); return
    }
    if (!type) { setError("Please select a type."); return }
    if (!date) { setError("Please select a date."); return }

    setError("")
    setIsSubmitting(true)
    try {
      await createTransaction({
        amount: parseFloat(amount),
        type,
        category: category || null,
        description: notes || null,
        date,
      })
      triggerRefresh()
      closeModal()
      handleReset()
    } catch {
      setError("Failed to save transaction. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  // TODO: Add subcategories per category to the SubCategory dropdown
  // TODO: Format the date display as DD/Month Text/YYYY (e.g. 02/April/2026) in the date InputGroup

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onMouseDown={closeModal}
    >
      <div
        className="bg-white rounded-xl border border-black p-6 w-full max-w-md relative flex flex-col gap-4"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-black text-lg font-bold cursor-pointer leading-none hover:opacity-60 transition-opacity"
          onClick={() => { closeModal(); handleReset() }}
        >
          &times;
        </button>

        <h2 className="text-base font-semibold mb-2">Add Transaction</h2>

        {/* Amount */}
        <InputGroup>
          <InputGroupAddon>
            <InputGroupText>$</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <InputGroupAddon align="inline-end">
            <InputGroupText>USD</InputGroupText>
          </InputGroupAddon>
        </InputGroup>

        {/* Type */}
        <InputGroup>
          <InputGroupAddon>
            <InputGroupText>Type</InputGroupText>
          </InputGroupAddon>
          <select
            data-slot="input-group-control"
            className="flex-1 rounded-none border-0 bg-transparent text-sm px-3 outline-none cursor-pointer"
            value={type}
            onChange={(e) => {
              setType(e.target.value as "income" | "expense" | "")
              setCategory("")
              setSubCategory("")
            }}
          >
            <option value="">Select type...</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </InputGroup>

        {/* Category — only for expenses */}
        {type === "expense" && (
          <InputGroup>
            <InputGroupAddon>
              <InputGroupText>Category</InputGroupText>
            </InputGroupAddon>
            <select
              data-slot="input-group-control"
              className="flex-1 rounded-none border-0 bg-transparent text-sm px-3 outline-none cursor-pointer"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value)
                setSubCategory("")
              }}
            >
              <option value="">Select category...</option>
              {expenseCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </InputGroup>
        )}

        {/* SubCategory — slides in when a category is selected */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${category ? "max-h-24 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <InputGroup>
            <InputGroupAddon>
              <InputGroupText>Sub</InputGroupText>
            </InputGroupAddon>
            <select
              data-slot="input-group-control"
              className="flex-1 rounded-none border-0 bg-transparent text-sm px-3 outline-none cursor-pointer"
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
            >
              <option value="">Select subcategory...</option>
              {/* TODO: populate subcategories per category */}
            </select>
          </InputGroup>
        </div>

        {/* Date */}
        <InputGroup>
          <InputGroupAddon>
            <InputGroupText>Date</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </InputGroup>

        {/* Notes */}
        <InputGroup>
          <InputGroupTextarea
            placeholder="Notes"
            maxLength={150}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <InputGroupAddon align="block-end">
            <InputGroupText className="text-xs text-muted-foreground">
              {150 - notes.length} characters left
            </InputGroupText>
          </InputGroupAddon>
        </InputGroup>

        {/* Action buttons */}
        {error && <p className="text-xs text-red-500 text-right -mt-2">{error}</p>}
        <div className="flex justify-end gap-2 mt-2">
          
          <button
            onClick={handleAdd}
            disabled={isSubmitting}
            className="px-4 py-1.5 text-sm rounded-md bg-black text-white hover:bg-neutral-800 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Adding..." : "Add"}
          </button>
        </div>

      </div>
    </div>
  )
}
