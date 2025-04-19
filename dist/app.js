// 确保Tauri API已加载
function initTauriControls() {
  console.log('正在初始化Tauri控制...');
  if (window.__TAURI__) {
    console.log('Tauri API已加载');
    const appWindow = window.__TAURI__.window.appWindow;
    
    const minimizeBtn = document.getElementById('titlebar-minimize');
    const maximizeBtn = document.getElementById('titlebar-maximize');
    const closeBtn = document.getElementById('titlebar-close');
    
    console.log('找到按钮元素:', minimizeBtn, maximizeBtn, closeBtn);
    
    minimizeBtn?.addEventListener('click', () => {
      console.log('点击最小化按钮');
      appWindow.minimize();
    });
    maximizeBtn?.addEventListener('click', () => {
      console.log('点击最大化按钮');
      appWindow.toggleMaximize();
    });
    closeBtn?.addEventListener('click', () => {
      console.log('点击关闭按钮');
      appWindow.close();
    });
  } else {
    console.error('Tauri API未加载，窗口控制功能不可用');
    setTimeout(initTauriControls, 500); // 重试机制
  }
}

// 确保DOM加载完成后再初始化Tauri控制
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTauriControls);
} else {
  initTauriControls();
}