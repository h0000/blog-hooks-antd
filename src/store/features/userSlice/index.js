import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { message } from "antd"
import { login as fetchLogin, register as fetchRegister } from '../../../api'

// 登录
export const login = createAsyncThunk('user/login', async (form) => {
  const res = await fetchLogin(form)
  return res // 此处的返回结果会在 .fulfilled中作为payload的值
})
// 注册
export const register = createAsyncThunk('user/register', async (form) => {
  const res = await fetchRegister(form)
  return res // 此处的返回结果会在 .fulfilled中作为payload的值
})

const userSlice = createSlice({
  name: 'user',
  initialState: () => {
    const userInfo = localStorage.getItem('userInfo')
    if (userInfo) {
      return { userInfo: JSON.parse(userInfo) }
    }
    return {
      userInfo: {
        id: null,
        name: '',
        role: null
      }
    }
  },
  reducers: {
    // 登出
    loginOut: (state) => {
      state.userInfo = {
        id: null,
        name: '',
        role: null
      }
      localStorage.setItem('userInfo', null)
    }
  },
  extraReducers: {
    [login.fulfilled] (state, { payload }) {
      if (payload.flag && payload.data) {
        state.userInfo = payload.data
        localStorage.setItem('userInfo', JSON.stringify(payload.data))
        message.success('登录成功！')
      } else {
        message.error('账号或密码错误！')
      }
    },
    [login.rejected] (state, { payload }) {
      message.error('账号或密码错误！')
    },
    [register.fulfilled] (state, { payload }) {
      if (payload.flag && payload.user) {
        state.userInfo = payload.user
        localStorage.setItem('userInfo', JSON.stringify(payload.user))
        message.success(`昵称‘${payload.user?.name}’注册成功，并已使用该账号登录本博客！`)
      } else {
        message.error('注册失败！')
      }
    },
    [register.rejected] (state, { payload }) {
      message.error('注册失败！')
    },
  }
})

export default userSlice.reducer
export const { loginOut } = userSlice.actions