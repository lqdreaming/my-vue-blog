import Vuex from 'vuex'
Vue.use(Vuex)

const vuex_store = new Vuex.Store({
    state:{
        user_name:"",
        newslist:[]
    },
    mutations: {
        showUserName (state) {
            alert(state.user_name)
        }
    },
    getters: {
        getNews (state) {
            return state.newslist.filter(function (news) {
                return !news.isdeleted
            })
        }
    }
})