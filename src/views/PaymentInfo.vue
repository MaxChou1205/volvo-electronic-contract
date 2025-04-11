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
              { value: '支票', label: '支票' },
              { value: '轉帳匯款', label: '轉帳匯款' },
            ]"
          />
        </div>

        <div v-if="depositType === '支票'">
          <BaseInput
            class="mb-4"
            title="票號"
            placeholder="請輸入票號"
          ></BaseInput>
          <div>
            <div class="mb-4">支票日期</div>
            <DatePicker class="mb-4" placeholder="請輸入票號"></DatePicker>
          </div>
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

        <div v-if="depositType === '轉帳匯款'">
          <BaseInput
            class="mb-4"
            title="轉帳銀行名稱"
            placeholder="請輸入轉帳銀行名稱"
          ></BaseInput>
          <BaseInput title="帳號末五碼" placeholder="請輸入帳號末五碼" />
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
          <h3 class="mb-5 text-2xl">汽車訂購合約書</h3>
          <h4 class="mb-5 text-lg">雙方同意本合約各條款如下：</h4>
          <ul
            class="mb-6 max-h-100 space-y-3 overflow-y-auto text-xs font-light"
          >
            <li class="space-y-1">
              <div class="font-medium">第一條：價金範圍</div>
              <p>
                本合約所載價金，除另有約定外，已包括進口關稅、商港建設費、貨物稅、營業稅、交車前運費、運送保險費及其他依法令應由賣方負擔之稅費；但申領牌照之手續費、車輛保險費、監理規費、使用牌照稅、燃料稅等應由買方負擔。
              </p>
              <p>
                本合約訂立後，前項稅費調整之利益或不利益均由買方承受及負擔，但因可歸責於賣方之事由致增加負擔者，其增加部分由賣方負擔。
              </p>
            </li>
            <li class="space-y-1">
              <div class="font-medium">第二條：車價(一)已進口之車輛</div>
              <p>
                對於已進口之車輛，車輛價格以本合約訂立時約定之價格為準，其後縱因匯率變動、關稅調整，概不受影響。
              </p>
            </li>
            <li class="space-y-1">
              <div class="font-medium">第三條：車價(二)尚未進口之車輛</div>
              <p>
                對於尚未進口車輛，於本合約訂定之後，成本縱有調高或降低，概依本合約所訂之價格為準。其因可歸責於買方之事由致標的物應結關而未辦理結關手續或延遲交付日期，因而蒙受較高稅率或較高匯率之不利益者，其提高或增加部分由買方負擔。
              </p>
            </li>
            <li class="space-y-1">
              <div class="font-medium">第四條：定金及合約生效</div>
              <p>
                車輛定金由雙方約定之，除有特別約定者外，定金不得超過本合約車款總價之10%。定金支付後本合約即生效力：買方倘係以支票給付定金，應俟支票兌現後，本合約始生效力。
              </p>
            </li>
            <li class="space-y-1">
              <div class="font-medium">第五條：合約之變更</div>
              <p>
                本合約簽訂後，倘有變更車型、顏色、配件等之必要，應由雙方另以書面議定。
              </p>
            </li>
            <li class="space-y-1">
              <div class="font-medium">第六條：付款條件</div>
              <p>
                買方交付賣方之定金及本合約車款，可以信用卡、支票或銀行匯款方式支付；支票應以賣方全名為支票之抬頭，並應經劃線及註明禁止背書轉讓；銀行匯款則應匯款至賣方銀行帳戶。
              </p>
            </li>
            <li class="space-y-1">
              <div class="font-medium">第七條：交車約定</div>
              <p>
                買賣雙方同意，應俟買方付清全部合約車款，或買方簽發用以支付全部合約車款之支票悉數兌現後，賣方始負有交車予買方之義務。
              </p>
            </li>
            <li class="space-y-1">
              <div class="mb-1 font-medium">第八條：交車地點</div>
              <p>除另有約定外，交車地點為賣方營業處所。</p>
            </li>
            <li class="space-y-1">
              <div class="mb-1 font-medium">第九條：合約履行</div>
              <ol class="list-inside list-decimal space-y-1">
                <li>
                  標的物給付不能
                  <p class="mt-1 indent-3">
                    標的物因供應商改良、變更或停止供應之事由，致賣方不能依原合約約定給付者，賣方應即通知買方，買方得解除合約。不解除合約者，得按賣方所定價格標準核算買賣價金，受領改良或變更後之標的物。
                  </p>
                </li>
                <li>
                  標的物給付遲延
                  <p class="mt-1 indent-3">
                    因可歸責於賣方之事由，致標的物未能依本合約所訂交付日期交付者，自標的物應交付日之隔日起，買方得請求賠償因遲延所發生之損害。前項情形，買方得定10日以上期間催告賣方交付，屆期仍未交付時，買方得解除合約，並請求返還已支付之價金，及自受領日起至返還日止之法定利息。前項情形，買方證明有其他損害者，並得請求損害賠償。
                  </p>
                </li>
                <li>
                  標的物受領遲延
                  <p class="mt-1 indent-3">
                    因可歸責於買方之事由致受領遲延者，賣方得請求賠償因遲延所發生之損害。前項情形，賣方得定20日以上之期間催告買方受領，屆期仍未受領者，賣方得解除合約。在買方遲延中，賣方僅就故意或重大過失負其責任；並得請求買方賠償提出及保管標的物之必要費用。
                  </p>
                </li>
                <li>
                  價金給付遲延
                  <p class="mt-1 indent-3">
                    因可歸責於買方之事由致價金遲延給付者，自價金付款期間末日之隔日起，賣方得請求遲延利息；如能證明有其他損害者，並得請求賠償。前項情形，賣方得定15日以上期間催告買方，屆期仍未支付者，得解除契約。
                  </p>
                </li>
              </ol>
            </li>
            <li class="space-y-1">
              <div class="mb-1 font-medium">第十條：利益及危險負擔之移轉</div>
              <p>
                本合約標的物之利益及危險，除法律或合約另有約定者外，自交付時起，均應由買方承受負擔。
              </p>
              <p>
                因不可歸責於雙方之事由，致賣方給付不能者，買方免支付價金，其已支付者，賣方應返還之。
              </p>
            </li>
            <li class="space-y-1">
              <div class="mb-1 font-medium">第十一條：召回檢修及改正</div>
              <p>
                本合約車輛經製造廠、進口商或進口人、中央公路主管機關或目的事業主管機關通知或責令召回檢修、改正時，賣方應安排檢修之時間及地點，並負免費檢修之義務。賣方應於接獲通知後7個工作日內公告周知；並於該期間內個別通知買方檢修之時間與地點及免費檢修之權利，但不能通知者不在此限。但公告周知或個別通知買方之期間，其他法令另有規定者，從其規定。
              </p>
            </li>
            <li class="space-y-1">
              <div class="mb-1 font-medium">第十二條：品質擔保</div>
              <p>
                賣方應擔保本合約車輛符合交車時之環保、道路交通安全及耗能等相關法令之規定標準。車輛未達規定標準而能改善者，買方得訂定相當期限催告賣方改善，逾期未改善或不能改善者，買方得解除契約，請求返還已支付之價金，及自受領日起至返還日止，依法訂利率計算之利息。如能證明有其他損害，並得請求賠償。
              </p>
            </li>
            <li class="space-y-1">
              <div class="mb-1 font-medium">第十三條：保固責任</div>
              <p>
                賣方除應依民法及其他法令規定對買方負擔瑕疵擔保責任外，並應自交車之日起三年內且不計里程數，對車輛本身之瑕疵零件負更新或修復之責任，但損害係因買方為依「使用手冊」使用車輛，或未依「保養手冊」所載時間、里程、場所保養或維護所致者，賣方不負保固責任。車輛因天然災害、自然耗損或可歸責於買方之事由致生損壞者，賣方亦不負保固責任。
              </p>
            </li>
            <li class="space-y-1">
              <div class="mb-1 font-medium">第十四條：標的物重大瑕疵之效果</div>
              <p>
                本合約標的物於交付後180日內或行駛12,000公里數之內(以先到者為準)，有下列重大瑕疵情事之一者，買方得請求更換同型(或等值)新車，或解除契約而請求退還已付之價金，及自受領日起至返還日止依法訂利率計算之利息：
              </p>
              <ol class="list-inside list-decimal">
                <li>於行駛中突然起火燃燒者；</li>
                <li>於行駛中煞車失靈，經送賣方檢修2次而未修復者；</li>
                <li>於行駛中突然熄火故障，經送賣方檢修2次而未修復者；</li>
                <li>於排檔時或行駛時，發生暴衝，經送賣方檢修2次而未修復者；</li>
                <li>於行駛中引擎溫度升高至極限，經送賣方檢修2次而未修復者；</li>
                <li>
                  其他重大瑕疵，有危害生命或身體健康安全之虞，經送賣方檢修2次而未修復者。
                </li>
              </ol>
              <p>
                前項各款情形之發生是否由標的物瑕疵所致，雙方有爭議時，得由雙方同意之專業機構鑑定，鑑定結果證實係因標的物瑕疵所致者，賣方應負擔鑑定費用。
              </p>
              <p>前二項規定並不妨害買方依法律或賣方之保固所得主張之權利。</p>
            </li>
            <li class="space-y-1">
              <div class="mb-1 font-medium">第十五條：標的物屢修不復之效果</div>
              <p>
                有下列情事之一者，買方得請求更換同型(或等值)新車或解除契約：
              </p>
              <ol class="list-inside list-[trad-chinese-informal]">
                <li>
                  交付後180日內或行12,000公里數之內(以先到者為準)，因相同瑕疵於保養手冊所載之場所，經4次以上維修仍無法回復正常機能。
                </li>
                <li>
                  交付後180日內，因機能瑕疵所致無法正常使用車輛，經送保養手冊所載之場所維修，其累積無法使用日數達三十日以上。但有下列情形之一者，其期間不予累計：
                </li>
                <ol class="list-inside list-decimal">
                  <li>買方未依通知取車之期間。</li>
                  <li>
                    回廠維修賣方已提供買方代步車或補貼相當代步費用之合理期間。<br />前項規定並不妨害買方依法律或賣方之保固所得主張之權利。
                  </li>
                </ol>
              </ol>
            </li>
            <li class="space-y-1">
              <div class="mb-1 font-medium">第十六條：保證書及使用說明書</div>
              <p>
                賣方應於訂約後，至遲於交車時交付本合約標的物之中文使用說明書；前項中文使用說明書得以經買方同意之方式提供(例如電郵)。中文使用說明書應包含標的物組件、功能說明、正確使用方法、操作程序、危險警語與避免方式(例如禁止改良或改裝)、簡易故障處理、維修處所及其他相關資訊。
              </p>
            </li>
            <li class="space-y-1">
              <div class="mb-1 font-medium">第十七條：其他條款</div>
              <ol class="list-inside list-decimal">
                <li>
                  管轄法院：買賣雙方因本合約而發生訴訟者，雙方同意以賣方所在地之管轄法院為第一審管轄法院。
                </li>
                <li>
                  合約之更改：本合約書經印妥之條款及說明，倘有增刪、加註之必要，均應由雙方簽訂並蓋章，否則不生效力。
                </li>
                <li>
                  代辦義務及手續費：買方就第一條所敘之車輛保險、牌照及監理事項等，得委任賣方辦理，但賣方得複委任他人辦理，除有特別約定者外，相關政府規費或代辦費用均由買受人負擔。
                </li>
                <li>
                  個人資料保護：賣方對買方個人資料之蒐集、處理及利用，應依個人資料保護法規定。
                </li>
                <li>
                  補充規定：合約如有未盡事宜，依民法、消費者保護法及相關法令處理之。
                </li>
              </ol>
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
      { value: "分期付款", label: "分期付款" },
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
