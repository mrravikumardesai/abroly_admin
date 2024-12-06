import CommonConfirmation from '@/components/CommonConfirmation'
import { commonGetAPICalls, commonPostAPICall } from '@/utils/ApiCallUtils'
import { Button, Card, CardBody, CardFooter, getKeyValue, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@nextui-org/react'
import { Delete, Edit, Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { Carousel } from 'rsuite'
import 'rsuite/Carousel/styles/index.css';

const PublicEventBanners = () => {
    const [filterValue, setFilterValue] = useState("current")
    const [eventBannerData, setEventBannerData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        initDataApiCall()
    }, [filterValue])

    const initDataApiCall = async () => {
        setIsLoading(true)
        const { data, success } = await commonGetAPICalls(`/event-banners/public-list?flag=${filterValue}`)
        if (success && success == true) {
            setEventBannerData(data)
        }
        setIsLoading(false)
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


    return (
        <div className='container mx-auto'>

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
                    <option value="current">Active</option>
                    <option value="past">Past</option>
                </select>

                <Button
                    color='primary'
                    onClick={() => {
                        navigate("/public_event_banner_create")
                    }}
                >+ Add</Button>
            </div>
            {isLoading ? (
                <div className='flex flex-row items-center justify-center w-full h-full'>
                    <Spinner className='w-4 h-4 animate-spin' />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4">
                    {eventBannerData.length === 0 ? (
                        <p>No records to display.</p>
                    ) : (
                        eventBannerData.map((item) => (
                            <Card key={item?.uuid} className="shadow">
                                <CardBody className="overflow-visible p-0">
                                    {item?.images && item.images.length > 0 && (
                                        <Carousel autoplay className="custom-slider aspect-video h-fit w-fit" >
                                            {item.images.map((image, index) => (
                                                <img key={image?.uuid} src={image?.url} alt={`Event Banner ${index}`} className="w-fit h-auto object-center aspect-video" />
                                            ))}
                                        </Carousel>
                                    )}
                                </CardBody>
                                <CardFooter className="p-4 flex flex-col gap-2 items-start justify-start">
                                    <h2 className="font-bold">{item?.heading}</h2>
                                    <hr className='w-full' />
                                    <div dangerouslySetInnerHTML={{ __html: item?.descriptive_text }} />
                                    <hr className='w-full' />
                                    <div className='flex flex-row gap-2 items-center justify-between text-sm w-full'>
                                        <p>Start : {new Date(item?.start_date).toDateString()}</p>
                                        <p>End : {new Date(item?.end_date).toDateString()}</p>
                                    </div>
                                    <p className='text-sm'>Created At: {new Date(item?.createdAt).toLocaleString()}</p>
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
                                            <Trash className='w-4 h-4' />
                                        </Button>
                                    </div>
                                </CardFooter>
                            </Card>
                        ))
                    )}
                </div>
            )}

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