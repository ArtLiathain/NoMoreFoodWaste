use poem::{listener::TcpListener, EndpointExt, Route, Server};
use poem_openapi::OpenApiService;
use std::{env, fmt};
use poem::middleware::Cors;

mod api_service;
use api_service::api_service::Api;
use sqlx::postgres::PgPoolOptions;
mod database;

#[tokio::main]
async fn main() -> Result<(), sqlx::Error> {

    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect("postgres://postgres:DontForget1234@epic-project-database.c9a0yk204klt.us-east-1.rds.amazonaws.com:5432/postgres")
        .await?;
    let api_service = OpenApiService::new(Api { pool: pool }, "Hello World", "1.0")
        .server("http://localhost:3000");
    let ui = api_service.swagger_ui();
    let app = Route::new().nest("/", api_service).nest("/docs", ui);

    let cors = Cors::new().allow_origin_regex("*").allow_methods(vec!["GET", "POST", "PUT", "DELETE"]);

    let server = Server::new(TcpListener::bind("0.0.0.0:3000"));
    if let Err(e) = server.run(app.with(cors)).await {
        eprintln!("Server error: {}", e);
    }

    Ok(())
}

pub enum Errors {
    SqlxError(sqlx::Error),
    ReqwestError(reqwest::Error),
    BcryptError(bcrypt::BcryptError),
}

impl fmt::Display for Errors {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            Errors::SqlxError(e) => write!(f, "Database error: {}", e),
            Errors::ReqwestError(e) => write!(f, "Request error: {}", e),
            Errors::BcryptError(e) => write!(f, "Request error: {}", e),

        }
    }
}
