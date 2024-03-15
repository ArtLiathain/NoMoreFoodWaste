CREATE TABLE userProducts (
    barcode BIGINT,
    email VARCHAR,
    dateOfEntry Date DEFAULT CURRENT_DATE, 
    PRIMARY KEY (barcode, email, dateOfEntry),
    FOREIGN KEY (email) REFERENCES users(email),
    FOREIGN KEY (barcode) REFERENCES products(barcode)
);