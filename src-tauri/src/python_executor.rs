use std::process::{Command, Stdio};
use std::io::{Write, Read};
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
pub struct PythonExecutionResult {
    pub success: bool,
    pub output: String,
    pub error: String,
}

#[tauri::command]
pub fn execute_python_code(code: String) -> PythonExecutionResult {
    let mut child = match Command::new("python")
        .arg("-")
        .stdin(Stdio::piped())
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .spawn() {
            Ok(child) => child,
            Err(e) => {
                return PythonExecutionResult {
                    success: false,
                    output: String::new(),
                    error: format!("Failed to start Python process: {}", e),
                };
            }
        };

    if let Some(mut stdin) = child.stdin.take() {
        if let Err(e) = stdin.write_all(code.as_bytes()) {
            return PythonExecutionResult {
                success: false,
                output: String::new(),
                error: format!("Failed to write to Python stdin: {}", e),
            };
        }
    }

    let output = match child.wait_with_output() {
        Ok(output) => output,
        Err(e) => {
            return PythonExecutionResult {
                success: false,
                output: String::new(),
                error: format!("Failed to wait for Python process: {}", e),
            };
        }
    };

    PythonExecutionResult {
        success: output.status.success(),
        output: String::from_utf8_lossy(&output.stdout).to_string(),
        error: String::from_utf8_lossy(&output.stderr).to_string(),
    }
}