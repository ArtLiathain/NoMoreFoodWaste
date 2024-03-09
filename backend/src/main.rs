use poem::{listener::TcpListener, Route, Server};
use poem_openapi::OpenApiService;

mod api_service;
use api_service::api_service::Api;

#[tokio::main]
async fn main() {
    let api_service =
        OpenApiService::new(Api , "Hello World", "1.0").server("http://localhost:3000");
    let ui = api_service.swagger_ui();
    let app = Route::new().nest("/", api_service).nest("/docs", ui);

    let server = Server::new(TcpListener::bind("0.0.0.0:3000"));
    if let Err(e) = server.run(app).await {
        eprintln!("Server error: {}", e);
    }
}
