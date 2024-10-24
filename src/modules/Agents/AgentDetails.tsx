import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation, useParams } from 'react-router-dom'
import ActiveSubscription from './Subscriptions/ActiveSubscription'
import { Card, CardBody, Tab, Tabs } from '@nextui-org/react'
import { commonGetAPICalls } from '@/utils/ApiCallUtils'
import AddOnSubscription from './Subscriptions/AddOnSubscription'
import AgentProfile from './Profile/AgentProfile'

const AgentDetails = () => {

  const { id } = useParams()

  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    fetchSubscription();
  }, [id]);

  const fetchSubscription = async () => {
    const { data, success } = await commonGetAPICalls(`/subscription/agent/${id}`)
    if (success && success == true) {
      setSubscription(data)
    }
  };

  let tabs = [
    {
      id: "profile",
      label: "Profile",
      content: <AgentProfile agentUuid={id}/>
    },
    {
      id: "subscription",
      label: "Subscription",
      content: <ActiveSubscription agentUuid={id} />
    },
    {
      id: "addon",
      label: "Add On",
      content: <AddOnSubscription agentUuid={id} refreshEvent={() => { }} subscriptionUUID={subscription?.uuid} />
    },
  ];

  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Dynamic tabs" items={tabs}>
        {(item) => (
          <Tab key={item.id} title={item.label}>
            <Card>
              <CardBody>
                {item.content}
              </CardBody>
            </Card>
          </Tab>
        )}
      </Tabs>
    </div>
  )
}

export default AgentDetails