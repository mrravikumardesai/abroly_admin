import React, { useState, useEffect } from 'react';
import { Select, Button, Input, SelectItem } from '@nextui-org/react'; // NextUI components
import axios from 'axios';
import { commonGetAPICalls, commonPostAPICall } from '@/utils/ApiCallUtils';

const AssignSubscription = ({ agentUuid,refreshEvent }) => {
    const [packages, setPackages] = useState<any>([]);
    const [selectedPackage, setSelectedPackage] = useState<any>('');

    useEffect(() => {
        const fetchPackages = async () => {
            const { data, success } = await commonGetAPICalls("/packages/list")
            if (success && success == true) {
                setPackages(data)
            }
        };
        fetchPackages();
    }, []);

    const assignSubscription = async () => {
        try {
            const {
                success
            } = await commonPostAPICall({
                agent_uuid: agentUuid, package_uuid: selectedPackage
            }, "/subscription/add")
            if (success && success == true) {
                refreshEvent()
            }
        } catch (error) {
            console.error("Error assigning subscription", error);
        }
    };

    return (
        <div className="mt-6 flex flex-col items-start gap-2">
            <h1 className="text-xl font-bold">Assign Subscription to Agent</h1>
            <Select
                label="Select Package"
                variant="bordered"
                placeholder="Select Package"
                value={selectedPackage}
                className="max-w-xs"
                onChange={(e)=>{
                    setSelectedPackage(e.target.value)
                }}
            >
                {packages?.map((item) => (
                    <SelectItem key={item.uuid}>
                        {item?.name}
                    </SelectItem>
                ))}
            </Select>
            <Button onClick={assignSubscription}>Assign Subscription</Button>
        </div>
    );
};

export default AssignSubscription;
