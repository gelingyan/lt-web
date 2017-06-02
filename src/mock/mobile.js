import Mock from 'mockjs'
const baseUrl = 'api/m/'

// 查询用户列表或管理员 详情
Mock.mock(new RegExp(baseUrl + 'UserList'), 'post', response => {
  return Mock.mock({
    meta: {
      code: '10000',
      message: '请求用户详情成功'
    },
    data: {
      page: {
        pageIndex: 1,
        pageSize: Mock.mock('@integer(1, 25)'),
        pageCount: Mock.mock('@integer(1, 25)')
      },
      'users|1-20': [
        {
          userID: Mock.mock('@cname'),
          name: Mock.mock('@cname'),
          account: Mock.mock('@id'),
          'organizationName|1-20': [
            {
              name: Mock.mock('@cname')
            }
          ],
          descripe: Mock.mock('@csentence(20)')
        }
      ]
    }
  })
})

