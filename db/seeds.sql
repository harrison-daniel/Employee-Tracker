INSERT INTO department (name)
VALUES
('HR'),
('Finance'),
('Customer Success'),
('Sales'),
('Marketing'),
('Development');


INSERT INTO role (title, salary, department_id)
VALUES
('Employee Experience Manager', 70000, 1),
('Accounts Receivable Manager', 68000, 2),
('Customer Success Manager', 65000, 3),
('VP of Customer Success', 100000, 3),
('Account Executive', 68000, 4),
('VP of Sales', 100000, 4),
('Head of Marketing', 82000, 5),
('Development Manager', 86000, 6),
('Software Developer', 76000, 6);

INSERT INTO employee (first_name, last_name, role_id)
VALUES
('Michael', 'Allan', 1),
('Seteven', 'Anderson', 2),
('Victoria', 'Hodges', 3),
('Rachel', 'Hill', 4),
('Jack', 'Murray', 5),
('Joe', 'Robertson', 6);