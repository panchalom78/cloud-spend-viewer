# Cloud Spend Viewer

A full-stack dashboard for visualizing and analyzing cloud infrastructure spending across teams, services, and providers.

---

## 🛠️ Built With

### Frontend (React)

-   React 18 - UI library with hooks\

-   Tailwind CSS - Utility-first CSS framework

-   Recharts - Charting library for visualizations

-   Fetch API - For HTTP requests

### Backend (Node.js)

-   Node.js - JavaScript runtime

-   Express.js - Web application framework

-   CORS - Cross-origin resource sharing middleware

---

## ⚙️ Installation

Follow these steps to get your project up and running locally.

### 1. Clone the repository

```bash
git clone https://github.com/panchalom78/cloud-spend-viewer.git
cd cloud-spend-viewer
```

### 2. Install dependencies

#### For the Backend (Server):

```bash
cd server
npm install
```

#### For the Frontend (Client):

```bash
cd client
npm install
```

### 3. Running the Project

#### Run the Backend Server

```bash
cd server
npm run dev
```

### Run the Frontend Client

```bash
cd client
npm run dev
```

### Parts Completed

#### 1. Core Dashboard & Data Display

-   Summary Cards: Real-time total spending, cloud provider breakdown, top services

-   Data Table: Paginated table with all records, responsive design

-   Filtering System: Multi-dimensional filters (team, cloud, env, month) with active badges

-   Sorting: Cost and date sorting (ascending/descending)

-   Detail Modal: Click any row for complete record details with smart description

#### 2. Data Visualization & Charts

-   Bar Charts: Monthly trends, team comparisons, cloud provider breakdowns

-   Line Charts: Monthly spending trends (time-series only)

-   Pie Charts: Proportional breakdowns with legends and percentages

-   Interactive Features: Tooltips, hover states, dynamic grouping

#### 3. Backend API & Data Processing

-   RESTful API: Clean endpoints with proper query parameters

-   Data Aggregation: Server-side calculations for summaries and charts

-   Filtering Logic: Efficient filtering across multiple dimensions

-   Pagination: Server-side pagination with metadata

-   Error Handling: Graceful error responses and validation

#### 4. User Experience & Interface

-   Loading States: Skeletons and spinners during data fetch

-   Error States: User-friendly error messages

-   Empty States: Helpful messages when no data matches filters

### What I'd Do Next With More Time

-   Authentication & Authorization javascript

-   Real Cloud API Integration

-   Database Integration

### Screenshots

![UI](./screenshots/Screenshot%202025-12-03%20185252.png)
![UI](./screenshots/Screenshot%202025-12-03%20185313.png)
![UI](./screenshots/Screenshot%202025-12-03%20185327.png)
![UI](./screenshots/Screenshot%202025-12-03%20185343.png)
