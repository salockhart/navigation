﻿import IHistoryManager = require('./IHistoryManager');
import HistoryNavigator = require('./HistoryNavigator');
import settings = require('../settings');
import State = require('../config/State');
import StateContext = require('../StateContext');

class HTML5HistoryManager implements IHistoryManager {
    disabled: boolean = (typeof window === 'undefined') || !(window.history && window.history.pushState);

    init() {
        if (!this.disabled)
            window.addEventListener('popstate', HistoryNavigator.navigateHistory);
    }

    addHistory(state: State, url: string, replace?: boolean) {
        url = url != null ? url : StateContext.url;
        url = settings.applicationPath + url;
        if (!this.disabled && location.pathname + location.search !== url) {
            if (!replace)            
                window.history.pushState(null, null, url);
            else
                window.history.replaceState(null, null, url);
        }
    }

    getCurrentUrl(): string {
        return location.pathname.substring(settings.applicationPath.length) + location.search;
    }

    getHref(url: string): string {
        if (!url)
            throw new Error('The Url is invalid');
        return settings.applicationPath + url;
    }

    getUrl(anchor: HTMLAnchorElement) {
        return anchor.pathname.substring(settings.applicationPath.length) + anchor.search;
    }
}
export = HTML5HistoryManager;
