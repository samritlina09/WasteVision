# WasteVision

### AI-Powered Waste Classification & Reuse Platform

WasteVision is a computer vision-based waste classification platform that uses a **Convolutional Neural Network (CNN)** trained on **8000+ waste images** to classify waste into **11 different categories**.

The platform helps users **identify waste type, schedule waste pickup, and donate or sell reusable items** such as books, clothes, and electronics, promoting sustainable waste management and reuse practices.

---

## Key Features

### ♻ AI Waste Detection
- Detects waste type using **Computer Vision**
- Classifies waste into **11 categories**
- Provides guidance for proper disposal and recycling

### 📦 Waste Pickup Scheduling
- Users can **book waste pickup** from their location
- Helps improve waste collection efficiency

### 🤝 Donation & Resale Platform
- Users can **donate or sell reusable items**
- Items include **books, clothes, and electronics**
- Connects donors with **users or NGOs**

### 💻 Web Application
- Upload or capture **waste images**
- View **classification results instantly**
- Simple and user-friendly interface

---

## Technologies Used

### Frontend
- React.js
- HTML
- JavaScript
- Tailwind CSS

### Backend
- Python
- Django Framework

### AI / Machine Learning
- Convolutional Neural Network (CNN)
- Computer Vision

---

## How It Works

1. User uploads or captures a **waste image** through the web application  
2. The image is sent to the **backend server (Django)**  
3. The **CNN model analyzes the image and detects the waste type**  
4. The system displays **classification results and disposal guidance**  
5. Users can **schedule waste pickup or donate/sell reusable items**

---

## Installation

Clone the repository:

```
git clone https://github.com/YOUR_USERNAME/WasteVision.git
```

---

## Frontend Setup

Install dependencies:

```
npm install
```

Start the development server:

```
npm start
```

Create production build:

```
npm run build
```

---

## Backend Setup

Run the Django server:

```
python manage.py runserver
```

Apply database migrations:

```
python manage.py makemigrations
python manage.py migrate
```

Server will run at:

```
http://127.0.0.1:8000
```

---

