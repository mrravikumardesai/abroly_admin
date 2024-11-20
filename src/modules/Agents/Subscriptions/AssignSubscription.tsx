import React, { useState, useEffect } from 'react';
import { Select, Button, Input, SelectItem } from '@nextui-org/react'; // NextUI components
import axios from 'axios';
import { commonGetAPICalls, commonPostAPICall } from '@/utils/ApiCallUtils';
import { PackageCheck, PackagePlus } from 'lucide-react';
import { Drawer, DrawerContent } from '@/components/ui/drawer';

const AssignSubscription = ({ agentUuid, refreshEvent }) => {
    const [packages, setPackages] = useState<any>([]);
    const [selectedPackage, setSelectedPackage] = useState<any>('');

    useEffect(() => {
        fetchPackages();
    }, []);

    const fetchPackages = async () => {
        const { data, success } = await commonGetAPICalls("/packages/list")
        if (success && success == true) {
            setPackages(data)
        }
    };

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

    // when need to add custom subscription
    const [isCustomOpen, setIsCutomeOpen] = useState(false)
    const [leadLimit, setLeadLimit] = useState('');
    const [teamLimit, setTeamLimit] = useState("")
    const [jobPostLimit, setJobPostLimit] = useState("")
    const [job_post_days, setJobPostDays] = useState("")
    const [achievement_banner, setAchievementBanner] = useState("")

    const onSuccess = async () => {
        const packageData = {
            leadLimit,
            teamLimit,
            jobPostLimit,
            job_post_days,
            agent_uuid: agentUuid,
            achievement_banner
        };

        const { success } = await commonPostAPICall(packageData, "/subscription/custom_assign", true);

        if (success && success === true) {
            refreshEvent()
        }
    };

    return (
        <div className="p-8 w-full max-w-lg">
            <h1 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <PackageCheck className="w-6 h-6 text-green-500" />
                Assign Subscription to Agent
            </h1>

            {/* Select Package Dropdown */}
            <Select
                label="Select Package"
                variant="bordered"
                placeholder="Choose a Package"
                value={selectedPackage}
                className="w-full"
                onChange={(e) => setSelectedPackage(e.target.value)}
            >
                {packages?.map((item) => (
                    <SelectItem key={item.uuid} value={item.uuid}>
                        {item?.name}
                    </SelectItem>
                ))}
            </Select>

            {/* Assign Subscription Button */}
            <Button
                color="primary"
                variant="solid"
                className="mt-6 w-full"
                onClick={assignSubscription}
            >
                Assign Subscription
            </Button>

            {/* Divider */}
            <div className="flex items-center my-4 w-full">
                <hr className="border-t border-gray-300 flex-grow" />
                <span className="mx-2 text-gray-500">or</span>
                <hr className="border-t border-gray-300 flex-grow" />
            </div>

            {/* Assign Custom Subscription Button */}
            <Button
                variant="flat"
                color="success"
                className="w-full flex items-center justify-center gap-2"
                onPress={() => { setIsCutomeOpen(true) }}
            >
                <PackagePlus
                    className="w-5 h-5 text-green-600" />
                Assign Custom Subscription
            </Button>

            <Drawer open={isCustomOpen} onOpenChange={setIsCutomeOpen}>
                <DrawerContent>
                    <div className="p-6 overflow-y-scroll">
                        <h2 className="text-2xl font-bold mb-2">Assign Custom Package</h2>

                        <section className='grid grid-cols-2 gap-2'>

                            <Input
                                placeholder="Lead Limit"
                                label="Lead Limit"
                                type="number"
                                value={leadLimit}
                                onChange={(e) => setLeadLimit(e.target.value)}
                                className="mb-4"
                            />

                            <Input
                                placeholder="Team Limit"
                                label="Team Limit"
                                type="number"
                                value={teamLimit}
                                onChange={(e) => setTeamLimit(e.target.value)}
                                className="mb-4"
                            />

                            <Input
                                placeholder="Job Post Limit"
                                label="Job Post Limit"
                                type="number"
                                value={jobPostLimit}
                                onChange={(e) => setJobPostLimit(e.target.value)}
                                className="mb-4"
                            />

                            <Input
                                placeholder="Job Post Days"
                                label="Job Post Days"
                                type="number"
                                value={job_post_days}
                                onChange={(e) => setJobPostDays(e.target.value)}
                                className="mb-4"
                            />
                            <Input
                                placeholder="Number of Achievements for month"
                                label="Achievement"
                                type="number"
                                value={achievement_banner}
                                onChange={(e) => setAchievementBanner(e.target.value)}
                                className="mb-4"
                            />

                        </section>

                        <Button
                            color='primary'
                            onClick={onSuccess}>
                            Assign Custom Package
                        </Button>
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    );
};

export default AssignSubscription;
