# Anvaya CRM – Lead Management Platform

A full-stack CRM application for managing sales leads, tracking lead sources, and assigning leads to sales agents.
Built with a React frontend, Express/Node backend, MongoDB database, and Context API for state management.

---

## Demo Link

[Live Demo](https://anvaya-crm-seven.vercel.app/)  

---

## Screenshots
- ### Dashboard
<img width="1824" height="959" alt="ANVAYA-Dashboard" src="https://github.com/user-attachments/assets/26d27b06-553a-4a68-a0ca-19d9176bbbd3" />

- ### Lead List
<img width="1824" height="1065" alt="ANVAYA-Lead-List" src="https://github.com/user-attachments/assets/f5419759-b57a-450b-906b-0f9fc0ca4082" />

- ### Lead Details
<img width="1824" height="1463" alt="ANVAYA-Lead-Details" src="https://github.com/user-attachments/assets/f1f82901-7287-41c2-97d4-8512e09b3f6e" />


---

## Quick Start

```
git clone https://github.com/kshitijkatoch/Anvaya.git
cd Anvaya
npm install
npm run dev      # or `npm start` / `yarn dev`
```

---

## Technologies
- React JS
- React Router
- Context API
- Node.js
- Express.js
- MongoDB
- REST APIs
- JWT

---

## Features
**Dashboard**
- Overview of total leads
- Quick access to lead statistics

**Lead Management**
- Add new leads with details
- View all leads in a structured table
- Edit and update lead information

**Filtering & Sorting**
- Filter leads by status and source
- Sort leads based on priority or date

**Agent Assignment**
- Assign leads to sales agents
- Track which agent owns which lead

**Responsive Design**
- Fully responsive UI for desktop and mobile
- Smooth user experience across devices


---
## Environment Setup
```
PORT=5000
MONGODB_URL=your_mongodb_connection_string
```
---

## API Reference

### **GET	/api/leads**<br>	 
Fetch all leads<br>	 
Sample Response:<br>
```[{ "_id": "...", "name": "John Doe", "source": "Website", "status": "New" }]```

### **GET /api/leads/:id**<br>	 	
Fetch a single lead by ID<br>		
Sample Response:<br>
```{ "_id": "...", "name": "John Doe", "email": "john@example.com", "status": "Contacted" }```

### **POST /api/leads**<br> 	
Create a new lead<br>	
Sample Response:<br>
```{ "_id": "...", "name": "Jane Doe", "status": "New" }```

### **PUT /api/leads/:id**<br>  	
Update an existing lead<br> 	 
Sample Response:<br> 
```{ "_id": "...", "status": "Qualified" }```

---
## Contact
For bugs or feature requests, please reach out to kshitijkatoch213@gmail.com
