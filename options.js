// Saves options to chrome.storage
function save_options() {
	var tpl = document.getElementById('tpl').value

	chrome.storage.sync.set({
		tpl: tpl,
		devmode: $('#devmode').is(':checked'),
		simple: $('#simple').is(':checked')
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
		tpl: 'test/test.html',
		devmode: false,
		simple: true
	}, function (items) {
		document.getElementById('tpl').value = items.tpl
		$('#devmode').prop('checked', items.devmode)
		if (items.devmode) {
			$('#tp').show()
		}
		$('#simple').prop('checked', items.simple)
	})
}
document.addEventListener('DOMContentLoaded', restore_options)
document.getElementById('save').addEventListener('click', save_options)
document.getElementById('devmode').addEventListener('click', function(){
	if ($('#devmode').is(':checked')) {
		$('#tp').show()
	} else {
		$('#tp').hide()
	}
})
