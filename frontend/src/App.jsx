import { useState } from "react"
import axios from "axios"
import * as XLSX from "xlsx"

function App() {

  const [msg,setmsg]=useState("")
  const [status,setstatus]=useState(false)
  const [emailList,setemailList]=useState([])
  const url="https://bulk-mail-roag.onrender.com"

  function handlemsg(evt)
  {
    setmsg(evt.target.value)
  }

  function handlefile(evt)
  {
 const file=evt.target.files[0]
 console.log(file)
 const reader=new FileReader();
 reader.onload=function(e){
  const data=e.target.result;
  const workbook=XLSX.read(data,{type:'binary'})
  const sheetName=workbook.SheetNames[0]
  const worksheet=workbook.Sheets[sheetName]
const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
console.log(rows)
const totalemail = rows.flat().filter(Boolean)
console.log(totalemail)
  
  setemailList(totalemail)

 }
 reader.readAsBinaryString(file)
  }

  function send()
  {
    setstatus(true)
    axios.post(`${url}/sendmail`,{msg:msg,emailList:emailList})

    .then(function(data)
    {
      if(data.data===true)
      {
        alert("Email sent Successfully")
        setstatus(false)
      }
      else{
        alert("Email sent fail")
      }
    })
  }

  return (
    <div>
      <div className="bg-blue-950 text-white text-center">
        <h1 className="text-2xl font-medium px-5 py-3">Bulk Mail App</h1>
      </div>

      <div className="bg-blue-800 text-white text-center">
        <h1 className="font-medium px-5 py-3">We can help your business with sending multiple emails at once </h1>
      </div>

      <div className="bg-blue-600 text-white text-center">
        <h1 className="text-2xl font-medium px-5 py-3">Drag and Drop</h1>
      </div>


      <div className="bg-blue-400 flex flex-col items-center text-black px-5 py-3">
        <textarea onChange={handlemsg} value={msg} className="bg-white w-[80%] h-32 py-2 outline-none px-2 border-black rounded-md" placeholder="Enter Email Text..."></textarea>

 <div className="mt-5 mb-5">

  <label className="border-4 border-dashed border-wh ite px-6 py-6 cursor-pointer block text-center ">

<input onChange={handlefile} type="file" className=""></input>

  </label>

 </div>
        <p>Toatal Emails in the file : {emailList.length}</p>

        <button onClick={send} className="bg-blue-950 px-2 py-2 mt-2 text-white font-medium rounded-md w-fit">{status?"sending...":"Send"}</button>
      </div>

      
      <div className="bg-blue-300 text-white text-center p-8">
   
      </div>
      
      <div className="bg-blue-200 text-white text-center p-8 ">
    
      </div>


    </div>
  )
}

export default App
