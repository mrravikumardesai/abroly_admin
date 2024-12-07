import { useEffect, useState } from 'react';
import { Form } from 'rsuite';
import { Button, Input, Spinner } from '@nextui-org/react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { getAuthToken } from '@/utils/localstorage';
import { Trash } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { commonGetAPICalls, commonPostAPICall } from '@/utils/ApiCallUtils';
import BackButton from '@/components/BackButton';

const PublicEventBannerEdit = () => {

    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);

    const [storedImages, setStoredImages] = useState([]);

    useEffect(() => {
        getApiCall();
    }, [id]);

    const [formData, setFormData] = useState({
        uuid: '',
        start_date: new Date(),
        end_date: new Date(),
        heading: '',
        descriptive_text: '',
        images: []
    });

    const getApiCall = async () => {
        setIsLoading(true);
        const { success, data } = await commonGetAPICalls("/event-banners/public-get/" + id);

        if (success && success == true) {
            setFormData({
                uuid: data?.uuid,
                start_date: new Date(data?.start_date),
                end_date: new Date(data?.end_date),
                heading: data?.heading,
                descriptive_text: data?.descriptive_text,
                images: []
            });
            setStoredImages(data?.images);
        }
        setIsLoading(false);
    }


    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (files) => {
        setFormData({ ...formData, images: [...formData.images, ...files.target.files] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { start_date, end_date, heading, descriptive_text } = formData;

        const formDataToSend = new FormData();
        formDataToSend.append('uuid', formData?.uuid);
        formDataToSend.append('start_date', start_date.toISOString());
        formDataToSend.append('end_date', end_date.toISOString());
        formDataToSend.append('heading', heading);
        formDataToSend.append('descriptive_text', descriptive_text);
        console.log(formData.images);
        formData?.images?.forEach((image) => {
            formDataToSend.append('images', image);
        });

        setIsLoading(true);
        try {
            const response = await axios.post(import.meta.env.VITE_API_BASE_URL + '/v1/event-banners/public-update', formDataToSend, {
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                navigate('/public_event_banners'); // Redirect to the banners list
            } else {
                setError(response.data.message);
            }

        } catch (error) {
            setError('An error occurred while creating the event banner.');
        }
        setIsLoading(false);
    };


    const handleDeleteImage = async (image) => {
        const { success } = await commonPostAPICall({}, `/event-banners/public-delete/${image}`);
        if (success && success == true) {
            getApiCall();
        }
    }

    return (
        <div className='flex flex-row sm:flex-col items-start gap-2 justify-between'>
               
            {isLoading && <div className="flex items-center justify-center h-screen">
                <Spinner color="primary" />
            </div>}
            
            <h1 className="flex flex-row items-center gap-2"><BackButton /> Edit Public Event Banner</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
                <div>
                    <label>Start Date</label>
                    <Input type="date" name="start_date" value={new Date(formData?.start_date).toISOString().split('T')[0]} onChange={handleChange} />
                </div>
                <div>
                    <label>End Date</label>
                    <Input type="date" name="end_date" value={new Date(formData?.end_date).toISOString().split('T')[0]} onChange={handleChange} />
                </div>
                <div>
                    <label>Heading</label>
                    <Input name="heading" value={formData?.heading} onChange={handleChange} />
                </div>
                <div>
                    <label>Descriptive Text</label>
                    <ReactQuill value={formData?.descriptive_text} onChange={(value) => handleChange({ target: { name: 'descriptive_text', value } })} />
                </div>
                <div className='flex flex-row gap-2 items-center justify-start my-2'>
                    <label>Upload Images</label>
                    <input type="file" onChange={handleFileChange} multiple />
                </div>
                <p className="text-gray-600 text-sm">
                    Please ensure to upload small amount of images. The event banner will be created as private by default. You can add more images later and change the status to public.
                </p>

                {formData.images && formData.images.length > 0 && (
                    <div>
                        <h2>Uploaded Images</h2>
                        <ul className='flex flex-col gap-2'>
                            {formData?.images?.map((image, index) => (
                                <li key={index} className="flex items-center justify-between">
                                    <img src={URL.createObjectURL(image)} alt={image.name} className="h-40 object-cover mr-2" />
                                    <span>{image.name}</span>
                                    <Button
                                        color="danger"
                                        size="sm"
                                        onClick={() => {
                                            const updatedImages = [...formData.images];
                                            updatedImages.splice(index, 1);
                                            setFormData({ ...formData, images: updatedImages });
                                        }}
                                    >
                                        <Trash className="w-4 h-4" />
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {storedImages && storedImages.length > 0 && (
                    <div>
                        <h2>Uploaded Images</h2>
                        <ul className='flex flex-col gap-2'>
                            {storedImages?.map((image, index) => (
                                <li key={index} className="flex items-center justify-between">
                                    <img src={image?.url} alt={image?.name} className="h-40 object-cover mr-2" />
                                    <span>{image?.name}</span>
                                    <Button
                                        color="danger"
                                        size="sm"
                                        onClick={() => handleDeleteImage(image?.uuid)}>
                                        <Trash className="w-4 h-4" />
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <Button type="submit" className='w-fit' variant='shadow' color='primary' onClick={handleSubmit}>Update</Button>
                <Button className='w-fit' variant='shadow' color='danger' onClick={()=>{navigate(-1)}}>Cancel</Button>
            </form>
        </div>
    );
};

export default PublicEventBannerEdit