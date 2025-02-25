## ER-Diagram - Book Store

![[Screenshot_25-Feb_16-50-12_3478.png]]

### PostgreSQL CLI Commands

#### A. Create user and database
##### 1.  Open terminal as a postgres user
``` 
sudo su postgres
```
##### 2. Open PostgreSQL prompt where SQL commands can be executed
```
psql
```
##### 3.  To create a new user with password (eg: book_admin)
```
CREATE ROLE book_admin WITH LOGIN PASSWORD 'book_admin';
```
##### 4. To create a database (eg: book_store)
```
CREATE DATABASE book_store;
```
##### 5. To switch to another user and in a database (eg: User: book_admin and Database: book_store )
###### i . Quit to return to terminal as a postgres user
```
\q
```
###### ii. switch to user 'book_admin' in database 'book_store'. You will be asked to enter password. Enter the password you created while creating a user above.
```
psql -U book_admin -d book_store
```

#### B. Create Tables

##### 1. Create Table 'publisher'
```
CREATE TABLE publisher (
	id serial primary key not null,
	name varchar(50) not null
);
```
##### 2. Create Table 'book'
```
CREATE TABLE book (
    id serial primary key NOT NULL,
    title varchar(50) NOT NULL,
    isbn varchar(20) NOT NULL,
    price decimal(10,2) NOT NULL,
    publisher_id int NOT NULL,
    foreign key (publisher_id) references publisher(id) on delete cascade
);
```

##### 3. Create Table 'orders'
```
CREATE TABLE orders (
	id serial primary key not null,
	date timestamp with time zone default current_timestamp,
	total decimal(10, 2) not null,
	count int
);
```

##### 4. Create Table 'author'
```
CREATE TABLE author (
	id serial primary key not null,
	first_name varchar(10) not null,
	last_name varchar(10) not null
);
```

##### 5. Create junction table between author table and book table 'author_book'
```
CREATE TABLE author_book (
	book_id int not null,
	author_id int not null,
	prmiary key (book_id, author_id),
	foreign key (book_id) references book(id) on delete cascade,
	foreign key (author_id) references author(id) on delete cascade
);
```

##### 6. Create table 'users'
###### i. Create enum for roles:
```
CREATE TYPE roles as enum ('admin', 'customer');
```
###### ii. Add roles in users table
```
CREATE TABLE users (
	id serial primary key not null,
	username varchar(10) not null,
	email varchar(100) not nulls,
	password varchar(225) not null,
	role roles default 'customer'
);
```

##### 7. Create  junction table betwen order table and book table
```
CREATE TABLE order_book (
	book_id int not null,
	order_id int not null,
	primary key (book_id, order_id),
	foreign key (book_id) references book(id) on delete cascade,
	foreign key (order_id) references orders(id) on delete cascade
);
```

##### 8. Create Table 'address'
```
CREATE TABLE address (
	id serial primary key not null,
	street varchar(20) not null,
	street_no int not null,
	postal_code int not null,
	city varchar(20) not null,
	country varchar(20) not null,
	user_id int not null,
	foreign key (user_id) references users(id) on delete cascade
);
```

##### 9. Create Junction Table with users table and orders table 'user_order'
```
CREATE TABLE user_order (
	user_id int not null,
	order_id int not null,
	primary key (user_id, order_id),
	foreign key (user_id) references users(id) on delete cascade,
	foreign key (order_id) refernces orders(id) on delete cascade 
)
```

#### C. 'INSERT' query to insert rows into tables
##### 1. To users table
###### i. Creating user with the role 'admin'
```
INSERT INTO USERS
(username, email, password, role) VALUES ('admin, 'admin@mail.com', 'admin');
```
###### i.. Creating user with the default role 'customer'
```
INSERT INTO USERS
(username, email, password) VALUES ('gaurab', 'gaurab@mail.com', 'gaurab');
```

##### 2. To orders table
```
INSERT INTO ORDERS
(total, count) VALUES (45.90, 1);
```

##### 3. To junction table 'user_order' to link 'users' and 'orders' tables.
```
INSERT INTO user_order 
(user_id, order_id) VALUES (1, 1);
```

##### 4. To author table
```
INSERT INTO author
(first_name, last_name) VALUES ('john', 'author');
```

##### 5. To publisher table
```
INSERT INTO publisher
(name) VALUES ('ram publication');
```
##### 6. To book table
```
INSERT INTO book
(title, isbn, price, publisher_id)
VALUES ('book1', 'isbn1234', 45.90, 1);
```
##### 7.  To address table
```
INSERT INTO address
(strreet, street_no, postal_code, city, country, user_id)
VALUES ('street1', 432, 23847, 'city1', 'country1', 2);
```
##### 8. To junction table 'author_book' between 'author' and 'book' tables
```
INSERT INTO author_book
(author_id, book_id) VALUES (1, 1);
```
##### 9. To junction table 'order_book' between 'orders' and 'books' table
```
INSERT INTO order_book
(book_id, order_id) VALUES (1, 1);
```
##### 10. insert multiple values at once in the publisher table
```
INSERT INTO publisher
(name) VALUES 
('shyam publication'),
('hari publication'),
('sita publication');
```
##### 11. 'ALTER' command to modify the existing table
###### If you have noticed, I didn't put 'UNIQUE' constraint on the column 'email' in the 'users' table. here's how you can use 'ALTER' to add constraint on the email column:
```
ALTER TABLE users
	ADD CONSTRAINT unique_email UNIQUE (email);
```

#### C. 'SELECT' query to get data from tables 
##### 1. get all rows from the table book (all columns)
```
SELECT * FROM book;
```

##### 2. get all rows from the table book (columns: id, and title)
```
SELECT id, title FROM book;
```

##### 3. 'WHERE' clause to get rows with conditions
```
SELECT * FROM book WHERE id = 1;
```
##### 4. 'JOIN' clause to get all the matched rows between user and address table (address has user_id as fk with user table)
```
SELECT
   u.id as user_id,
   u.username,
   u.email,
   a.street,
   a.city,
   a.country
from
   users u
join
   address a on u.id = a.user_id;
```
##### 5. 'LEFT JOIN' clause to get all the rows in users table even the ones who have on placed an order. users table do left join on orders and user_order table. (user_order is a junction table between users and orders tables)
```
SELECT
   u.id as user_id,
   u.username,
   u.email,
   o.total as total_price,
   o.count as book_count,
   o.date as purchased_date
from
	users u
join
	user_order on user_order.user_id = u.id
join
	orders o on o.id = user_order.id;
```
##### 6. 'LIMIT' clause to limit number of rows and 'ORDER BY' clause to get rows in order by either 'ASC' ascending or 'DESC' descending.
```
SELECT * FROM publisher order by id desc limit 3;
```
The above command will get at most 3 rows from the table publisher in descending order based on column id.


