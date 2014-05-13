//<div class="ui button" onClick="showHideContent (2)" id="displayContent2">Follow</div>

var buttonID=new Array();
function showHideContent(id)
{
	if(!buttonID[id]) {
		document.getElementById("displayContent" + id).innerHTML="Unfollow";
		buttonID[id] = true;
	} else {
		document.getElementById("displayContent" + id).innerHTML="Follow";
		buttonID[id] = false;		
	}
}