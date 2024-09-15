import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Textarea, getKeyValue, useDisclosure } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'

import { MdDelete, MdEdit } from 'react-icons/md'
import { commonGetAPICalls, commonPostAPICall } from '../../utils/ApiCallUtils'
import CommonConfirmation from '../../components/CommonConfirmation'

const FAQs = () => {
    const [faqs, setFaqs] = useState([])

    useEffect(() => {
        initDataApiCall()
    }, [])

    const initDataApiCall = async () => {
        const { data, success } = await commonGetAPICalls("/faq/list")
        if (success && success == true) {
            setFaqs(data)
        }

    }

    // create visa type
    const { isOpen: isAddFaqOpen, onOpenChange: onAddFaqOpenChange } = useDisclosure();
    const [faq, setFaq] = useState({
        question: "",
        answer: ""
    })

    const addFaqApiCall = async () => {
        const { data, success } = await commonPostAPICall({ question: faq.question, answer: faq.answer }, "faq/add", true)
        if (success && success == true) {
            initDataApiCall()
            onAddFaqOpenChange()
            setFaq({
                question: "",
                answer: ""
            })
        }
    }
    // update 
    const { isOpen: isUpdateFaqOpen, onOpenChange: onUpdateFaqOpenChange } = useDisclosure();
    const [updateFaq, setUpdateFaq] = useState({
        question: "",
        answer:"",
        uuid: ""
    })
    const updateFaqApiCall = async () => {
        const { success } = await commonPostAPICall({ question: updateFaq.question, answer: updateFaq.answer, uuid: updateFaq.uuid }, "faq/update", true)
        if (success && success == true) {
            initDataApiCall()
            onUpdateFaqOpenChange()
            setUpdateFaq({
                question: "",
                answer:"",
                uuid: ""
            })
        }
    }

    // delete 
    const { isOpen: isDeleteCnfOpen, onOpenChange: onDeleteCnfOpenChange } = useDisclosure();

    const [deleteUUID, setDeleteUUID] = useState("")
    const deleteFaqApiCall = async () => {
        const { success } = await commonPostAPICall({ uuid: deleteUUID }, "faq/delete", true)
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
                         <h1>Frequently Asked Questions</h1>
                        <section className='flex flex-row gap-2'>
                           
                            <Button
                                variant='flat'
                                color='primary'
                                onPress={() => {
                                    onAddFaqOpenChange()
                                }}
                            >
                                Add FAQ
                            </Button>
                        </section>
                    </div>
                }
            >
                <TableHeader>
                    <TableColumn key="question">Question</TableColumn>
                    <TableColumn key="answer">Answer</TableColumn>
                    <TableColumn key="createdAt">Create At</TableColumn>
                    <TableColumn key="action">Action</TableColumn>
                </TableHeader>
                <TableBody items={faqs} emptyContent={"No rows to display."}>
                    {(item: any) => (
                        <TableRow key={item?.uuid} onClick={(e) => {
                            e.stopPropagation()
                            // navigate(`/gst_registration_details/${getKeyValue(item, "uuid")}`)
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
                                                    setUpdateFaq({
                                                        question: getKeyValue(item, "question"),
                                                        answer: getKeyValue(item, "answer"),
                                                        uuid: getKeyValue(item, "uuid")
                                                    })
                                                    onUpdateFaqOpenChange()

                                                }}
                                            >
                                                <MdEdit className='w-4 h-4' />
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
                                    value={updateFaq.question}
                                    label="Question"
                                    onChange={(e) => {
                                        setUpdateFaq({
                                            ...updateFaq,
                                            question: e.target.value
                                        })
                                    }}
                                />
                                <Textarea
                                    value={updateFaq.answer}
                                    label="Answer"
                                    onChange={(e) => {
                                        setUpdateFaq({
                                            ...updateFaq,
                                            answer: e.target.value
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


            <Modal
                isOpen={isAddFaqOpen}
                onOpenChange={onAddFaqOpenChange}
                scrollBehavior="inside"
                backdrop='blur'
                size='3xl'
                placement="center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Add FAQ
                            </ModalHeader>
                            <ModalBody>
                                <Input
                                    value={faq.question}
                                    label="Question"
                                    onChange={(e) => {
                                        setFaq({
                                            ...faq,
                                            question:e.target.value
                                        })
                                    }}
                                    variant="flat"
                                />
                                <Textarea 
                                 value={faq.answer}
                                 label="Answer"
                                 onChange={(e) => {
                                     setFaq({
                                         ...faq,
                                         answer:e.target.value
                                     })
                                 }}
                                 variant="flat"
                                />

                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    type="submit"
                                    color="primary"
                                    onPress={() => {
                                        addFaqApiCall()
                                    }}>
                                    Add
                                </Button>
                            </ModalFooter>
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

export default FAQs