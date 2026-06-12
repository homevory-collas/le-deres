'use client'
import * as React from 'react'
import { Send, Settings } from 'lucide-react'
import { AI_CHARACTERS } from '@/services/ai'

interface Props { params: { character: string } }

export default function AICharacterPage({ params }: Props) {
  const char = AI_CHARACTERS.find(c=>c.id===params.character) ?? AI_CHARACTERS[0]
  const [messages, setMessages] = React.useState([
    {role:'assistant' as const, content:`Hi! I'm ${char.name}. ${char.description}. How can I connect with you today? 💕`}
  ])
  const [input, setInput] = React.useState('')

  function send() {
    if (!input.trim()) return
    const userMsg = {role:'user' as const, content:input}
    setMessages(m=>[...m, userMsg, {role:'assistant',content:`[${char.name}] This is a placeholder response — connect an AI provider to enable real conversations.`}])
    setInput('')
  }

  return (
    <div className="container-narrow" style={{height:'calc(100vh - 64px)'}}>
      <div className="flex flex-col h-full border-x border-border">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-medium">{char.name[0]}</div>
          <div><p className="font-medium">{char.name}</p><p className="text-xs text-green-500">Online</p></div>
          <button className="ml-auto text-muted-foreground hover:text-foreground"><Settings size={16}/></button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((m,i)=>(
            <div key={i} className={`flex gap-2.5 ${m.role==='user'?'flex-row-reverse':''}`}>
              {m.role==='assistant'&&<div className="w-7 h-7 rounded-full bg-muted flex-shrink-0 flex items-center justify-center text-[10px]">{char.name[0]}</div>}
              <div className={`max-w-xs px-4 py-2.5 text-sm rounded-sm ${m.role==='user'?'bg-foreground text-background':'bg-muted text-foreground'}`}>
                {m.content}
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-border px-4 py-3 flex gap-3">
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder={`Message ${char.name}…`} className="flex-1 bg-muted px-4 py-2.5 text-sm focus:outline-none"/>
          <button onClick={send} disabled={!input.trim()} className="w-9 h-9 bg-foreground text-background flex items-center justify-center disabled:opacity-40"><Send size={14}/></button>
        </div>
      </div>
    </div>
  )
}
