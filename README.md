# Personal Finance Tracker

A full-stack personal finance management application built with **React**, **Node.js/Express**, **TypeScript**, and **PostgreSQL via Supabase**. Track income, expenses and categorize transactions.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React |
| Backend | Node.js + Express |
| Database | PostgreSQL (Supabase) |
| API Testing | Postman |

---


# Installation & Setup

1. First cd into the backend, then install the dependencies and start the backend

```
cd backend
npm install
npm run start:dev
```

2. Set up the frontend

```
cd frontend
npm install
npm run dev
```



## 🗄️ Database Schema

### `transactions`

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | `uuid` | Primary Key, auto-generated | Unique transaction identifier |
| `amount` | `numeric` | NOT NULL | Transaction value (always positive) |
| `type` | `text` | `'income'` or `'expense'` | Direction of money flow |
| `category` | `text` | Optional | e.g. `food`, `salary`, `transport` |
| `description` | `text` | Optional | Free-text note about the transaction |
| `date` | `date` | NOT NULL | Date the transaction occurred |
| `created_at` | `timestamptz` | Auto-set | Timestamp of record creation |


### Transactions API Endpoints

#### `POST /transactions`
Create a new transaction.

**Request body:**
```json
{
  "amount": 150.50,
  "type": "expense",
  "category": "food",
  "description": "Grocery shopping",
  "date": "2026-03-30"
}
```

**Response `201 Created`:**
```json
{
  "id": "a1b2c3d4-...",
  "amount": 150.50,
  "type": "expense",
  "category": "food",
  "description": "Grocery shopping",
  "date": "2026-03-30",
  "created_at": "2026-03-30T10:00:00Z"
}
```

---

#### `GET /transactions`
Retrieve all transactions, ordered by date descending.

**Response `200 OK`:**
```json
[
  {
    "id": "a1b2c3d4-...",
    "amount": 150.50,
    "type": "expense",
    "category": "food",
    "description": "Grocery shopping",
    "date": "2026-03-30",
    "created_at": "2026-03-30T10:00:00Z"
  }
]
```

---

#### `GET /transactions/:id`
Retrieve a single transaction by ID.

**Response `200 OK`:**
```json
{
  "id": "a1b2c3d4-...",
  "amount": 150.50,
  "type": "expense",
  "category": "food",
  "description": "Grocery shopping",
  "date": "2026-03-30",
  "created_at": "2026-03-30T10:00:00Z"
}
```

**Response `404 Not Found`:**
```json
{
  "error": "Transaction not found"
}
```

---

#### `PUT /transactions/:id`
Update an existing transaction by ID. All fields should be provided.

**Request body:**
```json
{
  "amount": 200.00,
  "type": "expense",
  "category": "transport",
  "description": "Monthly bus pass",
  "date": "2026-03-30"
}
```

**Response `200 OK`:**
```json
{
  "id": "a1b2c3d4-...",
  "amount": 200.00,
  "type": "expense",
  "category": "transport",
  "description": "Monthly bus pass",
  "date": "2026-03-30",
  "created_at": "2026-03-30T10:00:00Z"
}
```

---

#### `DELETE /transactions/:id`
Delete a transaction by ID.

**Response `204 No Content`** — empty body.

**Response `500 Internal Server Error`:**
```json
{
  "error": "error message here"
}
```

---

## 🧪 API Testing

A Postman collection is included in `.postman/finance-tracker.postman_collection.json`.

**To use it:**

1. Open Postman → **Import** → select the file
2. Set the `baseUrl` collection variable to match your server port (default `http://localhost:3000`)
3. Run the collection via **▶ Run collection**

The collection runs all 6 tests in sequence and automatically passes the `transactionId` between requests.



---