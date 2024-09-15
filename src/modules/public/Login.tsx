import { Button, Input } from '@nextui-org/react'
import React, { useRef, useState } from 'react'
import { commonPostPublicAPICall } from '../../utils/ApiCallUtils'
import { useDispatch } from 'react-redux'
import { ErrorToast } from '../../utils/Toaster'
import { setAuthLoading, setProfile, setToken } from '../../redux/slices/loginSlice'
import { addToLocal } from '../../utils/localstorage'
import { GrEdit } from 'react-icons/gr'
import { useNavigate } from 'react-router-dom'

const IS_LOCAL = import.meta.env.VITE_IS_LOCAL || false

const Login = () => {

    const dispatch = useDispatch()

    // for OTP

    const [OTPScreen, setOTPScreeen] = useState(false)
    const [verificationId, setVerificationId] = useState("")
    const [numberAndCountryCode, setNumberAndCountryCode] = useState({
        phone_number: "",
        country_code: "+91"
    })
    const initialValues = Array(4).fill('');
    const [otpValues, setValues] = useState<string[]>(initialValues);
    const inputRefs = Array(4).fill(0).map(() => useRef<HTMLInputElement>(null));

  // handle change of otp
  const handleChange = (event: any, index: number) => {
    // Allow only single digit input
    if (/^\d?$/.test(event.target.value)) {
      const newValues = [...otpValues];
      newValues[index] = event.target.value;
      setValues(newValues);
      if (event.target.value && index < 5) {
        const nextInput = inputRefs[index + 1].current;
        if (nextInput) {
          nextInput.focus();
        }
      }
    }

  };

    // for handle backspace 
    const handleBackspace = (event: any, index: number) => {
        if (event.key === 'Backspace' && !otpValues[index] && index > 0) {
            inputRefs[index - 1].current?.focus();
        }
    };
    // use for handle paste
    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
        event.preventDefault();
        const pasteData = event.clipboardData.getData('text').slice(0, 4).split('');
        pasteData.forEach((value: string, index: number) => {
            if (index < otpValues.length) {
                otpValues[index] = value;
                const inputEl = inputRefs[index].current; // Get a reference to the current input element
                if (inputEl !== null) { // Check if the input element is not null
                    inputEl.value = value; // Directly set the value of the input element
                }
            }
        });

        setValues([...otpValues]);
        const firstEmptyIndex = pasteData.length < 4 ? pasteData.length : -1;
        if (firstEmptyIndex !== -1) {
            inputRefs[firstEmptyIndex].current?.focus();
        }
    };

    const submitCall =
        async () => {
            const { success, data } = await commonPostPublicAPICall({ phone: numberAndCountryCode.phone_number, country_code: "+91" }, `user/admin/${IS_LOCAL == 'true' ? 'login_with_number_custom' : 'login_with_number'}`, true);
            // console.log(data);

            if (success == true) {

                setOTPScreeen(true)

                setVerificationId(data)

            }
        }
    const resendOTPCall =
        async () => {
            const { success, data } = await commonPostPublicAPICall({ country_code: numberAndCountryCode.country_code, phone: numberAndCountryCode.phone_number }, `user/admin/${IS_LOCAL == 'true' ? 'login_with_number_custom' : 'login_with_number'}`,true);
            // console.log(data);

            if (success == true) {

                setOTPScreeen(true)
                setNumberAndCountryCode({
                    country_code: numberAndCountryCode.country_code,
                    phone_number: numberAndCountryCode.phone_number
                })

                setVerificationId(data)

            }
        }
    const navigate = useNavigate()
    return (
        <section className="grid grid-cols-2 h-full items-center">

            <div className="hidden lg:block w-full h-[70vh] px-2">
                <img src="https://images.pexels.com/photos/2859169/pexels-photo-2859169.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="w-full h-full object-cover rounded-3xl" />
            </div>

            <div className=" w-full h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">

                <div className="w-full">
                    <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">Log in to your account</h1>

                    {
                        OTPScreen == false ?
                            <form className="mt-6 space-y-4" onSubmit={(e)=>{
                                e.preventDefault()
                                // submitCall()
                            }}>
                                <Input
                                    label="Phone Number"
                                    startContent={<p className='text-sm font-bold'>+91</p>}
                                    value={numberAndCountryCode.phone_number}
                                    onChange={(e) => {
                                        setNumberAndCountryCode({
                                            ...numberAndCountryCode,
                                            phone_number: e.target.value
                                        })
                                    }}
                                    className='max-w-xl'
                                />
                                <Button
                                    type='submit'
                                    variant='flat'
                                    color='warning'
                                    onPress={submitCall}
                                >Send OTP</Button>
                            </form>
                            :
                            <div className="flex items-start justify-start sm:px-1 lg:px-1 ">
                                <div className="xl:mx-auto xl:w-full py-10 rounded-2xl">
                                    <p className="text-base ">
                                        Enter the OTP that was sent to your phone number{" "}
                                    </p>
                                    <section className="text-sm flex flex-row itms-center justify-start gap-2">
                                        <p className='flex items-center'> {"+91"}{" "}{numberAndCountryCode.phone_number}</p>
                                        <Button isIconOnly variant='light' onClick={() => { setOTPScreeen(false) }}>
                                            <GrEdit className="text-sm " />
                                        </Button>
                                    </section>
                                    <div className="flex flex-row items-center gap-x-2 gap-y-2">
                                        {otpValues.map((value: string, index: number) => (
                                            <input
                                                key={index}
                                                autoFocus={index ==0}
                                                ref={inputRefs[index]}
                                                type="number"
                                                maxLength={1}
                                                max={9}
                                                value={value}
                                                onChange={(e) => handleChange(e, index)}
                                                onKeyDown={async (e) => {
                                                    if (e.key === 'Enter' && index == 3) {
                                                        let emptyOTP = false
                                                        otpValues.forEach((item: any) => {
                                                            if (item == "") {
                                                                emptyOTP = true
                                                            }
                                                        })
                                                        if (emptyOTP) {
                                                            ErrorToast("Please Enter OTP")
                                                        } else {
                                                            const { success, data } = await commonPostPublicAPICall({ country_code: numberAndCountryCode.country_code, otp: otpValues.join(""), phone_number: "" + numberAndCountryCode.phone_number, verificationId }, `user/admin/${IS_LOCAL == 'true' ? 'validate_otp_custom' : 'validate_otp'}`,true);
                                                            if (success == true) {
                                                                dispatch(setToken(data.token))
                                                                dispatch(setProfile({
                                                                    phone: data.country_code + " " + data.phone,
                                                                    user_name: data.name
                                                                }))
                                                                addToLocal("token", data.token)
                                                                addToLocal("phone_with_code", data.country_code + " " + data.phone)
                                                                addToLocal("name", data.name)
                                                                dispatch(setAuthLoading('false'))
                                                                navigate("/")
                                                            }
                                                        }

                                                    } else {
                                                        handleBackspace(e, index)
                                                    }
                                                }

                                                }
                                                onPaste={handlePaste}
                                                className="h-10 w-10 text-center text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 inline-block"
                                            />
                                        ))}
                                    </div>
                                    <div className='flex flex-row gap-2 my-2'>
                                        <Button
                                            // disabled={isSubmitting}
                                            //   className="inline-flex w-fit items-center justify-center rounded-lg bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                            onClick={async () => {
                                                // console.log(otpValues)
                                                let emptyOTP = false
                                                otpValues.forEach((item: any) => {
                                                    if (item == "") {
                                                        emptyOTP = true
                                                    }
                                                })
                                                if (emptyOTP) {
                                                    ErrorToast("Please Enter OTP")
                                                } else {
                                                    const { success, data } = await commonPostPublicAPICall({ country_code: numberAndCountryCode.country_code, otp: otpValues.join(""), phone_number: "" + numberAndCountryCode.phone_number, verificationId }, `user/admin/${IS_LOCAL == 'true' ? 'validate_otp_custom' : 'validate_otp'}`,true);
                                                    if (success == true) {
                                                        dispatch(setToken(data.token))
                                                        dispatch(setProfile({
                                                            phone: data.country_code + " " + data.phone,
                                                            user_name: data.name
                                                        }))
                                                        addToLocal("token", data.token)
                                                        addToLocal("phone_with_code", data.country_code + " " + data.phone)
                                                        addToLocal("name", data.name)
                                                        dispatch(setAuthLoading('false'))
                                                        navigate("/")
                                                    }
                                                }
                                            }}
                                        >
                                            Verify
                                        </Button>
                                        <Button
                                            onClick={resendOTPCall}
                                        >
                                            Resend
                                        </Button>
                                    </div>
                                </div>
                            </div>
                    }

                </div>
            </div>

        </section>
    )
}

export default Login