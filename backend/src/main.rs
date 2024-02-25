use actix_web::body;
use poem::{listener::TcpListener, Route, Server};
use poem_openapi::{payload::Json, types::ToJSON, ApiResponse, Object, OpenApi, OpenApiService};
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
use std::collections::HashMap;

#[derive(Object, Deserialize, Serialize)]
struct Name {
    name: String,
}

#[derive(ApiResponse)]
enum HelloApiResponse {
    #[oai(status = 200)]
    Ok(Json<Name>),
    #[oai(status = 400)]
    BadRequest(Json<Name>),
}

#[derive(Object, Serialize)]
struct MyResponse {
    message: String,
}

struct Api;

#[OpenApi]
impl Api {
    /// Hello world
    #[oai(path = "/getproduct", method = "post")]
    async fn hello(&self, name: Json<Name>) -> HelloApiResponse {
        let body = reqwest::get("https://world.openfoodfacts.net/api/v2/product/3017624010701?fields=product_name,nutriscore_data").await;
        match body {
            Ok(body) => {
                let body = body.json::<HashMap<String, String>>().await;
                match body {
                    Ok(body) => return HelloApiResponse::Ok(Json(Name { name: body.to_json_string() })),
                    Err(e) => {
                        println!("error: {}", e);
                        return HelloApiResponse::BadRequest(Json(Name { name: e.to_string() }));
                    }
                }
            }
            Err(e) => {
                println!("error: {}", e);
                return HelloApiResponse::Ok(Json(Name { name: e.to_string() }));
            }
        }

    }

    #[oai(path = "/bye", method = "get")]
    async fn bye(&self) -> Json<MyResponse> {
        Json(MyResponse {
            message: "Hello, world!".to_string(),
        })
    }
}

#[tokio::main]
async fn main() {
    let api_service =
        OpenApiService::new(Api, "Hello World", "1.0").server("http://localhost:3000");
    let ui = api_service.swagger_ui();
    let app = Route::new().nest("/", api_service).nest("/docs", ui);

    let server = Server::new(TcpListener::bind("0.0.0.0:3000"));
    if let Err(e) = server.run(app).await {
        eprintln!("Server error: {}", e);
    }
}
