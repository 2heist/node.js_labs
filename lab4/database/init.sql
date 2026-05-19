CREATE TABLE vacancies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    salary VARCHAR(100),
    description TEXT
);

CREATE TABLE requirements (
    id SERIAL PRIMARY KEY,
    vacancy_id INTEGER NOT NULL,
    requirement TEXT NOT NULL,

    CONSTRAINT fk_vacancy
        FOREIGN KEY(vacancy_id)
        REFERENCES vacancies(id)
        ON DELETE CASCADE
);