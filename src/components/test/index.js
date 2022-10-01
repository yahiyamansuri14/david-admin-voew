import axios from 'axios';
import React, { useState } from 'react'

export default function FileUpload() {
    const [file, setFile] = useState()
    async function readFileasDataURL(file) {
        let result = await new Promise((resolve) => {
            let fileReader = new FileReader();
            fileReader.onload = (e) => resolve(fileReader.result)
            fileReader.readAsDataURL(file)
        })
        return result
    }
    const handleUpload = async () => {
        // console.log("file is", file)
        // let base64 = await readFileasDataURL(file)
        // console.log(base64)
        // let data = { base64 }
        let formData = new FormData()
        formData.append('file', file)
        let token = await localStorage.getItem('access_token')
        axios({
            method: "POST",
            url: "http://139.144.62.230:8080/v1/user/upload/file",
            headers: {
                Authorization : `Bearer ${token}`
            },
            data: formData
        }).then(resp => {
            console.log(resp)
        }).catch(error => {
            console.log(error)
        })
    }

  

  return (
    <>
        <input type="file" onChange={(e) => setFile(e.target.files[0])}/>
        <button onClick={handleUpload}>Click</button>
    </>
  )
}
