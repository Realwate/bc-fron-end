

function save(value) {
  if(value == null){
    throw new Error("参数为空!");
  }
  if(Object.prototype.toString.call(value) === "[object Object]"){
    value = JSON.stringify(value);
  }
  if(Object.prototype.toString.call(value) !== "[object Array]"){
    value = [value];
  }


  var blob = new Blob(value, {type : 'application/json',endings:"transparent"});
  var url = URL.createObjectURL(blob);

  var anchor = document.createElement('a');
  anchor.style.visibility = "hidden";
  anchor.href = url;
  anchor.download = "config";
  document.body.appendChild(anchor);

  var evt = document.createEvent("MouseEvents");
  evt.initEvent("click", true, true);
  anchor.dispatchEvent(evt);
  document.body.removeChild(anchor);
}
function load(file,encoding){

  if(!file)
    return;
  encoding = encoding || "utf-8";
  return new Promise(function(resolve,reject){
    var reader = new FileReader();
    reader.onload = function(e){
      try {
        var obj = JSON.parse(e.target.result);

        resolve(obj);
      }
      catch(e){
        reject(e);
      }
    };
    reader.readAsText(file,encoding);
  })
}

export default {
  load,
  save
}
