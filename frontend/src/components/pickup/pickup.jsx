import React, { useState } from "react";

const Pickup = () => {

const [address,setAddress] = useState("");
const [phone,setPhone] = useState("");
const [time,setTime] = useState("");
const [image,setImage] = useState(null);

const [requests,setRequests] = useState([]);

const handleSubmit = (e) => {

e.preventDefault();

const newRequest = {
id: Date.now(),
address,
phone,
time,
date: new Date().toLocaleDateString(),
status: "Pending",
image: image ? URL.createObjectURL(image) : null
};

setRequests([...requests,newRequest]);

setAddress("");
setPhone("");
setTime("");

};

const cancelPickup = (id) => {

setRequests(requests.filter((req)=>req.id !== id));

};
const detectLocation = () => {

navigator.geolocation.getCurrentPosition((position)=>{

const lat = position.coords.latitude;
const lon = position.coords.longitude;

setAddress(`Lat: ${lat}, Lon: ${lon}`);

});

};
const markCompleted = (id) => {

setRequests(

requests.map((req)=>

req.id === id ? {...req,status:"Completed"} : req

)

);

};

return (

<div className="flex min-h-screen bg-gray-100">

{/* LEFT SECTION */}

<div className="w-1/2 flex flex-col justify-center items-center p-12">

<h1 className="text-4xl font-bold text-green-600 mb-4">

Smart Garbage Pickup 

</h1>

<p className="text-gray-600 text-center max-w-md mb-8">

Schedule a garbage pickup from your home and track requests in real time.
Help keep your city clean and sustainable.

</p>

<form
onSubmit={handleSubmit}
className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
>
    <button
type="button"
onClick={detectLocation}
className="w-full mb-4 bg-blue-500 text-white p-2 rounded"
>

<b>Detect My Location</b>

</button>

<input
type="text"
placeholder="Pickup Address"
className="w-full border p-3 rounded mb-4"
value={address}
onChange={(e)=>setAddress(e.target.value)}
required
/>

<input
type="text"
placeholder="Phone Number"
className="w-full border p-3 rounded mb-4"
value={phone}
onChange={(e)=>setPhone(e.target.value)}
required
/>

<input
type="file"
accept="image/*"
className="w-full border p-3 rounded mb-4"
onChange={(e)=>setImage(e.target.files[0])}
/>

{image && (
<img
src={URL.createObjectURL(image)}
alt="Preview"
className="mt-3 w-32 h-32 object-cover rounded"
/>
)}

<input
type="time"
className="w-full border p-3 rounded mb-4"
value={time}
onChange={(e)=>setTime(e.target.value)}
required
/>

<button
type="submit"
className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600"
>

Book Pickup

</button>

</form>

</div>

{/* RIGHT SECTION */}

<div className="w-1/2 bg-white p-10 overflow-y-auto">

<h2 className="text-2xl font-bold mb-6">

Pickup Requests

</h2>
<p className="text-gray-500 mb-4">
Total Requests: <b>{requests.length}</b>
</p>

{requests.length === 0 && (

<div className="text-center text-gray-500 border p-10 rounded-lg">

 No pickups scheduled yet

<p className="mt-2 text-sm">

Book your first garbage pickup to keep your area clean.

</p>

</div>

)}

{requests.map((req)=> (

<div
key={req.id}
className="border rounded-lg p-5 mb-4 shadow-sm"
>
<p><b>Pickup ID:</b> #{req.id}</p>
<p><b>Address:</b> {req.address}</p>

<p><b>Phone:</b> {req.phone}</p>

<p><b>Time:</b> {req.time}</p>
<p><b>Date:</b> {req.date}</p>

{req.image && (
<img
src={req.image}
alt="Waste"
className="mt-3 w-32 h-32 object-cover rounded"
/>
)}

<p className="mt-2">

Status:

<span className="ml-2 bg-yellow-200 text-yellow-800 px-2 py-1 rounded">

{req.status}

</span>

</p>

<button
onClick={()=>cancelPickup(req.id)}
className="mt-3 mr-3 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
>
Cancel Pickup
</button>
<button
disabled={req.status === "Completed"}
onClick={()=>markCompleted(req.id)}
className={`px-4 py-1 rounded text-white ${
req.status === "Completed"
? "bg-gray-400 cursor-not-allowed"
: "bg-green-500 hover:bg-green-600"
}`}
>
Mark Completed
</button>

</div>

))}

</div>

</div>

);

};

export default Pickup;