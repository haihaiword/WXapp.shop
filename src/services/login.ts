import type { LoginResult } from '@/types/member'
import { http } from '@/utils/http'
type LoginParans = {
  //请求参数
  code: string
  encryptedData: string
  iv: string
}
export const postLoginWxMinAPI = (data: LoginParans) => {
  return http<LoginResult>({
    method: 'POST',
    url: '/login/wxMin',
    data,
  })
}
//小程序登录模拟板

export const postLoginWxMinSimpleAPI = (phoneNumber: string) => {
  return http<LoginResult>({
    method: 'POST',
    url: '/login/wxMin/simple',
    data: {
      phoneNumber,
    },
  })
}
