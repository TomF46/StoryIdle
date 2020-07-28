import Vue from 'vue'
 

const alertService = {
    notification(type, title, message){
        Vue.notify({
          group: 'notify',
          type: type,
          title: title,
          text: message
        });
    },
    dialog(title, text){
      Vue.prototype.$modal.show('dialog', {
        title: title,
        text: text,
        buttons: [
          {
            title: 'Ok'
          }
       ]
      });
    }
}

export default alertService;