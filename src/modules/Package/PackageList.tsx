import React, { useState, useEffect } from 'react';
import { Table, Button, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react'; // NextUI components
import axios from 'axios';
import PackageAddUpdate from './PackageAddUpdate';
import { commonGetAPICalls } from '@/utils/ApiCallUtils';

const PackageList = () => {
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        const fetchPackages = async () => {
           const {data,success} = await commonGetAPICalls("/packages/list")
           if(success && success == true){
            setPackages(data)
           }
        };

        fetchPackages();
    }, []);


    return (
        <div className="p-6">
            {/* add package */}
            <PackageAddUpdate  packageUuid={""}/>
            <h2 className="text-2xl font-bold">Available Packages</h2>
            <Table
                aria-label="Available packages"
                style={{ height: "auto", minWidth: "100%" }}
            >
                <TableHeader>
                    <TableColumn>Name</TableColumn>
                    <TableColumn>Lead Limit</TableColumn>
                    <TableColumn>Price</TableColumn>
                </TableHeader>
                <TableBody>
                    {packages?.map(pkg => (
                        <TableRow key={pkg?.uuid}>
                            <TableCell>{pkg?.name}</TableCell>
                            <TableCell>{pkg?.leadLimit}</TableCell>
                            <TableCell>{pkg?.price}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default PackageList;
