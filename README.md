# ShopEase – E-Commerce Web Application

## About the Project

ShopEase is a beginner-friendly e-commerce web application developed as a full-stack web development project. It allows users to browse products, register accounts, log in, add products to their cart, place demo orders, and view their order history.

The application also includes an admin role for managing products and orders.

## Features

- User registration and login
- User and admin roles
- Product catalog
- Shopping cart
- Demo checkout
- Order history
- Admin dashboard
- Product management
- Order status management
- MySQL database integration
- Responsive web interface

## Technologies Used

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Python, Flask
- **Database:** MySQL
- **Tools:** Visual Studio Code, Git, GitHub

## Project Structure

```text
Ecommerce_task/
├── app.py
├── requirements.txt
├── README.md
├── .gitignore
├── templates/
│   ├── base.html
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── orders.html
│   └── admin.html
└── static/
    ├── main.js
    └── style.css
```

## Installation and Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd ShopEase-Ecommerce
```

### 2. Create a virtual environment

```bash
python -m venv .venv
```

Activate it on Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

### 3. Install dependencies

```bash
python -m pip install -r requirements.txt
```

### 4. Create the database

Open MySQL Command Line Client and run:

```sql
CREATE DATABASE IF NOT EXISTS shopease_db;
```

Configure your MySQL connection settings in `app.py` using your own local database credentials. Never publish your database password or other secrets.

### 5. Run the application

```bash
python app.py
```

Open this URL in your browser:

`http://127.0.0.1:5000`

## Testing

The following features have been tested locally:

- User registration and login
- Adding products to the cart
- Demo checkout
- Order history
- Admin functionality

## Learning Outcomes

Through this project, I practised:

- Building a full-stack web application
- Connecting Flask with a MySQL database
- Implementing user authentication and role-based access
- Working with product and order management
- Using Git and GitHub for project version control

## Future Improvements

- Integrate a secure payment gateway
- Improve product search and filtering
- Add product categories and reviews
- Deploy the application online

## Author

Developed as a full-stack web development learning project.
