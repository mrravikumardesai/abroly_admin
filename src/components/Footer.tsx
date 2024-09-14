import React from 'react'

const Footer = () => {
    return (
        <footer className="mt-auto w-full">
            <div className="mt-auto w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 lg:pt-20 mx-auto">
                <div className="flex flex-col flex-wrap items-center justify-between">
                    <div className="col-span-full lg:col-span-1">
                        <a className="flex-none text-xl font-semibold focus:outline-none focus:opacity-80" href="#" aria-label="Brand">Abroly</a>
                    </div>



                    <div className="flex flex-row flex-wrap gap-2 items-center mt-5">
                        <p><a className="inline-flex border-e-1 pe-2" href="#">About Us</a></p>
                        <p><a className="inline-flex border-e-1 pe-2" href="#">Privacy & Policy</a></p>
                        <p><a className="inline-flex border-e-1 pe-2" href="#">Terms & Conditions</a></p>
                        <p><a className="inline-flex" href="#">Return & Refund Policy</a></p>
                    </div>


                </div>

                <div className="mt-5">
                    <div className="flex flex-col justify-between items-center">
                        <p className="text-sm dark:text-neutral-400">© {new Date().getFullYear()}  Abroly. All rights reserved.</p>
                        <p className="text-sm">Developed And Maintained By <a href='https://techxsolutions.in/' target='_blank' className='text-blue-600 hover:underline cursor-pointer'>techxsolutions.in</a></p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer