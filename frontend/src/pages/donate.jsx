import React, { useState, useEffect } from "react";

/* NGO DATABASE */

const ngos = [
{
name: "Vidya Education NGO",
category: "Books",
lat: 18.5204,
lng: 73.8567
},
{
name: "Helping Hands NGO",
category: "Clothes",
lat: 18.5314,
lng: 73.8446
},
{
name: "EcoRecycle Center",
category: "Electronics",
lat: 18.5074,
lng: 73.8077
},
{
name: "Hope Shelter Home",
category: "Furniture",
lat: 18.5340,
lng: 73.8200
},
{
name: "Smile Kids Orphanage",
category: "Toys",
lat: 18.5400,
lng: 73.8300
}
];

/* CATEGORY INFO */

const categoryData = {

Books: {
receiver: "Local Schools / Libraries",
impact: "Your books will help students learn"
},

Clothes: {
receiver: "Community NGOs",
impact: "Your clothes will support families"
},

Electronics: {
receiver: "Certified E-Waste Recycler",
impact: "Your e-waste will be recycled"
},

Furniture: {
receiver: "Shelter Homes",
impact: "Your furniture will help families"
},

Toys: {
receiver: "Orphanages",
impact: "Your toys bring joy to kids"
}

};

const Donate = () => {

const [category,setCategory] = useState("");
const [description,setDescription] = useState("");
const [image,setImage] = useState(null);
const [pickupDate,setPickupDate] = useState("");
const [pickupTime,setPickupTime] = useState("");
const [type,setType] = useState("Donate");

const [donations,setDonations] = useState([]);
const [points,setPoints] = useState(0);

const [userLocation,setUserLocation] = useState(null);
const [searchLocation,setSearchLocation] = useState("");

/* LOAD DATA */

useEffect(()=>{

const savedDonations = JSON.parse(localStorage.getItem("donations"));
const savedPoints = localStorage.getItem("points");

if(savedDonations){
setDonations(savedDonations);
}

if(savedPoints){
setPoints(parseInt(savedPoints));
}else{
setPoints(0);
}

},[]);

/* SAVE DONATIONS */

useEffect(()=>{
localStorage.setItem("donations",JSON.stringify(donations));
},[donations]);

/* AUTO LOCATION */

useEffect(()=>{

if(navigator.geolocation){

navigator.geolocation.getCurrentPosition((pos)=>{

const lat = pos.coords.latitude;
const lng = pos.coords.longitude;

setUserLocation({lat,lng});
setSearchLocation(`${lat},${lng}`);

});

}

},[]);

/* MANUAL LOCATION SEARCH */

const searchManualLocation = async () => {

if(!searchLocation) return;

try{

const res = await fetch(
`https://nominatim.openstreetmap.org/search?format=json&q=${searchLocation}`
);

const data = await res.json();

if(data.length > 0){

const lat = parseFloat(data[0].lat);
const lng = parseFloat(data[0].lon);

setUserLocation({lat,lng});
setSearchLocation(`${lat},${lng}`);

}

}catch(err){
console.log(err);
}

};

/* DISTANCE CALCULATION */

const getDistance = (lat1,lon1,lat2,lon2)=>{

const R = 6371;

const dLat = (lat2-lat1) * Math.PI/180;
const dLon = (lon2-lon1) * Math.PI/180;

const a =
Math.sin(dLat/2)**2 +
Math.cos(lat1*Math.PI/180) *
Math.cos(lat2*Math.PI/180) *
Math.sin(dLon/2)**2;

const c = 2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));

return R*c;

};

/* FIND NEAREST NGO */

const findNearestNGO = (category)=>{

if(!userLocation) return "Detecting location...";

const filtered = ngos.filter(n => n.category === category);

let nearest=null;
let min=Infinity;

filtered.forEach((ngo)=>{

const dist = getDistance(
userLocation.lat,
userLocation.lng,
ngo.lat,
ngo.lng
);

if(dist < min){

min=dist;
nearest=ngo;

}

});

return nearest
? `${nearest.name} (${min.toFixed(1)} km away)`
: "No NGO found";

};

/* BADGE SYSTEM */

const getBadge = () => {

if(points >= 50) return "Eco Champion";
if(points >= 30) return "Green Contributor";
if(points >= 10) return "Community Donor";
return "New Member";

};

/* RESET */

const resetData = () => {

localStorage.clear();
setPoints(0);
setDonations([]);

};

/* SUBMIT */

const handleSubmit = (e)=>{

e.preventDefault();

const imageUrl = image ? URL.createObjectURL(image) : null;

const newDonation = {

id: Date.now(),
type,
category,
description,
pickupDate,
pickupTime,
receiver: categoryData[category]?.receiver,
partner: findNearestNGO(category),
impact: categoryData[category]?.impact,
image: imageUrl

};

const updated = [...donations,newDonation];

setDonations(updated);

const newPoints = points + 10;

setPoints(newPoints);

localStorage.setItem("points",newPoints);

setCategory("");
setDescription("");
setImage(null);
setPickupDate("");
setPickupTime("");
setType("Donate");

};

/* STATS */

const booksCount = donations.filter(d=>d.category==="Books").length;
const clothesCount = donations.filter(d=>d.category==="Clothes").length;
const electronicsCount = donations.filter(d=>d.category==="Electronics").length;

return (

<div className="min-h-screen bg-gray-100">

{/* DASHBOARD */}

<div className="flex justify-center gap-10 bg-white p-6 shadow">

<div className="text-center">
<h2 className="text-2xl font-bold text-yellow-500">{points}</h2>
<p>Eco Points</p>
</div>

<div className="text-center">
<h2 className="text-2xl font-bold text-green-600">{donations.length}</h2>
<p>Items Reused</p>
</div>

<div className="text-center">
<h2 className="text-2xl font-bold text-blue-600">{booksCount}</h2>
<p>Books Shared</p>
</div>

<div className="text-center">
<h2 className="text-2xl font-bold text-purple-600">{clothesCount}</h2>
<p>Clothes Donated</p>
</div>

<div className="text-center">
<h2 className="text-2xl font-bold text-orange-600">{electronicsCount}</h2>
<p>Electronics Recycled</p>
</div>

<button
onClick={resetData}
className="bg-red-500 text-white px-4 py-2 rounded"
>
Reset
</button>

</div>

{/* MAIN */}

<div className="flex">

{/* LEFT FORM */}

<div className="w-1/2 p-10">

<h1 className="text-4xl font-bold text-green-600 mb-4">
Reuse & Donation Hub 
</h1>

<p className="mb-4 font-semibold">
Badge: {getBadge()}
</p>

<form
onSubmit={handleSubmit}
className="bg-white p-8 rounded-xl shadow"
>

<div className="flex gap-2 mb-4">

<input
type="text"
placeholder="Enter city or area"
value={searchLocation}
onChange={(e)=>setSearchLocation(e.target.value)}
className="w-full border p-3 rounded"
/>

<button
type="button"
onClick={searchManualLocation}
className="bg-blue-500 text-white px-4 rounded"
>
Search
</button>

</div>

<select
className="w-full border p-3 mb-4 rounded"
value={type}
onChange={(e)=>setType(e.target.value)}
>
<option>Donate</option>
<option>Sell</option>
</select>

<select
className="w-full border p-3 mb-4 rounded"
value={category}
onChange={(e)=>setCategory(e.target.value)}
required
>

<option value="">Select Category</option>
<option>Books</option>
<option>Clothes</option>
<option>Electronics</option>
<option>Furniture</option>
<option>Toys</option>

</select>

<textarea
placeholder="Item Description"
className="w-full border p-3 mb-4 rounded"
value={description}
onChange={(e)=>setDescription(e.target.value)}
required
/>

<input
type="file"
accept="image/*"
className="w-full border p-3 mb-4 rounded"
onChange={(e)=>setImage(e.target.files[0])}
/>

<input
type="date"
className="w-full border p-3 mb-4 rounded"
value={pickupDate}
onChange={(e)=>setPickupDate(e.target.value)}
required
/>

<input
type="time"
className="w-full border p-3 mb-4 rounded"
value={pickupTime}
onChange={(e)=>setPickupTime(e.target.value)}
required
/>

<button
type="submit"
className="w-full bg-green-500 text-white p-3 rounded"
>
Submit Item
</button>

</form>

</div>

{/* RIGHT SIDE */}

<div className="w-1/2 bg-white p-10 overflow-y-auto">

<h3 className="font-semibold mb-2">
Nearby NGO Map
</h3>

{searchLocation && (

<iframe
title="Google Map"
width="100%"
height="300"
style={{border:0}}
loading="lazy"
allowFullScreen
src={`https://maps.google.com/maps?q=${searchLocation}&z=13&output=embed`}
></iframe>

)}

<h2 className="text-2xl font-bold mt-6 mb-4">
Community Reuse Feed
</h2>

{donations.length === 0 && (
<p>No donations yet</p>
)}

{donations.map((item)=> (

<div
key={item.id}
className="border rounded-xl p-4 mb-4 shadow"
>

<span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
{item.type}
</span>

<p><b>Category:</b> {item.category}</p>
<p><b>Description:</b> {item.description}</p>
<p><b>Receiver:</b> {item.receiver}</p>
<p><b>Nearby NGO:</b> {item.partner}</p>
<p><b>Pickup:</b> {item.pickupDate} {item.pickupTime}</p>

{item.image && (
<img
src={item.image}
alt="Donation Item"
className="w-32 h-32 mt-2 rounded object-cover"
/>
)}

<p className="text-green-600 mt-2">
{item.impact}
</p>

</div>

))}

</div>

</div>

</div>

);

};

export default Donate;