// Saves options to chrome.storage
function save_options() {
	var tpl = document.getElementById('tpl').value

	chrome.storage.sync.set({
		tpl: tpl
	}, function () {
		// Update status to let user know options were saved.
		var status = document.getElementById('status');
		status.textContent = 'Options saved'
		setTimeout(function () {
			status.textContent = ''
		}, 750)
	})
}

function restore_options() {
	chrome.storage.sync.get({
		tpl: 'test/test.html'
	}, function (items) {
		document.getElementById('tpl').value = items.tpl
	})
}
document.addEventListener('DOMContentLoaded', restore_options)
document.getElementById('save').addEventListener('click', save_options)
