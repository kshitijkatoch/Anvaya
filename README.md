# Anvaya CRM – Lead Management Platform

A full-stack CRM application for managing sales leads, tracking lead sources, and assigning leads to sales agents.
Built with a React frontend, Express/Node backend, MongoDB database, and Context API for state management.

---

## Demo Link

[Live Demo](https://anvaya-crm-seven.vercel.app/)  

---

## Quick Start

```
git clone https://github.com/kshitijkatoch/Anvaya.git
cd Anvaya
npm install
npm run dev      # or `npm start` / `yarn dev`
```

## Technologies
- React JS
- React Router
- Context API
- Node.js
- Express.js
- MongoDB
- REST APIs
- JWT

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


## Contact
For bugs or feature requests, please reach out to kshitijkatoch213@gmail.com
