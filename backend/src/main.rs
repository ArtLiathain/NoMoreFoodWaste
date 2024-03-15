use poem::{listener::TcpListener, Route, Server};
use poem_openapi::OpenApiService;
use std::fmt;

mod api_service;
use api_service::api_service::Api;
use sqlx::postgres::PgPoolOptions;
mod database;

#[tokio::main]
async fn main() -> Result<(), sqlx::Error> {
    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect("postgres://postgres:art123@localhost/mydatabase")
        .await?;
    let api_service = OpenApiService::new(Api { pool: pool }, "Hello World", "1.0")
        .server("http://localhost:3000");
    let ui = api_service.swagger_ui();
    let app = Route::new().nest("/", api_service).nest("/docs", ui);

    let server = Server::new(TcpListener::bind("0.0.0.0:3000"));
    if let Err(e) = server.run(app).await {
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
