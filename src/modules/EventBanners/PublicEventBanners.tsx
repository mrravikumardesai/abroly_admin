import CommonConfirmation from '@/components/CommonConfirmation'
import { commonGetAPICalls, commonPostAPICall } from '@/utils/ApiCallUtils'
import { Button, Card, CardBody, getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@nextui-org/react'
import { Delete, Edit } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const PublicEventBanners = () => {
    const [eventBannerData, setEventBannerData] = useState([])

    useEffect(() => {
        initDataApiCall()
    }, [])

    const initDataApiCall = async () => {
        const { data, success } = await commonGetAPICalls("/event-banners")
        if (success && success == true) {
            setEventBannerData(data)
        }
    }
    const navigate = useNavigate()


    // delete

    const { isOpen: isDeleteCnfOpen, onOpenChange: onDeleteCnfOpenChange } = useDisclosure();

    const [deleteUUID, setDeleteUUID] = useState("")
    const deleteEventBannerApiCall = async () => {
        const { success } = await commonPostAPICall({}, `event-banners/public-delete-event/${deleteUUID}`, true)
        if (success && success == true) {
            initDataApiCall()
            onDeleteCnfOpenChange()
            setDeleteUUID("")
        }
    }

    const [filterValue, setFilterValue] = useState("")
    const [searchTerm, setSearchTerm] = useState("")

    return (
        <div >

            <div className='flex flex-col sm:flex-row items-start sm:items-center gap-2 justify-between mb-4'>
                <h1 className='flex-grow'>Public Event Banners</h1>
                <select
                    onChange={(e) => {
                        const filterValue = e.target.value;
                        // Implement filter logic here based on filterValue (active/inactive)
                        setFilterValue(filterValue)
                    }}
                    className="border rounded p-2"
                >
                    <option value="">All Event Banners</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>

                <Button
                    color='primary'
                    onClick={() => {
                        navigate("/public_event_banner_create")
                    }}
                >+ Add</Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {eventBannerData.length === 0 ? (
                    <p>No records to display.</p>
                ) : (
                    eventBannerData.map((item) => (
                        <Card key={item?.uuid} className="shadow">
                            <CardBody className="p-4">
                                <h2 className="font-bold">{getKeyValue(item, "heading")}</h2>
                                <p>Start Date: {new Date(getKeyValue(item, "start_date")).toLocaleString()}</p>
                                <p>End Date: {new Date(getKeyValue(item, "end_date")).toLocaleString()}</p>
                                <p>Created At: {new Date(getKeyValue(item, "createdAt")).toLocaleString()}</p>
                                <div className='flex flex-row gap-2 items-center justify-start mt-2'>
                                    <Button
                                        isIconOnly variant='flat'
                                        color='primary'
                                        size='sm'
                                        onPress={() => {
                                            navigate(`/public_event_banner_create/${getKeyValue(item, "uuid")}`)
                                        }}
                                    >
                                        <Edit className='w-4 h-4 text-black dark:text-white' />
                                    </Button>

                                    <Button
                                        isIconOnly
                                        variant='flat'
                                        color='danger'
                                        size='sm'
                                        onPress={() => {
                                            setDeleteUUID(item?.uuid)
                                            onDeleteCnfOpenChange()
                                        }}
                                    >
                                        <Delete className='w-4 h-4' />
                                    </Button>
                                </div>
                            </CardBody>
                        </Card>
                    ))
                )}
            </div>

            <CommonConfirmation
                isOpen={isDeleteCnfOpen}
                onOpenChange={onDeleteCnfOpenChange}
                title={"Are you sure want to delete ?"}
                handleSubmit={() => {
                    deleteEventBannerApiCall()
                }}
                nagativeTitle={"No"}
                positiveTitle={"Yes"}
            />

        </div>
    )
}

export default PublicEventBanners