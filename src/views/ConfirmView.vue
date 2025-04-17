<template>
  <div class="mx-auto max-w-screen-md">
    <div class="h-60 overflow-hidden">
      <img
        class="object-cover object-[0_-44px]"
        src="@/assets/img/banner2.png"
        alt="banner"
      />
    </div>

    <h1 class="mx-auto my-8 text-center text-[40px]">電子合約</h1>

    <Stepper :currentStep="4" />

    <div class="text-black-400 mt-8 px-15 pb-15">
      <div class="flex items-end justify-between">
        <h1 class="text-2xl tracking-[4px]">汽車訂購合約書</h1>
        <div class="text-sm font-light">合約編號：20230223458</div>
      </div>

      <hr class="divider" />

      <div class="mb-6 space-y-3">
        <div class="flex items-end text-xs font-light">
          買方：訂購人
          <span class="mx-2 text-base font-medium text-blue-500">{{
            form.order.customerName
          }}</span>
          / 約定掛牌名稱
          <span class="mx-2 text-base font-medium text-blue-500">{{
            form.order.drawerName
          }}</span>
          ，於西元
          <span class="mx-2 text-base font-medium text-blue-500">{{
            form.contractDate?.getFullYear() ?? "--"
          }}</span>
          年
          <span class="mx-2 text-base font-medium text-blue-500">{{
            form.contractDate ? form.contractDate.getMonth() + 1 : "--"
          }}</span>
          月
          <span class="mx-2 text-base font-medium text-blue-500">{{
            form.contractDate?.getDate() ?? "--"
          }}</span>
          日
        </div>
        <div>
          <div class="flex flex-1 gap-4">
            <div class="min-w-39 bg-gray-200 px-4 py-3">
              <div class="text-xs font-light">訂購人身分證字號</div>
              <div class="text-black-400 text-base font-medium">
                {{ form.order.customerCertificateNo }}
              </div>
            </div>
            <div class="min-w-39 bg-gray-200 px-4 py-3">
              <div class="text-xs font-light">主要聯絡電話（手機）</div>
              <div class="text-black-400 text-base font-medium">
                {{ form.order.drawerTel }}
              </div>
            </div>
            <div class="min-w-39 flex-1 bg-gray-200 px-4 py-3">
              <div class="text-xs font-light">常用聯絡 E-mail</div>
              <div class="text-black-400 text-base font-medium">
                {{ form.email }}
              </div>
            </div>
          </div>
          <div class="mt-4">
            <div class="min-w-39 bg-gray-200 px-4 py-3">
              <div class="text-xs font-light">掛牌戶籍地址</div>
              <div class="text-black-400 text-base font-medium">
                {{ form.order.cityName }}
                {{ form.order.districtName }}
                {{ form.order.customerAddress }}
              </div>
            </div>
          </div>
        </div>
        <div class="text-xs font-light tracking-wider">
          <div class="mb-2">
            向賣方{凱鋭汽車股份有限公司}訂購Volvo汽車一輛雙方約定交易如下：
          </div>
          <div>
            交付定金及簽約是契約生效要件,買方蒸聲明於簽立本契約時,簽名於下代表業以當場充份瞭解本契約内容(含背面條款)並同意賣方或其授權人得為行銷及提供售後服務之目的,万集處理及使用買方個人資料,且得與賣方之供應車商关係企業、策略聯盟之夥伴和賣方共同推動行銷事務之人交換個人資料。
          </div>
        </div>
      </div>

      <div>
        <div class="mb-3 grid grid-cols-2 gap-4">
          <div class="col-span-1 mr-6 bg-gray-200">
            <img
              class="block h-full w-full object-contain align-middle"
              src="@/assets/img/XC90.png"
              alt=""
            />
          </div>
          <div class="col-span-1 grid grid-cols-2 gap-4">
            <div>
              <div class="text-xs font-light">車型樣式</div>
              <div class="text-base font-medium text-blue-500">
                {{ form.order.modelName }}
              </div>
            </div>
            <div>
              <div class="text-xs font-light">年式</div>
              <div class="text-base font-medium text-blue-500">
                {{ form.order.modelYearName }}
              </div>
            </div>
            <div>
              <div class="text-xs font-light">車款動力</div>
              <div class="text-base font-medium text-blue-500">
                {{ form.order.modelConfigName }}
              </div>
            </div>
            <div>
              <div class="text-xs font-light">車色</div>
              <div class="text-base font-medium">
                {{ form.order.modelColorName }}
              </div>
            </div>
            <div>
              <div class="text-xs font-light">內裝</div>
              <div class="text-base font-medium">
                {{ form.order.modelTrimName }}
              </div>
            </div>
            <div>
              <div class="text-xs font-light">出廠年份</div>
              <div class="text-base font-medium text-blue-500">
                {{ form.factoryYear }}
              </div>
            </div>
            <div>
              <div class="text-xs font-light">CC數</div>
              <div class="text-base font-medium text-blue-500">
                {{ form.cc }}
              </div>
            </div>
            <div>
              <div class="text-xs font-light">產地</div>
              <div class="text-base font-medium">{{ form.origin }}</div>
            </div>
            <div>
              <div class="text-xs font-light">訂購類型</div>
              <div class="text-base font-medium text-blue-500">
                {{ form.isSpecific ? "特訂" : "標配" }}
              </div>
            </div>
          </div>
        </div>
        <div class="mb-3 flex gap-4">
          <div class="min-w-23 flex-1 bg-gray-200 px-4 py-3">
            <div class="text-xs font-light">門座</div>
            <div class="text-base font-medium">
              {{ form.door ?? 0 }} 門 {{ form.seat ?? 0 }} 人座
            </div>
          </div>
          <div class="min-w-23 flex-1 bg-gray-200 px-4 py-3">
            <div class="text-xs font-light">天窗</div>
            <div class="text-base font-medium">{{ form.sunroof }}</div>
          </div>
          <div class="min-w-23 flex-1 bg-gray-200 px-4 py-3">
            <div class="text-xs font-light">排檔</div>
            <div class="text-base font-medium">{{ form.gearShift }}</div>
          </div>
          <div class="min-w-23 flex-1 bg-gray-200 px-4 py-3">
            <div class="text-xs font-light">傳動</div>
            <div class="text-base font-medium">
              {{ form.transmission }}
            </div>
          </div>
        </div>

        <div class="mb-4 bg-gray-200 px-4 py-3">
          <div class="text-xs font-light">其他</div>
          <div class="text-base font-medium">
            {{ form.order.modelOptionNames?.join(",") }}
          </div>
        </div>
        <div class="bg-gray-200 px-4 py-3">
          <div class="text-xs font-light">備註</div>
          <div class="text-base font-medium"></div>
        </div>
      </div>

      <hr class="divider" />

      <div class="mb-6 grid grid-cols-2 gap-4">
        <div>
          <div class="text-xs font-light">購買方式</div>
          <div class="text-base font-medium">現金購車</div>
        </div>
        <div class="align-self-end text-end">
          <div class="text-xs font-light">建議售價(含營業稅)</div>
          <div class="text-base font-medium">
            新台幣 1,750,000 (含車色加價 30,000) 元
          </div>
        </div>
        <div>
          <div class="text-xs font-light">付款方式</div>
          <div class="text-base font-medium">{{ form.order.payMode }}</div>
        </div>
        <div class="align-self-end text-end">
          <div class="text-xs font-light">車輛成交價格(含營業稅)</div>
          <div class="text-base font-medium text-blue-500">
            新台幣 1,389,600 元
          </div>
        </div>
        <div>
          <div class="text-xs font-light">票號</div>
          <div class="text-base font-medium">{{ form.cashCheckNo }}</div>
        </div>
        <div class="align-self-end text-end">
          <div class="text-xs font-light">實收定金</div>
          <div class="text-base font-medium">
            新台幣 {{ form.order.contractEarnest?.toLocaleString() }} 元
          </div>
        </div>
        <div>
          <div class="text-xs font-light">付款行庫｜分行｜帳號</div>
          <div class="text-base font-medium">
            {{
              `${form.order.paymentBankName} ${form.order.transferBankName} ${form.order.lastFiveBankAccount}`
            }}
          </div>
        </div>
        <div class="align-self-end text-end">
          <div class="text-xs font-light">尾款金額</div>
          <div class="text-base font-medium text-blue-500">
            新台幣 1,000,000 元
          </div>
        </div>
      </div>

      <div class="mb-6 space-y-2 bg-gray-200 px-4 py-3">
        <div class="text-base font-medium">貸款約定事項</div>
        <p class="text-sm font-light">
          買方委辦貸款<span class="mx-2 text-base font-medium text-blue-500"
            >100</span
          >元
          <span class="mx-2 text-base font-medium text-blue-500">84</span
          >期，年利率
          <span class="mx-2 text-base font-medium text-blue-500">3.5</span>％
        </p>
        <p class="text-sm font-light">
          若銀行核貸時總貼息費用超過責方承諾利息補貼金額新台幣<span
            class="mx-2 text-base font-medium text-blue-500"
            >4</span
          >元（已計入交易車價內）時，
        </p>
        <p class="text-sm font-light">
          則由買方自付差額或改現金購車，因個人信用條件不一，賣方不負擔銀行核貸通過與否的責任。
        </p>
      </div>

      <div class="grid grid-cols-2">
        <div>
          <div class="text-xs font-light">約定掛牌日期</div>
          <div class="text-base font-medium">
            {{ form.order.deliveringDate }}
          </div>
        </div>
        <div>
          <div class="text-xs font-light">交車地點</div>
          <div class="text-base font-medium">
            {{
              form.showroom ||
              `${form.deliveryCityName} ${form.deliveryDistrictName} ${form.deliveryAddress}`
            }}
          </div>
        </div>
      </div>

      <hr class="divider" />

      <div class="grid grid-cols-[188px_268px_144px] gap-x-6 gap-y-3">
        <div class="flex items-center justify-between">
          <span>買方簽名</span>
          <span class="text-blue-500">{{ form.order.drawerName }}</span>
        </div>
        <div class="flex items-center justify-between">
          <span>賣方用印</span>
          <span class="text-blue-500">新凱汽車股份有限公司</span>
        </div>
        <div class="flex items-center justify-between">
          <span>銷售顧問</span>
          <span class="text-blue-500">{{ form.order.consultant }}</span>
        </div>
        <div class="border-black-400 relative h-35 rounded-[4px] border-1 p-3">
          <img
            class="absolute top-0 left-0 h-full w-full appearance-none border-0 outline-0"
            v-if="signatureStore.buyerSignatureImageSrc"
            :src="signatureStore.buyerSignatureImageSrc"
          />
        </div>
        <div
          class="border-black-400 relative h-35 rounded-[4px] border-1 p-3 text-xs"
        >
          <div>地址：臺北市內湖區民權東路6段17號</div>
          <div>電話：02-8791-3456</div>
          <div>統編：80198953</div>
          <img
            class="absolute right-2 bottom-2 h-[82px] w-[136px]"
            src="@/assets/img/seal.png"
            alt=""
          />
        </div>
        <div class="border-black-400 relative h-35 rounded-[4px] border-1 p-3">
          <img
            class="absolute top-0 left-0 h-full w-full appearance-none border-0 outline-0"
            v-if="signatureStore.sellerSignatureImageSrc"
            :src="signatureStore.sellerSignatureImageSrc"
          />
        </div>
      </div>

      <div class="mt-12 flex w-full items-center gap-7">
        <button class="button-white w-full" type="button">列印</button>
        <router-link class="button-blue w-full" :to="{ name: 'contract' }"
          >完成</router-link
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import Stepper from "@/components/Stepper.vue";
import { useContractStore } from "@/stores/contractStore";
import { useSignatureStore } from "@/stores/signature";

const signatureStore = useSignatureStore();
const contractStore = useContractStore();

const { contract: form } = storeToRefs(contractStore);
</script>

<style scoped></style>
