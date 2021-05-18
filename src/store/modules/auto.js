
const state = {
  comList: [], // 组件集合
  uuid: 0,
  currentCom: {}
}
const getters = {
  gettersComList: state.comList,
  currentCom: state.currentCom
}
const actions = {
  // 添加组件
  addComponents ({ commit }, data) {
    commit('addComponentM', data)
  },
  // 当前编辑组件
  setCurrenUuid ({ commit }, uuid) {
    commit('setCurrenUuidM', uuid)
  },
  // 删除组件
  delComponent ({ commit }, data) {
    commit('delComponentM', data)
  }
}
const mutations = {
  delComponentM (state, data) {
    debugger
    const delFn = (list, uuid) => {
      let com = null
      list.map((item, index) => {
        if (item.uuid === uuid) {
          return item
        } else {
          if (item.propsAttr.rows.columns.length && item.propsAttr.rows) {
            item.propsAttr.rows.columns.map((i, d) => {
              delFn(i.list, uuid)
            })
          }
        }
        return com
      })
      // console.log(delFn())
      // list.filter((item, index) => {
      //   debugger
      //   if (item.propsAttr.rows.columns.length) {
      //     item.propsAttr.rows.columns.map((x, i) => {
      //       debugger
      //       delFn(item.propsAttr.rows.columns.list)
      //     })
      //   } else {
      //     return item.uuid !== uuid
      //   }
      // })
    }
    console.log(delFn(state.comList, data.uuid))
    // if (res.length === 0 || state.currentCom.uuid === data.uuid) {
    //   state.currentCom = []
    // }
    // state.comList = res
  },
  addComponentM (state, data) {
    state.uuid = data.uuid
    state.currentCom = data
    state.comList.push(data)
  },
  setCurrenUuidM (state, uuid) {
    state.uuid = uuid
    state.currentCom = state.comList.find((x) => {
      return x.uuid === uuid
    })
  }
}
export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
