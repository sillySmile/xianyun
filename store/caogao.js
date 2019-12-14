//声明数据
export const state = () => ({
    caoInfo: []
})
//增加草稿
export const mutations = {
    //增加草稿
    addCao(state, data) {
        state.caoInfo.push(data)
    },
    //删除草稿
    delCao(state, data) {
        state.caoInfo.splice(data, 1)
    }
}
