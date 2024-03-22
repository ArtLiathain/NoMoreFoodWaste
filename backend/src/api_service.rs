pub mod api_service {
    use crate::database::product_database;
    use crate::{
        database::{self, product_database::*},
        Errors,
    };
    use poem_openapi::{
        param::Query,
        payload::{Json, PlainText},
        ApiResponse, Object, OpenApi,
    };
    use regex::Regex;
    use reqwest::header;
    use serde::{Deserialize, Serialize};
    use sqlx::types::time::Date;
    use std::time::Duration;

    #[derive(Object, Deserialize, Serialize)]
    pub struct ProductUserInfo {
        barcode: i64,
        user_email: String,
    }

    #[derive(Object, Deserialize, Serialize, Debug)]
    pub struct ProductResponse {
        pub product: ProductValues,
    }

    #[derive(Object, Deserialize, Serialize, Debug)]
    pub struct ProductValues {
        pub product_name: String,
    }
    #[derive(Object, Deserialize, Serialize, Debug)]
    pub struct MBRSuccessMessage {
        pub response: String,
    }
    #[derive(Object, Deserialize, Serialize, Debug)]
    pub struct UserInfo {
        pub email: String,
        pub password: String,
    }

    #[derive(Object, Deserialize, Serialize, Debug)]
    pub struct UserProducts {
        pub product_name: String,
        pub purchase_date: String,
        pub barcode: i64,
    }

    #[derive(ApiResponse)]
    pub enum StandardResponse {
        #[oai(status = 200)]
        Ok(Json<MBRSuccessMessage>),
        #[oai(status = 400)]
        BadRequest(PlainText<String>),
    }

    #[derive(ApiResponse)]
    pub enum GetResponse {
        #[oai(status = 200)]
        Ok(Json<Vec<UserProducts>>),
        #[oai(status = 400)]
        BadRequest(PlainText<String>),
    }

    pub fn is_valid_email(email: &str) -> bool {
        let email_regex = Regex::new(r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$").unwrap();
        email_regex.is_match(email)
    }

    pub struct Api {
        pub pool: sqlx::Pool<sqlx::Postgres>,
    }

    pub async fn handle_open_food_facts_request(barcode: i64) -> Result<ProductValues, Errors> {
        let client = Api::create_client();
        let response: Result<reqwest::Response, reqwest::Error> = client.get(format!("https://world.openfoodfacts.net/api/v2/product/{}?fields=product_name,nutriscore_data", barcode))
        .timeout(Duration::from_secs(3))
        .send().await;

        match response {
            Ok(response) => {
                let product: Result<ProductResponse, reqwest::Error> = response.json().await;
                match product {
                    Ok(product) => {
                        return Ok(product.product);
                    }
                    Err(e) => {
                        println!("error: {}", e);
                        return Err(Errors::ReqwestError(e));
                    }
                }
            }
            Err(e) => {
                println!("error: {}", e);
                return Err(Errors::ReqwestError(e));
            }
        }
    }

    #[OpenApi]
    impl Api {
        fn create_client() -> reqwest::Client {
            let mut headers = header::HeaderMap::new();
            headers.insert(
                "User-Agent",
                "noMoreFoodWaste/1.0 (artp.oliathain@gmail.com)"
                    .parse()
                    .unwrap(),
            );

            reqwest::Client::builder()
                .default_headers(headers)
                .build()
                .unwrap()
        }

        #[oai(path = "/adduserfood", method = "post")]
        pub async fn adduserfood(&self, userinfo: Json<ProductUserInfo>) -> StandardResponse {
            match database::product_database::add_to_cache_database(&self.pool, userinfo.barcode)
                .await
            {
                Ok(_) => {
                    let data_insert = product_database::add_data_to_users_products_table(
                        &userinfo.user_email,
                        userinfo.barcode,
                        &self.pool,
                    )
                    .await;
                    match data_insert {
                        Ok(_) => StandardResponse::Ok(Json(MBRSuccessMessage {
                            response: "Successfully added to user database".to_string(),
                        })),
                        Err(e) => StandardResponse::BadRequest(PlainText(e.to_string())),
                    }
                }
                Err(e) => StandardResponse::BadRequest(PlainText(e.to_string())),
            }
        }
        #[oai(path = "/", method = "get")]
        pub async fn health(&self) -> StandardResponse {
            return StandardResponse::Ok(Json(MBRSuccessMessage {
                response: "healthy".to_string(),
            }));
        }
        #[oai(path = "/removeuserfood", method = "post")]
        pub async fn removeuserfood(&self, userinfo: Json<ProductUserInfo>) -> StandardResponse {
            match database::product_database::remove_form_user_products(
                &userinfo.user_email,
                &userinfo.barcode,
                &self.pool,
            )
            .await
            {
                Ok(_) => StandardResponse::Ok(Json(MBRSuccessMessage {
                    response: format!(
                        "Successfully removed product {} from user database",
                        userinfo.barcode
                    ),
                })),
                Err(e) => StandardResponse::BadRequest(PlainText(e.to_string())),
            }
        }

        #[oai(path = "/adduseraccount", method = "post")]
        pub async fn add_user_details(&self, details: Json<UserInfo>) -> StandardResponse {
            if !is_valid_email(&details.email) {
                return StandardResponse::BadRequest(PlainText("Not a valid email".to_string()));
            }
            match database::product_database::add_user(
                &details.email,
                &details.password,
                &self.pool,
            )
            .await
            {
                Ok(_) => StandardResponse::Ok(Json(MBRSuccessMessage {
                    response: "Successfully added a user to database".to_string(),
                })),
                Err(e) => StandardResponse::BadRequest(PlainText(e.to_string())),
            }
        }

        #[oai(path = "/getuserfood", method = "get")]
        pub async fn get_user_products(&self, email: Query<String>) -> GetResponse {
            let data = get_food_of_user(&email, &self.pool).await;
            match data {
                Ok(data) => return GetResponse::Ok(Json(data)),
                Err(e) => GetResponse::BadRequest(PlainText(e.to_string())),
            }
        }
        #[oai(path = "/getuserfoodfilter", method = "get")]
        pub async fn get_user_products_filter(
            &self,
            email: Query<String>,
            filter: Query<String>,
        ) -> GetResponse {
            let data = get_food_of_user_filter(&email, &filter, &self.pool).await;
            match data {
                Ok(data) => return GetResponse::Ok(Json(data)),
                Err(e) => GetResponse::BadRequest(PlainText(e.to_string())),
            }
        }
    }
}
