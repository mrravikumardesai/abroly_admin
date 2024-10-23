import React, { useState, useEffect } from 'react';
import { Input, Button, Textarea } from '@nextui-org/react';
import axios from 'axios';
import { commonPostAPICall } from '@/utils/ApiCallUtils';

const PackageAddUpdate = ({ packageUuid }) => {
  const [packageName, setPackageName] = useState('');
  const [description, setDescription] = useState('');
  const [leadLimit, setLeadLimit] = useState('');
  const [price, setPrice] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const onSuccess = async () => {
    // try {
    //   await axios.post('/api/packages/create', {
    //     name: packageName,
    //     description,
    //     leadLimit,
    //     price
    //   });
    //   alert("Package Created");
    // } catch (error) {
    //   console.error("Error creating package", error);
    // }
    const { success } = await commonPostAPICall({
      name: packageName,
      description,
      leadLimit,
      price
    }, "/packages/add", true)
    if (success && success == true) {
      window.location.reload()
    }
  };

  useEffect(() => {
    // If packageUuid is provided, we're in update mode
    if (packageUuid) {
      setIsUpdating(true);
      // Fetch the package details to populate the form
      const fetchPackage = async () => {
        try {
          const response = await axios.get(`/api/packages/${packageUuid}`);
          const pkg = response.data.data;
          setPackageName(pkg.name);
          setDescription(pkg.description);
          setLeadLimit(pkg.leadLimit);
          setPrice(pkg.price);
        } catch (error) {
          console.error("Error fetching package", error);
        }
      };

      fetchPackage();
    }
  }, [packageUuid]);

  const handleSubmit = async () => {
    const packageData = {
      name: packageName,
      description,
      leadLimit,
      price
    };

    try {
      if (isUpdating) {
        // Update package
        await axios.put(`/api/packages/update`, { uuid: packageUuid, ...packageData });
        alert('Package updated successfully');
      } else {
        // Add new package
        await axios.post(`/api/packages/create`, packageData);
        alert('Package created successfully');
      }
      if (onSuccess) onSuccess(); // Callback after success
    } catch (error) {
      console.error('Error saving package', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">{isUpdating ? 'Update Package' : 'Create New Package'}</h2>
      <Input
        placeholder="Package Name"
        value={packageName}
        onChange={(e) => setPackageName(e.target.value)}
        className="mb-4"
      />
      <Textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mb-4"
      />
      <Input
        placeholder="Lead Limit"
        type="number"
        value={leadLimit}
        onChange={(e) => setLeadLimit(e.target.value)}
        className="mb-4"
      />
      <Input
        placeholder="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="mb-4"
      />
      <Button onClick={onSuccess}>
        {isUpdating ? 'Update Package' : 'Create Package'}
      </Button>
    </div>
  );
};

export default PackageAddUpdate;
