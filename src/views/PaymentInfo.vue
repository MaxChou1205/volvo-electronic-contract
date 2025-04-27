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
      <div class="mb-4 grid grid-cols-2 justify-between gap-y-4">
        <div>建議售價(含營業稅)</div>
        <div class="justify-self-end">
          新台幣 {{ form.order.vehicleRetailAllAmount?.toLocaleString() }} 元
        </div>
        <template
          v-for="(accessory, index) in form.order.modelOptionNames"
          :key="index"
        >
          <div class="flex items-baseline pl-4">
            <span class="mr-2 min-w-8 shrink-0">配件</span>
            <div class="">{{ accessory }}</div>
          </div>
          <div class="flex items-baseline justify-self-end">
            新台幣
            <CurrencyInput class="mx-2 w-55" />
            元
            <!-- 新台幣 {{ accessory.price?.toLocaleString() }} 元 -->
          </div>
        </template>
        <!-- <div>特殊車色加價</div>
        <div class="justify-self-end">新台幣 30,000 元</div> -->
      </div>

      <button
        class="button-blue mx-auto mb-4 block"
        type="button"
        @click="addAddtionalOption"
      >
        加選項目
      </button>
      <div
        class="mb-2 flex items-center justify-between"
        v-for="(option, index) in addtionalOptions"
        :key="index"
      >
        <div class="min-w-55">
          <BaseInput v-model="option.name" />
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-baseline justify-self-end">
            新台幣 <CurrencyInput class="mx-2 w-55" v-model="option.price" /> 元
          </div>
          <Icon
            class="ml-2 cursor-pointer"
            iconName="delete"
            @click="removeOption(index)"
          />
        </div>
      </div>

      <div class="my-4 flex items-baseline justify-between">
        <div>總計(含營業稅)</div>
        <div class="text-end">
          新台幣
          <span class="text-blue-500">{{ totalPrice?.toLocaleString() }}</span>
          元整
        </div>
      </div>

      <div class="flex items-baseline justify-between">
        <div>車輛成交價格(含營業稅)</div>
        <div>
          <div class="mb-3 flex items-center justify-self-end">
            新台幣
            <CurrencyInput
              class="mx-2 w-55"
              v-model="form.order.orderAllAmount"
              @update="handleFinalPriceChange"
            />
            元
          </div>
          <div class="text-end">
            新台幣
            <span class="text-blue-500">{{
              toZhDigit(form.order.orderAllAmount)
            }}</span>
            元整
          </div>
        </div>
      </div>

      <div class="mt-8">自費項目</div>
      <button
        class="button-blue mx-auto my-4 block"
        type="button"
        @click="addSelfPaidOption"
      >
        加選項目
      </button>
      <div
        class="mb-2 flex items-center justify-between"
        v-for="(option, index) in selfPaidOptions"
        :key="index"
      >
        <div class="min-w-55">
          <BaseInput v-model="option.name" />
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-baseline justify-self-end">
            新台幣 <CurrencyInput class="mx-2 w-55" v-model="option.price" /> 元
          </div>
          <Icon
            class="ml-2 cursor-pointer"
            iconName="delete"
            @click="removeSelfPaidOption(index)"
          />
        </div>
      </div>

      <div class="my-4 flex items-baseline justify-between">
        <div>自費項目總計(含營業稅)</div>
        <div class="text-end">
          新台幣
          <span class="text-blue-500">{{
            selfPaidTotalPrice?.toLocaleString()
          }}</span>
          元整
        </div>
      </div>

      <hr class="divider" />

      <div>
        <div class="mb-4 flex items-center justify-between">
          <div>實收定金</div>
          <div class="flex items-center">
            新台幣
            <CurrencyInput
              class="mx-2 w-55"
              v-model="form.order.contractEarnest"
            />
            元
          </div>
        </div>

        <div class="mb-4 flex items-center justify-between">
          <div>定金付款方式</div>
          <SingleChoiceButton
            v-model.number="form.order.depositPayWay"
            :options="[
              { value: 88031003, label: '現金' },
              { value: 88031001, label: '刷卡' },
              { value: 88031004, label: '支票' },
              { value: 88031005, label: '轉帳匯款' },
            ]"
          />
        </div>

        <!-- 支票 -->
        <div v-if="form.order.depositPayWay === 88031004">
          <SingleChoiceButton
            class="mb-4"
            v-model.number="form.order.isCashCheck"
            title="現金支票"
            :options="[
              { value: true, label: '是' },
              { value: false, label: '否' },
            ]"
          />
          <BaseInput
            class="mb-4"
            v-model="form.cashCheckNo"
            title="票號"
            placeholder="請輸入票號"
          ></BaseInput>
          <div>
            <div class="mb-4">支票日期</div>
            <DatePicker
              class="mb-4"
              v-model="form.order.checkDate"
              placeholder="請輸入票號"
            ></DatePicker>
          </div>
          <div class="mb-3">付款行庫｜分行｜帳號</div>
          <div class="flex items-center gap-3">
            <BaseInput
              class="w-full"
              v-model="form.order.paymentBankName!"
              placeholder="請輸入付款行庫"
            />
          </div>
        </div>

        <!-- 轉帳匯款 -->
        <div v-if="form.order.depositPayWay === 88031005">
          <BaseInput
            class="mb-4"
            v-model="form.order.transferBankName!"
            title="轉帳銀行名稱"
            placeholder="請輸入轉帳銀行名稱"
          ></BaseInput>
          <BaseInput
            v-model="form.order.lastFiveBankAccount!"
            title="帳號末五碼"
            placeholder="請輸入帳號末五碼"
          />
        </div>
      </div>

      <hr class="divider" />

      <div class="mb-4">
        <div class="mb-4 flex w-full items-center justify-between">
          <div>尾款金額</div>
          <div class="text-blue-500">
            新台幣 {{ finalPrice.toLocaleString() }} 元
          </div>
        </div>

        <div class="mb-4 flex w-full items-center justify-between">
          <div>尾款付款方式</div>
          <SingleChoiceButton
            v-model.number="form.order.payMode"
            :options="finalPriceTypeOptions"
          />
        </div>

        <div v-if="form.order.payMode === 14261004">
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

        <div class="font-light" v-if="form.order.payMode === 14261002">
          <div class="mb-3 font-medium">貸款約定事項</div>
          <div class="mb-4 flex items-center gap-2.5">
            <div>首付金額</div>
            <CurrencyInput
              class="flex-1"
              v-model="form.order.initialPayment!"
            />
            <span>元</span>
          </div>
          <div class="mb-4 flex items-center gap-2.5">
            <span>買方委辦貸款</span>
            <BaseInput
              class="w-[150px]"
              v-model="form.order.loanAmounts!"
              placeholder="預估貸"
            />
            <span>元</span>
            <Select
              class="w-[150px]"
              v-model.number="form.order.loanTerm"
              placeholder="期數"
              :options="[
                { value: 70901001, label: '十二期' },
                { value: 70901006, label: '十八期' },
                { value: 70901002, label: '二十四期' },
                { value: 70901003, label: '三十六期' },
                { value: 70901004, label: '四十八期' },
                { value: 70901005, label: '六十期' },
              ]"
            />
            <span>期，年利率</span>
            <BaseInput class="w-20" v-model="form.loanRate!" />
            <span>%</span>
          </div>
          <div class="mb-4 flex items-center gap-2.5">
            <span>若銀行核貸時總貼息費用超過責方承諾利息補貼金額新台幣</span>
            <BaseInput class="w-45" v-model="form.interestSubsidy!" />
            <span>元</span>
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
        <Checkbox v-model="vipAgreement" :value="true" disabled
          >我已閱讀且同意
          <button
            class="ml-1 cursor-pointer text-blue-500"
            type="button"
            @click="openVipModal"
          >
            VOLVO貴賓會員條款
          </button></Checkbox
        >
        <Checkbox :value="true">已詳讀並經過3日審閱期的同意勾選</Checkbox>
        <div>
          <div class="mb-2">合約日期</div>
          <DatePicker v-model="form.contractDate" />
        </div>
        <Checkbox :value="true">本人已詳讀並同意</Checkbox>
        <div class="grid grid-cols-[144px_1fr_144px] gap-x-6 gap-y-3">
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

      <!-- VOLVO貴賓會員條款 -->
      <Modal ref="vipModalRef">
        <div class="max-h-100 space-y-2 overflow-y-auto text-black">
          <h3 class="mb-5 text-2xl">客戶隱私權政策</h3>
          <section>
            <h2 class="mb-2 text-lg font-semibold">範圍與目的</h2>
            <p>
              本政策用於規範 Volvo Car Taiwan
              <span class="text-blue-500">國際富豪汽車股份有限公司</span
              >（以下稱為「VCTL」或「我們」）對於客戶個人資料之處理事宜。
              本政策旨在為現有客戶、舊客戶和潛在客戶（統稱為「客戶」或「您」）提供以下事項的普遍瞭解：
            </p>
            <ul class="mb-2 list-inside list-disc">
              <li class="pl-4">我們在何種情況下會收集及處理您的個人資料；</li>
              <li class="pl-4">我們收集的個人資料類型；</li>
              <li class="pl-4">我們收集您個人資料的理由；</li>
              <li class="pl-4">我們處理您個人資料的方式。</li>
            </ul>
          </section>

          <section class="space-y-2">
            <h2 class="mb-2 text-lg font-semibold">承諾</h2>
            <p>
              您的個人資料經過處理後將成為我們為您提供產品與服務的重要依據。我們感謝您在提供個人資料給我們時所展現的信賴，我們也會在提供服務時將您的隱私權列入重要考量。
            </p>
            <p>
              為了保障您的個人資料安全，同時提升客戶價值及提供更進步更安全的駕駛體驗，我們將會嚴格遵守以下五大通用原則。
            </p>
            <p>
              <strong>自由選擇<br /></strong
              >您的個人資料屬於您所有，我們不會針對您的隱私偏好進行任何假設並據此設計服務內容，因此您可以自由選擇是否要與我們分享您的個人資料。
            </p>
            <p>
              <strong>利益平衡<br /></strong
              >在符合台灣個人資料保護法（下稱「個資法」）之前提下，當出現處理您的個人資料已達到個資法所允許的追求合法利益的情況時，例如相較於保護您隱私權的需要，顯有更值得保護之其他重大利益時，我們可能會在不取得您明確同意的情況下處理部分個人資料。如需更多資訊，請參閱下方「同意」部分。
            </p>
            <p>
              我們將會站在客戶和一般大眾的潛在福利（包括安全）基礎上，評估是否存在此類合法利益。
            </p>
            <p>
              <strong>比例原則<br /></strong>
              VCTL
              保證只會處理適當、相關且不超出原先收集目的範圍的客戶個人資料。
            </p>
            <p>
              在匿名資料即可發揮功能或完成服務的情況下，我們將會匿名使用您的個人資料。如果我們將您的個人資料搭配其他匿名或非個人資料一起使用，則該資料在合用情況下亦將視為個人資料。
            </p>
            <p>
              <strong>透明<br /></strong>
              一經要求， VCTL
              將會提供客戶有關我們處理您個人資料的進一步資訊，包括公司內部指示與指導方針的節錄。
            </p>
            <p>
              <strong>法規遵循<br /></strong>
              VCTL
              政策要求在我們營運的每個國家和地區中確實遵守適用的隱私權與資料保護之法律、規定和管制。必要時，我們將調整本政策中所述的個人資料處理方式來確保符合法律規定。
            </p>
          </section>

          <section class="space-y-2">
            <h2 class="mb-2 text-lg font-semibold">實用的定義</h2>
            <p>
              本政策廣泛使用下列詞彙，其意義與個資法中對於個人資料處理及自由移動此類資料所指相同。據此：
            </p>
            <p>
              「資料控制者」係指獨自或與他人偕同決定個人資料處理之用途與方式的自然人或法人、政府單位、公共機構或任何其他實體；
            </p>
            <p>
              「資料處理者」係指代表控制者來處理個人資料的自然人或法人、政府單位、公共機構或任何其他實體；
            </p>
            <p>
              「個人資料」係指與已識別或可識別之自然人有關的任何資訊（「資料主旨」），其中可識別人員係指能夠以直接或間接方式予以辨識的人員，尤其是指藉由其身分證號碼或是一或多項專屬特性因子而能認出其身體、生理、心理、經濟、文化或社會身分的參考資料。
            </p>
            <p>
              「處理」係指在個人資料上進行的任一操作或一組操作，無論是否為自動化方法，包括收集、記錄、整理、儲存、調整或修改、擷取、諮詢、使用、傳輸揭露、散播或以其他形式提供、校正或合併、封鎖、刪除或破壞等；
            </p>
            <p>
              「敏感個人資料」係指會顯露種族或人種、政治看法、宗教或精神信仰、商會成員資格、犯罪前科的個人資料，以及處理與健康（包括病歷、醫療、基因、健康檢查）或性生活有關的資料。
            </p>
          </section>

          <section class="space-y-2">
            <h2 class="mb-2 text-lg font-semibold">資料收集</h2>
            <p>
              在汽車內外使用 VCTL 服務或以其他方式聯絡 VCTL
              （例如透過網站或客戶中心）時，您可能會向我們提供有關您或愛車的相關資訊。我們也會從授權經銷商和維修商及其他第三方取得此類資料。此類資料（以下稱為「客戶提供的個人資料」）可能包括：
            </p>
            <ul class="list-inside list-disc pl-4">
              <li>您的合約資訊（姓名、地址、電話號碼、電子郵件地址等）；</li>
              <li>人口統計資訊（年齡、婚姻狀態、家庭成員數等）；</li>
              <li>
                車輛資訊（車輛識別號碼 (VIN)、車型、購買日期、保養歷史等）；
              </li>
              <li>
                您活動所產生的地點資料（導航輔助、搜尋查閱、地點分享等）；
              </li>
              <li>
                與您購買和使用我們產品與服務有關的資料（客戶偏好與設定、購買歷史、
                Volvo ID、My Volvo等）。
              </li>
            </ul>
            <p>
              您的汽車也會自動收集與車輛及其周圍環境有關的資料，主要為技術性資料，與您個人無直接關聯。此類資料（以下稱為「車輛記錄資料」）通常會與車輛識別號碼（VIN）建立連結，因此可以追蹤至您。車輛記錄資料可能包括：
            </p>
            <ul class="list-inside list-disc pl-4">
              <li>
                安全資訊（是否曾經觸發安全防護氣囊或安全帶張緊器、車門和車窗是否上鎖或開啟等）；
              </li>
              <li>系統功能狀態（引擎、油門、轉向系統、煞車系統等）；</li>
              <li>駕駛資料（車速、煞車和加速踏板的使用、方向盤轉動等）；</li>
              <li>地點資料（發生意外時的車輛位置等）；</li>
              <li>周圍環境資料（車外溫度、影像等）。</li>
            </ul>
            <p>與部分車輛記錄資料有關的資訊也包括在車主手冊中。</p>
            <p>
              如果需要及當收集和處理敏感個人資料時，我們會特別謹慎小心，並根據適用法律要求而採取更多措施來妥善處理。對於
              VCTL
              所儲存的個人身分證號碼與信用卡號碼等資訊，亦視為敏感資料。為避免疑慮，請注意，適用法律可能要求將其他類型的資料當作敏感個人資料。適用法律也可能限制在某些國家中處理地點資料。
            </p>
          </section>

          <section class="space-y-2">
            <h2 class="mb-2 text-lg font-semibold">注意事項</h2>
            <p>
              在合理可行或適用法律要求的情況下，我們將會針對您個人資料之收集或登錄，為您提供(i)與處理您個人資料之目的有關的特定資訊、(ii)資料控制者的身分、(iii)向其揭露資料的任何第三方身分，及(iv)用於確保您權益的其他必要資訊（包括利用您個人資料之期間、地區、對象及方式，以及您依個資法第三條所可行使的權利）。
            </p>
            <p>
              上述資訊可能是在您買車時、在車輛的資訊娛樂系統中、在 VCTL
              開發的手機app上、在<a
                class="text-blue-500 underline"
                href="http://www.volvocars.com"
                target="_blank"
                >www.volvocars.com</a
              >網站中，或您與 VCTL 簽訂的協議中提供予我們。
            </p>
          </section>

          <section class="space-y-2">
            <h2 class="mb-2 text-lg font-semibold">同意</h2>
            <p>
              在合理可行或適用法律要求的情況下，我們將會在收集或使用您的個人資料之前事先取得您的同意。索取您同意的要求將會十分清楚明確，您也會有合理時間可以做決定。您永遠可以撤銷同意書，例如透過終止特定服務或與
              VCTL 聯絡，聯絡地址請參閱下方「資訊與存取」部分。
            </p>
            <p>
              收集和使用車輛記錄資料可能為必要做法，以便(i)技術人員在車輛保養維護期間診斷及修復車輛故障，(ii)
              VCTL 產品開發，例如提升車輛品質與安全功能，(iii)管理 VCTL
              的保固權益，及(iv)履行法律要求。
            </p>
            <p>
              當基於這些目的、及 VCTL
              為追求類似合法利益而收集或使用車輛記錄資料時，我們通常不會特別徵求您的同意，除非這在個別案例中被視為必要做法或適用法律要求。
            </p>
          </section>

          <section class="space-y-2">
            <h2 class="mb-2 text-lg font-semibold">VCTL 授權經銷商與維修商</h2>
            <p>
              VCTL
              在其與授權經銷商和維修商簽訂的合約中嚴格指定遵守資料保護要求的規則。但是請注意，
              VCTL
              與其授權經銷商和維修商為獨立法人實體，若是此類實體未遵守適用法律，一般而言我們並無相關責任。如果您對於經銷商或維修商使用您個人資料方面有任何疑問，請直接與經銷商或維修商聯絡。
            </p>
          </section>

          <section class="space-y-2">
            <h2 class="mb-2 text-lg font-semibold">第三方應用程式</h2>
            <p>
              您可能可以存取與車輛相連但由第三方提供的應用程式和其他服務，例如可能需要傳送地點資料和其他車輛記錄資料給第三方。
              VCTL
              對於第三方應用程式或服務之個人資料收集或使用概不負責，並建議您在使用此類應用程式或服務之前要小心審閱應用程式條款與條件（或任何相關隱私權聲明）。如果您對於第三方使用您個人資料方面有任何疑問，請直接與第三方聯絡。
            </p>
          </section>

          <section class="space-y-2">
            <h2 class="mb-2 text-lg font-semibold">資料使用</h2>
            <p>VCTL從您和車輛收集的個人資料將會用於：</p>
            <ul class="list-inside list-disc pl-4">
              <li>
                為您提供產品和服務，包括驗證您在特定購買和服務方面的資格，以及提供您更好的優惠和體驗；
              </li>
              <li>
                通知您有關產品和服務之更新或變更，包括但不限於我們條款與條件和公司政策之變更；
              </li>
              <li>通知您新推出的產品、服務和活動：</li>
              <li>提供汽車支援與服務（保固服務、召回資訊等）；</li>
              <li>用於產品發展，例如改善車輛性能、品質和安全性；</li>
              <li>評估及改善我們的供應項目，並與客戶溝通；</li>
              <li>遵守法律要求。 (以上合稱「本政策目的」)</li>
            </ul>
            <p>
              對於大多數處理動作，您可以藉由更新偏好設定、終止特定服務、聯絡
              VCTL
              以撤銷您對處理資料的同意書（聯絡地址請參閱下方「資訊與存取」部分）或以其他我們指定的方式，選擇不讓我們使用您的個人資料。但是除非適用法律另有指明，否則下列情況您通常無法選擇不讓我們處理您的個人資料：
            </p>
            <ul class="list-inside list-disc pl-4">
              <li>
                與收集和進一步處理車輛記錄資料有關之部分動作（請參閱上方「同意」部分）；
              </li>
              <li>
                為了傳送重要注意事項給您而執行的動作，例如條款與條件和公司政策之變更、產品召回事件等；
              </li>
              <li>為了遵守法律義務而執行的動作。</li>
            </ul>
          </section>

          <section class="space-y-2">
            <h2 class="mb-2 text-lg font-semibold">資料保留</h2>
            <p>
              我們只會在達成本政策中指明或另外告知您之目的所需的時段內保留您的個人資料，且您的個人資料可能在台湾境內或境外進行保留或處理。
            </p>
            <p>
              這表示，一旦您同意我們處理您的個人資料，我們將會根據同意事項而保留您的資料，直到您撤銷同意書為止。如果您已經撤銷同意書，我們可能會保留部分個人資料一段必要時間，以便我們符合法律義務要求及在發生法律訴訟時用以辯護。如果我們未再取得您對處理資料的同意書，則該資料只會保留至法律許可的時間。
            </p>
          </section>

          <section class="space-y-2">
            <h2 class="mb-2 text-lg font-semibold">資料品質</h2>
            <p>
              當我們處理您的個人資料時，我們必須確保該資料正確無誤且具時效性，我們將會刪除或修正不正確或不完整的個人資料。如需您確保我們所持有之個人資料正確無誤的相關權益資訊，請參閱下方「資訊與存取」部分。
            </p>
          </section>

          <section class="space-y-2">
            <h2 class="mb-2 text-lg font-semibold">資訊與存取</h2>
            <p>
              如「注意事項」部分中所述，我們可以在收集或登錄您的個人資料時，為您提供有關我們如何處理的特定資訊。
            </p>
            <p>
              每年您享有一次免費索取及接收以下資訊的權利：(i)我們處理了哪些與您有關的個人資料、(ii)從何處收集個人資料、(iii)處理目的，及(iv)我們與哪些或哪類對象分享個人資料。若要索取此類資訊，您必須以書面形式附上個人簽名後提出申請，其中應包括姓名、地址（最好也提供電子郵件地址）等資訊。您也有權要求我們修正、封鎖或刪除任何與您有關的不正確資料。申請書應該寄至：
              Volvo Car Taiwan，致：台北市信義區信義路五段7號38樓。
            </p>
            <p>
              我們將盡快以適當方式處理您的申請。要求刪除個人資料的申請將受到任何適用法律要求所管制。如果適用法律允許在我們執行此類申請時收取一筆行政費用，
              VCTL 將會向您收取該費用。
            </p>
            <p>
              此外，您可以登入您的 My Volvo 帳戶，以存取 VCTL
              所持有之特定客戶提供的個人資料總覽，以及修正或更新您的資訊。
            </p>
          </section>

          <section class="space-y-2">
            <h2 class="mb-2 text-lg font-semibold">安全</h2>
            <p>
              VCTL
              致力於實施適當的技術和組織措施以保護您的個人資料安全，避免您的個人資料遭到意外或非法破壞、意外遺失或竄改、未獲授權揭露或存取，以及任何其他非法形式之處理。我們旨在確保您個人資料的安全等級，並且確定我們所採用的保護措施能夠適當抵禦您個人資料之性質和使用所產生的風險。
            </p>
          </section>

          <section class="space-y-2">
            <h2 class="mb-2 text-lg font-semibold">向第三方揭露</h2>
            <p>
              基於前述之資料使用目的，或符合其他個資法規定下，VCTL
              可能在下列情況中分享您的個人資料：
            </p>
            <ul class="list-inside list-disc pl-4">
              <li>在 VCTL 業務實體之間；</li>
              <li>
                在經您同意下，與 VCTL
                授權經銷商與維修商分享，以便散佈產品與服務優惠和其他溝通資訊給您；
              </li>
              <li>
                根據資料處理協議（依法律要求）與提供服務給 VCTL 的供應商分享；
              </li>
              <li>
                在經您同意下，與其他商業合作夥伴分享，以便散佈產品與服務優惠和其他溝通資訊給您，或基於研發目的而分享；
              </li>
              <li>出售或轉讓 VCTL 業務實體或其資產時；</li>
              <li>遵守法律要求，例如政府調閱、訴訟或是其他法律程序或要求；</li>
              <li>
                當我們基於誠信原則認為必須揭露資訊才能保護我們的權益時，例如調查可能違反我們條款與條件之行為，或是偵測、防範或揭露詐欺或其他安全問題時。
              </li>
            </ul>
            <p>
              一般而言，擔任您個人資料之資料控制者的 VCTL
              業務實體，只有經過您同意時才會將您的個人資料揭露給第三方。但是我們可能在下列情況中，未徵求您的同意即分享您的個人資料，除非我們認為在個別案例中您的同意為必要，或法律要求取得您的同意：
            </p>
            <ul class="list-inside list-disc pl-4">
              <li>
                基於確認或發展我們的產品與服務之外的其他用途，或為了管理我們的法律義務而加以處理車輛記錄資料；
              </li>
              <li>基於本政策目的，在 VCTL 業務實體之間傳輸您的個人資料；</li>
              <li>傳輸您的個人資料給在 VCTL 內部提供服務的供應商；</li>
              <li>法律要求揭露的情況；</li>
              <li>
                基於 VCTL
                追求合法利益（例如保護我們的法律權益，如上所述）之目的而必須揭露的情況。
              </li>
            </ul>
            <p>
              當我們向第三方、或在 VCTL
              業務實體之間揭露您的個人資料時，我們將會評估是否需要在揭露時採取額外保護措施（例如在必須跨國傳輸個人資料時）。
            </p>
          </section>

          <section class="space-y-2">
            <h2 class="mb-2 text-lg font-semibold">代表我們處理資料</h2>
            <p>
              我們限制 VCTL
              員工與供應商存取您個人資料，只開放給需要代表我們處理的對象使用該資訊，並已簽訂合約要求他們保持您個人資料的安全與機密。與任何第三方合作時，我們致力於選擇最能保障您個人資料完整性的資料處理服務。
            </p>
          </section>

          <section class="space-y-2">
            <h2 class="mb-2 text-lg font-semibold">行銷</h2>
            <p>
              除非獲得您的同意，否則我們不會出售或與第三方交易您的個人資料。
            </p>
            <p>
              我們不會基於第三方之行銷目的而與他們分享您的個人資料，除非我們已獲得您同意此類揭露。如果您曾經同意如此做但現在想要停止從第三方收到行銷內容，請直接與第三方聯絡。
            </p>
            <p>
              我們可能會提供您有關新產品、服務、事件或類似行銷活動的資訊。如果您想取消訂閱某份電子報或類似通訊內容，請依照相關通訊內容中的指示進行。您也可以使用My
              Volvo帳戶來拒絕接受 VCTL
              發送的特定類型通訊內容，或變更先前提交的偏好設定。
            </p>
          </section>

          <section class="space-y-2">
            <h2 class="mb-2 text-lg font-semibold">網站與 Cookie</h2>
            <p>
              每個開放給客戶使用的 VCTL
              網站均含有線上隱私權聲明與Cookie使用相關資訊。在某些國家或地區，我們也提供用以接受或拒絕Cookie的線上步驟。如需使用Cookie的相關資訊，請參閱
              <a
                class="text-blue-500 underline"
                href="https://www.volvocars.com/tw/v/legal/cookies"
                target="_blank"
                >https://www.volvocars.com/tw/v/legal/cookies</a
              >。
            </p>
            <p>我們鼓勵您在造訪我們的網站時，先審閱及考慮適用的聲明與資訊。</p>
          </section>

          <section class="space-y-2">
            <h2 class="mb-2 text-lg font-semibold">您的權利</h2>
            <p>
              除於「資訊與存取」一節所述外，基於個資法第3條規定，您可透過書面或電子郵件（電子郵件地址：data.protection@volvocars.com），向我們行使下述權利：(1)
              查詢或請求閱覽您的個人資料；(2)
              請求就我們所蒐集之您個人資料發給複製本；(3)
              請求補充或更正您的個人資料；(4)
              請求停止蒐集、處理或利用您的個人資料；(5)
              請求刪除您的個人資料。但如該些資料為我們履行業務或為符合與您間之契約關係者，則不在此限。
            </p>
          </section>

          <section class="space-y-2">
            <h2 class="mb-2 text-lg font-semibold">變更</h2>
            <p>
              VCTL
              保留隨時修改本政策的權利。上次修改日期列於本文結尾。如果我們對本政策及使用您個人資料的方法進行任何變更，我們將會提供本政策的更新版
            </p>
            <p>上次修改日期: 2024/08</p>
          </section>
          <div class="flex items-center justify-between">
            <Checkbox
              v-model="vipAgreement"
              label="本人已詳讀並同意"
              :value="true"
            />
            <button class="button-blue" type="button" @click="closeVipModal">
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
import { storeToRefs } from "pinia";
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
import { useContractStore } from "@/stores/contractStore";
import { useSignatureStore } from "@/stores/signature";
import { toZhDigit } from "@/utils/number";

const contractStore = useContractStore();
const { contract: form } = storeToRefs(contractStore);

const localeValue = ref("零");
const handleFinalPriceChange = (value: number) => {
  localeValue.value = toZhDigit(value);
};

// 加選項目
const addtionalOptions = ref<{ name: string; price: number }[]>([]);
const addAddtionalOption = () => {
  addtionalOptions.value.push({
    name: "",
    price: 0,
  });
};
const removeOption = (index: number) => {
  addtionalOptions.value.splice(index, 1);
};
const totalPrice = computed(() => {
  return (
    form.value.order.orderAllAmount +
      addtionalOptions.value.reduce(
        (total, option) => total + option.price,
        0,
      ) || 0
  );
});

// 自費項目
const selfPaidOptions = ref<{ name: string; price: number }[]>([]);
const addSelfPaidOption = () => {
  selfPaidOptions.value.push({
    name: "",
    price: 0,
  });
};
const removeSelfPaidOption = (index: number) => {
  selfPaidOptions.value.splice(index, 1);
};
const selfPaidTotalPrice = computed(() => {
  return (
    selfPaidOptions.value.reduce((total, option) => total + option.price, 0) ||
    0
  );
});

// 尾款
const finalPrice = computed(
  () => form.value.order.salesUnitPrice - form.value.order.orderAllAmount,
);
const finalPriceTypeOptions = computed(() => {
  return [
    { label: "全額", value: 14261001 },
    { label: "分期", value: 14261002 },
  ];
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

// VIP條款
const vipModalRef = ref<InstanceType<typeof Modal> | null>(null);
const openVipModal = () => {
  vipModalRef.value?.open();
};
const closeVipModal = () => {
  vipModalRef.value?.close();
};
const vipAgreement = ref<boolean>(false);

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
const confirmSignature = async () => {
  signatureModalRef.value?.close();
  const dataUrl = signaturePad?.toDataURL("image/png");

  const res: Response = await fetch(dataUrl);
  const blob: Blob = await res.blob();
  const file = new File([blob], currentSignatureType, { type: "image/png" });

  if (currentSignatureType === "buyer") {
    signatureStore.setBuyerSignatureImageSrc(dataUrl!);
    buyerSignatureImageRef.value!.src = dataUrl!;
    form.value.customerSignature = file;
  } else {
    signatureStore.setSellerSignatureImageSrc(dataUrl!);
    sellerSignatureImageRef.value!.src = dataUrl!;
    form.value.consultantSignature = file;
  }
};
</script>

<style scoped></style>
