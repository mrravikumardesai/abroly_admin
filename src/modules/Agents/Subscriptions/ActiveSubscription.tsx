import React, { useEffect, useState } from 'react';
import { Card, Button, CardHeader, CardBody, CardFooter } from '@nextui-org/react'; // NextUI component
import axios from 'axios';
import { commonGetAPICalls, commonPostAPICall } from '@/utils/ApiCallUtils';
import AssignSubscription from './AssignSubscription';

const ActiveSubscription = ({ agentUuid }) => {
    const [subscription, setSubscription] = useState(null);

    useEffect(() => {
        const fetchSubscription = async () => {
            const { data, success } = await commonGetAPICalls(`subscription/agennt/${agentUuid}`)
            if (success && success == true) {
                setSubscription(data)
            }
        };

        fetchSubscription();
    }, [agentUuid]);

    return (
        <Card>
            <CardHeader>
                <h3 className="text-xl font-bold">Active Subscription</h3>
            </CardHeader>
            {subscription ? (
                <CardBody>
                    <p>Package: {subscription.packageName}</p>
                    <p>Lead Limit: {subscription.leadLimit}</p>
                    <p>Team Members: {subscription.teamLimit}</p>
                    <p>Expiry: {new Date(subscription.expiryDate).toLocaleDateString()}</p>
                </CardBody>
            ) : (
                <>
                    <p>No active subscription found.</p>
                    <AssignSubscription agentUuid={agentUuid} /></>
            )}
            <CardFooter>
                {/* <Button icon={<LucideIcon name="refresh" />} onClick={() => window.location.reload()}>
          Refresh
        </Button> */}
            </CardFooter>
        </Card>
    );
};

export default ActiveSubscription;
