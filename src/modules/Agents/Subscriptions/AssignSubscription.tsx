import React, { useState, useEffect } from 'react';
import { Select, Button, Input, SelectItem } from '@nextui-org/react'; // NextUI components
import axios from 'axios';
import { commonGetAPICalls } from '@/utils/ApiCallUtils';

const AssignSubscription = ({ agentUuid }) => {
    const [packages, setPackages] = useState<any>([]);
    const [selectedPackage, setSelectedPackage] = useState<any>('');
    const [expiryDate, setExpiryDate] = useState<any>('');

    useEffect(() => {
        const fetchPackages = async () => {
            // try {
            //     const response = await axios.get('/api/packages');
            //     setPackages(response.data.data);
            // } catch (error) {
            //     console.error("Error fetching packages", error);
            // }
            const {data,success} = await commonGetAPICalls("/packages/list")
            if(success && success == true){
                setPackages(data)
            }
        };

        fetchPackages();
    }, []);

    const assignSubscription = async () => {
        try {
            await axios.post('/api/subscription/assign', {
                agentUuid,
                packageUuid: selectedPackage,
                expiryDate,
            });
            alert("Subscription Assigned");
        } catch (error) {
            console.error("Error assigning subscription", error);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold">Assign Subscription to Agent</h2>
            {/* <Select
        placeholder="Select Package"
        onChange={setSelectedPackage}
        // options={packages.map((pkg:any) => ({ label: pkg.name, value: pkg.uuid }))}
        className="mb-4"
      /> */}
            <Select
                label="Select Package"
                variant="bordered"
                placeholder="Select Package"
                value={selectedPackage}
                className="max-w-xs"
                onChange={setSelectedPackage}
            >
                {packages?.map((item) => (
                    <SelectItem key={item}>
                        {JSON.stringify(item)}
                    </SelectItem>
                ))}
            </Select>
            {/* <Input
        placeholder="Expiry Date"
        type="date"
        value={expiryDate}
        onChange={(e) => setExpiryDate(e.target.value)}
        className="mb-4"
      /> */}
            <Button onClick={assignSubscription}>Assign Subscription</Button>
        </div>
    );
};

export default AssignSubscription;
