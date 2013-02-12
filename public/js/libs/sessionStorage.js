define([
],function(){
  
  var save = function(key,value){
    var item;
    switch(typeof(value)){
      case 'object':
        item = JSON.stringify(value);
      break;
      default :
        item = JSON.stringify({'value':value});
      break;

    }
    window.sessionStorage.setItem(key,item);
    return true;
  };
  var get = function(key){
    var result = window.sessionStorage.getItem(key);  
    if(result){
      result = JSON.parse(result);
    }else{
      result = {};
    }
    return result;
  };
  var clear = function(){
    window.sessionStorage.clear();
    return true;
  };
  return {
    get : get,
    clear : clear,
    save : save
  };
});
