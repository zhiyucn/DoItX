/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

// Former goog.module ID: Blockly.CustomDialog

export class CustomDialog {
  private static dialogElement: HTMLElement;
  private static inputElement: HTMLInputElement;
  private static callback: Function;

  static init() {
    // Create dialog container
    this.dialogElement = document.createElement('div');
    this.dialogElement.style.position = 'fixed';
    this.dialogElement.style.zIndex = '1000';
    this.dialogElement.style.backgroundColor = '#fff';
    this.dialogElement.style.padding = '20px';
    this.dialogElement.style.borderRadius = '8px';
    this.dialogElement.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    
    // Create custom input element for prompt
    this.inputElement = document.createElement('input');
    this.inputElement.style.marginTop = '10px';
    this.inputElement.style.width = '100%';
    this.inputElement.style.padding = '8px';
    this.inputElement.style.border = '1px solid #ccc';
    this.inputElement.style.borderRadius = '4px';
    this.inputElement.style.backgroundColor = '#fff';
    this.inputElement.style.color = '#333';
    this.inputElement.style.fontFamily = 'inherit';
    this.inputElement.style.fontSize = '14px';
    this.inputElement.style.minHeight = '36px';
    this.inputElement.style.boxSizing = 'border-box';
    
    document.body.appendChild(this.dialogElement);
  }

  static alert(message: string, callback?: () => void) {
    this.dialogElement.innerHTML = `
      <div style="margin-bottom:15px;">${message}</div>
      <button style="padding:8px 16px;background:#4285f4;color:#fff;border:none;border-radius:4px;">
        OK
      </button>
    `;
    
    const button = this.dialogElement.querySelector('button');
    button?.addEventListener('click', () => {
      this.hide();
      callback?.();
    });
    
    this.show();
  }

  static confirm(message: string, callback: (result: boolean) => void) {
    this.dialogElement.innerHTML = `
      <div style="margin-bottom:15px;">${message}</div>
      <div style="display:flex;gap:10px;">
        <button style="padding:8px 16px;background:#4285f4;color:#fff;border:none;border-radius:4px;">
          OK
        </button>
        <button style="padding:8px 16px;background:#f44336;color:#fff;border:none;border-radius:4px;">
          Cancel
        </button>
      </div>
    `;
    
    const buttons = this.dialogElement.querySelectorAll('button');
    buttons[0]?.addEventListener('click', () => {
      this.hide();
      callback(true);
    });
    buttons[1]?.addEventListener('click', () => {
      this.hide();
      callback(false);
    });
    
    this.show();
  }



  private static show() {
    this.dialogElement.style.display = 'block';
    this.dialogElement.style.top = '50%';
    this.dialogElement.style.left = '50%';
    this.dialogElement.style.transform = 'translate(-50%, -50%)';
  }

  private static hide() {
    this.dialogElement.style.display = 'none';
  }
}

// Initialize on load
if (typeof window !== 'undefined') {
  CustomDialog.init();
}