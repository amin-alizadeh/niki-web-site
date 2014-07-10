var sp = "&nbsp;";
var serviceMenuStatus = false;
var invokedServiceMenu;
var serviceMenuContent = '<a class="item" href="company.html" onmouseover="ShowServiceMenu(true)" onmouseout="ShowServiceMenu(false)">Company2</a>' +
'<a class="item" href="contact.html" onmouseover="ShowServiceMenu(true)" onmouseout="ShowServiceMenu(false)">Contact</a>';

function httpGet(theUrl)
{
	var xmlHttp = null;

	xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", theUrl, false );
	xmlHttp.send( null );
	if (xmlHttp.status == 200) {
		return xmlHttp.responseText;
	} else {
		return null;
	}
}
function fillContact() { 
	var text = '<i class="mail icon"></i>';
	json = httpGet("data.php?d=contact");
	if (json != null) {
		var parsed = JSON.parse(json);
		text += sp + parsed.email + sp + "[ät]" + sp + parsed.site;
		text += '<p><i class="phone sign icon"></i>' + parsed.phonesuffix + sp + parsed.phone;
	} else {
		text = '<i class="mail icon"></i>&nbsp;info &nbsp;[ät] &nbsp;nikimarine.com<p><i class="phone sign icon"></i>+358 (0)9 987654321</p>';
	}
	document.getElementById("contact").innerHTML = text;
}
function fillSocial() {
	var text = '<div class="ui header">Social Media</div>';
	json = httpGet("data.php?d=social");
	if (json != null) {
		var parsed = JSON.parse(json);
		for (var key in parsed) {
			text += '<a href="' + parsed[key] + '" target="_blank">' +
					'<i class="big inverted circular ' + key + ' icon"></i></a>';
		}
	} else {
		text = '<div class="ui header">Social Media</div>' +
				'<a href="https://www.facebook.com/nmc-fi" target="_blank">' +
				'<i class="big inverted circular facebook icon"></i> ' +
				'</a>' +
				'<a href="https://www.linkedin.com/company/nmc-fi" target="_blank">' +
				'<i class="big inverted circular linkedin icon"></i> ' +
				'</a>' +
				'<a href="https://www.youtube.com/nmc-fi" target="_blank">' +
				'<i class="big inverted circular youtube icon"></i> ' +
				'</a>';
	}
	document.getElementById("social").innerHTML = text;
}
function fillRight() {
	var loc = window.location.pathname;
	var parts = loc.split("/");
	var page = parts[parts.length - 1];
	if (page.split(".").length > 1) {
		page = page.split(".")[0];
	}
	var json = httpGet("data.php?d=rightcolumn&page="+page);
	var text = '</br>NIKI Marine Company <a href="."> Read more.. </a><br/>Contact details <a href="contact.html"> Read more.. </a><br/>';
	var header = 'Content';
	if (json != null) {
		var parsed = JSON.parse(json);
		if ('header' in parsed) {
			 header = parsed.header;
		} 
		text = '<br/>';
		for (var link in parsed) {
			if (link != 'header') {
				text += parsed[link] + sp + '<a href="' + link + '" target=_blank> more.. </a><br/>';
			}
		}
	} 
	document.getElementById("rightcolumnheader").innerHTML = header;
	document.getElementById("rightcolumn").innerHTML = text;
}
function getServiceMenu() {
	var json = httpGet("data.php?d=servicemenu");
	if (json == null) {
		json = '{"navpubcharts.html":"NAVIGATION AND PUBLICATION CHARTS","surveyreport.html":"SURVEY & REPORT","shiprepdock.html":"SHIP REPAIR AND DRY DOCKING SERVICES","logtech.html":"LOGISTIC AND TECHNICAL SUPPORT","lpgtanker.html":"LPG & TANKER BROKER","consultinvest.html":"CONSULTANCY AND INVESTMENTS","petrotrans.html":"PETROCHEMICAL PRODUCT & TRANSPORTATION SERVICES","manage.html":"MANNING AGENCY","envsols.html":"ENVIRONMENT SOLUTIONS"}';
	}
	var parsed = JSON.parse(json);
	var menus = '';
	var iteminrow = 2;
	var count = 0;
	for (var link in parsed) {
		menus += '<a class="item" href="' + link + '" onmouseover="KeepServiceMenu(true)" onmouseout="KeepServiceMenu(false)">' + parsed[link] + '</a>';
	}
	serviceMenuContent = menus;
}
function ShowServiceMenu(show) {
	var t = '';
	if (show) {
		console.log ('mouse entered up');
		clearTimeout (invokedServiceMenu);
		t = serviceMenuContent;
		document.getElementById("servicemenu").innerHTML = t;
		serviceMenuStatus = true;
	} else {
		invokedServiceMenu = setTimeout(HideServiceMenu, 500);
		console.log ('mouse left up');
	}
}

function HideServiceMenu () {
	serviceMenuStatus = false;
	document.getElementById("servicemenu").innerHTML = '<div class="item">&nbsp;</div>';
}

function KeepServiceMenu(show) {
	console.log ('mouse entered down ' + (show && serviceMenuStatus));
	ShowServiceMenu (show && serviceMenuStatus);
}
fillContact();
fillSocial();
fillRight();
getServiceMenu();
//fillServiceMenu();
//secondaryServiceMenu();
//servicemenu = document.getElementById("servicemenu");
//servicemenu.transition('shake');