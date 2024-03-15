pub mod product_database {
    use bcrypt;
    use sqlx::query;
    use sqlx::Pool;
    use sqlx::Postgres;

    use crate::{api_service, Errors};

    pub async fn add_to_cache_database(pool: &Pool<Postgres>, barcode: i64) -> Result<(), Errors> {
        let row = query!(
            "SELECT product_name from products where barcode = $1",
            barcode
        )
        .fetch_one(pool)
        .await;
        match row {
            Ok(_) => {
                return Ok(());
            }
            Err(_) => {
                let product =
                    api_service::api_service::handle_open_food_facts_request(barcode).await;

                match product {
                    Ok(product) => {
                        let insert = query!(
                            "INSERT INTO products (barcode, product_name) VALUES ($1, $2)",
                            barcode,
                            product.product_name
                        )
                        .execute(pool)
                        .await;
                        match insert {
                            Ok(_) => return Ok(()),
                            Err(e) => {
                                println!("error: {}", e);
                                return Err(Errors::SqlxError(e));
                            }
                        };
                    }
                    Err(e) => {
                        return Err(e);
                    }
                }
            }
        }
    }

    pub async fn add_data_to_users_products_table(
        email: &String,
        barcode: i64,
        pool: &Pool<Postgres>,
    ) -> Result<(), Errors> {
        let insert = query!(
            "INSERT INTO userProducts (barcode,email) VALUES ($1, $2)",
            barcode,
            email
        )
        .execute(pool)
        .await;
        match insert {
            Ok(_) => return Ok(()),
            Err(e) => {
                println!("error: {}", e);
                return Err(Errors::SqlxError(e));
            }
        };
    }

    pub async fn add_user(
        email: &String,
        password: &String,
        pool: &Pool<Postgres>,
    ) -> Result<(), Errors> {
        let hashed_password =
            bcrypt::hash(password, bcrypt::DEFAULT_COST).map_err(|e| Errors::BcryptError(e))?;

        let insert = sqlx::query!(
            "INSERT INTO users (email,password) VALUES ($1, $2)",
            email,
            hashed_password
        )
        .execute(pool)
        .await;
        match insert {
            Ok(_) => return Ok(()),
            Err(e) => {
                println!("error: {}", e);
                return Err(Errors::SqlxError(e));
            }
        };
    }

    pub async fn remove_form_user_products(
        email: &String,
        barcode: &i64,
        pool: &Pool<Postgres>,
    ) -> Result<(), Errors> {
        let remove = sqlx::query!("DELETE FROM userProducts
        WHERE ctid = (
            SELECT ctid
            FROM userProducts
            WHERE barcode = $1 AND email = $2
            ORDER BY dateOfEntry ASC
            LIMIT 1
        )", barcode, email).execute(pool)
        .await;
        match remove {
            Ok(_) => return Ok(()),
            Err(e) => return Err(Errors::SqlxError(e))
        }
    }
}
