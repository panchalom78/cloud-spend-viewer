# Cloud Spend Viewer

A full-stack dashboard for visualizing and analyzing cloud infrastructure spending across teams, services, and providers.

---

## 🛠️ Built With

### Frontend (React)

-   React 19 - UI library with hooks

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

---

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

---

### Assumptions Made for the Cloud Spend Viewer Project

#### 1. Data Structure & Format

##### Consistent Schema: All JSON data files follow the same structure with these fields:

-   date: ISO date string parseable by JavaScript's Date constructor

-   cloud_provider: Either "AWS" or "GCP" (case-insensitive)

-   service: Service name string (e.g., "EC2", "BigQuery", "S3")

-   team: One of ["Core", "Web", "Data"]

-   env: One of ["prod", "staging", "dev"]

-   cost_usd: Numeric value representing USD cost

-   Optional fields: account_id, project_id, tags, description

#### 2. User Knowledge & Needs

-   Technical Audience: Users understand cloud computing terminology (AWS, GCP, services)

-   Analysis Goals: Users want to analyze spending by multiple dimensions simultaneously

-   Monthly Focus: Monthly trend analysis is more valuable than daily/weekly breakdowns

-   Top-N Insight: Showing top 5 services provides sufficient business insight

#### 3. Filtering & Sorting Logic

-   "All" Means No Filter: Selecting "All" removes that filter dimension

-   Independent Filters: Month filter works across all years

-   Case Insensitivity: Team and Environment filters ignore case

-   Filter Scope: Sorting applies to filtered data only

-   Page Reset: Changing filters resets to page 1

#### 4. Visual Hierarchy & Layout

-   Desktop-First: Primary usage on larger screens

-   Card-Based Design: Clear separation of different dashboard sections

-   Progressive Disclosure: Basic info first, details on demand

-   Color Coding: Consistent color schemes for teams, clouds, environments

---

### UI - Screenshots

![UI](./screenshots/Screenshot%202025-12-03%20185252.png)
![UI](./screenshots/Screenshot%202025-12-03%20185313.png)
![UI](./screenshots/Screenshot%202025-12-03%20185327.png)
![UI](./screenshots/Screenshot%202025-12-03%20185343.png)
