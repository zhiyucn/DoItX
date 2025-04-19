use tauri::Manager;
use crate::python_executor::execute_python_code;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, execute_python_code])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}