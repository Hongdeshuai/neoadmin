import axios from "axios";

const baseURL = "http://51.91.11.13:4000/api/v1/admin";
const adminHeader = {
    headers: {
        "authorization": 'admin'
    }
}
// const baseURL = "http://localhost:4000/api/v1/admin";
export default {
    // Saves a book to the database
    login: function (user) {
        return axios.post(baseURL + "/login", user, { headers: { "authorization": "admin" } });
    },

    register: function (user) {
        return axios.post(baseURL + "/signup", user);
    },

    assignUser: function (user) {
        return axios.post(baseURL + "/assign_user", user, { headers: { "authorization": "admin" } });
    },

    readNews: function () {
        return axios.get(baseURL + "/read_news", { headers: { "authorization": "admin" } });
    },

    publishNews: function (data) {
        return axios.post(baseURL + "/publish_news", { content: data }, { headers: { "authorization": "admin" } });
    },

    deleteNews: function (data) {
        return axios.get(baseURL + "/delete_news?id=" + data, { headers: { "authorization": "admin" } });
    },

    getUsers: function (token) {
        return axios.get(baseURL + "/users", {
            headers: {
                "authorization": token
            }
        });
    },

    approve: function (data) {
        return axios.get(baseURL + `/users/approve?email=${data.email}&state=${data.state}`, {
            headers: {
                "authorization": 'admin'
            }
        });
    },
    /////////////////////////////////////// === FAQ === //////////////////////////////////////////////
    getFaq: function () {
        return axios.get(baseURL + `/get_faqs`, {
            headers: {
                "authorization": 'admin'
            }
        });
    },
    deleteFaqFolder: function (id) {
        return axios.get(baseURL + `/delete_faq_folder?id=${id}`, {
            headers: {
                "authorization": 'admin'
            }
        });
    },
    deleteFaq: function (folder_id, qa_id) {
        return axios.get(baseURL + `/delete_faq?folder_id=${folder_id}&qa_id=${qa_id}`, {
            headers: {
                "authorization": 'admin'
            }
        });
    },
    createFaqFolder: function (name) {
        return axios.get(baseURL + `/create_faq_folder?name=${name}`, {
            headers: {
                "authorization": 'admin'
            }
        });
    },
    createFaqFile: function (data) {
        return axios.post(baseURL + `/create_faq`, data, {
            headers: {
                "authorization": 'admin'
            }
        });
    },




    getMaterial: function (flag) {
        return axios.get(baseURL + `/get_materials?type=${flag}`, {
            headers: {
                "authorization": 'admin'
            }
        });
    },

    createMaterialFolder: function (name, type) {
        return axios.get(baseURL + `/create_material_folder?name=${name}&type=${type}`, {
            headers: {
                "authorization": 'admin'
            }
        });
    },

    deleteMaterialFolder: function (id) {
        return axios.get(baseURL + `/delete_material_folder?id=${id}`, {
            headers: {
                "authorization": 'admin'
            }
        });
    },
    createMaterialFile: function (data) {
        return axios.post(baseURL + `/create_material`, data, {
            headers: {
                "authorization": 'admin'
            }
        });
    },

    deleteMaterial: function (folder_id, mat_id) {
        return axios.get(baseURL + `/delete_material?folder_id=${folder_id}&mat_id=${mat_id}`, adminHeader);
    },


    /////////////////////////============= Material ends ============////////////////////////////////////////////

    ////////////////////////==============Codigi Exam================///////////////////////////////////////////
    readCodigoExam: function () {
        return axios.get(baseURL + `/read_codigo_exam`, adminHeader);
    },

    deleteCodigo: function (id) {
        return axios.get(baseURL + `/delete_codigo_exam?id=${id}`, adminHeader);
    },
    uploadCodigo: function (file) {
        let form = new FormData()
        form.append('file', file, 'tmp.csv')
        return axios.post(baseURL + '/upload_codigo_exam', form, { headers: { 'Content-Type': 'multipart/form-data', 'authorization': "admin" } })
    },
    createNewCodigoQA: function (data) {
        return axios.post(baseURL + '/create_codigo_exam', data, adminHeader)
    },
    //////////////////////////////////English ///////////////////////////////////////////////////
    readEnglishExam: function () {
        return axios.get(baseURL + `/read_english_exam`, adminHeader);
    },

    deleteEnglish: function (id) {
        return axios.get(baseURL + `/delete_english_exam?id=${id}`, adminHeader);
    },
    uploadEnglish: function (file) {
        let form = new FormData()
        form.append('file', file, 'tmp.csv')
        return axios.post(baseURL + '/upload_english_exam', form, { headers: { 'Content-Type': 'multipart/form-data', 'authorization': "admin" } })
    },
    createNewCodigoQA: function (data) {
        return axios.post(baseURL + '/create_english_exam', data, adminHeader)
    },
    /////////////////////////////////////Ortograf//////////////////////////////////////////////
    readOrtografExam: function () {
        return axios.get(baseURL + `/read_ortograf_exam`, adminHeader);
    },

    deleteOrtograf: function (id) {
        return axios.get(baseURL + `/delete_ortograf_exam?id=${id}`, adminHeader);
    },

    uploadOrtograf: function (file) {
        let form = new FormData()
        form.append('file', file, 'tmp.csv')
        return axios.post(baseURL + '/upload_ortograf_exam', form, { headers: { 'Content-Type': 'multipart/form-data', 'authorization': "admin" } })
    },

    createNewOrtografQA: function (data) {
        return axios.post(baseURL + '/create_ortograf_exam', data, adminHeader)
    },

    ////////////////////////////////////////////Psico////////////////////////////////////
    readPsicoExam: function () {
        return axios.get(baseURL + `/read_psico_exam`, adminHeader);
    },

    deletePsico: function (id) {
        return axios.get(baseURL + `/delete_psico_exam?id=${id}`, adminHeader);
    },
    
    createNewPsicoQA: function (data) {
        return axios.post(baseURL + '/create_psico_exam', data, adminHeader)
    },
};
