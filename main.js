// Tauri窗口配置
console.log('窗口加载 - 开始初始化');

// 隐藏Windows默认导航按钮
document.documentElement.style.setProperty('--window-controls-visibility', 'none');

// 设置视口尺寸
document.documentElement.style.width = '100%';
document.documentElement.style.height = '100%';
document.title = 'DoItX';

// 监听窗口大小变化
window.addEventListener('resize', () => {
  document.documentElement.style.width = '100%';
  document.documentElement.style.height = '100%';
});

// 监听DOM加载完成
document.addEventListener('DOMContentLoaded', () => {
  console.log('窗口加载完成 - DOMContentLoaded事件触发');
});

// 监听窗口获得焦点
window.addEventListener('focus', () => {
  console.log('窗口获得焦点');
});

console.log('窗口事件监听器已设置');
import { appWindow } from '@tauri-apps/api/window'
// 测试Tauri命令调用

window.__TAURI__.invoke('greet', { name: 'World' })
  .then(response => console.log('后端响应:', response))
  .catch(error => console.error('调用失败:', error));


// 只在Tauri环境下添加自定义导航按钮
if (window.__TAURI__) {
  const navButtons = document.createElement('div');
  navButtons.className = 'custom-nav-buttons';
  navButtons.innerHTML = `
    <button class="nav-btn minimize">—</button>
    <button class="nav-btn maximize">□</button>
    <button class="nav-btn close">×</button>
  `;
  document.body.appendChild(navButtons);


document.querySelector('.nav-btn.minimize').addEventListener('click', () => appWindow.minimize());
document.querySelector('.nav-btn.maximize').addEventListener('click', () => appWindow.toggleMaximize());
document.querySelector('.nav-btn.close').addEventListener('click', () => appWindow.close());
}
