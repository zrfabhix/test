import React, { useEffect, useState } from 'react'
import { db, storage } from '../config/config'
import Footer from './Footer'
import docs from '../assets/docs.png'
import Navbar from './Navbar'

export default function Get() {

    const [mydata, setmydata] = useState([])

    const downloaddata = (element) =>{
        window.location.href = element.url
    }

    const deletedata = (element) => {

        console.log(element)

        storage.refFromURL(element.url).delete().then(function () {
            db.collection('data')
                .doc(element.id)
                .delete()
                .then(() => {
                    console.log('File deleted');
                    alert("File deleted")
                });
        })



    }

    const fetchdata = async () => {

        await db.collection('data')
            .get()
            .then(querySnapshot => {
                console.log('Total data: ', querySnapshot.size);

                querySnapshot.forEach(element => {
                    var data = element.data();

                    setmydata((prev) => {
                        return [...prev, data]
                    })

                    // setBlogs([...blogs,item.data()])
                });



            });



    }


    // Code for fetching data from firestore



    useEffect(() => {

        fetchdata()


    }, [])




    return (
        <>
            <Navbar />

            <div>
                
                <section class="text-gray-600 body-font">
                    
                    <div class="container px-5 py-24 mx-auto">
                        

                        <div class="flex flex-wrap -m-4">

                            

                            {mydata && mydata.map((element) => {
                                console.log(element)

                                let filename = element.filename

                                if (filename.endsWith("png")) {

                                    return (

                                        <div class="xl:w-1/4 md:w-1/2 p-4">
                                            <div class="bg-gray-100 p-6 rounded-lg">
                                                <img class="h-40 rounded w-full object-cover object-center mb-6" src={element.url}alt="content" />

                                                <h2 class="text-lg text-gray-900 font-medium title-font mb-4">Filename</h2>
                                                <button  class="leading-relaxed text-base m-2 text-white rounded-lg bg-gray-500 p-2 ">Download</button>
                                                <button onClick={()=>{
                                                    deletedata(element)
                                                }}  class="leading-relaxed text-base text-white rounded-lg bg-gray-500 p-2 ">Delete</button>
                                            </div>
                                        </div>
                                    )

                                }

                                if (filename.endsWith("jpg")) {

                                    return (

                                        <div class="xl:w-1/4 md:w-1/2 p-4">
                                            <div class="bg-gray-100 p-6 rounded-lg">
                                                <img class="h-40 rounded w-full object-cover object-center mb-6" src={element.url} alt="content" />

                                                <h2 class="text-lg text-gray-900 font-medium title-font mb-4">Filename</h2>
                                                <button class="leading-relaxed text-base m-2 text-white rounded-lg bg-gray-500 p-2 ">Download</button>
                                                <button onClick={()=>{
                                                    deletedata(element)
                                                }}  class="leading-relaxed text-base text-white rounded-lg bg-gray-500 p-2 ">Delete</button>
                                            </div>
                                        </div>
                                    )

                                }
                                if (filename.endsWith("jpeg")) {

                                    return (

                                        <div class="xl:w-1/4 md:w-1/2 p-4">
                                            <div class="bg-gray-100 p-6 rounded-lg">
                                                <img class="h-40 rounded w-full object-cover object-center mb-6" src={element.url} alt="content" />

                                                <h2 class="text-lg text-gray-900 font-medium title-font mb-4">Filename</h2>
                                                <button class="leading-relaxed text-base m-2 text-white rounded-lg bg-gray-500 p-2 ">Download</button>
                                                <button onClick={()=>{
                                                    deletedata(element)
                                                }}  class="leading-relaxed text-base text-white rounded-lg bg-gray-500 p-2 ">Delete</button>
                                            </div>
                                        </div>
                                    )

                                }
                                if (filename.endsWith("mp4")) {

                                    return (

                                        <div class="xl:w-1/4 md:w-1/2 p-4">
                                            <div class="bg-gray-100 p-6 rounded-lg">
                                                <video controls class="h-40 rounded w-full object-cover object-center mb-6" src={element.url} alt="content" />

                                                <h2 class="text-lg text-gray-900 font-medium title-font mb-4">Filename</h2>
                                                <button class="leading-relaxed text-base m-2 text-white rounded-lg bg-gray-500 p-2 ">Download</button>
                                                <button onClick={()=>{
                                                    deletedata(element)
                                                }}  class="leading-relaxed text-base text-white rounded-lg bg-gray-500 p-2 ">Delete</button>
                                            </div>
                                        </div>
                                    )

                                }
                                if (filename.endsWith("mp3")) {

                                    return (

                                        <div class="xl:w-1/4 md:w-1/2 p-4">
                                            <div class="bg-gray-100 p-6 rounded-lg">
                                                <audio controls class="h-40 rounded w-full object-cover object-center mb-6" src={element.url} alt="content" />

                                                <h2 class="text-lg text-gray-900 font-medium title-font mb-4">Filename</h2>
                                                <button class="leading-relaxed text-base m-2 text-white rounded-lg bg-gray-500 p-2 ">Download</button>
                                                <button onClick={()=>{
                                                    deletedata(element)
                                                }}  class="leading-relaxed text-base text-white rounded-lg bg-gray-500 p-2 ">Delete</button>
                                            </div>
                                        </div>
                                    )

                                }
                                else {

                                    return (

                                        <div class="xl:w-1/4 md:w-1/2 p-4">
                                            <div class="bg-gray-100 p-6 rounded-lg">
                                                <img class="h-40 w-40 rounded  object-cover object-center mb-6" src={docs}  alt="content" />

                                                <h2 class="text-lg text-gray-900 font-medium title-font mb-4">Filename</h2>
                                                <button onClick={()=>{
                                                    downloaddata(element)
                                                }} class="leading-relaxed text-base m-2 text-white rounded-lg bg-gray-500 p-2 ">Download</button>
                                                <button onClick={()=>{
                                                    deletedata(element)
                                                }} class="leading-relaxed text-base text-white rounded-lg bg-gray-500 p-2 ">Delete</button>
                                            </div>
                                        </div>
                                    )

                                }
                              

                            })}






                        </div>
                    </div>
                </section>

            </div>
            <Footer />
        </>
    )
}
