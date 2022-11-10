const getObjPropByVar = function(object, path){
    return path.split('.').reduce ( (res, prop) => res[prop], object );
}
export default getObjPropByVar;