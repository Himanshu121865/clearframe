"use client"

import { useState, useRef, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Plus, SendHorizontal, Image as ImageIcon, X, User, Bot, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  role: 'user' | 'bot'
  content: string
  image?: string | null
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [image, setImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const scrollEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = () => {
    if (!input.trim() && !image) return

    const newMessage: Message = {
      role: 'user',
      content: input,
      image: image
    }

    setMessages(prev => [...prev, newMessage])
    setInput("")
    setImage(null)

    
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'bot',
        content: `I received your message: "${input}". I'm working on extracting the information you need from ClearFrame.`
      }])
    }, 1000)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (f) => setImage(f.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-black">
   
      <div className="flex-1 overflow-y-auto px-4 pt-32 pb-8 scrollbar-hide">
        <div className="max-w-3xl mx-auto space-y-10">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[40vh] text-center space-y-6 animate-in fade-in zoom-in duration-1000 ease-out">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse" />
                <div className="relative p-6 bg-white/5 rounded-[40px] border border-white/10 shadow-2xl backdrop-blur-xl">
                  <Sparkles size={48} className="text-white/60" />
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight text-white italic">How can I clear the frame for you?</h2>
                <p className="text-white/30 text-base max-w-sm mx-auto font-medium">Upload a photo or ask a question to start the extraction process.</p>
              </div>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={cn(
                  "flex items-start gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out",
                  msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                )}
              >
                
                <div className={cn(
                  "shrink-0 w-9 h-9 rounded-full flex items-center justify-center border transition-transform duration-300 hover:scale-110",
                  msg.role === 'user' 
                    ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]" 
                    : "bg-[#1a1a1a] text-white/50 border-white/10"
                )}>
                  {msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}
                </div>
                
                
                <div className={cn(
                  "flex flex-col gap-3 max-w-[85%] md:max-w-[75%]",
                  msg.role === 'user' ? "items-end" : "items-start"
                )}>
                  {msg.image && (
                    <div className="group relative">
                      <div className="absolute inset-0 bg-white/5 blur-xl group-hover:bg-white/10 transition-colors rounded-2xl" />
                      <img 
                        src={msg.image} 
                        alt="User upload" 
                        className="relative rounded-2xl border border-white/10 max-h-72 w-auto object-cover shadow-2xl transition-transform duration-500 hover:scale-[1.02]" 
                      />
                    </div>
                  )}
                  {msg.content && (
                    <div className={cn(
                      "px-6 py-4 rounded-[28px] text-lg leading-relaxed break-words shadow-lg transition-all duration-300",
                      msg.role === 'user' 
                        ? "bg-[#2a2a2a] text-white rounded-tr-none hover:bg-[#333]" 
                        : "bg-white/5 text-white/90 border border-white/10 rounded-tl-none backdrop-blur-md hover:border-white/20"
                    )}>
                      {msg.content}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
          <div ref={scrollEndRef} className="h-10" />
        </div>
      </div>

    
      <div className="w-full px-4 pb-10 md:pb-16 bg-gradient-to-t from-black via-black/90 to-transparent">
        <div className="max-w-3xl mx-auto relative group">
        
          {image && (
            <div className="absolute bottom-full mb-6 left-0 p-3 bg-[#121212]/95 backdrop-blur-2xl border border-white/10 rounded-3xl animate-in fade-in slide-in-from-bottom-4 shadow-[0_10px_40px_rgba(0,0,0,0.7)]">
              <div className="relative group/preview">
                <img src={image} alt="Upload preview" className="h-40 w-auto rounded-2xl object-cover border border-white/5 shadow-inner" />
                <button 
                  onClick={() => setImage(null)}
                  className="absolute -top-3 -right-3 p-2 bg-red-500/90 backdrop-blur-md rounded-full text-white shadow-xl hover:bg-red-600 transition-all hover:scale-110 active:scale-90"
                  type="button"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          )}

        
          <div className="relative flex flex-col bg-[#121212]/80 backdrop-blur-3xl border border-white/5 rounded-[40px] overflow-hidden focus-within:border-white/20 focus-within:bg-[#1a1a1a]/90 transition-all duration-500 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] ring-1 ring-white/5 group-hover:ring-white/10">
            <Textarea
              placeholder="Ask ClearFrame anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[90px] max-h-[250px] w-full bg-transparent border-0 focus-visible:ring-0 resize-none px-8 py-6 text-xl placeholder:text-white/10 selection:bg-white/10 tracking-tight"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
            />
            
            <div className="flex items-center justify-between px-6 pb-5">
              <div className="flex items-center gap-2">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <Button 
                  variant="ghost" 
                  size="icon-lg" 
                  className="rounded-full w-12 h-12 text-white/30 hover:text-white hover:bg-white/5 transition-all active:scale-90"
                  onClick={() => fileInputRef.current?.click()}
                  type="button"
                >
                  <Plus size={24} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon-lg" 
                  className="rounded-full w-12 h-12 text-white/30 hover:text-white hover:bg-white/5 transition-all active:scale-90"
                  type="button"
                >
                  <ImageIcon size={24} />
                </Button>
              </div>

              <Button 
                size="icon-lg"
                onClick={handleSend}
                disabled={!input.trim() && !image}
                className={cn(
                  "rounded-full w-12 h-12 transition-all duration-700 shadow-2xl",
                  input.trim() || image 
                    ? "bg-white text-black hover:bg-gray-200 scale-100 rotate-0" 
                    : "bg-white/5 text-white/5 cursor-not-allowed scale-90 opacity-40 rotate-12"
                )}
                type="button"
              >
                <SendHorizontal size={22} />
              </Button>
            </div>
          </div>
        </div>
        
        <p className="text-[11px] text-center text-white/10 mt-6 font-semibold tracking-[0.2em] uppercase">
          Precision Extraction by ClearFrame
        </p>
      </div>
    </div>
  )
}