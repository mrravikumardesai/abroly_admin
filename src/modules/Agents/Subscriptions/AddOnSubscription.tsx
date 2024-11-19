import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { commonPostAPICall } from '@/utils/ApiCallUtils';
import { Button, Input, Pagination, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, getKeyValue } from '@nextui-org/react';
import React, { useEffect, useState } from 'react'

const AddOnSubscription = ({ agentUuid, refreshEvent, subscriptionUUID }) => {

    console.log(subscriptionUUID);


    const [addOnListing, setAddOnListing] = useState([])

    const [total, setTotal] = useState(0)
    const [offset, setOffset] = useState(0)

    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        findAddOnes()
    }, [offset])

    const limit = 10

    const findAddOnes = async () => {
        setIsLoading(true)
        const { data, success, total } = await commonPostAPICall({
            agent_uuid: agentUuid,
            offset,
            limit
        }, "/subscription/list_add_on")
        if (success && success == true) {
            setAddOnListing(data)
            setTotal(+total)
        }
        setIsLoading(false)
    }


    const [isCustomOpen, setIsCutomeOpen] = useState(false)
    const [leadLimit, setLeadLimit] = useState('');
    const [teamLimit, setTeamLimit] = useState("")
    const [jobPostLimit, setJobPostLimit] = useState("")
    const [job_post_days, setJobPostDays] = useState("")
    const [addOneLoading, setAddOnLoading] = useState(false)
    const [achievement_banner, setAchievementBanner] = useState("")

    const onSuccess = async () => {
        setAddOnLoading(true)
        const packageData = {
            leadLimit,
            teamLimit,
            jobPostLimit,
            job_post_days,
            agent_uuid: agentUuid,
            subscription_uuid: subscriptionUUID,
            achievement_banner
        };

        const { success } = await commonPostAPICall(packageData, "/subscription/custom_add_on", true);

        if (success && success === true) {
            findAddOnes()
            setLeadLimit("")
            setTeamLimit("")
            setJobPostLimit("")
            setJobPostDays("")
            refreshEvent()
            setIsCutomeOpen(false)
            setAchievementBanner("")
        }
        setAddOnLoading(false)
    };
    return (
        <div>
            {/* add on listing */}
            <Table
                aria-label="Example table with client side pagination"
                topContent={
                    <div className='flex flex-row justify-between items-center'>
                        <h1>Add On</h1>

                        <section className='flex flex-row gap-2'>
                            <Button
                                color='primary'
                                onPress={() => { setIsCutomeOpen(true) }}
                            >Custom Add On</Button>
                        </section>
                    </div>
                }
                bottomContent={
                    <section className='mx-auto'>
                        <Pagination
                            isCompact
                            showControls
                            defaultChecked
                            defaultValue={1}
                            total={Math.ceil(total / limit)}
                            onChange={(value) => {
                                setOffset(value * limit - limit)
                            }}
                        />
                    </section>
                }
            >
                <TableHeader>
                    {/* <TableColumn key="">Profile</TableColumn> */}
                    <TableColumn key="team_member_limit">Extend Team Members </TableColumn>
                    <TableColumn key="leads_remaining">Extend Leads </TableColumn>
                    <TableColumn key="job_post_limit">Extend Limit  (Job Post)</TableColumn>
                    <TableColumn key="job_post_extend_days">Extended Days (Job Post)</TableColumn>
                    <TableColumn key="achievement_banner">Extended Achievement Banners (Job Post)</TableColumn>
                    <TableColumn key="createdAt">Add On Date</TableColumn>
                </TableHeader>
                <TableBody
                    items={addOnListing}
                    emptyContent={"No rows to display."}
                    loadingContent={<Spinner />}
                    isLoading={isLoading}
                >
                    {(item: any) => (
                        <TableRow key={item?.uuid} onClick={(e) => {
                            e.stopPropagation()
                            // navigate(`/agents/${getKeyValue(item, "uuid")}`,)
                        }}
                            className='cursor-pointer'
                        >
                            {(columnKey) => {
                                if (columnKey == "createdAt") {
                                    return <TableCell>{new Date(getKeyValue(item, "createdAt")).toLocaleString()}</TableCell>
                                } else {
                                    return <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                                }
                            }}
                        </TableRow>
                    )}
                </TableBody>
            </Table>


            <Drawer open={isCustomOpen} onOpenChange={setIsCutomeOpen}>
                <DrawerContent>
                    <div className="p-6 overflow-y-scroll">
                        <h2 className="text-2xl font-bold mb-2">Assign Custom Add on</h2>

                        <section className='grid grid-cols-2 gap-2'>

                            <Input
                                placeholder="Extend Lead Limit"
                                label="Extend Lead Limit"
                                type="number"
                                value={leadLimit}
                                onChange={(e) => setLeadLimit(e.target.value)}
                                className="mb-4"
                            />

                            <Input
                                placeholder="Extend Team Limit"
                                label="Extend Team Limit"
                                type="number"
                                value={teamLimit}
                                onChange={(e) => setTeamLimit(e.target.value)}
                                className="mb-4"
                            />

                            <Input
                                placeholder="Extend Job Post Limit"
                                label="Extend Job Post Limit"
                                type="number"
                                value={jobPostLimit}
                                onChange={(e) => setJobPostLimit(e.target.value)}
                                className="mb-4"
                            />

                            <Input
                                placeholder="Extend Job Post Days"
                                label="Extend Job Post Days"
                                type="number"
                                value={job_post_days}
                                onChange={(e) => setJobPostDays(e.target.value)}
                                className="mb-4"
                            />

                            <Input
                                placeholder="Extend Number of Achievements for month"
                                label="Extend Achievement"
                                type="number"
                                value={achievement_banner}
                                onChange={(e) => setAchievementBanner(e.target.value)}
                                className="mb-4"
                            />

                        </section>

                        <Button
                            isLoading={addOneLoading}
                            color='primary'
                            onClick={onSuccess}>
                            Assign Add On
                        </Button>
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    )
}

export default AddOnSubscription