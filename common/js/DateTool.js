export function locatimeStrFormat(locatimestr,format="yyyy-MM-dd HH:mm:ss"){
	var d = new Date(locatimestr);
	var datetime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds(); 
	return datetime;
}