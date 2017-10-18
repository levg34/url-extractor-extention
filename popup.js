// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) {
	// Query filter to be passed to chrome.tabs.query - see
	// https://developer.chrome.com/extensions/tabs#method-query
	var queryInfo = {
		active: true,
		currentWindow: true
	}

	chrome.tabs.query(queryInfo, (tabs) => {
		// chrome.tabs.query invokes the callback with a list of tabs that match the
		// query. When the popup is opened, there is certainly a window and at least
		// one tab, so we can safely assume that |tabs| is a non-empty array.
		// A window can only have one active tab at a time, so the array consists of
		// exactly one tab.
		var tab = tabs[0]

		// A tab is a plain object that provides information about the tab.
		// See https://developer.chrome.com/extensions/tabs#type-Tab
		var url = tab.url

		// tab.url is only available if the "activeTab" permission is declared.
		// If you want to see the URL of other tabs (e.g. after removing active:true
		// from |queryInfo|), then the "tabs" permission is required to see their
		// "url" properties.
		console.assert(typeof url == 'string', 'tab.url should be a string')

		callback(url)
	})
}


// This extension loads the saved background color for the current tab if one
// exists. The user can select a new background color from the dropdown for the
// current page, and it will be saved as part of the extension's isolated
// storage. The chrome.storage API is used for this purpose. This is different
// from the window.localStorage API, which is synchronous and stores data bound
// to a document's origin. Also, using chrome.storage.sync instead of
// chrome.storage.local allows the extension data to be synced across multiple
// user devices.
var testUrl = ''

document.addEventListener('DOMContentLoaded', () => {
	chrome.tabs.executeScript(null, { file: "lib/jquery-3.2.1.min.js" }, function() {
		chrome.tabs.executeScript(null, { file: "content.js" });
	})
	
	chrome.storage.sync.get({
		tpl: 'test/test.html',
		devmode: false
	}, function (items) {
		testUrl = items.tpl
		if(items.devmode) {
			$('#testbn').show()
		}
	})
	
	$('#checkPage').click(function() {
		chrome.tabs.executeScript(null, { file: "lib/jquery-3.2.1.min.js" }, function() {
			chrome.tabs.executeScript(null, { file: "content.js" });
		})
	})
	$('#testbn').click(function() {
		chrome.tabs.query({active: true}, function (tab) {
			chrome.tabs.update(tab.id, {url: testUrl})
		})
	})
})

/*chrome.tabs.onUpdated.addListener(function() {
	getCurrentTabUrl((url) => {
		$('#res').text(url)
	})
})*/

/*setTimeout(function() {
	$('#res').text(localStorage.meuh + ' links extracted.')
}, 2000)*/

setInterval(function() {
	chrome.storage.sync.get(['links'], function(items) {
	  	$('#res').html('<p><strong>'+items.links + '</strong> links extracted.</p>')
    })
}, 2000)
