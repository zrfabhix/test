import React, { useState } from 'react'
import { db, storage } from '../config/config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import Navbar from './Navbar';
import Footer from './Footer';
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
    const [downloadurl, setdownloadurl] = useState(false)

    const [loading, setloading] = useState(false)
    const [url, seturl] = useState("")

    const [myfile, setmyfile] = useState("")

    const upload = (e) => {
        e.preventDefault()
        setmyfile(e.target.files[0])
    }

    const uploadfile = (e) => {
        console.log(myfile)
        setloading(true)
        const storageRef = ref(storage, `images/${myfile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, myfile);

        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // Handle unsuccessful uploads
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    let uuid = uuidv4()
                    let myobj = {
                        filename:myfile.name,
                        url:downloadURL,
                        id:uuid
                    }
                    db.collection("data").doc(uuid).set(myobj)
                    setloading(false)
                    setdownloadurl(true)
                    seturl(downloadURL)

                });
            }
        );
    }

    return (
        <>
        <Navbar/>
            <div>

                <section className="text-gray-600 body-font">
                    <div className="container mx-auto flex flex-col px-5 py-24 justify-center items-center">
                        <img className="lg:w-60 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded" alt="hero" src="data:image/png;base64,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" />
                        <div className="w-full md:w-2/3 flex flex-col mb-16 items-center text-center">

                            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Get Ready to Upload Files </h1>
                            <p className="mb-8 leading-relaxed">Ishare is free of cost file uploading website that provides best feature and security to upload files securely at high speed without any cost. This Project is inspire from Easyuplaod</p>
                            <div className="flex w-full justify-center items-end">
                                <div className="relative mr-4 lg:w-full xl:w-1/2 w-2/4 md:w-full text-left">

                                    <input type="file" id="hero-field" name="hero-field" onChange={upload} className="w-full bg-gray-100 bg-opacity-50 rounded focus:ring-2 focus:ring-indigo-200 focus:bg-transparent border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                                <button onClick={uploadfile} className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Upload</button>
                            </div>
                            <p className="text-sm mt-2 text-gray-500 mb-8 w-full">
                                Share Files Without any limit
                            </p>

                            {
                                loading ?
                                    <>
                                        <div role="status" className='mb-10'>
                                            <svg aria-hidden="true" class="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                            </svg>
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </> :

                                    <></>
                            }

                            {downloadurl ?


                                <section class="text-gray-600 body-font ">
                                    <div class="container px-5 py-5 pb-20 mx-auto">
                                        <div class="lg:w-2/3 flex flex-col sm:flex-row sm:items-center items-start mx-auto">
                                            <h1 class="flex-grow sm:pr-16 text-sm font-medium title-font text-gray-900">{url}</h1>
                                            <button class="flex-shrink-0 ml-10 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-10 sm:mt-0" onClick={() => {
                                                navigator.clipboard.writeText(url)
                                                alert("Copied")
                                            }}>Copy</button>
                                        </div>
                                    </div>
                                </section>
                                :
                                <>

                                </>

                            }

                            <div className="flex">
                                <button className="bg-gray-100 inline-flex py-3 px-5 rounded-lg items-center hover:bg-gray-200 focus:outline-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 512 512">
                                        <path d="M99.617 8.057a50.191 50.191 0 00-38.815-6.713l230.932 230.933 74.846-74.846L99.617 8.057zM32.139 20.116c-6.441 8.563-10.148 19.077-10.148 30.199v411.358c0 11.123 3.708 21.636 10.148 30.199l235.877-235.877L32.139 20.116zM464.261 212.087l-67.266-37.637-81.544 81.544 81.548 81.548 67.273-37.64c16.117-9.03 25.738-25.442 25.738-43.908s-9.621-34.877-25.749-43.907zM291.733 279.711L60.815 510.629c3.786.891 7.639 1.371 11.492 1.371a50.275 50.275 0 0027.31-8.07l266.965-149.372-74.849-74.847z"></path>
                                    </svg>
                                    <span className="ml-4 flex items-start flex-col leading-none">
                                        <span className="text-xs text-gray-600 mb-1">GET IT ON</span>
                                        <span className="title-font font-medium">Google Play</span>
                                    </span>
                                </button>

                                <button className="bg-gray-100 inline-flex py-3 px-5 rounded-lg items-center ml-4 hover:bg-gray-200 focus:outline-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 305 305">
                                        <path d="M40.74 112.12c-25.79 44.74-9.4 112.65 19.12 153.82C74.09 286.52 88.5 305 108.24 305c.37 0 .74 0 1.13-.02 9.27-.37 15.97-3.23 22.45-5.99 7.27-3.1 14.8-6.3 26.6-6.3 11.22 0 18.39 3.1 25.31 6.1 6.83 2.95 13.87 6 24.26 5.81 22.23-.41 35.88-20.35 47.92-37.94a168.18 168.18 0 0021-43l.09-.28a2.5 2.5 0 00-1.33-3.06l-.18-.08c-3.92-1.6-38.26-16.84-38.62-58.36-.34-33.74 25.76-51.6 31-54.84l.24-.15a2.5 2.5 0 00.7-3.51c-18-26.37-45.62-30.34-56.73-30.82a50.04 50.04 0 00-4.95-.24c-13.06 0-25.56 4.93-35.61 8.9-6.94 2.73-12.93 5.09-17.06 5.09-4.64 0-10.67-2.4-17.65-5.16-9.33-3.7-19.9-7.9-31.1-7.9l-.79.01c-26.03.38-50.62 15.27-64.18 38.86z"></path>
                                        <path d="M212.1 0c-15.76.64-34.67 10.35-45.97 23.58-9.6 11.13-19 29.68-16.52 48.38a2.5 2.5 0 002.29 2.17c1.06.08 2.15.12 3.23.12 15.41 0 32.04-8.52 43.4-22.25 11.94-14.5 17.99-33.1 16.16-49.77A2.52 2.52 0 00212.1 0z"></path>
                                    </svg>
                                    <span className="ml-4 flex items-start flex-col leading-none">
                                        <span className="text-xs text-gray-600 mb-1">Download on the</span>
                                        <span className="title-font font-medium">App Store</span>
                                    </span>
                                </button>

                            </div>


                        </div>

                    </div>
                </section>

            </div>
            <Footer/>
        </>
    )
}
