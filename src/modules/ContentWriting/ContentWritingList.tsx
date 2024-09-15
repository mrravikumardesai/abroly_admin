import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Textarea, getKeyValue, useDisclosure } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'

import { MdDelete, MdEdit } from 'react-icons/md'
import { commonGetAPICalls, commonPostAPICall } from '../../utils/ApiCallUtils'
import CommonConfirmation from '../../components/CommonConfirmation'

const ContentWritingList = () => {
    const [contentWritingData, setContentWritingData] = useState([])

    useEffect(() => {
        initDataApiCall()
    }, [])

    const initDataApiCall = async () => {
        const { data, success } = await commonGetAPICalls("/content_writing/list")
        if (success && success == true) {
            setContentWritingData(data)
        }

    }

    // update 
    const { isOpen: isUpdateFaqOpen, onOpenChange: onUpdateFaqOpenChange } = useDisclosure();
    const [updateTitleDesc, setUpdateTitleDescription] = useState({
        name: "",
        description: "",
        key: ""
    })
    const updateFaqApiCall = async () => {
        const { success } = await commonPostAPICall({ name: updateTitleDesc.name, description: updateTitleDesc.description, key: updateTitleDesc.key }, "content_writing/update", true)
        if (success && success == true) {
            initDataApiCall()
            onUpdateFaqOpenChange()
            setUpdateTitleDescription({
                name: "",
                description: "",
                key: ""
            })
        }
    }

    return (
        <div className='container mx-auto my-10'>
            <Table
                aria-label="Example table with client side pagination"
                topContent={
                    <div className='flex flex-row justify-between items-center'>
                        <h1>Content Writing {">"} Title And Descriptions</h1>

                    </div>
                }
            >
                <TableHeader>
                    <TableColumn key="name">Title</TableColumn>
                    <TableColumn key="description">Description</TableColumn>
                    <TableColumn key="createdAt">Create At</TableColumn>
                    <TableColumn key="action">Action</TableColumn>
                </TableHeader>
                <TableBody items={contentWritingData} emptyContent={"No rows to display."}>
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
                                                    setUpdateTitleDescription({
                                                        name: getKeyValue(item, "name"),
                                                        description: getKeyValue(item, "description"),
                                                        key: getKeyValue(item, "key")
                                                    })
                                                    onUpdateFaqOpenChange()

                                                }}
                                            >
                                                <MdEdit className='w-4 h-4' />
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

            {/* update title */}
            <Modal
                isOpen={isUpdateFaqOpen}
                onOpenChange={onUpdateFaqOpenChange}
                scrollBehavior="inside"
                backdrop='blur'
                size='3xl'
                placement="center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Update FAQ
                            </ModalHeader>
                            <ModalBody>
                                <Input
                                    value={updateTitleDesc.name}
                                    label="Question"
                                    onChange={(e) => {
                                        setUpdateTitleDescription({
                                            ...updateTitleDesc,
                                            name: e.target.value
                                        })
                                    }}
                                />
                                <Textarea
                                    value={updateTitleDesc.description}
                                    label="Answer"
                                    onChange={(e) => {
                                        setUpdateTitleDescription({
                                            ...updateTitleDesc,
                                            description: e.target.value
                                        })
                                    }}
                                />

                                <Button
                                    type="submit"
                                    className='self-center'
                                    color="primary"
                                    onPress={() => {
                                        updateFaqApiCall()
                                    }}>
                                    Update
                                </Button>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}

export default ContentWritingList