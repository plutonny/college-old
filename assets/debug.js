/*       -------        Debug file        -------       */
/*     -------       Made by plutonny       -------     */

"use strict";

localStorage.setItem('DebugJSBuild', 10)

var LOG = [];

/* Sleep function (dont touch this!) */
function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

/**
 * Logging and erros!
 * type - (info, warn, error, critical)
 * data - (for info, warn and error) text of log data
 */
function con(type, data) {
         if (type == 'info')     { LOG.push([type, data]); console.info(data) }
    else if (type == 'warn')     { LOG.push([type, data]); console.warn(data) }
    else if (type == 'error')    { LOG.push([type, data]); console.error(data) }
    else if (type == 'critical') { LOG.push([type, data]); console.error(data); sessionStorage.setItem('ERRORPAGELOGS', outlog(LOG)); sessionStorage.setItem('ERRORPAGEERROR', data); location.assign(`/storage/${betafolder}error.html`) }
}