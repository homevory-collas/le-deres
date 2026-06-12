'use client'
import { ConversationList, MessageThread, PLACEHOLDER_CONVERSATIONS, PLACEHOLDER_MESSAGES } from '@/components/community/Messaging'

interface Props { params: { conversationId: string } }

export default function ConversationPage({ params }: Props) {
  const conv = PLACEHOLDER_CONVERSATIONS.find(c => c.id === params.conversationId)
  return (
    <div className="container-wide" style={{height:'calc(100vh - 64px)'}}>
      <div className="grid lg:grid-cols-[320px_1fr] h-full border-x border-border">
        <ConversationList conversations={PLACEHOLDER_CONVERSATIONS} activeId={params.conversationId} onSelect={()=>{}} className="hidden lg:flex flex-col"/>
        <MessageThread conversation={conv} messages={conv ? PLACEHOLDER_MESSAGES : []} className="flex flex-col h-full"/>
      </div>
    </div>
  )
}
