# Database Queries

### Display the ProductName and CategoryName for all products in the database. Shows 76 records.

    SELECT categories.CategoryName, products.ProductName
    FROM categories
    JOIN products ON categories.CategoryID = products.CategoryID
    ORDER BY CategoryName

### Display the OrderID and ShipperName for all orders placed before January 9, 1997. Shows 161 records.

    SELECT orders.OrderID, shippers.ShipperName, orders.OrderDate
    FROM orders
    JOIN shippers ON orders.ShipperID = shippers.ShipperID
    WHERE orders.OrderDate<'1997-01-09'

### Display all ProductNames and Quantities placed on order 10251. Sort by ProductName. Shows 3 records.

    SELECT o.OrderID, p.ProductName
    FROM orderdetails as o
    JOIN products as p ON p.ProductID = o.ProductID
    WHERE o.OrderID=10251
    ORDER BY p.ProductName

### Display the OrderID, CustomerName and the employee's LastName for every order. All columns should be labeled clearly. Displays 196 records.

    SELECT o.OrderID, c.CustomerName AS [Customer Name], e.LastName AS [Employee Last Name]
    FROM orders as o
    JOIN customers as c ON c.CustomerID = o.CustomerID
    JOIN employees as e ON e.EmployeeID = o.EmployeeID

### (Stretch)  Displays CategoryName and a new column called Count that shows how many products are in each category. Shows 9 records.

    SELECT c.CategoryName AS [Category Name], (SELECT COUNT(products.ProductID) FROM products WHERE products.CategoryID = c.CategoryID) AS [Item Count]
    FROM categories AS c 
    INNER JOIN products AS p ON p.CategoryID = c.CategoryID
    GROUP BY [Category Name]
    UNION ALL
    SELECT 'Total Items' name, COUNT(products.ProductID)
    FROM products

### (Stretch) Display OrderID and a  column called ItemCount that shows the total number of products placed on the order. Shows 196 records. 

    SELECT o.OrderID AS [Order ID],  SUM(o.Quantity) AS [Item Count]
    FROM orderdetails AS o
    GROUP BY [Order ID]
    union all
    select 'Total', sum(orderdetails.Quantity)
    from orderdetails