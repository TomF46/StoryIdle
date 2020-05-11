import Vue from 'vue'
 

const alertService = {
    notification(type, title, message){
        Vue.notify({
          group: 'notify',
          type: type,
          title: title,
          text: message
        });
    }
}

export default alertService;