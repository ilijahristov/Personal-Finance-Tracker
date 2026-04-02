"use client"

import { useState } from "react"
import { useAddTransaction } from "@/context/AddTransactionContext"
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

export function AddTransactionModal() {
  const { isOpen, closeModal } = useAddTransaction()

  const [amount, setAmount] = useState("")
  const [type, setType] = useState<"income" | "expense" | "">("")
  const [category, setCategory] = useState("")
  const [subCategory, setSubCategory] = useState("")
  const [date, setDate] = useState("")
  const [notes, setNotes] = useState("")

  if (!isOpen) return null

  // TODO: Wire up Cancel button — call closeModal() and reset all form state fields to ""
  // TODO: Wire up Add button — call createTransaction() from @/api/transactions.js with form state, then closeModal() and refresh the transaction list
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
          onClick={closeModal}
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
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </InputGroup>

        {/* Action buttons */}
        <div className="flex justify-end gap-2 mt-2">
          <button className="px-4 py-1.5 text-sm rounded-md border border-black text-black hover:bg-neutral-100 transition-colors cursor-pointer">
            Cancel
          </button>
          <button className="px-4 py-1.5 text-sm rounded-md bg-black text-white hover:bg-neutral-800 transition-colors cursor-pointer">
            Add
          </button>
        </div>
      </div>
    </div>
  )
}
