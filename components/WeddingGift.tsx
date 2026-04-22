"use client"

import { Copy } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const bankInfos = [
  { name: "Pepe", account: "7310401425", bank: "BCA" },
  { name: "Pong", account: "3452633628", bank: "BCA" }
]

export default function WeddingGift() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const [copied, setCopied] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const handleCopy = (account: string) => {
    navigator.clipboard.writeText(account)
    setCopied(account)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <section className="w-full bg-background flex flex-col items-center">
      
      <div className="relative w-full max-w-screen-xl mx-auto drop-shadow-md">
         <Image 
            src={`${basePath}/images/artboard-5.png`}
            alt="Gift Illustration"
            width={1920}
            height={1080}
            className="w-full h-auto rounded-lg"
         />
         <div className="absolute top-[10%] right-[3%] w-[42%] h-[80%] flex flex-col items-center justify-center text-center p-2 md:p-8 z-10">
             <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-script text-[#253247] mb-1 sm:mb-4 -rotate-1">
               Gift
             </h2>
             <p className="text-[7px] sm:text-[10px] md:text-sm lg:text-base font-sans leading-snug sm:leading-relaxed text-[#253247]">
               Your presence is our greatest present. If you would like to contribute to our future, a digital gift is deeply appreciated.
             </p>
             <button
                onClick={() => setModalOpen(true)}
                className="mt-2 sm:mt-6 border border-[#253247] bg-transparent text-[#253247] uppercase tracking-widest font-bold py-1 px-2 sm:py-3 sm:px-8 rounded-md hover:bg-[#DEBA29] transition-colors text-[7px] sm:text-[10px] md:text-sm -rotate-1"
              >
                Send a Gift
              </button>
         </div>
      </div>

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
               className="w-full max-w-sm rounded-[1rem] border border-border p-8 bg-[#F2EBE1] shadow-xl relative"
               initial={{ scale: 0.9, y: 20 }}
               animate={{ scale: 1, y: 0 }}
               exit={{ scale: 0.9, y: 20 }}
            >
              <button 
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 text-3xl opacity-50 hover:opacity-100"
              >
                &times;
              </button>
              
              <h3 className="font-script text-5xl text-center mb-6 text-foreground">Gifts</h3>

              <p className="mb-6 text-sm text-foreground leading-relaxed font-sans text-center">
                Your presence is the most meaningful gift, but if you wish to bless us with a token of love, here is our bank information:
              </p>

              <div className="flex flex-col gap-4">
                {bankInfos.map((bankInfo, i) => (
                  <div
                    key={i}
                    className="border border-border p-4 rounded-xl text-left bg-white relative overflow-hidden"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-lg uppercase tracking-wide text-foreground">{bankInfo.name}</p>
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
                    <p className="mt-2 font-mono text-sm tracking-widest text-[#9CBA7F]">{bankInfo.account}</p>
                    
                    {copied === bankInfo.account && (
                      <div className="absolute inset-0 bg-background/90 flex items-center justify-center font-bold text-[#9CBA7F] animate-fadeIn z-10">
                        COPIED!
                      </div>
                    )}

                  {/* TODO: ADD QR as well in here */}

                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
