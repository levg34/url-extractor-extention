$('a[href]').each(function(e) {
	var uri = $(this).attr('href')
	if (uri.split('?u=')[1]&&uri.split('?u=')[1].split('&h=')[0]) {
		var extracted = decodeURIComponent(uri.split('?u=')[1].split('&h=')[0])
		console.log(extracted)
	}
})
