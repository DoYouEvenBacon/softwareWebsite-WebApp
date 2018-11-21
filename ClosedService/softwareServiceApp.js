var userLoggedIn = false
var username = null
var password = null

var allPageDivId = ["homePage", "guestBookPage", "softwarePage", "registerPage", "loginPage"];
var numDiv = allPageDivId.length;
function closeDivs(){
	for(i = 0; i < numDiv; i++){
		if(document.getElementById(allPageDivId[i]).style.display === "block"){
			document.getElementById(allPageDivId[i]).style.display = "none";
		}
	}
}

function openMenu() {
	document.getElementById("leftMenuPopout").style.width = "250px";
}
function closeMenu() {
	document.getElementById("leftMenuPopout").style.width = "0";
}
function openHome(){
	document.getElementById("homePage").style.display = "block";	
}
function openGuestBook(){
	document.getElementById("guestBookPage").style.display = "block";	
}
function openSoftware(){
	document.getElementById("softwarePage").style.display = "block";	
}
function openRegisterPage(){
	document.getElementById("registerPage").style.display = "block";	
}
function openLoginPage(){
	document.getElementById("loginPage").style.display = "block";	
}


function submitMessage(){
	let nameInput = document.getElementById("nameInput").value;
	let messageInput = document.getElementById("messageInput").value;
	let contentLength = nameInput.length + messageInput.length + 2;
	const xhr = new XMLHttpRequest();
	const uri = "http://localhost:8188/Service.svc/comment?name=" + nameInput;
	xhr.open("POST", uri, false); //false: synchronous request
	//xhr.setRequestHeader("Content-Length", contentLength);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onload = () =>{
		;
	};	
	xhr.send('"' + messageInput + '"');
	document.getElementById("nameInput").value = "";
	document.getElementById("messageInput").value = "";
	document.getElementById("messageSource").src = document.getElementById("messageSource").src;
}

function realTimeSearch(){
	var softwareSearchInput = document.getElementById("softwareSearchInput").value;
	
	const xhr = new XMLHttpRequest();
	const uri = "http://localhost:8188/Service.svc/search?term=" + softwareSearchInput;
	xhr.open("GET", uri, true);
	xhr.setRequestHeader("Accept", "application/json");
	xhr.onload = () =>{
		const resp = JSON.parse(xhr.responseText);
		
		updateSoftwareResults(resp);
	};
	xhr.send(null);
}

function updateSoftwareResults(searchResults){
	let tableContent = "<tr class='softwareResultList'><td></td><td></td><td></td></tr><br>";
	var resultsLength = searchResults.length;
	for (i = 0; i < resultsLength; i++){
		var softwareID = searchResults[i].ItemId;
		var softwareTitle = searchResults[i].Title;
		var softwareVersion = searchResults[i].Version;
		let softwareImage = "<img src='http://localhost:8188/Service.svc/img?id=" + softwareID + ".png'>";
		let softwareVer = " (Version " + softwareVersion + ")"; 
		let softwareLink = "<a href='#' class='downloadButton' onclick=downloadSoftware('" + softwareID + "')>&#x1F4BE</a>";
		tableContent += "<td>" + softwareImage + "</td><td align='center'>" + softwareTitle + softwareVer + "</td><td>" + softwareLink + "</td></tr><br>";
	}
	document.getElementById("softwareTable").innerHTML = tableContent;
}

function downloadSoftware(software){
	const xhr = new XMLHttpRequest();	
	const uri = "http://localhost:8189/Service.svc/dl?id=" + software;
	if (username != null && password != null){
		xhr.open("GET", uri, true, username, password);
		xhr.setRequestHeader("Accept", "application/json");
		xhr.onload = () =>{
			const resp = JSON.parse(xhr.responseText);
			if (xhr.status === 200){
				alert(resp);
			}		
		}
	xhr.send(null);
	}
	if (username == null && password == null){
		closeDivs(); openLoginPage(); closeMenu();
	}
}

function loginUser(){
	username = null
	password = null
	let getUsername = document.getElementById("loginNameInput").value;
	let getPassword = document.getElementById("loginPasswordInput").value;
	const xhr = new XMLHttpRequest();
	const uri = "http://localhost:8189/Service.svc/user";
	xhr.open("GET", uri, true, getUsername, getPassword);
	xhr.withCredentials = true;
	xhr.onload = () =>{
		if (xhr.status === 200){
			document.getElementById("userLoggedIn").innerHTML = getUsername + " <a href='#' onclick=logoutUser()> (logout)</a>";
			document.getElementById("loginMessage").innerHTML = "Login successful. You can now download software";
			document.getElementById("loginNameInput").value = "";
			document.getElementById("loginPasswordInput").value = "";
			username = getUsername;
			password = getPassword;
		}
		else {
			document.getElementById("loginMessage").innerHTML = "Login unsuccessful. Incorrect Username or Password";
		}			
	}
	xhr.send(null);
}

function logoutUser(){
	username = null
	password = null
	const xhr = new XMLHttpRequest();
	const uri = "http://localhost:8189/Service.svc/user";
	xhr.open("GET", uri, true, username, password);
	xhr.withCredentials = true;	
	xhr.onload = () =>{
		document.getElementById("userLoggedIn").innerHTML = "";
		document.getElementById("loginMessage").innerHTML = "Please login to download software";
	}
	xhr.send(null);
}

function registerUser(){
	let registerAddressInput = document.getElementById("registerAddressInput").value;
	let registerPasswordInput = document.getElementById("registerPasswordInput").value;
	let registerNameInput = document.getElementById("registerNameInput").value;
	let contentLength = registerAddressInput.length + registerNameInput.length + registerPasswordInput.length + 3 + 15 + 12 + 15 + 1; //46
	const xhr = new XMLHttpRequest();
	const uri = "http://localhost:8188/Service.svc/register";
	xhr.open("POST", uri, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onload = () =>{
		const resp = JSON.parse(xhr.responseText);
			document.getElementById("registrationMessage").innerHTML = resp;
			document.getElementById("registerNameInput").value = "";
			document.getElementById("registerPasswordInput").value = "";
			document.getElementById("registerAddressInput").value = "";		
	};
	xhr.send('{ \n' + '"Address":"' + registerAddressInput + '", \n"Name":"' + registerNameInput + '", \n"Password":"' + registerPasswordInput + '" \n}');
}

 