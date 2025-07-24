"use client"

import type React from "react"
import { createContext, useContext, useState, type ReactNode } from "react"

type Mode = "buyer" | "seller"

interface ModeContextType {
  mode: Mode
  toggleMode: () => void
  isSeller: boolean
  isBuyer: boolean
}

const ModeContext = createContext<ModeContextType | undefined>(undefined)

interface ModeProviderProps {
  children: ReactNode
}

export const ModeProvider: React.FC<ModeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<Mode>("buyer")

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "buyer" ? "seller" : "buyer"))
  }

  const value: ModeContextType = {
    mode,
    toggleMode,
    isSeller: mode === "seller",
    isBuyer: mode === "buyer",
  }

  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>
}

export const useMode = (): ModeContextType => {
  const context = useContext(ModeContext)
  if (context === undefined) {
    throw new Error("useMode must be used within a ModeProvider")
  }
  return context
}
