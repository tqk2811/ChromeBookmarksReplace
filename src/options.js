Element.prototype.remove = function(){this.parentElement.removeChild(this);}
NodeList.prototype.remove = HTMLCollection.prototype.remove=function()
{
    for(var i=this.length-1;i>= 0;i--) 
		if(this[i] && this[i].parentElement) 
			this[i].parentElement.removeChild(this[i]);
}
document.getElementById("bt_search").addEventListener('click',function(){ search();})
document.getElementById("replace_all").addEventListener('click',function(){ replace_all();})
document.getElementById("bt_clear").addEventListener('click',function(){ clear();})
var table_ = document.getElementById("table_result");
var table_body = table_.getElementsByTagName("tbody")[0];
function search()
{
	clear();
	var input_search = document.getElementById("input_search").value;
	chrome.bookmarks.search({"query": input_search},search_callback);
}
function search_callback(results)
{
	for(var i = 0; i< results.length; i++)
		table_body.appendChild(create_row(([results[i].id,results[i].title,results[i].url,""])));
}
function create_row(cells_string)
{
	var tr = document.createElement("tr");
	for(var i = 0; i < cells_string.length; i++)
	{
		var td = document.createElement("td");
		td.innerText = cells_string[i];
		tr.appendChild(td);
	}
	return tr;
}
function replace_all()
{
	if(window.confirm("Confirm?"))
	{
		var input_replace = document.getElementById("input_replace").value;
		var input_replace2 = document.getElementById("input_replace2").value;
		
		var trs = table_body.getElementsByTagName("tr");
		for(var i = 0; i < trs.length; i++)
		{
			var tds = trs[i].getElementsByTagName("td");
			if(tds[2].innerText.indexOf(input_replace) >=0)
			{
				chrome.bookmarks.update(
					tds[0].innerText,
					{"url": tds[2].innerText.replace(input_replace,input_replace2)},
					function(r){});
				tds[3].innerText = "Replaced"
			}
		}
	}
}
function clear()
{
	var table_ = document.getElementById("table_result");
	var table_body = table_.getElementsByTagName("tbody")[0].children.remove();
}