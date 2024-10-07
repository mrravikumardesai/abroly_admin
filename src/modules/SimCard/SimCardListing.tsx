import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Textarea, getKeyValue, useDisclosure } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'

import { MdDelete, MdEdit } from 'react-icons/md'
import { commonGetAPICalls, commonPostAPICall } from '../../utils/ApiCallUtils'
import CommonConfirmation from '../../components/CommonConfirmation'

const SimCardListing = () => {
    const [simCardData, setSimCardData] = useState([])

    useEffect(() => {
        initDataApiCall()
    }, [])

    const initDataApiCall = async () => {
        const { data, success } = await commonGetAPICalls("/sim/list")
        if (success && success == true) {
            setSimCardData(data)
        }

    }

    // add 
    const { isOpen: isOpenAdd, onOpenChange: onOpenChangeAdd } = useDisclosure();
    const [addCardDetails, setAddCardDetails] = useState({
        name: "",
        details: "",
        url: ""
    })
    const addApiCall = async () => {
        const { success } = await commonPostAPICall({ name: addCardDetails.name, details: addCardDetails.details, url: addCardDetails.url }, "sim/add", true)
        if (success && success == true) {
            initDataApiCall()
            onOpenChangeAdd()
            setAddCardDetails({
                name: "",
                details: "",
                url: ""
            })
        }
    }
    // update 
    const { isOpen: isOpenUpdate, onOpenChange: onOpenChangeUpdate } = useDisclosure();
    const [updateSimCardDetails, setUpdateSimCardDetails] = useState({
        name: "",
        details: "",
        url: "",
        uuid: ""
    })
    const updateSimCardApiCall = async () => {
        const { success } = await commonPostAPICall({ 
            name: updateSimCardDetails.name, 
            details: updateSimCardDetails.details, 
            url: updateSimCardDetails.url, 
            uuid: updateSimCardDetails.uuid 
        }, "sim/update", true)
        if (success && success == true) {
            initDataApiCall()
            onOpenChangeUpdate()
            setUpdateSimCardDetails({
                name: "",
                details: "",
                url: "",
                uuid: ""
            })
        }
    }
    // delete

    const { isOpen: isDeleteCnfOpen, onOpenChange: onDeleteCnfOpenChange } = useDisclosure();

    const [deleteUUID, setDeleteUUID] = useState("")
    const deleteFaqApiCall = async () => {
        const { success } = await commonPostAPICall({ uuid: deleteUUID }, "sim/delete", true)
        if (success && success == true) {
            initDataApiCall()
            onDeleteCnfOpenChange()
            setDeleteUUID("")
        }
    }

    return (
        <div className='container mx-auto my-10'>
            <Table
                aria-label="Example table with client side pagination"
                topContent={
                    <div className='flex flex-row justify-between items-center'>
                        <h1>Simcard Options</h1>
                        <Button
                            color='primary'
                            onPress={onOpenChangeAdd}
                        >+ Card</Button>
                    </div>
                }
            >
                <TableHeader>
                    <TableColumn key="name">Title</TableColumn>
                    <TableColumn key="details">Details</TableColumn>
                    <TableColumn key="url">URL</TableColumn>
                    <TableColumn key="createdAt">Create At</TableColumn>
                    <TableColumn key="action">Action</TableColumn>
                </TableHeader>
                <TableBody items={simCardData} emptyContent={"No rows to display."}>
                    {(item: any) => (
                        <TableRow key={item?.key} onClick={(e) => {
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
                                                    setUpdateSimCardDetails({
                                                        name: getKeyValue(item, "name"),
                                                        details: getKeyValue(item, "details"),
                                                        url: getKeyValue(item, "url"),
                                                        uuid: getKeyValue(item, "uuid"),
                                                    })
                                                    onOpenChangeUpdate()
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
                                                    setDeleteUUID(getKeyValue(item, "uuid"))
                                                    onDeleteCnfOpenChange()
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

            {/* add card */}
            <Modal
                isOpen={isOpenAdd}
                onOpenChange={onOpenChangeAdd}
                scrollBehavior="inside"
                backdrop='blur'
                size='3xl'
                placement="center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Add Sim Card Details
                            </ModalHeader>
                            <ModalBody>
                                <Input
                                    value={addCardDetails.name}
                                    label="Name"
                                    onChange={(e) => {
                                        setAddCardDetails({
                                            ...addCardDetails,
                                            name: e.target.value
                                        })
                                    }}
                                />
                                <Textarea
                                    value={addCardDetails.details}
                                    label="Details"
                                    onChange={(e) => {
                                        setAddCardDetails({
                                            ...addCardDetails,
                                            details: e.target.value
                                        })
                                    }}
                                />
                                <Input
                                    value={addCardDetails.url}
                                    label="Url"
                                    onChange={(e) => {
                                        setAddCardDetails({
                                            ...addCardDetails,
                                            url: e.target.value
                                        })
                                    }}
                                />

                                <Button
                                    type="submit"
                                    className='self-center'
                                    color="primary"
                                    onPress={() => {
                                        addApiCall()
                                    }}>
                                    Add
                                </Button>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
            {/* update title */}
            <Modal
                isOpen={isOpenUpdate}
                onOpenChange={onOpenChangeUpdate}
                scrollBehavior="inside"
                backdrop='blur'
                size='3xl'
                placement="center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Update Sim Details
                            </ModalHeader>
                            <ModalBody>
                                <Input
                                    value={updateSimCardDetails.name}
                                    label="Name"
                                    onChange={(e) => {
                                        setUpdateSimCardDetails({
                                            ...updateSimCardDetails,
                                            name: e.target.value
                                        })
                                    }}
                                />
                                <Textarea
                                    value={updateSimCardDetails.details}
                                    label="Details"
                                    onChange={(e) => {
                                        setUpdateSimCardDetails({
                                            ...updateSimCardDetails,
                                            details: e.target.value
                                        })
                                    }}
                                />
                                <Input
                                    value={updateSimCardDetails.url}
                                    label="Url"
                                    onChange={(e) => {
                                        setUpdateSimCardDetails({
                                            ...updateSimCardDetails,
                                            url: e.target.value
                                        })
                                    }}
                                />

                                <Button
                                    type="submit"
                                    className='self-center'
                                    color="primary"
                                    onPress={() => {
                                        updateSimCardApiCall()
                                    }}>
                                    Update
                                </Button>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>


            <CommonConfirmation
                isOpen={isDeleteCnfOpen}
                onOpenChange={onDeleteCnfOpenChange}
                title={"Are you sure want to delete ?"}
                handleSubmit={() => {
                    deleteFaqApiCall()
                }}
                nagativeTitle={"No"}
                positiveTitle={"Yes"}
            />
        </div>
    )
}

export default SimCardListing