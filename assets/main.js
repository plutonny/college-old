/*       -------       Storage file       -------       */
/*     -------       Made by plutonny       -------     */

/*  ---  Global variables  ---  */
var VERSION = '2.1.2', BUILD = '45';

/*  ---  Prepare to work  ---  */
var dt = new Date(), solss = SunCalc.getTimes(dt, 64.4, 40.4)
settings('write', 'MainJSBuild', BUILD)
var WEEK = luxon.DateTime.now().weekNumber; var weekname = ''; var weekcolor = ''; if (WEEK % 2 == 1) { weekname = 'зеленая'; weekcolor = 'green' } else { weekname = 'желтая'; weekcolor = 'yellow' }
if ((settings('get', 'tytheme3time') == null || settings('get', 'tytheme3time') == '') && settings('get', 'typetheme') == 3) { settings('write', 'typetheme', 1) }
if (settings('get', 'enablethemebutton') == null || settings('get', 'enablethemebutton') == '') { settings('write', 'enablethemebutton', 'true') }
if (settings('get', 'typetheme') == null || settings('get', 'typetheme') == '') { settings('write', 'typetheme', 1) } ; if (settings('get', 'typetheme') == 2 || settings('get', 'typetheme') == 3) {settings('write', 'enablethemebutton', `false`)}
var light_theme = `:root {
    --main-text-color   :#101520;
    --active-text-color :#505050;
    --main-bg-color     :#e9e9e9;
    --button-bg-enable  :#cccccc;
    --button-bg-active  :#b5b5b5;
    --timetable-bg      :#f5f5f5;
    --timetable-green   :#00e600;
    --timetable-yellow  :#e6e600;
    --weekcolor         :var(--timetable-${weekcolor}) !important;
}`;
var dark_theme  = `:root {
    --main-text-color   :#f4f4f4;
    --active-text-color :#aaaaaa;
    --main-bg-color     :#111111;
    --button-bg-enable  :#252525;
    --button-bg-active  :#333333;
    --timetable-bg      :#0a0a0a;
    --timetable-green   :#006600;
    --timetable-yellow  :#808000;
    --weekcolor         :var(--timetable-${weekcolor}) !important;
}`;

/**
 * Settings (lol)
 * type (get, write or remove) - returned or writing localstorage
 * key, value                  - key and value of localstorage (lol)
 */
function settings(type, key, value) { if (type == 'get') { try { return localStorage.getItem(key) } catch { return '' } } else if (type == 'write') { localStorage.setItem(key, value); } else if (type == 'remove') { localStorage.removeItem(key) } }

/**
 * Output TEXT or FILE
 * [true, *file name*] - output file
 * [false, *text*]     - output text
 */
function output(type_data, data) {
         if (!type_data) { document.write(data); }
       else              { console.error('ERROR: uncaught error output function') }
}

/**
 * Themes!!!
 * 0 - change theme
 * 1 - load (update) theme
 */
async function theme(setting) {
    var tf = settings('get', 'theme'); var ut = '';
    if (settings('get', 'typetheme') == 2) { if (solss.sunrise < dt && dt < solss.sunset) { tf = 'light'; settings('write', 'theme', 'light') } else { tf = 'dark'; settings('write', 'theme', 'dark') } }
    try {
        if (setting === 0) {
            if (tf == 'light') { document.getElementById('theme_css').innerHTML = dark_theme; document.getElementById('theme-color').content = '#111111'; settings('write', 'theme', 'dark'); } 
            else if (tf == 'dark') { document.getElementById('theme_css').innerHTML = light_theme; document.getElementById('theme-color').content = '#e9e9e9'; settings('write', 'theme', 'light'); };
        } if (setting == 1) {
            try { if (tf == 'light') { ut = 'dark' } else if (tf == 'dark') { ut = 'light' } else { console.warn('WARN: theme are undefined! Setting theme to light...'); settings('write', 'theme', 'light'); window.location.reload() } } catch { console.warn('WARN: theme are undefined! Setting theme to light...'); settings('write', 'theme', 'light'); window.location.reload() }
            if (tf == 'light') { ut = 'dark' } else if (tf == 'dark') { ut = 'light' }
            if (tf == 'light') { document.getElementById('theme_css').innerHTML = light_theme; document.getElementById('theme-color').content = '#e9e9e9'; } 
            else if (tf == 'dark') { document.getElementById('theme_css').innerHTML = dark_theme; document.getElementById('theme-color').content = '#111111'; }
        }
    } catch (e) { console.error(`ERROR: theme function (${e})`) }
}

/**
 * Outputted header
 * text           - text after logo or main text (in mobile)
 * enableTheme    - enable or disable theme buttons (not theme)
 * enableBack     - enable or disable back to home button
 * enableSettings - enable or disable settings button
 * DONT use enableTheme and enableSettings in one time!!!
 */
function header(text, enableTheme, enableBack, enableSettings) {
    var inj = ''
    if (enableTheme && settings('get', 'enablethemebutton') == 'true' && settings('get', 'typetheme') == 1) { 
        inj +=`<button id="theme_button" class="theme_header_button pc" onclick="theme(0)">Сменить тему</button>`
        inj +=`<button id="theme_button" class="theme_header_button mobile" style="fill: currentColor; border: none !important;" onclick="theme(0)"><svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" height="32px" viewBox="0 0 20 20" width="32px"><rect fill="none" height="20" width="20"/><path d="M8.04,4.86C7.88,5.39,7.8,5.94,7.8,6.5c0,3.14,2.56,5.7,5.7,5.7c0.56,0,1.11-0.08,1.64-0.24c-0.79,2.07-2.8,3.54-5.14,3.54 c-3.03,0-5.5-2.47-5.5-5.5C4.5,7.66,5.97,5.65,8.04,4.86z M10,3c-3.87,0-7,3.13-7,7s3.13,7,7,7s7-3.13,7-7 c0-0.36-0.03-0.72-0.08-1.06C16.16,10,14.91,10.7,13.5,10.7c-2.32,0-4.2-1.88-4.2-4.2c0-1.41,0.7-2.66,1.76-3.42 C10.72,3.03,10.36,3,10,3L10,3z"/></svg></button>`
    }
    if (enableBack) {
        inj +=`<button id="theme_button" class="back_button mobile" style="fill: currentColor; border: none !important;" onclick="history.back()"><svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 0 24 24" width="32px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg></button>`
    }
    if (enableSettings) {
        inj +=`<button id="theme_button" class="settings_header_button pc" onclick="location.assign('/college-old/settings/')">Настройки</button>`
        inj +=`<button id="theme_button" class="settings_header_button mobile" style="fill: currentColor; border: none !important;" onclick="location.assign('/college-old/settings/')"><svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 0 24 24" width="32px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg></button>`
    }
    document.getElementById('header').innerHTML = `
    <div id="header" class="header" style="padding-bottom: 12px; display: flex; flex-direction: row; flex-wrap: nowrap; align-items: center; user-select: none;">
        <a href="/college-old/" class="logo_text_header">
            <p class="logo_text_header" style="font-size: 24px; margin-bottom: 12px; margin-left: 24px;">Группа КСК-11</p>
        </a>
        <p class="logo_dot_header" style="font-size: 20px; margin-bottom: 10px; margin-left: 14px; margin-right: 14px;">|</p>
        <div class="mobile_gorisontal_void"></div>
        <p style="font-size: 20px; margin-bottom: 8px; z-index: 10;">${text}</p>
        <div class="pc_gorisontal_void"></div>
        <div class="mobile_gorisontal_void"></div>
        ${inj}
        </div><hr style="border: none; height: 2px; margin-top: 0;"></div>
    `
}