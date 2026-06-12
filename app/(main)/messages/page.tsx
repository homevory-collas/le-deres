'use client'
import * as React from 'react'
import { ConversationList, MessageThread, PLACEHOLDER_CONVERSATIONS, PLACEHOLDER_MESSAGES } from '@/components/community/Messaging'

export default function MessagesPage() {
  const [activeId, setActiveId] = React.useState<string | undefined>(undefined)
  const active = PLACEHOLDER_CONVERSATIONS.find(c => c.id === activeId)
  return (
    <div className="container-wide" style={{height:'calc(100vh - 64px)'}}>
      <div className="grid lg:grid-cols-[320px_1fr] h-full border-x border-border">
        <ConversationList
          conversations={PLACEHOLDER_CONVERSATIONS}
          activeId={activeId}
          onSelect={setActiveId}
          className={activeId ? 'hidden lg:flex flex-col' : 'flex flex-col'}
        />
        <MessageThread
          conversation={active}
          messages={active ? PLACEHOLDER_MESSAGES : []}
          onBack={() => setActiveId(undefined)}
          className="flex flex-col h-full"
        />
      </div>
    </div>
  )
}
