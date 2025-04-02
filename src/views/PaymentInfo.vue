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

    <Stepper :currentStep="3" />

    <div class="text-black-400 mt-8 px-15 pb-15">
      <div class="mb-8 flex items-center justify-between">
        <div>購買方式</div>
        <SingleChoiceButton
          v-model="purchaseType"
          :options="[
            { value: '現金購車', label: '現金購車' },
            { value: '分期付款', label: '分期付款' },
          ]"
          @change="handleChangePurchaseType"
        />
      </div>

      <div class="mb-8 grid grid-cols-2 justify-between gap-y-4">
        <div>建議售價(含營業稅)</div>
        <div class="justify-self-end">新台幣 1,450,000 元</div>
        <template v-for="(accessory, index) in accessories" :key="index">
          <div class="pl-4">配件 {{ accessory.name }}</div>
          <div class="justify-self-end">
            新台幣 {{ accessory.price?.toLocaleString() }} 元
          </div>
        </template>
        <div>特殊車色加價</div>
        <div class="justify-self-end">新台幣 30,000 元</div>
      </div>

      <div class="flex items-baseline justify-between">
        <div>車輛成交價格(含營業稅)</div>
        <div>
          <div class="mb-3 flex items-center">
            新台幣
            <CurrencyInput
              class="mx-2 w-55"
              v-model="strikePrice"
              @update="handleFinalPriceChange"
            />
            元
          </div>
          <div class="text-end">
            新台幣 <span class="text-blue-500">{{ localeValue }}</span> 元整
          </div>
        </div>
      </div>

      <hr class="divider" />

      <div>
        <div class="mb-4 flex items-center justify-between">
          <div>實收定金</div>
          <div class="flex items-center">
            新台幣
            <CurrencyInput class="mx-2 w-55" v-model="deposit" />
            元
          </div>
        </div>

        <div class="mb-4 flex items-center justify-between">
          <div>定金付款方式</div>
          <SingleChoiceButton
            v-model="depositType"
            :options="[
              { value: '現金', label: '現金' },
              { value: '刷卡', label: '刷卡' },
              { value: '票據', label: '票據' },
            ]"
          />
        </div>

        <div v-if="depositType === '票據'">
          <BaseInput
            class="mb-4"
            title="票號"
            placeholder="請輸入票號"
          ></BaseInput>
          <div class="mb-3">付款行庫｜分行｜帳號</div>
          <div class="flex items-center gap-3">
            <Select
              class="w-45 flex-shrink-0"
              :options="[]"
              placeholder="付款行庫"
            />
            <Select
              class="w-45 flex-shrink-0"
              :options="[]"
              placeholder="分行"
            />
            <BaseInput class="w-full" placeholder="請輸入帳號" />
          </div>
        </div>
      </div>

      <hr class="divider" />

      <div class="mb-4">
        <div class="mb-4 flex w-full items-center justify-between">
          <div>尾款金額</div>
          <div class="text-blue-500">新台幣 1,000,000 元</div>
        </div>

        <div class="mb-4 flex w-full items-center justify-between">
          <div>尾款付款方式</div>
          <SingleChoiceButton
            v-model="finalPriceType"
            :options="finalPriceTypeOptions"
          />
        </div>

        <div v-if="finalPriceType === '票據'">
          <BaseInput
            class="mb-4"
            title="票號"
            placeholder="請輸入票號"
          ></BaseInput>
          <div class="mb-3">付款行庫｜分行｜帳號</div>
          <div class="flex items-center gap-3">
            <Select
              class="w-45 flex-shrink-0"
              :options="[]"
              placeholder="付款行庫"
            />
            <Select
              class="w-45 flex-shrink-0"
              :options="[]"
              placeholder="分行"
            />
            <BaseInput class="w-full" placeholder="請輸入帳號" />
          </div>
        </div>

        <div class="font-light" v-if="finalPriceType === '分期付款'">
          <div class="mb-3 font-medium">貸款約定事項</div>
          <div class="mb-4 flex items-center gap-2.5">
            <span>買方委辦貸款</span>
            <BaseInput class="w-[150px]" placeholder="預估貸" />
            <span>萬</span>
            <Select class="w-[150px]" placeholder="期數" :options="[]" />
            <span>期，年利率</span>
            <BaseInput class="w-20" />
            <span>%</span>
          </div>
          <div class="mb-4 flex items-center gap-2.5">
            <span>若銀行核貸時總貼息費用超過責方承諾利息補貼金額新台幣</span>
            <BaseInput class="w-45" />
            <span>萬元</span>
          </div>
          <div>
            (已計入交易車價內）時，則由買方自付差額或改現金購車，因個人信用條件不一，賣方不負擔銀行核貸通過與否的責任。
          </div>
        </div>
      </div>

      <hr class="divider" />

      <div class="space-y-8">
        <Checkbox v-model="contractAgreement" :value="true" disabled
          ><button
            class="cursor-pointer text-blue-500"
            type="button"
            @click="openContractModal"
          >
            新車訂購合約條款
          </button></Checkbox
        >
        <Checkbox v-model="confidentialityAgreement" :value="true" disabled
          ><button
            class="cursor-pointer text-blue-500"
            type="button"
            @click="openConfidentialityModal"
          >
            保密條款與注意事項
          </button></Checkbox
        >
        <Checkbox :value="true">已詳讀並經過3日審閱期的同意勾選</Checkbox>
        <DatePicker />
        <Checkbox :value="true">本人已詳讀並同意</Checkbox>
        <div class="grid grid-cols-[144px_1fr_144px] gap-x-6 gap-y-3">
          <div class="flex items-center justify-between">
            <span>買方簽名</span>
            <span class="text-blue-500">孫大批</span>
          </div>
          <div class="flex items-center justify-between">
            <span>賣方用印</span>
            <span class="text-blue-500">新凱汽車股份有限公司</span>
          </div>
          <div class="flex items-center justify-between">
            <span>銷售顧問</span>
            <span class="text-blue-500">陳富豪</span>
          </div>
          <div
            class="border-black-400 relative h-35 cursor-pointer rounded-[4px] border-1 p-3"
            @click="openSignatureModal('buyer')"
          >
            <span
              class="text-red text-xs font-light"
              v-if="!signatureStore.buyerSignatureImageSrc"
              >請 買方 詳閱上述注意事項後，請以中文正楷簽名</span
            >
            <img
              class="absolute top-0 left-0 h-full w-full appearance-none border-0 outline-0"
              ref="buyerSignatureImageRef"
            />
          </div>
          <div
            class="border-black-400 relative h-35 rounded-[4px] border-1 p-3 text-xs"
          >
            <div>地址：臺北市內湖區民權東路6段17號</div>
            <div>電話：02-8791-3456</div>
            <div>統編：80198953</div>
            <!-- <img
              class="absolute right-2 bottom-2 h-[82px] w-[136px]"
              src="@/assets/img/seal.png"
              alt=""
            /> -->
          </div>
          <div
            class="border-black-400 relative h-35 cursor-pointer rounded-[4px] border-1 p-3"
            @click="openSignatureModal('seller')"
          >
            <img
              class="absolute top-0 left-0 h-full w-full appearance-none border-0 outline-0"
              ref="sellerSignatureImageRef"
            />
          </div>
        </div>
      </div>

      <!-- 新車訂購合約條款 -->
      <Modal ref="contractModalRef">
        <div class="text-black">
          <h3 class="mb-5 text-2xl">約定事項</h3>
          <ul
            class="mb-6 max-h-100 space-y-3 overflow-y-auto text-xs font-light"
          >
            <li>
              <div class="mb-1 font-medium">第一條： 價金範圍</div>
              本合約所載價金除另有約定外，包括進口關稅商港建設費、貨物稅、營業稅、交車前運費、運送保險費及其他應由乙方負擔之稅費；但不包括申領牌照之手續費、車輛保險費、監理規費、使用牌照稅、燃料稅等應由甲方負擔之稅費。本合約訂立後，前項稅費調整之利益或不利益均由甲方承受及負擔，但因可歸責於乙方之事由致增加負擔者，其增加部分由乙方負擔。
            </li>
            <li>
              <div class="mb-1 font-medium">第二條： 車價(一)已進口之車輛</div>
              對於已進口之車輛，車輛價格以本合約訂立時約定之價格為準，其後縱因匯率變動、關稅調整，概不受影響。
            </li>
            <li>
              <div class="mb-1 font-medium">
                第三條： 車價(二)尚未進口之車輛
              </div>
              對於尚未進口車輛，於本合約訂定之後，成本縱有調高或降低，概依本合約所訂之價格為準。但匯率、關稅、商港建設費等稅費於結帳完納之日有調高或降低者，一律以實際結關日之匯率、稅率為準計算價格。其因可歸責於乙方之事由應結關而未辦理結關手續，致蒙受較高稅率或較高匯率之不利益者，其提高部分由乙方負擔。
            </li>
            <li>
              <div class="mb-1 font-medium">第四條： 定金</div>
              一般車輛定金至少為本合約車款總價10%；特殊配備車輛之訂購定金至少為本合約車款總價20%。乙方業務代表於收訖甲方所交付之定金同時，應填妥本合約書下載之「暫收據」交付甲方收執；經乙方備妥正式定金發票及完印之訂購合約書，確定甲方收執同時，該「暫收據」即失其效力。
            </li>
            <li>
              <div class="mb-1 font-medium">第五條： 合約生效</div>
              甲方倘係以支票給付本合約定金，應俟該定金支票確實兌現後，本合約始生效力。
            </li>
            <li>
              <div class="mb-1 font-medium">第六條： 合約之變更</div>
              本合約簽訂後，倘有變更車型、顏色、配件等之必要，應由甲乙雙方另以書面議定。
            </li>
            <li>
              <div class="mb-1 font-medium">第七條： 付款條件</div>
              甲方交付乙方之定金即一切車款，倘係以票據支付，均應以乙方公司全稱即（<span
                class="text-blue-500"
                >新凱汽車股份有限公司</span
              >）為票據之抬頭，並經劃線及註明禁止背書轉讓支票據為支付。
            </li>
            <li>
              <div class="mb-1 font-medium">第八條： 交車約定</div>
              甲乙雙方同意，應俟甲方以現金付清全部車款，或甲方簽發用以支付車款之所有票據悉數兌現後，乙方始負有交車予甲方之義務。
            </li>
            <li>
              <div class="mb-1 font-medium">第九條： 交車地點</div>
              除另有約定外，交車地點為乙方營業所。
            </li>
            <li>
              <div class="mb-1 font-medium">
                第十條： 交車日期(一)已進口之車輛
              </div>
              對於已進口車輛之交車日期，應由甲乙雙方約定載明。乙方倘逾交車日期未交付本車輛，經甲方催告十日(含)內仍未履行者，甲方得解除合約，並請求返還已支付之價金及自受領日起至返還日止，依法定利率計算之利息。
            </li>
            <li>
              <div class="mb-1 font-medium">
                第十一條：交車日期(二)尚未進口之車輛
              </div>
              對於國外製造尚未進口之車輛，甲乙雙方得約定預訂交車日期。但乙方應於車輛抵台後三十日(含)內，以書面通知甲方確定交車日期。乙方逾期未通知或所通知確定交車日期逾期預訂交車日期達三十日以上者，甲方得解除合約，並請求返還已支付之價金，及自受領日起至返還日止，依法定利率計算之利息。前項情形，甲方倘證明有其他損害並得請求賠償。前二項之約定，於乙方逾確定交車日期未交付車輛，經甲方催告後十日(含)仍未履行者，亦適用之。
            </li>
          </ul>
          <div class="flex items-center justify-between">
            <Checkbox
              v-model="contractAgreement"
              label="本人已詳讀並同意"
              :value="true"
            />
            <button
              class="button-blue"
              type="button"
              @click="closeContractModal"
            >
              關閉
            </button>
          </div>
        </div>
      </Modal>

      <Modal ref="confidentialityModalRef">
        <div class="text-black">
          <h3 class="mb-5 text-2xl">※保密條款：</h3>
          <p class="mb-2">
            本契約屬雙方合意簽署之隱私保密文件，非一般涉及此類資訊之人所知悉。故買方未經賣方書面同意不得讓本契約公開給第三人賞閱、拍攝、記錄、傳送、上網分享等情事。若有損害賣方權益時買方將負賠償責任。
          </p>
          <p class="mb-2">
            ※為保障台端的權益，<span class="text-blue-500"
              >凱銳汽車股份有限公司</span
            >同仁均備有最新名片、身份證，敬請核對。
          </p>
          <p class="mb-2">
            ※賣方保留接受買方此份訂購契約與否之權利，而本公司同仁如有任何承諾，均請要求以書面方式記載於本公司制式契約內容（含背面），若以其他書面另行記載約定條約，該記載一律無效。
          </p>
          <p class="mb-2">
            ※車輛申辦貸款、領牌之相關費用由買方支付，如設定費、稅金、代辦費、驗車規費、選號費、保險費等，均不計入交易車價中。
          </p>
          <p class="mb-2">
            ※本合約書買方給付賣方之所有款項，均需指名以「<span
              class="text-blue-500"
              >凱銳汽車股份有限公司</span
            >」禁止背書之即期支票；或本公司名義之信用卡簽單（刷卡手續費除非另有約定，則全數由買方負擔）；或以銀行匯款至本公司帳戶：
            <br />
            <span class="text-blue-500">永豐銀行東門分行</span> 戶名：<span
              class="text-blue-500"
              >凱銳汽車股份有限公司</span
            >
            帳號：
          </p>
          <div class="flex items-center justify-between">
            <Checkbox
              v-model="confidentialityAgreement"
              label="本人已詳讀並同意"
              :value="true"
            />
            <button
              class="button-blue"
              type="button"
              @click="closeConfidentialityModal"
            >
              關閉
            </button>
          </div>
        </div>
      </Modal>

      <!-- 簽名 -->
      <Modal
        ref="signatureModalRef"
        :showCancelButton="true"
        :cancelButtonText="'返回'"
        :showConfirmButton="true"
        @confirm="confirmSignature"
      >
        <div
          class="relative mx-auto mb-6 h-[288px] w-[288px] border-1 border-dashed"
        >
          <canvas
            class="signature-pad"
            id="signature-pad"
            ref="signaturePadRef"
            width="288"
            height="288"
          ></canvas>
          <span class="text-red absolute top-3 left-3 text-xs font-light"
            >請以中文正楷簽名</span
          >
          <button
            class="absolute top-3 right-3 cursor-pointer text-blue-500 underline"
            type="button"
            @click="clearSignature"
          >
            重簽
          </button>
        </div>
      </Modal>

      <div class="mt-12 flex w-full items-center gap-7">
        <router-link class="button-gray w-full" :to="{ name: 'memberInfo' }">
          上一步
        </router-link>
        <router-link class="button-blue w-full" :to="{ name: 'confirmView' }">
          預覽
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SignaturePad from "signature_pad";
import { computed, nextTick, onMounted, ref } from "vue";
import BaseInput from "@/components/BaseInput.vue";
import Checkbox from "@/components/Checkbox.vue";
import CurrencyInput from "@/components/CurrencyInput.vue";
import DatePicker from "@/components/DatePicker.vue";
import Modal from "@/components/Modal.vue";
import Select from "@/components/Select.vue";
import SingleChoiceButton from "@/components/SingleChoiceButton.vue";
import Stepper from "@/components/Stepper.vue";
import { useSignatureStore } from "@/stores/signature";
import { toZhDigit } from "@/utils/number";

const accessories = ref([
  {
    name: "空力套件",
    price: 609000,
  },
  {
    name: "全景天窗",
    price: 291000,
  },
  {
    name: "車頂置物架",
    price: 932800,
  },
]);

// 購買方式
const purchaseType = ref("現金購車");
const handleChangePurchaseType = (value: string) => {
  if (value === "現金購車") {
    finalPriceType.value = "現金";
  } else {
    finalPriceType.value = "分期付款";
  }
};

const strikePrice = ref(0);
const localeValue = ref("零");
const handleFinalPriceChange = (value: number) => {
  localeValue.value = toZhDigit(value);
};

// 定金
const deposit = ref(0);
const depositType = ref("現金");

// 尾款
const finalPrice = ref(0);
const finalPriceType = ref("現金");
const finalPriceTypeOptions = computed(() => {
  if (purchaseType.value === "現金購車") {
    return [
      { value: "現金", label: "現金" },
      { value: "刷卡", label: "刷卡" },
      { value: "票據", label: "票據" },
      { value: "匯款", label: "匯款" },
    ];
  } else {
    return [{ value: "分期付款", label: "分期付款" }];
  }
});

// 條約
const contractModalRef = ref<InstanceType<typeof Modal> | null>(null);
const openContractModal = () => {
  contractModalRef.value?.open();
};
const closeContractModal = () => {
  contractModalRef.value?.close();
};
const contractAgreement = ref<boolean>(false);

// 保密條款
const confidentialityModalRef = ref<InstanceType<typeof Modal> | null>(null);
const openConfidentialityModal = () => {
  confidentialityModalRef.value?.open();
};
const closeConfidentialityModal = () => {
  confidentialityModalRef.value?.close();
};
const confidentialityAgreement = ref<boolean>(false);

// 簽名
const signatureStore = useSignatureStore();
const signatureModalRef = ref<InstanceType<typeof Modal> | null>(null);
const signaturePadRef = ref<HTMLCanvasElement | null>(null);
const buyerSignatureImageRef = ref<HTMLImageElement | null>(null);
const sellerSignatureImageRef = ref<HTMLImageElement | null>(null);
let signaturePad;
let currentSignatureType = "";
const openSignatureModal = (type: "buyer" | "seller") => {
  signatureModalRef.value?.open();
  currentSignatureType = type;
  nextTick(() => {
    signaturePad = new SignaturePad(signaturePadRef.value!, {
      backgroundColor: "rgba(255, 255, 255, 0)",
      penColor: "rgb(0, 0, 0)",
    });
  });
  clearSignature();
};
const clearSignature = () => {
  signaturePad?.clear();
};
const confirmSignature = () => {
  signatureModalRef.value?.close();
  const data = signaturePad?.toDataURL("image/png");

  if (currentSignatureType === "buyer") {
    signatureStore.setBuyerSignatureImageSrc(data!);
    buyerSignatureImageRef.value!.src = data!;
  } else {
    signatureStore.setSellerSignatureImageSrc(data!);
    sellerSignatureImageRef.value!.src = data!;
  }
};
</script>

<style scoped></style>
