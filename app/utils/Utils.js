import Colors from 'material-ui/lib/styles/colors'

export function deleteCookie(name) {
  document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

export function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

export function buildDateText(date) {
  return `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`
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
export function getColorList(){
  return [
    Colors.blue500,
    Colors.orange500,
    Colors.yellow500,
    Colors.red500,
    Colors.indigo500,
    Colors.teal500,
    Colors.blueGrey500,
    Colors.brown500,
    Colors.grey500,
    Colors.grey900
  ]
}
export function openModal(element){
	$(element).modal()
}

export function closeModal(element){
	$(element).modal('hide')
}

export function getInitial(name){
  const splits = name.split(" ")
  var initial = ''
  splits.forEach((split)=>{
    initial+=split[0]   
  })
  return initial
}
