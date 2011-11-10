var debug_incognito = true;
var t = readCookie('t');
if (debug_incognito) console.log("t = " + t);

    $.ajaxSettings.beforeSend=function(xhr){
        xhr.setRequestHeader('X-Requested-With', {toString: function(){ return ''; }});
    };

(function()
{
	rewrite_links();
})();

function rewrite_links()
{
	var $ = jQuery;
	var feeds = $('[href*="http"]');
	if (debug_incognito) console.log('inside incognito function');
	feeds.each(function(i, item)
	{
	
		var url = $(item).attr('href');  //get the url
		//if (debug_incognito) console.log('url: ' + url, $(item));
		$(item).click(function(e)
		{
			var port = chrome.extension.connect({name: "open_incognito_page"});
			port.onMessage.addListener(function(msg)
			{
				if (msg.what == "success") document.cookie = 't=' + t + ';domain=.renren.com;path=/';
				console.log(msg.data);
			});
			e.preventDefault();					
			document.cookie = 't=8b5dae576069f17b7da46c54ee8803d43;domain=.renren.com;path=/';
			if (debug_incognito) console.log('opening tab: ' + url);
			$.get(url, function(data) {port.postMessage({url: url, data:data});});
			if (debug_incognito) console.log('cookie: ', document.cookie);
		});
		
	});
}

function readCookie(name)
{
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++)
	{
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
