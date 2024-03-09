pub mod api_service {
    use poem_openapi::{
        payload::{Json, PlainText},
        ApiResponse, Object, OpenApi,
    };
    use reqwest::header;
    use serde::{Deserialize, Serialize};

    #[derive(Object, Deserialize, Serialize)]
    pub struct ProductBarcode {
        barcode: u64,
    }

    #[derive(Object, Deserialize, Serialize, Debug)]
    pub struct ProductResponse {
        product: ProductValues,
    }

    #[derive(Object, Deserialize, Serialize, Debug)]
    pub struct ProductValues {
        product_name: String,
    }

    #[derive(ApiResponse)]
    pub enum HelloApiResponse {
        #[oai(status = 200)]
        Ok(Json<ProductValues>),
        #[oai(status = 400)]
        BadRequest(PlainText<String>),
    }

    #[derive(Object, Serialize)]
    pub struct MyResponse {
        message: String,
    }

    pub struct Api;

    use std::time::Instant;

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
        /// Hello world
        #[oai(path = "/getproduct", method = "post")]
        pub async fn hello(&self, barcode: Json<ProductBarcode>) -> HelloApiResponse {
            let client = Api::create_client();
            let response = client.get(format!("https://world.openfoodfacts.net/api/v2/product/{}?fields=product_name,nutriscore_data", barcode.barcode)).send().await;
            match response {
                Ok(response) => {
                    let product: Result<ProductResponse, reqwest::Error> = response.json().await;
                    match product {
                        Ok(product) => {
                            return HelloApiResponse::Ok(Json(product.product));
                        }
                        Err(e) => {
                            println!("error: {}", e);
                            return HelloApiResponse::BadRequest(PlainText(e.to_string()));
                        }
                    }
                }
                Err(e) => {
                    println!("error: {}", e);
                    return HelloApiResponse::BadRequest(PlainText(e.to_string()));
                }
            }
        }

        #[oai(path = "/bye", method = "get")]
        pub async fn bye(&self) -> Json<MyResponse> {
            Json(MyResponse {
                message: "Hello, world!".to_string(),
            })
        }
    }
}
