import React, { useState } from "react";

const Donate = () => {

const [category,setCategory] = useState("");
const [description,setDescription] = useState("");
const [image,setImage] = useState(null);
const [donations,setDonations] = useState([]);
const [pickupDate,setPickupDate] = useState("");
const [pickupTime,setPickupTime] = useState("");
const [type,setType] = useState("Donate");

const booksCount = donations.filter(d => d.category === "Books").length;
const clothesCount = donations.filter(d => d.category === "Clothes").length;
const electronicsCount = donations.filter(d => d.category === "Electronics").length;

const [points,setPoints] = useState(0);

const getBadge = () => {
if(points >= 50) return "Eco Champion ";
if(points >= 30) return "Green Contributor ";
if(points >= 10) return "Community Donor ";
return "New Member";
};

const getReceiver = (category) => {

if(category === "Books") return "Local Schools / Libraries";
if(category === "Clothes") return "Community NGOs";
if(category === "Electronics") return "Certified E-Waste Recycler";
if(category === "Furniture") return "Shelter Homes";
if(category === "Toys") return "Orphanages";

return "Community Center";
};

const getNearbyPartner = (category) => {

if(category === "Books") return "Vidya Education NGO (2 km away)";
if(category === "Clothes") return "Helping Hands NGO (1.5 km away)";
if(category === "Electronics") return "EcoRecycle Center (3 km away)";
if(category === "Furniture") return "Hope Shelter Home (2.5 km away)";
if(category === "Toys") return "Smile Kids Orphanage (1 km away)";

return "Community Support Center";
};

const getImpact = (category) => {

if(category === "Books") return "Your books will help students learn ";
if(category === "Clothes") return "Your clothes will support families in need ";
if(category === "Electronics") return "Your e-waste will be safely recycled ";
if(category === "Toys") return "Your toys will bring joy to children ";

return "Your donation helps the community ";
};

const handleSubmit = (e) => {

e.preventDefault();

const newDonation = {
id: Date.now(),
type,
category,
description,
pickupDate,
pickupTime,
receiver: getReceiver(category),
partner: getNearbyPartner(category),
image: image ? URL.createObjectURL(image) : null,
impact: getImpact(category)
};

setDonations([...donations,newDonation]);
setPoints(points + 10);

setCategory("");
setDescription("");
setImage(null);
setPickupDate("");
setPickupTime("");
setType("Donate");
};

return (

<div className="min-h-screen bg-gray-100">

{/* STATS DASHBOARD */}

<div className="flex justify-center gap-10 bg-white p-6 shadow-md">

<div className="text-center">
<h2 className="text-2xl font-bold text-yellow-500">{points}</h2>
<p> Eco Points</p>
</div>

<div className="text-center">
<h2 className="text-2xl font-bold text-green-600">{donations.length}</h2>
<p> Items Reused</p>
</div>

<div className="text-center">
<h2 className="text-2xl font-bold text-blue-600">{booksCount}</h2>
<p> Books Shared</p>
</div>

<div className="text-center">
<h2 className="text-2xl font-bold text-purple-600">{clothesCount}</h2>
<p> Clothes Donated</p>
</div>

<div className="text-center">
<h2 className="text-2xl font-bold text-orange-600">{electronicsCount}</h2>
<p> Electronics Recycled</p>
</div>

</div>

{/* MAIN SECTION */}

<div className="flex min-h-screen">

{/* LEFT SECTION */}

<div className="w-1/2 flex flex-col justify-center items-center p-12">

<h1 className="text-4xl font-bold text-green-600 mb-4">
Reuse & Donation 
    Hub ♻️
</h1>

<p className="text-green-600 font-semibold mt-2">
Badge: {getBadge()}
</p>

<p className="text-gray-600 text-center max-w-md mb-8">
Donate items instead of throwing them away. Help people and reduce waste.
</p>

<form
onSubmit={handleSubmit}
className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
>

<select
className="w-full border p-3 rounded mb-4"
value={type}
onChange={(e)=>setType(e.target.value)}
>
<option>Donate</option>
<option>Sell</option>
</select>

<select
className="w-full border p-3 rounded mb-4"
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
className="w-full border p-3 rounded mb-4"
value={description}
onChange={(e)=>setDescription(e.target.value)}
required
/>

<input
type="file"
accept="image/*"
className="w-full border p-3 rounded mb-4"
onChange={(e)=>setImage(e.target.files[0])}
/>

<input
type="date"
className="w-full border p-3 rounded mb-4"
value={pickupDate}
onChange={(e)=>setPickupDate(e.target.value)}
required
/>

<input
type="time"
className="w-full border p-3 rounded mb-4"
value={pickupTime}
onChange={(e)=>setPickupTime(e.target.value)}
required
/>

<button
type="submit"
className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600"
>
Submit Item
</button>

</form>

</div>

{/* RIGHT SECTION */}

<div className="w-1/2 bg-white p-10 overflow-y-auto">

<h2 className="text-2xl font-bold mb-6">
Community Reuse Feed
</h2>

{donations.length === 0 && (
<p className="text-gray-500">
No donations yet.
</p>
)}

{donations.map((item)=> (

<div
key={item.id}
className="border rounded-xl p-5 mb-4 shadow-md hover:shadow-lg transition"
>

<span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
{item.type}
</span>

<p className="mt-2"><b>Category:</b> {item.category}</p>

<p><b>Description:</b> {item.description}</p>

<p><b>Receiver:</b> {item.receiver}</p>

<p><b>Nearby Partner:</b> {item.partner}</p>

<p><b>Pickup:</b> {item.pickupDate} at {item.pickupTime}</p>

{item.image && (
<img
src={item.image}
alt="Donation"
className="mt-3 w-32 h-32 object-cover rounded"
/>
)}

<p className="mt-3 text-green-600">
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