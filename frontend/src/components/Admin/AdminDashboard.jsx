import React, { useState, useEffect } from "react";

const AdminDashboard = () => {

const [requests,setRequests] = useState([]);
const [search,setSearch] = useState("");
const [activePage,setActivePage] = useState("dashboard");

/* TRUCK DATA */

const [trucks] = useState([
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
]);

/* LOAD PICKUPS */

const loadRequests = () => {

const saved = JSON.parse(localStorage.getItem("pickupRequests")) || [];

setRequests(saved);

};

useEffect(()=>{
loadRequests();
},[]);


/* SAVE DATA */

const saveRequests = (data) => {

setRequests(data);

localStorage.setItem("pickupRequests",JSON.stringify(data));

};


/* ASSIGN TRUCK */

const assignTruck = (id,truckName) => {

if(!truckName) return;

const updated = requests.map((req)=>
req.id === id ? {...req,truck:truckName} : req
);

saveRequests(updated);

};


/* COMPLETE PICKUP */

const markCompleted = (id) => {

const updated = requests.map((req)=>
req.id === id ? {...req,status:"Completed"} : req
);

saveRequests(updated);

};


/* DELETE REQUEST */

const deleteRequest = (id) => {

if(!window.confirm("Delete this pickup request?")) return;

const updated = requests.filter((req)=>req.id !== id);

saveRequests(updated);

};


/* ANALYTICS */

const total = requests.length;
const completed = requests.filter(r=>r.status==="Completed").length;
const pending = total - completed;


/* SEARCH FILTER */

const filteredRequests = requests.filter((req)=>
req.address?.toLowerCase().includes(search.toLowerCase()) ||
req.phone?.includes(search)
);



return (

<div className="flex min-h-screen bg-slate-100">


{/* SIDEBAR */}

<div className="w-64 bg-slate-900 text-white p-6">

<h2 className="text-2xl font-bold mb-8">
Admin Panel
</h2>

<ul className="space-y-4">

<li
onClick={()=>setActivePage("dashboard")}
className="hover:text-blue-400 cursor-pointer"
>
Dashboard
</li>

<li
onClick={()=>setActivePage("requests")}
className="hover:text-blue-400 cursor-pointer"
>
Pickup Requests
</li>

<li
onClick={()=>setActivePage("trucks")}
className="hover:text-blue-400 cursor-pointer"
>
Trucks
</li>

<li
onClick={()=>setActivePage("analytics")}
className="hover:text-blue-400 cursor-pointer"
>
Analytics
</li>

</ul>

</div>


{/* MAIN CONTENT */}

<div className="flex-1 p-10">

<h1 className="text-4xl font-bold text-slate-800 mb-8">
Waste Management Admin Dashboard
</h1>


{/* DASHBOARD */}

{activePage === "dashboard" && (

<div className="grid grid-cols-4 gap-6 mb-10">

<div className="bg-white border-l-4 border-blue-500 p-6 rounded-xl shadow-sm">
<p className="text-slate-500 text-sm">Total Pickups</p>
<p className="text-3xl font-bold text-slate-800 mt-2">{total}</p>
</div>

<div className="bg-white border-l-4 border-yellow-400 p-6 rounded-xl shadow-sm">
<p className="text-slate-500 text-sm">Pending</p>
<p className="text-3xl font-bold text-slate-800 mt-2">{pending}</p>
</div>

<div className="bg-white border-l-4 border-green-500 p-6 rounded-xl shadow-sm">
<p className="text-slate-500 text-sm">Completed</p>
<p className="text-3xl font-bold text-slate-800 mt-2">{completed}</p>
</div>

<div className="flex items-center">
<button
onClick={loadRequests}
className="bg-slate-800 text-white px-6 py-3 rounded-lg shadow hover:bg-slate-700 transition"
>
Refresh Data
</button>
</div>

</div>

)}


{/* PICKUP REQUESTS */}

{activePage === "requests" && (

<>

<input
type="text"
placeholder="Search by address or phone..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
className="mb-6 w-full p-3 border rounded-lg"
/>

<div className="bg-white rounded-xl shadow-sm overflow-hidden">

<table className="w-full">

<thead className="bg-slate-50 text-slate-600 text-sm uppercase">

<tr>
<th className="p-4 text-left">ID</th>
<th className="p-4 text-left">Address</th>
<th className="p-4 text-left">Phone</th>
<th className="p-4 text-left">Date</th>
<th className="p-4 text-left">Time</th>
<th className="p-4 text-left">Status</th>
<th className="p-4 text-left">Truck</th>
<th className="p-4 text-left">Image</th>
<th className="p-4 text-left">Assign Truck</th>
<th className="p-4 text-left">Actions</th>
</tr>

</thead>

<tbody className="text-slate-700">

{filteredRequests.length === 0 && (

<tr>
<td colSpan="10" className="text-center p-10 text-slate-400">
No Pickup Requests Found
</td>
</tr>

)}

{filteredRequests.map((req)=> (

<tr key={req.id} className="border-t hover:bg-slate-50 transition">

<td className="p-4 font-semibold">{req.id}</td>
<td className="p-4">{req.address}</td>
<td className="p-4">{req.phone}</td>
<td className="p-4">{req.date}</td>
<td className="p-4">{req.time}</td>

<td className="p-4">

<span className={`px-3 py-1 rounded-full text-xs font-medium ${
req.status === "Completed"
? "bg-green-100 text-green-700"
: "bg-yellow-100 text-yellow-700"
}`}>
{req.status}
</span>

</td>

<td className="p-4">{req.truck || "Not Assigned"}</td>

<td className="p-4">

{req.image ? (
<img src={req.image} alt="waste" className="w-14 h-14 object-cover rounded-md"/>
) : "No Image"}

</td>

<td className="p-4">

<select
onChange={(e)=>assignTruck(req.id,e.target.value)}
className="border rounded p-1 text-sm"
defaultValue=""
>

<option value="" disabled>
Assign Truck
</option>

{trucks.map((truck)=>(
<option key={truck.id} value={truck.name}>
{truck.name} - {truck.driver}
</option>
))}

</select>

</td>

<td className="p-4 flex gap-2">

<button
onClick={()=>markCompleted(req.id)}
className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 text-sm"
>
Complete
</button>

<button
onClick={()=>deleteRequest(req.id)}
className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-sm"
>
Delete
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

</>

)}


{/* TRUCK PAGE */}

{activePage === "trucks" && (

<div className="bg-white p-6 rounded-xl shadow">

<h2 className="text-2xl font-bold mb-6">
Truck Fleet
</h2>

<table className="w-full">

<thead className="bg-slate-100">

<tr>
<th className="p-3 text-left">Truck Name</th>
<th className="p-3 text-left">Driver</th>
<th className="p-3 text-left">Vehicle Number</th>
<th className="p-3 text-left">Status</th>
</tr>

</thead>

<tbody>

{trucks.map((truck)=>(
<tr key={truck.id} className="border-t">

<td className="p-3 font-semibold">{truck.name}</td>
<td className="p-3">{truck.driver}</td>
<td className="p-3">{truck.vehicle}</td>
<td className="p-3 text-green-600 font-medium">Available</td>

</tr>
))}

</tbody>

</table>

</div>

)}


{/* ANALYTICS */}

{activePage === "analytics" && (

<div className="bg-white p-6 rounded-xl shadow">

<h2 className="text-2xl font-bold mb-4">
Analytics
</h2>

<p>Total Requests: {total}</p>
<p>Completed Requests: {completed}</p>
<p>Pending Requests: {pending}</p>

</div>

)}

</div>

</div>

);

};

export default AdminDashboard;