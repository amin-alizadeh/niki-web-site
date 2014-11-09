var sp = "&nbsp;";
var serviceMenuStatus = false;
var invokedServiceMenu;
var serviceMenuContent = '<a class="item" href="company.html" onmouseover="ShowServiceMenu(true)" onmouseout="ShowServiceMenu(false)">Company2</a>' +
'<a class="item" href="contact.html" onmouseover="ShowServiceMenu(true)" onmouseout="ShowServiceMenu(false)">Contact</a>';
var defaultServiceMenu = '{"navpubcharts.html":"Navigation And Publication Charts","surveyreport.html":"Survey & Report","shiprepdock.html":"Ship Repair And Dry Docking Services","logtech.html":"Logistic And Techincal Support","lpgtanker.html":"LPG & Tanker Broker","consultinvest.html":"Consultancy And Investments","petrotrans.html":"Petrochemical Products & Transportation Services","manage.html":"Manning Agency","envsols.html":"Envromental Solutions"}';
var serviceMenuContentDefault = '';
var serviceMenuCount = 0;
var defaultContacts = '{"site":"nikimarine.eu","email":"info","phone":"9 987654321","phonesuffix":"+358"}';
var defaultSocial = '{"facebook":"https:\/\/www.facebook.com\/nmc-fi","youtube":"https:\/\/www.youtube.com\/nmc-fi","linkedin":"https:\/\/www.linkedin.com\/company\/nmc-fi"}';

var defaultRight = '{"header":"Related",".":"NIKI Marine Company","contact.html":"Contact details"}';
function httpGet(theUrl)
{
	var xmlHttp = null;

	xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", theUrl, false );
	xmlHttp.send( null );
	var ret = xmlHttp.responseText;
	//console.log('Response for URL ' + theUrl + ' is ' + ret);
	if (xmlHttp.status == 200) {
		return ret;
	} else {
		return null;
	}
}
function fillContact() { 
	var text = '<i class="mail icon"></i>';
	json = httpGet("data.php?d=contact");
	try {
		var parsed = JSON.parse(json);
	} catch (e) {
		parsed = JSON.parse(defaultContacts);
	}
	text += sp + parsed.email + sp + "[ät]" + sp + parsed.site;
	text += '<p><i class="phone sign icon"></i>' + parsed.phonesuffix + sp + parsed.phone1;
	text += '<p><i class="phone sign icon"></i>' + parsed.phonesuffix + sp + parsed.phone2;
	document.getElementById("contact").innerHTML = text;
}
function fillSocial() {
	var text = '<div class="ui header">Social Media</div>';
	json = httpGet("data.php?d=social");
	try {
		var parsed = JSON.parse(json);
	} catch (e) {
		parsed = JSON.parse(defaultSocial);
	}
	for (var key in parsed) {
		text += '<a href="' + parsed[key] + '" target="_blank">' +
				'<i class="big inverted circular ' + key + ' icon"></i></a>';
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
	try {
		var parsed = JSON.parse(json);
	} catch (e) {
		parsed = JSON.parse(defaultRight);
	}
	if ('header' in parsed) {
		 header = parsed.header;
	} 
	text = '<br/>';
	for (var link in parsed) {
		if (link != 'header') {
			text += parsed[link] + sp + '<a href="' + link + '" target=_blank> more.. </a><br/><br/>';
		}
	}

	document.getElementById("rightcolumnheader").innerHTML = header;
	document.getElementById("rightcolumn").innerHTML = text;
}
function getServiceMenu() {
	var json = httpGet("data.php?d=servicemenu");
	if (json == null) {
		json = '{"navpubcharts.html":"Navigation And Publication Charts","surveyreport.html":"Survey & Report","shiprepdock.html":"Ship Repair And Dry Docking Services","logtech.html":"Logistic And Techincal Support","lpgtanker.html":"LPG & Tanker Broker","consultinvest.html":"Consultancy And Investments","petrotrans.html":"Petrochemical Products & Transportation Services","manage.html":"Manning Agency","envsols.html":"Envromental Solutions"}';
	}
	try {
		var parsed = JSON.parse(json);
	} catch (e) {
		parsed = JSON.parse(defaultServiceMenu);
	}
	var menus = '';

	for (var link in parsed) {
		serviceMenuCount++;
		menus += '<a class="item" href="' + link + '" onmouseover="KeepServiceMenu(true)" onmouseout="KeepServiceMenu(false)">' + parsed[link] + '</a>';
		//console.log(parsed[link].length);
		var empty = '';
		for (var i = 0; i < parsed[link].length; i++)
			empty += 'A';
		serviceMenuContentDefault += '<div class="hidden item">' + parsed[link] + '</div>';
	}
	serviceMenuContent = menus;
}

function ShowServiceMenu(show) {
	var t = '';
	if (show) {
		clearTimeout (invokedServiceMenu);
		t = serviceMenuContent;
		document.getElementById("servicemenu").innerHTML = t;
		serviceMenuStatus = true;
	} else {
		invokedServiceMenu = setTimeout(HideServiceMenu, 500);
	}
}

function HideServiceMenu () {
	serviceMenuStatus = false;
	document.getElementById("servicemenu").innerHTML = serviceMenuContentDefault;//'<div class="item"><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p></div>';
}

function KeepServiceMenu(show) {
	ShowServiceMenu (show && serviceMenuStatus);
}

function fillServiceMenu() {
	var json = httpGet("data.php?d=servicemenu");
	if (json == null) {
		json = '{"charts-publications.html":"Chart & Publication","survey-report.html":"Survey & Report","drydocking-services.html":"Dry Docking Services","lpg-tanker.html":"LPG & Tanker","consultancy.html":"Consultancy","manning-agency.html":"Manning Agency","environmental.html":"Environmental"}';
	}
	try {
		var parsed = JSON.parse(json);
	} catch (e) {
		parsed = JSON.parse(defaultServiceMenu);
	}
	var menus = '';

	for (var link in parsed) {
		serviceMenuCount++;
		menus += '<a class="item" href="' + link + '">' + parsed[link] + '</a>'
		//menus += '<a class="item" href="' + link + '" onmouseover="KeepServiceMenu(true)" onmouseout="KeepServiceMenu(false)">' + parsed[link] + '</a>';
		//console.log(parsed[link].length);
	}
	document.getElementById("servicemenu").innerHTML = menus;
}

getServiceMenu();
fillContact();
fillSocial();
fillRight();
HideServiceMenu();
fillServiceMenu();

//fillServiceMenu();
//secondaryServiceMenu();
//servicemenu = document.getElementById("servicemenu");
//servicemenu.transition('shake');