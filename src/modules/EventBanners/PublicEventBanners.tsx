import { commonGetAPICalls } from '@/utils/ApiCallUtils'
import { Button, getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
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
    return (
        <div >
            <Table
                aria-label="Example table with client side pagination"
                topContent={
                    <div className='flex flex-row justify-between items-center'>
                        <h1>Public Event Banners</h1>
                        <Button
                            color='primary'
                            onClick={() => {
                                navigate("/public_event_banner_create")
                            }}
                        >+ Add</Button>
                    </div>
                }
            >
                <TableHeader>
                    <TableColumn key="heading">Heading</TableColumn>
                    <TableColumn key="start_date">Start Date</TableColumn>
                    <TableColumn key="end_date">End Date</TableColumn>
                    <TableColumn key="createdAt">Created At</TableColumn>
                    <TableColumn key="action">Action</TableColumn>
                </TableHeader>
                <TableBody items={eventBannerData} emptyContent={"No rows to display."}>
                    {(item: any) => (
                        <TableRow key={item?.uuid} onClick={(e) => {
                            e.stopPropagation()
                            // navigate(`/gst_registration_details/${getKeyValue(item, "key")}`)
                        }}
                            className='cursor-pointer'
                        >

                            {(columnKey) => {

                                if (columnKey == "action") {
                                    return <TableCell>
                                        <div className='flex flex-row gap-2 items-center justify-start'>


                                            <Button
                                                isIconOnly variant='flat'
                                                color='primary'
                                                size='sm'
                                                onPress={() => {
                                                    // navigate(`/services_details/${getKeyValue(item, "service_key")}`)
                                                    // setUpdateSimCardDetails({
                                                    //     name: getKeyValue(item, "name"),
                                                    //     details: getKeyValue(item, "details"),
                                                    //     url: getKeyValue(item, "url"),
                                                    //     uuid: getKeyValue(item, "uuid"),
                                                    // })
                                                    // onOpenChangeUpdate()
                                                    navigate(`/public_event_banner_create/${getKeyValue(item, "uuid")}`)
                                                }}
                                            >
                                                <MdEdit className='w-4 h-4 text-black dark:text-white' />
                                            </Button>

                                            <Button
                                                isIconOnly
                                                variant='flat'
                                                color='danger'
                                                size='sm'
                                                onPress={() => {
                                                    // navigate(`/services_details/${getKeyValue(item, "service_key")}`)
                                                    // setDeleteUUID(getKeyValue(item, "uuid"))
                                                    // onDeleteCnfOpenChange()
                                                }}
                                            >
                                                <MdDelete className='w-4 h-4' />
                                            </Button>

                                        </div>
                                    </TableCell>
                                } else if (columnKey == "createdAt") {
                                    return <TableCell>{new Date(getKeyValue(item, "createdAt")).toLocaleString()}</TableCell>
                                } else {
                                    return <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                                }
                            }
                            }
                        </TableRow>
                    )}
                </TableBody>
            </Table>

        </div>
    )
}

export default PublicEventBanners