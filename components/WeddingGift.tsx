"use client"

import { Copy } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"

const bankInfos = [
  { name: "Pepe", account: "7310401425", bank: "BCA" },
  { name: "Pong", account: "3452633628", bank: "BCA" }
]

export default function WeddingGift() {
  const [copied, setCopied] = useState<string | null>(null)

  const handleCopy = (account: string) => {
    navigator.clipboard.writeText(account)
    setCopied(account)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <section className="w-full bg-background flex flex-col items-center">
      <div className="w-full max-w-sm rounded-[1rem] border border-border p-6 text-center shadow-sm relative mt-4">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-background px-3 font-script text-3xl text-primary -rotate-2">
          Gifts
        </div>

        <p className="mt-4 mb-6 text-sm text-foreground/80 leading-relaxed font-light">
          Your presence is the most meaningful gift, but if you wish to bless us with a token of love, here is our bank information:
        </p>

        <div className="flex flex-col gap-4">
          {bankInfos.map((bankInfo, i) => (
            <motion.div
              key={i}
              className="border border-border p-4 rounded-xl text-left bg-white relative overflow-hidden group"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-lg uppercase tracking-tighter text-foreground">{bankInfo.name}</p>
                  <p className="text-xs uppercase tracking-widest mt-1 text-foreground/70">{bankInfo.bank}</p>
                </div>
                <button 
                  onClick={() => handleCopy(bankInfo.account)}
                  className="p-2 border border-border rounded-full hover:bg-muted transition-colors"
                  aria-label="Copy account number"
                >
                  <Copy className="w-4 h-4 text-foreground" />
                </button>
              </div>
              <p className="mt-2 font-mono text-sm tracking-widest text-primary">{bankInfo.account}</p>
              
              {copied === bankInfo.account && (
                <div className="absolute inset-0 bg-background/90 flex items-center justify-center font-bold text-primary animate-fadeIn z-10">
                  COPIED!
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
