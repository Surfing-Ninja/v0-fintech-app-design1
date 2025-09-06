"use client"

import type React from "react"

import { useState } from "react"
import { useApp } from "@/contexts/app-context"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface TransactionModalProps {
  isOpen: boolean
  onClose: () => void
  type: "income" | "expense"
}

const incomeCategories = ["Salary", "Freelance", "Business", "Investment Returns", "Other Income"]

const expenseCategories = [
  "Food & Dining",
  "Transportation",
  "Shopping",
  "Entertainment",
  "Bills & Utilities",
  "Healthcare",
  "Education",
  "Other Expenses",
]

export function TransactionModal({ isOpen, onClose, type }: TransactionModalProps) {
  const { dispatch } = useApp()
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    description: "",
  })

  const categories = type === "income" ? incomeCategories : expenseCategories

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.amount || !formData.category || !formData.description) {
      return
    }

    const transaction = {
      id: Date.now().toString(),
      type,
      amount: Number.parseFloat(formData.amount),
      category: formData.category,
      description: formData.description,
      date: new Date().toISOString(),
    }

    dispatch({ type: "ADD_TRANSACTION", payload: transaction })

    // Reset form
    setFormData({ amount: "", category: "", description: "" })
    onClose()
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card border-border/20 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground">
            Add {type === "income" ? "Income" : "Expense"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="amount" className="text-foreground">
              Amount
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={formData.amount}
              onChange={(e) => handleInputChange("amount", e.target.value)}
              className="mt-1 bg-input border-border text-foreground"
              required
            />
          </div>

          <div>
            <Label htmlFor="category" className="text-foreground">
              Category
            </Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
              <SelectTrigger className="mt-1 bg-input border-border text-foreground">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="glass-card border-border/20">
                {categories.map((category) => (
                  <SelectItem key={category} value={category} className="text-foreground hover:bg-card/20">
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description" className="text-foreground">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Enter description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="mt-1 bg-input border-border text-foreground resize-none"
              rows={3}
              required
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-border text-muted-foreground hover:bg-card/20 bg-transparent"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className={`flex-1 font-semibold ${
                type === "income"
                  ? "bg-primary hover:bg-primary/90 text-primary-foreground neon-glow"
                  : "bg-secondary hover:bg-secondary/90 text-secondary-foreground purple-glow"
              }`}
            >
              Add {type === "income" ? "Income" : "Expense"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
