alert("hi");
var port = chrome.extension.connect({name: "load_page"});
port.onMessage.addListener(function(msg)
{
	//alert(msg.data);	
	console.log(msg.data);
	document.write(msg.data);
	//$.get(my_url, function(data){});
});