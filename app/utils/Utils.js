export function deleteCookie(name) {
  document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

export function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

export function urlBuilder(url, params) {
  var url = url+"?"
	for (var key in params) {
    if (!params.hasOwnProperty(key)) {
     	continue   
    }
		url = url + key + "=" + params[key]
	}
  return url
}

export function getHost(){
  return "http://localhost:3000"
}
export function openModal(element){
	$(element).modal()
}

export function closeModal(element){
	$(element).modal('hide')
}

export function getUserId(user){
	if(user.local && user.local.username){
		return user.local.username;
	} else {
		return user.facebook.id;
	}
}
