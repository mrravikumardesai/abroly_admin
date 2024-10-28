import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { commonPostAPICall, commonPostAPICallWithFile } from '@/utils/ApiCallUtils';
import { Button, Image, Input, Radio, RadioGroup, Select, Textarea, useDisclosure } from '@nextui-org/react';
import axios from 'axios';
import { ArrowLeft, Edit, FileText, ImageIcon, Plus, Trash } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import { useNavigate, useParams } from 'react-router-dom'
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import CommonConfirmation from '@/components/CommonConfirmation';
import { QuillFormats, QuillModules } from '@/components/ReactQuillNavOptions';

const AddUpdateServiceInfo = () => {

    const { service } = useParams()

    const [blocks, setBlocks] = useState([])

    useEffect(() => {
        listBlocks()
    }, [])

    // list
    const listBlocks = async () => {
        const { success, data } = await commonPostAPICall({ content_of: service }, "service_info/list")
        if (success && success == true) {
            setBlocks(data)
        }
    }

    const [formData, setFormData] = useState({
        section_type: "text",
        description: "",
        content_of: service,
        order: "0",
        file: null,
        uuid: ""
    });

    const [addUpdateOpen, setAddUpdateOpen] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const addBlock = async () => {
        const { data, success } = await commonPostAPICallWithFile(
            formData,
            formData.uuid == "" ? "service_info/add_block" : "service_info/update_block",
            true
        )
        if (success && success == true) {
            listBlocks()
            setAddUpdateOpen(false)
            setFormData({
                section_type: "text",
                description: "",
                content_of: service,
                order: "0",
                file: null,
                uuid: ""
            })
        }
    }
    // delete block
    const { isOpen, onOpenChange } = useDisclosure();
    const [deleteUUID, setDeleteUUID] = useState("")
    const deleteBlock = async () => {
        const { data, success } = await commonPostAPICall(
            { uuid: deleteUUID }, "service_info/delete",
            true
        )
        if (success && success == true) {
            listBlocks()
            setDeleteUUID("")
            onOpenChange()
        }
    }

    const navigate = useNavigate()

    return (
        <div>
            <Button 
                variant='light'
                onPress={()=>{
                    navigate(-1)
                }}
                isIconOnly
                ><ArrowLeft className='h-4' /> </Button>
            <section className='flex flex-row justify-end'>
                <Button
                    variant='solid'
                    color='primary'
                    onPress={() => {
                        setFormData({
                            section_type: "text",
                            description: "",
                            content_of: service,
                            order: String(blocks.length + 1),
                            file: null,
                            uuid: ""
                        })
                        setAddUpdateOpen(true)
                    }}
                    ><Plus className='h-4'/> Add Block </Button>
            </section>

            <div className="space-y-6">
                {blocks
                    .sort((a, b) => a.order - b.order) // Sort blocks by order
                    .map((block) => (
                        <div
                            key={block.uuid}
                            className="p-4 rounded-lg flex items-start gap-4"
                        >
                            {/* Action Buttons */}
                            <div className="flex flex-row gap-2">
                                <Button
                                    color='secondary'
                                    variant='flat'
                                    size='sm'
                                    isIconOnly
                                    onPress={() => {
                                        setAddUpdateOpen(true)
                                        setFormData({
                                            section_type: block?.section_type,
                                            description: block?.description,
                                            content_of: block?.content_of,
                                            order: block?.order,
                                            file: block?.access_file,
                                            uuid: block?.uuid
                                        })
                                    }}
                                >
                                    <Edit size={15} />
                                </Button>
                                <Button
                                    color='danger'
                                    variant='flat'
                                    size='sm'
                                    isIconOnly
                                    onPress={() => {
                                        setDeleteUUID(block?.uuid)
                                        onOpenChange()
                                    }}
                                >
                                    <Trash size={15} />
                                </Button>
                            </div>
                            <div className="flex-1">

                                {/* Conditional Rendering for Text or Image */}
                                {block?.section_type === "text" && (
                                    <div>
                                        <ReactQuill
                                            modules={QuillModules}
                                            formats={QuillFormats}
                                            theme="bubble"
                                            value={block?.description}
                                            readOnly
                                        />
                                    </div>
                                )}

                                {block.section_type === "image" && (
                                    <div>
                                        {block?.access_file ? (
                                            <Image
                                                src={block?.access_file}
                                                alt="Block Image"
                                                className='w-full md:w-1/2'
                                            />
                                        ) : (
                                            <p className="text-gray-500 italic">No image available</p>
                                        )}
                                    </div>
                                )}
                            </div>


                        </div>
                    ))}
            </div>



            <Drawer open={addUpdateOpen} onOpenChange={setAddUpdateOpen}>
                <DrawerContent>
                    <div className=" space-y-3 py-2 px-6 rounded-lg shadow-md h-[80vh] overflow-y-scroll">
                        <h2 className="text-xl font-bold">Add / Update Block</h2>
                        <RadioGroup
                            label="Select Block Type"
                            value={formData?.section_type}
                            name='section_type'
                            orientation='horizontal'
                            onValueChange={(e) => {
                                setFormData((prev) => ({ ...prev, section_type: e }));
                            }}
                        >
                            <Radio value="text">Text</Radio>
                            <Radio value="image">Image</Radio>
                        </RadioGroup>

                        {formData?.section_type === 'image' ? (
                            <Input
                                label="Image File"
                                name="file"
                                type="file"
                                accept="image/png, image/gif, image/jpeg"
                                onChange={(e) => setFormData((prev) => ({ ...prev, file: e.target.files[0] }))}
                            />
                        ) : <>
                            <ReactQuill
                                modules={QuillModules}
                                formats={QuillFormats}
                                value={formData?.description}
                                onChange={(e) => setFormData((prev) => ({ ...prev, description: e }))}
                            />
                        </>}

                        <Input
                            label="Order"
                            name="order"
                            type="number"
                            value={formData?.order || ''}
                            onChange={handleChange}
                        />

                        <Button 
                        variant='shadow'
                        color='primary'
                        onPress={() => {
                            addBlock()
                        }}>Save Block</Button>
                    </div>
                </DrawerContent>
            </Drawer>

            <CommonConfirmation
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                title={"Are you sure want to delete this block ?"}
                handleSubmit={() => {
                    deleteBlock()
                }}
                nagativeTitle={"No"}
                positiveTitle={"Yes"}
            />
        </div>
    )
}

export default AddUpdateServiceInfo