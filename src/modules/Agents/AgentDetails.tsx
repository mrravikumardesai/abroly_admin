import React from 'react'
import { useParams } from 'react-router-dom'
import ActiveSubscription from './Subscriptions/ActiveSubscription'

const AgentDetails = () => {
    const {id} = useParams()
  return (
    <div>

      {/* active subscription */}
      <ActiveSubscription agentUuid={id} />

    </div>
  )
}

export default AgentDetails