import React, { useState, useEffect } from 'react';
import { Input, Button, Textarea } from '@nextui-org/react';
import axios from 'axios';
import { commonGetAPICalls, commonPostAPICall } from '@/utils/ApiCallUtils';

const PackageAddUpdate = ({ packageUuid, onFormSubmit }) => {
  const [packageName, setPackageName] = useState('');
  const [packageUUID, setPackageUUID] = useState('');
  const [description, setDescription] = useState('');
  const [leadLimit, setLeadLimit] = useState('');
  const [price, setPrice] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [teamLimit, setTeamLimit] = useState("")
  const [jobPostLimit, setJobPostLimit] = useState("")
  const [job_post_days, setJobPostDays] = useState("")

  const onSuccess = async () => {
    const packageData = {
      name: packageName,
      description,
      leadLimit,
      price,
      uuid: packageUUID,
      teamLimit,
      jobPostLimit,
      job_post_days,
    };

    const { success } = await commonPostAPICall(packageData, isUpdating ? `packages/update` : `packages/add`, true);

    if (success && success === true) {
      onFormSubmit(); // Notify the parent component to refresh the list
    }
  };

  useEffect(() => {
    // If packageUuid is provided, we're in update mode
    if (packageUuid) {
      setIsUpdating(true);
      // Fetch the package details to populate the form
      const fetchPackage = async () => {
        try {
          const { data, success } = await commonPostAPICall({ uuid: packageUuid }, `packages/details`);
          if (success && success == true) {
            setPackageName(data?.name);
            setDescription(data?.description);
            setLeadLimit(data?.leadLimit);
            setPrice(data?.price);
            setPackageUUID(data?.uuid);
            setTeamLimit(data?.teamLimit)
            setJobPostLimit(data?.jobPostLimit)
            setJobPostDays(data?.job_post_days)
          }
        } catch (error) {
          console.error("Error fetching package", error);
        }
      };

      fetchPackage();
    }
  }, [packageUuid]);

  return (
    <div className="p-6 overflow-y-scroll">
      <h2 className="text-2xl font-bold mb-2">{isUpdating ? 'Update Package' : 'Create New Package'}</h2>

      <section className='grid grid-cols-2 gap-2'>


        <Input
          placeholder="Package Name"
          label="Package Name"
          value={packageName}
          onChange={(e) => setPackageName(e.target.value)}
          className="mb-4"
        />

        <Input
          placeholder="Lead Limit"
          label="Lead Limit"
          type="number"
          value={leadLimit}
          onChange={(e) => setLeadLimit(e.target.value)}
          className="mb-4"
        />

        <Input
          placeholder="Team Limit"
          label="Team Limit"
          type="number"
          value={teamLimit}
          onChange={(e) => setTeamLimit(e.target.value)}
          className="mb-4"
        />

        <Input
          placeholder="Job Post Limit"
          label="Job Post Limit"
          type="number"
          value={jobPostLimit}
          onChange={(e) => setJobPostLimit(e.target.value)}
          className="mb-4"
        />

        <Input
          placeholder="Job Post Days"
          label="Job Post Days"
          type="number"
          value={job_post_days}
          onChange={(e) => setJobPostDays(e.target.value)}
          className="mb-4"
        />

        <Input
          placeholder="Price"
          label="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="mb-4"
        />

        <Textarea
          placeholder="Description"
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mb-4 col-span-2"
        />
      </section>

      <Button
        color='primary'
        onClick={onSuccess}>
        {isUpdating ? 'Update Package' : 'Create Package'}
      </Button>
    </div>
  );
};

export default PackageAddUpdate;
