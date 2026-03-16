import React, { useState, useEffect } from "react";

const Pickup = () => {

const [address,setAddress] = useState("");
const [phone,setPhone] = useState("");
const [time,setTime] = useState("");
const [date,setDate] = useState("");
const [image,setImage] = useState(null);

const [requests,setRequests] = useState([]);
const [mapUrl,setMapUrl] = useState("");

const [selectedTruck,setSelectedTruck] = useState(null);

/* TRUCK DATA */

const trucks = [

{
id:1,
name:"Green Waste Collector",
driver:"Ramesh",
vehicle:"MH31AB1234"
},

{
id:2,
name:"City Eco Truck",
driver:"Suresh",
vehicle:"MH31CD5678"
},

{
id:3,
name:"Smart Waste Van",
driver:"Amit",
vehicle:"MH31EF9012"
},

{
id:4,
name:"Clean City Carrier",
driver:"Rahul",
vehicle:"MH31GH3456"
},

{
id:5,
name:"Eco Pickup Truck",
driver:"Vikram",
vehicle:"MH31JK7890"
}

];


/* LOAD REQUESTS */

useEffect(()=>{

const loadRequests = () => {

const saved = JSON.parse(localStorage.getItem("pickupRequests")) || [];

setRequests(saved);

};

loadRequests();

const interval = setInterval(loadRequests,2000);

return ()=> clearInterval(interval);

},[]);


/* DETECT LOCATION */

const detectLocation = () => {

if(!navigator.geolocation){
alert("Geolocation not supported");
return;
}

navigator.geolocation.getCurrentPosition((position)=>{

const lat = position.coords.latitude;
const lon = position.coords.longitude;

const location = `${lat},${lon}`;

setAddress(location);

setMapUrl(`https://maps.google.com/maps?q=${location}&output=embed`);

});

};


/* SHOW MAP */

const showMap = (location) => {

if(!location) return;

setMapUrl(`https://maps.google.com/maps?q=${location}&output=embed`);

};


/* BOOK PICKUP */

const handleSubmit = (e) => {

e.preventDefault();

const newRequest = {

id: Date.now(),
address,
phone,
time,
date,
status:"Pending",
truck:null,
image: image ? URL.createObjectURL(image) : null

};

const existing = JSON.parse(localStorage.getItem("pickupRequests")) || [];

const updated = [...existing,newRequest];

localStorage.setItem("pickupRequests",JSON.stringify(updated));

setRequests(updated);

setAddress("");
setPhone("");
setTime("");
setDate("");
setImage(null);

};


/* CANCEL PICKUP */

const cancelPickup = (id) => {

const updated = requests.filter((req)=>req.id !== id);

setRequests(updated);

localStorage.setItem("pickupRequests",JSON.stringify(updated));

};


/* SHOW TRUCK DETAILS */

const showTruckDetails = (truckName) => {

const truck = trucks.find((t)=>t.name === truckName);

setSelectedTruck(truck);

};


return (

<div className="flex min-h-screen bg-gray-100">

{/* LEFT FORM */}

<div className="w-1/2 flex flex-col justify-center items-center p-12">

<h1 className="text-4xl font-bold text-green-600 mb-4">
Smart Garbage Pickup
</h1>

<p className="text-gray-600 text-center max-w-md mb-8">
Schedule garbage pickup and track requests.
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
Detect My Location
</button>


<input
type="text"
placeholder="Enter Address"
className="w-full border p-3 rounded mb-4"
value={address}
onChange={(e)=>setAddress(e.target.value)}
required
/>


<button
type="button"
onClick={()=>showMap(address)}
className="w-full bg-gray-700 text-white p-2 rounded mb-4"
>
Show Location On Map
</button>


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
className="w-32 h-32 object-cover rounded mb-4"
/>

)}


<input
type="date"
className="w-full border p-3 rounded mb-4"
value={date}
onChange={(e)=>setDate(e.target.value)}
required
/>


<input
type="time"
className="w-full border p-3 rounded mb-4"
value={time}
onChange={(e)=>setTime(e.target.value)}
required
/>


<button
type="submit"
className="w-full bg-green-500 text-white p-3 rounded"
>
Book Pickup
</button>

</form>

</div>



{/* RIGHT SIDE */}

<div className="w-1/2 bg-white p-10 overflow-y-auto">

<h2 className="text-2xl font-bold mb-6">
Pickup Requests
</h2>

<p className="text-gray-500 mb-4">
Total Requests: <b>{requests.length}</b>
</p>


{mapUrl && (

<iframe
title="map"
width="100%"
height="300"
style={{border:0}}
src={mapUrl}
/>

)}


{requests.map((req)=> (

<div
key={req.id}
className="border rounded-lg p-5 mb-4 shadow-sm"
>

<p><b>ID:</b> {req.id}</p>
<p><b>Address:</b> {req.address}</p>
<p><b>Phone:</b> {req.phone}</p>
<p><b>Date:</b> {req.date}</p>
<p><b>Time:</b> {req.time}</p>


{/* CLICKABLE TRUCK */}

{req.truck && (

<p
onClick={()=>showTruckDetails(req.truck)}
className="mt-1 text-blue-600 font-semibold cursor-pointer"
>
Assigned Truck: {req.truck}
</p>

)}


{req.image && (

<img
src={req.image}
alt="Waste"
className="w-32 h-32 object-cover rounded mt-2"
/>

)}


<p className="mt-2">

Status:

<span className={`ml-2 px-2 py-1 rounded ${
req.status === "Completed"
? "bg-green-200 text-green-800"
: "bg-yellow-200 text-yellow-800"
}`}>

{req.status}

</span>

</p>


<button
onClick={()=>cancelPickup(req.id)}
className="mt-3 bg-red-500 text-white px-4 py-1 rounded"
>
Cancel
</button>

</div>

))}

</div>


{/* TRUCK DETAILS POPUP */}

{selectedTruck && (

<div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center">

<div className="bg-white p-6 rounded-lg shadow-lg w-80">

<h2 className="text-xl font-bold mb-4">
Truck Information
</h2>

<p><b>Name:</b> {selectedTruck.name}</p>
<p><b>Driver:</b> {selectedTruck.driver}</p>
<p><b>Vehicle:</b> {selectedTruck.vehicle}</p>

<button
onClick={()=>setSelectedTruck(null)}
className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
>
Close
</button>

</div>

</div>

)}

</div>

);

};

export default Pickup;