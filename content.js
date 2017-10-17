$('a[href]').each(function(e) {
	var uri = $(this).attr('href')
	if (uri.split('?u=')[1]&&uri.split('?u=')[1].split('&h=')[0]) {
		var extracted = decodeURIComponent(uri.split('?u=')[1].split('&h=')[0])
		$(this).attr('href',extracted)
		$(this).mousedown(function(event){
			if (event.which === 1) {
				alert('Right click ans select "open in new inPrivate window", or "copy url", open a new window in private and paste it. This link directs to: '+extracted)
				//chrome.windows.create({"url": extracted, "incognito": true})
			}
		})
	}
})

$('a')