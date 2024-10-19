import { commonPostAPICall } from '@/utils/ApiCallUtils'
import { Avatar, Button, Input, Modal, ModalBody, ModalContent, ModalHeader, Pagination, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, getKeyValue, useDisclosure } from '@nextui-org/react'
import { Edit, Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Students = () => {

    const [agentsListing, setAgentListing] = useState([])

    const [search, setSearch] = useState("")

    const [total, setTotal] = useState(0)
    const [offset, setOffset] = useState(0)

    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        findAgents()
    }, [offset])

    useEffect(() => {
        const timeout = setTimeout(() => {
            findAgents()
        }, 500)
        return () => clearTimeout(timeout)
    }, [search])

    const findAgents = async () => {

        setIsLoading(true)
        const { data, success, total } = await commonPostAPICall({
            search,
            offset,
        }, "/student/list")
        if (success && success == true) {
            setAgentListing(data)
            setTotal(+total)
        }
        setIsLoading(false)

    }


    return (
        <div>
            <Table
                aria-label="Example table with client side pagination"
                topContent={
                    <div className='flex flex-row justify-between items-center'>
                        <h1>Students</h1>
                        <div>
                            <Input
                                className='w-7xl'
                                startContent={<Search className='h-4 text-gray-400' />}
                                placeholder='Search'
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value)
                                }}
                                isClearable
                            />
                        </div>
                        {/* <section className='flex flex-row gap-2'>
                            <Button
                                color='primary'
                                onPress={onOpenChangeAdd}
                            >
                                Create Agent
                            </Button>
                        </section> */}
                    </div>
                }
                bottomContent={
                    <section className='mx-auto'>
                        <Pagination
                            isCompact
                            showControls
                            defaultChecked
                            defaultValue={1}
                            total={Math.ceil(total / 5)}
                            onChange={(value) => {
                                setOffset(value * 5 - 5)
                            }}
                        />
                    </section>
                }
            >
                <TableHeader>
                    <TableColumn key="access_profile">Profile</TableColumn>
                    <TableColumn key="username">Name</TableColumn>
                    <TableColumn key="phone_number">Phone Number</TableColumn>
                    <TableColumn key="email">Email</TableColumn>
                    <TableColumn key="is_verified">Verified</TableColumn>
                    <TableColumn key="createdAt">Create At</TableColumn>
                    <TableColumn key="action">Action</TableColumn>
                </TableHeader>
                <TableBody
                    items={agentsListing}
                    emptyContent={"No rows to display."}
                    loadingContent={<Spinner />}
                    isLoading={isLoading}
                >
                    {(item: any) => (
                        <TableRow key={item?.uuid} onClick={(e) => {
                            e.stopPropagation()
                            window.open(`/student/${getKeyValue(item, "uuid")}`, "_blank")
                        }}
                            className='cursor-pointer'
                        >

                            {(columnKey) => {

                                if (columnKey == "action") {
                                    return <TableCell>
                                        <div className='flex flex-row gap-2 items-center justify-start'>

                                            {/* <Button
                                                isIconOnly
                                                variant='light'
                                                color='secondary'
                                                size='sm'
                                                onPress={() => {
                                                    onOpenChangeAdd()
                                                    setForm({
                                                        uuid: getKeyValue(item, "uuid"),
                                                        country_code: "+91",
                                                        email: getKeyValue(item, "email"),
                                                        phone_number: getKeyValue(item, "phone_number"),
                                                        user_name: getKeyValue(item, "username")
                                                    });
                                                }}
                                            >
                                                <Edit className='h-4' />
                                            </Button> */}
                                            {/* <Button
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
                                            </Button> */}


                                        </div>
                                    </TableCell>
                                } else if (columnKey == "createdAt") {
                                    return <TableCell>{new Date(getKeyValue(item, "createdAt")).toLocaleString()}</TableCell>
                                } else if (columnKey == "access_profile") {
                                    return <TableCell>
                                        <Avatar
                                            size='sm'
                                            src={getKeyValue(item, "access_profile")}
                                            alt={getKeyValue(item, "username")}
                                        />
                                    </TableCell>
                                } else {
                                    return <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                                }
                            }}

                        </TableRow>
                    )}
                </TableBody>
            </Table>

        </div>
    )
}

export default Students