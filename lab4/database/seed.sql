INSERT INTO vacancies
(title, company, salary, description)
VALUES
(
    'Frontend Developer',
    'SoftServe',
    '$1200',
    'React developer position'
),
(
    'Backend Developer',
    'EPAM',
    '$1500',
    'Node.js backend developer'
);

INSERT INTO requirements
(vacancy_id, requirement)
VALUES
(1, 'HTML'),
(1, 'CSS'),
(1, 'JavaScript'),
(2, 'Node.js'),
(2, 'SQL');