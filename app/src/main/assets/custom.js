window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <!-- 针对Android设备的特殊meta标签 -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0, viewport-fit=cover">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="theme-color" content="#000000">
    <meta name="format-detection" content="telephone=no">
    <meta name="HandheldFriendly" content="true">
    <!-- 针对Android WebView的特殊配置 -->
    <meta http-equiv="Content-Security-Policy" content="default-src * 'self' 'unsafe-inline' 'unsafe-eval' data: gap: content:">
    <link rel="apple-touch-icon" href="https://chatbotcos.weixin.qq.com/chatbot/30-openaiassets_0fcbc917653b4f5350f3290e2343fdaf_469401762766962387.jpg">
    <!-- 修改1: 标题改为"♡呦の音乐♡播放器" -->
    <title>♡呦の音乐♡播放器</title>
    <!-- Dexie.js for Database -->
    <script src="https://unpkg.com/dexie@latest/dist/dexie.js"></script>
    <!-- Cropper.js for Image Cropping -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.12/cropper.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.12/cropper.min.css">
    <!-- JSZip for efficient data export/import -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
    <style>
        :root { /* Night Mode */ --bg-primary: #121212; --bg-secondary: #191919; --bg-tertiary: #282828; --bg-app: rgba(40, 40, 40, 0.7); --text-primary: #ffffff; --text-secondary: #b3b3b3; --border-color: #444; --global-font: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; --lyric-color: #ffffff; --global-font-size: 16px; }
        body.light-mode { /* Day Mode */ --bg-primary: #f0f2f5; --bg-secondary: #ffffff; --bg-tertiary: #e9e9e9; --bg-app: rgba(255, 255, 255, 0.6); --text-primary: #000000; --text-secondary: #555555; --border-color: #dcdcdc; }
        html, body { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; font-family: var(--global-font); color: var(--text-primary); background-color: var(--bg-primary); transition: background-color 0.3s, color 0.3s; font-size: var(--global-font-size); -webkit-tap-highlight-color: transparent; -webkit-touch-callout: none; -webkit-user-select: none; user-select: none; touch-action: manipulation; }
        .view { position: absolute; top: 0; left: 0; width: 100%; height: 100%; box-sizing: border-box; transition: opacity 0.4s ease, transform 0.4s ease; opacity: 0; transform: scale(1.05); pointer-events: none; background-color: var(--bg-primary); }
        .view.active { opacity: 1; transform: scale(1); pointer-events: auto; }
        button, input[type="file"], select { cursor: pointer; -webkit-appearance: none; appearance: none; outline: none; }
        button:disabled { cursor: not-allowed; opacity: 0.7; }
        input[type="file"] { font-size: 14px; }
        /* 针对Android设备的文件上传按钮样式 */
        input[type="file"]::-webkit-file-upload-button { 
            background: #1DB954; 
            color: white; 
            border: none; 
            padding: 10px 15px; 
            border-radius: 6px; 
            font-size: 14px;
            font-weight: bold;
        }
        input[type="file"]:active::-webkit-file-upload-button {
            background: #1aa34a;
            transform: scale(0.98);
        }
        #desktop-view { background-size: cover; background-position: center; display: flex; flex-direction: column; padding: 20px; }
        .desktop-header { text-align: center; text-shadow: 0 0 10px rgba(0,0,0,0.7); }
        .desktop-time { font-size: 72px; font-weight: 600; }
        .desktop-date { font-size: 22px; opacity: 0.9; margin-top: 4px; }
        .desktop-top-right { position: absolute; top: 20px; right: 20px; }
        #announcement-btn { background: none; border: none; font-size: 24px; color: var(--text-primary); text-shadow: 0 0 5px rgba(0,0,0,0.5); display: none; }
        .desktop-main { display: flex; flex: 1; justify-content: center; align-items: center; gap: 30px; }
        .app-dock { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        .app-icon { display: flex; flex-direction: column; align-items: center; text-decoration: none; color: var(--text-primary); width: 70px; }
        .app-icon .icon-bg { width: 55px; height: 55px; background-color: var(--bg-app); border-radius: 15px; display: flex; justify-content: center; align-items: center; margin-bottom: 8px; transition: all 0.3s; background-size: cover; background-position: center; font-size: 28px; }
        .app-icon:hover .icon-bg { transform: scale(1.1); }
        .app-icon span { font-size: 12px; text-shadow: 0 0 5px rgba(0,0,0,0.5); text-align: center; }
        #display-picture-container { width: 130px; height: 130px; background-color: var(--bg-app); border-radius: 20px; cursor: pointer; background-size: cover; background-position: center; transition: transform 0.3s; }
        .app-page { background-color: var(--bg-secondary); display: flex; flex-direction: column; }
        .app-header { padding: 15px; background-color: var(--bg-tertiary); display: flex; align-items: center; box-shadow: 0 2px 10px rgba(0,0,0,0.1); z-index: 10;}
        .app-header .back-btn, .app-header h1 { color: var(--text-primary); } .app-header .back-btn { font-size: 24px; background: none; border: none; margin-right: 15px; } .app-header h1 { font-size: calc(var(--global-font-size) + 4px); margin: 0; }
        .app-content { padding: 20px; overflow-y: auto; flex-grow: 1; -webkit-overflow-scrolling: touch; }
        .form-group { margin-bottom: 20px; } .form-group label { display: block; margin-bottom: 8px; color: var(--text-secondary); } .form-group input, .form-group textarea, .form-group select { width: 100%; padding: 12px; background-color: var(--bg-tertiary); border: 1px solid var(--border-color); color: var(--text-primary); border-radius: 4px; box-sizing: border-box; font-size: inherit; -webkit-appearance: none; appearance: none; }
        .form-group textarea { resize: vertical; min-height: 100px; }
        .action-button { width: 100%; padding: 15px; background-color: #1DB954; color: white; border: none; border-radius: 8px; font-weight: bold; margin-top: 10px; font-size: var(--global-font-size); transition: background-color 0.2s, transform 0.1s; }
        .action-button:active { background-color: #1aa34a; transform: scale(0.98); }
        
        /* Playlist & Folder Styles */
        #playlist-container { list-style: none; padding: 0; margin: 0; display: none; }
        .playlist-item { display: flex; align-items: center; padding: 10px; border-radius: 8px; transition: background-color 0.2s; } .playlist-item:hover { background-color: var(--bg-tertiary); }
        .playlist-item img { width: 50px; height: 50px; border-radius: 4px; margin-right: 15px; object-fit: cover; background-color: #333; }
        .playlist-item .song-info { flex-grow: 1; cursor: pointer; } .playlist-item .actions { display: flex; } .playlist-item .actions button { background: none; border: none; font-size: 20px; padding: 10px; color: var(--text-secondary); }
        
        .folder-grid { display: none; } /* 改为列表显示 */
        .folder-item { background-color: var(--bg-tertiary); border-radius: 12px; padding: 20px 10px; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; transition: transform 0.2s; position: relative; user-select: none; -webkit-user-select: none; }
        .folder-item:active { transform: scale(0.95); background-color: var(--border-color); }
        .folder-icon { font-size: 40px; margin-bottom: 10px; }
        .folder-name { font-size: 14px; text-align: center; word-break: break-all; }
        .folder-count { font-size: 12px; color: var(--text-secondary); margin-top: 4px; }
        .folder-delete-btn { position: absolute; top: 5px; right: 5px; background: none; border: none; color: #ff5555; font-size: 16px; padding: 5px; opacity: 0.7; z-index: 2; }
        .folder-delete-btn:hover { opacity: 1; }
        #create-folder-btn { margin-left: auto; background: none; border: none; font-size: 24px; color: var(--text-primary); }

        #player-view { background-color: #000; background-size: cover; background-position: center; display: flex; flex-direction: column; padding: 20px; box-sizing: border-box; transition: transform 0.4s ease; }
        
        .player-top-bar { display: flex; justify-content: space-between; align-items: center; flex-shrink: 0; }
        .player-top-bar button { color: white; text-shadow: 0 0 5px black; background: none; border: none; font-size: 24px;}
        .player-top-bar .right-controls { display: flex; align-items: center; gap: 10px; position: relative; }
        .player-top-bar .right-controls button {
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 12px;
            width: 40px;
            height: 40px;
            font-size: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-shadow: none;
            color: #fff;
            backdrop-filter: blur(5px);
        }
        #player-content-wrapper { position: relative; flex-grow: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; overflow: hidden; }
        #album-art { position: absolute; object-fit: cover; border-radius: 12px; box-shadow: 0 8px 25px rgba(0,0,0,0.5); cursor: grab; touch-action: none; transition: transform 0.1s; }
        #album-art.dragging { cursor: grabbing; box-shadow: 0 12px 35px rgba(0,0,0,0.7); transition: none; }
        
        .lyric-bubble { position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); width: 90%; background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 15px 20px; backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); cursor: grab; z-index: 10; touch-action: none; text-align: center; transition: transform 0.1s; }
        .lyric-bubble.dragging { cursor: grabbing; transition: none; }
        .lyric-bubble p { margin: 0; color: var(--lyric-color); font-size: calc(var(--global-font-size) + 2px); }
        
        /* New Song Title Box */
        #song-title-box {
            position: absolute;
            top: 15%; /* Default position above lyrics/art usually */
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.5);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 8px;
            padding: 8px 15px;
            color: white;
            font-size: 14px;
            backdrop-filter: blur(5px);
            cursor: grab;
            z-index: 9;
            touch-action: none;
            max-width: 80%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            transition: transform 0.1s;
        }
        #song-title-box.dragging { cursor: grabbing; transition: none; }

        .player-controls { width: 100%; padding: 10px 0; color: white; flex-shrink: 0; }
        .progress-bar-container { display: flex; align-items: center; gap: 10px; width: 100%; font-size: 12px; }
        #progress-bar { flex-grow: 1; -webkit-appearance: none; appearance: none; width: 100%; height: 5px; background: rgba(255,255,255,0.3); border-radius: 5px; outline: none; transition: opacity .2s; }
        #progress-bar::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 15px; height: 15px; background: #fff; border-radius: 50%; cursor: pointer; }
        .main-controls { display: flex; justify-content: center; align-items: center; margin-top: 15px; gap: 20px; }
        .main-controls button { background: none; border: none; display: flex; align-items: center; justify-content: center; padding: 0; color: white; text-shadow: 0 0 5px rgba(0,0,0,0.5); }
        #play-pause-btn { background-color: rgba(255, 255, 255, 0.9); color: #000; border-radius: 50%; width: 55px; height: 55px; font-size: 28px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: background-color 0.3s, color 0.3s; text-shadow: none; }
        #prev-btn, #next-btn { font-size: 30px; opacity: 0.9; }
        body.light-mode #play-pause-btn { background-color: rgba(0, 0, 0, 0.7); color: #fff; }
        #player-settings-menu { display: none; position: absolute; top: 110%; right: 0; background: var(--bg-tertiary); border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.4); padding: 10px; width: 200px; z-index: 20; }
        #player-settings-menu.visible { display: block; }
        #player-settings-menu a { display: block; padding: 8px 12px; color: var(--text-primary); text-decoration: none; border-radius: 4px; }
        #player-settings-menu a:hover { background: var(--border-color); }
        .menu-section { padding-top: 8px; margin-top: 8px; border-top: 1px solid var(--border-color); }
        .menu-section-title { font-size: 12px; color: var(--text-secondary); padding: 0 12px 4px; }
        .speed-control { display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; }
        #playback-speed { background: var(--bg-secondary); color: var(--text-primary); border: 1px solid var(--border-color); border-radius: 4px; }
        #color-picker { display: none; position: absolute; top: 60px; right: 20px; background-color: #282828; padding: 10px; border-radius: 8px; grid-template-columns: repeat(4, 1fr); gap: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.4); z-index: 20;}
        #color-picker.visible { display: grid; }
        .color-swatch { width: 30px; height: 30px; border-radius: 50%; cursor: pointer; border: 2px solid transparent; } .color-swatch:hover { border-color: white; }
        .beautify-section { border-bottom: 1px solid var(--border-color); padding-bottom: 20px; margin-bottom: 20px; }
        .app-customize-row { display: flex; align-items: center; gap: 15px; margin-bottom: 10px; }
        .app-customize-row .preview-icon { width: 50px; height: 50px; border-radius: 10px; object-fit: cover; background-color: var(--bg-tertiary); flex-shrink: 0; }
        .app-customize-row .app-name-input { flex-grow: 1; padding: 10px; background-color: var(--bg-tertiary); border: 1px solid var(--border-color); color: var(--text-primary); border-radius: 4px; }
        .app-customize-row .select-file-btn { padding: 8px 12px; font-size: 13px; background-color: #03A9F4; color: white; border: none; border-radius: 4px; white-space: nowrap; transition: background-color 0.2s, transform 0.1s; }
        .app-customize-row .select-file-btn:active { background-color: #039be5; transform: scale(0.98); }
        .input-with-button { display: flex; gap: 10px; }
        .input-with-button input { flex-grow: 1; }
        .input-with-button button { padding: 10px 15px; background-color: #1DB954; color: white; border: none; border-radius: 4px; transition: background-color 0.2s, transform 0.1s; }
        .input-with-button button:active { background-color: #1aa34a; transform: scale(0.98); }
        .font-size-control { display: flex; align-items: center; gap: 15px; }
        .font-size-control input[type="range"] { flex-grow: 1; }
        .font-size-control span { font-weight: bold; min-width: 40px; text-align: right; }
        .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); display: none; justify-content: center; align-items: center; z-index: 1000; }
        .modal-content { background: var(--bg-secondary); padding: 25px; border-radius: 12px; max-width: 90%; width: 350px; box-shadow: 0 5px 20px rgba(0,0,0,0.3); } .modal-content button { float: right; }
        #crop-modal-content { width: 90vw; max-width: 500px; padding: 10px; } #cropper-container { width: 100%; height: 60vh; max-height: 400px; } #cropper-image { display: block; max-width: 100%; } .cropper-buttons { text-align: right; margin-top: 10px; }
        .image-preview { width: 50px; height: 50px; border-radius: 4px; object-fit: contain; margin-left: 10px; background-color: var(--bg-tertiary); }
        .switch { position:relative;display:inline-block;width:60px;height:34px} .switch input{opacity:0;width:0;height:0} .slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#ccc;transition:.4s;border-radius:34px} .slider:before{position:absolute;content:"";height:26px;width:26px;left:4px;bottom:4px;background-color:white;transition:.4s;border-radius:50%} input:checked+.slider{background-color:#2196F3} input:checked+.slider:before{transform:translateX(26px)}
        .source-switcher { display: flex; gap: 20px; margin-bottom: 10px; }
        .hidden-input { display: none; }
        .import-vtt-btn { margin-bottom: 5px; font-size: 12px; background-color: var(--bg-tertiary); border: 1px solid var(--border-color); color: var(--text-primary); padding: 5px 10px; border-radius: 4px; transition: background-color 0.2s, transform 0.1s; }
        .import-vtt-btn:active { background-color: var(--border-color); transform: scale(0.98); }

        /* Full Page Lyrics Modal */
        #full-lyrics-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            z-index: 2000;
            display: flex;
            flex-direction: column;
            transform: translateY(100%);
            transition: transform 0.3s ease;
        }
        #full-lyrics-modal.active { transform: translateY(0); }
        .full-lyrics-header { padding: 20px; display: flex; justify-content: flex-end; }
        .close-lyrics-btn { background: none; border: none; color: white; font-size: 30px; opacity: 0.7; }
        .full-lyrics-container {
            flex-grow: 1;
            overflow-y: auto;
            padding: 20px;
            text-align: center;
            -webkit-mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);
            mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);
        }
        .full-lyric-line {
            padding: 12px 5px;
            color: #888;
            font-size: 18px;
            transition: all 0.3s;
            cursor: pointer;
        }
        .full-lyric-line.active {
            color: var(--lyric-color);
            font-size: 24px;
            font-weight: bold;
            text-shadow: 0 0 10px rgba(255,255,255,0.3);
            transform: scale(1.05);
        }
        
        /* 播放列表列表样式 */
        .folder-list { display: none; list-style: none; padding: 0; margin: 0; }
        .folder-list-item { display: flex; align-items: center; padding: 12px; border-radius: 8px; transition: background-color 0.2s; margin-bottom: 8px; background-color: var(--bg-tertiary); }
        .folder-list-item:hover { background-color: var(--border-color); }
        .folder-list-icon { font-size: 24px; margin-right: 15px; }
        .folder-list-info { flex-grow: 1; }
        .folder-list-name { font-weight: 500; }
        .folder-list-count { font-size: 12px; color: var(--text-secondary); margin-top: 2px; }
        .folder-list-actions { display: flex; }
        .folder-list-actions button { background: none; border: none; font-size: 16px; padding: 5px; color: var(--text-secondary); }
        
        /* 修改2: 新建选项样式 */
        .new-folder-option { color: inherit !important; font-weight: normal !important; }
        
        /* 荣耀手机文件上传特殊样式 */
        .honor-file-input-container {
            position: relative;
            width: 100%;
            margin-bottom: 10px;
        }
        
        .honor-file-input-button {
            display: block;
            width: 100%;
            padding: 12px 15px;
            background-color: #1DB954;
            color: white;
            border: none;
            border-radius: 6px;
            font-size: 15px;
            font-weight: bold;
            text-align: center;
            cursor: pointer;
            transition: background-color 0.2s, transform 0.1s;
        }
        
        .honor-file-input-button:active {
            background-color: #1aa34a;
            transform: scale(0.98);
        }
        
        .honor-file-input-real {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            cursor: pointer;
            z-index: 10;
        }
        
        /* 荣耀手机权限引导页面 */
        #honor-permission-guide {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 9999;
            padding: 20px;
            box-sizing: border-box;
            overflow-y: auto;
            color: white;
        }
        
        #honor-permission-guide.active {
            display: block;
        }
        
        .permission-guide-content {
            background: #333;
            padding: 20px;
            border-radius: 10px;
            margin-top: 20px;
        }
        
        .permission-step {
            margin-bottom: 20px;
            padding: 15px;
            background: #444;
            border-radius: 8px;
        }
        
        .permission-step h3 {
            margin-top: 0;
            color: #1DB954;
        }
        
        .permission-step img {
            max-width: 100%;
            border-radius: 5px;
            margin-top: 10px;
        }
        
        /* 文件上传状态提示 */
        .file-upload-status {
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 1001;
            display: none;
            font-size: 14px;
            max-width: 80%;
            text-align: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        
        .file-upload-status.active {
            display: block;
            animation: fadeInOut 3s ease-in-out;
        }
        
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
            10% { opacity: 1; transform: translateX(-50%) translateY(0); }
            90% { opacity: 1; transform: translateX(-50%) translateY(0); }
            100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
        }
        
        /* 大文件警告 */
        .file-size-warning {
            display: none;
            background: #ff9800;
            color: white;
            padding: 8px 12px;
            border-radius: 4px;
            margin-top: 5px;
            font-size: 12px;
        }
        
        .file-size-warning.active {
            display: block;
        }
        
        /* 权限测试按钮 */
        .permission-test-btn {
            background: #ff9800;
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 12px;
            margin-top: 5px;
            cursor: pointer;
        }
        
        .permission-test-btn:active {
            background: #f57c00;
        }
    </style>
</head>
<body>
    <!-- 荣耀手机权限引导页面 -->
    <div id="honor-permission-guide">
        <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #1DB954;">📁 荣耀手机文件上传权限设置指南</h1>
            <p style="color: #ccc; margin-top: 10px;">请按照以下步骤开启文件访问权限</p>
        </div>
        
        <div class="permission-guide-content">
            <div class="permission-step">
                <h3>步骤 1: 进入应用设置</h3>
                <p>在手机桌面找到本应用图标，长按应用图标，选择「应用信息」或「应用详情」</p>
            </div>
            
            <div class="permission-step">
                <h3>步骤 2: 找到权限管理</h3>
                <p>在应用信息页面中，找到并点击「权限」或「权限管理」选项</p>
            </div>
            
            <div class="permission-step">
                <h3>步骤 3: 开启文件权限</h3>
                <p>在权限列表中，找到以下权限并设置为「允许」：</p>
                <ul style="color: #ccc; padding-left: 20px;">
                    <li><strong>存储权限</strong>（读取手机存储）</li>
                    <li><strong>文件访问权限</strong></li>
                    <li><strong>媒体访问权限</strong></li>
                </ul>
            </div>
            
            <div class="permission-step">
                <h3>步骤 4: 重新启动应用</h3>
                <p>设置完成后，请完全关闭应用并重新打开</p>
            </div>
            
            <div style="margin-top: 30px; text-align: center;">
                <button id="close-permission-guide" style="background: #1DB954; color: white; border: none; padding: 12px 30px; border-radius: 6px; font-size: 16px; cursor: pointer;">
                    我已设置完成，开始使用
                </button>
                <p style="color: #999; margin-top: 15px; font-size: 12px;">如果仍有问题，请尝试在系统设置中允许「安装未知来源应用」</p>
            </div>
        </div>
    </div>
    
    <div id="desktop-view" class="view active">
        <div class="desktop-header">
            <div id="desktop-time">12:00</div>
            <div id="desktop-date">1月1日</div>
        </div>
        <div class="desktop-top-right">
            <button id="announcement-btn">📢</button>
        </div>
        <div class="desktop-main">
            <div class="app-dock" id="app-dock"></div>
            <div id="display-picture-container"></div>
        </div>
    </div>
    
    <!-- 添加歌曲界面 -->
    <div id="settings-view" class="view app-page">
        <div class="app-header">
            <button class="back-btn" data-target="desktop-view">‹</button>
            <h1 id="settings-view-title">添加歌曲</h1>
        </div>
        <div class="app-content">
            <div class="form-group">
                <label>歌曲标题</label>
                <input type="text" id="song-title-input" placeholder="将自动识别文件名">
            </div>
            
            <div class="form-group">
                <!-- 修改2: 删除"创建文件夹"按钮，只保留下拉菜单中的"新建"选项 -->
                <label>分类文件夹</label>
                <select id="song-folder-select">
                    <option value="">未分类</option>
                    <!-- "新建"选项将通过JS添加 -->
                </select>
            </div>
            
            <div class="form-group">
                <label>封面图片 (可选)</label>
                <!-- 荣耀手机专用文件上传按钮 -->
                <div class="honor-file-input-container">
                    <button type="button" class="honor-file-input-button" id="honor-image-btn">
                        📷 选择封面图片
                    </button>
                    <input type="file" class="honor-file-input-real" id="honor-image-file-input" accept="image/*">
                </div>
                <div style="display:flex;align-items:center; margin-top: 10px;">
                    <input type="file" id="image-file-input" accept="image/*" style="flex-grow:1; display: none;">
                    <img id="add-image-preview" class="image-preview" style="display:none">
                </div>
                <div id="image-size-warning" class="file-size-warning"></div>
            </div>
            
            <div class="form-group">
                <label>音频来源</label>
                <div class="source-switcher">
                    <label><input type="radio" name="audioSource" value="file" checked> 上传文件</label>
                    <label><input type="radio" name="audioSource" value="url"> 使用URL</label>
                </div>
                <p style="font-size: 12px; color: var(--text-secondary); margin-top: 5px; margin-bottom: 10px;">如果机型不支持wav，可上传url</p>
                <div id="audio-file-group">
                    <!-- 荣耀手机专用文件上传按钮 -->
                    <div class="honor-file-input-container">
                        <button type="button" class="honor-file-input-button" id="honor-audio-btn">
                            🎵 选择音频文件
                        </button>
                        <input type="file" class="honor-file-input-real" id="honor-audio-file-input" accept=".mp3,.wav,.m4a,audio/*">
                    </div>
                    <input type="file" id="audio-file-input" accept=".mp3,.wav,.m4a,audio/*" style="display: none;">
                </div>
                <div id="audio-url-group" class="hidden-input">
                    <input type="text" id="audio-url-input" placeholder="输入 .mp3 或 .wav 链接">
                </div>
                <div id="audio-size-warning" class="file-size-warning"></div>
                <button type="button" class="permission-test-btn" id="test-audio-permission">
                    测试音频文件选择
                </button>
            </div>
            
            <div class="form-group">
                <div style="display:flex;justify-content:space-between;align-items:center;">
                    <label>字幕/歌词</label>
                    <button type="button" class="import-vtt-btn" data-target="lyric-input">📥 导入歌词文件</button>
                </div>
                <textarea id="lyric-input" rows="5" placeholder="格式:&#10;00:00:01.000 --> 00:00:04.000&#10;这是第一句歌词...&#10;或直接粘贴VTT/SRT/LRC内容"></textarea>
            </div>
            
            <button id="save-preset-btn" class="action-button">保存歌曲</button>
            
            <!-- 荣耀手机权限提示 -->
            <div style="margin-top: 20px; padding: 15px; background: rgba(255, 152, 0, 0.1); border-radius: 8px; border-left: 4px solid #ff9800;">
                <h4 style="margin-top: 0; color: #ff9800;">📱 荣耀手机用户请注意</h4>
                <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 10px;">
                    如果无法选择文件，请检查是否已授予应用「存储权限」。点击下方按钮查看设置教程：
                </p>
                <button type="button" id="show-permission-guide" style="background: #ff9800; color: white; border: none; padding: 8px 15px; border-radius: 4px; font-size: 13px; width: 100%;">
                    查看权限设置教程
                </button>
            </div>
        </div>
    </div>
    
    <div id="edit-song-view" class="view app-page">
        <div class="app-header">
            <button class="back-btn" data-target="playlist-view">‹</button>
            <h1 id="edit-view-title">编辑歌曲</h1>
        </div>
        <div class="app-content">
            <form id="edit-song-form">
                <div class="form-group">
                    <label>歌曲标题</label>
                    <input type="text" id="edit-song-title-input">
                </div>
                <div class="form-group">
                    <label>分类文件夹</label>
                    <select id="edit-song-folder-select">
                        <option value="">未分类</option>
                    </select>
                </div>
                <div class="form-group">
                    <div style="display:flex;justify-content:space-between;align-items:center;">
                        <label>字幕/歌词</label>
                        <button type="button" class="import-vtt-btn" data-target="edit-lyric-input">📥 导入歌词文件</button>
                    </div>
                    <textarea id="edit-lyric-input" rows="5"></textarea>
                </div>
                <div class="form-group">
                    <label>更换音频文件 (可选)</label>
                    <!-- 荣耀手机专用文件上传按钮 -->
                    <div class="honor-file-input-container">
                        <button type="button" class="honor-file-input-button" id="honor-edit-audio-btn">
                            🎵 更换音频文件
                        </button>
                        <input type="file" class="honor-file-input-real" id="honor-edit-audio-file-input" accept=".mp3,.wav,.m4a,audio/*">
                    </div>
                    <input type="file" id="edit-audio-file-input" accept=".mp3,.wav,.m4a,audio/*" style="display: none;">
                </div>
                <div class="form-group">
                    <label>更换封面图片 (可选)</label>
                    <!-- 荣耀手机专用文件上传按钮 -->
                    <div class="honor-file-input-container">
                        <button type="button" class="honor-file-input-button" id="honor-edit-image-btn">
                            📷 更换封面图片
                        </button>
                        <input type="file" class="honor-file-input-real" id="honor-edit-image-file-input" accept="image/*">
                    </div>
                    <div style="display:flex;align-items:center; margin-top: 10px;">
                        <input type="file" id="edit-image-file-input" accept="image/*" style="flex-grow:1; display: none;">
                        <img id="edit-image-preview" class="image-preview">
                    </div>
                </div>
                <div class="form-group">
                    <label>界面布局</label>
                    <button type="button" id="reset-positions-btn" style="background-color: #607D8B; color: white; border: none; padding: 12px; width: 100%; border-radius: 4px;">↺ 重置所有拖动位置</button>
                </div>
                <button id="update-song-btn" class="action-button" type="submit">保存更改</button>
            </form>
        </div>
    </div>
    
    <!-- 播放列表 -->
    <div id="playlist-view" class="view app-page">
        <div class="app-header">
            <button class="back-btn" id="playlist-back-btn" data-target="desktop-view">‹</button>
            <h1 id="playlist-view-title">播放列表</h1>
            <button id="create-folder-btn" title="新建文件夹">+</button>
        </div>
        <div class="app-content">
            <div id="folders-grid" class="folder-grid"></div>
            <ul id="playlist-container"></ul>
            <ul id="folders-list" class="folder-list"></ul>
        </div>
    </div>

    <div id="beautify-view" class="view app-page">
        <div class="app-header">
            <button class="back-btn" data-target="desktop-view">‹</button>
            <h1 id="beautify-view-title">美化</h1>
        </div>
        <div class="app-content">
            <div class="beautify-section">
                <h2>主题模式</h2>
                <div style="display:flex;align-items:center;gap:10px;">
                    <span>夜间</span>
                    <label class="switch">
                        <input type="checkbox" id="theme-switch">
                        <span class="slider"></span>
                    </label>
                    <span>日间</span>
                </div>
            </div>
            <div class="beautify-section">
                <h2>应用定制</h2>
                <div id="app-customize-container"></div>
            </div>
            <div class="beautify-section">
                <h2>播放器界面</h2>
                <div class="form-group">
                    <label>全局背景</label>
                    <!-- 荣耀手机专用文件上传按钮 -->
                    <div class="honor-file-input-container">
                        <button type="button" class="honor-file-input-button" id="honor-player-bg-btn">
                            🖼️ 选择播放器背景
                        </button>
                        <input type="file" class="honor-file-input-real" id="honor-player-bg-input" accept="image/*">
                    </div>
                    <input type="file" id="player-bg-input" accept="image/*" style="display: none;">
                </div>
                <div class="form-group">
                    <label>封面尺寸 (px)</label>
                    <div class="input-with-button">
                        <input type="number" id="cover-width-input" placeholder="宽度">
                        <input type="number" id="cover-height-input" placeholder="高度">
                        <button id="save-cover-size-btn">保存</button>
                    </div>
                </div>
            </div>
            <div class="beautify-section">
                <h2>桌面与字体</h2>
                <div class="form-group">
                    <label>全局背景</label>
                    <!-- 荣耀手机专用文件上传按钮 -->
                    <div class="honor-file-input-container">
                        <button type="button" class="honor-file-input-button" id="honor-bg-file-btn">
                            🖼️ 选择桌面背景
                        </button>
                        <input type="file" class="honor-file-input-real" id="honor-bg-file-input" accept="image/*">
                    </div>
                    <input type="file" id="bg-file-input" accept="image/*" style="display: none;">
                </div>
                <div class="form-group">
                    <label>展示区图片</label>
                    <!-- 荣耀手机专用文件上传按钮 -->
                    <div class="honor-file-input-container">
                        <button type="button" class="honor-file-input-button" id="honor-dp-file-btn">
                            🖼️ 选择展示区图片
                        </button>
                        <input type="file" class="honor-file-input-real" id="honor-dp-file-input" accept="image/*">
                    </div>
                    <input type="file" id="dp-file-input" accept="image/*" style="display: none;">
                </div>
                <div class="form-group">
                    <label>字体文件</label>
                    <div class="input-with-button">
                        <!-- 荣耀手机专用文件上传按钮 -->
                        <div class="honor-file-input-container" style="flex-grow: 1;">
                            <button type="button" class="honor-file-input-button" id="honor-font-file-btn">
                                🔤 选择字体文件
                            </button>
                            <input type="file" class="honor-file-input-real" id="honor-font-file-input" accept=".ttf,.otf,.woff,.woff2">
                        </div>
                        <input type="file" id="font-file-input" accept=".ttf,.otf,.woff,.woff2" style="display: none;">
                        <input type="text" id="font-url-input" placeholder="选择字体文件或输入URL" readonly style="display: none;">
                        <button id="select-font-btn">选择文件</button>
                        <button id="save-font-btn">保存</button>
                    </div>
                    <p style="font-size: 12px; color: var(--text-secondary); margin-top: 5px;">支持TTF、OTF、WOFF、WOFF2格式</p>
                </div>
                <div class="form-group">
                    <label>全局字体大小</label>
                    <div class="font-size-control">
                        <input type="range" id="font-size-slider" min="12" max="22" step="1">
                        <span id="font-size-value">16px</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- 数据管理界面 -->
    <div id="data-view" class="view app-page">
        <div class="app-header">
            <button class="back-btn" data-target="desktop-view">‹</button>
            <h1 id="data-view-title">数据管理</h1>
        </div>
        <div class="app-content">
            <p style="color: var(--text-secondary); line-height: 1.6; margin-top: 0;">这里是您的数据中心。您可以将所有歌曲、美化设置和个人配置导出为一个单一的 <code>.zip</code> 备份文件。 这个文件可以在任何设备上通过"导入"功能恢复您的整个播放器，实现无缝迁移和数据保护。</p>
            <div class="form-group">
                <label>导出</label>
                <button id="export-btn" class="action-button">导出全部数据</button>
            </div>
            <div class="form-group">
                <label>导入</label>
                <!-- 荣耀手机专用文件上传按钮 -->
                <div class="honor-file-input-container">
                    <button type="button" class="honor-file-input-button" id="honor-import-btn">
                        📁 选择备份文件导入
                    </button>
                    <input type="file" class="honor-file-input-real" id="honor-import-file-input" accept=".zip">
                </div>
                <button id="import-btn" class="action-button" style="display: none;">导入备份文件 (覆盖)</button>
                <input type="file" id="import-file-input" accept=".zip" style="display:none;">
            </div>
            
            <!-- 荣耀手机权限提示 -->
            <div style="margin-top: 20px; padding: 15px; background: rgba(33, 150, 243, 0.1); border-radius: 8px; border-left: 4px solid #2196F3;">
                <h4 style="margin-top: 0; color: #2196F3;">⚠️ 荣耀手机导入提示</h4>
                <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 5px;">
                    如果无法选择备份文件，请确保：
                </p>
                <ul style="font-size: 13px; color: var(--text-secondary); padding-left: 20px; margin-bottom: 10px;">
                    <li>文件保存在手机内部存储（非SD卡）</li>
                    <li>文件大小不超过100MB</li>
                    <li>已授予应用存储权限</li>
                </ul>
                <button type="button" id="test-import-permission" class="permission-test-btn" style="width: 100%;">
                    测试备份文件选择
                </button>
            </div>
        </div>
    </div>

    <div id="player-view" class="view">
        <div class="player-top-bar">
            <button class="back-btn" data-target="playlist-view">‹</button>
            <div class="right-controls">
                <button id="set-song-bg-btn">🖼️</button>
                <button id="toggle-color-picker-btn">🎨</button>
                <button id="reset-bg-btn" title="重置背景">🗑️</button>
                <button id="full-lyrics-btn">📜</button>
                <button id="player-settings-btn">⋮</button>
                <div id="player-settings-menu">
                    <a id="download-song-link" download>下载音频</a>
                    <div class="speed-control">
                        <span>速度:</span>
                        <select id="playback-speed">
                            <option value="0.5">0.5x</option>
                            <option value="1" selected>1.0x</option>
                            <option value="1.25">1.25x</option>
                            <option value="1.5">1.5x</option>
                            <option value="2.0">2.0x</option>
                        </select>
                    </div>
                    <div class="menu-section">
                        <div class="menu-section-title">睡眠定时器</div>
                        <a href="#" data-time="0">关闭</a>
                        <a href="#" data-time="15">15 分钟后</a>
                        <a href="#" data-time="30">30 分钟后</a>
                        <a href="#" data-time="60">60 分钟后</a>
                        <a href="#" data-time="-1">当前歌曲播放完后</a>
                    </div>
                     <div class="menu-section">
                        <a href="#" id="toggle-continuous-play">连续播放: 关闭</a>
                    </div>
                </div>
            </div>
        </div>
        <div id="color-picker"></div>
        
        <div id="player-content-wrapper">
            <div id="song-title-box">Unknown Song</div>
            <img id="album-art" alt="Art">
            <div class="lyric-bubble">
                <p id="lyric-display">...</p>
            </div>
        </div>

        <div class="player-controls">
            <div class="progress-bar-container">
                <span id="current-time">00:00</span>
                <input type="range" id="progress-bar" value="0" step="1">
                <span id="duration-time">00:00</span>
            </div>
            <div class="main-controls">
                <button id="prev-btn">⏮</button>
                <button id="play-pause-btn">▶</button>
                <button id="next-btn">⏭</button>
            </div>
        </div>
        
        <audio id="audio-player" style="display: none;"></audio>
        <!-- 荣耀手机专用文件上传 -->
        <div style="display: none;">
            <input type="file" id="song-bg-input" accept="image/*">
            <input type="file" id="vtt-import-input" accept=".vtt,.srt,.lrc,.txt">
        </div>
    </div>

    <!-- Full Page Lyrics Modal -->
    <div id="full-lyrics-modal">
        <div class="full-lyrics-header">
            <button class="close-lyrics-btn">×</button>
        </div>
        <div class="full-lyrics-container" id="full-lyrics-list">
            <!-- Lines generated by JS -->
        </div>
    </div>

    <div id="crop-modal-overlay" class="modal-overlay"><div id="crop-modal-content"><div id="cropper-container"><img id="cropper-image"></div><div class="cropper-buttons"><button id="cancel-crop-btn">取消</button><button id="confirm-crop-btn">裁剪</button></div></div></div>
    
    <!-- 文件上传状态提示 -->
    <div id="file-upload-status" class="file-upload-status"></div>

    <script>
        // 检测荣耀手机和Android设备
        const isHonor = /honor/i.test(navigator.userAgent);
        const isAndroid = /android/i.test(navigator.userAgent);
        const isHuawei = /huawei/i.test(navigator.userAgent);
        const isEMUI = /emui/i.test(navigator.userAgent);
        
        // 特别处理荣耀/Huawei设备
        const isHonorOrHuawei = isHonor || isHuawei || isEMUI;
        const isAndroidDevice = isAndroid || isHonorOrHuawei;
        
        console.log('设备检测:', {
            userAgent: navigator.userAgent,
            isHonor: isHonor,
            isAndroid: isAndroid,
            isHuawei: isHuawei,
            isEMUI: isEMUI,
            isHonorOrHuawei: isHonorOrHuawei,
            isAndroidDevice: isAndroidDevice
        });
        
        document.addEventListener('DOMContentLoaded', () => {
            // 显示设备信息
            if (isHonorOrHuawei) {
                console.log('检测到荣耀/Huawei设备，启用特殊文件上传处理');
                showUploadStatus('检测到荣耀/Huawei设备，已启用兼容模式');
            }
            
            // 初始化数据库
            const db = new Dexie('MusicOSDatabase');
            db.version(5).stores({ 
                songs: '++id, title, folderId', 
                settings: 'key', 
                folders: '++id, name' 
            });

            let currentLyrics = [], cropper, croppedImageBlob = null, lastSaveTime = 0;
            let sleepTimerId = null, stopAtSongEnd = false, isContinuousPlay = false;
            let tempObjectURLs = { player: [], playlist: [], beautify: [], config: [] };
            const defaultCover = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzg4OCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjEwIj48L2NpcmNsZT48cGF0aCBkPSJtMTYgOCAtOCAzIDggMyB6IiAvPjwvZz48L3N2Zz4=';
            let appConfig = [];
            const defaultAppConfig = [
                { id: 'settings', name: '添加歌曲', icon: '➕', target: 'settings-view' },
                { id: 'playlist', name: '播放列表', icon: '🎵', target: 'playlist-view' },
                { id: 'beautify', name: '美化', icon: '🎨', target: 'beautify-view' },
                { id: 'data', name: '数据管理', icon: '💾', target: 'data-view' }
            ];
            
            // Folder State
            let currentFolderId = null; 

            // 显示上传状态
            function showUploadStatus(message) {
                const statusEl = document.getElementById('file-upload-status');
                if (statusEl) {
                    statusEl.textContent = message;
                    statusEl.classList.add('active');
                    setTimeout(() => {
                        statusEl.classList.remove('active');
                    }, 3000);
                }
                console.log('上传状态:', message);
            }
            
            // 显示文件大小警告
            function showFileSizeWarning(elementId, fileSizeMB, maxSizeMB = 50) {
                const warningEl = document.getElementById(elementId);
                if (warningEl) {
                    if (fileSizeMB > maxSizeMB) {
                        warningEl.textContent = `⚠️ 文件较大 (${fileSizeMB.toFixed(1)}MB)，建议压缩或选择小于${maxSizeMB}MB的文件`;
                        warningEl.classList.add('active');
                    } else {
                        warningEl.classList.remove('active');
                    }
                }
            }
            
            // 荣耀手机专用文件上传处理
            function initHonorFileUpload() {
                console.log('初始化荣耀手机文件上传处理...');
                
                // 绑定荣耀手机专用文件上传按钮
                const honorButtons = {
                    // 添加歌曲界面
                    'honor-image-btn': 'honor-image-file-input',
                    'honor-audio-btn': 'honor-audio-file-input',
                    
                    // 编辑歌曲界面
                    'honor-edit-image-btn': 'honor-edit-image-file-input',
                    'honor-edit-audio-btn': 'honor-edit-audio-file-input',
                    
                    // 美化界面
                    'honor-player-bg-btn': 'honor-player-bg-input',
                    'honor-bg-file-btn': 'honor-bg-file-input',
                    'honor-dp-file-btn': 'honor-dp-file-input',
                    'honor-font-file-btn': 'honor-font-file-input',
                    
                    // 数据管理界面
                    'honor-import-btn': 'honor-import-file-input'
                };
                
                // 为每个荣耀按钮绑定点击事件
                Object.keys(honorButtons).forEach(buttonId => {
                    const button = document.getElementById(buttonId);
                    const inputId = honorButtons[buttonId];
                    const input = document.getElementById(inputId);
                    
                    if (button && input) {
                        button.addEventListener('click', function(e) {
                            e.preventDefault();
                            e.stopPropagation();
                            console.log('荣耀文件上传按钮被点击:', buttonId);
                            
                            // 尝试多种方式触发文件选择
                            try {
                                // 方法1: 直接调用click
                                input.click();
                                
                                // 方法2: 如果方法1失败，创建新的input元素
                                setTimeout(() => {
                                    if (!input.files || input.files.length === 0) {
                                        console.log('方法1可能失败，尝试方法2');
                                        const tempInput = document.createElement('input');
                                        tempInput.type = 'file';
                                        tempInput.accept = input.accept;
                                        tempInput.style.display = 'none';
                                        document.body.appendChild(tempInput);
                                        
                                        tempInput.addEventListener('change', function() {
                                            // 将文件传递给原始input
                                            const dataTransfer = new DataTransfer();
                                            for (let i = 0; i < this.files.length; i++) {
                                                dataTransfer.items.add(this.files[i]);
                                            }
                                            input.files = dataTransfer.files;
                                            
                                            // 触发change事件
                                            const event = new Event('change', { bubbles: true });
                                            input.dispatchEvent(event);
                                            
                                            document.body.removeChild(tempInput);
                                        });
                                        
                                        tempInput.click();
                                    }
                                }, 100);
                                
                                showUploadStatus('请选择文件...');
                            } catch (error) {
                                console.error('文件选择失败:', error);
                                showUploadStatus('文件选择失败，请检查权限');
                                
                                // 显示权限引导
                                document.getElementById('honor-permission-guide').classList.add('active');
                            }
                        });
                        
                        // 监听文件选择
                        input.addEventListener('change', function(e) {
                            if (this.files && this.files.length > 0) {
                                const file = this.files[0];
                                console.log('文件选择成功:', file.name, '大小:', (file.size / 1024 / 1024).toFixed(2) + 'MB');
                                showUploadStatus(`已选择: ${file.name}`);
                                
                                // 根据input类型处理文件
                                handleHonorFileSelection(inputId, file);
                            }
                        });
                    }
                });
                
                // 测试权限按钮
                document.getElementById('test-audio-permission')?.addEventListener('click', function() {
                    testFilePermission('audio');
                });
                
                document.getElementById('test-import-permission')?.addEventListener('click', function() {
                    testFilePermission('zip');
                });
                
                // 显示权限引导按钮
                document.getElementById('show-permission-guide')?.addEventListener('click', function() {
                    document.getElementById('honor-permission-guide').classList.add('active');
                });
                
                // 关闭权限引导
                document.getElementById('close-permission-guide')?.addEventListener('click', function() {
                    document.getElementById('honor-permission-guide').classList.remove('active');
                });
            }
            
            // 处理荣耀手机文件选择
            function handleHonorFileSelection(inputId, file) {
                console.log('处理荣耀文件:', inputId, file.name);
                
                // 根据inputId映射到原始input
                const inputMap = {
                    'honor-image-file-input': 'image-file-input',
                    'honor-audio-file-input': 'audio-file-input',
                    'honor-edit-image-file-input': 'edit-image-file-input',
                    'honor-edit-audio-file-input': 'edit-audio-file-input',
                    'honor-player-bg-input': 'player-bg-input',
                    'honor-bg-file-input': 'bg-file-input',
                    'honor-dp-file-input': 'dp-file-input',
                    'honor-font-file-input': 'font-file-input',
                    'honor-import-file-input': 'import-file-input'
                };
                
                const originalInputId = inputMap[inputId];
                if (originalInputId) {
                    const originalInput = document.getElementById(originalInputId);
                    if (originalInput) {
                        // 创建DataTransfer对象来设置文件
                        const dataTransfer = new DataTransfer();
                        dataTransfer.items.add(file);
                        originalInput.files = dataTransfer.files;
                        
                        // 触发change事件
                        const event = new Event('change', { bubbles: true });
                        originalInput.dispatchEvent(event);
                        
                        // 特殊处理：音频文件自动填充标题
                        if (inputId === 'honor-audio-file-input' && file.name) {
                            const titleInput = document.getElementById('song-title-input');
                            if (titleInput && (!titleInput.value || titleInput.value === '')) {
                                const fileName = file.name.replace(/\.[^/.]+$/, "");
                                titleInput.value = fileName;
                            }
                        }
                        
                        // 显示文件大小警告
                        const fileSizeMB = file.size / 1024 / 1024;
                        if (inputId.includes('audio')) {
                            showFileSizeWarning('audio-size-warning', fileSizeMB, 100);
                        } else if (inputId.includes('image')) {
                            showFileSizeWarning('image-size-warning', fileSizeMB, 20);
                        }
                    }
                }
            }
            
            // 测试文件权限
            function testFilePermission(type) {
                const acceptMap = {
                    'audio': '.mp3,.wav,.m4a,audio/*',
                    'image': 'image/*',
                    'zip': '.zip',
                    'all': '*/*'
                };
                
                const accept = acceptMap[type] || '*/*';
                const testInput = document.createElement('input');
                testInput.type = 'file';
                testInput.accept = accept;
                testInput.style.display = 'none';
                
                document.body.appendChild(testInput);
                
                let permissionGranted = false;
                const timeout = setTimeout(() => {
                    if (!permissionGranted) {
                        showUploadStatus('文件选择超时，可能没有权限');
                        document.getElementById('honor-permission-guide').classList.add('active');
                    }
                    document.body.removeChild(testInput);
                }, 3000);
                
                testInput.addEventListener('change', function() {
                    permissionGranted = true;
                    clearTimeout(timeout);
                    
                    if (this.files && this.files.length > 0) {
                        showUploadStatus('权限测试成功！可以正常选择文件');
                    } else {
                        showUploadStatus('权限测试失败，请检查设置');
                    }
                    
                    setTimeout(() => {
                        document.body.removeChild(testInput);
                    }, 100);
                });
                
                try {
                    testInput.click();
                    showUploadStatus('正在测试文件权限...');
                } catch (error) {
                    console.error('权限测试失败:', error);
                    showUploadStatus('权限测试失败，请查看设置教程');
                    document.getElementById('honor-permission-guide').classList.add('active');
                    document.body.removeChild(testInput);
                }
            }
            
            // 初始化荣耀手机文件上传（如果是荣耀/Huawei设备）
            if (isHonorOrHuawei) {
                setTimeout(() => {
                    initHonorFileUpload();
                }, 1000);
            }

            function revokeURLs(key) { if (tempObjectURLs[key]) { tempObjectURLs[key].forEach(url => URL.revokeObjectURL(url)); tempObjectURLs[key] = []; } }
            function navigateTo(viewId) { document.querySelectorAll('.view').forEach(v => v.classList.toggle('active', v.id === viewId)); }
            
            function setupNavigation() {
                document.body.addEventListener('click', e => {
                    const appIcon = e.target.closest('.app-icon');
                    const backBtn = e.target.closest('.back-btn, #player-back-btn');
                    const announcementBtn = e.target.closest('#announcement-btn');
                    const closeModalBtn = e.target.closest('#close-modal-btn');
                    const sponsorBtn = e.target.closest('#sponsor-btn');
                    const closeSponsorBtn = e.target.closest('.close-sponsor-btn');

                    if (appIcon) { 
                        e.preventDefault(); 
                        const target = appIcon.dataset.target;
                        navigateTo(target); 
                        if (target === 'beautify-view') loadBeautifySettings(); 
                        if (target === 'settings-view') {
                            loadFoldersIntoSelect('song-folder-select'); 
                            document.getElementById('song-title-input').value = '';
                        }
                        if (target === 'playlist-view') {
                            currentFolderId = null;
                            renderPlaylist();
                        }
                    }
                    if (backBtn) { 
                        const target = backBtn.dataset.target;
                        if (backBtn.id === 'playlist-back-btn') {
                            if (currentFolderId !== null) {
                                currentFolderId = null;
                                renderPlaylist();
                                return;
                            }
                        }

                        if (document.getElementById('player-view').classList.contains('active')) { 
                            document.getElementById('audio-player').pause(); 
                        }
                        navigateTo(target); 
                    }
                    if (announcementBtn) { /* 公告已移除 */ }
                    if (closeModalBtn) { e.target.closest('.modal-overlay').style.display = 'none'; }
                });
            }

            function updateClock() {
                const timeEl = document.getElementById('desktop-time'), dateEl = document.getElementById('desktop-date'), now = new Date();
                timeEl.textContent = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false });
                dateEl.textContent = now.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' });
            }

            async function renderUI() {
                revokeURLs('config');
                const [dbAppConfig, desktopBg, displayPicture, fontUrl, theme, lyricColor, fontSize] = await db.settings.bulkGet(['appConfig', 'desktopBg', 'displayPicture', 'fontUrl', 'theme', 'lyricColor', 'fontSize']);
                appConfig = dbAppConfig?.value || JSON.parse(JSON.stringify(defaultAppConfig));
                const currentFontSize = fontSize?.value || '16';
                document.documentElement.style.setProperty('--global-font-size', `${currentFontSize}px`);
                document.body.classList.toggle('light-mode', theme?.value === 'light');
                const appDock = document.getElementById('app-dock'); appDock.innerHTML = '';
                appConfig.forEach(app => {
                    let iconContent = app.icon;
                    if (app.icon instanceof Blob) { const url = URL.createObjectURL(app.icon); tempObjectURLs.config.push(url); iconContent = `<img src="${url}" style="width:100%;height:100%;object-fit:cover;border-radius:15px;">`; }
                    appDock.innerHTML += `<a href="#" class="app-icon" data-target="${app.target}"><div class="icon-bg">${iconContent}</div><span>${app.name}</span></a>`;
                    const titleEl = document.getElementById(`${app.id}-view-title`); if (titleEl) titleEl.textContent = app.name;
                });
                const desktopView = document.getElementById('desktop-view'), dpContainer = document.getElementById('display-picture-container');
                if (desktopBg?.value) { const url = URL.createObjectURL(desktopBg.value); tempObjectURLs.config.push(url); desktopView.style.backgroundImage = `url(${url})`; } else { desktopView.style.backgroundImage = ''; }
                if (displayPicture?.value) { const url = URL.createObjectURL(displayPicture.value); tempObjectURLs.config.push(url); dpContainer.style.backgroundImage = `url(${url})`; } else { dpContainer.style.backgroundImage = ''; }
                const fontStyleEl = document.getElementById('dynamic-font-style'); if(fontStyleEl) fontStyleEl.remove();
                if (fontUrl?.value) { 
                    const style = document.createElement('style'); 
                    style.id = 'dynamic-font-style'; 
                    if (fontUrl.value.startsWith('blob:')) {
                        style.innerHTML = `@font-face{font-family:'CustomFont';src:url('${fontUrl.value}');}:root{--global-font:'CustomFont',sans-serif;}`;
                    } else {
                        style.innerHTML = `@font-face{font-family:'CustomFont';src:url('${fontUrl.value}');}:root{--global-font:'CustomFont',sans-serif;}`;
                    }
                    document.head.appendChild(style); 
                }
                document.documentElement.style.setProperty('--lyric-color', lyricColor?.value || '#ffffff');
            }

            async function loadBeautifySettings() {
                revokeURLs('beautify');
                const [fontUrl, theme, coverWidth, coverHeight, fontSize] = await db.settings.bulkGet(['fontUrl', 'theme', 'coverWidth', 'coverHeight', 'fontSize']);
                const container = document.getElementById('app-customize-container'); container.innerHTML = '';
                appConfig.forEach((app, index) => {
                    let iconUrl = '';
                    if (app.icon instanceof Blob) { iconUrl = URL.createObjectURL(app.icon); tempObjectURLs.beautify.push(iconUrl); } 
                    else if (typeof app.icon === 'string' && !app.icon.includes(':')) { iconUrl = ''; } 
                    else { iconUrl = app.icon; }
                    container.innerHTML += `<div class="app-customize-row"><img id="preview-icon-${index}" class="preview-icon" src="${iconUrl}" alt="icon"><input type="text" value="${app.name}" data-index="${index}" class="app-name-input"><button class="select-file-btn" data-index="${index}">选择文件</button><input type="file" id="icon-input-${index}" accept="image/*" data-index="${index}" style="display:none;"></div>`;
                });
                document.getElementById('theme-switch').checked = theme?.value === 'light';
                
                const fontUrlInput = document.getElementById('font-url-input');
                if (fontUrl?.value) {
                    if (fontUrl.value.startsWith('blob:')) {
                        fontUrlInput.value = '已上传字体文件';
                    } else {
                        fontUrlInput.value = fontUrl.value;
                    }
                } else {
                    fontUrlInput.value = '';
                }
                
                document.getElementById('cover-width-input').value = coverWidth?.value || '';
                document.getElementById('cover-height-input').value = coverHeight?.value || '';
                const fontSizeSlider = document.getElementById('font-size-slider'), fontSizeValue = document.getElementById('font-size-value'), currentFontSize = fontSize?.value || '16';
                fontSizeSlider.value = currentFontSize; fontSizeValue.textContent = `${currentFontSize}px`;
            }

            const beautifyView = document.getElementById('beautify-view');
            beautifyView.addEventListener('change', async (e) => {
                const el = e.target;
                const index = el.dataset.index;
                if (el.matches('input[type=file]')) {
                    const file = el.files[0]; if (!file) return;
                    if (el.id === `icon-input-${index}`) { appConfig[index].icon = file; await db.settings.put({ key: 'appConfig', value: appConfig }); document.getElementById(`preview-icon-${index}`).src = URL.createObjectURL(file); renderUI(); }
                    else if (el.id === 'player-bg-input') await db.settings.put({ key: 'playerBg', value: file });
                    else if (el.id === 'bg-file-input') { await db.settings.put({ key: 'desktopBg', value: file }); renderUI(); }
                    else if (el.id === 'dp-file-input') { await db.settings.put({ key: 'displayPicture', value: file }); renderUI(); }
                } else if (el.id === 'theme-switch') { const theme = el.checked ? 'light' : 'dark'; await db.settings.put({ key: 'theme', value: theme }); renderUI(); }
            });
            beautifyView.addEventListener('focusout', async (e) => {
                const el = e.target; if (el.classList.contains('app-name-input')) { appConfig[el.dataset.index].name = el.value; await db.settings.put({ key: 'appConfig', value: appConfig }); renderUI(); }
            });
            beautifyView.addEventListener('click', async (e) => {
                const el = e.target;
                if (el.classList.contains('select-file-btn')) { 
                    // 如果是荣耀手机，使用专用按钮
                    if (isHonorOrHuawei) {
                        const index = el.dataset.index;
                        const honorInput = document.getElementById(`honor-icon-input-${index}`);
                        if (honorInput) {
                            honorInput.click();
                        } else {
                            document.getElementById(`icon-input-${index}`).click();
                        }
                    } else {
                        document.getElementById(`icon-input-${el.dataset.index}`).click(); 
                    }
                }
                else if (el.id === 'select-font-btn') { 
                    if (isHonorOrHuawei) {
                        document.getElementById('honor-font-file-btn').click();
                    } else {
                        document.getElementById('font-file-input').click(); 
                    }
                }
                else if (el.id === 'save-font-btn') { 
                    const fontFileInput = document.getElementById('font-file-input');
                    const fontUrlInput = document.getElementById('font-url-input');
                    
                    if (fontFileInput.files.length > 0) {
                        const fontFile = fontFileInput.files[0];
                        const fontUrl = URL.createObjectURL(fontFile);
                        await db.settings.put({ key: 'fontUrl', value: fontUrl });
                        fontUrlInput.value = '已上传字体文件';
                        await renderUI();
                        showUploadStatus('字体文件已保存！');
                    } else if (fontUrlInput.value && fontUrlInput.value !== '已上传字体文件') {
                        await db.settings.put({ key: 'fontUrl', value: fontUrlInput.value });
                        await renderUI();
                        showUploadStatus('字体URL已保存！');
                    } else {
                        showUploadStatus('请先选择字体文件或输入字体URL！');
                    }
                }
                else if (el.id === 'save-cover-size-btn') { const width = document.getElementById('cover-width-input').value, height = document.getElementById('cover-height-input').value; await db.settings.bulkPut([{ key: 'coverWidth', value: width }, { key: 'coverHeight', value: height }]); showUploadStatus('封面尺寸已保存！'); }
            });
            beautifyView.addEventListener('input', async (e) => {
                if (e.target.id === 'font-size-slider') {
                    const slider = e.target, value = slider.value;
                    document.getElementById('font-size-value').textContent = `${value}px`;
                    document.documentElement.style.setProperty('--global-font-size', `${value}px`);
                    await db.settings.put({ key: 'fontSize', value: value });
                }
            });
            
            // --- Playlist & Folder Logic ---

            async function renderPlaylist() {
                revokeURLs('playlist');
                const songContainer = document.getElementById('playlist-container'); 
                const folderGrid = document.getElementById('folders-grid');
                const folderList = document.getElementById('folders-list');
                const createFolderBtn = document.getElementById('create-folder-btn');
                const backBtn = document.getElementById('playlist-back-btn');
                const title = document.getElementById('playlist-view-title');

                if (currentFolderId === null) {
                    songContainer.style.display = 'none';
                    folderGrid.style.display = 'none';
                    folderList.style.display = 'block';
                    createFolderBtn.style.display = 'block';
                    backBtn.dataset.target = 'desktop-view';
                    title.textContent = '播放列表';

                    folderList.innerHTML = '';
                    
                    const allSongs = await db.songs.toArray();
                    const looseSongs = allSongs.filter(s => !s.folderId);
                    
                    if (looseSongs.length > 0) {
                        const li = document.createElement('li');
                        li.className = 'folder-list-item';
                        li.innerHTML = `
                            <div class="folder-list-icon">📁</div>
                            <div class="folder-list-info">
                                <div class="folder-list-name">未分类</div>
                                <div class="folder-list-count">${looseSongs.length} 首</div>
                            </div>
                        `;
                        li.onclick = () => { currentFolderId = 'uncategorized'; renderPlaylist(); };
                        folderList.appendChild(li);
                    }

                    const folders = await db.folders.toArray();
                    for (const folder of folders) {
                        const count = await db.songs.where('folderId').equals(folder.id.toString()).count();
                        const li = document.createElement('li');
                        li.className = 'folder-list-item';
                        li.innerHTML = `
                            <div class="folder-list-icon">📁</div>
                            <div class="folder-list-info">
                                <div class="folder-list-name">${folder.name}</div>
                                <div class="folder-list-count">${count} 首</div>
                            </div>
                            <!-- 修改3: 在重命名按钮旁边添加删除按钮 -->
                            <div class="folder-list-actions">
                                <button class="folder-rename-btn" data-id="${folder.id}" title="重命名">✏️</button>
                                <button class="folder-delete-list-btn" data-id="${folder.id}" title="删除文件夹">🗑️</button>
                            </div>
                        `;
                        
                        li.onclick = (e) => {
                            if(!e.target.classList.contains('folder-rename-btn') && !e.target.classList.contains('folder-delete-list-btn')) {
                                currentFolderId = folder.id.toString(); 
                                renderPlaylist();
                            }
                        };
                        
                        const renameBtn = li.querySelector('.folder-rename-btn');
                        renameBtn.onclick = async (e) => {
                            e.stopPropagation();
                            const newName = prompt("重命名文件夹:", folder.name);
                            if (newName && newName !== folder.name) {
                                await db.folders.update(folder.id, { name: newName });
                                renderPlaylist();
                            }
                        };
                        
                        // 修改3: 添加删除文件夹功能
                        const deleteBtn = li.querySelector('.folder-delete-list-btn');
                        deleteBtn.onclick = async (e) => {
                            e.stopPropagation();
                            if(confirm('确定删除此文件夹吗？里面的歌曲将变为未分类。')) {
                                const folderId = e.target.dataset.id;
                                await db.folders.delete(parseInt(folderId));
                                await db.songs.where('folderId').equals(folderId).modify({folderId: ''});
                                renderPlaylist();
                            }
                        };
                        
                        folderList.appendChild(li);
                    }

                } else {
                    songContainer.style.display = 'block';
                    folderGrid.style.display = 'none';
                    folderList.style.display = 'none';
                    createFolderBtn.style.display = 'none';
                    
                    let songs = [];
                    if (currentFolderId === 'uncategorized') {
                        title.textContent = '未分类';
                        const allSongs = await db.songs.toArray();
                        songs = allSongs.filter(s => !s.folderId);
                    } else {
                        const folder = await db.folders.get(parseInt(currentFolderId));
                        title.textContent = folder ? folder.name : '未知文件夹';
                        songs = await db.songs.where('folderId').equals(currentFolderId).toArray();
                    }

                    songContainer.innerHTML = '';
                    if (songs.length === 0) { songContainer.innerHTML = '<li style="padding: 20px; text-align: center; color: var(--text-secondary);">暂无歌曲...</li>'; return; }
                    
                    songs.forEach(song => { 
                        const li = document.createElement('li'); li.className = 'playlist-item'; 
                        let imageUrl = defaultCover; 
                        if (song.imageFile) { imageUrl = URL.createObjectURL(song.imageFile); tempObjectURLs.playlist.push(imageUrl); } 
                        li.innerHTML = `<img src="${imageUrl}" alt="${song.title}"><div class="song-info" data-song-id="${song.id}"><span class="song-title">${song.title}</span></div><div class="actions"><button class="edit-song-btn" data-song-id="${song.id}">✏️</button><button class="delete-song-btn" data-song-id="${song.id}">🗑️</button></div>`; 
                        songContainer.appendChild(li); 
                    });
                }
            }

            document.getElementById('create-folder-btn').addEventListener('click', async () => {
                const name = prompt("请输入文件夹名称：");
                if (name) {
                    await db.folders.add({ name: name });
                    renderPlaylist();
                    loadFoldersIntoSelect('song-folder-select');
                }
            });

            // 修改2: 简化文件夹加载函数，只保留"新建"选项
            async function loadFoldersIntoSelect(selectId, selectedValue = '', showNewOption = true) {
                const select = document.getElementById(selectId);
                const currentHTML = select.innerHTML;
                select.innerHTML = '<option value="">未分类</option>';
                
                const folders = await db.folders.toArray();
                folders.forEach(f => {
                    const option = document.createElement('option');
                    option.value = f.id;
                    option.textContent = f.name;
                    if(f.id.toString() === selectedValue) option.selected = true;
                    select.appendChild(option);
                });
                
                // 添加新建文件夹选项
                if (showNewOption && selectId === 'song-folder-select') {
                    const newOption = document.createElement('option');
                    newOption.value = 'new';
                    newOption.textContent = '新建';
                    // 修改2: 移除特殊样式，使用默认样式
                    select.appendChild(newOption);
                }
                
                // 如果是编辑界面，需要重新设置选中值
                if (selectedValue && selectedValue !== 'new') {
                    select.value = selectedValue;
                }
            }

            // 修改2: 监听文件夹选择变化
            document.getElementById('song-folder-select').addEventListener('change', function() {
                if (this.value === 'new') {
                    const folderName = prompt("请输入新文件夹名称：");
                    if (folderName) {
                        // 异步创建文件夹并更新下拉框
                        db.folders.add({ name: folderName }).then(async (id) => {
                            await loadFoldersIntoSelect('song-folder-select', id.toString());
                        });
                    } else {
                        this.value = '';
                    }
                }
            });

            // Playlist Item Actions
            document.getElementById('playlist-container').addEventListener('click', e => {
                const songInfo = e.target.closest('.song-info'), deleteBtn = e.target.closest('.delete-song-btn'), editBtn = e.target.closest('.edit-song-btn');
                if (songInfo) startPlayback(parseInt(songInfo.dataset.songId));
                if (deleteBtn) deleteSong(parseInt(deleteBtn.dataset.songId));
                if (editBtn) openEditView(parseInt(editBtn.dataset.songId));
            });
            async function deleteSong(id) { if (confirm('确定要删除这首歌曲吗？')) { await db.songs.delete(id); renderPlaylist(); } }
            
            document.querySelectorAll('input[name="audioSource"]').forEach(radio => {
                radio.addEventListener('change', () => {
                    document.getElementById('audio-file-group').classList.toggle('hidden-input', radio.value !== 'file');
                    document.getElementById('audio-url-group').classList.toggle('hidden-input', radio.value !== 'url');
                });
            });

            // VTT Import Logic
            const vttInput = document.getElementById('vtt-import-input');
            let vttTargetId = '';
            document.querySelectorAll('.import-vtt-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    vttTargetId = e.target.dataset.target;
                    // 如果是荣耀手机，使用特殊方法
                    if (isHonorOrHuawei) {
                        const tempInput = document.createElement('input');
                        tempInput.type = 'file';
                        tempInput.accept = '.vtt,.srt,.lrc,.txt';
                        tempInput.style.display = 'none';
                        
                        tempInput.addEventListener('change', function() {
                            if (this.files && this.files.length > 0) {
                                const file = this.files[0];
                                const reader = new FileReader();
                                reader.onload = (ev) => {
                                    const content = ev.target.result;
                                    const target = document.getElementById(vttTargetId);
                                    if (target) {
                                        const fileName = file.name.toLowerCase();
                                        let parsedLyrics = content;
                                        
                                        if (fileName.endsWith('.srt')) {
                                            parsedLyrics = convertSrtToVtt(content);
                                        } else if (fileName.endsWith('.lrc')) {
                                            parsedLyrics = content;
                                        } else if (fileName.endsWith('.vtt')) {
                                            parsedLyrics = content;
                                        } else {
                                            if (content.includes('-->') || content.includes('WEBVTT')) {
                                                parsedLyrics = content;
                                            } else if (content.includes('\n\n') && content.match(/\d+\s*\n\d{2}:\d{2}:\d{2},\d{3}/)) {
                                                parsedLyrics = convertSrtToVtt(content);
                                            } else if (content.includes('[') && content.includes(']')) {
                                                parsedLyrics = content;
                                            }
                                        }
                                        
                                        target.value = parsedLyrics;
                                        showUploadStatus(`已导入歌词文件: ${file.name}`);
                                    }
                                };
                                reader.readAsText(file, 'utf-8');
                            }
                            document.body.removeChild(tempInput);
                        });
                        
                        document.body.appendChild(tempInput);
                        tempInput.click();
                    } else {
                        vttInput.click();
                    }
                });
            });

            vttInput.addEventListener('change', async (e) => {
                const file = e.target.files[0];
                if (!file) return;
                
                const reader = new FileReader();
                reader.onload = (ev) => {
                    const content = ev.target.result;
                    const target = document.getElementById(vttTargetId);
                    if (target) {
                        const fileName = file.name.toLowerCase();
                        let parsedLyrics = content;
                        
                        if (fileName.endsWith('.srt')) {
                            parsedLyrics = convertSrtToVtt(content);
                        } else if (fileName.endsWith('.lrc')) {
                            parsedLyrics = content; // LRC格式保持原样
                        } else if (fileName.endsWith('.vtt')) {
                            parsedLyrics = content;
                        } else {
                            if (content.includes('-->') || content.includes('WEBVTT')) {
                                parsedLyrics = content;
                            } else if (content.includes('\n\n') && content.match(/\d+\s*\n\d{2}:\d{2}:\d{2},\d{3}/)) {
                                parsedLyrics = convertSrtToVtt(content);
                            } else if (content.includes('[') && content.includes(']')) {
                                // LRC格式保持原样
                                parsedLyrics = content;
                            }
                        }
                        
                        target.value = parsedLyrics;
                    }
                };
                reader.readAsText(file, 'utf-8');
                e.target.value = ''; // reset
            });
            
            function convertSrtToVtt(srtContent) {
                let vttContent = 'WEBVTT\n\n';
                vttContent += srtContent
                    .replace(/(\d{2}:\d{2}:\d{2}),(\d{3})/g, '$1.$2')
                    .replace(/\r\n/g, '\n')
                    .replace(/\n{3,}/g, '\n\n');
                return vttContent;
            }
            
            // 修改1: 增强LRC解析函数
            function parseLrcToLyrics(lrcContent) {
                const lines = lrcContent.split('\n');
                const lyrics = [];
                
                // 首先收集所有时间标签和歌词
                const rawLyrics = [];
                
                for (let i = 0; i < lines.length; i++) {
                    const line = lines[i].trim();
                    if (!line) continue;
                    
                    // 匹配LRC时间标签: [mm:ss.xx] 或 [mm:ss]
                    const timeMatch = line.match(/\[(\d{2}):(\d{2})(?:\.(\d{2,3}))?\](.*)/);
                    if (timeMatch) {
                        const minutes = timeMatch[1];
                        const seconds = timeMatch[2];
                        const milliseconds = timeMatch[3] ? timeMatch[3].padEnd(3, '0') : '000';
                        const text = timeMatch[4].trim();
                        
                        if (text) {
                            const startTime = parseFloat(minutes) * 60 + parseFloat(seconds) + parseFloat(milliseconds) / 1000;
                            rawLyrics.push({ startTime, text });
                        }
                    }
                }
                
                // 按时间排序
                rawLyrics.sort((a, b) => a.startTime - b.startTime);
                
                // 为每句歌词计算结束时间（下一句的开始时间）
                for (let i = 0; i < rawLyrics.length; i++) {
                    const current = rawLyrics[i];
                    const next = rawLyrics[i + 1];
                    
                    lyrics.push({
                        startTime: current.startTime,
                        endTime: next ? next.startTime : current.startTime + 5, // 最后一句默认显示5秒
                        text: current.text
                    });
                }
                
                return lyrics;
            }
            
            // 修改1: 增强parseLyrics函数以支持LRC格式
            function parseLyrics(lyricText) { 
                currentLyrics = []; 
                
                // 检查是否是VTT格式
                if (lyricText.includes('WEBVTT') || lyricText.includes('-->')) {
                    const lines = lyricText.split('\n');
                    const regex = /(\d{2}:\d{2}:\d{2}\.\d{3}|\d{2}:\d{2}\.\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2}\.\d{3}|\d{2}:\d{2}\.\d{3})/;
                    
                    for (let i = 0; i < lines.length; i++) {
                        const match = lines[i].trim().match(regex);
                        if (match && i + 1 < lines.length) {
                            const textLine = lines[i + 1].trim();
                            if (textLine && !textLine.includes('-->')) {
                                currentLyrics.push({ 
                                    startTime: parseTime(match[1]), 
                                    endTime: parseTime(match[2]), 
                                    text: textLine 
                                });
                                i++;
                            }
                        }
                    }
                } 
                // 检查是否是LRC格式（包含时间标签 [mm:ss.xx]）
                else if (lyricText.includes('[') && lyricText.match(/\[\d{2}:\d{2}(?:\.\d{2,3})?\]/)) {
                    currentLyrics = parseLrcToLyrics(lyricText);
                }
                else {
                    // 尝试其他格式
                    const lines = lyricText.split('\n');
                    for (const line of lines) {
                        const trimmed = line.trim();
                        if (trimmed) {
                            const srtMatch = trimmed.match(/(\d{2}:\d{2}:\d{2},\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2},\d{3})/);
                            if (srtMatch) {
                                continue;
                            }
                            
                            if (!trimmed.match(/\d+\s*$/) && !trimmed.match(/^(\d{2}:\d{2}:\d{2}|WEBVTT)/)) {
                                currentLyrics.push({ 
                                    startTime: currentLyrics.length * 3,
                                    endTime: (currentLyrics.length + 1) * 3,
                                    text: trimmed 
                                });
                            }
                        }
                    }
                }
                
                // 如果没有解析到歌词，添加一个默认项
                if (currentLyrics.length === 0 && lyricText.trim()) {
                    currentLyrics.push({ 
                        startTime: 0, 
                        endTime: 60, 
                        text: lyricText.split('\n')[0].trim() || '...' 
                    });
                }
                
                // 修改1: 确保歌词按时间排序
                currentLyrics.sort((a, b) => a.startTime - b.startTime);
                
                console.log('解析后的歌词:', currentLyrics);
            }
            
            function parseTime(t) { 
                const parts = t.split(':');
                if (parts.length === 3) {
                    return (parseInt(parts[0], 10) * 3600) + (parseInt(parts[1], 10) * 60) + parseFloat(parts[2]);
                } else if (parts.length === 2) {
                    return (parseInt(parts[0], 10) * 60) + parseFloat(parts[1]);
                }
                return 0;
            }
            
            function renderFullLyrics() {
                const list = document.getElementById('full-lyrics-list');
                list.innerHTML = '';
                currentLyrics.forEach((line, index) => {
                    const p = document.createElement('p');
                    p.className = 'full-lyric-line';
                    p.textContent = line.text;
                    p.dataset.startTime = line.startTime;
                    p.dataset.index = index;
                    p.onclick = () => { document.getElementById('audio-player').currentTime = line.startTime; };
                    list.appendChild(p);
                });
            }

            // 修改1: 增强歌词显示逻辑，支持LRC格式的"保持显示上一句"功能
            function updatePlayerState() {
                const audio = document.getElementById('audio-player');
                const currentTime = audio.currentTime;
                
                // 修改1: 查找当前应该显示的歌词
                let activeIndex = -1;
                
                // 遍历歌词，找到最后一个开始时间小于等于当前时间的歌词
                for (let i = 0; i < currentLyrics.length; i++) {
                    if (currentTime >= currentLyrics[i].startTime) {
                        // 如果这是最后一句，或者当前时间小于下一句的开始时间
                        if (i === currentLyrics.length - 1 || currentTime < currentLyrics[i + 1].startTime) {
                            activeIndex = i;
                        }
                    }
                }
                
                // 更新歌词气泡
                const bubbleEl = document.getElementById('lyric-display');
                if (activeIndex !== -1) {
                    bubbleEl.textContent = currentLyrics[activeIndex].text;
                } else {
                    bubbleEl.textContent = '...';
                }

                // 更新全屏歌词列表
                const listLines = document.querySelectorAll('.full-lyric-line');
                listLines.forEach(l => l.classList.remove('active'));
                if (activeIndex !== -1) {
                    const activeLine = listLines[activeIndex];
                    if (activeLine) {
                        activeLine.classList.add('active');
                        activeLine.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }

                const now = Date.now();
                if (now - lastSaveTime > 3000) {
                    const currentSongId = parseInt(document.getElementById('player-view').dataset.currentSongId);
                    if (currentSongId && !audio.paused) { db.settings.put({ key: 'lastPlaybackState', value: { songId: currentSongId, currentTime: audio.currentTime } }); }
                    lastSaveTime = now;
                }
            }

            document.getElementById('audio-file-input').addEventListener('change', function(e) {
                if (this.files.length > 0) {
                    const file = this.files[0];
                    const fileName = file.name;
                    const title = fileName.replace(/\.[^/.]+$/, "");
                    const titleInput = document.getElementById('song-title-input');
                    if (!titleInput.value || titleInput.value === '') {
                        titleInput.value = title;
                    }
                }
            });

            document.getElementById('save-preset-btn').addEventListener('click', async () => {
                const title = document.getElementById('song-title-input').value;
                const lyricsText = document.getElementById('lyric-input').value;
                const folderId = document.getElementById('song-folder-select').value;
                const audioSourceType = document.querySelector('input[name="audioSource"]:checked').value;
                let audioSource;
                if (audioSourceType === 'file') {
                    audioSource = document.getElementById('audio-file-input').files[0];
                    if (!audioSource) { showUploadStatus('请选择一个音频文件！'); return; }
                } else {
                    audioSource = document.getElementById('audio-url-input').value.trim();
                    if (!audioSource) { showUploadStatus('请输入音频URL！'); return; }
                }
                if (!title) { showUploadStatus('请填写歌曲标题！'); return; }
                
                showUploadStatus('正在保存歌曲...');
                try {
                    await db.songs.add({ title, lyrics: lyricsText, audioType: audioSourceType, audioSource, imageFile: croppedImageBlob, folderId: folderId });
                    showUploadStatus('保存成功！');
                    croppedImageBlob = null; document.getElementById('add-image-preview').style.display = 'none';
                    document.getElementById('song-title-input').value = ''; document.getElementById('lyric-input').value = '';
                    document.getElementById('audio-file-input').value = ''; document.getElementById('audio-url-input').value = '';
                    document.getElementById('image-file-input').value = '';
                    navigateTo('playlist-view'); 
                    currentFolderId = folderId || 'uncategorized';
                    renderPlaylist();
                } catch (error) {
                    console.error('保存失败:', error);
                    showUploadStatus('保存失败: ' + error.message);
                }
            });

            async function openEditView(id) {
                const song = await db.songs.get(id); if (!song) return;
                const form = document.getElementById('edit-song-form'); form.dataset.songId = id;
                document.getElementById('edit-view-title').textContent = `编辑: ${song.title}`;
                document.getElementById('edit-song-title-input').value = song.title; document.getElementById('edit-lyric-input').value = song.lyrics;
                document.getElementById('edit-image-preview').src = song.imageFile ? URL.createObjectURL(song.imageFile) : '';
                
                await loadFoldersIntoSelect('edit-song-folder-select', song.folderId, false);
                
                navigateTo('edit-song-view');
            }
            document.getElementById('edit-song-form').addEventListener('submit', async e => {
                e.preventDefault(); const form = e.target, id = parseInt(form.dataset.songId);
                const updates = { 
                    title: document.getElementById('edit-song-title-input').value, 
                    lyrics: document.getElementById('edit-lyric-input').value,
                    folderId: document.getElementById('edit-song-folder-select').value
                };
                const audioFile = document.getElementById('edit-audio-file-input').files[0];
                if (audioFile) { updates.audioType = 'file'; updates.audioSource = audioFile; }
                if (croppedImageBlob) updates.imageFile = croppedImageBlob;
                showUploadStatus('正在更新歌曲...');
                try {
                    await db.songs.update(id, updates);
                    showUploadStatus('更新成功！');
                    croppedImageBlob = null; form.reset(); 
                    navigateTo('playlist-view'); 
                    currentFolderId = updates.folderId || 'uncategorized';
                    renderPlaylist();
                } catch (error) {
                    console.error('更新失败:', error);
                    showUploadStatus('更新失败: ' + error.message);
                }
            });

            async function startPlayback(id) {
                revokeURLs('player');
                const playerView = document.getElementById('player-view');
                playerView.dataset.currentSongId = id;
                const [song, globalPlayerBg, coverWidth, coverHeight, lastState, playerLayout] = await Promise.all([
                    db.songs.get(id), 
                    db.settings.get('playerBg'), 
                    db.settings.get('coverWidth'), 
                    db.settings.get('coverHeight'), 
                    db.settings.get('lastPlaybackState'),
                    db.settings.get('playerLayout')
                ]);
                if (!song) return;
                let startTime = 0;
                if (lastState && lastState.value.songId === id) startTime = lastState.value.currentTime;
                if (song.backgroundFile) { const url = URL.createObjectURL(song.backgroundFile); tempObjectURLs.player.push(url); playerView.style.backgroundImage = `url(${url})`; } 
                else if (globalPlayerBg && globalPlayerBg.value) { const url = URL.createObjectURL(globalPlayerBg.value); tempObjectURLs.player.push(url); playerView.style.backgroundImage = `url(${url})`; } 
                else { playerView.style.backgroundImage = ''; }
                const imageUrl = song.imageFile ? URL.createObjectURL(song.imageFile) : defaultCover;
                tempObjectURLs.player.push(imageUrl);
                const audioPlayer = document.getElementById('audio-player');
                const downloadLink = document.getElementById('download-song-link');

                const songTitleBox = document.getElementById('song-title-box');
                let displayTitle = song.title;
                if (song.audioType === 'file' && song.audioSource && song.audioSource.name) {
                    displayTitle = song.audioSource.name;
                }
                songTitleBox.textContent = displayTitle;

                if (song.audioType === 'url') { 
                    audioPlayer.src = song.audioSource;
                    downloadLink.href = song.audioSource;
                    downloadLink.target = '_blank';
                    downloadLink.download = '';
                } else { 
                    const audioUrl = URL.createObjectURL(song.audioSource || song.audioFile); 
                    tempObjectURLs.player.push(audioUrl); 
                    audioPlayer.src = audioUrl;
                    downloadLink.href = audioUrl;
                    downloadLink.target = '_self';
                    const audioFile = song.audioSource || song.audioFile;
                    downloadLink.download = audioFile.name || `${song.title}.mp3`;
                }
                const albumArt = document.getElementById('album-art');
                const lyricBubble = document.querySelector('.lyric-bubble');
                const w = coverWidth?.value, h = coverHeight?.value;
                albumArt.style.width = w ? `${w}px` : '70vw';
                albumArt.style.height = h ? `${h}px` : '70vw';
                albumArt.style.maxWidth = w ? `${w}px` : '300px';
                albumArt.style.maxHeight = h ? `${h}px` : '300px';
                albumArt.src = imageUrl;

                if (playerLayout && playerLayout.value) {
                    const l = playerLayout.value;
                    if(l.art) {
                        albumArt.style.transform = `translate3d(${l.art.x}px, ${l.art.y}px, 0)`;
                        albumArt.dataset.dragX = l.art.x;
                        albumArt.dataset.dragY = l.art.y;
                    } else {
                        albumArt.style.transform = ''; delete albumArt.dataset.dragX; delete albumArt.dataset.dragY;
                    }
                    if(l.lyric) {
                        lyricBubble.style.transform = `translateX(-50%) translate3d(${l.lyric.x}px, ${l.lyric.y}px, 0)`;
                        lyricBubble.dataset.dragX = l.lyric.x;
                        lyricBubble.dataset.dragY = l.lyric.y;
                    } else {
                         lyricBubble.style.transform = 'translateX(-50%)'; delete lyricBubble.dataset.dragX; delete lyricBubble.dataset.dragY;
                    }
                    if(l.title) {
                        songTitleBox.style.transform = `translateX(-50%) translate3d(${l.title.x}px, ${l.title.y}px, 0)`;
                        songTitleBox.dataset.dragX = l.title.x;
                        songTitleBox.dataset.dragY = l.title.y;
                    } else {
                        songTitleBox.style.transform = 'translateX(-50%)'; delete songTitleBox.dataset.dragX; delete songTitleBox.dataset.dragY;
                    }
                } else {
                    albumArt.style.transform = '';
                    delete albumArt.dataset.dragX;
                    delete albumArt.dataset.dragY;
                    lyricBubble.style.transform = 'translateX(-50%)';
                    delete lyricBubble.dataset.dragX;
                    delete lyricBubble.dataset.dragY;
                    songTitleBox.style.transform = 'translateX(-50%)';
                    delete songTitleBox.dataset.dragX;
                    delete songTitleBox.dataset.dragY;
                }

                audioPlayer.onloadedmetadata = () => { if (startTime > 0 && startTime < audioPlayer.duration) audioPlayer.currentTime = startTime; audioPlayer.play(); };
                parseLyrics(song.lyrics); 
                renderFullLyrics();
                navigateTo('player-view');
            }
            
            const audioPlayer = document.getElementById('audio-player');
            audioPlayer.addEventListener('timeupdate', () => {
                updatePlayerState();
                const progressBar = document.getElementById('progress-bar');
                if (!isNaN(audioPlayer.duration)) {
                    progressBar.value = audioPlayer.currentTime;
                    document.getElementById('current-time').textContent = formatTime(audioPlayer.currentTime);
                }
            });
            audioPlayer.addEventListener('loadedmetadata', () => {
                const progressBar = document.getElementById('progress-bar');
                progressBar.max = audioPlayer.duration;
                document.getElementById('duration-time').textContent = formatTime(audioPlayer.duration);
            });
            audioPlayer.addEventListener('play', () => { document.getElementById('play-pause-btn').innerHTML = '❚❚'; });
            audioPlayer.addEventListener('pause', () => { document.getElementById('play-pause-btn').innerHTML = '▶'; });
            
            async function getSiblingSongId(currentId, direction) {
                const currentSong = await db.songs.get(currentId);
                if(!currentSong) return null;
                
                let songsInContext = [];
                if(currentSong.folderId) {
                    songsInContext = await db.songs.where('folderId').equals(currentSong.folderId).toArray();
                } else {
                    const allSongs = await db.songs.toArray();
                    songsInContext = allSongs.filter(s => !s.folderId);
                }
                
                songsInContext.sort((a, b) => a.id - b.id);
                
                const currentIndex = songsInContext.findIndex(s => s.id === currentId);
                if(currentIndex === -1) return null;
                
                let nextIndex;
                if(direction === 'next') {
                    nextIndex = currentIndex + 1;
                    if(nextIndex >= songsInContext.length) nextIndex = 0;
                } else {
                    nextIndex = currentIndex - 1;
                    if(nextIndex < 0) nextIndex = songsInContext.length - 1;
                }
                
                return songsInContext[nextIndex].id;
            }

            audioPlayer.addEventListener('ended', async () => { 
                db.settings.delete('lastPlaybackState');
                if (stopAtSongEnd) {
                    audioPlayer.pause();
                    stopAtSongEnd = false;
                    updateSleepTimerUI();
                    return;
                }
                if(isContinuousPlay) {
                    const currentId = parseInt(document.getElementById('player-view').dataset.currentSongId);
                    const nextId = await getSiblingSongId(currentId, 'next');
                    if(nextId) startPlayback(nextId);
                }
            });

            function formatTime(seconds) {
                const min = Math.floor(seconds / 60);
                const sec = Math.floor(seconds % 60);
                return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
            }

            function setupCustomControls() {
                const playPauseBtn = document.getElementById('play-pause-btn');
                const prevBtn = document.getElementById('prev-btn');
                const nextBtn = document.getElementById('next-btn');
                const progressBar = document.getElementById('progress-bar');
                const playerSettingsBtn = document.getElementById('player-settings-btn');
                const playerSettingsMenu = document.getElementById('player-settings-menu');
                const playbackSpeedSelect = document.getElementById('playback-speed');
                const continuousPlayBtn = document.getElementById('toggle-continuous-play');
                
                const fullLyricsBtn = document.getElementById('full-lyrics-btn');
                const fullLyricsModal = document.getElementById('full-lyrics-modal');
                const closeLyricsBtn = document.querySelector('.close-lyrics-btn');
                
                const resetBgBtn = document.getElementById('reset-bg-btn');

                playPauseBtn.addEventListener('click', () => {
                    if (audioPlayer.paused) { audioPlayer.play(); } else { audioPlayer.pause(); }
                });
                
                prevBtn.addEventListener('click', async () => {
                    const currentId = parseInt(document.getElementById('player-view').dataset.currentSongId);
                    const prevId = await getSiblingSongId(currentId, 'prev');
                    if(prevId) startPlayback(prevId);
                });
                
                nextBtn.addEventListener('click', async () => {
                    const currentId = parseInt(document.getElementById('player-view').dataset.currentSongId);
                    const nextId = await getSiblingSongId(currentId, 'next');
                    if(nextId) startPlayback(nextId);
                });

                progressBar.addEventListener('input', () => { audioPlayer.currentTime = progressBar.value; });

                playerSettingsBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    playerSettingsMenu.classList.toggle('visible');
                });
                document.addEventListener('click', (e) => {
                    if (!playerSettingsMenu.contains(e.target) && e.target !== playerSettingsBtn) {
                        playerSettingsMenu.classList.remove('visible');
                    }
                });
                playbackSpeedSelect.addEventListener('change', (e) => {
                    audioPlayer.playbackRate = parseFloat(e.target.value);
                });
                
                continuousPlayBtn.addEventListener('click', async (e) => {
                    e.preventDefault();
                    isContinuousPlay = !isContinuousPlay;
                    await db.settings.put({key: 'continuousPlay', value: isContinuousPlay});
                    updateContinuousPlayUI();
                });

                fullLyricsBtn.addEventListener('click', () => {
                    fullLyricsModal.classList.add('active');
                });
                closeLyricsBtn.addEventListener('click', () => {
                    fullLyricsModal.classList.remove('active');
                });
                
                resetBgBtn.addEventListener('click', async () => {
                    const playerView = document.getElementById('player-view');
                    const currentSongId = parseInt(playerView.dataset.currentSongId);
                    
                    if (currentSongId) {
                        await db.songs.update(currentSongId, { backgroundFile: null });
                        playerView.style.backgroundImage = '';
                        showUploadStatus('背景已重置');
                    }
                });
                
                const resetBtn = document.getElementById('reset-positions-btn');
                if(resetBtn) {
                    resetBtn.addEventListener('click', async () => {
                        if(confirm('确定要重置播放界面的所有元素（封面、歌词、歌名）位置吗？')) {
                            await db.settings.delete('playerLayout');
                            showUploadStatus('位置已重置，下次播放时生效。');
                        }
                    });
                }
            }
            
            function updateContinuousPlayUI() {
                const btn = document.getElementById('toggle-continuous-play');
                btn.textContent = `连续播放: ${isContinuousPlay ? '开启 ✅' : '关闭'}`;
            }

            function setupDraggableElement(element, container) {
                let isDragging = false, startEventX, startEventY, startDragX, startDragY;

                const dragStart = (e) => {
                    if (e.target.closest(`#${element.id}`)) {
                        isDragging = true;
                        element.classList.add('dragging');
                        const event = e.type === 'touchstart' ? e.touches[0] : e;
                        startEventX = event.clientX;
                        startEventY = event.clientY;
                        
                        startDragX = parseFloat(element.dataset.dragX || 0);
                        startDragY = parseFloat(element.dataset.dragY || 0);

                        container.addEventListener('mousemove', drag);
                        container.addEventListener('touchmove', drag, { passive: false });
                        window.addEventListener('mouseup', dragEnd);
                        window.addEventListener('touchend', dragEnd);
                    }
                };

                const drag = (e) => {
                    if (!isDragging) return;
                    e.preventDefault();
                    const event = e.type === 'touchmove' ? e.touches[0] : e;
                    const deltaX = event.clientX - startEventX;
                    const deltaY = event.clientY - startEventY;
                    let newX, newY;

                    newX = startDragX + deltaX;
                    newY = startDragY + deltaY;
                    
                    let transformString = `translate3d(${newX}px, ${newY}px, 0)`;
                    
                    if (element.id === 'lyric-bubble' || element.id === 'song-title-box') {
                         transformString = `translateX(-50%) ${transformString}`;
                    }
                    element.style.transform = transformString;
                };

                const dragEnd = async (e) => {
                    if (isDragging) {
                        isDragging = false;
                        element.classList.remove('dragging');
                        
                        const event = e.type === 'touchend' ? (e.changedTouches[0] || e) : e;
                        const deltaX = event.clientX - startEventX;
                        const deltaY = event.clientY - startEventY;

                        const finalX = startDragX + deltaX;
                        const finalY = startDragY + deltaY;
                        
                        element.dataset.dragX = finalX;
                        element.dataset.dragY = finalY;

                        container.removeEventListener('mousemove', drag);
                        container.removeEventListener('touchmove', drag);
                        window.removeEventListener('mouseup', dragEnd);
                        window.removeEventListener('touchend', dragEnd);

                        const albumArt = document.getElementById('album-art');
                        const lyricBubble = document.getElementById('lyric-bubble');
                        const songTitleBox = document.getElementById('song-title-box');

                        const layout = {
                            art: { x: parseFloat(albumArt.dataset.dragX || 0), y: parseFloat(albumArt.dataset.dragY || 0) },
                            lyric: { x: parseFloat(lyricBubble.dataset.dragX || 0), y: parseFloat(lyricBubble.dataset.dragY || 0) },
                            title: { x: parseFloat(songTitleBox.dataset.dragX || 0), y: parseFloat(songTitleBox.dataset.dragY || 0) }
                        };
                        await db.settings.put({ key: 'playerLayout', value: layout });
                    }
                };

                container.addEventListener('mousedown', dragStart);
                container.addEventListener('touchstart', dragStart, { passive: false });
            }
            
            function updateSleepTimerUI() {
                const settingsBtn = document.getElementById('player-settings-btn');
                if (sleepTimerId || stopAtSongEnd) {
                    settingsBtn.textContent = '⏰';
                } else {
                    settingsBtn.textContent = '⋮';
                }
            }

            function setupSleepTimer() {
                const menu = document.getElementById('player-settings-menu');
                menu.addEventListener('click', (e) => {
                    const target = e.target.closest('[data-time]');
                    if (!target) return;
                    
                    e.preventDefault();
                    clearTimeout(sleepTimerId);
                    sleepTimerId = null;
                    stopAtSongEnd = false;

                    const time = parseInt(target.dataset.time, 10);
                    if (time > 0) {
                        sleepTimerId = setTimeout(() => {
                            audioPlayer.pause();
                            sleepTimerId = null;
                            updateSleepTimerUI();
                        }, time * 60 * 1000);
                    } else if (time === -1) {
                        stopAtSongEnd = true;
                    }
                    
                    updateSleepTimerUI();
                    menu.classList.remove('visible');
                });
            }

            function setupColorPicker() {
                const picker = document.getElementById('color-picker'), toggleBtn = document.getElementById('toggle-color-picker-btn');
                const colors = ['#FFFFFF', '#1DB954', '#FFC107', 'rgba(255,165,0,1)', 'rgba(0,191,255,1)', '#E91E63', '#9C27B0', 'rgba(135,206,250,1)'];
                picker.innerHTML = '';
                colors.forEach(color => { const swatch = document.createElement('div'); swatch.className = 'color-swatch'; swatch.style.backgroundColor = color; swatch.addEventListener('click', async () => { document.documentElement.style.setProperty('--lyric-color', color); await db.settings.put({ key: 'lyricColor', value: color }); picker.classList.remove('visible'); }); picker.appendChild(swatch); });
                toggleBtn.addEventListener('click', e => { e.stopPropagation(); picker.classList.toggle('visible'); });
                document.addEventListener('click', e => { if (!picker.contains(e.target) && e.target !== toggleBtn) picker.classList.remove('visible'); });
            }
            
            document.getElementById('export-btn').addEventListener('click', async () => {
                const exportBtn = document.getElementById('export-btn');
                try {
                    exportBtn.textContent = '正在打包...'; exportBtn.disabled = true;
                    showUploadStatus('正在导出数据...');
                    const zip = new JSZip();
                    const songs = await db.songs.toArray();
                    const settings = await db.settings.toArray();
                    const folders = await db.folders.toArray();
                    
                    const filesFolder = zip.folder('files');
                    const metadata = { songs: [], settings: [], folders: folders };

                    for (const song of songs) {
                        const songMeta = { ...song };
                        if (song.audioType === 'file' || (!song.audioType && song.audioFile)) {
                            const source = song.audioSource || song.audioFile;
                            if(source) {
                                const fileName = `${song.id}_audio.${source.name.split('.').pop()}`;
                                filesFolder.file(fileName, source);
                                songMeta.audioSource = fileName;
                            }
                        }
                        if (song.imageFile) { const fileExt = song.imageFile.type === 'image/gif' ? 'gif' : 'jpg'; const fileName = `${song.id}_cover.${fileExt}`; filesFolder.file(fileName, song.imageFile); songMeta.imageFile = fileName; }
                        if (song.backgroundFile) { const fileName = `${song.id}_bg.jpg`; filesFolder.file(fileName, song.backgroundFile); songMeta.backgroundFile = fileName; }
                        delete songMeta.audioFile;
                        metadata.songs.push(songMeta);
                    }

                    for (const setting of settings) {
                        const settingMeta = { ...setting };
                        if (setting.value instanceof Blob) {
                            const fileName = `${setting.key}.jpg`;
                            filesFolder.file(fileName, setting.value);
                            settingMeta.value = fileName;
                        }
                        metadata.settings.push(settingMeta);
                    }

                    zip.file('metadata.json', JSON.stringify(metadata));
                    const content = await zip.generateAsync({type:"blob"});
                    const url = URL.createObjectURL(content);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `music-os-backup-${new Date().toISOString().slice(0, 10)}.zip`;
                    a.click();
                    URL.revokeObjectURL(url);
                    showUploadStatus('导出成功！');
                } catch (e) {
                    showUploadStatus('导出失败: ' + e);
                } finally {
                    exportBtn.textContent = '导出全部数据'; exportBtn.disabled = false;
                }
            });

            const importFileInput = document.getElementById('import-file-input');
            const honorImportInput = document.getElementById('honor-import-file-input');
            
            // 荣耀手机使用专用导入按钮
            if (isHonorOrHuawei) {
                // honorImportInput的change事件已经在initHonorFileUpload中处理
            } else {
                document.getElementById('import-btn').addEventListener('click', () => importFileInput.click());
            }
            
            importFileInput.addEventListener('change', handleImportFile);
            honorImportInput.addEventListener('change', function() {
                if (this.files && this.files.length > 0) {
                    const file = this.files[0];
                    const dataTransfer = new DataTransfer();
                    dataTransfer.items.add(file);
                    importFileInput.files = dataTransfer.files;
                    
                    const event = new Event('change', { bubbles: true });
                    importFileInput.dispatchEvent(event);
                }
            });
            
            async function handleImportFile(e) {
                const file = e.target.files[0];
                const importBtn = document.getElementById('import-btn');
                if (!file || !confirm('确定导入吗？这将覆盖所有现有数据！')) return;
                
                try {
                    if (importBtn) {
                        importBtn.textContent = "正在导入..."; 
                        importBtn.disabled = true;
                    }
                    showUploadStatus('正在导入数据...');
                    const zip = await JSZip.loadAsync(file);
                    const metadataFile = zip.file('metadata.json');
                    if (!metadataFile) throw new Error('备份文件格式不正确 (缺少 metadata.json)');
                    const metadata = JSON.parse(await metadataFile.async('string'));
                    
                    const filesFolder = zip.folder('files');
                    
                    for (const songMeta of metadata.songs) {
                        if (songMeta.audioType === 'file' && songMeta.audioSource) songMeta.audioSource = await filesFolder.file(songMeta.audioSource).async('blob');
                        if (songMeta.imageFile) songMeta.imageFile = await filesFolder.file(songMeta.imageFile).async('blob');
                        if (songMeta.backgroundFile) songMeta.backgroundFile = await filesFolder.file(songMeta.backgroundFile).async('blob');
                    }
                    for (const settingMeta of metadata.settings) {
                        if (typeof settingMeta.value === 'string' && filesFolder.file(settingMeta.value)) {
                            settingMeta.value = await filesFolder.file(settingMeta.value).async('blob');
                        }
                    }

                    await db.transaction('rw', db.songs, db.settings, db.folders, async () => {
                        await db.songs.clear();
                        await db.settings.clear();
                        await db.folders.clear();
                        await db.songs.bulkPut(metadata.songs);
                        await db.settings.bulkPut(metadata.settings);
                        if(metadata.folders) await db.folders.bulkPut(metadata.folders);
                    });

                    showUploadStatus('导入成功！应用将重新加载。');
                    setTimeout(() => {
                        location.reload();
                    }, 2000);
                } catch (err) {
                    console.error('导入失败:', err);
                    showUploadStatus('导入失败！' + err.message);
                } finally {
                    if (importBtn) {
                        importBtn.textContent = "导入备份文件 (覆盖)"; 
                        importBtn.disabled = false;
                    }
                }
            }
            
            function handleImageSelection(file, previewElementId) {
                if (file.type === 'image/gif') {
                    croppedImageBlob = file;
                    const preview = document.getElementById(previewElementId);
                    preview.src = URL.createObjectURL(file);
                    preview.style.display = 'block';
                    if (cropper) cropper.destroy();
                } else {
                    initCropper(file, previewElementId);
                }
            }

            async function initCropper(file, previewElementId) {
                const modal = document.getElementById('crop-modal-overlay'), image = document.getElementById('cropper-image');
                const [w, h] = await Promise.all([db.settings.get('coverWidth'), db.settings.get('coverHeight')]);
                const ratio = (w?.value && h?.value) ? w.value / h.value : 1;
                image.src = URL.createObjectURL(file); modal.style.display = 'flex';
                if (cropper) cropper.destroy();
                cropper = new Cropper(image, { aspectRatio: ratio, viewMode: 1 });
                document.getElementById('confirm-crop-btn').onclick = () => { cropper.getCroppedCanvas().toBlob(blob => { croppedImageBlob = blob; const preview = document.getElementById(previewElementId); preview.src = URL.createObjectURL(blob); preview.style.display = 'block'; modal.style.display = 'none'; }); };
                document.getElementById('cancel-crop-btn').onclick = () => { modal.style.display = 'none'; cropper.destroy(); };
            }

            document.getElementById('image-file-input').addEventListener('change', e => { if (e.target.files[0]) handleImageSelection(e.target.files[0], 'add-image-preview'); });
            document.getElementById('edit-image-file-input').addEventListener('change', e => { if (e.target.files[0]) handleImageSelection(e.target.files[0], 'edit-image-preview'); });

            const setSongBgBtn = document.getElementById('set-song-bg-btn');
            const songBgInput = document.getElementById('song-bg-input');
            setSongBgBtn.addEventListener('click', () => {
                // 如果是荣耀手机，使用特殊方法
                if (isHonorOrHuawei) {
                    const tempInput = document.createElement('input');
                    tempInput.type = 'file';
                    tempInput.accept = 'image/*';
                    tempInput.style.display = 'none';
                    
                    tempInput.addEventListener('change', function() {
                        if (this.files && this.files.length > 0) {
                            const file = this.files[0];
                            const playerView = document.getElementById('player-view');
                            const currentSongId = parseInt(playerView.dataset.currentSongId); 
                            if (!currentSongId) return;
                            
                            const objectURL = URL.createObjectURL(file);
                            revokeURLs('player');
                            tempObjectURLs.player.push(objectURL);
                            playerView.style.backgroundImage = `url(${objectURL})`;
                            
                            db.songs.update(currentSongId, { backgroundFile: file }).then(() => { 
                                showUploadStatus('单曲背景已保存'); 
                            });
                        }
                        document.body.removeChild(tempInput);
                    });
                    
                    document.body.appendChild(tempInput);
                    tempInput.click();
                } else {
                    songBgInput.click();
                }
            });
            
            songBgInput.addEventListener('change', (e) => {
                const file = e.target.files[0]; if (!file) return;
                const playerView = document.getElementById('player-view');
                const currentSongId = parseInt(playerView.dataset.currentSongId); if (!currentSongId) return;
                const objectURL = URL.createObjectURL(file);
                revokeURLs('player');
                tempObjectURLs.player.push(objectURL);
                playerView.style.backgroundImage = `url(${objectURL})`;
                db.songs.update(currentSongId, { backgroundFile: file }).then(() => { showUploadStatus('单曲背景已保存'); });
                e.target.value = '';
            });

            document.getElementById('display-picture-container').addEventListener('click', () => { 
                // 如果是荣耀手机，使用特殊方法
                if (isHonorOrHuawei) {
                    const tempInput = document.createElement('input');
                    tempInput.type = 'file';
                    tempInput.accept = 'image/*';
                    tempInput.style.display = 'none';
                    
                    tempInput.addEventListener('change', async function() {
                        if (this.files && this.files.length > 0) {
                            await db.settings.put({ key: 'displayPicture', value: this.files[0] });
                            renderUI();
                            showUploadStatus('展示图片已更新');
                        }
                        document.body.removeChild(tempInput);
                    });
                    
                    document.body.appendChild(tempInput);
                    tempInput.click();
                } else {
                    const input = document.createElement('input'); 
                    input.type = 'file'; 
                    input.accept = 'image/*'; 
                    input.onchange = async e => { 
                        if (e.target.files[0]) { 
                            await db.settings.put({ key: 'displayPicture', value: e.target.files[0] }); 
                            renderUI(); 
                        } 
                    }; 
                    input.click();
                }
            });
            
            async function initialize() { 
                setupNavigation(); 
                setupColorPicker();
                setupCustomControls();
                setupSleepTimer();
                
                const playerView = document.getElementById('player-view');
                const lyricBubble = document.querySelector('.lyric-bubble');
                lyricBubble.id = 'lyric-bubble';
                const albumArt = document.getElementById('album-art');
                const songTitleBox = document.getElementById('song-title-box');

                setupDraggableElement(lyricBubble, playerView);
                setupDraggableElement(albumArt, playerView);
                setupDraggableElement(songTitleBox, playerView);
                
                const cpSetting = await db.settings.get('continuousPlay');
                isContinuousPlay = cpSetting ? cpSetting.value : false;
                updateContinuousPlayUI();

                setInterval(updateClock, 1000); 
                updateClock(); 
                const settingsExist = await db.settings.get('appConfig'); 
                if (!settingsExist) { await db.settings.put({ key: 'appConfig', value: defaultAppConfig }); } 
                await renderUI(); 
                navigateTo('desktop-view'); 
                
                // 显示欢迎消息
                setTimeout(() => {
                    if (isHonorOrHuawei) {
                        showUploadStatus('欢迎使用！荣耀/Huawei用户请使用专用上传按钮');
                    } else {
                        showUploadStatus('欢迎使用♡呦の音乐♡播放器');
                    }
                }, 1000);
            }
            
            initialize();
        });
    </script>
</body>
</html>