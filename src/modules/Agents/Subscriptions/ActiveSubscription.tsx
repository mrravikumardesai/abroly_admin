import React, { useEffect, useState } from 'react';
import { Card, Button, CardHeader, CardBody, CardFooter, Tooltip, Input, Spinner } from '@nextui-org/react'; // NextUI component
import axios from 'axios';
import { commonGetAPICalls, commonPostAPICall } from '@/utils/ApiCallUtils';
import AssignSubscription from './AssignSubscription';
import { Briefcase, Calendar, FileText, TrendingUp, Users } from 'lucide-react';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import AddOnSubscription from './AddOnSubscription';
import { useParams } from 'react-router-dom';

const ActiveSubscription = ({ agentUuid, refreshEvent }) => {


    const [subscription, setSubscription] = useState(null);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchSubscription();
    }, [agentUuid]);

    const fetchSubscription = async () => {
        setIsLoading(true)
        const { data, success } = await commonGetAPICalls(`/subscription/agent/${agentUuid}`)
        if (success && success == true) {
            setSubscription(data)
        }
        setIsLoading(false)
    };


    return (
        <>
            <Card>
                <CardHeader>
                    <h3 className="text-xl font-medium  text-center w-full">Active Subscription</h3>
                </CardHeader>
                <CardBody>
                    {isLoading ? <Spinner /> : subscription ? (
                        <div className="space-y-6 px-6 pb-6">
                            {/* Package Title */}
                            <div className="flex items-center justify-between">
                                <h1 className="text-xl font-semibold text-gray-900">
                                    {subscription?.Package?.name || "Custom Package"}
                                </h1>
                                <TrendingUp className="text-purple-500 w-6 h-6" />
                            </div>

                            {/* Subscription Dates */}
                            <div className="flex items-center space-x-4">
                                <Calendar className="text-blue-500 w-6 h-6" />
                                <p className="text-gray-700">
                                    <span className="font-medium">Subscription Start:</span> {new Date(subscription?.subscription_start_date).toLocaleDateString()}
                                </p>
                                <Tooltip content="The start date of your current subscription" placement="top">
                                    <Calendar className="text-gray-500 w-5 h-5 cursor-pointer" />
                                </Tooltip>
                            </div>

                            {/* Job Posting Duration */}
                            <div className="flex items-center space-x-4">
                                <Briefcase className="text-green-500 w-6 h-6" />
                                <p className="text-gray-700">
                                    <span className="font-medium">Job Post Period:</span> {new Date(subscription?.job_post_start_date).toLocaleDateString()} - {new Date(subscription?.job_post_end_date).toLocaleDateString()}
                                </p>
                                <Tooltip content="Duration during which you can post jobs" placement="top">
                                    <Briefcase className="text-gray-500 w-5 h-5 cursor-pointer" />
                                </Tooltip>
                            </div>

                            {/* Job Post Limit */}
                            <div className="flex items-center space-x-4">
                                <FileText className="text-indigo-500 w-6 h-6" />
                                <p className="text-gray-700">
                                    <span className="font-medium">Remaining Job Posts:</span> {subscription?.job_post_limit}
                                </p>
                                <Tooltip content="The number of job posts you can still make during this subscription" placement="top">
                                    <FileText className="text-gray-500 w-5 h-5 cursor-pointer" />
                                </Tooltip>
                            </div>

                            {/* Leads Remaining */}
                            <div className="flex items-center space-x-4">
                                <TrendingUp className="text-yellow-500 w-6 h-6" />
                                <p className="text-gray-700">
                                    <span className="font-medium">Leads Remaining:</span> {subscription?.leads_remaining}
                                </p>
                                <Tooltip content="The number of leads remaining in your current package" placement="top">
                                    <TrendingUp className="text-gray-500 w-5 h-5 cursor-pointer" />
                                </Tooltip>
                            </div>

                            {/* Team Member Limit */}
                            <div className="flex items-center space-x-4">
                                <Users className="text-pink-500 w-6 h-6" />
                                <p className="text-gray-700">
                                    <span className="font-medium">Team Member Limit:</span> {subscription?.team_member_limit}
                                </p>
                                <Tooltip content="Maximum number of team members allowed in this subscription" placement="top">
                                    <Users className="text-gray-500 w-5 h-5 cursor-pointer" />
                                </Tooltip>
                            </div>
                        </div>

                    ) : (
                        <section className='flex flex-col items-center'>
                            <p className='text-center text-gray-500'>No active subscription found.</p>
                            <AssignSubscription agentUuid={agentUuid} refreshEvent={() => {
                                fetchSubscription()
                                refreshEvent()
                            }} />
                        </section>
                    )}
                </CardBody>
            </Card>
            {/* drawer */}
        </>
    );
};

export default ActiveSubscription;
