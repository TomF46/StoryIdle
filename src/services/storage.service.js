import localForage from 'localforage';

const localStorage = {
    get(key){
        return localForage.getItem(key);
    },
    set(key, value){
        return localForage.setItem(key, value);
    },
    remove(key){
        return localForage.removeItem(key);
    },
    removeAll(){
        return localForage.clear();
    }
}

export default localStorage;