# Campus Priority Inbox

A smart notification management system built using React JS and Material UI that prioritizes campus notifications based on importance and recency.

---
# logging-middleware screenshots
## Screenshots

### Dashboard UI

![Dashboard](./page1.png)

---

### Console Output

![Console](./page2.png)

---

### Fetch Users Action

![Fetch Users](./page3.png)

## Project Overview

Campus Priority Inbox is a responsive dashboard application that fetches notifications from an API and intelligently sorts them using a priority-based algorithm.

The application ensures that students see the most important notifications first, such as placement updates, exam results, and campus events.

---
### Stage1 UI

![Stage1](./stage1.png)

---

### Stage2 Output

![Stage2](./stage2.png)

---


## Features

- Authentication using API token
- Dynamic notification fetching
- Priority-based sorting algorithm
- Responsive dashboard UI
- Read and unread notification tracking
- Filter notifications by category
- Select Top 10 / 15 / 20 notifications
- Modern Material UI design
- Modular and scalable architecture

---

## Notification Priority Logic

Notifications are sorted based on:

| Notification Type | Priority |
|-------------------|----------|
| Placement         | Highest  |
| Result            | Medium   |
| Event             | Lowest   |



If two notifications have the same priority, the newest notification is displayed first based on timestamp.

---

## Tech Stack

- React JS
- JavaScript
- Material UI
- Fetch API
- CSS
- REST API

---

## Folder Structure

src/
│
├── components/
│ └── PriorityInbox.jsx
│
├── utils/
│ ├── api.js
│ └── prioritySorter.js
│
├── App.js
└── index.js

---

## Modules Description

### 1. api.js

Handles:

- Authentication
- API requests
- Fetching notifications
- Authorization token management

---

### 2. prioritySorter.js

Implements:

- Priority sorting algorithm
- Recency-based sorting
- Top N notification selection

---

### 3. PriorityInbox.jsx

Responsible for:

- Dashboard UI
- State management
- Filters and controls
- Responsive layout
- Read/unread management

---

## Installation Steps

### 1. Clone Repository

```bash
