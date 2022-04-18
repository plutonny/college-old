/*       -------       Storage file       -------       */
/*     -------       Made by plutonny       -------     */

/*  ---  Global variables  ---  */
var VERSION = '2.1.1', BUILD = '44';
var BETA = true;

/*  ---  Prepare to work  ---  */
var dt = new Date(), solss = SunCalc.getTimes(dt, 64.4, 40.4)
settings('write', 'FramesJSBuild', BUILD)
var headertext = '', betafolder = '', betarepos = ''; if (BETA) { betafolder += 'beta/'; betarepos += '-beta'; VERSION += ' beta'; document.getElementById('title_page').innerHTML = 'Beta version' }
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
 * Modals!
 * type info - small modal in botton of the page
 * type max  - big modal in center of the page
 */
async function modal(type, content) {
    await sleep(500)
         if (type == 'info') { document.getElementById('modal').innerHTML = `<div class="mini_modal" id="mini_modal">${content}</div>`; await sleep(2500); document.getElementById('modal').innerHTML = '' }
    else if (type == 'max')  { if(settings('get','theme')=='dark'){document.getElementById('theme-color').content = '#262626'} if(settings('get','theme')=='light'){document.getElementById('theme-color').content = '#9b9b9b'} document.getElementById('modal').innerHTML = `<div class="max_modal" id="max_modal">${content}</div>` }
}

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
       else              { con('error', 'ERROR: uncaught error output function') }
}

/**
 * Themes!!!
 * 0 - change theme
 * 1 - load (update) theme
 */
function changeimage(name, directory) {document.getElementById(name).src = `/college-old/assets/images/${directory}`;}
async function theme(setting) {
    var tf = settings('get', 'theme'); var ut = '';
    if (settings('get', 'typetheme') == 2) { if (solss.sunrise < dt && dt < solss.sunset) { tf = 'light'; settings('write', 'theme', 'light') } else { tf = 'dark'; settings('write', 'theme', 'dark') } }
    if (settings('get', 'typetheme') == 3) { 
        var from = '', to = '', now = parseInt(String(dt.getHours()) + String(dt.getMinutes()))
        from = parseInt(settings('get', 'tytheme3time').charAt(0) + settings('get', 'tytheme3time').charAt(1) + settings('get', 'tytheme3time').charAt(3) + settings('get', 'tytheme3time').charAt(4)); 
        to = parseInt(settings('get', 'tytheme3time').charAt(5) + settings('get', 'tytheme3time').charAt(6) + settings('get', 'tytheme3time').charAt(8) + settings('get', 'tytheme3time').charAt(9));
        if (from < to) { if (from < now && now < to) { tf = 'light'; settings('write', 'theme', 'light') } else { tf = 'dark'; settings('write', 'theme', 'dark') } }
        else if (from > to) { if ((from < now && now < 23) || (0 < now && now < to)) { tf = 'light'; settings('write', 'theme', 'light') } else { tf = 'dark'; settings('write', 'theme', 'dark') } }
    }
    try {
        if (setting === 0) {
            await sleep(50)
            if (tf == 'light') { document.getElementById('theme_css').innerHTML = dark_theme; document.getElementById('theme-color').content = '#111111'; settings('write', 'theme', 'dark'); } 
            else if (tf == 'dark') { document.getElementById('theme_css').innerHTML = light_theme; document.getElementById('theme-color').content = '#e9e9e9'; settings('write', 'theme', 'light'); };
            try { changeimage('mobile_settings_button', `${tf}/settings.svg`) } catch { if (BETA) { con('warn', 'Warning: setting button is not enabled!'); } };
            try { changeimage('mobile_theme_button', `${tf}/theme.svg`) } catch { if (BETA) { con('warn', 'Warning: theme button is not enabled!'); } };
            try { changeimage('back_button', `${tf}/back.svg`); } catch { if (BETA) { con('warn', 'Warning: back button is not enabled!'); } };
            try { changeimage('timetable_support', `${tf}/collegetimetable.svg`); changeimage('gnumstable_support', `${tf}/collegegnumstable.svg`); changeimage('gtable_support', `${tf}/collegegtable.svg`); changeimage('other_support', `${tf}/collegeother.svg`); } catch { if (BETA) { con('warn', 'Warning: icon support button is not enabled!'); } }; 
        } if (setting == 1) {
            try { if (tf == 'light') { ut = 'dark' } else if (tf == 'dark') { ut = 'light' } else { con('warn', 'WARN: theme are undefined! Setting theme to light...'); settings('write', 'theme', 'light'); window.location.reload() } } catch { con('warn', 'WARN: theme are undefined! Setting theme to light...'); settings('write', 'theme', 'light'); window.location.reload() }
            if (tf == 'light') { ut = 'dark' } else if (tf == 'dark') { ut = 'light' }
            if (tf == 'light') { document.getElementById('theme_css').innerHTML = light_theme; document.getElementById('theme-color').content = '#e9e9e9'; } 
            else if (tf == 'dark') { document.getElementById('theme_css').innerHTML = dark_theme; document.getElementById('theme-color').content = '#111111'; }
            try { changeimage('mobile_settings_button', `${ut}/settings.svg`) } catch (e) { if (BETA) { con('warn', `Warning: setting button is not enabled! (${e})`); } };
            try { changeimage('mobile_theme_button', `${ut}/theme.svg`); } catch (e) { if (BETA) { con('warn', `Warning: theme button is not enabled! (${e})`); } };
            try { changeimage('back_button', `${ut}/back.svg`); } catch (e) { if (BETA) { con('warn', `Warning: back button is not enabled! (${e})`); } };
            try { changeimage('timetable_support', `${ut}/collegetimetable.svg`); changeimage('gnumstable_support', `${ut}/collegegnumstable.svg`); changeimage('gtable_support', `${ut}/collegegtable.svg`); changeimage('other_support', `${ut}/collegeother.svg`); } catch (e) { if (BETA) { con('warn', `Warning: icon support button is not enabled! (${e})`); } };
        }
    } catch (e) { con('critical', `ERROR: theme function (${e})`) }
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
    try {
        document.write(`
        <div id="header" class="header" style="padding-bottom: 12px; display: flex; flex-direction: row; flex-wrap: nowrap; align-items: center; user-select: none;">
        <a href="/college-old/" class="logo_text_header">
            <p class="logo_text_header" style="font-size: 24px; margin-bottom: 12px; margin-left: 24px;">Группа КСК-11</p>
        </a>
        <p class="logo_dot_header" style="font-size: 20px; margin-bottom: 10px; margin-left: 14px; margin-right: 14px;">|</p>
        <div class="mobile_gorisontal_void"></div>
        <p style="font-size: 20px; margin-bottom: 8px; z-index: 10;">${text}</p>
        <div class="pc_gorisontal_void"></div>
        <div class="mobile_gorisontal_void"></div>
        `)
        if (enableTheme && settings('get', 'enablethemebutton') == 'true' && settings('get', 'typetheme') == 1) { 
            document.write(`<button id="theme_button" class="theme_header_button pc" onclick="theme(0)">Сменить тему</button>`); 
            document.write(`<button id="theme_button" class="theme_header_button mobile" style="border: none !important;" onclick="theme(0)"><img style="width: 32px; height: 32px;" id="mobile_theme_button" src=""></button>`)
        }
        if (enableBack) {
            document.write(`<button id="theme_button" class="back_button mobile" style="border: none !important;" onclick="history.back()"><img style="width: 32px; height: 32px;" id="back_button" src=""></button>`)
        }
        if (enableSettings) {
            document.write(`<button id="theme_button" class="settings_header_button pc" onclick="location.assign('/college-old/settings/')">Настройки</button>`); 
            document.write(`<button id="theme_button" class="settings_header_button mobile" style="border: none !important;" onclick="location.assign('/college-old/settings/')"><img style="width: 32px; height: 32px;" id="mobile_settings_button" src=""></button>`)
        }
        document.write(`</div><hr style="border: none; height: 2px; margin-top: 0;"></div>`);
    } catch (e) { con('critical', `ERROR: header function (${e})`) }
}