import { commonPostAPICall } from '@/utils/ApiCallUtils'
import { Avatar, Button, Input, Modal, ModalBody, ModalContent, ModalHeader, Pagination, Spinner, Switch, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, getKeyValue, useDisclosure } from '@nextui-org/react'
import { Edit, Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Agents = () => {

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
        }, "/agent/list_agents")
        if (success && success == true) {
            setAgentListing(data)
            setTotal(+total)
        }
        setIsLoading(false)

    }

    // new agent

    // Handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('option_')) {
            const optionKey = name.split('_')[1];
            setForm({
                ...form
            });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const [form, setForm] = useState({
        uuid: null,
        phone_number: "",
        country_code: "+91",
        user_name: "",
        email: ""
    });

    const { isOpen: isOpenAdd, onOpenChange: onOpenChangeAdd } = useDisclosure();

    const handleSubmitQuestion = async (e) => {
        e.preventDefault()
        const { uuid,
            phone_number,
            country_code,
            user_name,
            email
        } = form;
        const {
            data,
            success
        } = await commonPostAPICall({
            phone_number: uuid ? undefined : phone_number,
            user_name,
            country_code: "+91",
            email,
            uuid: uuid ? uuid : undefined
        }, uuid ? "agent/update" : "agent/create")
        if (success && success == true) {
            findAgents()
            setForm({
                uuid: null,
                country_code: "+91",
                email: "",
                phone_number: "",
                user_name: ""
            });
            onOpenChangeAdd()
        }
    }

    const statusChangeApiCall = async (uuid, action) => {
        setIsLoading(true)
        const { success } = await commonPostAPICall({
            uuid, action
        }, "/agent/toggle")

        if (success && success == true) {
            findAgents()
        }

    }

    const navigate = useNavigate()

    return (
        <div>
            <Table
                aria-label="Example table with client side pagination"
                topContent={
                    <div className='flex flex-row justify-between items-center'>
                        <h1>Agents</h1>
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
                        <section className='flex flex-row gap-2'>
                            <Button
                                color='primary'
                                onPress={onOpenChangeAdd}
                            >
                                Create Agent
                            </Button>
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
                    <TableColumn key="role">Role</TableColumn>
                    <TableColumn key="is_verified">Verified</TableColumn>
                    <TableColumn key="status">Status</TableColumn>
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
                            // navigate(`/agents/${getKeyValue(item, "uuid")}`,)
                            window.open(`/agents/${getKeyValue(item, "uuid")}`, "_blank")
                        }}
                            className='cursor-pointer'
                        >

                            {(columnKey) => {

                                if (columnKey == "action") {
                                    return <TableCell>
                                        <div className='flex flex-row gap-2 items-center justify-start'>
                                            <Button
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
                                            </Button>
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
                                } else if (columnKey == "status") {
                                    return <TableCell>
                                        <Switch
                                            isSelected={getKeyValue(item, "status") == "active" ? true : false}
                                            size='sm'
                                            onValueChange={(v) => {
                                                console.log(v);
                                                statusChangeApiCall(getKeyValue(item, "uuid"), v == true ? "active" : "inactive")
                                            }}>
                                            {getKeyValue(item, "status")?.toUpperCase()}
                                        </Switch>
                                    </TableCell>
                                }
                                else if (columnKey == "createdAt") {
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
                                Agent
                            </ModalHeader>
                            <ModalBody>
                                {/* Form for adding/updating questions */}
                                <form onSubmit={handleSubmitQuestion} className="space-y-4 mb-8">
                                    <div>
                                        {/* <label className="block text-lg">Email</label> */}
                                        <Input
                                            type="email"
                                            label="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        {/* <label className="block text-lg">Name</label> */}
                                        <Input
                                            type="text"
                                            name="user_name"
                                            label="Name"
                                            value={form.user_name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            type="Number"
                                            name="phone_number"
                                            label="Phone Number"
                                            value={form.phone_number}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        // className="bg-blue-600 text-white py-2 px-4 rounded-md"
                                        variant='shadow'
                                        color='primary'
                                    >
                                        {form.uuid ? 'Update Agent' : 'Add Agent'}
                                    </Button>
                                </form>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}

export default Agents