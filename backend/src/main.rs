use poem::{handler, listener::TcpListener, post, web::Json, Route, Server};
use poem_openapi::{param::Query, payload::PlainText, OpenApi, OpenApiService};
use serde::Deserialize; // Import the missing method

#[derive(Deserialize)]
struct Name {
    name: String,
}

#[handler]
async fn hello(Json(name): Json<Name>) -> String {
    format!("hello: {}", name.name)
}
async fn bye(Json(name): Json<Name>) -> String {
    format!("bye: {}", name.name)
}

#[tokio::main]
async fn main() -> Result<(), std::io::Error> {
    let mut api = OpenApiServiceBuilder::new();
    api.endpoint(map_to_openapi(hello).at("/hello")); // Use the map_to_openapi method on the hello handler
    api.endpoint(map_to_openapi(bye).at("/bye")); // Use the map_to_openapi method on the bye handler
    let app = api.build();

    Server::new(TcpListener::bind("0.0.0.0:3000"))
        .run(app)
        .await
}
