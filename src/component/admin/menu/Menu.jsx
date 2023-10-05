import React, { useEffect, useState } from "react";
import axios from "axios";

function splitPath(path) {
    const respath = path.split('\\')
    return respath[0] + "/" + respath[1] + "/" + respath[2]
}

export default function Menu() {
    const headers = {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    };

    const [menu, setMenu] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [pickId, setPickId] = useState("")

    useEffect(() => {
        const fecthAllMenu = async () => {
            try {
                const res = await axios.get("http://localhost:8080/menu/", {headers})
                console.log(res)
                setMenu(res.data.data)
            } catch (err) {
                console.log(err)
            }
        }
        fecthAllMenu()
    }, [])

    //mengambil id yang akan di delete
    const selectId = (id) => {
        setPickId(id)
        setShowModal(true)
    }

    //menghapus id
    const deleteId = async () => {
        try {
            await axios.delete("http://localhost:8080/menu/" + pickId, {headers})
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <div className="my-8 mx-16">
                <div>
                    <a href="add_menu">
                        <button type="button" className="mb-1 text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-green-600 hover:bg-green-700 focus:ring-green-800">
                            Tambahkan Menu
                        </button>
                    </a>
                </div>
                <div className="flex flex-wrap gap-5 ">
                    <div className="w-full relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="table-fixed w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-white uppercase bg-gray-800">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-center">
                                        Gambar
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center">
                                        Nama Menu
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center">
                                        Jenis
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center">
                                        Harga
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center">
                                        Deskripsi
                                    </th>
                                    <th scope="col" className="pl-6 py-3 text-right">
                                        <span className="sr-only">Edit / Delete</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {menu && menu.map((menu, index) => (
                                    <tr key={menu.id} className="bg-white border-b hover:bg-gray-50">
                                        <td>
                                            <img className="h-auto max-w-[100%]" src={`http://localhost:8080/gambar/${menu.gambar}`} alt="product" />
                                        </td>
                                        <td className="px-6 py-4 text-center">{menu.nama_menu}</td>
                                        <td className="px-6 py-4 text-center">{menu.jenis}</td>
                                        <td className="px-6 py-4 text-center">{menu.harga}</td>
                                        <td className="px-6 py-4 text-left w-49">{menu.deskripsi}</td>
                                        <td className="pl-6 py-4 text-right">
                                            <a href={`edit_menu/${menu.id}`} className="font-medium text-blue-600 hover:underline">
                                                Edit
                                            </a>
                                            <button onClick={() => selectId(menu.id)} className="mx-4 font-medium text-red-600 hover:underline">  Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* modal delete */}
            {showModal ? (
                <div>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className=" border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="relative rounded-lg shadow bg-gray-700">
                                    <button onClick={() => setShowModal(false)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white" data-modal-hide="popup-modal">
                                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                    <div className="p-6 text-center">
                                        <svg aria-hidden="true" className="mx-auto mb-4 w-14 h-14 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        <h3 className="mb-5 text-lg font-normal text-gray-400">Apakah anda yakin ingin menghapus user ini?</h3>
                                        <button onClick={deleteId} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                            Delete
                                        </button>
                                        <button onClick={() => setShowModal(false)} data-modal-hide="popup-modal" type="button" className="focus:ring-4 focus:outline-none rounded-lg border text-sm font-medium px-5 py-2.5 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </div>
            ) : null}
        </div>
    )
}