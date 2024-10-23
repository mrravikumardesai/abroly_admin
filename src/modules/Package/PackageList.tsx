import React, { useState, useEffect } from 'react';
import { Table, Button, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner, getKeyValue, useDisclosure } from '@nextui-org/react'; // NextUI components
import axios from 'axios';
import PackageAddUpdate from './PackageAddUpdate';
import { commonGetAPICalls, commonPostAPICall } from '@/utils/ApiCallUtils';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Pencil, Trash2 } from 'lucide-react';
import CommonConfirmation from '@/components/CommonConfirmation';

const PackageList = () => {

    const [isLoading, setIsLoading] = useState(false)

    const [packages, setPackages] = useState([]);
    const [selectedPackageUuid, setSelectedPackageUuid] = useState('');

    const [addUpdateOpen, setAddUpdateOpen] = useState(false)

    useEffect(() => {
        fetchPackages();
    }, []);

    const fetchPackages = async () => {
        setIsLoading(true)
        const { data, success } = await commonGetAPICalls("/packages/list")
        if (success && success == true) {
            setPackages(data)
        }
        setIsLoading(false)
    };


    // delete

    const { isOpen: isDeleteCnfOpen, onOpenChange: onDeleteCnfOpenChange } = useDisclosure();

    const [deleteUUID, setDeleteUUID] = useState("")
    const deleteFaqApiCall = async () => {
        const { success } = await commonPostAPICall({ uuid: deleteUUID }, "packages/delete", true)
        if (success && success == true) {
            onDeleteCnfOpenChange()
            fetchPackages()
            setDeleteUUID("")
        }
    }

    return (
        <div className="py-6">
            {/* add package */}

            <Table
                aria-label="Available packages"
                style={{ height: "auto", minWidth: "100%" }}
                topContent={
                    <section className='flex justify-between'>
                        <h2 className="text-2xl font-bold">Available Packages</h2>
                        <Button
                            color='primary'
                            onPress={() => { setAddUpdateOpen(true) }}
                        >
                            Add Package
                        </Button>
                    </section>
                }
            >
                <TableHeader>
                    {/* <TableColumn>Name</TableColumn> */}
                    <TableColumn key="name">Name</TableColumn>
                    <TableColumn key="price">Price</TableColumn>
                    <TableColumn key="leadLimit">Lead Limit</TableColumn>
                    <TableColumn key="teamLimit">Team Lead</TableColumn>
                    <TableColumn key="jobPostLimit">Job Post Limit</TableColumn>
                    <TableColumn key="job_post_days">Job Post Days</TableColumn>
                    <TableColumn key="action">Action</TableColumn>
                </TableHeader>
                <TableBody items={packages} emptyContent={"No rows to display."}>
                    {(item: any) => (
                        <TableRow key={item?.uuid} onClick={(e) => {
                            e.stopPropagation()
                        }}
                            className='cursor-pointer'
                        >
                            {(columnKey) => {
                                if (columnKey == "action") {
                                    return <TableCell className='flex gap-2'>
                                        <Button
                                            isIconOnly
                                            size='sm'
                                            onClick={() => {
                                                setSelectedPackageUuid(getKeyValue(item, "uuid"))
                                                setAddUpdateOpen(true)
                                            }}
                                            color='warning'
                                            variant='flat'
                                        >
                                            <Pencil className='p-1' />
                                        </Button>
                                        <Button
                                            isIconOnly
                                            size='sm'
                                            onPress={() => {
                                                setDeleteUUID(getKeyValue(item, "uuid"))
                                                onDeleteCnfOpenChange()
                                            }}
                                            color='danger'
                                            variant='flat'
                                        >
                                            <Trash2 className='p-1' />
                                        </Button>
                                    </TableCell>
                                }
                                else {
                                    return <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                                }
                            }
                            }

                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {/* add update drawer */}
            <Drawer open={addUpdateOpen} onOpenChange={setAddUpdateOpen}>
                <DrawerContent className='h-screen'>
                    <PackageAddUpdate packageUuid={selectedPackageUuid} onFormSubmit={() => {
                        fetchPackages()
                        setAddUpdateOpen(false)
                        setSelectedPackageUuid("")
                    }} />
                </DrawerContent>
            </Drawer>

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


        </div >
    );
};

export default PackageList;
