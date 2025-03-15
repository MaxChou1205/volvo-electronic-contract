<template>
  <div class="flex h-screen flex-col">
    <OrderHeader />
    <main class="overflow-auto">
      <div class="p-[30px]">
        <div class="grid w-full gap-y-11 rounded-[10px] bg-white px-10 py-12">
          <div>
            <div class="text-14px mb-4 text-center leading-relaxed font-bold">
              客戶資料
            </div>
            <div class="grid gap-y-4">
              <div class="grid grid-cols-3 gap-x-[10%] gap-y-4">
                <Field :label="'客戶姓名'" :content="'Alan Liu'"></Field>
                <Field :label="'證件號碼'" :content="'A123456789'"></Field>
                <Field :label="'手機號碼'" :content="'0919123456'"></Field>
                <Field :label="'城市'" :content="'新北市'"></Field>
                <Field :label="'區域'" :content="'信義區'"></Field>
              </div>
              <div class="grid grid-cols-1 gap-y-4">
                <Field
                  :label="'聯繫地址'"
                  :content="'忠孝東路4段560號13樓'"
                ></Field>
              </div>
            </div>
          </div>
          <div>
            <div class="text-14px mb-4 text-center leading-relaxed font-bold">
              訂單資訊
            </div>
            <div class="grid grid-cols-3 gap-x-[10%] gap-y-4">
              <Field :label="'銷售顧問'" :content="'Label'"></Field>
              <Field :label="'紙本簽約編號'" :content="'0919123456'"></Field>
              <Field :label="'訂單類型'" :content="'0EC 訂單'"></Field>
              <Field :label="'訂單編號'" :content="'20250107A001'"></Field>
              <Field
                :label="'預計交車時間'"
                :content="`yyyy/mm/dd hh:mm`"
              ></Field>
              <Field :label="'訂單狀態'" :content="'草稿'"></Field>
              <Field :label="'行銷活動'" :content="'Label'"></Field>
              <Field :label="'車型'" :content="'Label'"></Field>
              <Field :label="'年款'" :content="'Label'"></Field>
              <Field :label="'配置'" :content="'Label'"></Field>
              <Field :label="'外色'" :content="'Label'"></Field>
              <Field :label="'內飾'" :content="'Label'"></Field>
              <Field :label="'選裝包'" :content="'Label'"></Field>
              <Field :label="'是否需安裝充電樁'" :content="'Label'"></Field>
              <Field :label="'建議售價'" :content="'3,200,000'"></Field>
              <Field :label="'VIN'" :content="'Label'"></Field>
              <Field :label="'定金'" :content="'Label'"></Field>
              <Field
                :label="'定金支付憑證'"
                :content="'文件名稱.jpg（文字連結）'"
              ></Field>
            </div>
          </div>
          <div>
            <div class="text-14px mb-4 text-center leading-relaxed font-bold">
              買受人資訊
            </div>
            <div class="grid grid-cols-3 gap-x-[10%] gap-y-4">
              <Field :label="'購買類型'" :content="'Label'"></Field>
              <Field :label="'買受人'" :content="'Label'"></Field>
              <Field :label="'買受人電話'" :content="'0919123456'"></Field>
              <Field :label="'證件號碼'" :content="'20250107A001'"></Field>
            </div>
          </div>
          <div>
            <div class="text-14px mb-4 text-center leading-relaxed font-bold">
              付款資訊
            </div>
            <div class="grid grid-cols-3 gap-x-[10%] gap-y-4">
              <Field :label="'付款方式'" :content="'Label'"></Field>
              <Field :label="'首付金額'" :content="'1,200,000'"></Field>
              <Field :label="'貸款金額'" :content="'1,00,000'"></Field>
              <Field :label="'貸款期限'" :content="'12 期'"></Field>
              <Field :label="'定金支付方式'" :content="'Label'"></Field>
              <Field :label="'是否現金支票'" :content="'是'"></Field>
              <Field :label="'支票付款人名稱(商號)'" :content="'Label'"></Field>
              <Field :label="'支票日期'" :content="'yyyy/mm/dd'"></Field>
              <Field :label="'付款地銀行名稱'" :content="'Label'"></Field>
              <Field :label="'轉帳銀行名稱'" :content="'Label'"></Field>
              <Field :label="'銀行帳戶末五碼'" :content="'00000'"></Field>
            </div>
          </div>
          <div>
            <div class="text-14px mb-4 text-center leading-relaxed font-bold">
              上傳文件
            </div>
            <div class="grid gap-y-4">
              <div class="grid grid-cols-2 gap-x-[10%] gap-y-4">
                <Field
                  :label="'上傳檔案'"
                  :content="'文件名稱.jpg（文字連結）'"
                ></Field>
              </div>
              <div class="grid grid-cols-1 gap-x-[10%] gap-y-4">
                <Field :label="'備註'">
                  <div
                    class="min-h-25 rounded-[8px] bg-gray-100 px-3 py-2 text-sm text-gray-800"
                  >
                    {{ "內容顯示" }}
                  </div>
                </Field>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap justify-center gap-x-[10%] gap-y-4">
            <button
              class="h-auto w-full max-w-[250px] rounded-[8px] bg-gray-500 py-4 text-lg text-white"
            >
              <span>返回</span>
            </button>
            <button
              class="bg-blue-brand h-auto w-full max-w-[250px] rounded-[8px] py-4 text-lg text-white"
            >
              <span>成立合約</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import Field from "@/components/order/Field.vue";
import OrderHeader from "@/components/order/OrderHeader.vue";
</script>

<style scoped></style>
