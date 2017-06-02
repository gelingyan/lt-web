<template>
  <div class="message">
    <header class="header">
      <jk-top-menu :title="title"></jk-top-menu>
      <jk-tabs @selectChanged="selectChanged" :items="tabItems"></jk-tabs>
    </header>
    <div class="content">
      <!-- tab-container -->
      <mt-tab-container v-model="navSelected">
        <mt-tab-container-item id="1">
          <!--加载-->
          <mt-loadmore :top-method="loadTop"
                       :bottom-method="loadBottom"
                       :bottom-all-loaded="allLoaded"
                       @bottom-status-change="handleBottomChange"
                       ref="loadmore">
            <ul class="margin-b">
              <li v-for="(user,index) in userList">
                <mt-cell :title="index +' '+ user.name" />
              </li>
            </ul>
            <div slot="bottom" class="mint-loadmore-bottom">
              <span v-show="bottomStatus === 'pull'">上拉加载</span>
              <span v-show="bottomStatus === 'drop'">释放加载</span>
              <span v-show="bottomStatus === 'loading'">loading……</span>
            </div>
          </mt-loadmore>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <template v-for="n in 6">
            <mt-cell :title="'content ' + n" />
          </template>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>

<script>
  import api from '../../../api'
  export default {
    components: {
      'jk-top-menu': require('../common/top-menu.vue'),
      'jk-tabs': require('../common/tabs.vue')
    },
    props: {
    },
    data () {
      return {
        title: '发现',
        navSelected: '1',
        tabItems: [
          {id: '1', title: '未处理消息'},
          {id: '2', title: '已处理消息'}
        ],
        allLoaded: false,
        bottomStatus: '',
        userList: [],
        pageCount: 1, // 总页数
        pageIndex: 1 // 当前页数
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.getData()
      })
    },
    methods: {
      selectChanged (selected) {
         this.navSelected = selected
      },
      getData () {
        const params = {
          pageIndex: this.pageIndex,
          PageSize: this.pageSize
        }
        api.getUserList(params).then((res) => {
          if (res.status === 200) {
            var list = res.data.data.users
            if (list.length >= 1) {
              for (var i = 0; i < list.length; i++) {
                this.userList.push(list[i])
              }
            } else {
              this.allLoaded = true // 若数据已全部获取完毕
            }
          }
        }, (rej) => {
          this.$toast('网络请求失败')
          console.log(rej)
        })
      },
      loadTop () {
        this.$refs.loadmore.onTopLoaded()
      },
      loadBottom () {
        this.getData()
        this.$refs.loadmore.onBottomLoaded()
      },
      handleBottomChange (status) {
        this.bottomStatus = status
      }
    }
  }
</script>

<style lang="scss" scoped>
  .message{
    .content{
      padding-top: 89px;
    }
  }
</style>
