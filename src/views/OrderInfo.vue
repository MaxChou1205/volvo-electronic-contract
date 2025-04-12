<template>
  <div class="flex h-screen flex-col">
    <OrderHeader />
    <main class="overflow-auto">
      <div class="p-[30px]">
        <div
          class="grid w-full gap-y-11 rounded-[10px] bg-white px-10 py-12"
          v-if="orderDetail"
        >
          <div>
            <div class="text-14px mb-4 text-center leading-relaxed font-bold">
              客戶資料
            </div>
            <div class="grid gap-y-4">
              <div class="grid grid-cols-3 gap-x-[10%] gap-y-4">
                <Field
                  :label="'客戶姓名'"
                  :content="orderDetail.customerName"
                ></Field>
                <Field
                  :label="'證件號碼'"
                  :content="orderDetail.customerCertificateNo"
                ></Field>
                <Field
                  :label="'手機號碼'"
                  :content="orderDetail.customerTel"
                ></Field>
                <Field :label="'城市'" :content="orderDetail.cityName"></Field>
                <Field
                  :label="'區域'"
                  :content="orderDetail.districtName"
                ></Field>
              </div>
              <div class="grid grid-cols-1 gap-y-4">
                <Field
                  :label="'聯繫地址'"
                  :content="orderDetail.customerAddress"
                ></Field>
              </div>
            </div>
          </div>
          <div>
            <div class="text-14px mb-4 text-center leading-relaxed font-bold">
              訂單資訊
            </div>
            <div class="grid grid-cols-3 gap-x-[10%] gap-y-4">
              <Field
                :label="'銷售顧問'"
                :content="orderDetail.consultant"
              ></Field>
              <Field
                :label="'紙本簽約編號'"
                :content="orderDetail.contractNo"
              ></Field>
              <Field
                :label="'訂單類型'"
                :content="orderDetail.orderType"
              ></Field>
              <Field :label="'訂單編號'" :content="orderDetail.orderNo"></Field>
              <Field
                :label="'預計交車時間'"
                :content="`${orderDetail.deliveringDateLabel}`"
              ></Field>
              <Field
                :label="'訂單狀態'"
                :content="orderDetail.orderStatus"
              ></Field>
              <Field
                :label="'行銷活動'"
                :content="orderDetail.activityName"
              ></Field>
              <Field :label="'車型'" :content="orderDetail.modelName"></Field>
              <Field
                :label="'年款'"
                :content="orderDetail.modelYearName"
              ></Field>
              <Field
                :label="'配置'"
                :content="orderDetail.modelConfigName"
              ></Field>
              <Field
                :label="'外色'"
                :content="orderDetail.modelColorName"
              ></Field>
              <Field
                :label="'內飾'"
                :content="orderDetail.modelTrimName"
              ></Field>
              <Field
                :label="'選裝包'"
                :content="orderDetail.modelOptionNames"
              ></Field>
              <Field
                :label="'是否需安裝充電樁'"
                :content="orderDetail.isChargingPile ? '是' : '否'"
              ></Field>
              <Field
                :label="'建議售價'"
                :content="orderDetail.vehicleRetailAllAmount?.toLocaleString()"
              ></Field>
              <Field :label="'VIN'" :content="orderDetail.vin"></Field>
              <Field
                :label="'定金'"
                :content="orderDetail.contractEarnest"
              ></Field>
              <Field
                :label="'定金支付憑證'"
                :content="orderDetail.depositsUrls?.[0]?.name"
                :link="orderDetail.depositsUrls?.[0]?.url"
              ></Field>
            </div>
          </div>
          <div>
            <div class="text-14px mb-4 text-center leading-relaxed font-bold">
              買受資訊
            </div>
            <div class="grid grid-cols-3 gap-x-[10%] gap-y-4">
              <Field
                :label="'購買類型'"
                :content="orderDetail.customerTypeLabel"
              ></Field>
              <Field
                :label="'買受人'"
                :content="orderDetail.drawerName"
              ></Field>
              <Field
                :label="'買受人電話'"
                :content="orderDetail.drawerTel"
              ></Field>
              <Field
                :label="'證件號碼'"
                :content="orderDetail.drawerCertificateNo"
              ></Field>
            </div>
          </div>
          <div>
            <div class="text-14px mb-4 text-center leading-relaxed font-bold">
              付款資訊
            </div>
            <div class="grid grid-cols-3 gap-x-[10%] gap-y-4">
              <Field :label="'付款方式'" :content="orderDetail.payMode"></Field>
              <Field
                :label="'首付金額'"
                :content="orderDetail.initialPayment"
              ></Field>
              <Field
                :label="'貸款金額'"
                :content="orderDetail.loanAmounts"
              ></Field>
              <Field
                :label="'貸款期限'"
                :content="orderDetail.loanTerm"
              ></Field>
              <Field
                :label="'定金支付方式'"
                :content="orderDetail.depositPayWay"
              ></Field>
              <Field
                :label="'是否現金支票'"
                :content="orderDetail.isCashCheckLabel"
              ></Field>
              <Field
                :label="'支票付款人名稱(商號)'"
                :content="orderDetail.checkPayerName"
              ></Field>
              <Field
                :label="'支票日期'"
                :content="orderDetail.checkDateLabel"
              ></Field>
              <Field
                :label="'付款地銀行名稱'"
                :content="orderDetail.paymentBankName"
              ></Field>
              <Field
                :label="'轉帳銀行名稱'"
                :content="orderDetail.transferBankName"
              ></Field>
              <Field
                :label="'銀行帳戶末五碼'"
                :content="orderDetail.lastFiveBankAccount"
              ></Field>
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
                  :content="orderDetail.depositsUrls?.[0]?.name"
                  :link="orderDetail.depositsUrls?.[0]?.url"
                ></Field>
              </div>
              <div class="grid grid-cols-1 gap-x-[10%] gap-y-4">
                <Field :label="'備註'">
                  <div
                    class="min-h-25 rounded-[8px] bg-gray-100 px-3 py-2 text-sm text-gray-800"
                  >
                    {{ orderDetail.remark }}
                  </div>
                </Field>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap justify-center gap-x-[10%] gap-y-4">
            <RouterLink
              class="h-auto w-full max-w-[250px] rounded-[8px] bg-gray-500 py-4 text-center text-lg text-white"
              :to="{ name: 'order' }"
            >
              <span>返回</span>
            </RouterLink>
            <RouterLink
              class="bg-blue-brand h-auto w-full max-w-[250px] rounded-[8px] py-4 text-center text-lg text-white"
              :to="{ name: 'modelStyle' }"
            >
              <span>成立合約</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import Field from "@/components/order/Field.vue";
import OrderHeader from "@/components/order/OrderHeader.vue";
import { useOrderStore } from "@/stores/orderStore";

const route = useRoute();
const orderStore = useOrderStore();
const orderDetail = computed(() => orderStore.orderDetailView);

const id = route.params.id as string;

onMounted(() => {
  orderStore.getOrderDetail(id);
});
</script>

<style scoped></style>
