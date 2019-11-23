import axios from "axios";

const baseURL = "http://51.91.11.13:4000/api/v1/admin";

// const baseURL = "http://localhost:4000/api/v1/admin";
export default {
    // Saves a book to the database
    login: function(user) {
        return axios.post(baseURL + "/login", user,{headers:{"authorization":"admin"}});
    },

    register: function(user) {
        return axios.post(baseURL + "/signup", user);
    },

    assignUser: function(user) {
        return axios.post(baseURL + "/assign_user", user,{headers:{"authorization":"admin"}});
    },
    
    readNews: function() {
        return axios.get(baseURL + "/read_news",{headers:{"authorization":"admin"}});
    },

    publishNews: function(data) {
        return axios.post(baseURL + "/publish_news",{content:data},{headers:{"authorization":"admin"}});
    },
    
    deleteNews: function(data) {
        return axios.get(baseURL + "/delete_news?id="+data,{headers:{"authorization":"admin"}});
    },

    getUsers: function(token) {
        return axios.get(baseURL + "/users", {headers:{
            "authorization": token
        }});
    },
    
    approve:function(data){
        return axios.get(baseURL + `/users/approve?email=${data.email}&state=${data.state}`,{headers:{
            "authorization":'admin'
        }});
    },
/////////////////////////////////////// === FAQ === //////////////////////////////////////////////
    getFaq:function(){
        return axios.get(baseURL + `/get_faqs`,{headers:{
            "authorization":'admin'
        }});
    },
    deleteFaqFolder:function(id){
        return axios.get(baseURL + `/delete_faq_folder?id=${id}`,{headers:{
            "authorization":'admin'
        }});
    },
    deleteFaq:function(folder_id, qa_id){
        return axios.get(baseURL + `/delete_faq?folder_id=${folder_id}&qa_id=${qa_id}`,{headers:{
            "authorization":'admin'
        }});
    },
    createFaqFolder:function(name){
        return axios.get(baseURL + `/create_faq_folder?name=${name}`,{headers:{
            "authorization":'admin'
        }});
    },
    createFaqFile:function(data){
        return axios.post(baseURL + `/create_faq`,data,{headers:{
            "authorization":'admin'
        }});
    },
   



    getMaterial:function(flag){
        return axios.get(baseURL + `/get_materials?type=${flag}`,{headers:{
            "authorization":'admin'
        }});
    },

    createMaterialFolder : function(name, type){
        return axios.get(baseURL + `/create_material_folder?name=${name}&type=${type}`,{headers:{
            "authorization":'admin'
        }});
    },

    deleteMaterialFolder:function(id){
        return axios.get(baseURL + `/delete_material_folder?id=${id}`,{headers:{
            "authorization":'admin'
        }});
    },
    createMaterialFile:function(data){
        return axios.post(baseURL + `/create_material`,data,{headers:{
            "authorization":'admin'
        }});
    },

    deleteMaterial:function(folder_id, mat_id){
        return axios.get(baseURL + `/delete_material?folder_id=${folder_id}&mat_id=${mat_id}`,{headers:{
            "authorization":'admin'
        }});
    },

    
/////////////////////////============= Material ends ============////////////////////////////////////////////
    getInvoices: function(token) {
        return axios.get(baseURL + "/listInvoices", {headers:{
            "authorization": token
        }});
    },

    getBorrowRequests: function(token) {
        return axios.get(baseURL + "/getBorrowRequests", {headers:{
            "authorization":token
        }});
    },

    verifyAdmin: function(data) {
        return axios.get(baseURL + "/verifyAdmin"+data);
    },

  

    sendMail:function(email,message){
        return axios.post(baseURL + "/sendMail", {email:email,message:message});
    },

    deleteUser: function(data) {
        return axios.post(baseURL + "/deleteUser", data);
    },

    deleteRequest: function(req_id){
        return axios.get(baseURL + "/deleteBorrowRequest?id=" + req_id)
    },
    listInvoices: function(){

    },
    getDocuments: function(data) {
        return axios.post(baseURL + "/getDocuments", data);
    },

    deleteDocument: function(data) {
        return axios.post(baseURL + "/documents/deleteDocument", data);
    },

    signBorrowDocument: function(id){
        return axios.get(baseURL + "/signBorrowDocument?id=" + id)
    },

    previewBorrowDocument: function(id){
        return axios.get(baseURL + "/previewBorrowDocument?id=" + id)
    },

    getDebtRequests: function(token){
        return axios.get(baseURL + "/getDebtRequests", {headers:{
            "authorization":token
        }});
    },
    //getFactoringRequests
    getFactoringRequests: function(token){
        return axios.get(baseURL + "/getFactoringRequests", {headers:{
            "authorization":token
        }});
    },

    getAnInvoice: function(token,invoice_id,access_token, is_manual, req_id, type){
        return axios.get(baseURL + "/getAnInvoice?invoice_id="+invoice_id+"&access_token="+access_token+"&is_manual="+is_manual+"&req_id="+req_id+"&type="+type, {headers:{
            "authorization":token
        }});
    },

    signDebtDocument: function(token,para){
        return axios.post(baseURL + "/signDebtDocument", para ,{headers:{
            "authorization":token
        }})
    },

    previewDebtDocument: function(id){
        return axios.get(baseURL + "/previewDebtDocument?id=" + id)
    },

    signFactoringDocument: function(token,para){
        return axios.post(baseURL + "/signFactoringDocument", para ,{headers:{
            "authorization":token
        }})
    },

    previewFactoringDocument: function(id){
        return axios.get(baseURL + "/previewFactoringDocument?id=" + id)
    },

    signRealFactoringDocument: function(token,para){
        return axios.post(baseURL + "/signRealFactoringDocument", para ,{headers:{
            "authorization":token
        }})
    },

    previewRealFactoringDocument: function(id){
        return axios.get(baseURL + "/previewRealFactoringDocument?id=" + id)
    },

    getRealFactoringRequests: function(token){
        return axios.get(baseURL + "/getRealFactoringRequests", {headers:{
            "authorization":token
        }});
    },
};
