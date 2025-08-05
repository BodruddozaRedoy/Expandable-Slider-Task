import { useEffect, useRef, useState } from 'react'
import { data } from '../utils/data'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { FaPlay } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function Banner() {
    const [active, setActive] = useState(1)
    const [progressKey, setProgressKey] = useState(0)

    const intervalRef = useRef(null)

    useEffect(() => {
        if (intervalRef.current) clearInterval(intervalRef.current)

        intervalRef.current = setInterval(() => {
            setActive(prev => (prev >= data.length ? 1 : prev + 1))
            setProgressKey(prev => prev + 1)
        }, 5000)

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [active])


    return (
        <div className='space-y-5 flex gap-2 p-2 overflow-hidden'>
            {data.map((slide, index) => {
                const isActive = index + 1 === active

                return (
                    <motion.div
                        key={index}
                        initial={false}
                        animate={{
                            width: isActive ? '80%' : '5%',
                        }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className={`h-[700px] border-2 bg-no-repeat bg-cover bg-center text-white relative transition-all rounded-lg overflow-hidden`}
                        style={{ backgroundImage: `url(${slide.image})` }}
                    >
                        <div className='h-full p-20 flex flex-col bg-black/50'>
                            {/* badge title */}
                            <div
                                style={{ color: slide.color }}
                                className={`flex items-center gap-2 font-semibold absolute ${isActive
                                    ? 'top-15 rotate-0 right-15'
                                    : 'top-30 rotate-90 -right-8'
                                    } text-nowrap`}
                            >
                                <div
                                    className='w-5 h-5 rounded-full'
                                    style={{ backgroundColor: slide.color }}
                                ></div>
                                {slide.title}
                            </div>

                            <div
                                className={`flex items-center flex-1 ${!isActive && 'hidden'
                                    }`}
                            >
                                {/* text */}
                                <div className='space-y-5 w-1/2'>
                                    <h1
                                        style={{ color: slide.color }}
                                        className='font-bold text-2xl'
                                    >
                                        {slide.title}
                                    </h1>
                                    <p>{slide.desc}</p>
                                    <ul className='ml-5'>
                                        {slide.services.map(_ => (
                                            <li className='list-disc' key={_}>
                                                {_}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* video */}
                                <div className='w-1/2 p-10'>
                                    <video
                                        autoPlay
                                        width='100%'
                                        height='100%'
                                        loop
                                        muted
                                        className='rounded-lg w-full h-full object-cover'
                                    >
                                        <source src={slide.videoSrc} type='video/mp4' />
                                    </video>
                                </div>
                            </div>

                            {/* actions */}
                            <div
                                className={`${!isActive && 'hidden'
                                    } flex w-full items-center gap-10`}
                            >
                                {/* bar */}
                                <div className='w-full relative'>
                                    <div className='w-full h-1 bg-white rounded-lg'></div>
                                    <motion.div
                                        key={progressKey}
                                        initial={{ width: '0%' }}
                                        animate={{ width: '100%' }}
                                        transition={{ duration: 5, ease: 'linear' }}
                                        className='h-1 absolute top-0 left-0 rounded-lg bg-blue-500'
                                    />
                                </div>


                                {/* controller */}
                                <div className='flex items-center gap-2'>
                                    <button
                                        onClick={() => {
                                            setActive(prev => (prev === 1 ? data.length : prev - 1))
                                            setProgressKey(prev => prev + 1)
                                        }}
                                        className='w-10 h-10 flex items-center justify-center text-xl rounded-full bg-white text-black cursor-pointer'
                                    >
                                        <IoIosArrowBack />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setActive(prev => (prev === data.length ? 1 : prev + 1))
                                            setProgressKey(prev => prev + 1)
                                        }}
                                        className='w-10 h-10 flex items-center justify-center text-xl rounded-full bg-white text-black cursor-pointer'
                                    >
                                        <IoIosArrowForward />
                                    </button>
                                </div>
                            </div>

                            <div
                                onClick={() => {
                                    setActive(index + 1)
                                    setProgressKey(prev => prev + 1)
                                }}

                                className={`bg-black/50 w-12 text-center h-12 rounded-full flex items-center justify-center absolute bottom-5 left-5 cursor-pointer ${isActive && 'hidden'
                                    }`}
                            >
                                <FaPlay />
                            </div>
                        </div>
                    </motion.div>
                )
            })}
        </div>
    )
}
