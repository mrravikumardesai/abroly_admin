import { Button, Input, Textarea } from '@nextui-org/react'
import React from 'react'

const ContactUs = () => {
    return (
        <div className="">
            <div className="max-w-5xl px-4 xl:px-0 py-10 lg:py-20 mx-auto">
                <div className="max-w-3xl mb-10 lg:mb-14">
                    <h2 className="font-semibold text-2xl md:text-4xl md:leading-tight">Contact us</h2>
                    <p className="mt-1">Whatever your query, will get back to you within 2 business days</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-16">
                    <div className="md:order-2 border-b border-neutral-800 pb-10 mb-10 md:border-b-0 md:pb-0 md:mb-0">
                        <form className='flex flex-col gap-2'>

                            <Input
                                variant='bordered'
                                label="Your Name"
                            />
                            <Input
                                variant='bordered'
                                label="Your Email"
                            />
                            <Input
                                variant='bordered'
                                label="Your Phone Number"
                            />
                            <Textarea
                                variant='bordered'
                                label="Your Message"
                            />
                            <Button
                            variant='flat'
                            className='bg-primary bg-opacity-75'
                            >Submit</Button>

                        </form>
                    </div>

                    <div className="space-y-14">
                        <div className="flex gap-x-5">
                            <svg className="shrink-0 size-6 text-primary" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                            <div className="grow">
                                <h4 className=" font-semibold">Our address:</h4>

                                <address className="mt-1  text-sm not-italic">
                                    300 Bath Street, Tay House<br />
                                    Glasgow G2 4JR, United Kingdom
                                </address>
                            </div>
                        </div>

                        <div className="flex gap-x-5">
                            <svg className="shrink-0 size-6 text-primary" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z" /><path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10" /></svg>
                            <div className="grow">
                                <h4 className=" font-semibold">Email us:</h4>

                                <a className="mt-1  text-sm hover:text-neutral-200 focus:outline-none focus:text-neutral-200" href="#mailto:example@site.co" target="_blank">
                                    hello@example.so
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactUs