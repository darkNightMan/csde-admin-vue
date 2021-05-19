
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
    const delFn = (list, uuid) => {
      list.map((item, index) => {
        if (item.uuid === uuid) {
          list.splice(index, 1)
        } else {
          if (item.propsAttr.rows && item.propsAttr.rows) {
            item.propsAttr.rows.columns.map((i, d) => {
              delFn(i.list, uuid)
            })
          }
        }
      })
    }
    delFn(state.comList, data.uuid)
  },
  addComponentM (state, data) {
    state.uuid = data.uuid
    state.currentCom = data
    state.comList.push(data)
  },
  setCurrenUuidM (state, uuid) {
    let findCurrentCom = (list, uuid) => {
      list.map((item, index) => {
        if (item.uuid === uuid) {
          state.uuid = item.uuid
          state.currentCom = item
          return false
        } else {
          if (item.propsAttr.rows && item.propsAttr.rows) {
            item.propsAttr.rows.columns.map((i, d) => {
              findCurrentCom(i.list, uuid)
            })
          }
        }
      })
    }
    findCurrentCom(state.comList, uuid)
  }
}
export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
