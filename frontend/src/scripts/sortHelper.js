function swap(array,pos1,pos2){
    var tmp = array[pos1];
    array[pos1] = array[pos2];        
    array[pos2] = tmp;
}

export { swap };