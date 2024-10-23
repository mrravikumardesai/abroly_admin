import React, { useEffect, useState } from 'react';
import { Card, Button, CardHeader, CardBody, CardFooter } from '@nextui-org/react'; // NextUI component
import axios from 'axios';
import { commonGetAPICalls, commonPostAPICall } from '@/utils/ApiCallUtils';
import AssignSubscription from './AssignSubscription';

const ActiveSubscription = ({ agentUuid }) => {
    const [subscription, setSubscription] = useState(null);

    useEffect(() => {
        fetchSubscription();
    }, [agentUuid]);

    const fetchSubscription = async () => {
        const { data, success } = await commonGetAPICalls(`/subscription/agent/${agentUuid}`)
        if (success && success == true) {
            setSubscription(data)
        }
    };

    return (
        <Card>
            <CardHeader>
                <h3 className="text-xl font-bold">Active Subscription</h3>
            </CardHeader>
            <CardBody>
                {subscription ? (
                    <>
                        <p>Package: {subscription?.Package?.name}</p>
                        <p>Lead Limit: {subscription.leads_remaining}</p>
                        <p>Start From: {new Date(subscription.subscription_start_date).toLocaleDateString()}</p>
                    </>
                ) : (
                    <>
                        <p>No active subscription found.</p>
                        <AssignSubscription agentUuid={agentUuid} refreshEvent={fetchSubscription} />
                    </>
                )}
            </CardBody>
            <CardFooter>
                {/* <Button icon={<LucideIcon name="refresh" />} onClick={() => window.location.reload()}>
          Refresh
        </Button> */}
            </CardFooter>
        </Card>
    );
};

export default ActiveSubscription;
